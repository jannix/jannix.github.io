import React, {useEffect, useState} from 'react';
import {useParams, useHistory, useLocation} from "react-router-dom";
import './_post-page.scss';
import Header from "../common/Header.component";
import {getPostById} from "../../services/post.service";

function PostPage(props) {
    let history = useHistory();
    const {state} = useLocation();
    const [post, setPost] = useState(state? state.post: null);
    const [comments, setComments] = useState(null);
    let { postId } = useParams();

    useEffect(() => {
        let mounted = true;
        if (!post) {
            getPostById(postId).then(ret => {
                if (mounted) {
                    setPost(ret.postFound);console.log(ret.postFound.id);
                    getPostById(ret.postFound.id, 'getcomments/').then(posts => {
                        console.log(posts.postsFound);
                        setComments(posts.postsFound);
                    }).catch(error => {
                        console.log('no comments found?');
                    });
                }
            }).catch(error => {
                history.push('/login');
            });
        }
        return () => mounted = false;
    }, [history, post, postId]);

    return (
        <div className="post-page-container">
            <Header routerHistory={history}/>
            {post && <div>
                <section className="postOC-container">
                    <div className="postIC-banner-container">
                        <div className="postOC-avatar">
                        </div>
                        <div className="postOC-meta-data">
                            {post.subTitle && <h3 id="sub-link">f/{post.subTitle}</h3>}
                            <span>{post.authorName}<div>.</div>14h</span>
                        </div>
                    </div>
                    <article className="postOC-content">
                        <h2>{post.title}</h2>
                        <p>{post.text}</p>
                    </article>
                    <div className="postOC-stats">
                        <span>
                            {post.upvote - post.downvote}
                        </span>
                        <span>
                            YY
                        </span>
                    </div>
                </section>
                <section className="comments-container">
                    {comments && <div>Here is comments compp</div>}
                    ANYWAYYYYYYYYYYYYY
                </section>
            </div>}
        </div>
    );
}

export default PostPage;
