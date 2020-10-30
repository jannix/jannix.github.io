import React from 'react';
import "./_signin-form.scss";
import InputForm from "./InputForm.component";
//import * as Constants from "../../constants/apiconst";

export default class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', emailConfirm: '',
            password: '', passwordConfirm: ''};
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeEmailConfirm = this.handleChangeEmailConfirm.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeState(targetName, targetValue) {
        this.setState({[targetName]: targetValue});
    }

    handleChangeEmail(name: string, value: string) {
        //TODO: check email format
        this.handleChangeState(name, value);
    }

    handleChangeEmailConfirm(name: string, value: string) {
        //TODO: check if email === emailConfirm
        this.handleChangeState(name, value);
    }

    handleChangePassword(name: string, value: string) {
        //TODO: check password format
        this.handleChangeState(name, value);
    }

    handleChangePasswordConfirm(name: string, value: string) {
        //TODO: check if password === passwordConfirm
        this.handleChangeState(name, value);
    }

    handleSubmit(event) {
        event.preventDefault();

        /*fetch(Constants.API_AUTH+'login', {
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
            });*/
    }

    render() {
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit}>
                    <h2 id="login-form-title">Création de compte</h2>
                    <div className="login-form-inputs-container">
                        <InputForm value={this.state.email} inputType="email" inputName="email" inputLabel="Email"
                                   changeValue={this.handleChangeEmail}/>
                        <InputForm value={this.state.emailConfirm} inputType="email" inputName="emailConfirm" inputLabel="(confirmer email)"
                                   changeValue={this.handleChangeEmailConfirm}/>

                        <InputForm value={this.state.password} inputType="password" inputName="password" inputLabel="Mot de Passe"
                                   changeValue={this.handleChangePassword}/>
                        <InputForm value={this.state.passwordConfirm} inputType="password" inputName="passwordConfirm"
                                   inputLabel="(confirmer mot de passe)"
                                   changeValue={this.handleChangePasswordConfirm}/>
                    </div>
                    <div className="login-form-btns-container">
                        <button id="return-btn" onClick={this.props.onClickReturn}>Retour</button>
                        <button>Suivant</button>
                    </div>
                </form>
            </div>
        );
    }
}
