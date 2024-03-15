import { NavLink, useNavigate } from "react-router-dom";
import LwsLogo from "../assets/logos/logo.svg";
import SearchIcon from "../assets/icons/search.svg";
import LogoutLogo from "../assets/icons/logout.svg";
import { useAuth, useProfile } from "../hooks";
import Portal from "../Potal";
import SearchModal from "./SearchModal";
import { useState } from "react";

export default function NavBar() {
    const [showModal, setShowModal] = useState(false);
    const { auth, setAuth } = useAuth();
    const { state } = useProfile();
    let user = state?.user ?? auth?.user;
    let avatar = state?.user?.avatar ?? auth?.user?.avatar;
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("react-blogifly-user");
        setAuth({});
        navigate("/login");
    }

    return (
        <>
            {showModal && (
                <Portal>
                    <SearchModal onClose={() => setShowModal(false)} />
                </Portal>
            )}
            <header>
                <nav className="container">
                    <div>
                        <NavLink to="/">
                            <img className="w-32" src={LwsLogo} alt="lws" />
                        </NavLink>
                    </div>

                    <div>
                        <ul className="flex items-center space-x-5">
                            <li>
                                <NavLink
                                    to="/createBlog"
                                    className="flex border px-4 py-2 md:py-3 rounded-md hover:scale-95"
                                >
                                    Write
                                </NavLink>
                            </li>
                            {user?.id ? (
                                <>
                                    <li
                                        onClick={() => setShowModal(true)}
                                        className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-200"
                                    >
                                        <img src={SearchIcon} alt="Search" />
                                        <span>Search</span>
                                    </li>
                                    <li>
                                        <img
                                            onClick={handleLogout}
                                            className="flex items-center  cursor-pointer hover:scale-105  transition-all duration-200"
                                            src={LogoutLogo}
                                            alt="logout"
                                        />
                                    </li>
                                    <li className="flex items-center cursor-pointer">
                                        {avatar ? (
                                            <img
                                                src={`${
                                                    import.meta.env
                                                        .VITE_BASE_URL
                                                }/uploads/avatar/${avatar}`}
                                                className="avater-img"
                                                alt="Avatar"
                                            />
                                        ) : (
                                            <div className="avater-img bg-orange-600 text-white">
                                                {user?.firstName[0]}
                                            </div>
                                        )}

                                        <NavLink
                                            to="/profile"
                                            className="text-white ml-2"
                                        >
                                            {`${user?.firstName} ${user?.lastName}`}
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <NavLink
                                        to="./login"
                                        className="text-white/50 hover:text-white transition-all duration-200"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
}
