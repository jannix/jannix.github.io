import React from 'react';
import "./_logo.scss";

export default class LogoConnection extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <img src={window.location.origin + '/images/iconalpha.png'} alt="Icon Groupomania" title="Groupomania Social Network"/>
                <span>Groupomania</span>
            </div>
        );
    }
}
