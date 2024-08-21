import React from 'react';
import Service from "../../services/Service";
import ArticleSlider from "../../components/Article/ArticleSlider";

/**
 * Class component TutorialDesign that renders a slider with tutorial design articles.
 *
 * @extends React.Component
 */
class TutorialDesign extends React.Component {
    /**
     * Processes the API response data to format it for the slider.
     *
     * @param {Array} response - The data received from the API.
     * @returns {Array} - The processed data for each article.
     */
    processData = (response) => {
        const responseImageUrls = response.map(item => Service.getImage(item.field_image_1));

        return response.map((item, index) => ({
            articleImages: responseImageUrls[index],
            articleDate: item.field_date,
            articleTitle: item.title_1,
            articleLink: item.view_node,
        }));
    }

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered component with ArticleSlider.
     */
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
