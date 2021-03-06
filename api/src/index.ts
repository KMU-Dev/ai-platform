import express from "express";
import helmet from "helmet";
import { apolloServer } from "./graphql";
import { InitService } from "./service/init";

// express app
const app = express();
const port = 8080;

apolloServer.applyMiddleware({ app, path: "/graphql" });

// configure midleware
app.use(helmet());

app.listen(port, async () => {
    // init Application
    const initService = InitService.getInstance();
    await initService.init();

    console.log(`🚀 AI Platform server ready at http://localhost:${port}`);
    console.log(`🚀 Apollo server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
});
