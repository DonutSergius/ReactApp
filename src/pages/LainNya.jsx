import React from 'react';
import Header from "../components/Header";
import FeatureArticle from "../blocks/FeatureArticle";
import TutorialDesign from "../blocks/BlockWithslider/TutorialDesign";
import ScrollToTop from "../components/ScrollToTop";


class LianNya extends React.Component{
    render () {
        const title = "Lain Nya"

        return (
            <div className="lain_nya-container">
                <div className="dark">
                    <Header />
                    <h1 className="lain_nya-page-title title">{title}</h1>
                    <FeatureArticle />
                </div>
                <div className="whitearea">
                    <TutorialDesign />
                </div>
                <ScrollToTop />
            </div>
        );
    }
}

export default LianNya;