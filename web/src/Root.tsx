import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Routes from './containers/Routes';
import { BrowserRouter } from 'react-router-dom';

export default function Root() {
    const client = new ApolloClient({
        uri: "/graphql",
        cache: new InMemoryCache(),
        connectToDevTools: true,
    });

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </ApolloProvider>
    );
}
