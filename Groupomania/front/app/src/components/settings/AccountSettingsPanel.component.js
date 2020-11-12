import React from 'react';
import "./_accountsettings-panel.scss";

export default class AccountSettingsPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="account-settings-panel-container">
                <h1>Réglage du Compte</h1>
                <section>
                    <h2>Logins</h2>
                    <div className="settings-field-container">
                        <span>ICI Settings Email</span>
                        <span>ICI Settings Password</span>
                    </div>
                </section>
                <section>
                    <h2>Informations</h2>
                    <div className="settings-field-container">
                        <span>ICI Settings Nom</span>
                        <span>ICI Settings Prénom</span>
                        <span>ICI Settings Date de Naissance</span>
                        <span>ICI Settings Pseudo</span>
                    </div>
                </section>
            </div>
        );
    }
}
