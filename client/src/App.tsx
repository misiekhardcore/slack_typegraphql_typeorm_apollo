import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import Routes from "./routes";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

const App = (): JSX.Element => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
