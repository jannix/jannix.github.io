import React from 'react';
import './App.scss';
import LogoConnection from "./components/logo/Logo.component";
import LoginForm from "./components/forms/LoginForm.component";

function App() {
  return (
    <div className="App">
        <LogoConnection/>
        <LoginForm/>
    </div>
  );
}

export default App;
