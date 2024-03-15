import LikeIcon from "../../assets/icons/like.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import HeartFillIcon from "../../assets/icons/heart-filled.svg";
import { useAxios } from "../../hooks";
import { useState } from "react";

export default function FloatActions({ blog }) {
    const [isFavourite, setIsFavourite] = useState(blog?.isFavourite);
    const [like, setLike] = useState({});
    const { axiosAPI } = useAxios();

    async function handleLike() {
        const response = await axiosAPI.post(
            `${import.meta.env.VITE_BASE_URL}/blogs/${blog.id}/like`
        );
        setLike(response.data);
    }

    async function handleFavourite() {
        const response = await axiosAPI.patch(
            `${import.meta.env.VITE_BASE_URL}/blogs/${blog.id}/favourite`
        );
        setIsFavourite(response.data.isFavourite);
    }

    return (
        <ul className="floating-action-menus">
            <li onClick={handleLike}>
                <img src={LikeIcon} alt="like" />
                <span>{like?.likes?.length ?? blog?.likes?.length}</span>
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
