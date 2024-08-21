import React from "react";

/**
 * Class component Article that renders an article with an image, title, date, and body.
 *
 * @extends React.Component
 */
class Article extends React.Component {
    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered article component.
     */
    render() {
        const {
            articleLink,
            imageUrl,
            imageAlt,
            articleDate,
            articleTitle,
            articleBody,
            articleImageClass,
            articleDataClass,
        } = this.props;
        return (
            <div className="article-conatiner">
                <a href={articleLink}>
                    <div className="article row">
                        {imageUrl && (
                            <div className={`article-image ${articleImageClass}`}>
                                <img loading="lazy" width="980" height="600" src={imageUrl} alt={imageAlt}/>
                            </div>
                        )}
                        <div className={`article-data ${articleDataClass}`}>
                            <div className="article-data_date">{articleDate}</div>
                            <div className="article-data_title">{articleTitle}</div>
                            <div className="article-data_body">{articleBody}</div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

export default Article;
