import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import Routes from "./routes";

const App = (): JSX.Element => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
