import React, {useEffect, useState} from 'react';
import {useParams, useHistory, useLocation} from "react-router-dom";
import './_post-page.scss';
import Header from "../common/Header.component";
import {getPostById} from "../../services/post.service";
import {CSSTransition} from "react-transition-group";
import CreateCommentPost from "../forms/CreateCommentPost.component";

function PostPage(props) {
    let history = useHistory();
    const {state} = useLocation();
    const [post, setPost] = useState(state? state.post: null);
    const [comments, setComments] = useState(null);
    let { postId } = useParams();

    const nodeRef = React.useRef(null);
    const [showCreateCommentPost, setShowCreateCommentPost] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (!post) {
            getPostById(postId).then(ret => {
                if (mounted) {
                    setPost(ret.postFound);
                    getPostById(ret.postFound.id, 'getcomments/').then(posts => {
                        setComments(posts.postsFound);
                    }).catch(error => {
                        console.log(error);
                    });
                }
            }).catch(error => {
                history.push('/login');
            });
        }
        return () => mounted = false;
    }, [history, post, postId]);


    function popAddComment(event): void {
        setShowCreateCommentPost(true);
    }

    function disappearCommentForm() :void {
        setShowCreateCommentPost(false);
    }

    function reloadComments() :void {
        getPostById(post.id, 'getcomments/').then(posts => {
            setComments(posts.postsFound);
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <div className="post-page-container">
            <Header routerHistory={history}/>
            {post && <div>
                <CSSTransition in={showCreateCommentPost} timeout={600} classNames="from-bottom" unmountOnExit
                               onEnter={() => setShowCreateCommentPost(true)}
                               onExited={() => setShowCreateCommentPost(false)}
                               nodeRef={nodeRef}>
                    <div ref={nodeRef}>
                        <CreateCommentPost postId={post.id} closeBehavior={disappearCommentForm} postedBehavior={reloadComments}/>
                    </div>
                </CSSTransition>
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
                            <button onClick={popAddComment}>Commenter</button>
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
