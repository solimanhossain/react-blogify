import { useContext } from "react";
import { BlogContext } from "../context";

export default function useBlogs() {
    return useContext(BlogContext);
}
