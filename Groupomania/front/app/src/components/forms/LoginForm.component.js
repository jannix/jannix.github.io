import React from 'react';
import "./_login-form.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import {loginUser} from "../../services/auth.service";
import Toast from "../toast/Toast.component";
import errorIcon from '../../assets/error.svg';

export default class LoginForm extends React.Component {
    onUserClickFirstTime: () => void;
    routerHistory: any;

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', toastList: []};
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeState(targetName: string, targetValue: string): void {
        this.setState({[targetName]: targetValue});
    }

    canSubmit(): boolean {
        return matchPattern(this.state.email, validatorsRules.emailPattern) &&
            matchPattern(this.state.password, validatorsRules.passwordPattern);
    }

    handleSubmit(event): void {
        if (!this.canSubmit()) {
            return;
        }
        event.preventDefault();
        const logins = {
            email: this.state.email,
            password: this.state.password,
        };

        loginUser(logins).then((res) => {
            this.props.routerHistory.push('/settings/account');
        }).catch( err => {
            console.log('PUT A TOAST : ' + err);
            this.setState({toastList: [...this.state.toastList, {
                    id: 2,
                    title: 'Danger',
                    description: 'This is a error toast component',
                    backgroundColor: '#d9534f',
                    icon: errorIcon
                }]});
            console.log(this.state.toastList[0]);
            this.forceUpdate();
            //TODO things with toast settings I guess?
        });
    }

    render() {
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit}>
                    <h2 id="login-form-title">Connexion</h2>
                    <div className="login-form-inputs-container">
                        <InputForm value={this.state.email} inputType="email" inputName="email" inputLabel="Email"
                                   inputWrongBehavior={{wrongTxt: validatorMessages.email.pattern,
                                       isWrong: function (value: string): boolean {
                                           return !matchPattern(value, validatorsRules.emailPattern);
                                       }}}
                                   changeValue={this.handleChangeState}/>

                        <InputForm value={this.state.password} inputType="password" inputName="password" inputLabel="Mot de Passe"
                                   inputWrongBehavior={{wrongTxt: validatorMessages.password.pattern,
                                       isWrong: function (value: string): boolean {
                                           return !matchPattern(value, validatorsRules.passwordPattern);
                                       }}}
                                   changeValue={this.handleChangeState}/>
                    </div>
                    <div className="login-form-btns-container">
                        <button id="first-time-btn" type="button" onClick={this.props.onUserClickFirstTime}>Première fois?</button>
                        <button type="submit" disabled={!this.canSubmit()}>Connexion</button>
                    </div>
                </form>
                <Toast toastList={this.state.toastList} position="bottom-left" autoDelete={false} autoDeleteTime={5000}/>
            </div>
        );
    }
}
