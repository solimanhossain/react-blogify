import { useEffect, useState } from "react";
import CloseIcon from "../assets/icons/close.svg";
import { useAxios, useDebouncer } from "../hooks";
import SearchList from "./SearchList";

export default function SearchModal({ onClose }) {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const { axiosAPI } = useAxios();

    const debouncedSearchTerm = useDebouncer(searchKeyword, 500);
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axiosAPI.get(
                    `${
                        import.meta.env.VITE_BASE_URL
                    }/search?q=${debouncedSearchTerm}`
                );
                if (response.status === 200) {
                    const blogs = response.data.data;
                    setBlogs(blogs);
                }
            } catch (err) {
                setBlogs([]);
                setError("No Result Found");
            }
        }
        if (debouncedSearchTerm.length > 0) {
            fetchBlogs();
        } else {
            setBlogs([]);
        }
        return () => {};
    }, [debouncedSearchTerm, setSearchKeyword]);

    return (
        <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
            <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
                <div>
                    <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
                        Search for Your Desire Blogs
                    </h3>
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Start Typing to Search"
                        className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
                    />
                </div>

                <div className="">
                    <h3 className="text-slate-400 font-bold mt-6">
                        Search Results
                    </h3>
                    <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                        {blogs.length > 0 ? (
                            blogs?.map((blog) => (
                                <SearchList blog={blog} key={blog.id} />
                            ))
                        ) : (
                            <p className="text-slate-500">{error}</p>
                        )}
                    </div>
                </div>

                <img
                    src={CloseIcon}
                    onClick={onClose}
                    alt="Close"
                    className="absolute right-2 top-2 cursor-pointer w-8 h-8 hover:scale-105"
                />
            </div>
        </section>
    );
}
