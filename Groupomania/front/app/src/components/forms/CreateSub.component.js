import React from 'react';
import "./_create-sub.scss";
import InputForm from "./InputForm.component";
import {matchPattern, validatorMessages, validatorsRules} from "../../utils/validator";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default class CreateSub extends React.Component {


    constructor(props) {
        super(props);
    }


    canSubmit(): boolean {
        return false;
    }

    handleSubmit(event): void {
        if (!this.canSubmit()) {
            return;
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="create-sub-container">
                <form onSubmit={this.handleSubmit}>

                </form>
                <ToastContainer />
            </div>
        );
    }
}
