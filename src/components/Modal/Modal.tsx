import {Button, createStyles, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import {useFormik} from "formik";
import {IPostWithCommentsType} from "../../api/api";
import {useDispatch} from "react-redux";
import {editPost} from "../../bll/app-reducer";

type ModalComponentType = {
    postData: IPostWithCommentsType
    open: boolean
    closeModal: () => void
}

type FormikErrorType = {
    title?: string
    body?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            top: "50%",
            left: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            width: "80%",
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),

            "& form": {
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",

                "& div": {
                    display: "flex",
                    justifyContent: "space-between"
                }
            }
        },
        textField: {
            margin: "20px 0"
        },
        button: {
            maxWidth: "30%",
        }
    }),
);


export const ModalComponent:React.FC<ModalComponentType> = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            title: props.postData.title,
            body: props.postData.body,
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
            dispatch(editPost({
                id: props.postData.id,
                body: values.body,
                title: values.title
            }))
            props.closeModal();
            formik.resetForm();
        },
    });

    const body = (
        <div className={classes.paper}>
            <Typography variant="h4" gutterBottom >Edit post</Typography>
          <form onSubmit={formik.handleSubmit}>
              <TextField
                  className={classes.textField}
                  label="Title"
                  placeholder="Post title"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                  className={classes.textField}
                  label="Post body"
                  multiline
                  rows={6}
                  placeholder="Type something..."
                  id="body"
                  name="body"
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  error={formik.touched.body && Boolean(formik.errors.body)}
                  helperText={formik.touched.body && formik.errors.body}
              />
              <div>
                  <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      type="submit">Edit post</Button>
                  <Button
                      onClick={props.closeModal}
                      className={classes.button}
                      variant="contained"
                      color="secondary">Cancel</Button>
              </div>
          </form>
        </div>
    );

    return(
        <Modal onClose={props.closeModal} open={props.open}>
            {body}
        </Modal>
    )
}