import { useState } from "react";
import { useAxios } from "../../hooks";
import { useNavigate } from "react-router-dom";
import ActioDotIcon from "../../assets/icons/3dots.svg";
import EditBlogIcon from "../../assets/icons/edit.svg";
import DeleteBlogIcon from "../../assets/icons/delete.svg";

export default function ActionDot({ blog, onDeleted }) {
    const [isActionOpen, setIsActionOpen] = useState(false);
    const { axiosAPI } = useAxios();
    const navigate = useNavigate();

    function handleDotClick(e) {
        e.stopPropagation();
        setIsActionOpen(!isActionOpen);
    }

    async function handleBlogDelete(e) {
        e.stopPropagation();
        try {
            const response = await axiosAPI.delete(
                `${import.meta.env.VITE_BASE_URL}/blogs/${blog.id}`
            );
            if (response.status === 200) onDeleted(true);
        } catch (error) {
            console.log(error);
        }
    }

    function handleEditClick(e) {
        e.stopPropagation();
        navigate(`/blogs/${blog?.id}/edit/`);
    }

    return (
        <div className="absolute right-0 top-0 hover:scale-105">
            <button onClick={handleDotClick}>
                <img src={ActioDotIcon} alt="3dots of Action" />
            </button>

            {isActionOpen && (
                <div className="action-modal-container bg-opacity-95">
                    <button
                        onClick={handleEditClick}
                        className="action-menu-item hover:text-lwsGreen"
                    >
                        <img src={EditBlogIcon} alt="Edit" />
                        Edit
                    </button>
                    <button
                        onClick={handleBlogDelete}
                        className="action-menu-item hover:text-red-500"
                    >
                        <img src={DeleteBlogIcon} alt="Delete" />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
