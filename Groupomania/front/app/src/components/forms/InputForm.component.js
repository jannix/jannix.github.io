import React from 'react';
import "./_input-form.scss";

export default class InputForm extends React.Component {
    value: string;
    inputType: string;
    inputName: string;
    inputLabel: string;
    changeValue: (name: string, value: string) => void;

    constructor(props) {
        super(props);
        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    handleChangeValue(event) {
        //TODO: check value format => this.props.fctCheckValueFormat OR let it do by parent???
        this.props.changeValue(event.target.name, event.target.value);
    }

    render() {
        return (
            <div>
                <input className={(this.props.value? "has-content":"")} type={this.props.inputType} name={this.props.inputName}
                       autoComplete="false" value={this.props.value} onChange={this.handleChangeValue}/>
                <label className="input-placeholder">{this.props.inputLabel}</label>
            </div>
        );
    }
}
