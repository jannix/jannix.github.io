import React from 'react';
import "./_input-form.scss";

export default class InputForm extends React.Component {
    value: string;
    inputType: string;
    inputName: string;
    inputLabel: string;
    inputWrongBehavior: {wrongTxt: string, isWrong: (text: string) => boolean};
    changeValue: (name: string, value: string) => void;

    isWrong: boolean = false;

    constructor(props) {
        super(props);
        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    handleChangeValue(event): void {
        this.props.changeValue(event.target.name, event.target.value);
        if (this.props.inputWrongBehavior) {
            if (this.props.inputWrongBehavior.isWrong(event.target.value)) {
                this.isWrong = true;
            } else {
                this.isWrong = false;
            }
        }
    }

    render() {
        return (
            <div className="input-container">
                <input className={(this.props.value? "has-content":"")} type={this.props.inputType} name={this.props.inputName}
                       autoComplete="false" value={this.props.value} onChange={this.handleChangeValue}/>
                <label className="input-placeholder">{this.props.inputLabel}</label>
                {this.isWrong &&
                <div className="wrong-input">
                    <label className="wrong-input__label">{this.props.inputWrongBehavior.wrongTxt}</label>
                </div>
                }
            </div>
        );
    }
}
