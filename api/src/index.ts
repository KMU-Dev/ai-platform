import express from "express";
import helmet from "helmet";
import { apolloServer } from "./graphql";

// express app
const app = express();
const port = 8080;

apolloServer.applyMiddleware({ app, path: "/qraphql" });

// configure midleware
app.use(helmet());

app.listen(port, () => {
    console.log(`🚀 AI Platform server ready at http://localhost:${port}`);
    console.log(`🚀 Apollo server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
});
