import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, getPosts} from "./bll/app-reducer";
import {CircularProgress, Container, LinearProgress} from "@material-ui/core";
import {Posts} from "./components/Posts/Posts";
import {AddPost} from "./components/AddPost/AddPost";
import {Redirect, Route, Switch} from "react-router";
import {PostPage} from "./components/PostPage/PostPage";
import {ErrorSnackbar} from "./components/Error/Error";

export function App() {

    const dispatch = useDispatch();
    const isInitializing = useSelector<AppStateType, boolean>(state => state.isInitializing);
    const isLoading = useSelector<AppStateType, boolean>(state => state.isLoading);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <div className="App">
            {isLoading && <LinearProgress
                color="secondary"
                style={{position: "fixed", top: 0, left: 0, width: "100%", zIndex: 99}}/>}
            {
                isInitializing
                    ? <CircularProgress/>
                    : <Container fixed>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={"/posts"}/>}/>
                            <Route exact path="/posts" render={() => <>
                                <AddPost/>
                                <Posts/>
                            </>}/>
                            <Route path={"/posts/:postId?"} render={() => <PostPage />}/>
                            <Route path={"/*"} render={() => <div>Page not found!</div>}/>
                        </Switch>
                    </Container>
            }
            <ErrorSnackbar />
        </div>
    );
}
