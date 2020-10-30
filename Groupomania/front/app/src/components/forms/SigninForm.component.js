import React from 'react';
import "./_signin-form.scss";
import InputForm from "./InputForm.component";
import {CSSTransition} from "react-transition-group";
import * as Constants from "../../constants/apiconst";

export default class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', emailConfirm: '',
            password: '', passwordConfirm: '',
            username: '', firstName: '', lastName: '', job: '',
            showStep1: true, showStep2: false};
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeEmailConfirm = this.handleChangeEmailConfirm.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setShowStep1(val: boolean) {
        this.setState({showStep1: val});
    }

    setShowStep2(val: boolean) {
        this.setState({showStep2: val});
    }

    handleChangeState(targetName: string, targetValue: string) {
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

    onClickNext() {
        this.setState({showStep1: false});
    }

    handleSubmit(event) {
        console.log("send user => ", this.state);
        event.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        };

        fetch(Constants.API_AUTH+'signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
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
                    <h2 id="login-form-title">Création de compte</h2>
                    <div className="transition-container">
                        <CSSTransition in={this.state.showStep1} timeout={300} classNames="signin1" unmountOnExit
                                       onEnter={() => this.setShowStep1(true)}
                                       onExited={() => this.setShowStep2(true)}>
                            <div className="login-form-inputs-container">
                                <InputForm value={this.state.email} inputType="email" inputName="email" inputLabel="Email"
                                           changeValue={this.handleChangeEmail}/>
                                <InputForm value={this.state.emailConfirm} inputType="email" inputName="emailConfirm"
                                           inputLabel="(confirmer email)"
                                           changeValue={this.handleChangeEmailConfirm}/>
                                <InputForm value={this.state.password} inputType="password" inputName="password"
                                           inputLabel="Mot de Passe"
                                           changeValue={this.handleChangePassword}/>
                                <InputForm value={this.state.passwordConfirm} inputType="password" inputName="passwordConfirm"
                                           inputLabel="(confirmer mot de passe)"
                                           changeValue={this.handleChangePasswordConfirm}/>
                            </div>
                        </CSSTransition>
                        <CSSTransition in={this.state.showStep2} timeout={300} classNames="signin2" unmountOnExit
                                       onEnter={() => this.setShowStep2(true)}
                                       onExited={() => this.setShowStep2(false)}>
                            <div className="login-form-inputs-container">
                                <InputForm value={this.state.username} inputType="text" inputName="username"
                                           inputLabel="Pseudo"
                                            changeValue={this.handleChangeState}/>
                                <InputForm value={this.state.lastName} inputType="text" inputName="lastName"
                                           inputLabel="Nom de famille"
                                           changeValue={this.handleChangeEmailConfirm}/>
                                <InputForm value={this.state.firstName} inputType="text" inputName="firstName"
                                           inputLabel="Prénom"
                                           changeValue={this.handleChangePassword}/>
                                <InputForm value={this.state.job} inputType="text" inputName="job"
                                           inputLabel="Poste"
                                           changeValue={this.handleChangePasswordConfirm}/>
                            </div>
                        </CSSTransition>
                    </div>
                    {this.state.showStep1 > 0 &&
                    <div className="login-form-btns-container">
                        <button id="return-btn" type="button" onClick={this.props.onClickReturn}>Retour</button>
                        <button type="button" onClick={this.onClickNext}>Suivant</button>
                    </div>
                    }
                    {this.state.showStep2 > 0 &&
                    <div className="login-form-btns-container">
                        <button id="return-btn" type="button" onClick={this.props.onClickReturn}>Retour</button>
                        <button type="submit">Confirmer</button>
                    </div>
                    }
                </form>
            </div>
        );
    }
}
