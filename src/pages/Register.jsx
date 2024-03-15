import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const navigate = useNavigate();

    const onSubmitForm = async (data) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/auth/register`,
                data
            );
            if (response.status === 201) {
                // console.log(response.data);
                navigate("/login");
            }
        } catch (error) {
            setError("root.random", {
                type: "random",
                message: error.message,
            });
        }
    };
    return (
        <main>
            <section className="container">
                <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Register
                    </h2>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <FormField
                            label={"First Name"}
                            error={errors.firstName?.message}
                        >
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                {...register("firstName", {
                                    required: "First Name is required!",
                                    minLength: {
                                        value: 1,
                                        message:
                                            "Must be at least 1 characters!",
                                    },
                                })}
                                className={`w-full p-3 bg-[#030317] border  ${
                                    errors.firstName
                                        ? "border-red-500"
                                        : "border-white/20"
                                } rounded-md focus:outline-none focus:border-indigo-500`}
                            />
                        </FormField>
                        <FormField
                            label={"Last Name"}
                            error={errors.lastName?.message}
                        >
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                {...register("lastName", {
                                    required: "Last Name is required!",
                                    minLength: {
                                        value: 1,
                                        message:
                                            "Must be at least 1 characters!",
                                    },
                                })}
                                className={`w-full p-3 bg-[#030317] border  ${
                                    errors.lastName
                                        ? "border-red-500"
                                        : "border-white/20"
                                } rounded-md focus:outline-none focus:border-indigo-500`}
                            />
                        </FormField>
                        <FormField
                            label={"Email"}
                            error={errors.email?.message}
                        >
                            <input
                                type="text"
                                id="email"
                                name="email"
                                {...register("email", {
                                    required: "Email is required!",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address!",
                                    },
                                })}
                                className={`w-full p-3 bg-[#030317] border  ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-white/20"
                                } rounded-md focus:outline-none focus:border-indigo-500`}
                            />
                        </FormField>

                        <FormField
                            label={"Password"}
                            error={errors.password?.message}
                        >
                            <input
                                type="password"
                                id="password"
                                name="password"
                                {...register("password", {
                                    required: "Password is required!",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters!",
                                    },
                                })}
                                className={`w-full p-3 bg-[#030317] border ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-white/20"
                                } rounded-md focus:outline-none focus:border-indigo-500`}
                            />
                        </FormField>

                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            >
                                Create Account
                            </button>
                        </div>
                        {errors.root?.random && (
                            <div>
                                <span className="bg-red-800 text-yellow-500 px-4 py-2 m-4 rounded-full text-sm  flex justify-center">
                                    {"⚠️ " + errors.root?.random?.message}
                                </span>
                            </div>
                        )}
                        <p className="text-center">
                            Already have account?{" "}
                            <Link
                                to="/login"
                                className="text-indigo-600 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
        </main>
    );
}