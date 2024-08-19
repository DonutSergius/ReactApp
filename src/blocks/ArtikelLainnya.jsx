import React from 'react';
import Article from "../components/Article/Article";
import Service from "../services/Service";
import { stripHtmlTags, extractHref } from "../utils/dataProcessor";

class ArtikelLainnya extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }

    async componentDidMount() {
        const response = await Service.getLatestArticles();
        const responseImageUrls = await Promise.all(response.map(item => Service.getImage(item.field_image_1)));
        const responseBody = response.map(item => stripHtmlTags(item.body));
        const responseTitles = response.map(item => ({
            title: stripHtmlTags(item.title_1),
            link: extractHref(item.title_1)
        }));

        const trimmedResponse = response.slice(1, -1);

        const articles = trimmedResponse.map((item, index) => ({
            articleImages: responseImageUrls[index + 1],
            articleDate: item.field_date,
            articleTitle: responseTitles[index + 1].title,
            articleLink: responseTitles[index + 1].link,
            articleBody: responseBody[index + 1],
        }));

        this.setState({ articles });
    }

    render() {
        const { articles } = this.state;
        const blockTitle = "Artikel lainnya";

        return (
            <div className="artikel-lainnya-container row">
                <div className="artikel-terbaru-title"> {blockTitle} </div>
                <div className="artikel-lainnya-articles">
                    {articles.map((article, index) => (
                        <Article
                            key={index}
                            articleLink={article.articleLink}
                            imageUrl={article.articleImages}
                            imageAlt="image"
                            articleDate={article.articleDate}
                            articleTitle={article.articleTitle}
                            articleBody={article.articleBody}
                            articleImageClass="col-lg-5 col-4"
                            articleDataClass="col-lg-7 col-8"
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default ArtikelLainnya;