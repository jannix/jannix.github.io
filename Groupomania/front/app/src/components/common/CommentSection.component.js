import React from 'react';
import "./_comment-section.scss";
import PostCard from "./PostCard.component";

export default class CommentSection extends React.Component {

    comments: [any];

    render() {
        return (
            <section className="commentsection-container">
                {this.props.comments.map( comment => (
                    <PostCard key={'comment'+comment.id} routerHistory={this.props.routerHistory} subTitle={null} postData={comment}/>))
                }
            </section>
        );
    }
}
