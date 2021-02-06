import React from 'react';
import "./_post-card.scss";
import {canUserEdit, getUserData} from "../../services/user.service";
import {updatePostLikes} from "../../services/post.service";

export default class PostCard extends React.Component {
    routerHistory: any;
    subTitle: string;
    postData: any;

    constructor(props) {
        super(props);
        this.state = {authorName: 'u/anonyme', votes: 0, canEdit: false};
        this.goToArticle = this.goToArticle.bind(this);
        this.sendVote = this.sendVote.bind(this);
        this.popEditPost = this.popEditPost.bind(this);
    }

    componentDidMount(): void {
        getUserData(this.props.postData.ownerId).then( res => {
            canUserEdit(this.props.postData.ownerId).then(can => {
                this.setState({canEdit: can});
            });
            this.setState({authorName: 'u/'+(res.userFound.username !== ''? res.userFound.username: res.userFound.firstName + ' ' + res.userFound.lastName)});
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

    popEditPost(): void {

    }

    render() {
        return (
            <article className="postcard-container" onClick={this.goToArticle}>
                <div className="postcard-banner-container">
                    <div className="postcard-avatar">
                    </div>
                    <div className="postcard-meta-data">
                        {this.props.subTitle && <h3 id='sub-link'>f/{this.props.subTitle}</h3>}
                        <span>{this.state.authorName}<div>.</div>14h</span>
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
                        <button id={'edit-btn'} onClick={this.popEditPost}>Changer</button>/*TODO: Change for icon btn*/}
                    </span>
                </div>
            </article>
        );
    }
}
