import React from 'react';
import './_user-account.scss';
import AccountSettingsPanel from "../settings/AccountSettingsPanel.component";


function UserAccount() {

    return (
        <div className="user-account-container">
            <AccountSettingsPanel/>
            <div>
                {/*TODO: Logo groupo, or setter, or nothing if phone*/}
            </div>
        </div>
    );
}

export default UserAccount;
