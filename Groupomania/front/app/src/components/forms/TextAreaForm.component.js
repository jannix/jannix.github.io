import React from 'react';
import "./_textarea-form.scss";

export default class TextAreaForm extends React.Component {
    value: string;
    inputType: string;
    inputName: string;
    inputLabel: string;
    inputWrongBehavior: {wrongTxt: string, isWrong: (text: string) => boolean};
    changeValue: (name: string, value: string) => void;

    isWrong: boolean = false;
    wrongInputCss: string = '';

    constructor(props) {
        super(props);
        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    handleChangeValue(event): void {
        this.props.changeValue(event.target.name, event.target.value);
        if (this.props.inputWrongBehavior) {
            if (event.target.value === '') {
                this.wrongInputCss = '';
                this.isWrong = false;
                return;
            }
            if (this.props.inputWrongBehavior.isWrong(event.target.value)) {
                this.wrongInputCss = 'wrong-input';
                this.isWrong = true;
            } else {
                this.wrongInputCss = '';
                this.isWrong = false;
            }
        }
    }

    render() {
        return (
            <div className="input-textarea-container">
                <textarea rows="5" className={(this.props.value? "has-content":"") + ' ' + this.wrongInputCss} type={this.props.inputType} name={this.props.inputName}
                       autoComplete="false" value={this.props.value} onChange={this.handleChangeValue}/>
                <label className="input-placeholder">{this.props.inputLabel}</label>
                {this.isWrong &&
                <div className="wrong-input-txt">
                    <label className="wrong-input-txt__label">{this.props.inputWrongBehavior.wrongTxt}</label>
                </div>
                }
            </div>
        );
    }
}
