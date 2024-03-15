import { actions } from "../actions";

export const initialState = {
    user: null,
    blogs: [],
    loading: false,
    error: null,
};

export function profileReducer(state, action) {
    switch (action.type) {
        case actions.profile.DATA_FATCHING: {
            return { ...state, loading: true };
        }
        case actions.profile.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                user: action.user,
                blogs: action.blogs,
            };
        }
        case actions.profile.DATA_FETCH_ERROR: {
            return { ...state, loading: false, error: action.error };
        }
        case actions.profile.DATA_EDITED: {
            return {
                ...state,
                loading: false,
                user: action.data,
            };
        }
        case actions.profile.IMAGE_UPDATED: {
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    avatar: action.data.user.avatar,
                },
            };
        }

        default: {
            return state;
        }
    }
}
