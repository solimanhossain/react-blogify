import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import formatDate from "../utils/formatDate";
import ActionDot from "./blogs/ActionDot";
import BlogExtraInfo from "./blogs/BlogExtraInfo";

export default function BlogCard({ blog }) {
    const { auth } = useAuth();
    const navigate = useNavigate();
    function handleBlockClick() {
        navigate(`/blogs/${blog?.id}`);
    }

    return (
        <div className="blog-card" onClick={handleBlockClick}>
            <img
                className="blog-thumb"
                src={`${import.meta.env.VITE_BASE_URL}/uploads/blog/${
                    blog?.thumbnail
                }`}
                alt="blog thumbnail"
            />
            <div className="mt-2 relative">
                <h3 className="text-slate-300 text-xl lg:text-2xl">
                    {blog?.title}
                </h3>
                <p className="mb-6 text-base text-slate-500 mt-1">
                    {blog?.content}
                </p>

                <BlogExtraInfo
                    author={blog?.author}
                    createdAt={formatDate(blog?.createdAt)}
                    likes={blog?.likes}
                />
                {auth?.user?.id === blog?.author?.id && (
                    <ActionDot blog={blog} />
                )}
            </div>
        </div>
    );
}
