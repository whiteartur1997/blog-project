import axios from "axios";

const instance = axios.create({
    baseURL: "https://bloggy-api.herokuapp.com",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const postsApi = {
    getPosts() {
        return instance.get<IPostType[]>('/posts')
    },
    getPost(postId: string | number) {
        return instance.get<IPostWithCommentsType>(`/posts/${postId}?_embed=comments`)
    },
    addPost(title: string, body: string) {
        return instance.post<IPostType>('/posts', {title, body})
    },
    editPost({id, title, body}: IPostType) {
        return instance.put<IPostType>(`/posts/${id}`, { title, body})
    },
    removePost(postId: string | number) {
        return instance.delete<{}>(`/posts/${postId}`,)
    },
    addComment(postId: number, comment: string) {
        return instance.post('/comments', {postId, comment})
    }
}

// types
export interface IPostType {
    title: string
    body: string
    id: number
}

export interface IPostWithCommentsType extends IPostType{
    comments: CommentType[]
}

export type CommentType = {
    comment: string
    id: number
    postId: number
}