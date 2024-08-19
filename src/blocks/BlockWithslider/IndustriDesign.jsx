import React from 'react';
import Service from "../../services/Service";
import ArticleSlider from "../../components/Article/ArticleSlider";
import { stripHtmlTags, extractHref } from "../../utils/dataProcessor"

class IndustriDesign extends React.Component {
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

    render() {
        const blockTitle = "Industri design";

        return (
            <ArticleSlider
                fetchData={Service.getLatestArticles}
                processData={this.processData}
                blockTitle={blockTitle}
                containerClass="industri-design-container"
                titleClass="industri-design-title"
                sliderClass="industri-design-slider-container row g-0"
            />
        );
    }
}

export default IndustriDesign;
