import React from 'react';
import "./_create-sub.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {createSub} from "../../services/sub.service";
import TextAreaForm from "./TextAreaForm.component";
import CloseBtn from "../common/CloseBtn.component";

export default class CreateSub extends React.Component {

    closeBehavior: () => void;
    constructor(props) {
        super(props);
        this.state = {title: '', description: '', subjectId: [-1]};
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeState(targetName: string, targetValue: string): void {
        this.setState({[targetName]: targetValue});
    }

    canSubmit(): boolean {
        return matchPattern(this.state.title, validatorsRules.titlePattern) &&
            (this.state.description !== '');
    }

    handleSubmit(event): void {
        if (!this.canSubmit()) {
            return;
        }
        event.preventDefault();

        const newSub = {
            title: this.state.title,
            description: this.state.description,
            ownerId: localStorage.getItem('user-id'),
            subjectIds: [-1]
        };
        createSub(newSub).then((res) => {
            this.props.closeBehavior();
            this.props.routerHistory.push('/');//TODO: push to the sub page
        }).catch( err => {
            toast.error('Le fil n\'a pas pu être créé...', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }

    render() {
        return (
            <div className="create-sub-container">
                <CloseBtn closeBehavior={this.props.closeBehavior}/>
                <form onSubmit={this.handleSubmit}>
                    <h2>Création du Fil</h2>
                    <div className="settings-field-container">
                        <InputForm value={this.state.title} inputType="text" inputName="title"
                                   inputLabel="Nom du Fil"
                                   inputWrongBehavior={{wrongTxt: validatorMessages.lastName.pattern,
                                       isWrong: function (value: string): boolean {
                                           //TODO: check if title already exist
                                           return !matchPattern(value, validatorsRules.titlePattern);
                                       }}}
                                   changeValue={this.handleChangeState}/>
                        <TextAreaForm value={this.state.description} inputType="text" inputName="description"
                                   inputLabel="Description"
                                   changeValue={this.handleChangeState}/>
                        <InputForm value={this.state.subjectId} inputType="list" inputName="subject"
                                   inputLabel="Catégorie"
                                   changeValue={this.handleChangeState}/>
                        <button type="submit" disabled={!this.canSubmit()}>Créer</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        );
    }
}
