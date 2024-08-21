import React from "react";

class StaticBlock extends React.Component {
    // Method to render the component
    render() {
        // Destructure props for easy access
        const {
            blockTitle,
            blockImageUrl,
            blockImageAlt,
            blockBody,
            blockLink,
            blockLinkUrl,
        } = this.props;

        return (
            <div className="static-block-container row">
                <div className="static-block-data col-lg-6 col-md-12">
                    <div className="static-block-data_title">
                        {blockTitle}
                    </div>
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
                    <img loading="lazy" width="680" height="927" src={blockImageUrl} alt={blockImageAlt}/>
                </div>
            </div>
        );
    }
}

export default StaticBlock;
