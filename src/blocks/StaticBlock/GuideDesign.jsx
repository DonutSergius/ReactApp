import React, { useState, useEffect } from "react";
import Service from "../../services/Service";
import { stripHtmlTags } from "../../utils/dataProcessor";
import StaticBlock from "../../components/StaticBlock";

/**
 * Functional component GridInDesign that renders a static block with data fetched from the API.
 *
 * @returns {JSX.Element} - The rendered component with StaticBlock.
 */
const GridInDesign = () => {
    const [staticBlock, setStaticBlock] = useState({
        blockTitle: '',
        blockImageUrl: '',
        blockImageAlt: '',
        blockBody: '',
        blockLink: '',
        blockLinkUrl: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const blockData = await Service.getSecondStaticBlock();
            const blockDataBody = stripHtmlTags(blockData.body.processed);
            const blockDataImageUrl = await Service.getImage(blockData.field_image.uri.url);
            setStaticBlock({
                blockTitle: blockData.field_title,
                blockImageUrl: blockDataImageUrl,
                blockImageAlt: blockData.field_image.meta.alt,
                blockBody: blockDataBody,
                blockLink: blockData.field_link.title,
                blockLinkUrl: blockData.field_link.uri
            });
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

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
};

export default GridInDesign;
