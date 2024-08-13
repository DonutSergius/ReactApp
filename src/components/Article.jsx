import React from "react";

class Article extends React.Component {
    render () {
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
            <div className="feature-article-conatiner">
                <a href={articleLink}>
                    <div className="feature-article row">
                        <div className={`article-image ${articleImageClass}`}>
                            <img src={imageUrl} alt={imageAlt}/>
                        </div>
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