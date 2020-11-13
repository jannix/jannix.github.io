import React from 'react';
import './_user-account.scss';
import AccountSettingsPanel from "../settings/AccountSettingsPanel.component";
import {
    useHistory,
    useLocation
} from "react-router-dom";


function UserAccount() {

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    let goToLogin = () => {
        history.replace(from);
    };

    return (
        <div className="user-account-container">
            <AccountSettingsPanel errorAuth={goToLogin}/>
            <div>
                {/*TODO: Logo groupo, or setter, or nothing if phone*/}
            </div>
        </div>
    );
}

export default UserAccount;
