import { useEffect } from "react";
import { axiosAPI } from "../axiosapi";
import useAuth from "./useAuth";
import axios from "axios";

export default function useAxios() {
    const { auth, setAuth } = useAuth();
    const user = auth?.user;

    useEffect(() => {
        const requestIntercept = axiosAPI.interceptors.request.use(
            (config) => {
                const token = auth?.accessToken;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseIntercept = axiosAPI.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const oldToken = auth?.refreshToken;
                        const response = await axios.post(
                            `${
                                import.meta.env.VITE_BASE_URL
                            }/auth/refresh-token`,
                            { refreshToken: oldToken }
                        );
                        const { accessToken, refreshToken } = response.data;
                        localStorage.setItem(
                            "react-blogifly-user",
                            JSON.stringify({ user, accessToken, refreshToken })
                        );
                        setAuth({ ...auth, accessToken, refreshToken });
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return axios(originalRequest);
                    } catch (error) {
                        console.log(error);
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosAPI.interceptors.request.eject(requestIntercept);
            axiosAPI.interceptors.response.eject(responseIntercept);
        };
    }, [auth.accessToken]);
    return { axiosAPI };
}
