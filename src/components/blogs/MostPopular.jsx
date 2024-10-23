import { useNavigate } from "react-router-dom";
import { useFetchApi } from "../../hooks";

function ListBlogs({ blog }) {
    const navigate = useNavigate();
    function handleBlockClick() {
        navigate(`/blogs/${blog?.id}`);
    }
    function handleProfileClick() {
        navigate(`/profile/${blog?.author?.id}`);
    }

    return (
        <li>
            <h3
                className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
                onClick={handleBlockClick}
            >
                {blog?.title}
            </h3>
            <p
                className="text-slate-600 text-sm cursor-pointer"
                onClick={handleProfileClick}
            >
                by
                {` ${blog?.author.firstName} ${blog?.author.lastName}`}
                <span> · </span>
                {blog?.likes.length + "  Likes"}
            </p>
        </li>
    );
}

export default function MostPopular() {
    const { data: blogs } = useFetchApi(
        `${import.meta.env.VITE_BASE_URL}/blogs/popular`
    );

    return (
        <div className="sidebar-card">
            {blogs && (
                <>
                    <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                        Most Popular 👍️
                    </h3>
                    <ul className="space-y-5 my-5">
                        {blogs?.blogs?.map((blog) => (
                            <ListBlogs key={blog.id} blog={blog} />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
