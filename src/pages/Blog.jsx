import React from 'react';
import Service from "../services/Service";
import Header from "../components/Header";
import FeatureArticle from "../blocks/FeatureArticle";
import TutorialDesign from "../blocks/BlockWithslider/TutorialDesign";
import StaticBlock from "../blocks/StaticBlock";
import PilihanEditor from '../blocks/BlockWithslider/PilihanEditor';
import ArtikelTerbaru from '../blocks/ArtikelTerbaru';
import ScrollToTop from "../components/ScrollToTop";
import IndustriDesign from "../blocks/BlockWithslider/IndustriDesign";
import { stripHtmlTags } from "../utils/dataProcessor";
import BlockWithSidebar from "../blocks/BlockSidebar/BlockWithSidebar";


class Blog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            blogStaticBlock: [],
            blogStaticBlockBody: '',
            blogStaticBlockImageUrl: '',
            secondblogStaticBlock: [],
            secondblogStaticBlockBody: '',
            secondblogStaticBlockImageUrl: '',
        };
    }

    async componentDidMount() {
        const rawHtml = await Service.getTitleLogo();
        const title = stripHtmlTags(rawHtml);

        const blockData = await Service.getBlogStaticBlock();
        const blockDataBody = stripHtmlTags(blockData.body.processed);
        const blockDataImageUrl = await Service.getImage(blockData.field_image.uri.url);
        const secondblockData = await Service.getSecondStaticBlock();
        const secondblockDataBody = stripHtmlTags(secondblockData.body.processed);
        const secondblockDataImageUrl = await Service.getImage(secondblockData.field_image.uri.url);
        this.setState({
            title: title,
            blogStaticBlock: blockData,
            blogStaticBlockBody: blockDataBody,
            blogStaticBlockImageUrl: blockDataImageUrl,
            secondblogStaticBlock: secondblockData,
            secondblogStaticBlockBody: secondblockDataBody,
            secondblogStaticBlockImageUrl: secondblockDataImageUrl,
        });
    }

    render () {
        const { title,
            blogStaticBlock,
            blogStaticBlockBody,
            blogStaticBlockImageUrl,
            secondblogStaticBlock,
            secondblogStaticBlockBody,
            secondblogStaticBlockImageUrl,
        } = this.state;
        return (
            <div className="blog-container">
                <div className=" dark">
                    <Header />
                    <h1 className="blog-page-title title">{title}</h1>
                    <FeatureArticle />
                </div>
                <div className="whitearea">
                    <TutorialDesign />
                </div>
                <div className='dark'>
                    {blogStaticBlock && (
                        <StaticBlock
                            blockTitle={blogStaticBlock.field_title}
                            blockImageUrl={blogStaticBlockImageUrl}
                            blockImageAlt={blogStaticBlock.field_image && blogStaticBlock.field_image.meta ? blogStaticBlock.field_image.meta.alt : ''}
                            blockBody={blogStaticBlockBody}
                            blockLink={blogStaticBlock.field_link && blogStaticBlock.field_link.title}
                            blockLinkUrl={blogStaticBlock.field_link && blogStaticBlock.field_link.uri}
                        />
                    )}
                </div>
                <div className="whitearea">
                    <PilihanEditor />
                </div>
                <div className='yellow'>
                    {secondblogStaticBlock && (
                        <StaticBlock
                            blockTitle={secondblogStaticBlock.field_title}
                            blockImageUrl={secondblogStaticBlockImageUrl}
                            blockImageAlt={secondblogStaticBlock.field_image && secondblogStaticBlock.field_image.meta ? secondblogStaticBlock.field_image.meta.alt : ''}
                            blockBody={secondblogStaticBlockBody}
                            blockLink={secondblogStaticBlock.field_link && secondblogStaticBlock.field_link.title}
                            blockLinkUrl={secondblogStaticBlock.field_link && secondblogStaticBlock.field_link.uri}
                        />
                    )}
                </div>
                <div className="whitearea">
                    <ArtikelTerbaru />
                </div>
                <div className="dark">
                    <IndustriDesign />
                </div>
                <div className="whitearea">
                    <BlockWithSidebar />
                </div>
                <ScrollToTop />
            </div>
        );
    }
}

export default Blog;