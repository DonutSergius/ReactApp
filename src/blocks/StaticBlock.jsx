import React from "react";

class StaticBlock extends React.Component {

    render () {
        const {
            blockTitle,
            blockImageUrl,
            blockImageAlt,
            blockBody,
            blockLink,
            blockLinkUrl,
        } = this.props;

        return (
            <div className="static-block-container row dark">
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
                    <img src={blockImageUrl} alt={blockImageAlt}/>
                </div>
            </div>
        );
    }
}

export default StaticBlock;