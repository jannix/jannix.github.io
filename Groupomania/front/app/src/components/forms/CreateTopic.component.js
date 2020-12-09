import React from 'react';
import "./_create-topic.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TextAreaForm from "./TextAreaForm.component";
import CloseBtn from "../common/CloseBtn.component";
import SelectForm from "./SelectForm.component";
import {getUserSubscriptions} from "../../services/user.service";

export default class CreateTopic extends React.Component {

    closeBehavior: () => void;
    constructor(props) {
        super(props);
        this.state = {title: '', text: '', subOptions: []};
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(): void {
        getUserSubscriptions(localStorage.getItem('user-id')).then(res => {
            this.setState({subOptions: res.userSubscriptions});
        })
    }

    handleChangeState(targetName: string, targetValue: string): void {
        this.setState({[targetName]: targetValue});
    }

    canSubmit(): boolean {
        return false;
    }

    handleSubmit(event): void {
        if (!this.canSubmit()) {
            return;
        }
        event.preventDefault();

        /*const newTopic = {
        };
        createTopic(newSub).then((res) => {
            this.props.closeBehavior();
            this.props.routerHistory.push('/');
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
        });*/
    }

    render() {
        return (
            <div className="create-topic-container">
                <CloseBtn closeBehavior={this.props.closeBehavior}/>
                <form onSubmit={this.handleSubmit}>
                    <h2>Nouveau Sujet</h2>
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
                        <SelectForm value={this.state.subId} inputName="sub" options={this.state.subOptions}
                                   inputLabel="Fil du Post"
                                   changeValue={this.handleChangeState}/>

                        <button type="submit" disabled={!this.canSubmit()}>Poster</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        );
    }
}
