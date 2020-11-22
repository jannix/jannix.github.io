import React from 'react';
import "./_header.scss";

export default class Header extends React.Component {

    render() {
        return (
            <div className="header-container">
                <div className="upper-row">
                    <div id="avatar">
                        <img src={window.location.origin + '/images/testiconavatar.png'} alt="user Avatar" title="User Profile"/>
                    </div>
                    <div id="search">
                        <input type="text" placeholder="Search.."/>
                    </div>
                </div>
                <div className="tab-row">
                    <nav id="home-tab">
                        <ul>
                            <li className="active"><button id="tab-sub">Mon Fil</button></li>
                            <li><button id="tab-news">News</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
