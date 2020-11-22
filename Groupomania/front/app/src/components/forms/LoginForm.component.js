import React from 'react';
import "./_login-form.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import {loginUser} from "../../services/auth.service";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default class LoginForm extends React.Component {
    onUserClickFirstTime: () => void;
    routerHistory: any;

    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
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
            this.props.routerHistory.push('/');
        }).catch( err => {
            toast.error('Mauvais identifiants...', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
                <ToastContainer />
            </div>
        );
    }
}
