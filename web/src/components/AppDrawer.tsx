import { Avatar, createStyles, Divider, Drawer, Link, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";

const drawerWidth = 256;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            height: "100%",
        },
        accountContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: theme.spacing(2),
        },
        avatar: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
        avatarIcon: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        username: {
            margin: theme.spacing(2, 0, 0, 0),
            fontSize: "16px",
        },
    })
);

export default function AppDrawer() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper
            }}
            variant="permanent"
            open
        >
            <Toolbar />
            <div className={classes.accountContainer}>
                <Avatar className={classes.avatar}>
                    <Person className={classes.avatarIcon} />
                </Avatar>
                <Typography variant="h6" className={classes.username}>
                    Admin
                </Typography>
                <Typography variant="body2">
                    Group:&nbsp;
                    <Link href="/profile">
                        System Admin
                    </Link>
                </Typography>
            </div>
            <Divider />
        </Drawer>
    );
}