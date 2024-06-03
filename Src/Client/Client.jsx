import { ApolloClient, InMemoryCache } from '@apollo/client';
const BASE_URL = 'https://api.graphql.jobs/';

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

export default client;