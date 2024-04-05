import { useAxios } from "../../hooks";
import { useEffect, useState } from "react";
import LikeIcon from "../../assets/icons/like.svg";
import useFavourite from "../../hooks/useFavourite";
import HeartIcon from "../../assets/icons/heart.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import HeartFillIcon from "../../assets/icons/heart-filled.svg";

export default function FloatActions({ blog }) {
    const [isFavourite, setIsFavourite] = useState(false);
    const [like, setLike] = useState({});
    const { axiosAPI } = useAxios();

    const { blogs } = useFavourite();

    useEffect(() => {
        setLike(blog?.likes);
        blogs?.forEach((ublog) => {
            if (ublog?.id === blog?.id) {
                setIsFavourite(true);
            }
        });
    }, [blog, blogs]);

    async function handleLike() {
        const response = await axiosAPI.post(
            `${import.meta.env.VITE_BASE_URL}/blogs/${blog.id}/like`
        );
        if (response.status === 200) setLike(response.data.likes);
    }

    async function handleFavourite() {
        const response = await axiosAPI.patch(
            `${import.meta.env.VITE_BASE_URL}/blogs/${blog.id}/favourite`
        );
        if (response.status === 200) setIsFavourite(response.data);
    }

    return (
        <ul className="floating-action-menus">
            <li onClick={handleLike}>
                <img src={LikeIcon} alt="like" />
                <span>{like?.length}</span>
            </li>

            <li onClick={handleFavourite}>
                {isFavourite ? (
                    <img src={HeartFillIcon} alt="Favourite" />
                ) : (
                    <img src={HeartIcon} alt="Favourite" />
                )}
            </li>
            <a href="#comments">
                <li>
                    <img src={CommentIcon} alt="Comments" />
                    <span>{blog?.comments?.length}</span>
                </li>
            </a>
        </ul>
    );
}
