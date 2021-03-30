import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/app-reducer";
import {IPostType} from "../../api/api";
import {Post} from "./Post/Post";
import {Grid} from "@material-ui/core";

export const Posts = () => {
    const posts = useSelector<AppStateType, IPostType[]>(state => state.posts);

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {posts.map((post) => {
                return <Post key={post.id} post={post}/>
            })}
        </Grid>

    )
}