import { AuthContext } from "../context";
import { useState } from "react";

const user = JSON.parse(localStorage.getItem("react-blogifly-user")) ?? {};

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(user);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
