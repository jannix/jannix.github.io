import React from 'react';
import "./_post-card.scss";
import {getUserData} from "../../services/user.service";
import {
    NavLink
} from "react-router-dom";

export default class PostCard extends React.Component {
    routerHistory: any;
    subTitle: string;
    postData: any;

    constructor(props) {
        super(props);
        this.state = {authorName: 'u/anonyme'};
        console.log(this.props.postData);
    }

    componentDidMount(): void {
        getUserData(this.props.postData.ownerId).then( res => {
            this.setState({authorName: 'u/'+(res.userFound.username !== ''? res.userFound.username: res.userFound.firstName + ' ' + res.userFound.lastName)});
        });
    }

    render() {
        return (
            <NavLink className='router-link' to='/'>
                <article className="postcard-container">
                    <div className="postcard-banner-container">
                        <div className="postcard-avatar">
                        </div>
                        <div className="postcard-meta-data">
                            {this.props.subTitle && <h3>f/{this.props.subTitle}</h3>}
                            <span>{this.state.authorName}<div>.</div>14h</span>
                        </div>
                    </div>
                    <div className="postcard-content">
                        <h2>{this.props.postData.title}</h2>
                        <p>{this.props.postData.text}</p>
                    </div>
                    <div className="postcard-stats">
                        <span>
                            {this.props.postData.upvote - this.props.postData.downvote}
                        </span>
                        <span>
                            YY
                        </span>
                    </div>
                </article>
            </NavLink>
        );
    }
}
