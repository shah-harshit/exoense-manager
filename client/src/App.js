import { AppBarComponent } from "./components/app-bar/AppBarComponent";
import { ExpenseManager } from "./components/expense-manager/ExpenseManager";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppBarComponent />
      <Switch>
        <Route exact path="/" component={ExpenseManager} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
