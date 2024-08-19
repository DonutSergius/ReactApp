import React from 'react';
import Service from "../../services/Service";
import ArticleSlider from "../../components/Article/ArticleSlider";

class TutorialDesign extends React.Component {
    processData = (response) => {
        const responseImageUrls = response.map(item => Service.getImage(item.field_image_1));

        return response.map((item, index) => ({
            articleImages: responseImageUrls[index],
            articleDate: item.field_date,
            articleTitle: item.title_1,
            articleLink: item.view_node,
        }));
    }

    render() {
        const blockTitle = "Tutorial design";

        return (
            <ArticleSlider
                fetchData={Service.getTutorialDesign}
                processData={this.processData}
                blockTitle={blockTitle}
                containerClass="tutorial-design-container"
                titleClass="tutorial-design-title"
                sliderClass="tutorial-design-slider-container row g-0"
            />
        );
    }
}

export default TutorialDesign;
