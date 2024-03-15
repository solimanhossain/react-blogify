import { useRef } from "react";
import { actions } from "../../actions";
import { useAxios, useProfile } from "../../hooks";
import EditIcon from "../../assets/icons/edit.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileImage() {
    const { state, dispatch } = useProfile();
    const { axiosAPI } = useAxios();
    const fileUpload = useRef();

    function handleImageUpload(e) {
        e.preventDefault();
        fileUpload.current.addEventListener("change", updateImage);
        fileUpload.current.click();
    }
    async function updateImage() {
        try {
            const formData = new FormData();
            formData.append("avatar", fileUpload.current.files[0]);
            const response = await axiosAPI.post(
                `${import.meta.env.VITE_BASE_URL}/profile/avatar`,
                formData
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: response.data,
                });
            }
        } catch (err) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: err.message,
            });
            toast.error(err.message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    }

    return (
        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            {state?.user?.avatar ? (
                <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                        state?.user?.avatar
                    }`}
                    className="w-full h-full avater-img"
                    alt="Avatar"
                />
            ) : (
                <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                    {state?.user?.firstName[0]}
                </div>
            )}

            <form id="form" encType="multipart/form-data">
                <button
                    className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full hover:bg-slate-700 bg-slate-700/80"
                    onClick={handleImageUpload}
                    type="submit"
                >
                    <img src={EditIcon} alt="Edit" />
                </button>

                <input
                    id="file"
                    type="file"
                    accept="image/*"
                    ref={fileUpload}
                    hidden
                />
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}
