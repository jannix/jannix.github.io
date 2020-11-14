import React, {useState} from 'react';
import './_user-account.scss';
import AccountSettingsPanel from "../settings/AccountSettingsPanel.component";
import {
    useHistory,
    useLocation
} from "react-router-dom";
import useWindowDimensions from '../../utils/useWindowDimensions';
import {BREAKPOINT_TABLET_SIZE} from "../../constants/sizeconst";
import { CSSTransition } from 'react-transition-group';


function UserAccount() {

    const nodeRef = React.useRef(null);
    const [hideAccountSettings, setHideAccountSettings] = useState(false);
    const { width } = useWindowDimensions();
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    let goToLogin = () => {
        history.replace(from);
    };

    let switchDisplayAccountSettings = () => {
        console.log('SWITCH');
        setHideAccountSettings(!hideAccountSettings);
    };

    if (width > BREAKPOINT_TABLET_SIZE) {
        return (
            <div className="user-account-container">
                <AccountSettingsPanel errorAuth={goToLogin}/>
                <div className="logo-container">
                    <h3>Groupomania</h3>
                </div>
            </div>
        );
    } else {
        return (
            <div className="user-account-container">

                    <CSSTransition in={!hideAccountSettings} timeout={300} classNames="account-settings" unmountOnExit
                                   onEnter={() => setHideAccountSettings(false)}
                                   onExited={() => setHideAccountSettings(true)}
                                   nodeRef={nodeRef}>
                        <div ref={nodeRef}>
                            <AccountSettingsPanel errorAuth={goToLogin} panelBehavior={switchDisplayAccountSettings}/>
                        </div>
                    </CSSTransition>

            </div>
        );
    }


}

export default UserAccount;
