import React, {useState} from 'react';
import './App.scss';
import LogoConnection from "./components/logo/Logo.component";
import LoginForm from "./components/forms/LoginForm.component";
import { CSSTransition } from 'react-transition-group';
import SigninForm from "./components/forms/SigninForm.component";


function App() {
    const [showLogin, setShowLogin] = useState(true);
    const [showSignin, setShowSignin] = useState(false);
    function handleClickFirstTime() {
        setShowLogin(false);
    }

  return (
    <div className="App">
        <LogoConnection/>

        <div className="transition-container">
            <CSSTransition in={showLogin} timeout={300} classNames="login" unmountOnExit
                           onEnter={() => setShowLogin(true)}
                           onExited={() => setShowSignin(true)}>
                <LoginForm onUserClickFirstTime={handleClickFirstTime}/>
            </CSSTransition>
            <CSSTransition in={showSignin} timeout={300} classNames="signin" unmountOnExit
                           onEnter={() => setShowLogin(false)}
                           onExited={() => setShowLogin(true)}>
                <SigninForm onClose={() => setShowSignin(false)} onClickReturn={() => setShowSignin(false)}/>
            </CSSTransition>
        </div>

        {/*TODO: create form sign up, hide it then unhide when handleClickFirstTime*/}
    </div>
  );
}

export default App;
