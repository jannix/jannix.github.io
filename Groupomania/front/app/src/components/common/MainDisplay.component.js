import React from 'react';
import "./_main-display.scss";
import {getPostByParentId} from "../../services/post.service";
import PostCard from "./PostCard.component";
import {getUserSubscriptions, un_or_subscribe} from "../../services/user.service";

export default class MainDisplay extends React.Component {
    routerHistory: any;
    subData: any;
    userData: any;
    postHistory: [];

    constructor(props) {
        super(props);
        this.state = {postList: [], userJoined: false};
        this.loadPostListBySub = this.loadPostListBySub.bind(this);
        this.loadPostListByUser = this.loadPostListByUser.bind(this);
        this.joinSub = this.joinSub.bind(this);
        this.init = this.init.bind(this);
    }

    componentDidMount(): void {
        this.init();
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        if (this.props.subData && (this.props.subData.id !== prevProps.subData.id)) {
            this.setState({postList: []});
            this.setState({userJoined: false});
            this.loadPostListBySub();
            if (!this.props.userData) {
                getUserSubscriptions(localStorage.getItem('user-id')).then( res => {
                    res.userSubscriptions.forEach( sub => {
                        if (sub.id === this.props.subData.id) {
                            this.setState({userJoined: true});
                        }
                    });
                });
            }
        } else if (this.props.userData && (this.props.userData.id !== prevProps.userData.id)) {
            this.setState({postList: []});
            this.setState({userJoined: false});
            this.loadPostListByUser();
        }
    }

    init(): void {
        if (this.props.subData) {
            this.loadPostListBySub();
            if (!this.props.userData) {
                getUserSubscriptions(localStorage.getItem('user-id')).then( res => {
                    res.userSubscriptions.forEach( sub => {
                        if (sub.id === this.props.subData.id) {
                            this.setState({userJoined: true});
                        }
                    });
                });
            }
        } else if (this.props.userData) {
            this.loadPostListByUser();
        }
    }

    loadPostListBySub(): void {
        getPostByParentId(this.props.subData.id).then(res => {
            this.setState({postList: res.postsFound});
        });
    }

    loadPostListByUser(): void {
        this.props.userData.subscriptionIds.map(subId => (
            getPostByParentId(subId).then(res => {
                this.setState({postList: this.state.postList.concat(res.postsFound)});
            })
        ));
    }

    joinSub(): void {
        if (this.state.userJoined) {
            un_or_subscribe(localStorage.getItem('user-id'), this.props.subData.id, false).then(res => {
                this.setState({userJoined: false});
            });
        } else {
            un_or_subscribe(localStorage.getItem('user-id'), this.props.subData.id, true).then(res => {
                this.setState({userJoined: true});
            });
        }
    }

    render() {
        return (
            <main className="main-display-container">
                {this.props.subData &&
                <div className="sub-header">
                    <div>
                        <h1>f/{this.props.subData.title}</h1>
                        <button onClick={this.joinSub}>{this.state.userJoined? 'Quitter': 'Rejoindre'}</button>
                    </div>
                    <p>{this.props.subData.description}</p>
                </div>}
                {this.state.postList.length === 0 &&
                    <p>Nothing to show</p>
                }
                {this.state.postList.map( post => (
                    <PostCard key={'post'+post.id} subTitle={this.props.subData? this.props.subData.title: null} postData={post}/>))
                }
            </main>
        );
    }
}
