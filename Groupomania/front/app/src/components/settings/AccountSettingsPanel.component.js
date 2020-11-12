import React from 'react';
import "./_accountsettings-panel.scss";
import SettingField from "./SettingField.component";

export default class AccountSettingsPanel extends React.Component {

    /*constructor(props) {
        super(props);
    }*/

    render() {
        return (
            <div className="account-settings-panel-container">
                <div>
                    <h1>Réglage du Compte</h1>
                    <section>
                        <h2>Logins</h2>
                        <div className="settings-field-container">
                            <SettingField settingTitle="Adresse Email" currentValue="placeholder@gmail.com"/>
                            <SettingField settingTitle="Changer le Mot de Passe" currentValue="******************"/>
                        </div>
                    </section>
                    <section>
                        <h2>Informations</h2>
                        <div className="settings-field-container">
                            <SettingField settingTitle="Nom" currentValue="Place"/>
                            <SettingField settingTitle="Prénom(s)" currentValue="Holder"/>
                            <SettingField settingTitle="Date de naissance" currentValue="20/20/2020"/>
                            <SettingField settingTitle="Pseudo" currentValue="Playzeholdeur"/>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
