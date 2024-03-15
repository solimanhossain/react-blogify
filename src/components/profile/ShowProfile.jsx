import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../BlogCard";

export default function ShowProfile() {
    const parms = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchProfile() {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/profile/${parms.profileId}`
            );

            if (response.status === 200) {
                setUser(response.data);
            }
        }
        fetchProfile();
        return () => {};
    }, []);

    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                <div className="flex flex-col items-center py-8 text-center">
                    {user?.id && (
                        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
                            {user?.avatar ? (
                                <img
                                    src={`${
                                        import.meta.env.VITE_BASE_URL
                                    }/uploads/avatar/${user?.avatar}`}
                                    className="w-full h-full avater-img"
                                    alt="Avatar"
                                />
                            ) : (
                                <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                                    {user?.firstName[0]}
                                </div>
                            )}
                        </div>
                    )}
                    <div>
                        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                            {`${user?.firstName} ${user?.lastName}`}
                        </h3>
                        <p className="leading-[230%] lg:text-lg">
                            {user?.email}
                        </p>
                    </div>

                    <div className="mt-4 flex items-start gap-2 lg:mt-6">
                        <div className="flex-1 mx-1">
                            <p className="leading-[185%] text-gray-400 lg:text-lg">
                                {user?.bio}
                            </p>
                        </div>
                    </div>
                    <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
                </div>

                <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
                {user?.id && (
                    <div className="my-6 space-y-4">
                        {user?.blogs.map((blog) => (
                            <BlogCard key={blog?.id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
