import React from 'react';
import "./_create-sub.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {createSub, deleteSub, updateSub} from "../../services/sub.service";
import TextAreaForm from "./TextAreaForm.component";
import CloseBtn from "../common/CloseBtn.component";
import {canUserEdit, un_or_subscribe} from "../../services/user.service";

export default class CreateSub extends React.Component {

    routerHistory: any;
    originalSub: any;
    closeBehavior: () => void;
    constructor(props) {
        super(props);
        this.state = {title: '', description: '', subjectId: [-1], canEdit: false};
        this.handleChangeState = this.handleChangeState.bind(this);
        this.createNewSub = this.createNewSub.bind(this);
        this.editSub = this.editSub.bind(this);
        this.delete = this.delete.bind(this);
        this.canDelete = this.canDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(): void {
        if (this.props.originalSub) {
            this.setState({title: this.props.originalSub.title});
            this.setState({description: this.props.originalSub.description});
            this.setState({subjectId: this.props.originalSub.subjectId});
            canUserEdit(this.props.originalSub.ownerId).then(can => {
                this.setState({canEdit: can});
            });
        }
    }

    handleChangeState(targetName: string, targetValue: string): void {
        this.setState({[targetName]: targetValue});
    }

    canDelete(): boolean {
        return this.state.canEdit;
    }

    delete(): void {
        if (this.canDelete()) {
            //TODO: ask to confirm
            deleteSub(this.props.originalSub.id).then((res) => {
                this.props.routerHistory.push('/');
            }).catch( err => {
                console.log(err);
                toast.error('Le fil n\'a pas pu être supprimé...', {
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
    }

    canSubmit(): boolean {
        return matchPattern(this.state.title, validatorsRules.titlePattern) &&
            (this.state.description !== '');
    }

    createNewSub(): void {
        const newSub = {
            title: this.state.title,
            description: this.state.description,
            ownerId: localStorage.getItem('user-id'),
            subjectIds: [-1]
        };
        createSub(newSub).then((res) => {
            un_or_subscribe(newSub.ownerId, res.subId, true).then();
            this.props.closeBehavior();
            this.props.routerHistory.push('/f/'+ newSub.title);
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

    editSub(): void {
        if (!this.state.canEdit) {
            return;
        }
        const editedSub = {
            title: this.state.title,
            description: this.state.description,
            subjectIds: [-1],
            editerId: localStorage.getItem('user-id'),
        };
        updateSub(editedSub, this.props.originalSub.id).then((res) => {
            this.props.closeBehavior();
            window.location.reload();
        }).catch( err => {
            toast.error('Le fil n\'a pas pu être édité...', {
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

    handleSubmit(event): void {
        if (!this.canSubmit()) {
            return;
        }
        event.preventDefault();
        if (!this.props.originalSub) {
            this.createNewSub();
        } else {
            this.editSub();
        }
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
                        {/*<InputForm value={this.state.subjectId} inputType="list" inputName="subject"
                                   inputLabel="Catégorie"
                                   changeValue={this.handleChangeState}/>*/}
                        <button type="submit" disabled={!this.canSubmit()}>Poster</button>
                    </div>
                </form>
                {this.state.canEdit &&
                <button id={"delete-btn"} disabled={!this.canDelete()} onClick={this.delete}>Supprimer</button>}
                <ToastContainer />
            </div>
        );
    }
}
