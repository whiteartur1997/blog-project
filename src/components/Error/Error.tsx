import {useDispatch, useSelector} from "react-redux";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {AppStateType, setError} from "../../bll/app-reducer";
import {Snackbar} from "@material-ui/core";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackbar() {

    const error = useSelector<AppStateType, string | null>(state => state.error);
    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setError(null));
    };

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
}