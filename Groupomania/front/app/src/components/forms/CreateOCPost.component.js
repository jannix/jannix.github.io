import React from 'react';
import "./_create-ocpost.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TextAreaForm from "./TextAreaForm.component";
import CloseBtn from "../common/CloseBtn.component";
import SelectForm from "./SelectForm.component";
import {getUserSubscriptions} from "../../services/user.service";
import {createPost, updatePost} from "../../services/post.service";

export default class CreateOCPost extends React.Component {

    originalPost: any;
    closeBehavior: () => void;
    constructor(props) {
        super(props);
        this.state = {title: '', text: '', subId: -1, subOptions: []};
        this.handleChangeState = this.handleChangeState.bind(this);
        this.createNewOcPost = this.createNewOcPost.bind(this);
        this.editOCPost = this.editOCPost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(): void {
        if (this.props.originalPost) {
            this.setState({title: this.props.originalPost.title});
            this.setState({text: this.props.originalPost.text});
            this.setState({subId: this.props.originalPost.parentId});
        }
        else {
            getUserSubscriptions(localStorage.getItem('user-id')).then(res => {
                this.setState({subOptions: res.userSubscriptions});
                this.setState({subId: res.userSubscriptions[0].id});
            })
        }
    }

    handleChangeState(targetName: string, targetValue: string): void {
        this.setState({[targetName]: targetValue});
    }

    canSubmit(): boolean {
        return (this.state.subId !== -1) && matchPattern(this.state.title, validatorsRules.titlePattern);
    }

    createNewOcPost(): void {
        const newOCPost = {
            title: this.state.title,
            text: this.state.text,
            ownerId: localStorage.getItem('user-id'),
            parentId: this.state.subId,
            isOC: true,
        };
        createPost(newOCPost).then((res) => {
            console.log(res);
            this.props.closeBehavior();
            this.props.routerHistory.push('/f/'+this.state.title+'/s/'+res.id);//TODO: go to post page
        }).catch( err => {
            toast.error('Le sujet n\'a pas pu être créé...', {
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

    editOCPost(): void {
        if (this.props.originalPost.ownerId !== parseInt(localStorage.getItem('user-id'))) {//TODO: check if admin
            return;
        }
        const editingPost = {
            title: this.state.title,
            text: this.state.text,
            editerId: localStorage.getItem('user-id'),
        };
        updatePost(editingPost, this.props.originalPost.id).then((res) => {
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
        if (!this.props.originalPost) {
            this.createNewOcPost();
        } else {
            this.editOCPost();
        }
    }

    render() {
        return (
            <div className="create-ocpost-container">
                <CloseBtn closeBehavior={this.props.closeBehavior}/>
                <form onSubmit={this.handleSubmit}>
                    {this.props.originalPost && <h2>Modifier le Post</h2>}
                    {!this.props.originalPost && <h2>Nouveau Post</h2>}
                    <div className="settings-field-container">
                        <InputForm value={this.state.title} inputType="text" inputName="title"
                                   inputLabel="Titre du Post"
                                   inputWrongBehavior={{wrongTxt: validatorMessages.lastName.pattern,
                                       isWrong: function (value: string): boolean {
                                           //TODO: check if title already exist
                                           return !matchPattern(value, validatorsRules.titlePattern);
                                       }}}
                                   changeValue={this.handleChangeState}/>

                        <TextAreaForm value={this.state.text} inputType="text" inputName="text"
                                      inputLabel="Texte du Post"
                                      changeValue={this.handleChangeState}/>
                        {!this.props.originalPost && <SelectForm value={this.state.subId} inputName="subId" options={this.state.subOptions}
                                                                 inputLabel="Fil du Post"
                                                                 changeValue={this.handleChangeState}/>}

                        <button type="submit" disabled={!this.canSubmit()}>Poster</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        );
    }
}
