import { useEffect, useState } from "react";
import { useAxios } from "../../hooks";

function ListFavourite({ blog }) {
    return (
        <li>
            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
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
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const { axiosAPI } = useAxios();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosAPI.get(
                    `${import.meta.env.VITE_BASE_URL}/blogs/favourites`
                );
                if (response.status === 200) {
                    setBlogs(response.data.blogs);
                }
            } catch (err) {
                setError("No Favourite blog.");
            }
        };

        fetchProfile();
    }, []);

    return (
        <ul className="space-y-5 my-5">
            {blogs?.map((blog) => (
                <ListFavourite key={blog?.id} blog={blog} />
            ))}
            <li className="text-slate-600 font-medium text-center">{error}</li>
        </ul>
    );
}
