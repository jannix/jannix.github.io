import React from 'react';
import './App.scss';
import LoginPage from "./components/pages/loginPage.component";
import { Switch, Route } from "react-router-dom";
import UserAccount from "./components/pages/userAccount.component";
import GuardedRoute from "./utils/guardedRoute";
import HomePage from "./components/pages/homePage.component";
import SubPage from "./components/pages/subPage.component";
import PostPage from "./components/pages/postPage.component";


function App() {

  return (
    <div className="App">
        <Switch>
            <Route exact  path={["/login"]} component={LoginPage} />
            <GuardedRoute path='/settings/account' component={UserAccount}/>
            <GuardedRoute path='/f/:subName/s/:postId' component={PostPage}/>
            <GuardedRoute path='/f/:subName' component={SubPage}/>
            <GuardedRoute path='/' component={HomePage}/>
        </Switch>
    </div>
  );
}

export default App;
