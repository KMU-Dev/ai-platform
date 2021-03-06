import { Avatar, Box, Button, Collapse, createStyles, Divider, Drawer, Link, List, ListItem, ListSubheader, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { BarChart, ExpandLess, ExpandMore, PeopleAlt, Person } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { matchPath, useLocation } from "react-router";
import clsx from "clsx";
import { useState } from "react";

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
        menuRoot: {
            padding: theme.spacing(2),
        },
        subheader: {
            // color: grey[700],
            fontWeight: 600,
            fontSize: "0.94rem",
        },
        listItem: {
            display: "flex",
            padding: theme.spacing(0),
        },
        listItemButton: {
            width: "100%",
            padding: theme.spacing(1),
            justifyContent: "flex-start",
            color: grey[600],
            textTransform: "none",
        },
        listItemButtonPrimary: {
            color: theme.palette.primary.main,
        },
        listItemButtonIcon: {
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            margin: theme.spacing(0, 1, 0, 0),
        },
        buttonText: {
            fontWeight: 500,
        },
    })
);

export default function AppDrawer() {
    const classes = useStyles();

    const [openedList, setOpenedList] = useState<boolean[]>([]);

    const location = useLocation();

    const menuSpecs: MenuListSpec[] = [
        { 
            subheader: "Overview",
            items: [
                { type: "item", message: "Dashboard", href: "/admin", path: "/admin", icon: <BarChart className={classes.listItemButtonIcon} /> },
                { type: "item", message: "Users", href: "/admin/users", path: "/admin/users", icon: <PeopleAlt className={classes.listItemButtonIcon} /> },
            ]
        }
    ];

    const isButtonColorPrimary = (path?: string) => {
        if (!path) return false;

        const match = matchPath(location.pathname, {path, exact: true});
        if (match) return true;
        return false;
    }

    const getListItemContent = (listItemSpec: MenuListItemSpec) => (
        <Button
            variant="text"
            component={RouterLink}
            to={listItemSpec.href!}
            className={clsx(classes.listItemButton, isButtonColorPrimary(listItemSpec.path) && classes.listItemButtonPrimary)}
        >
            {listItemSpec.icon}
            <span className={classes.buttonText}>{listItemSpec.message}</span>
        </Button>
    )

    const getListItems = (listItemSpecs: MenuListItemSpec[], itemClassName?: string) => (
        listItemSpecs.map((listItemSpec, index) => {
            if (listItemSpec.type === "item") {
                return (
                    <ListItem className={clsx(classes.listItem, itemClassName)} disableGutters>
                        {getListItemContent(listItemSpec)}
                    </ListItem>
                );
            } else {
                setOpenedList(openedList => [...openedList, false]);
                return (
                    <>
                        <ListItem button className={clsx(classes.listItem, itemClassName)} disableGutters>
                            {getListItemContent(listItemSpec)}
                            {openedList[index] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openedList[index]} timeout="auto" unmountOnExit>
                            <List component="div">
                                {getListItems(listItemSpec.collapsedList!)}
                            </List>
                        </Collapse>
                    </>
                );
            }
        })
    )

    const menu = menuSpecs.map((menuListSpec) => (
        <Box className={classes.menuRoot}>
            <List
                subheader={
                    <ListSubheader
                        component="div"
                        disableGutters
                        className={classes.subheader}
                    >
                        {menuListSpec.subheader}
                    </ListSubheader>
                }
            >
                <List disablePadding>
                    {getListItems(menuListSpec.items)}
                </List>
            </List>
        </Box>
    ));

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
            {menu}
        </Drawer>
    );
}

interface MenuListSpec {
    subheader: string
    items: MenuListItemSpec[]
}

interface MenuListItemSpec {
    type: "item" | "collapse"
    message: string
    href?: string
    path?: string
    icon?: JSX.Element
    collapsedList?: MenuListItemSpec[]
}
