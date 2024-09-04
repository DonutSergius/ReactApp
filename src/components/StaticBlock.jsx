import React from "react";
import PropTypes from "prop-types";

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
