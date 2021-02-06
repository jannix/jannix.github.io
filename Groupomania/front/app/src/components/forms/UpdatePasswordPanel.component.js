import React from 'react';
import "./_updatepassword-panel.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import {editPassword} from "../../services/auth.service";
import {toast, ToastContainer} from "react-toastify";
import CloseBtn from "../common/CloseBtn.component";

export default class UpdatePasswordPanel extends React.Component {

    routerHistory: any;
    closeBehavior: () => void;
    constructor(props) {
        super(props);
        this.state = {password: '', newPassword: '', newPasswordConfirm: ''};

        this.handleChangeState = this.handleChangeState.bind(this);
        this.canSubmit = this.canSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeState(targetName: string, targetValue: string): void {
        this.setState({[targetName]: targetValue});
    }

    canSubmit(): boolean {
        return matchPattern(this.state.password, validatorsRules.passwordPattern) &&
            (this.state.newPassword === this.state.newPasswordConfirm);
    }

    handleSubmit(event): void {
        if (!this.canSubmit()) {
            return;
        }
        event.preventDefault();

        const editedLogins = {
            password: this.state.password,
            newPassword: this.state.newPassword,
        };
        editPassword(localStorage.getItem('user-id'), editedLogins).then(res => {
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
            toast.error('Le mot de passe n\'a pas pu être édité...', {
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
            <div className={"change-password-panel"}>
                <CloseBtn closeBehavior={this.props.closeBehavior}/>
                <form onSubmit={this.handleSubmit}>
                    <h1>Changer le mot de passe</h1>
                    <div className="settings-field-container">
                        <InputForm value={this.state.password} inputType="password" inputName="password"
                                   inputLabel="Mot de Passe actuel"
                                   inputWrongBehavior={{wrongTxt: validatorMessages.password.pattern,
                                       isWrong: function (value: string): boolean {
                                           return !matchPattern(value, validatorsRules.passwordPattern);
                                       }}}
                                   changeValue={this.handleChangeState}/>
                        <InputForm value={this.state.newPassword} inputType="password" inputName="newPassword"
                                   inputLabel="Nouveau Mot de Passe"
                                   inputWrongBehavior={{wrongTxt: validatorMessages.password.pattern,
                                       isWrong: function (value: string): boolean {
                                           return !matchPattern(value, validatorsRules.passwordPattern);
                                       }}}
                                   changeValue={this.handleChangeState}/>
                        <InputForm value={this.state.newPasswordConfirm} inputType="password" inputName="newPasswordConfirm"
                                   inputLabel="(confirmer nouveau mot de passe)"
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
