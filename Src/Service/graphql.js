import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: `https://api.hireacar.pk/graphql` ,
  cache: new InMemoryCache(),
}); 


  // uri: `https://api.hireacar.pk/graphql` as any,