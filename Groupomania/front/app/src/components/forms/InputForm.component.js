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
    wrongInputCss: string = '';

    constructor(props) {
        super(props);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(event): void {
        event.preventDefault();
    }

    render() {
        return (
            <div className="input-container">
                <input id={"inputid-"+this.props.inputName} className={(this.props.value? "has-content":"") + ' ' + this.wrongInputCss} type={this.props.inputType} name={this.props.inputName}
                       autoComplete="off" value={this.props.value} onChange={this.handleChangeValue} onClick={this.handleClick}/>
                <label for={"inputid-"+this.props.inputName} className="input-placeholder">{this.props.inputLabel}</label>
                {this.isWrong &&
                <div className="wrong-input-txt">
                    <label className="wrong-input-txt__label">{this.props.inputWrongBehavior.wrongTxt}</label>
                </div>
                }
            </div>
        );
    }
}
