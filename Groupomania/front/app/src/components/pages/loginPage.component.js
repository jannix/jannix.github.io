import React, {useState} from 'react';
import './_login-page.scss';
import LogoConnection from "./../logo/Logo.component";
import LoginForm from "./../forms/LoginForm.component";
import { CSSTransition } from 'react-transition-group';
import SigninForm from "./../forms/SigninForm.component";


function LoginPage(props) {
    const nodeRef = React.useRef(null);
    const [showLogin, setShowLogin] = useState(true);
    const [showSignin, setShowSignin] = useState(false);
    function handleClickFirstTime() {
        setShowLogin(false);
    }

    return (
        <div className="login-page-container">
            <LogoConnection/>
            <div className="transition-container">
                <CSSTransition in={showLogin} timeout={300} classNames="login" unmountOnExit
                               onEnter={() => setShowLogin(true)}
                               onExited={() => setShowSignin(true)}
                               nodeRef={nodeRef}>
                    <div ref={nodeRef}>
                        <LoginForm onUserClickFirstTime={handleClickFirstTime} routerHistory={props.history}/>
                    </div>
                </CSSTransition>
                <CSSTransition in={showSignin} timeout={300} classNames="signin" unmountOnExit
                               onEnter={() => setShowLogin(false)}
                               onExited={() => setShowLogin(true)}
                               nodeRef={nodeRef}>
                    <div ref={nodeRef}>
                        <SigninForm onClose={() => setShowSignin(false)} onClickReturn={() => setShowSignin(false)}
                                    routerHistory={props.history}/>
                    </div>
                </CSSTransition>
            </div>
        </div>
    );
}

export default LoginPage;
