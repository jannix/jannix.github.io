import React from 'react';
import "./_signin-form.scss";
import * as Constants from "../../constants/apiconst";

export default class SigninForm extends React.Component {
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
                    <h2 id="login-form-title">Connexion</h2>
                    <div className="login-form-inputs-container">
                        <div>
                            <input className={(this.state.email? "has-content":"")} type="email" name="email"
                                   autoComplete="false" value={this.state.email} onChange={this.handleChangeEmail}/>
                            <label className="input-placeholder">Email</label>
                        </div>

                        <div>
                            <input className={(this.state.password? "has-content":"")} type="password" name="password"
                                   value={this.state.password} onChange={this.handleChangePassword}/>
                            <label className="input-placeholder">Mot de Passe</label>
                        </div>

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
