import React from "react";
import PropTypes from "prop-types";

/**
 * A functional component that displays a static block with a title, image, body text, and a link.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.blockTitle - The title of the block.
 * @param {string} props.blockImageUrl - The URL of the block image.
 * @param {string} props.blockImageAlt - The alt text for the image.
 * @param {string} props.blockBody - The body text of the block.
 * @param {string} props.blockLink - The text for the "Read More" link.
 * @param {string} props.blockLinkUrl - The URL for the "Read More" link.
 * @returns {JSX.Element} The rendered component.
 */
const StaticBlock = React.memo(({
                                    blockTitle,
                                    blockImageUrl,
                                    blockImageAlt,
                                    blockBody,
                                    blockLink,
                                    blockLinkUrl,
                                }) => (
    <div className="static-block-container row">
        <div className="static-block-data col-lg-6 col-md-12">
            <h2 className="static-block-data_title">
                {blockTitle}
            </h2>
            <div className="static-block-data_body">
                {blockBody}
            </div>
            <div className="static-block-data_read-more">
                <a
                    className="read-more"
                    href={blockLinkUrl}
                >
                    {blockLink}
                </a>
            </div>
        </div>
        <div className="static-block-image col-lg-6 col-md-12">
            <img
                loading="lazy"
                width="680"
                height="927"
                src={blockImageUrl}
                alt={blockImageAlt}
            />
        </div>
    </div>
));

// PropTypes validation
StaticBlock.propTypes = {
    blockTitle: PropTypes.string.isRequired,
    blockImageUrl: PropTypes.string.isRequired,
    blockImageAlt: PropTypes.string.isRequired,
    blockBody: PropTypes.string.isRequired,
    blockLink: PropTypes.string.isRequired,
    blockLinkUrl: PropTypes.string.isRequired,
};

export default StaticBlock;
