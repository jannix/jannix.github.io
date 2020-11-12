import React from 'react';
import "./_setting-field.scss";

export default class SettingField extends React.Component {

    settingTitle: string;
    currentValue: string;

    clickFunction: (currentValue: string) => void;

    render() {
        return (
            <div className="setting-field-container">
                <div className="texts-container">
                    <p className="setting-title">{this.props.settingTitle}</p>
                    <p className="current-value">{this.props.currentValue}</p>
                </div>
                <div className="arrow-container">
                    <button onClick={this.props.clickFunction} className="arrow right"/>
                </div>
            </div>
        );
    }
}
