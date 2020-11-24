import React from 'react';
import "./_header-tab.scss";

export default class HeaderTab extends React.Component {
    tabName: string;

    isActive: boolean = false;
    constructor(props) {
        super(props);
        this.isActive = true;
        this.onClick = this.onClick.bind(this);
    }

    onClick(event): void {
        this.isActive = false;
        console.log(this.isActive);
    }

    render() {
        return (
            <li className={this.isActive? "active":""}><button onClick={this.onClick}>{this.props.tabName}</button></li>
        );
    }
}
