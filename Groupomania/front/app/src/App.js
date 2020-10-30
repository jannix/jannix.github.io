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
        setShowSignin(true);
    }

  return (
    <div className="App">
        <LogoConnection/>
        {showLogin && (
            <LoginForm onUserClickFirstTime={handleClickFirstTime}/>
        )}
        <CSSTransition in={showSignin} timeout={300} classNames="alert" unmountOnExit
                       onEnter={() => setShowLogin(false)}
                       onExited={() => setShowLogin(true)}
                       nodeRef={React.useRef()}>
            <SigninForm onClose={() => setShowSignin(false)} onClickReturn={() => setShowSignin(false)}/>
        </CSSTransition>
        {/*TODO: create form sign up, hide it then unhide when handleClickFirstTime*/}
    </div>
  );
}

export default App;
