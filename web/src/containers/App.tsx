import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import TopAppBar from "../components/TopAppBar";
import AppDrawer from "../components/AppDrawer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: "100%",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
        },
        main: {
            display: "flex",
            flexGrow: 1,
        },
    })
);

interface Props {
    children: React.ReactNode
}

export default function App(props: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopAppBar/>
            <div className={classes.main}>
                <AppDrawer />
                {props.children}
            </div>
        </div>
    );
}
