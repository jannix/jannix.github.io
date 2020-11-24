import React, {useState} from 'react';
import './_home-page.scss';
import Header from "../common/Header.component";
import {CSSTransition} from "react-transition-group";
import CreationSettings from "../settings/CreationSettings.component";


function HomePage() {
    const nodeRef = React.useRef(null);

    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showCreateSub, setShowCreateSub] = useState(false);
    const [showCreateTopic, setShowCreateTopic] = useState(false);

    function appearCreateMenu(appear: boolean) {
        setShowCreateMenu(appear);
        setShowCreateSub(false);
        setShowCreateTopic(false);
    }

    function appearCreateSub() {
        setShowCreateMenu(false);
        setShowCreateSub(true);
    }

    function appearCreateTopic() {
        setShowCreateMenu(false);
        setShowCreateTopic(true);
    }

    return (
        <div className="home-page-container">
            <Header showCreateMenu={appearCreateMenu} isShowCreateMenu={showCreateMenu}/>

            <CSSTransition in={showCreateMenu} timeout={300} classNames="from-bottom" unmountOnExit
                           onEnter={() => setShowCreateMenu(true)}
                           onExited={() => setShowCreateMenu(false)}
                           nodeRef={nodeRef}>
                <div ref={nodeRef}>
                    <CreationSettings showCreateTopic={appearCreateTopic} showCreateSub={appearCreateSub}/>
                </div>
            </CSSTransition>
            <CSSTransition in={showCreateSub} timeout={300} classNames="from-bottom" unmountOnExit
                           onEnter={() => setShowCreateSub(true)}
                           onExited={() => setShowCreateSub(false)}
                           nodeRef={nodeRef}>
                <div ref={nodeRef}>
                    <p>CREATE SUB</p>
                </div>
            </CSSTransition>
            <CSSTransition in={showCreateTopic} timeout={300} classNames="from-bottom" unmountOnExit
                           onEnter={() => setShowCreateTopic(true)}
                           onExited={() => setShowCreateTopic(false)}
                           nodeRef={nodeRef}>
                <div ref={nodeRef}>
                    <p>CREATE TOPIC</p>
                </div>
            </CSSTransition>
        </div>
    );
}

export default HomePage;
