import React from 'react';
import "./_login-form.scss";
import * as Constants from "../../constants/apiconst";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";

export default class LoginForm extends React.Component {
    onUserClickFirstTime: () => void;

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

        fetch(Constants.API_AUTH+'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                //TODO: keep token, go to home page (for now user details page)
            })
            .catch((error) => {
                console.error('Error:', error);
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
            </div>
        );
    }
}
