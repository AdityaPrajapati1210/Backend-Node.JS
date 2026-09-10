import React, {useState} from 'react'
import authService from '../appwrite/Auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm()

    const create = async(data) => {
        setError("")
        setLoading(true)
        try {
            const userAccount = await authService.createAccount(data)
            if (userAccount) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) {
                    dispatch(login({ userData: currentUser }));
                } else {
                    dispatch(login({ userData: { $id: userAccount.userId, name: data.name, email: data.email } }));
                }
                navigate("/")
            }
        } catch (err) {
            setError(err?.message || "Failed to create account. Please try again.")
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        error={errors.name?.message}
                        {...register("name", {
                            required: "Full name is required",
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        error={errors.email?.message}
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password (min 8 characters)"
                        error={errors.password?.message}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long"
                            }
                        })}
                        />
                        <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup