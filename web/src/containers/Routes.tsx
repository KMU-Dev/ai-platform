import { Route, Switch } from "react-router";
import routes from "../constants/routes.json";
import App from "./App";
import Login from "./Login";
import Register from "./Register";

export default function Routes() {
    return (
        <App>
            <Switch>
                <Route path={routes.LOGIN} exact component={Login} />
                <Route path={routes.REGISTER} exact component={Register} />
            </Switch>
        </App>
    );
}
