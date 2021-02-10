import React, {useEffect, useState} from 'react';
import {useParams, useHistory, useLocation} from "react-router-dom";
import './_post-page.scss';
import Header from "../common/Header.component";
import {getPostById, updatePostLikes} from "../../services/post.service";
import {CSSTransition} from "react-transition-group";
import CreateCommentPost from "../forms/CreateCommentPost.component";
import {canUserEdit, getUserData} from "../../services/user.service";
import CommentSection from "../common/CommentSection.component";
import CreateOCPost from "../forms/CreateOCPost.component";
import {getSubById} from "../../services/sub.service";

function PostPage(props) {
    let history = useHistory();
    const {state} = useLocation();
    const [post, setPost] = useState(state? state.post: null);
    const [comments, setComments] = useState(null);
    const [commentToEdit, setCommentToEdit] = useState(null);
    const [authorName, setAuthorName] = useState('u/anonyme');
    const [subTitle, setSubTitle] = useState('f/anonyme');
    const [votes, setVotes] = useState(0);
    const [canEdit, setCanEdit] = useState(false);
    let { postId } = useParams();

    const nodeRef = React.useRef(null);
    const [showCreateCommentPost, setShowCreateCommentPost] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (!post) {
            getPostById(postId).then(ret => {
                if (mounted) {
                    setPost(ret.postFound);
                    setVotes(ret.postFound.usersUpVote.length - ret.postFound.usersDownVote.length);
                    canUserEdit(ret.postFound.ownerId).then(can => {
                        setCanEdit(can);
                    });
                    getUserData(ret.postFound.ownerId).then( res => {
                        setAuthorName('u/'+(res.userFound.username !== ''? res.userFound.username: res.userFound.firstName + ' ' + res.userFound.lastName));
                    });
                    getSubById(ret.postFound.parentId).then(sub => {
                        setSubTitle(sub.subFound.title);
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

    function sendVote(likeValue: number) {
        updatePostLikes(post.id, likeValue).then(res => {
            setVotes(parseInt(res.value));
        }).catch(error => {
            console.log(error);
        });
    }

    function popAddComment(event): void {
        setShowCreateCommentPost(true);
    }

    function popEditComment(commentData): void {
        setCommentToEdit(commentData);
        setShowCreateCommentPost(true);
    }

    function popEditPost(event): void {
        setShowEditPost(true);
    }

    function disappearCommentForm() :void {
        setShowCreateCommentPost(false);
        setShowEditPost(false);
    }

    function reloadComments() :void {
        getPostById(post.id, 'getcomments/').then(posts => {
            setComments(posts.postsFound);
        }).catch(error => {
            console.log(error);
        });
    }

    function goToArticle(event): void {
        if (!history)
            return;
        if (event.target.id === 'sub-link') {
            history.push('/f/'+subTitle);
        } else {
            //history.push('/f/'+this.props.subTitle+'/s/'+this.props.postData.id);
        }
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
                        <CreateCommentPost postId={post.id} closeBehavior={disappearCommentForm} postedBehavior={reloadComments}
                                           originalCom={commentToEdit}/>
                    </div>
                </CSSTransition>
                <CSSTransition in={showEditPost} timeout={600} classNames="from-bottom" unmountOnExit
                               onEnter={() => setShowEditPost(true)}
                               onExited={() => setShowEditPost(false)}
                               nodeRef={nodeRef}>
                    <div ref={nodeRef}>
                        <CreateOCPost originalPost={post} closeBehavior={disappearCommentForm} routerHistory={history}/>
                    </div>
                </CSSTransition>
                <section className="postOC-container">
                    <div className="postOC-banner-container">
                        <div className="postOC-avatar">
                        </div>
                        <div className="postOC-meta-data" onClick={goToArticle}>
                            <h3 id='sub-link'>f/{subTitle}</h3>
                            <span>{authorName}<div>.</div>14h</span>
                        </div>
                    </div>
                    <article className="postOC-content">
                        <h2>{post.title}</h2>
                        <p>{post.text}</p>
                    </article>
                    <div className="postOC-stats">
                        <span>
                            <button className={'btn-vote'} onClick={() => sendVote(1)}>
                                <div className="overlay"/>
                                <img src={window.location.origin + '/images/iconarrowup.png'} alt="Upvote" title="Upvote button"/>
                            </button>
                            {votes}
                            <button className={'btn-vote'} onClick={() => sendVote(-1)}>
                                <div className="overlay"/>
                                <img src={window.location.origin + '/images/iconarrowdown.png'} alt="Downvote" title="Downvote button"/>
                            </button>
                        </span>
                        <span>
                            {canEdit &&
                            <button id={'edit-btn'} onClick={popEditPost}>Changer</button>/*TODO: Change for icon btn*/}
                            <button onClick={popAddComment}>Commenter</button>
                        </span>
                    </div>
                </section>
                <section className="comments-container">
                    <h3>Commentaires : </h3>
                    {comments && <CommentSection comments={comments} popEditComment={popEditComment}/>}
                    {!comments && <span>Aucun commentaire</span>}
                </section>
            </div>}
        </div>
    );
}

export default PostPage;
