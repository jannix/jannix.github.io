import React, {useState} from 'react';
import './_user-account.scss';
import AccountSettingsPanel from "../settings/AccountSettingsPanel.component";
import {
    useHistory,
    useLocation
} from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import Header from "../common/Header.component";
import UpdateMailPanel from "../forms/UpdateMailPanel.component";
import UpdatePasswordPanel from "../forms/UpdatePasswordPanel.component";

function UserAccount() {

    const nodeRef = React.useRef(null);
    const nodeRef2 = React.useRef(null);
    const nodeRef3 = React.useRef(null);
    const [displayAccountSettings, setDisplayAccountSettings] = useState(true);
    const [displayChangeMail, setDisplayChangeMail] = useState(false);
    const [displayChangePassword, setDisplayChangePassword] = useState(false);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    let goToLogin = () => {
        history.replace(from);
    };

    let switchDisplayAccountSettings = () => {
        setDisplayAccountSettings(!displayAccountSettings);
    };

    function closeUpdaters(): void {
        setDisplayChangeMail(false);
        setDisplayChangePassword(false);
        switchDisplayAccountSettings();
    }

    return (
        <div className="user-account-container">
            <Header routerHistory={history}/>
            <CSSTransition in={displayAccountSettings} timeout={1000} appear={true} classNames="from-left" unmountOnExit
                           onEnter={() => setDisplayAccountSettings(true)}
                           onExited={() => setDisplayAccountSettings(false)}
                           nodeRef={nodeRef}>
                <div ref={nodeRef}>
                    <AccountSettingsPanel errorAuth={goToLogin} panelBehavior={switchDisplayAccountSettings} showChangeMail={setDisplayChangeMail}
                                          showChangePassword={setDisplayChangePassword}
                                          routerHistory={history}/>
                </div>
            </CSSTransition>
            <CSSTransition in={displayChangeMail} timeout={1000} appear={true} classNames="from-right" unmountOnExit
                           onEnter={() => setDisplayChangeMail(true)}
                           onExited={() => setDisplayChangeMail(false)}
                           nodeRef={nodeRef2}>
                <div ref={nodeRef2}>
                    <UpdateMailPanel routerHistory={history} closeBehavior={closeUpdaters}/>
                </div>
            </CSSTransition>
            <CSSTransition in={displayChangePassword} timeout={1000} appear={true} classNames="from-right" unmountOnExit
                           onEnter={() => setDisplayChangePassword(true)}
                           onExited={() => setDisplayChangePassword(false)}
                           nodeRef={nodeRef3}>
                <div ref={nodeRef3}>
                    <UpdatePasswordPanel routerHistory={history} closeBehavior={closeUpdaters}/>
                </div>
            </CSSTransition>
        </div>
    );


}

export default UserAccount;
