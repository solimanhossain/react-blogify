import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default function useFavourite() {
    const { axiosAPI } = useAxios();
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsPending(true);
                const response = await axiosAPI.get(
                    `${import.meta.env.VITE_BASE_URL}/blogs/favourites`
                );
                if (response.status === 200) {
                    setIsPending(false);
                    setBlogs(response.data.blogs);
                }
            } catch (err) {
                setError("Favourite blogs not found!");
                setIsPending(false);
                throw err;
            }
        };

        fetchProfile();
    }, []);

    return { blogs, isPending, error };
}
