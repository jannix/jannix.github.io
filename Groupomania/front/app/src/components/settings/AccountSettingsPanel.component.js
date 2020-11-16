import React from 'react';
import "./_accountsettings-panel.scss";
import SettingField from "./SettingField.component";
import {getUserData} from "../../services/user.service";

export default class AccountSettingsPanel extends React.Component {

    errorAuth: () => void;
    panelBehavior: () => void;

    constructor(props) {
        super(props);
        this.state = {email: 'Email non retrouvé', password: '***********',
            username: 'Pseudo non retrouvé', firstName: 'Prénom non retrouvé',
            lastName: 'Nom non retrouvé', job: '', birthdate: 'JJ/MM/AAAA'};
        this.fillUserDatas = this.fillUserDatas.bind(this);
        this.callPanelBehavior = this.callPanelBehavior.bind(this);
    }

    componentDidMount(): void {
        this.fillUserDatas();
    }

    componentWillUnmount(): void {

    }

    fillUserDatas() {
        if (!localStorage.getItem('user-id')) {
            this.props.errorAuth();
            return;
        }
        getUserData(localStorage.getItem('user-id')).then((userData) => {
            this.setState({email: (userData.userFound.email? userData.userFound.email: this.state.email)});
            this.setState({firstName: (userData.userFound.firstName? userData.userFound.firstName: this.state.firstName)});
            this.setState({lastName: (userData.userFound.lastName? userData.userFound.lastName: this.state.lastName)});
            this.setState({birthdate: (userData.userFound.birthdate? userData.userFound.birthdate: this.state.birthdate)});
            this.setState({username: (userData.userFound.username? userData.userFound.username: this.state.username)});
        }).catch((error) => {
            if (String(error).includes('403')) {
                this.props.errorAuth();
            }
        });
    }

    callPanelBehavior(): void {
        if (this.props.panelBehavior) {
            this.props.panelBehavior();
        }
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
