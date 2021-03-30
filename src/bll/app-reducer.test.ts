import {
    addCommentOnSuccess,
    addPostOnSuccess,
    appReducer,
    AppStateType,
    editPostOnSuccess,
    removePostOnSuccess,
    setPostOnSuccess,
    setPostsOnSuccess
} from "./app-reducer";

let startState: AppStateType = {
    isInitializing: false,
    isLoading: false,
    posts: [
        {id: 1, body: "I like write posts", title: "Post 1"},
        {id: 2, body: "I like swim in pool", title: "Post 2"},
        {id: 3, body: "I like football", title: "Post 3"},
        {id: 4, body: "I like dancing", title: "Post 4"},
    ],
    postData: {
        id: 2,
        body: "I like dancing",
        title: "Post 4",
        comments: [
            {id: 22, comment: "Me too", postId: 2}
        ]
    },
    modalIsOpen: false,
    error: null
}

beforeEach(() => {
    startState = {
        isInitializing: false,
        isLoading: false,
        posts: [
            {id: 1, body: "I like write posts", title: "Post 1"},
            {id: 2, body: "I like swim in pool", title: "Post 2"},
            {id: 3, body: "I like football", title: "Post 3"},
            {id: 4, body: "I like dancing", title: "Post 4"},
        ],
        postData: {
            id: 2,
            body: "I like dancing",
            title: "Post 4",
            comments: [
                {id: 22, comment: "Me too", postId: 2}
            ]
        },
        modalIsOpen: false,
        error: null
    }
})

test("should successfully set new posts", () => {
    const action = setPostsOnSuccess([
        {id: 43, body: "Big body", title: "Title new"},
        {id: 53, body: "I love react.js", title: "React is cool"},
        {id: 63, body: "HTML&CSS", title: "Basic"},
        {id: 73, body: "Webpack", title: "Bundle"},
        {id: 83, body: "redux", title: "State management"},
        {id: 93, body: "Potato", title: "Yahooo"},
        {id: 103, body: "Tik tok", title: "Social network"},
    ]);
    const endState = appReducer(startState, action);
    expect(endState.posts.length).toBe(7);
    expect(endState.posts[6].body).toBe("Tik tok");
    expect(endState.posts[1].title).toBe("React is cool");
    expect(endState.posts[4].id).toBe(83);
})

test("should successfully set post data", () => {
    const action = setPostOnSuccess({id: 43, body: "Big body", title: "Title new", comments: []});
    const endState = appReducer(startState, action);
    expect(endState.postData).toBeDefined();
    expect(endState.postData?.body).toBe("Big body");
    expect(endState.postData?.comments.length).toBe(0);
})

test("5th post should be added at the beginning", () => {
    const action = addPostOnSuccess({id: 5, body: "This is 5th post", title: "Post 5"});
    const endState = appReducer(startState, action);
    expect(endState.posts.length).toBe(5);
    expect(endState.posts[0].body).toBe("This is 5th post");
})

test("post with id 3 should be removed", () => {
    const action = removePostOnSuccess(3)
    const endState = appReducer(startState, action);
    expect(endState.posts.length).toBe(3);
    expect(endState.posts[2].id).toBe(4);
})

test("post with id 2 should be edited", () => {
    const action = editPostOnSuccess({id: 2, body: "Hello", title: "World", comments: []})
    const endState = appReducer(startState, action);
    expect(endState.posts[1].title).toBe("World");
    expect(endState.posts[1].body).toBe("Hello");
    expect(endState.posts[0].title).toBe("Post 1");
    expect(endState.posts[2].title).toBe("Post 3");
})

test("post data should receive new comments", () => {
    const action = addCommentOnSuccess({
        id: 2,
        body: "I like dancing",
        title: "Post 4",
        comments: [
            {id: 24, comment: "Hey yo", postId: 2},
            {id: 23, comment: "Boom", postId: 2},
            {id: 22, comment: "Me too", postId: 2},
        ]
    },)
    const endState = appReducer(startState, action);
    expect(endState.postData?.comments.length).toBe(3);
    expect(endState.postData?.comments[1].comment).toBe("Boom");
})