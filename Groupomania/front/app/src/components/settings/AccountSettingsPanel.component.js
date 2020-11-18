import React from 'react';
import "./_accountsettings-panel.scss";
import SettingField from "./SettingField.component";
import {getUserData} from "../../services/user.service";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import InputForm from "../forms/InputForm.component";

export default class AccountSettingsPanel extends React.Component {

    errorAuth: () => void;
    panelBehavior: () => void;

    constructor(props) {
        super(props);
        this.state = {email: 'Email non retrouvé', password: '***********',
            username: 'Aucun pseudo', firstName: 'Prénom non retrouvé',
            lastName: 'Nom non retrouvé', job: '', birthdate: 'JJ/MM/AAAA',
            description: 'Aucune description'};
        this.fillUserDatas = this.fillUserDatas.bind(this);
        this.callPanelBehavior = this.callPanelBehavior.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeState(targetName: string, targetValue: string): void {
        this.setState({[targetName]: targetValue});
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

    canSubmit(): boolean {
        return matchPattern(this.state.username, validatorsRules.usernamePattern) &&
            matchPattern(this.state.firstName, validatorsRules.firstnamePattern) &&
            matchPattern(this.state.lastName, validatorsRules.lastnamePattern) &&
            (this.state.job !== '');//TODO: other test for date and descriptions
    }


    handleSubmit(event): void {
        if (!this.canSubmit()) {
            return;
        }
        event.preventDefault();
        /*const editedUser = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        };
        editUser(editedUser).then(() => {
            this.props.routerHistory.push('/settings/account');
        });*/
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
                        <form onSubmit={this.handleSubmit}>
                            <h2>Informations</h2>
                            <div className="settings-field-container">
                                <InputForm value={this.state.username} inputType="text" inputName="username"
                                           inputLabel="Pseudo"
                                           changeValue={this.handleChangeState}/>
                                <InputForm value={this.state.lastName} inputType="text" inputName="lastName"
                                           inputLabel="Nom de famille"
                                           inputWrongBehavior={{wrongTxt: validatorMessages.lastName.pattern,
                                               isWrong: function (value: string): boolean {
                                                   return !matchPattern(value, validatorsRules.lastnamePattern);
                                               }}}
                                           changeValue={this.handleChangeState}/>
                                <InputForm value={this.state.firstName} inputType="text" inputName="firstName"
                                           inputLabel="Prénom(s)"
                                           inputWrongBehavior={{wrongTxt: validatorMessages.firstName.pattern,
                                               isWrong: function (value: string): boolean {
                                                   return !matchPattern(value, validatorsRules.firstnamePattern);
                                               }}}
                                           changeValue={this.handleChangeState}/>
                                <InputForm value={this.state.description} inputType="text" inputName="description"
                                           inputLabel="Description"
                                           changeValue={this.handleChangeState}/>
                                <InputForm value={this.state.birthdate} inputType="date" inputName="birthdate"
                                           inputLabel="Date de naissance"
                                           changeValue={this.handleChangeState}/>
                                <InputForm value={this.state.job} inputType="list" inputName="job"
                                           inputLabel="Poste"
                                           changeValue={this.handleChangeState}/>
                            </div>
                            <button type="submit" disabled={!this.canSubmit()}>Sauvegarder</button>
                        </form>
                    </section>
                </div>
            </div>
        );
    }
}
