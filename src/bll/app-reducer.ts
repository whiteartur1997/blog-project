import {IPostType, IPostWithCommentsType, postsApi} from "../api/api";
import {Dispatch} from "redux";

const initialState = {
    isInitializing: true as boolean,
    isLoading: false as boolean,
    posts: [] as IPostType[],
    postData: null as IPostWithCommentsType | null,
    modalIsOpen: false as boolean,
    error: null as string | null
}

type ActionsType = ReturnType<typeof setPostsOnSuccess>
    | ReturnType<typeof setInit>
    | ReturnType<typeof addPostOnSuccess>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setPostOnSuccess>
    | ReturnType<typeof addCommentOnSuccess>
    | ReturnType<typeof editPostOnSuccess>
    | ReturnType<typeof removePostOnSuccess>
    | ReturnType<typeof setError>;
export type AppStateType = typeof initialState;

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case "SET-POSTS":
            return {...state, posts: action.posts}
        case "SET-POST":
            return {...state, postData: action.post}
        case "ADD-POST":
            return {...state, posts: [action.post, ...state.posts]}
        case "ADD-COMMENT":
            return {
                ...state,
                postData: action.post
            }
        case "EDIT-POST":
            return {
                ...state,
                postData: action.post,
                posts: state.posts.map(post => {
                    return post.id === action.post?.id
                        ? {id: action.post.id, title: action.post.title, body: action.post.body}
                        : post
                })
            }
        case "REMOVE-POST":
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId),
                postData: null
            }
        case "SET-INIT":
            return {...state, isInitializing: action.init}
        case "SET-LOADING":
            return {...state, isLoading: action.loading}
        case "SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

// thunks
export const getPosts = () => async (dispatch: Dispatch) => {
    try {
        const res = await postsApi.getPosts();
        dispatch(setPostsOnSuccess(res.data.reverse()));
    } catch (e) {
        dispatch(setError(e.message));
    } finally {
        dispatch(setInit(false));
    }
}

export const getPost = (postId: number | string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await postsApi.getPost(postId);
        dispatch(setPostOnSuccess(res.data))
    } catch (e) {
        dispatch(setError(e.message));
    } finally {
        dispatch(setLoading(false));
    }
}

export const addPost = (title: string, body: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await postsApi.addPost(title, body);
        dispatch(addPostOnSuccess(res.data))
    } catch (e) {
        dispatch(setError(e.message));
    } finally {
        dispatch(setLoading(false))
    }
}

export const editPost = (post: IPostType) =>
    async (dispatch: Dispatch, getState: () => AppStateType) => {
        try {
            dispatch(setLoading(true));
            const res = await postsApi.editPost(post);
            let currentPost = getState().postData;
            if (currentPost) {
                currentPost = {...res.data, comments: currentPost.comments}
            }
            dispatch(editPostOnSuccess(currentPost))
        } catch (e) {
            dispatch(setError(e.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

export const removePost = (postId: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        await postsApi.removePost(postId);
        dispatch(removePostOnSuccess(postId))
    } catch (e) {
        dispatch(setError(e.message));
    } finally {
        dispatch(setLoading(false));
    }
}

export const addComment = (postId: number, comment: string) =>
    async (dispatch: Dispatch, getState: () => AppStateType) => {
        const currentPost = getState().postData;
        try {
            dispatch(setLoading(true));
            const res = await postsApi.addComment(postId, comment);
            if (currentPost) {
                currentPost.comments = [...currentPost.comments, res.data]
                dispatch(addCommentOnSuccess(currentPost))
            }
        } catch (e) {
            dispatch(setError(e.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

// actions
export const setPostsOnSuccess = (posts: IPostType[]) => ({
    type: "SET-POSTS",
    posts
} as const);

export const setPostOnSuccess = (post: IPostWithCommentsType | null) => ({
    type: "SET-POST",
    post
} as const);

export const addPostOnSuccess = (post: IPostType) => ({
    type: "ADD-POST",
    post
} as const);

export const editPostOnSuccess = (post: IPostWithCommentsType | null) => ({
    type: "EDIT-POST",
    post
} as const);

export const removePostOnSuccess = (postId: string | number) => ({
    type: "REMOVE-POST",
    postId
} as const);

export const addCommentOnSuccess = (post: IPostWithCommentsType) => ({
    type: "ADD-COMMENT",
    post
} as const);

export const setInit = (value: boolean) => ({type: "SET-INIT", init: value} as const);

export const setLoading = (value: boolean) => ({
    type: "SET-LOADING",
    loading: value
} as const);

export const setError = (value: string | null) => ({
    type: "SET-ERROR",
    error: value
} as const);

