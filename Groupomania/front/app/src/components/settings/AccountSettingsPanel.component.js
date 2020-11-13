import React from 'react';
import "./_accountsettings-panel.scss";
import SettingField from "./SettingField.component";
import {getUserData} from "../../services/auth.service";

export default class AccountSettingsPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: 'Email non retrouvé', password: '***********',
            username: 'Pseudo non retrouvé', firstName: 'Prénom non retrouvé',
            lastName: 'Nom non retrouvé', job: '', birthdate: 'JJ/MM/AAAA'};
    }

    componentDidMount(): void {
        this.fillUserDatas();
    }

    fillUserDatas() {
        if (!localStorage.getItem('user-id')) {
            this.props.routerHistory.push('/');
            return;
        }
        getUserData(localStorage.getItem('user-id')).then((userData) => {
            this.setState({firstName: userData.userFound.firstName});
            this.setState({lastName: userData.userFound.lastName});
            this.setState({birthdate: userData.userFound.birthdate});
            this.setState({username: userData.userFound.username});
        });
    }

    render() {
        return (
            <div className="account-settings-panel-container">
                <div>
                    <h1>Réglage du Compte</h1>
                    <section>
                        <h2>Logins</h2>
                        <div className="settings-field-container">
                            <SettingField settingTitle="Adresse Email" currentValue={this.state.email}/>
                            <SettingField settingTitle="Changer le Mot de Passe" currentValue={this.state.password}/>
                        </div>
                    </section>
                    <section>
                        <h2>Informations</h2>
                        <div className="settings-field-container">
                            <SettingField settingTitle="Nom" currentValue={this.state.lastName}/>
                            <SettingField settingTitle="Prénom(s)" currentValue={this.state.firstName}/>
                            <SettingField settingTitle="Date de naissance" currentValue={this.state.birthdate}/>
                            <SettingField settingTitle="Pseudo" currentValue={this.state.username}/>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
