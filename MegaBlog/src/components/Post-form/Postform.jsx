import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import authService from "../../appwrite/Auth.js";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const submit = async (data) => {
        setError("");
        setLoading(true);
        try {
            if (post) {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    const oldImg = post.featureimage || post.featuredImage;
                    if (oldImg) {
                        await appwriteService.deleteFile(oldImg);
                    }
                }

                const fileId = file ? file.$id : (post.featureimage || post.featuredImage);

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featureimage: fileId,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!data.image?.[0]) {
                    setError("Please select a featured image");
                    setLoading(false);
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (!file) {
                    setError("Failed to upload image. Please check bucket permissions in Appwrite.");
                    setLoading(false);
                    return;
                }

                let currentUserId = userData?.$id;
                if (!currentUserId) {
                    const currentUser = await authService.getCurrentUser();
                    currentUserId = currentUser?.$id;
                }

                if (!currentUserId) {
                    setError("You must be logged in to create a post.");
                    setLoading(false);
                    return;
                }

                const fileId = file.$id;
                const dbPost = await appwriteService.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featureimage: fileId,
                    userId: currentUserId,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (err) {
            console.error("Post submit error:", err);
            setError(err?.message || "Failed to submit post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-")
                .replace(/^[^a-zA-Z0-9]+/, "")
                .slice(0, 36);

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {error && (
                <div className="w-full px-2 mb-4">
                    <p className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-lg text-center font-medium">
                        {error}
                    </p>
                </div>
            )}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (post.featureimage || post.featuredImage) && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featureimage || post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button 
                    type="submit" 
                    disabled={loading}
                    bgColor={post ? "bg-green-500" : undefined} 
                    className="w-full"
                >
                    {loading ? "Submitting..." : (post ? "Update" : "Submit")}
                </Button>
            </div>
        </form>
    );
}