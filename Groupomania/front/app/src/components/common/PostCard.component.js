import React from 'react';
import "./_post-card.scss";
import {canUserEdit, getUserData} from "../../services/user.service";
import {updatePostLikes} from "../../services/post.service";

export default class PostCard extends React.Component {
    routerHistory: any;
    subTitle: string;
    postData: any;
    popEditPost: (postData: any) => void;

    constructor(props) {
        super(props);
        this.state = {authorName: 'u/anonyme', votes: 0, canEdit: false, timeSinceCreated: '0s'};
        this.goToArticle = this.goToArticle.bind(this);
        this.setDifferenceTime = this.setDifferenceTime.bind(this);
        this.sendVote = this.sendVote.bind(this);
    }

    setDifferenceTime(createdDate: string): void {
        let dateFirst = new Date(createdDate);
        let current = new Date();

        let timeDiff = Math.abs(current.getTime() - dateFirst.getTime()) / 1000;
        const days = Math.floor(timeDiff / 86400);
        timeDiff -= days * 86400;

        const hours = Math.floor(timeDiff / 3600) % 24;
        timeDiff -= hours * 3600;

        const minutes = Math.floor(timeDiff / 60) % 60;
        timeDiff -= minutes * 60;

        if (days > 0) {
            this.setState({timeSinceCreated: days + 'j'});
        } else if (hours > 0) {
            this.setState({timeSinceCreated: hours + 'h'});
        } else {
            this.setState({timeSinceCreated: minutes + 'm'});
        }
    }

    componentDidMount(): void {
        this.setDifferenceTime(this.props.postData.createdAt);
        if (!this.props.postData.isOC) {//TODO: make it happen also for OCPost
            canUserEdit(this.props.postData.ownerId).then(can => {
                this.setState({canEdit: can});
            });
        }
        getUserData(this.props.postData.ownerId).then( res => {
            this.setState({authorName: 'u/'+(res.userFound.username !== ''? res.userFound.username: res.userFound.firstName + ' ' + res.userFound.lastName)});
        }).catch(err => {

        });
        this.setState({votes: this.props.postData.usersUpVote.length - this.props.postData.usersDownVote.length});
    }

    goToArticle(event): void {
        if (!this.props.routerHistory)
            return;
        if (event.target.id === 'sub-link') {
            this.props.routerHistory.push('/f/'+this.props.subTitle);
        } else {
            this.props.routerHistory.push('/f/'+this.props.subTitle+'/s/'+this.props.postData.id);
        }
    }

    sendVote(likeValue: number): void {
        updatePostLikes(this.props.postData.id, likeValue).then(res => {
            this.setState({votes: parseInt(res.value)});
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <article className="postcard-container" onClick={this.goToArticle}>
                <div className="postcard-banner-container">
                    <div className="postcard-avatar">
                    </div>
                    <div className="postcard-meta-data">
                        {this.props.subTitle && <h3 id='sub-link'>f/{this.props.subTitle}</h3>}
                        <span>{this.state.authorName}<div className={"delimiter-point"}/>{this.state.timeSinceCreated}</span>
                    </div>
                </div>
                <div className="postcard-content">
                    {this.props.postData.title !== '' && <h2>{this.props.postData.title}</h2>}
                    <p>{this.props.postData.text}</p>
                </div>
                <div className="postcard-stats">
                    <span>
                        <button className={'btn-vote'} onClick={(event) => {this.sendVote(1);  event.stopPropagation();}}>
                            <div className="overlay"/>
                            <img src={window.location.origin + '/images/iconarrowup.png'} alt="Upvote" title="Upvote button"/>
                        </button>
                        {this.state.votes}
                        <button className={'btn-vote'} onClick={(event) => {this.sendVote(-1);  event.stopPropagation();}}>
                            <div className="overlay"/>
                            <img src={window.location.origin + '/images/iconarrowdown.png'} alt="Downvote" title="Downvote button"/>
                        </button>
                    </span>
                    <span>
                        {this.state.canEdit &&
                        <button id={'edit-btn'} onClick={() => {this.props.popEditPost(this.props.postData)}}>Changer</button>/*TODO: Change for icon btn*/}
                    </span>
                </div>
            </article>
        );
    }
}
