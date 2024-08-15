import React from 'react';
import Service from "../services/Service";
import Header from "../components/Header";
import FeatureArticle from "../blocks/FeatureArticle";
import TutorialDesign from "../blocks/TutorialDesign";
import StaticBlock from "../blocks/StaticBlock";
import PilihanEditor from '../blocks/PilihanEditor';

class Blog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            blogStaticBlock: [],
            blogStaticBlockBody: '',
            blogStaticBlockImageUrl: '',
        };
    }

    async componentDidMount() {
        const rawHtml = await Service.getTitleLogo();
        const title = this.stripHtmlTags(rawHtml);

        const blockData = await Service.getBlogStaticBlock();
        const blockDataBody = this.stripHtmlTags(blockData.body.processed);
        const blockDataImageUrl = await Service.getImage(blockData.field_image.uri.url);
        this.setState({
            title: title,
            blogStaticBlock: blockData,
            blogStaticBlockBody: blockDataBody,
            blogStaticBlockImageUrl: blockDataImageUrl,
        });
    }

    stripHtmlTags(text) {
        return text.replace(/<\/?[^>]+>/gi, '');
    }

    render () {
        const { title,
            blogStaticBlock,
            blogStaticBlockBody,
            blogStaticBlockImageUrl,
        } = this.state;
        return (
            <div className="blog-container">
                <div className="dark">
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
            </div>
        );
    }
}

export default Blog;