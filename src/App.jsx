import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./Layout.jsx";
import { Protected, LogedIn } from "./Protected.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import ShowProfile from "./components/profile/ShowProfile.jsx";
import UpdateBlog from "./pages/UpdateBlog.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                element: <Protected />,
                children: [
                    {
                        path: "/createBlog",
                        element: <CreateBlog />,
                    },
                    {
                        path: "/profile",
                        element: <Profile />,
                    },
                ],
            },
            {
                element: <LogedIn />,
                children: [
                    {
                        path: "/register",
                        element: <Register />,
                    },
                    {
                        path: "/login",
                        element: <Login />,
                    },
                ],
            },
            {
                path: "/blogs/:blogId",
                element: <SingleBlog />,
            },
            // {
            //     path: "/blogs/:editId/edit",
            //     element: <UpdateBlog />,
            // },
            {
                path: "/profile/:profileId",
                element: <ShowProfile />,
            },
            // {
            //     path: "*",
            //     element: <ErrorPage />,
            // },
        ],
    },
]);

export default function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
