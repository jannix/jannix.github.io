import React from 'react';
import "./_signin-form.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import {CSSTransition} from "react-transition-group";
import {createUser} from "../../services/auth.service";

export default class SigninForm extends React.Component {
    routerHistory: any;

    constructor(props) {
        super(props);
        this.state = {email: '', emailConfirm: '',
            password: '', passwordConfirm: '',
            username: '', firstName: '', lastName: '', job: '',
            showStep1: true, showStep2: false};
        this.myRef = React.createRef();

        this.handleChangeState = this.handleChangeState.bind(this);
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
            matchPattern(this.state.firstName, validatorsRules.firstnamePattern) &&
            matchPattern(this.state.lastName, validatorsRules.lastnamePattern) &&
            (this.state.job !== '');
    }

    handleSubmit(event): void {
        if (!this.canSubmit()) {
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
        createUser(newUser).then(() => {
            this.props.routerHistory.push('/settings/account');
        });
    }

    render() {
        return (
            <div className="signin-form-container">
                <form onSubmit={this.handleSubmit}>
                    <h2 id="signin-form-title">Création de compte</h2>
                    <div className="transition-container">
                        <CSSTransition in={this.state.showStep1} timeout={300} classNames="signin1" unmountOnExit
                                       onEnter={() => this.setShowStep1(true)}
                                       onExited={() => this.setShowStep2(true)}
                                       nodeRef={this.myRef}>
                            <div ref={this.myRef} className="signin-form-inputs-container">
                                <InputForm value={this.state.email} inputType="email" inputName="email" inputLabel="Email"
                                           inputWrongBehavior={{wrongTxt: validatorMessages.email.pattern,
                                               isWrong: function (value: string): boolean {
                                                   return !matchPattern(value, validatorsRules.emailPattern);
                                               }}}
                                           changeValue={this.handleChangeState}/>
                                <InputForm value={this.state.emailConfirm} inputType="email" inputName="emailConfirm"
                                           inputLabel="(confirmer email)"
                                           inputWrongBehavior={{wrongTxt: validatorMessages.email.pattern,
                                               isWrong: function (value: string): boolean {
                                                   return !matchPattern(value, validatorsRules.emailPattern);
                                               }}}
                                           changeValue={this.handleChangeState}/>
                                <InputForm value={this.state.password} inputType="password" inputName="password"
                                           inputLabel="Mot de Passe"
                                           inputWrongBehavior={{wrongTxt: validatorMessages.password.pattern,
                                               isWrong: function (value: string): boolean {
                                                   return !matchPattern(value, validatorsRules.passwordPattern);
                                               }}}
                                           changeValue={this.handleChangeState}/>
                                <InputForm value={this.state.passwordConfirm} inputType="password" inputName="passwordConfirm"
                                           inputLabel="(confirmer mot de passe)"
                                           inputWrongBehavior={{wrongTxt: validatorMessages.password.pattern,
                                               isWrong: function (value: string): boolean {
                                                   return !matchPattern(value, validatorsRules.passwordPattern);
                                               }}}
                                           changeValue={this.handleChangeState}/>
                            </div>
                        </CSSTransition>
                        <CSSTransition in={this.state.showStep2} timeout={300} classNames="signin2" unmountOnExit
                                       onEnter={() => this.setShowStep2(true)}
                                       onExited={() => this.setShowStep1(true)}
                                       nodeRef={this.myRef}>
                            <div ref={this.myRef} className="signin-form-inputs-container">
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
                                           inputLabel="Prénom"
                                           inputWrongBehavior={{wrongTxt: validatorMessages.firstName.pattern,
                                               isWrong: function (value: string): boolean {
                                                   return !matchPattern(value, validatorsRules.firstnamePattern);
                                               }}}
                                           changeValue={this.handleChangeState}/>
                                {/*TODO: Job should be a select with datas from server*/}
                                <InputForm value={this.state.job} inputType="text" inputName="job"
                                           inputLabel="Poste"
                                           inputWrongBehavior={{wrongTxt: validatorMessages.job.required,
                                               isWrong: function (value: string): boolean {
                                               //TODO: check a list of jobs
                                                   return false;
                                               }}}
                                           changeValue={this.handleChangeState}/>
                            </div>
                        </CSSTransition>
                    </div>
                    {/*//TODO: change to avoid blink buttons*/}
                    {this.state.showStep1 > 0 &&
                    <div className="signin-form-btns-container">
                        <button id="return-btn" type="button" onClick={this.props.onClickReturn}>Retour</button>
                        <button type="button" onClick={this.onClickNext} disabled={!this.canGoToStep2()}>Suivant</button>
                    </div>
                    }
                    {this.state.showStep2 > 0 &&
                    <div className="signin-form-btns-container">
                        <button id="return-btn" type="button" onClick={this.onClickReturn}>Retour</button>
                        <button type="submit" disabled={!this.canSubmit()}>Confirmer</button>
                    </div>
                    }
                </form>
            </div>
        );
    }
}
