import axios from "axios";
import { useAxios } from "../hooks";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageOutline from "../assets/logos/picture.svg";

export default function UpdateBlog() {
    const parms = useParams();
    const fileUploadref = useRef();
    const navigate = useNavigate();
    const { axiosAPI } = useAxios();

    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/blogs/${parms.editId}`
            );
            if (response.status === 200) {
                setThumbnail(
                    `${import.meta.env.VITE_BASE_URL}/uploads/blog/${
                        response.data.thumbnail
                    }`
                );
                setTitle(response.data.title);
                setTags(response.data.tags);
                setContent(response.data.content);
            }
        };

        fetchProfile();
    }, []);

    async function handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        formData.append("title", title);
        formData.append("tags", tags);
        formData.append("content", content);

        try {
            const response = await axiosAPI.patch(
                `${import.meta.env.VITE_BASE_URL}/blogs/${parms.editId}`,
                formData
            );
            console.log(response);
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
                                        URL.createObjectURL(e.target.files[0])
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
                                onClick={() => fileUploadref.current.click()}
                            >
                                <img src={ImageOutline} alt="Upload Image" />
                                <p> Change Blog Image</p>
                            </div>
                        </div>
                        <div className="mb-6">
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter your blog title"
                            />
                        </div>

                        <div className="mb-6">
                            <input
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                type="text"
                                id="tags"
                                name="tags"
                                placeholder="Comma Separated Tags Ex. JavaScript, React, Node,"
                            />
                        </div>

                        <div className="mb-6">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full"
                                type="text"
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
                            Update Blog
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
