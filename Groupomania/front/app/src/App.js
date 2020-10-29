import React from 'react';
import './App.scss';
import LogoConnection from "./components/logo/Logo.component";
import LoginForm from "./components/forms/LoginForm.component";


function App() {
    function handleClickFirstTime() {
        console.log('testest');
    }

  return (
    <div className="App">
        <LogoConnection/>
        <LoginForm onUserClickFirstTime={handleClickFirstTime}/>
        //TODO: create form sign up, hide it then unhide when handleClickFirstTime
    </div>
  );
}

export default App;
