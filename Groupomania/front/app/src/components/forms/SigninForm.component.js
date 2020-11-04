import React from 'react';
import "./_signin-form.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorsRules} from "../../utils/validator";
import {CSSTransition} from "react-transition-group";
import * as Constants from "../../constants/apiconst";

export default class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', emailConfirm: '',
            password: '', passwordConfirm: '',
            username: '', firstName: '', lastName: '', job: '',
            showStep1: true, showStep2: false};
        //TODO: make 1 handle, send with callback to validation check to the Input
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeEmailConfirm = this.handleChangeEmailConfirm.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeJob = this.handleChangeJob.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickReturn = this.onClickReturn.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setShowStep1(val: boolean): void {
        this.setState({showStep1: val});
    }

    setShowStep2(val: boolean): void {
        this.setState({showStep2: val});
    }

    handleChangeState(targetName: string, targetValue: string): void {
        this.setState({[targetName]: targetValue});
    }

    handleChangeEmail(name: string, value: string): void {
        if (!matchPattern(value, validatorsRules.emailPattern)) {
            //TODO: Mets du rouge
        }
        this.handleChangeState(name, value);
    }

    handleChangeEmailConfirm(name: string, value: string): void {
        if (!matchPattern(value, validatorsRules.emailPattern) || this.state.email !== value) {
            //TODO: better notes if match but not ===
            //TODO: Mets du rouge
        }
        this.handleChangeState(name, value);
    }

    handleChangePassword(name: string, value: stringt): void {
        if (!matchPattern(value, validatorsRules.passwordPattern)) {
            //TODO: Mets du rouge
        }
        this.handleChangeState(name, value);
    }

    handleChangePasswordConfirm(name: string, value: string): void {
        if (!matchPattern(value, validatorsRules.passwordPattern) || this.state.password !== value) {
            //TODO: better notes if match but not ===
            //TODO: Mets du rouge
        }
        this.handleChangeState(name, value);
    }

    handleChangeUsername(name: string, value: string): void {
        if (!matchPattern(value, validatorsRules.usernamePatter)) {
            //TODO: Mets du rouge
        }
        this.handleChangeState(name, value);
    }

    handleChangeFirstname(name: string, value: string): void {
        if (!matchPattern(value, validatorsRules.firstnamePattern)) {
            //TODO: Mets du rouge
        }
        this.handleChangeState(name, value);
    }

    handleChangeLastname(name: string, value: string): void {
        if (!matchPattern(value, validatorsRules.lastnamePattern)) {
            //TODO: Mets du rouge
        }
        this.handleChangeState(name, value);
    }

    handleChangeJob(name: string, value: string): void {
        if (!matchPattern(value, validatorsRules.jobPattern)) {//TODO: Make it a job list from server
            //TODO: Mets du rouge
        }
        this.handleChangeState(name, value);
    }

    onClickNext(): void {
        this.setState({showStep1: false});
    }

    onClickReturn(): void {
        this.setState({showStep2: false});
    }

    canGoToStep2(): boolean {
        return matchPattern(this.state.email, validatorsRules.emailPattern) &&
            (this.state.email === this.state.emailConfirm) &&
            matchPattern(this.state.password, validatorsRules.passwordPattern) &&
            (this.state.password === this.state.passwordConfirm);
    }

    canSubmit(): boolean {
        return this.canGoToStep2() && matchPattern(this.state.username, validatorsRules.usernamePattern) &&
            matchPattern(this.state.username, validatorsRules.firstnamePattern) &&
            matchPattern(this.state.password, validatorsRules.lastnamePattern) &&
            matchPattern(this.state.username, validatorsRules.jobPattern);
    }

    handleSubmit(event): void {
        if (!this.canSubmit()) {
            //TODO: Put red
            return;
        }
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
                                       onExited={() => this.setShowStep1(true)}>
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
                    {/*//TODO: change to avoid blink buttons*/}
                    {this.state.showStep1 > 0 &&
                    <div className="login-form-btns-container">
                        <button id="return-btn" type="button" onClick={this.props.onClickReturn}>Retour</button>
                        <button type="button" onClick={this.onClickNext}>Suivant</button>
                    </div>
                    }
                    {this.state.showStep2 > 0 &&
                    <div className="login-form-btns-container">
                        <button id="return-btn" type="button" onClick={this.onClickReturn}>Retour</button>
                        <button type="submit">Confirmer</button>
                    </div>
                    }
                </form>
            </div>
        );
    }
}
