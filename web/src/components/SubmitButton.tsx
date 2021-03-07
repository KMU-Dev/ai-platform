import { Button, CircularProgress, createStyles, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative'
        },
        progress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        }
    })
);

interface Props {
    variant?: "contained" | "text" | "outlined"
    onSubmit?: (event?: React.FormEvent) => void
    disabled?: boolean
    inProgress?: boolean
    children?: React.ReactNode
    className?: string
}

export default function SubmitButton(props: Props) {
    const { children, disabled, inProgress, onSubmit, variant, className } = props;

    const classes = useStyles();

    return (
        <div className={clsx(classes.root, className)}>
            <Button type="submit" disabled={disabled} variant={variant} color="primary" fullWidth={true} onSubmit={onSubmit}>{children}</Button>
            {inProgress ? <CircularProgress size={24} className={classes.progress} /> : ""}
        </div>
    );
}