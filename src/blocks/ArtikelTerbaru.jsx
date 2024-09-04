import React, {useState, useEffect} from 'react';
import Article from "../components/Article/Article";
import Service from "../services/Service";
import {stripHtmlTags, extractHref} from "../utils/dataProcessor";

/**
 * Functional component ArtikelTerbaru that renders a list of the latest articles.
 *
 * @returns {JSX.Element} - The rendered component with a list of articles.
 */
const ArtikelTerbaru = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
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

            setArticles(response.map((item, index) => ({
                articleImages: responseImageUrls[index],
                articleDate: item.field_date,
                articleTitle: responseTitles[index].title,
                articleLink: responseTitles[index].link,
                articleBody: responseBody[index],
            })));
        };

        fetchArticles();
    }, []);

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
};

export default ArtikelTerbaru;
