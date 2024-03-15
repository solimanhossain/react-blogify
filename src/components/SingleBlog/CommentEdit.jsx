import { useState } from "react";
import { useAxios } from "../../hooks";

export default function CommentEdit({ blog, setBlog }) {
    const [commentContent, setCommnetContent] = useState("");
    const { axiosAPI } = useAxios();

    async function handleComment() {
        try {
            const response = await axiosAPI.post(
                `${import.meta.env.VITE_BASE_URL}/blogs/${blog?.id}/comment`,
                { content: commentContent }
            );
            if (response.status === 200) {
                setCommnetContent("");
                setBlog(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="w-full">
            <textarea
                value={commentContent}
                onChange={(e) => setCommnetContent(e.target.value)}
                className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                placeholder="Write a comment"
            ></textarea>
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleComment}
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                    Comment
                </button>
            </div>
        </div>
    );
}
