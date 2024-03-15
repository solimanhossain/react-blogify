import { actions } from "../actions";

const initialState = {
    blogs: [],
    loading: false,
    error: null,
};

const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blog.DATA_CREATED: {
            return {
                ...state,
                loading: false,
                posts: [...state.blogs, action.data],
            };
        }

        case actions.blog.DATA_DELETED: {
            return {
                ...state,
                loading: false,
                blogs: state.posts.filter((item) => item.id !== action.data),
            };
        }

        case actions.blog.DATA_EDITED: {
            return {
                ...state,
                loading: false,
                user: action.data,
            };
        }

        default: {
            return state;
        }
    }
};

export { initialState, blogReducer };
