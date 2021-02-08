import React from 'react';
import "./_close-btn.scss";

export default class CloseBtn extends React.Component {

    closeBehavior: () => void;

    render() {
        return (
            <div className="close-btn-container" onClick={this.props.closeBehavior}>
                <div id="close-btn">
                    <div className="close-btn-bar">
                        <div className="close-btn-bar2"/>
                    </div>
                </div>
            </div>
        );
    }
}
