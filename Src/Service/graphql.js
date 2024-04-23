import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: `http://192.168.165.88:9000/graphql` ,
  cache: new InMemoryCache(),
}); 


  // uri: `https://api.hireacar.pk/graphql` as any,