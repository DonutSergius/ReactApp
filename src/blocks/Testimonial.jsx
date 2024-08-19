import React from 'react';
import Article from "../components/Article/Article";
import Service from "../services/Service";
import { stripHtmlTags } from "../utils/dataProcessor";

class Testimonial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }

    async componentDidMount() {
        const response = await Service.getTestimonials();
        const responseTitles = response.map(item => ({
            body: stripHtmlTags(item.body),
            imageUrl: Service.getImage(item.field_image_1),
        }));
        const trimmedResponse = response.slice(1);

        const articles = trimmedResponse.map((item, index) => ({
            articleTitle: `@${item.field_remember}`,
            articleBody: responseTitles[index + 1].body,
            articleImageUrl: responseTitles[index + 1].imageUrl,
        }));

        this.setState({ articles });
    }

    render() {
        const { articles } = this.state;
        const blockTitle = "Testimonial";

        return (
            <div className="testimonial-container row">
                <div className="testimonial-title"> {blockTitle} </div>
                <div className="testimonial-articles">
                    {articles.slice().reverse().map((article, index) => (
                        <Article
                            key={index}
                            imageUrl={article.articleImageUrl}
                            imageAlt="testimonial_image"
                            articleTitle={article.articleTitle}
                            articleBody={article.articleBody}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Testimonial;