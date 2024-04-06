import { useNavigate } from "react-router-dom";
import { useFavourite } from "../../hooks";

function ListFavourite({ blog }) {
    const navigate = useNavigate();

    function handleBlogClick() {
        navigate(`/blogs/${blog?.id}`);
    }

    return (
        <li>
            <h3
                onClick={handleBlogClick}
                className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
            >
                {blog?.title}
            </h3>
            <p className="text-slate-600 text-sm">
                {blog?.tags
                    ?.split(", ")
                    .map((tag, index) =>
                        index === 0 ? `#${tag}` : `, #${tag}`
                    )}
            </p>
        </li>
    );
}

export default function UserFavourite() {
    const { blogs, isPending, error } = useFavourite();

    return (
        <ul className="space-y-5 my-5">
            {isPending && (
                <div className="text-slate-600 font-medium text-center">
                    Loading...
                </div>
            )}
            {blogs?.map((blog) => (
                <ListFavourite key={blog?.id} blog={blog} />
            ))}
            {error && <div className="text-slate-600 font-medium">{error}</div>}
        </ul>
    );
}
