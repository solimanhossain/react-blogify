import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    let err = useRouteError();

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl m-4">Opps!</h1>
            <p className="text-xl text-red-700">
                {err.status + ", " + err.statusText}
            </p>
            <Link to="/" className="text-blue-700 underline">
                ↩ Go Home
            </Link>
        </main>
    );
}
