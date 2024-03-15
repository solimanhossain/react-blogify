import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../profile/ProfileAvatar";
import DeleteBlogIcon from "../../assets/icons/delete.svg";
import { useAxios } from "../../hooks";

export default function ShowComment({ comment, blogId, del, setBlog }) {
    const navigate = useNavigate();
    const { axiosAPI } = useAxios();
    function handleProfileClick() {
        navigate(`/profile/${comment?.author?.id}`);
    }

    async function handleDelete() {
        console.log(blogId, comment?.id);
        try {
            const response = await axiosAPI.delete(
                `${import.meta.env.VITE_BASE_URL}/blogs/${blogId}/comment/${
                    comment?.id
                }`
            );
            if (response.status === 200) {
                setBlog(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-start space-x-4 my-8">
            <ProfileAvatar user={comment?.author} />
            <div className="w-full">
                <h5
                    className="text-slate -500 font-bold cursor-pointer"
                    onClick={handleProfileClick}
                >{` ${comment?.author?.firstName} ${comment?.author?.lastName}`}</h5>
                <div className="flex justify-between items-start">
                    <p className="text-slate-300">{comment?.content}</p>
                    {del && (
                        <img
                            onClick={handleDelete}
                            src={DeleteBlogIcon}
                            alt="Delete"
                            className="bg-red-500 rounded-full p-2 shadow-sm cursor-pointer hover:scale-95"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
