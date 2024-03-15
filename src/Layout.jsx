import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import FooterBar from "./components/FooterBar";
import BlogProvider from "./providers/BlogProvider";
import ProfileProvider from "./providers/ProfileProvider";

export default function Layout() {
    return (
        <>
            <ProfileProvider>
                <NavBar />
                <BlogProvider>
                    <Outlet />
                </BlogProvider>
            </ProfileProvider>
            <FooterBar />
        </>
    );
}
