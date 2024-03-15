import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const [blogs, setBlogs] = useState(null);

    useEffect(() => {
        let ignore = false;
        try {
            fetch(`${import.meta.env.VITE_BASE_URL}/blogs/popular`)
                .then((response) => response.json())
                .then((json) => {
                    if (!ignore) {
                        setBlogs(json);
                    }
                });
        } catch (err) {
            console.error(err.message);
        }
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <ul className="space-y-5 my-5">
            {blogs?.blogs?.map((blog) => (
                <ListBlogs key={blog.id} blog={blog} />
            ))}
        </ul>
    );
}
