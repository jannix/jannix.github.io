import React from 'react';
import "./_header.scss";
import {getSubsByTitle} from "../../services/sub.service";
import {CSSTransition} from "react-transition-group";
import CreationSettings from "../settings/CreationSettings.component";
import CreateSub from "../forms/CreateSub.component";
import CreateOCPost from "../forms/CreateOCPost.component";

export default class Header extends React.Component {
    routerHistory: any;

    constructor(props) {
        super(props);
        this.state = {isSub: true, searchOption: [],
            showCreateMenu: false, showCreateSub: false, showCreateOCPost: false};
        this.myRef = React.createRef();
        this.myRef2 = React.createRef();

        this.clickOnSub = this.clickOnSub.bind(this);
        this.clickOnNews = this.clickOnNews.bind(this);
        this.clickOnAvatar = this.clickOnAvatar.bind(this);
        this.clickOnHome = this.clickOnHome.bind(this);
        this.clickOnCreate = this.clickOnCreate.bind(this);
        this.clickSearchCandidate = this.clickSearchCandidate.bind(this);
        this.appearCreateMenu = this.appearCreateMenu.bind(this);
        this.disappearAllMenu = this.disappearAllMenu.bind(this);
        this.appearCreateSub = this.appearCreateSub.bind(this);
        this.appearCreateOCPost = this.appearCreateOCPost.bind(this);
        this.handleSearchChangeValue = this.handleSearchChangeValue.bind(this);
    }

    handleSearchChangeValue(event): void {
        if (!event.target.value) {
            this.setState({searchOption: []});
            return;
        }
        getSubsByTitle(event.target.value).then((res) => {
            if (res.subsFound) {
                this.setState({searchOption: res.subsFound});
            } else {
                this.setState({searchOption: []});
            }
        }).catch( err => {
            this.setState({searchOption: []});
        });
    }

    appearCreateMenu(appear: boolean): void {
        this.setState({showCreateMenu: appear});
        this.setState({showCreateSub: false});
        this.setState({showCreateOCPost: false});
    }

    disappearAllMenu(): void {
        this.setState({showCreateMenu: false});
        this.setState({showCreateSub: false});
        this.setState({showCreateOCPost: false});
    }

    appearCreateSub(): void {
        this.setState({showCreateMenu: false});
        this.setState({showCreateSub: true});
    }

    appearCreateOCPost(): void {
        this.setState({showCreateMenu: false});
        this.setState({showCreateOCPost: true});
    }

    clickSearchCandidate(event): void {
        const found = this.state.searchOption.find(element => 'f/' + element.title === event.currentTarget.innerHTML);
        console.log(found);
        this.setState({searchOption: []});
        document.getElementById('input-search').value = '';
        //this.props.routerHistory.push('/' + event.currentTarget.innerHTML);
        this.props.routerHistory.push({
            pathname: '/' + event.currentTarget.innerHTML,
            state: {
                sub: found,
            }
        })
        //TODO: use smth else than innerhtml
    }

    //TODO: improve by making better css and components
    clickOnSub(event): void {
        this.setState({isSub: true});
        //this.props.routerHistory.push('/');
        //TODO: refresh get users sub
    }

    clickOnNews(event): void {
        this.setState({isSub: false});
        //this.props.routerHistory.push('/');
        //TODO: refresh get news
    }

    clickOnAvatar(event): void {
        this.props.routerHistory.push('/settings/account');
    }

    clickOnHome(event): void {
        this.props.routerHistory.push('/');
    }

    clickOnCreate(event): void {
        this.setState({showCreateMenu: !this.state.showCreateMenu});
    }

    render() {
        return (
            <div className="header-container">
                <header>
                    <div className="upper-row">
                        <div className="round-icon">
                            <img onClick={this.clickOnHome} src={window.location.origin + '/images/iconalpha.png'} alt="Home Icon" title="Groupomania Home"/>
                        </div>
                        <div className="round-icon">
                            <img onClick={this.clickOnAvatar} src={window.location.origin + '/images/iconavatar.png'} alt="User Icon" title="User Profile"/>
                        </div>
                        <div className="round-icon">
                            <img onClick={this.clickOnCreate} src={window.location.origin + '/images/iconcreate.png'} alt="Create Icon" title="Create fil and post"/>
                        </div>
                        <div id="search">
                            <label htmlFor="input-search">Rechercher</label>
                            <input id='input-search' type="text" placeholder="Rechercher..." onChange={this.handleSearchChangeValue} title="Search input" />
                            {this.state.searchOption.length > 0 &&
                            <ul className="search-list-result">
                                {this.state.searchOption.map( sub => (
                                    <li key={'sub'+sub.id} onClick={this.clickSearchCandidate} >
                                        f/{ sub.title }
                                    </li>
                                ))}
                            </ul>
                            }
                        </div>
                    </div>
                    {/*TODO: make tab row hide and show
                    <div className="tab-row">
                        <nav id="home-tab">
                            <ul>
                                <li className={this.state.isSub? '': ''}><button id="tab-sub" onClick={this.clickOnSub}>Mes Fils</button></li>
                                <li className={this.state.isSub? '': ''}><button id="tab-news" onClick={this.clickOnNews}>News</button></li>
                            </ul>
                        </nav>
                    </div>*/}
                </header>
                <CSSTransition in={this.state.showCreateMenu} timeout={600} classNames="from-left" unmountOnExit
                               onEnter={() => this.setState({showCreateMenu: true})}
                               onExited={() => this.setState({showCreateMenu: false})}
                               nodeRef={this.myRef}>
                    <div ref={this.myRef}>
                        <CreationSettings showCreateOCPost={this.appearCreateOCPost} showCreateSub={this.appearCreateSub}
                                          closeBehavior={this.disappearAllMenu}/>
                    </div>
                </CSSTransition>
                <CSSTransition in={this.state.showCreateSub} timeout={600} classNames="from-bottom" unmountOnExit
                               onEnter={() => this.setState({showCreateSub: true})}
                               onExited={() => this.setState({showCreateSub: false})}
                               nodeRef={this.myRef2}>
                    <div ref={this.myRef2}>
                        <CreateSub closeBehavior={this.disappearAllMenu} routerHistory={this.props.routerHistory}/>
                    </div>
                </CSSTransition>
                <CSSTransition in={this.state.showCreateOCPost} timeout={600} classNames="from-bottom" unmountOnExit
                               onEnter={() => this.setState({showCreateOCPost: true})}
                               onExited={() => this.setState({showCreateOCPost: false})}
                               nodeRef={this.myRef2}>
                    <div ref={this.myRef2}>
                        <CreateOCPost closeBehavior={this.disappearAllMenu} routerHistory={this.props.routerHistory}/>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}
