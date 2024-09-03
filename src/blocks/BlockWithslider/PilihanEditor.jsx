import React from 'react';
import Service from "../../services/Service";
import ArticleSlider from "../../components/Article/ArticleSlider";
import {stripHtmlTags, extractHref} from "../../utils/dataProcessor";

/**
 * Class component PilihanEditor that renders a slider with editor's choice articles.
 *
 * @extends React.Component
 */
class PilihanEditor extends React.Component {
    /**
     * Processes the API response data to format it for the slider.
     *
     * @param {Array} response - The data received from the API.
     * @returns {Array} - The processed data for each article.
     */
    processData = (response) => {
        const responseImageUrls = response.map(item => Service.getImage(item.field_image_1));
        const responseBody = response.map(item => stripHtmlTags(item.body));
        const responseTitles = response.map(item => ({
            title: stripHtmlTags(item.title_1),
            link: extractHref(item.title_1)
        }));

        const trimmedResponse = response.slice(1, -1);

        return trimmedResponse.map((item, index) => ({
            articleImages: responseImageUrls[index + 1],
            articleDate: item.field_date,
            articleTitle: responseTitles[index + 1].title,
            articleLink: responseTitles[index + 1].link,
            articleBody: responseBody[index + 1],
        }));
    }

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered component with ArticleSlider.
     */
    render() {
        const blockTitle = "Pilihan editor";

        return (
            <ArticleSlider
                fetchData={Service.getPilihanEditor}
                processData={this.processData}
                blockTitle={blockTitle}
                containerClass="pilihan-editor-container"
                titleClass="pilihan-editor-title"
                sliderClass="pilihan-editor-slider-container row g-0"
            />
        );
    }
}

export default PilihanEditor;
