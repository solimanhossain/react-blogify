import ImageOutline from "../assets/logos/picture.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useAxios } from "../hooks";

export default function CreateBlog() {
    const [uploadImage, setUploadImage] = useState(null);
    const [error, setError] = useState(null);
    const { axiosAPI } = useAxios();
    const fileUploadref = useRef();
    const navigate = useNavigate();

    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
    } = useForm();

    const handleBlogSubmit = async (reactFormData) => {
        const formData = new FormData();
        formData.append("thumbnail", uploadImage);
        for (const key in reactFormData) {
            if (key !== "img") formData.append(key, reactFormData[key]);
        }

        try {
            const response = await axiosAPI.post(
                `${import.meta.env.VITE_BASE_URL}/blogs/`,
                formData
            );
            if (response.data.status === "success") {
                navigate(`/blogs/${response.data?.blog?.id}`);
            }
        } catch (error) {
            setError(error);
            console.error(error);
        }
    };

    return (
        <main>
            <section>
                <div className="container">
                    <form
                        action="#"
                        onSubmit={handleSubmit(handleBlogSubmit)}
                        className="createBlog"
                    >
                        <div className="flex place-items-center bg-slate-600/20 h-[150px] rounded-md my-4 justify-center">
                            <input
                                id="file"
                                type="file"
                                name="file"
                                accept="image/*"
                                ref={fileUploadref}
                                hidden
                                onChange={(e) => {
                                    setValue("img", e.target.files[0].name);
                                    setUploadImage(e.target.files[0]);
                                }}
                            />
                            {uploadImage && (
                                <img
                                    className="object-cover h-[150px] w-full -z-10"
                                    src={URL.createObjectURL(uploadImage)}
                                />
                            )}
                            <div
                                onClick={() => fileUploadref.current.click()}
                                className="flex items-center cursor-pointer hover:scale-110 transition-all border py-6 px-48 absolute"
                            >
                                <img
                                    src={ImageOutline}
                                    alt="Upload Image"
                                    {...register("img", {
                                        required: "Image is required!",
                                    })}
                                />
                                {uploadImage ? "Change " : "Upload "}Your Image
                            </div>

                            {!!errors && (
                                <div
                                    role="alert"
                                    className="text-red-600 mt-24 absolute -z-20"
                                >
                                    {errors?.img?.message}
                                </div>
                            )}
                        </div>
                        <div className="mb-6">
                            <input
                                {...register("title", {
                                    required: "Title is required!",
                                    minLength: {
                                        value: 1,
                                        message:
                                            "Must be at least 1 characters!",
                                    },
                                })}
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter your blog title"
                            />
                            {!!errors && (
                                <div role="alert" className="text-red-600">
                                    {errors?.title?.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <input
                                {...register("tags", {
                                    required: "Some tags is Required!",
                                })}
                                type="text"
                                id="tags"
                                name="tags"
                                placeholder="Comma Separated Tags Ex. JavaScript, React, Node,"
                            />
                            {!!errors && (
                                <div role="alert" className="text-red-600">
                                    {errors?.tags?.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <textarea
                                {...register("content", {
                                    required: "Add your content!",
                                })}
                                id="content"
                                name="content"
                                placeholder="Write your blog content"
                                rows="8"
                            ></textarea>
                            {!!errors && (
                                <div role="alert" className="text-red-600">
                                    {errors?.content?.message}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Create Blog
                        </button>
                    </form>

                    {error && (
                        <div className="text-red-600">{error.message}</div>
                    )}
                </div>
            </section>
        </main>
    );
}
