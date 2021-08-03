import { AppBarComponent } from "./components/app-bar/AppBarComponent";
import { ExpenseManager } from "./components/expense-manager/ExpenseManager";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import { PageNotFound } from "components/page-not-found/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <AppBarComponent />
      <Switch>
        <Route exact path="/transactions" component={ExpenseManager} />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
