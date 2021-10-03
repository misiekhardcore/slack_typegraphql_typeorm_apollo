import decode from "jwt-decode";
import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import CreateTeam from "./CreateTeam";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ViewTeam from "./ViewTeam";

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token") || "";
  const refreshToken = localStorage.getItem("refreshToken") || "";
  try {
    decode(token);
    decode(refreshToken);
  } catch (error) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route
        exact
        path="/view-team/:teamId?/:channelId?"
        component={ViewTeam}
      />
      <PrivateRoute exact path="/create-team" component={CreateTeam} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
