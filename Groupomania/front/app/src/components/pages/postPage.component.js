import React, {useEffect, useState} from 'react';
import {useParams, useHistory, useLocation} from "react-router-dom";
import './_post-page.scss';
import Header from "../common/Header.component";
import {getPostById} from "../../services/post.service";
import {CSSTransition} from "react-transition-group";
import CreateCommentPost from "../forms/CreateCommentPost.component";
import {getUserData} from "../../services/user.service";
import CommentSection from "../common/CommentSection.component";

function PostPage(props) {
    let history = useHistory();
    const {state} = useLocation();
    const [post, setPost] = useState(state? state.post: null);
    const [comments, setComments] = useState(null);
    const [authorName, setAuthorName] = useState('u/anonyme');
    let { postId } = useParams();

    const nodeRef = React.useRef(null);
    const [showCreateCommentPost, setShowCreateCommentPost] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (!post) {
            getPostById(postId).then(ret => {
                if (mounted) {
                    setPost(ret.postFound);
                    getUserData(ret.postFound.ownerId).then( res => {
                        setAuthorName('u/'+(res.userFound.username !== ''? res.userFound.username: res.userFound.firstName + ' ' + res.userFound.lastName));
                    });
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
                    <div className="postOC-banner-container">
                        <div className="postOC-avatar">
                        </div>
                        <div className="postOC-meta-data">
                            <span>{authorName}<div>.</div>14h</span>
                        </div>
                    </div>
                    <article className="postOC-content">
                        <h2>{post.title}</h2>
                        <p>{post.text}</p>
                    </article>
                    <div className="postOC-stats">
                        <span>
                            {post.usersUpVote.length - post.usersDownVote.length}
                        </span>
                        <span>
                            {post.ownerId === parseInt(localStorage.getItem('user-id')) &&
                            <button onClick={popAddComment}>Changer</button>/*TODO: Change for icon btn*/}
                            <button onClick={popAddComment}>Commenter</button>
                        </span>
                    </div>
                </section>
                <section className="comments-container">
                    {comments && <CommentSection comments={comments}/>}
                    {!comments && <span>Aucun commentaire</span>}
                </section>
            </div>}
        </div>
    );
}

export default PostPage;
