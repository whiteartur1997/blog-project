import {Button, Card, createStyles, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {addPost} from "../../bll/app-reducer";

type FormikErrorType = {
    title?: string
    body?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // maxWidth: "50%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            padding: "30px"
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: "80%"
        },
        textFieldTitle: {
            margin: theme.spacing(1),
            width: '25ch',
            maxWidth: '80%'
        },
        textFieldBody: {
            margin: theme.spacing(1),
            width: '90%'
        },
        button: {
            maxWidth: '30%'
        }
    }),
);

export const AddPost = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            title: '',
            body: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.title) {
                errors.title = "Title is required!";
            } else if (values.title.length > 30) {
                errors.title = "Title should be shorter than 30 symbols!";
            }
            if (!values.body) {
                errors.body = "Body text is required";
            }

            return errors;
        },

        onSubmit: (values) => {
            dispatch(addPost(values.title, values.body));
            formik.resetForm();
        },
    });


    const classes = useStyles();

    return(
        <Card className={classes.root}>
            <Typography variant="h3" gutterBottom >
                Write new post
            </Typography>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <TextField
                    label="Title"
                    placeholder="Post title"
                    className={classes.textFieldTitle}
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    multiline
                    rows={6}
                    placeholder="Type something..."
                    className={classes.textFieldBody}
                    id="body"
                    name="body"
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit">Add post</Button>
            </form>
        </Card>
    )
}