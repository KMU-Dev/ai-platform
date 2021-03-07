import { Box, Card, CardContent, Container, createStyles, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { blueGrey, grey } from "@material-ui/core/colors";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import SubmitButton from "../components/SubmitButton";
import { messages } from "../utils/yup";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/client";
import { User, UserInput } from "../graphql/types";
import { useHistory } from "react-router";
import routes from "../constants/routes.json";
import { Alert } from "@material-ui/lab";

const USER = loader("../graphql/mutation/user.gql");

interface FormData {
    username: string
    password: string
    confirm: string
    name: string
    email: string
}

const schema: yup.SchemaOf<FormData> = yup.object({
    username: yup.string()
            .required(messages.required("username"))
            .min(4, messages.min("username"))
            .max(16, messages.max("username")),
    password: yup.string()
            .required(messages.required("password"))
            .min(8, messages.min("password"))
            .max(64, messages.max("password")),
    confirm: yup.string()
            .required(messages.required("confirm password"))
            .oneOf([yup.ref("password")], "Password is inconsistent."),
    name: yup.string()
            .required(messages.required("name"))
            .min(2, messages.min("name"))
            .max(64, messages.max("name")),
    email: yup.string()
            .required(messages.required("email"))
            .max(256, messages.max("email"))
            .email(messages.email()),
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            background: blueGrey[50]
        },
        backHomeNav: {
            margin: theme.spacing(4, 0, 0)
        },
        errorAlert: {
            margin: theme.spacing(2, 0, 0)
        },
        card: {
            margin: theme.spacing(4, 0)
        },
        cardContent: {
            padding: theme.spacing(8, 4, 3, 4)
        },
        subtitle: {
            margin: theme.spacing(0.5, 0, 0),
            color: grey[600]
        },
        textFieldsDiv: {
            margin: theme.spacing(2, 0)
        },
        textField: {
            margin: theme.spacing(1.5, 0)
        },
        divider: {
            margin: theme.spacing(2, 0)
        },
        button: {
            margin: theme.spacing(2, 0, 0, 0),
        }
    })
);

export default function Register() {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm<FormData>({ resolver: yupResolver(schema) });
    const [signUp, { loading, error }] = useMutation<{ user: User }, { user: UserInput }>(USER);

    const onSubmit = handleSubmit(async ({ username, password, name, email }) => {
        const result = await signUp({
            variables: { user: { username, password, name, email } }
        });

        const user = result.data?.user;
        if (user) {
            // redirect to login page
            history.push(routes.HOME);
        }
    });

    return (
        <Box className={classes.root}>
            <Container maxWidth="sm">
                <Card elevation={2} className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h4">Sign up</Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>Sign up to our best AI Platform.</Typography>
                        {error && <Alert severity="error" className={classes.errorAlert}>{error.message}</Alert>}
                        <form onSubmit={onSubmit}>
                            <div className={classes.textFieldsDiv}>
                                <TextField
                                    inputRef={register}
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
                                    inputRef={register}
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth={true}
                                    autoFocus={true}
                                    helperText={errors.name?.message}
                                    error={Boolean(errors.name)}
                                    className={classes.textField}
                                />
                                <TextField
                                    inputRef={register}
                                    name="email"
                                    type="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth={true}
                                    autoFocus={true}
                                    helperText={errors.email?.message}
                                    error={Boolean(errors.email)}
                                    className={classes.textField}
                                />
                                <TextField
                                    inputRef={register}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth={true}
                                    helperText={errors.password?.message}
                                    error={Boolean(errors.password)}
                                    className={classes.textField}
                                />
                                <TextField
                                    inputRef={register}
                                    name="confirm"
                                    label="Confirm password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth={true}
                                    helperText={errors.confirm?.message}
                                    error={Boolean(errors.confirm)}
                                    className={classes.textField}
                                />
                                <SubmitButton
                                    variant="contained"
                                    disabled={loading}
                                    inProgress={loading}
                                    className={classes.button}
                                >
                                    Sign Up
                                </SubmitButton>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
