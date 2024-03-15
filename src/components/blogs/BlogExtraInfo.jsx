import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks";

export default function BlogExtraInfo({ author, createdAt, likes }) {
    const navigate = useNavigate();
    const { state } = useProfile();
    function handleProfileClick(e) {
        e.stopPropagation();
        navigate(`/profile/${author?.id}`);
    }

    return (
        <div className="flex justify-between items-center">
            <div
                className="flex items-center capitalize space-x-2"
                onClick={handleProfileClick}
            >
                {author?.avatar ? (
                    <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                            state?.avatar ?? author?.avatar
                        }`}
                        className="avater-img"
                        alt="Avatar"
                    />
                ) : (
                    <div className="avater-img bg-indigo-600 text-white">
                        {author?.firstName[0]}
                    </div>
                )}

                <div>
                    <h5 className="text-slate-500 text-sm">
                        {`${author?.firstName} ${author?.lastName}`}
                    </h5>
                    <div className="flex items-center text-xs text-slate-700">
                        <span>{createdAt}</span>
                    </div>
                </div>
            </div>

            <div className="text-sm px-2 py-1 text-slate-700">
                <span>{`${likes?.length} Likes`}</span>
            </div>
        </div>
    );
}
