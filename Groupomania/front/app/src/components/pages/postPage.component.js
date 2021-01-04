import React, {useEffect, useState} from 'react';
import {useParams, useHistory, useLocation} from "react-router-dom";
import './_post-page.scss';
import Header from "../common/Header.component";
import {getPostById} from "../../services/post.service";
//import MainDisplay from "../common/MainDisplay.component";


function PostPage(props) {
    let history = useHistory();
    const {state} = useLocation();
    const [post, setpost] = useState(state? state.post: null);
    let { postId } = useParams();

    useEffect(() => {
        let mounted = true;
        if (!post || post.id !== postId) {
            console.log(postId);
            getPostById(postId).then(post => {
                console.log(post);
            }).catch(error => {
                history.push('/login');
            });
        }
        return () => mounted = false;
    }, [post, postId]);

    return (
        <div className="post-page-container">
            <Header routerHistory={history}/>
            {post && <article className="postcard-container">
                <div className="postcard-banner-container">
                    <div className="postcard-avatar">
                    </div>
                    <div className="postcard-meta-data">
                        {post.subTitle && <h3>f/{post.subTitle}</h3>}
                        <span>{post.authorName}<div>.</div>14h</span>
                    </div>
                </div>
                <div className="postcard-content">
                    <h2>{post.title}</h2>
                    <p>{post.text}</p>
                </div>
                <div className="postcard-stats">
                    <span>
                        {post.upvote - post.downvote}
                    </span>
                    <span>
                        YY
                    </span>
                </div>
            </article>}
        </div>
    );
}

export default PostPage;
