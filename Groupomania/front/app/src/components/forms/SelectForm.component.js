import React from 'react';
import "./_select-form.scss";

export default class SelectForm extends React.Component {
    value: string;
    inputName: string;
    inputLabel: string;
    inputWrongBehavior: {wrongTxt: string, isWrong: (text: string) => boolean};
    changeValue: (name: string, value: string) => void;
    options: [any];

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
            <div className="select-container">
                <select className={(this.props.value? "has-content":"") + ' ' + this.wrongInputCss} name={this.props.inputName}
                       autoComplete="off" value={this.props.value} onChange={this.handleChangeValue}>
                    {this.props.options.map( opt => (
                        <option key={opt.id} value={opt.id}>{opt.title}</option>
                    ))}
                </select>
                <label htmlFor={this.props.inputName} className="input-placeholder">{this.props.inputLabel}</label>
                {this.isWrong &&
                <div className="wrong-input-txt">
                    <label className="wrong-input-txt__label">{this.props.inputWrongBehavior.wrongTxt}</label>
                </div>
                }
            </div>
        );
    }
}
