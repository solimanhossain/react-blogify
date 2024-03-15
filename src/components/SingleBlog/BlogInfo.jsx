import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import ProfileAvatar from "../profile/ProfileAvatar";

export default function BlogInfo({ blog }) {
    const navigate = useNavigate();
    function handleProfileClick() {
        navigate(`/profile/${blog?.author?.id}`);
    }
    return (
        <>
            <div className="flex justify-center items-center my-4 gap-4">
                <div className="flex items-center capitalize space-x-2 cursor-pointer">
                    <ProfileAvatar user={blog?.author} />

                    <h5
                        className="text-slate-500 text-sm"
                        onClick={handleProfileClick}
                    >
                        {`${blog?.author?.firstName} ${blog?.author?.lastName}`}
                    </h5>
                </div>
                <span className="text-sm text-slate-700 dot">
                    {formatDate(blog?.createdAt)}
                </span>
                <span className="text-sm text-slate-700 dot">
                    {`${blog?.likes?.length} Likes`}
                </span>
            </div>
            <img
                className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                src={`${import.meta.env.VITE_BASE_URL}/uploads/blog/${
                    blog?.thumbnail
                }`}
                alt="blog thumbnail"
            />
            <ul className="tags">
                {blog?.tags?.split(", ").map((tag, index) => (
                    <li key={index}>{tag.toUpperCase()}</li>
                ))}
            </ul>
        </>
    );
}
