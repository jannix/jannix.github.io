import React from 'react';
import "./_post-card.scss";
import {getUserData} from "../../services/user.service";

export default class PostCard extends React.Component {
    routerHistory: any;
    subTitle: string;
    postData: any;

    constructor(props) {
        super(props);
        this.state = {authorName: 'u/anonyme'};
        this.goToArticle = this.goToArticle.bind(this);
    }

    componentDidMount(): void {
        getUserData(this.props.postData.ownerId).then( res => {
            this.setState({authorName: 'u/'+(res.userFound.username !== ''? res.userFound.username: res.userFound.firstName + ' ' + res.userFound.lastName)});
        });
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
                        {this.props.postData.usersUpVote.length - this.props.postData.usersDownVote.length}
                    </span>
                    <span>
                        {this.props.postData.ownerId === parseInt(localStorage.getItem('user-id')) &&
                        <button>Changer</button>/*TODO: Change for icon btn*/}
                        YY
                    </span>
                </div>
            </article>
        );
    }
}
