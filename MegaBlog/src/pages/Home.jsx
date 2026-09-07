import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";


function Home() {
    const [posts, setposts] = useState([]);
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        appwriteService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setposts(posts.documents);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-gray-700">
                                Loading posts...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            {authStatus ? (
                                <div>
                                    <h1 className="text-2xl font-bold mb-4">
                                        No posts found yet.
                                    </h1>
                                    <Link
                                        to="/add-post"
                                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 duration-200"
                                    >
                                        Create a Post
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-2xl font-bold hover:text-gray-500 mb-4">
                                        Login to read posts
                                    </h1>
                                    <Link
                                        to="/login"
                                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 duration-200"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home