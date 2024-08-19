import React from "react";

class Article extends React.Component {
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
                {articleLink ? (
                    <a href={articleLink}>
                        <div className="article row">
                            {imageUrl && (
                                <div className={`article-image ${articleImageClass}`}>
                                    <img src={imageUrl} alt={imageAlt} />
                                </div>
                            )}
                            <div className={`article-data ${articleDataClass}`}>
                                <div className="article-data_date">{articleDate}</div>
                                <div className="article-data_title">{articleTitle}</div>
                                <div className="article-data_body">{articleBody}</div>
                            </div>
                        </div>
                    </a>
                ) : (
                    <div className="article row">
                        {imageUrl && (
                            <div className={`article-image ${articleImageClass}`}>
                                <img src={imageUrl} alt={imageAlt} />
                            </div>
                        )}
                        <div className={`article-data ${articleDataClass}`}>
                            <div className="article-data_date">{articleDate}</div>
                            <div className="article-data_title">{articleTitle}</div>
                            <div className="article-data_body">{articleBody}</div>
                        </div>
                    </div>
                )}
            </div>
        );

    }
}

export default Article;