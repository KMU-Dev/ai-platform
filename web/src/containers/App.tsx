import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { matchPath, Route, useHistory } from "react-router";
import { Location } from "history";
import { useEffect } from 'react';
import localforage from 'localforage';
import localforageKeys from "../constants/localforage.json";
import { SavedAccessToken } from '../models/auth';
import TopAppBar from "../components/TopAppBar";
import AppDrawer from "../components/AppDrawer";
import routes from "../constants/routes.json";
import Login from "./Login";

const layoutExcludePaths = [routes.LOGIN];

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
    const history = useHistory();

    useEffect(() => {
        const getAccessToken = async () => {
            const token = await localforage.getItem<SavedAccessToken>(localforageKeys.ACCESS_TOKEN);
            if (!(token && token.expires_at > Date.now())) {
                // redirect user to login page
                history.push("login", { next: history.location.pathname });
            }
        }

        getAccessToken();
    }, [history]);

    const shouldShowLayout = (location: Location) => {
        let hasRoute = false;
        for (let key in routes) {
            const routePath = routes[key as keyof typeof routes];
            const match = matchPath(location.pathname, {
                path: routePath,
                exact: true,
            });
          
            if (match) {
                hasRoute = true;
                break;
            }
        }
    
        return !layoutExcludePaths.includes(location.pathname) && hasRoute;
    }

    return (
        <div className={classes.root}>
            <Route path={routes.LOGIN} exact component={Login} />
            <Route render={({location}) => shouldShowLayout(location) ? <AppLayout>{props.children}</AppLayout> : ""} />
        </div>
    );
}

function AppLayout(props: Props) {
    const classes = useStyles();

    return (
        <>
            <TopAppBar/>
            <div className={classes.main}>
                <AppDrawer />
                {props.children}
            </div>
        </>
    )
}
