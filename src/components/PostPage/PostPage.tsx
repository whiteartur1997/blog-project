import React, {useEffect, useState} from "react";
import {Redirect, useLocation, useParams} from "react-router";
import {addComment, AppStateType, getPost, removePost, setPostOnSuccess} from "../../bll/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, CardContent, Container, makeStyles, TextField, Typography} from "@material-ui/core";
import {IPostWithCommentsType} from "../../api/api";
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {ModalComponent} from "../Modal/Modal";

type FormikErrorType = {
    comment?: string
}

const useStyles = makeStyles({
    leftAlign: {
        textAlign: "left"
    },
    comment: {
        margin: "10px 0"
    }
});


export const PostPage = () => {
    let location: { state: any } = useLocation();
    let startModalIsOpen = false;

    if (location.state?.modalIsOpenProp) {
        startModalIsOpen = location.state.modalIsOpenProp
    }
    const [modalIsOpen, setModalIsOpen] = useState(startModalIsOpen);
    const classes = useStyles();
    const dispatch = useDispatch();
    const {postId} = useParams<{ postId: string }>();
    const postData = useSelector<AppStateType, IPostWithCommentsType | null>(state => state.postData);
    const [postDeleted, setPostDeleted] = useState(false);


    const removePostHandler = () => {
        dispatch(removePost(+postId));
        setPostDeleted(true);
    }

    const closeModalHandler = () => {
        setModalIsOpen(false);
    }

    const openModalHandler = () => {
        setModalIsOpen(true);
    }

    const formik = useFormik({
        initialValues: {
            comment: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.comment) {
                errors.comment = "Title is required!";
            }
            return errors;
        },

        onSubmit: (values) => {
            dispatch(addComment(+postId, values.comment));
            formik.resetForm()
        },
    });

    useEffect(() => {
        dispatch(getPost(postId));

        return () => {
            dispatch(setPostOnSuccess(null))
        }
    }, [postId, dispatch])

    if (postDeleted) {
        return <Redirect to={"/posts"}/>
    }

    return (
        <>
            <Container className={classes.leftAlign} fixed>
                <NavLink to={"/posts"}>Back to posts</NavLink>
                <div>
                    <Typography variant="h3" component="h3">
                        {postData && postData.title}
                    </Typography>
                    <Button onClick={openModalHandler} color="primary">Edit</Button>
                    <Button onClick={removePostHandler} color="secondary">Delete</Button>
                </div>
                <Typography component="p">
                    {postData && postData.body}
                </Typography>
                <Typography variant="h6" component="h6">
                    {postData && "Comments:"}
                </Typography>
                {
                    postData && postData.comments.length > 0
                        ? postData && postData.comments.map((comment, index) => {
                        return (
                            <Card className={classes.comment} key={comment.id} variant="outlined">
                                <CardContent>
                                    <Typography>
                                        {"Comment " + ++index}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {comment.comment}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                        : <Typography component="p" gutterBottom={true}>
                            No comments yet. Write the first!
                        </Typography>
                }
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="comment"
                        name="comment"
                        label="Add Comment"
                        style={{cursor: "pointer"}}
                        placeholder="What do you think?"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        error={formik.touched.comment && Boolean(formik.errors.comment)}
                        helperText={formik.touched.comment && formik.errors.comment}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        style={{cursor: "pointer"}}
                        variant="contained"
                        color="primary"
                        type="submit">Add comment</Button>
                </form>
            </Container>
            {modalIsOpen && postData && <ModalComponent
                closeModal={closeModalHandler}
                postData={postData}
                open={modalIsOpen}/>}
        </>
    )
}