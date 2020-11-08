import React from 'react';
import './App.scss';
import LoginPage from "./components/pages/loginPage.component";
import { Switch, Route } from "react-router-dom";
import UserAccount from "./components/pages/userAccount.component";
import GuardedRoute from "./utils/guardedRoute";


function App() {

  return (
    <div className="App">
        <Switch>
            <Route exact  path={["/", "/login"]} component={LoginPage} />
            <GuardedRoute path='/settings/account' component={UserAccount}/>
        </Switch>
    </div>
  );
}

export default App;
