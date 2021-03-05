import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Routes from './containers/Routes';
import { BrowserRouter } from 'react-router-dom';

function Root() {
    const client = new ApolloClient({
        uri: "/grqphql",
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default Root;
