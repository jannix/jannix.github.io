import React from 'react';
import "./_login-form.scss";

export default class LoginForm extends React.Component {
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

    handleChangeEmail(event) {
        //TODO: check email format
        this.handleChangeState(event.target.name, event.target.value);
    }

    handleChangePassword(event) {
        //TODO: check password format
        this.handleChangeState(event.target.name, event.target.value);
    }

    handleSubmit(event) {
        console.log(this.state);
        alert('Submitted: ' + event);
        event.preventDefault();
    }

    render() {
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit}>
                    <h2 id="login-form-title">Connexion</h2>
                    <div className="login-form-inputs-container">
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChangeEmail}
                            placeholder="Email"/>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChangePassword}
                            placeholder="Mot de Passe"/>
                    </div>
                    <div className="login-form-btns-container">
                        <button type="submit">Connexion</button>
                    </div>
                </form>
            </div>
        );
    }
}
