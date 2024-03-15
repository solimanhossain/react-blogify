import axios from "axios";

const axiosAPI = axios.create({
    baseURL: "http://localhost:3000",
});

export { axiosAPI };
