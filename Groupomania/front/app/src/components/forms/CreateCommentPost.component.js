import React from 'react';
import "./_create-commentpost.scss";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TextAreaForm from "./TextAreaForm.component";
import CloseBtn from "../common/CloseBtn.component";
import {createPost} from "../../services/post.service";

export default class CreateCommentPost extends React.Component {

    postId: number;
    closeBehavior: () => void;
    postedBehavior: () => void;
    constructor(props) {
        super(props);
        this.state = {text: ''};
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(): void {

    }

    handleChangeState(targetName: string, targetValue: string): void {
        this.setState({[targetName]: targetValue});
    }

    canSubmit(): boolean {
        return this.state.text !== '';
    }

    handleSubmit(event): void {
        if (!this.canSubmit()) {
            return;
        }
        event.preventDefault();

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
                    </div>
                </form>
                <ToastContainer />
            </div>
        );
    }
}
