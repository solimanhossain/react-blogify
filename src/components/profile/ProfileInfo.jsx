import { useState } from "react";
import { actions } from "../../actions";
import { useProfile, useAxios } from "../../hooks";
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.svg";

export default function ProfileInfo() {
    const { state, dispatch } = useProfile();
    const { axiosAPI } = useAxios();
    const [bio, setBio] = useState(state?.user?.bio);
    const [isEditBio, setIsEditBio] = useState(false);

    async function handleBioEdit() {
        dispatch({ type: actions.profile.DATA_FETCHING });

        try {
            const response = await axiosAPI.patch(
                `${import.meta.env.VITE_BASE_URL}/profile/`,
                { bio }
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.DATA_EDITED,
                    data: response.data.user,
                });
            }
            setIsEditBio(false);
        } catch (err) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: err.message,
            });
            console.error(err);
        }
    }

    return (
        <>
            <div>
                <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                    {`${state?.user?.firstName} ${state?.user?.lastName}`}
                </h3>
                <p className="leading-[230%] lg:text-lg">
                    {state?.user?.email}
                </p>
            </div>

            <div className="mt-4 flex items-start gap-2 lg:mt-6">
                <div className="flex-1 mx-1">
                    {isEditBio ? (
                        <textarea
                            className="p-2 leading-[185%] text-gray-600 lg:text-lg rounded-md"
                            value={bio}
                            rows={3}
                            cols={80}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    ) : (
                        <p className="leading-[185%] text-gray-400 lg:text-lg">
                            {bio}
                        </p>
                    )}
                </div>
                {isEditBio ? (
                    <button
                        className="flex-center h-7 w-7 rounded-full hover:bg-slate-700/80 grid place-items-center"
                        onClick={handleBioEdit}
                    >
                        <img src={CheckIcon} alt="Edit" />
                    </button>
                ) : (
                    <button
                        className="flex-center h-7 w-7 rounded-full hover:bg-slate-700/80 grid place-items-center"
                        onClick={() => setIsEditBio(true)}
                    >
                        <img src={EditIcon} alt="Edit" />
                    </button>
                )}
            </div>
        </>
    );
}
