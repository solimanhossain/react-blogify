import { useAuth } from "../hooks";
import BlogCard from "../components/BlogCard";
import MostPopular from "../components/blogs/MostPopular";
import UserFavourite from "../components/blogs/UserFavourite";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Home() {
    const { auth } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);

    useEffect(() => {
        async function fetchBlogs() {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/blogs?page=${page}&limit=10`
            );
            const data = res.data;

            if (data.blogs.length === 0) {
                setHasMore(false);
            } else {
                setBlogs((prev) => [...prev, ...data.blogs]);
                setPage((prevPage) => prevPage + 1);
            }
        }

        const onIntersection = (items) => {
            const loaderItem = items[0];

            if (loaderItem.isIntersecting && hasMore) {
                fetchBlogs();
            }
        };

        const observer = new IntersectionObserver(onIntersection);

        if (observer && loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [hasMore, page]);

    return (
        <main>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        <div className="space-y-3 md:col-span-5">
                            {blogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                            <div
                                className="text-center text-slate-600 mt-4"
                                ref={loaderRef}
                            >
                                {hasMore
                                    ? "⇅ Load Blogs..."
                                    : "✓ Blogs Loaded."}
                            </div>
                        </div>

                        <div className="md:col-span-2 h-full w-full space-y-5">
                            <MostPopular />

                            {auth?.user?.id && (
                                <div className="sidebar-card">
                                    <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                                        Your Favourites ❤️
                                    </h3>
                                    <UserFavourite />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
