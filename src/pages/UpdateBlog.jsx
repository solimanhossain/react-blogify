import { useAxios, useFetchApi } from "../hooks";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageOutline from "../assets/logos/picture.svg";

export default function UpdateBlog() {
    const parms = useParams();
    const fileUploadref = useRef();
    const navigate = useNavigate();
    const { axiosAPI } = useAxios();

    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);
    const [blog, setBlog] = useState(null);

    const { data, error } = useFetchApi(
        `${import.meta.env.VITE_BASE_URL}/blogs/${parms.editId}`
    );

    useEffect(() => {
        if (data) {
            setBlog(data);
            setThumbnail(
                `${import.meta.env.VITE_BASE_URL}/uploads/blog/${
                    data.thumbnail
                }`
            );
        }
    }, [data]);

    async function handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        formData.append("title", blog.title);
        formData.append("tags", blog.tags);
        formData.append("content", blog.content);

        try {
            const response = await axiosAPI.patch(
                `${import.meta.env.VITE_BASE_URL}/blogs/${parms.editId}`,
                formData
            );
            if (response.status === 200) {
                navigate(`/blogs/${response.data?.id}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            <section>
                <div className="container">
                    {blog && (
                        <form
                            action="#"
                            onSubmit={handleFormSubmit}
                            className="createBlog"
                        >
                            <div className="flex place-items-center bg-slate-600/20 h-[150px] rounded-md my-4 justify-center">
                                <input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    ref={fileUploadref}
                                    onChange={(e) => {
                                        setThumbnail(e.target.files[0]);
                                        setPreview(
                                            URL.createObjectURL(
                                                e.target.files[0]
                                            )
                                        );
                                    }}
                                    hidden
                                />
                                <img
                                    className="object-cover h-[150px] w-full -z-10"
                                    src={preview ?? thumbnail}
                                />

                                <div
                                    className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer absolute"
                                    onClick={() =>
                                        fileUploadref.current.click()
                                    }
                                >
                                    <img
                                        src={ImageOutline}
                                        alt="Upload Image"
                                    />
                                    <p> Change Blog Image</p>
                                </div>
                            </div>
                            <div className="mb-6">
                                <input
                                    value={blog.title}
                                    onChange={(e) =>
                                        setBlog({
                                            ...blog,
                                            title: e.target.value,
                                        })
                                    }
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter your blog title"
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    value={blog.tags}
                                    onChange={(e) =>
                                        setBlog({
                                            ...blog,
                                            tags: e.target.value,
                                        })
                                    }
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    placeholder="Comma Separated Tags Ex. JavaScript, React, Node,"
                                />
                            </div>

                            <div className="mb-6">
                                <textarea
                                    value={blog.content}
                                    onChange={(e) =>
                                        setBlog({
                                            ...blog,
                                            content: e.target.value,
                                        })
                                    }
                                    className="w-full"
                                    type="text"
                                    id="content"
                                    name="content"
                                    placeholder="Write your blog content"
                                    rows="8"
                                ></textarea>
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                >
                                    Update Blog
                                </button>
                                <Link
                                    onClick={() => navigate(-1)}
                                    className="border text-white px-6 py-2 md:py-3"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    )}
                    {error && <p>{error.message}</p>}
                </div>
            </section>
        </main>
    );
}
