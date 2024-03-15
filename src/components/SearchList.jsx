import { useNavigate } from "react-router-dom";

export default function SearchList({ blog }) {
    const navigate = useNavigate();
    function handleBlockClick() {
        navigate(`/blogs/${blog?.id}`);
    }
    return (
        <div
            className="flex gap-6 py-2 cursor-pointer"
            onClick={handleBlockClick}
        >
            <img
                className="h-28 object-contain"
                src={`${import.meta.env.VITE_BASE_URL}/uploads/blog/${
                    blog?.thumbnail
                }`}
                alt="thumbnail"
            />
            <div className="mt-2">
                <h3 className="text-slate-300 text-xl font-bold">
                    {blog?.title}
                </h3>
                <p className="mb-6 text-sm text-slate-500 mt-1">
                    {blog?.content}
                </p>
            </div>
        </div>
    );
}
