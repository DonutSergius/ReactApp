import React from "react";
import PropTypes from 'prop-types';

/**
 * Functional component Feedback that displays user feedback with an image.
 *
 * @param {Object} props - The component props.
 * @param {string} props.imageUrl - URL of the feedback image.
 * @param {string} props.imageAlt - Alt text for the feedback image.
 * @param {string} props.feedbackRemember - Text to display as "remember".
 * @param {string} props.feedbackBody - Main body text of the feedback.
 * @returns {JSX.Element} - The rendered feedback component.
 */
const Feedback = React.memo(({imageUrl, imageAlt, feedbackRemember, feedbackBody}) => {
    return (
        <div className="feedback-conatiner">
            <div className="feedback row">
                <div className="feedback-image">
                    <img
                        loading="lazy"
                        width="36"
                        height="36"
                        src={imageUrl}
                        alt={imageAlt}
                    />
                </div>
                <div className="feedback-data">
                    <div className="feedback-data_body">{feedbackBody}</div>
                    <div className="feedback-data_remember">{feedbackRemember}</div>
                </div>
            </div>
        </div>
    );
});

Feedback.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    feedbackRemember: PropTypes.string.isRequired,
    feedbackBody: PropTypes.string.isRequired,
};

export default Feedback;
