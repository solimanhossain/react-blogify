import { useNavigate } from "react-router-dom";

export default function ProfileAvatar({ user }) {
    const navigate = useNavigate();
    function handleProfileClick() {
        navigate(`/profile/${user?.id}`);
    }
    return (
        <div>
            {user?.avatar ? (
                <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                        user?.avatar
                    }`}
                    className="avater-img cursor-pointer"
                    alt="Avatar"
                    onClick={handleProfileClick}
                />
            ) : (
                <div
                    className="w-7 h-7 bg-orange-600 text-white grid place-items-center font-bold rounded-full cursor-pointer"
                    onClick={handleProfileClick}
                >
                    {user?.firstName[0]}
                </div>
            )}
        </div>
    );
}
