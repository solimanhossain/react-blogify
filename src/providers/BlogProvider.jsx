import { useReducer } from "react";
import { BlogContext } from "../context";
import { initialState, blogReducer } from "../reducers/BlogReducer";

export default function BlogProvider({ children }) {
    const [state, dispatch] = useReducer(blogReducer, initialState);
    return (
        <BlogContext.Provider value={{ state, dispatch }}>
            {children}
        </BlogContext.Provider>
    );
}
