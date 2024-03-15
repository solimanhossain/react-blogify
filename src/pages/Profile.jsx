import { useEffect } from "react";
import { actions } from "../actions";
import { useAuth, useAxios, useProfile } from "../hooks";
import BlogCard from "../components/BlogCard";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileImage from "../components/profile/ProfileImage";

export default function Profile() {
    const { state, dispatch } = useProfile();
    const { axiosAPI } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FATCHING });
        const fetchProfile = async () => {
            try {
                const response = await axiosAPI.get(
                    `${import.meta.env.VITE_BASE_URL}/profile/${auth?.user?.id}`
                );
                if (response.status === 200) {
                    const { blogs, ...user } = response.data;
                    dispatch({
                        type: actions.profile.DATA_FETCHED,
                        user,
                        blogs,
                    });
                }
            } catch (err) {
                dispatch({
                    type: actions.profile.DATA_FETCH_ERROR,
                    err,
                });
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    if (state?.loading) {
        return (
            <main className="flex mx-auto max-w-[1020px] py-8 justify-center text-green-500">
                Fetching your Profile data...
            </main>
        );
    } else if (state?.error) {
        return (
            <main className="flex mx-auto max-w-[1020px] py-8 justify-center text-red-500">
                {state?.error.message}
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
                <div className="flex flex-col items-center py-8 text-center">
                    <ProfileImage />
                    <ProfileInfo />
                    <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
                </div>

                <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
                <div className="my-6 space-y-4">
                    {state?.blogs.map((blog) => (
                        <BlogCard key={blog?.id} blog={blog} />
                    ))}
                </div>
            </div>
        </main>
    );
}
