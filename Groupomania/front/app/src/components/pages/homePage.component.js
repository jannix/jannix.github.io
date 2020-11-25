import React, {useState} from 'react';
import './_home-page.scss';
import Header from "../common/Header.component";
import {CSSTransition} from "react-transition-group";
import CreationSettings from "../settings/CreationSettings.component";


function HomePage() {
    const nodeRef = React.useRef(null);
    const nodeRef2 = React.useRef(null);

    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showCreateSub, setShowCreateSub] = useState(false);
    const [showCreateTopic, setShowCreateTopic] = useState(false);

    function appearCreateMenu(appear: boolean) {
        setShowCreateMenu(appear);
        setShowCreateSub(false);
        setShowCreateTopic(false);
    }

    function disappearAllMenu() {
        setShowCreateMenu(false);
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

            <CSSTransition in={showCreateMenu} timeout={300} classNames="from-left" unmountOnExit
                           onEnter={() => setShowCreateMenu(true)}
                           onExited={() => setShowCreateMenu(false)}
                           nodeRef={nodeRef}>
                <div ref={nodeRef}>
                    <CreationSettings showCreateTopic={appearCreateTopic} showCreateSub={appearCreateSub} closeBehavior={disappearAllMenu}/>
                </div>
            </CSSTransition>
            <CSSTransition in={showCreateSub} timeout={300} classNames="from-bottom" unmountOnExit
                           onEnter={() => setShowCreateSub(true)}
                           onExited={() => setShowCreateSub(false)}
                           nodeRef={nodeRef2}>
                <div ref={nodeRef2}>
                    <p>CREATE SUB</p>
                </div>
            </CSSTransition>
            <CSSTransition in={showCreateTopic} timeout={300} classNames="from-bottom" unmountOnExit
                           onEnter={() => setShowCreateTopic(true)}
                           onExited={() => setShowCreateTopic(false)}
                           nodeRef={nodeRef2}>
                <div ref={nodeRef2}>
                    <p>CREATE TOPIC</p>
                </div>
            </CSSTransition>

            <p>

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem ex, interdum in malesuada vel, eleifend ac velit. Morbi pretium, dolor eu porta vehicula, nisi purus tempus libero, id accumsan mi eros et enim. Suspendisse potenti. Curabitur vitae vulputate eros, sit amet ullamcorper erat. Fusce eleifend iaculis magna non venenatis. Nulla facilisi. Aliquam ultrices rutrum turpis at rhoncus. Curabitur iaculis mi dui, sed ornare odio lobortis eget. Ut non elit diam. Quisque lacinia massa lacus, quis consequat nisi feugiat vitae. Nullam porttitor ipsum sed nisi sagittis finibus. Donec id augue nec ante congue aliquet tincidunt sit amet lectus. Duis a ipsum vitae sem molestie dignissim sit amet vel orci. Integer luctus velit efficitur faucibus commodo. Proin odio lorem, luctus in tincidunt sed, sagittis sit amet est.

                Sed accumsan tortor laoreet gravida posuere. Aenean convallis nisi a tincidunt blandit. Phasellus nunc massa, tincidunt vitae urna nec, rutrum faucibus est. Pellentesque pulvinar sollicitudin odio eget rhoncus. Suspendisse a odio tincidunt, fermentum eros eu, molestie risus. Integer convallis, sapien varius ornare efficitur, magna elit lobortis sem, eu ullamcorper urna lacus id eros. Integer a urna ante. In aliquet nunc orci, a fermentum arcu ornare hendrerit.

                Sed gravida, est in accumsan vulputate, nunc neque tincidunt eros, id auctor velit dolor at dolor. Suspendisse eleifend ultrices est, eu ornare lectus tincidunt vitae. Aliquam tempus vestibulum justo nec posuere. Curabitur dolor mauris, semper non sollicitudin ac, convallis et tellus. Nam vehicula nibh eget consectetur blandit. In vitae urna eu justo pulvinar dapibus a sit amet erat. Aliquam viverra varius semper. Suspendisse consequat ante odio, in laoreet elit interdum in. Pellentesque quis arcu in risus porta lacinia non vitae neque.

                Morbi at dui imperdiet, finibus nisi sit amet, mollis leo. Etiam hendrerit gravida pellentesque. Curabitur dapibus lectus ante, non imperdiet nibh tempor a. Aenean tempor at ipsum non interdum. Duis vel turpis ante. Nullam eros mi, interdum ac dignissim ut, faucibus eu ante. Nullam facilisis nisi eget dapibus fringilla. Sed et nulla et risus elementum rhoncus. Nullam tristique porttitor tempus. Morbi eleifend volutpat dolor non lacinia. Donec ut justo vel nisl euismod ultrices eget in lacus. Quisque ultricies purus lorem, in pulvinar lacus tempus eget. Mauris mi felis, maximus sit amet orci at, cursus venenatis lacus. Nam efficitur ornare commodo. Pellentesque auctor cursus erat, nec tincidunt tellus vehicula eu.

                Ut molestie molestie libero, ac lacinia turpis feugiat vel. Duis non ligula ac dolor consequat fringilla. Ut id nulla felis. Mauris ullamcorper cursus risus eu commodo. Nulla facilisi. Duis maximus, eros sit amet accumsan aliquet, dolor mauris venenatis risus, in porta erat ipsum ut diam. Nunc consectetur justo nec lacus condimentum iaculis. Pellentesque nec orci et lectus malesuada rutrum ac sed tortor. Etiam pretium molestie lacus non bibendum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
        </div>
    );
}

export default HomePage;
