import React from 'react';
import "./_create-commentpost.scss";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TextAreaForm from "./TextAreaForm.component";
import CloseBtn from "../common/CloseBtn.component";
import {createPost, deletePost, updatePost} from "../../services/post.service";
import {canUserEdit} from "../../services/user.service";

export default class CreateCommentPost extends React.Component {

    postId: number;
    closeBehavior: () => void;
    postedBehavior: () => void;
    originalCom: any;
    constructor(props) {
        super(props);
        this.state = {text: '', canEdit: false};
        this.handleChangeState = this.handleChangeState.bind(this);
        this.createNewCom = this.createNewCom.bind(this);
        this.editCom = this.editCom.bind(this);
        this.delete = this.delete.bind(this);
        this.canDelete = this.canDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(): void {
        if (this.props.originalCom) {
            this.setState({text: this.props.originalCom.text});
            canUserEdit(this.props.originalCom.ownerId).then(can => {
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
            deletePost(this.props.originalCom.id).then((res) => {
                window.location.reload();
            }).catch( err => {
                console.log(err);
                toast.error('Le commentaire n\'a pas pu être supprimé...', {
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
        return this.state.text !== '';
    }

    createNewCom(): void {
        const newCommentPost = {
            title: '',
            text: this.state.text,
            ownerId: localStorage.getItem('user-id'),
            parentId: this.props.postId,
            isOC: false,
        };
        createPost(newCommentPost).then((res) => {
            this.props.closeBehavior();
            this.props.postedBehavior();
        }).catch( err => {
            toast.error('Le commentaire n\'a pas pu être créé...', {
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

    editCom(): void {
        if (!this.state.canEdit) {
            return;
        }
        const editingCom = {
            text: this.state.text,
            editerId: localStorage.getItem('user-id'),
        };
        updatePost(editingCom, this.props.originalCom.id).then((res) => {
            this.props.closeBehavior();
            window.location.reload();
        }).catch( err => {
            toast.error('Le sujet n\'a pas pu être modifié...', {
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
        if (!this.props.originalCom) {
            this.createNewCom();
        } else {
            this.editCom();
        }
    }

    render() {
        return (
            <div className="create-commentpost-container">
                <CloseBtn closeBehavior={this.props.closeBehavior}/>
                <form onSubmit={this.handleSubmit}>
                    <h2>Nouveau Commentaire</h2>
                    <div className="settings-field-container">
                        <TextAreaForm value={this.state.text} inputType="text" inputName="text"
                                      inputLabel="Texte du Post"
                                      changeValue={this.handleChangeState}/>
                        <button type="submit" disabled={!this.canSubmit()}>Poster</button>
                        {this.state.canEdit &&
                        <button id={"delete-btn"} disabled={!this.canDelete()} onClick={this.delete}>Supprimer</button>}
                    </div>
                </form>
                <ToastContainer />
            </div>
        );
    }
}
