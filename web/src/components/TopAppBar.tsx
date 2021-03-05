import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle, NotificationsOutlined, SettingsOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: theme.zIndex.drawer + 1,
        },
        grow: {
            flexGrow: 1,
        }
    })
);

export default function TopAppBar() {
    const classes = useStyles();

    return (
        <AppBar position="sticky" className={classes.root}>
            <Toolbar>
                <Typography variant="h6">
                    AI Platform
                </Typography>
                <div className={classes.grow} />
                <IconButton color="inherit">
                    <NotificationsOutlined />
                </IconButton>
                <IconButton color="inherit">
                    <SettingsOutlined />
                </IconButton>
                <IconButton color="inherit">
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
