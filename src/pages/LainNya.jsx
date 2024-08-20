import React from 'react';
import Header from "../components/Header";
import FeatureArticle from "../blocks/FeatureArticle";
import TutorialDesign from "../blocks/BlockWithslider/TutorialDesign";
import ScrollToTop from "../components/ScrollToTop";
import PilihanEditor from "../blocks/BlockWithslider/PilihanEditor";
import ArtikelTerbaru from "../blocks/ArtikelTerbaru";
import IndustriDesign from "../blocks/BlockWithslider/IndustriDesign";
import BlockWithSidebar from "../blocks/BlockSidebar/BlockWithSidebar";
import GridInDesign from "../blocks/GridInDesign";
import GuideDesign from "../blocks/GuideDesign";

class LianNya extends React.Component{
    render () {
        const title = "Lain Nya"

        return (
            <div className="lain_nya-container">
                <div className="dark">
                    <Header/>
                    <h1 className="lain_nya-page-title title">{title}</h1>
                    <FeatureArticle/>
                </div>
                <div className="whitearea">
                    <TutorialDesign/>
                </div>
                <div className='dark'>
                    <GridInDesign/>
                </div>
                <div className="whitearea">
                    <PilihanEditor/>
                </div>
                <div className='yellow'>
                    <GuideDesign/>
                </div>
                <div className="whitearea">
                    <ArtikelTerbaru/>
                </div>
                <div className="dark">
                    <IndustriDesign/>
                </div>
                <div className="whitearea">
                    <BlockWithSidebar/>
                </div>
                <ScrollToTop/>
            </div>
        );
    }
}

export default LianNya;