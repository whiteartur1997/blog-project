import {Button, Card, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";
import {IPostType} from "../../../api/api";
import {NavLink} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {removePost} from "../../../bll/app-reducer";
import React from "react";

type PostComponentType = {
    post: IPostType
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: "20px",
    },
    leftAlign: {
        textAlign: "left"
    },
    postTitle: {
        textDecoration: "none"
    }
});


export const Post: React.FC<PostComponentType> = ({post}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const removePostHandler = () => {
        dispatch(removePost(post.id));
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <NavLink to={{
                    pathname: `/posts/${post.id}`,
                    state: {modalIsOpenProp: false}
                }}>
                    <Typography gutterBottom variant="h5" component="h2" style={{textDecoration: 'none'}}
                                className={`${classes.leftAlign} ${classes.postTitle}`}>
                        {post.title}
                    </Typography>
                </NavLink>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.leftAlign}>
                    {post.body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <NavLink
                        style={{textDecoration: 'none'}}
                        to={{
                            pathname: `/posts/${post.id}`,
                            state: {modalIsOpenProp: true}
                        }}>
                        Edit
                    </NavLink>
                </Button>
                <Button onClick={removePostHandler} size="small" color="secondary">
                   Delete
                </Button>
            </CardActions>
        </Card>
    );
}