import React from 'react';
import Article from "../components/Article/Article";
import Service from "../services/Service";
import {stripHtmlTags, extractHref} from "../utils/dataProcessor";

/**
 * Class component ArtikelTerbaru that renders a list of the latest articles.
 *
 * @extends React.Component
 */
class ArtikelTerbaru extends React.Component {
    /**
     * Initializes the component's state.
     *
     * @param {Object} props - The component's props.
     */
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }

    /**
     * Fetches the latest articles data from the API and updates the component's state.
     *
     * @async
     */
    async componentDidMount() {
        const response = await Service.getLatestArticles();
        const responseImageUrls = await Promise.all(response.map(item => Service.getImage(item.field_image_1)));
        const responseBody = await Promise.all(response.map(item => stripHtmlTags(item.body)));
        const responseTitles = response.map(item => {
            const href = extractHref(item.title_1);
            return {
                title: stripHtmlTags(item.title_1),
                link: href
            };
        });

        this.setState({
            articles: response.map((item, index) => ({
                articleImages: responseImageUrls[index],
                articleDate: item.field_date,
                articleTitle: responseTitles[index].title,
                articleLink: responseTitles[index].link,
                articleBody: responseBody[index],
            })),
        });
    }

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered component with a list of articles.
     */
    render() {
        const {articles} = this.state;
        const blockTitle = "Artikel terbaru";

        return (
            <div className="artikel-terbaru-container">
                <div className="artikel-terbaru-title"> {blockTitle} </div>
                <div className="artikel-terbaru-articles row">
                    {articles.slice(1, 7).map((article, index) => (
                        <div key={index} className="articles-container col-md-6 col-lg-4 col-sm-6">
                            <Article
                                articleLink={article.articleLink}
                                imageUrl={article.articleImages}
                                imageAlt="artikel terbaru slide"
                                articleDate={article.articleDate}
                                articleTitle={article.articleTitle}
                                articleBody={article.articleBody}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ArtikelTerbaru;
