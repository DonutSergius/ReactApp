import React from "react";
import Service from "../../services/Service";
import {stripHtmlTags} from "../../utils/dataProcessor";
import StaticBlock from "../../components/StaticBlock";

class GridInDesign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staticBlock: [],
            staticBlockBody: '',
            staticBlockImageUrl: '',
        }
    }

    async componentDidMount() {
        const blockData = await Service.getBlogStaticBlock();
        const blockDataBody = stripHtmlTags(blockData.body.processed);
        const blockDataImageUrl = await Service.getImage(blockData.field_image.uri.url);
        this.setState({
            staticBlock: {
                blockTitle: blockData.field_title,
                blockImageUrl: blockDataImageUrl,
                blockImageAlt: blockData.field_image.meta.alt,
                blockBody: blockDataBody,
                blockLink: blockData.field_link.title,
                blockLinkUrl: blockData.field_link.uri
            }
        });
    }


    render () {
        const { staticBlock } = this.state
        return (
            <StaticBlock
                blockTitle={staticBlock.blockTitle}
                blockImageUrl={staticBlock.blockImageUrl}
                blockBody={staticBlock.blockBody}
                blockLink={staticBlock.blockLink}
                blockLinkUrl={staticBlock.blockLinkUrl}
                blockImageAlt={staticBlock.blockImageAlt}
            />
        );
    }
}

export default GridInDesign;