import { useMutation } from "@apollo/client";
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Container, createStyles, Divider, Link, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { blueGrey, green, grey } from "@material-ui/core/colors";
import { Lock } from "@material-ui/icons";
import { loader } from "graphql.macro";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useHistory } from "react-router-dom";
import routes from "../constants/routes.json";
import localforageKeys from "../constants/localforage.json";
import { AuthPayload, LoginVars } from "../graphql/types";
import localforage from "localforage";
import { Alert } from "@material-ui/lab";
import { SavedAccessToken } from "../models/auth";

const LOGIN = loader("../graphql/login.gql");

interface FormData {
    username: string
    password: string
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        backHomeNav: {
            margin: theme.spacing(0, 0, 10)
        },
        lockIconAvatar: {
            color: '#fff',
            background: green[500],
            padding: theme.spacing(1.5),
            position: "absolute",
            top: "-32px",
            left: "24px"
        },
        lockIcon: {
            fontSize: 36
        },
        box: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            background: blueGrey[50]
        },
        card: {
            top: theme.spacing(2),
            position: "relative",
            overflow: "visible"
        },
        cardContent: {
            padding: theme.spacing(8, 4, 3, 4)
        },
        subtitle: {
            margin: theme.spacing(0.5, 0, 0),
            color: grey[600]
        },
        errorAlert: {
            margin: theme.spacing(2, 0, 0)
        },
        textFieldsDiv: {
            margin: theme.spacing(2, 0)
        },
        textField: {
            margin: theme.spacing(2, 0)
        },
        divider: {
            margin: theme.spacing(2, 0)
        },
        buttonWrapper: {
            margin: theme.spacing(2, 0, 0, 0),
            position: 'relative'
        },
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        }
    })
);

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm<FormData>();
    const [login, { loading, error }] = useMutation<{ login: AuthPayload }, LoginVars>(LOGIN);

    const onSubmit = handleSubmit(async ({ username, password }) => {
        const result = await login({
            variables: {
                username,
                password,
            }
        });

        const authPayload = result.data?.login;
        if (authPayload) {
            // save access token if login is success
            const accessToken: SavedAccessToken = {
                access_token: authPayload.access_token,
                expires_at: Date.now() + authPayload.expires_in * 1000,
                token_type: authPayload.token_type,
            };

            await localforage.setItem(localforageKeys.ACCESS_TOKEN, accessToken);

            // redirect to home page
            history.replace((history.location.state as {next: string}).next || "/");
        }
    });

    return (
        <Box className={classes.box}>
            <Container maxWidth="sm">
                <Card elevation={2} className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Avatar variant="rounded" className={classes.lockIconAvatar}>
                            <Lock className={classes.lockIcon} />
                        </Avatar>
                        <Typography variant="h4">Sign in</Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>Sign in to our best AI Platform.</Typography>
                        {error && <Alert severity="error" className={classes.errorAlert}>{error.message}</Alert>}
                        <form onSubmit={onSubmit}>
                            <div className={classes.textFieldsDiv}>
                                <TextField
                                    inputRef={register({ required: "Username is required." })}
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth={true}
                                    autoFocus={true}
                                    helperText={errors.username?.message}
                                    error={Boolean(errors.username)}
                                    className={classes.textField}
                                />
                                <TextField
                                    inputRef={register({ required: "Password is required." })}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth={true}
                                    helperText={errors.password?.message}
                                    error={Boolean(errors.password)}
                                    className={classes.textField}
                                />
                                <div className={classes.buttonWrapper}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth={true}
                                        disabled={loading}
                                    >
                                        Log in
                                    </Button>
                                    {loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : ""}
                                </div>
                            </div>
                        </form>
                        <Divider variant="middle" className={classes.divider} />
                        <Link color="inherit" component={RouterLink} to={routes.REGISTER}>Create new account</Link>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}