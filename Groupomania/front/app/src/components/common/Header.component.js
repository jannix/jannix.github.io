import React from 'react';
import "./_header.scss";

export default class Header extends React.Component {

    isShowCreateMenu: boolean;
    showCreateMenu: (appear: boolean) => void;
    constructor(props) {
        super(props);
        this.state = {isSub: true};
        this.clickOnSub = this.clickOnSub.bind(this);
        this.clickOnNews = this.clickOnNews.bind(this);
        this.clickOnAvatar = this.clickOnAvatar.bind(this);
        this.clickOnCreate = this.clickOnCreate.bind(this);
        this.handleSearchChangeValue = this.handleSearchChangeValue.bind(this);
    }

    handleSearchChangeValue(event): void {
        //TODO: search sub api
    }

    //TODO: improve by making better css and components
    clickOnSub(event): void {
        this.setState({isSub: true});
        //TODO: refresh get users sub
    }

    clickOnNews(event): void {
        this.setState({isSub: false});
        //TODO: refresh get news
    }

    clickOnAvatar(event): void {
        console.log('clicl avatar');
    }

    clickOnCreate(event): void {
        //this.props.isShowCreateMenu = !this.props.isShowCreateMenu;
        if (this.props.showCreateMenu) {
            this.props.showCreateMenu(!this.props.isShowCreateMenu);
        }
    }

    render() {
        return (
            <div className="header-container">
                <div className="upper-row">
                    <div className="round-icon">
                        <img onClick={this.clickOnAvatar} src={window.location.origin + '/images/testiconavatar.png'} alt="user Avatar" title="User Profile"/>
                    </div>
                    <div className="round-icon">
                        <img onClick={this.clickOnCreate} src={window.location.origin + '/images/iconcreate.png'} alt="user Avatar" title="User Profile"/>
                    </div>
                    <div id="search">
                        <input type="text" placeholder="Search..." onChange={this.handleSearchChangeValue}/>
                    </div>
                </div>
                <div className="tab-row">
                    <nav id="home-tab">
                        <ul>
                            <li className={this.state.isSub? 'active': ''}><button id="tab-sub" onClick={this.clickOnSub}>Mes Fils</button></li>
                            <li className={this.state.isSub? '': 'active'}><button id="tab-news" onClick={this.clickOnNews}>News</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
