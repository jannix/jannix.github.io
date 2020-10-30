import React from 'react';
import "./_login-form.scss";
import * as Constants from "../../constants/apiconst";
import InputForm from "./InputForm.component";

export default class LoginForm extends React.Component {
    onUserClickFirstTime: () => void;

    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeState(targetName, targetValue) {
        this.setState({[targetName]: targetValue});
    }

    handleChangeEmail(name: string, value: string) {
        //TODO: check email format
        this.handleChangeState(name, value);
    }

    handleChangePassword(name: string, value: string) {
        //TODO: check password format
        this.handleChangeState(name, value);
    }

    handleSubmit(event) {
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
                                   changeValue={this.handleChangeEmail}/>

                        <InputForm value={this.state.password} inputType="password" inputName="password" inputLabel="Mot de Passe"
                                   changeValue={this.handleChangePassword}/>
                    </div>
                    <div className="login-form-btns-container">
                        <button id="first-time-btn" onClick={this.props.onUserClickFirstTime}>Première fois?</button>
                        <button type="submit">Connexion</button>
                    </div>
                </form>
            </div>
        );
    }
}
