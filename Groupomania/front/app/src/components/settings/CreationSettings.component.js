import React from 'react';
import "./_creation-settings.scss";
import CloseBtn from "../common/CloseBtn.component";

export default class CreationSettings extends React.Component {

    showCreateTopic: () => void;
    showCreateSub: () => void;
    closeBehavior: () => void;
    constructor(props) {
        super(props);
        this.clickOnNewSub = this.clickOnNewSub.bind(this);
        this.clickOnNewTopic = this.clickOnNewTopic.bind(this);
    }

    clickOnNewSub(event): void {
        if (this.props.showCreateSub) {
            this.props.showCreateSub();
        }
    }

    clickOnNewTopic(event): void {
        if (this.props.showCreateTopic) {
            this.props.showCreateTopic();
        }
    }

    render() {
        return (
            <div className="creation-settings-container">
                <section>
                    <CloseBtn closeBehavior={this.props.closeBehavior}/>
                    <div>
                        <img onClick={this.clickOnNewTopic} src={window.location.origin + '/images/topicicon.png'} alt="Topic Icon" title="Create New Topic"/>
                        <h4>Nouveau Sujet</h4>
                    </div>
                    <div>
                        <img onClick={this.clickOnNewSub} src={window.location.origin + '/images/subicon.png'} alt="Sub Icon" title="Create New Sub"/>
                        <h4>Nouveau Fil</h4>
                    </div>
                </section>
            </div>
        );
    }
}
