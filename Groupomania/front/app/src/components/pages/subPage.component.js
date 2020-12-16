import React, {useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import './_sub-page.scss';
import Header from "../common/Header.component";
import {CSSTransition} from "react-transition-group";
import CreationSettings from "../settings/CreationSettings.component";
import CreateSub from "../forms/CreateSub.component";
import CreateOCPost from "../forms/CreateOCPost.component";


function SubPage(props) {
    let history = useHistory();
    const nodeRef = React.useRef(null);
    const nodeRef2 = React.useRef(null);

    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showCreateSub, setShowCreateSub] = useState(false);
    const [showCreateOCPost, setShowCreateOCPost] = useState(false);

    let { subName } = useParams();

    function appearCreateMenu(appear: boolean) {
        console.log(subName);
        setShowCreateMenu(appear);
        setShowCreateSub(false);
        setShowCreateOCPost(false);
    }

    function disappearAllMenu() {
        setShowCreateMenu(false);
        setShowCreateSub(false);
        setShowCreateOCPost(false);
    }

    function appearCreateSub() {
        setShowCreateMenu(false);
        setShowCreateSub(true);
    }

    function appearCreateOCPost() {
        setShowCreateMenu(false);
        setShowCreateOCPost(true);
    }

    return (
        <div className="sub-page-container">
            <Header showCreateMenu={appearCreateMenu} isShowCreateMenu={showCreateMenu} routerHistory={history}/>

            <CSSTransition in={showCreateMenu} timeout={600} classNames="from-left" unmountOnExit
                           onEnter={() => setShowCreateMenu(true)}
                           onExited={() => setShowCreateMenu(false)}
                           nodeRef={nodeRef}>
                <div ref={nodeRef}>
                    <CreationSettings showCreateOCPost={appearCreateOCPost} showCreateSub={appearCreateSub} closeBehavior={disappearAllMenu}/>
                </div>
            </CSSTransition>
            <CSSTransition in={showCreateSub} timeout={600} classNames="from-bottom" unmountOnExit
                           onEnter={() => setShowCreateSub(true)}
                           onExited={() => setShowCreateSub(false)}
                           nodeRef={nodeRef2}>
                <div ref={nodeRef2}>
                    <CreateSub closeBehavior={disappearAllMenu}/>
                </div>
            </CSSTransition>
            <CSSTransition in={showCreateOCPost} timeout={600} classNames="from-bottom" unmountOnExit
                           onEnter={() => setShowCreateOCPost(true)}
                           onExited={() => setShowCreateOCPost(false)}
                           nodeRef={nodeRef2}>
                <div ref={nodeRef2}>
                    <CreateOCPost closeBehavior={disappearAllMenu}/>
                </div>
            </CSSTransition>
            {/*TODO: main display should be a view component*/}
            <p>PAGE { subName }</p>
        </div>
    );
}

export default SubPage;
