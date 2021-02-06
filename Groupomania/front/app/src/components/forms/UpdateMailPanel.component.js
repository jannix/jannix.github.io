import React from 'react';
import "./_updatemail-panel.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import {editMail} from "../../services/auth.service";
import {toast, ToastContainer} from "react-toastify";
import CloseBtn from "../common/CloseBtn.component";

export default class UpdateMailPanel extends React.Component {

    routerHistory: any;
    closeBehavior: () => void;
    constructor(props) {
        super(props);
        this.state = {email: '', emailConfirm: '', password: ''};

        this.handleChangeState = this.handleChangeState.bind(this);
        this.canSubmit = this.canSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeState(targetName: string, targetValue: string): void {
        this.setState({[targetName]: targetValue});
    }

    canSubmit(): boolean {
        return matchPattern(this.state.email, validatorsRules.emailPattern) &&
            (this.state.email === this.state.emailConfirm) &&
            matchPattern(this.state.password, validatorsRules.passwordPattern);
    }

    handleSubmit(event): void {
        if (!this.canSubmit()) {
            return;
        }
        event.preventDefault();

        const editedLogins = {
            newEmail: this.state.email,
            password: this.state.password,
        };
        editMail(localStorage.getItem('user-id'), editedLogins).then(res => {
            toast.success('Changements effectués...', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.reload();
        }).catch(err => {
            toast.error('Le mail n\'a pas pu être édité...', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    render() {
        return (
            <div className={"change-mail-panel"}>
                <CloseBtn closeBehavior={this.props.closeBehavior}/>
                <h1>Changer le mail</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="settings-field-container">
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
                        <button type="submit" disabled={!this.canSubmit()}>Sauver</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        );
    }
}
