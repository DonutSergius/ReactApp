import React from "react";
import Service from "../../services/Service";
import {stripHtmlTags} from "../../utils/dataProcessor";
import StaticBlock from "../../components/StaticBlock";

/**
 * Class component GridInDesign that renders a static block with data fetched from the API.
 *
 * @extends React.Component
 */
class GridInDesign extends React.Component {
    /**
     * Initializes the component's state.
     *
     * @param {Object} props - The component's props.
     */
    constructor(props) {
        super(props);
        this.state = {
            staticBlock: [],
        }
    }

    /**
     * Fetches data for the static block from the API and updates the component's state.
     *
     * @async
     */
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

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered component with StaticBlock.
     */
    render() {
        const {staticBlock} = this.state;
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
