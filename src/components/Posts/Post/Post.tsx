import {Button, Card, CardActionArea, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";
import {PostType} from "../../api/api";
import { NavLink } from 'react-router-dom'

type PostComponentType = {
    post: PostType
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: "20px",
    },

    leftAlign: {
        textAlign: "left"
    }
});


export const Post: React.FC<PostComponentType> = ({post}) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <NavLink to={"/users" + post.id}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.leftAlign}>
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.leftAlign}>
                            {post.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Edit
                        </Button>
                        <Button size="small" color="secondary">
                            Remove
                        </Button>
                    </CardActions>
                </CardActionArea>
            </NavLink>
        </Card>
    );
}