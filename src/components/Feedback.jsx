import React from "react";

class Feedback extends React.Component {
    render() {
        const {
            imageUrl,
            imageAlt,
            feedbackRemember,
            feedbackBody,
        } = this.props;
        return (
            <div className="feedback-conatiner">
                <div className="feedback row">
                    <div className={`feedback-image`}>
                        <img loading="lazy" width="36" height="36" src={imageUrl} alt={imageAlt}/>
                    </div>
                    <div className={`feedback-data`}>
                        <div className="feedback-data_body">{feedbackBody}</div>
                        <div className="feedback-data_remember">{feedbackRemember}</div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Feedback;