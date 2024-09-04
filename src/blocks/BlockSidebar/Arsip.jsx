import React, { useState, useEffect } from 'react';
import Article from "../../components/Article/Article";
import Service from "../../services/Service";
import { stripHtmlTags, extractHref } from "../../utils/dataProcessor";

/**
 * Functional component Arsip that displays a list of archived articles.
 *
 * @returns {JSX.Element} - The rendered component.
 */
const Arsip = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArchives = async () => {
            const response = await Service.getArchives();
            const responseTitles = response.map(item => ({
                title: stripHtmlTags(item.title_1),
                link: extractHref(item.title_1)
            }));

            const trimmedResponse = response.slice(1);

            const articlesData = trimmedResponse.map((item, index) => ({
                articleDate: item.field_date,
                articleTitle: responseTitles[index + 1].title,
                articleLink: responseTitles[index + 1].link,
            }));

            setArticles(articlesData);
        };

        fetchArchives();
    }, []);

    const blockTitle = "Arsip 2021";

    return (
        <div className="arsip-container row">
            <div className="arsip-title">{blockTitle}</div>
            <div className="arsip-articles">
                {articles.map((article, index) => (
                    <Article
                        key={index}
                        articleLink={article.articleLink}
                        articleDate={article.articleDate}
                        articleTitle={article.articleTitle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Arsip;
