import ImageOutline from "../assets/logos/picture.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useAxios } from "../hooks";

export default function CreateBlog() {
    const [uploadImage, setUploadImage] = useState(null);
    const { axiosAPI } = useAxios();
    const fileUploadref = useRef();
    const navigate = useNavigate();

    const { register, handleSubmit, setError } = useForm();

    const handleBlogSubmit = async (reactFormData) => {
        const formData = new FormData();
        formData.append("thumbnail", uploadImage);
        for (const key in reactFormData) {
            formData.append(key, reactFormData[key]);
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
            setError(error.message);
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
                                accept="image/*"
                                ref={fileUploadref}
                                hidden
                                onChange={(e) => {
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
                                className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer absolute"
                                onClick={() => fileUploadref.current.click()}
                            >
                                <img src={ImageOutline} alt="Upload Image" />
                                <p>
                                    {uploadImage ? "Change " : "Upload "}Your
                                    Image
                                </p>
                            </div>
                        </div>
                        <div className="mb-6">
                            <input
                                {...register("title", {
                                    required: "title is required!",
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
                        </div>

                        <div className="mb-6">
                            <input
                                {...register("tags")}
                                type="text"
                                id="tags"
                                name="tags"
                                placeholder="Comma Separated Tags Ex. JavaScript, React, Node,"
                            />
                        </div>

                        <div className="mb-6">
                            <textarea
                                {...register("content", {
                                    required: "Add some content",
                                })}
                                id="content"
                                name="content"
                                placeholder="Write your blog content"
                                rows="8"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Create Blog
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
