import React from 'react';
import "./_closebtn.scss";

export default class CloseBtn extends React.Component {

    closeBehavior: () => void;

    render() {
        return (
            <div className="closebtn-container" onClick={this.props.closeBehavior}>
                <div id="closebtn">
                    <div className="closebtnbar">
                        <div className="closebtnbar2"/>
                    </div>
                </div>
            </div>
        );
    }
}
