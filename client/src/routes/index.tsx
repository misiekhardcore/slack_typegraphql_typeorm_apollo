import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./Home";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
