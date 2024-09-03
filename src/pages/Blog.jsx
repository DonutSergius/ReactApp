import React from 'react';
import Service from "../services/Service";
import ScrollToTop from "../components/ScrollToTop";
import {stripHtmlTags} from "../utils/dataProcessor";
import FeatureArticle from "../blocks/FeatureArticle";
import TutorialDesign from "../blocks/BlockWithslider/TutorialDesign";
import PilihanEditor from '../blocks/BlockWithslider/PilihanEditor';
import ArtikelTerbaru from '../blocks/ArtikelTerbaru';
import IndustriDesign from "../blocks/BlockWithslider/IndustriDesign";
import BlockWithSidebar from "../blocks/BlockSidebar/BlockWithSidebar";
import GridInDesign from "../blocks/StaticBlock/GridInDesign";
import GuideDesign from "../blocks/StaticBlock/GuideDesign";

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        };
    }

    /**
     * Lifecycle method to fetch data after the component mounts.
     * Sets the title state with the processed title from the service.
     */
    async componentDidMount() {
        const rawHtml = await Service.getTitleLogo();
        const title = stripHtmlTags(rawHtml);
        this.setState({
            title: title,
        });
    }

    /**
     * Renders the component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        const {title} = this.state;
        return (
            <div className="blog-container">
                <div className="blog-feature-articles-container dark">
                    <h1 className="blog-page-title title">{title}</h1>
                    <FeatureArticle/>
                </div>
                <div className="blog-tutorial-design-container whitearea">
                    <TutorialDesign/>
                </div>
                <div className="blog-grid-in-design-container dark">
                    <GridInDesign/>
                </div>
                <div className="blog-pilihan-editor-container whitearea">
                    <PilihanEditor/>
                </div>
                <div className="blog-guide-design-container yellow">
                    <GuideDesign/>
                </div>
                <div className="blog-artikel-terbaru-container whitearea">
                    <ArtikelTerbaru/>
                </div>
                <div className="blog-industri-design-container dark">
                    <IndustriDesign/>
                </div>
                <div className="blog-block-with-sidebar-container whitearea">
                    <BlockWithSidebar/>
                </div>
                <ScrollToTop/>
            </div>
        );
    }
}

export default Blog;
