import React from "react";
import PropTypes from 'prop-types';

/**
 * Functional component Article that renders an article with an image, title, date, and body.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} - The rendered article component.
 */
const Article = React.memo(({
                                articleLink,
                                imageUrl,
                                imageAlt,
                                articleDate,
                                articleTitle,
                                articleBody,
                                articleImageClass,
                                articleDataClass,
                            }) => {
    return (
        <div className="article-conatiner">
            <a href={articleLink}>
                <div className="article row">
                    {imageUrl && (
                        <div className={`article-image ${articleImageClass}`}>
                            <img
                                loading="lazy"
                                width="980"
                                height="600"
                                src={imageUrl}
                                alt={imageAlt}
                            />
                        </div>
                    )}
                    <div className={`article-data ${articleDataClass}`}>
                        <div className="article-data_date">{articleDate}</div>
                        <h2 className="article-data_title">{articleTitle}</h2>
                        <div className="article-data_body">{articleBody}</div>
                    </div>
                </div>
            </a>
        </div>
    );
});

Article.propTypes = {
    articleLink: PropTypes.string,
    imageUrl: PropTypes.string,
    imageAlt: PropTypes.string,
    articleDate: PropTypes.string.isRequired,
    articleTitle: PropTypes.string.isRequired,
    articleBody: PropTypes.string.isRequired,
    articleImageClass: PropTypes.string,
    articleDataClass: PropTypes.string,
};

Article.defaultProps = {
    articleLink: '#',
    imageUrl: '',
    imageAlt: 'Image',
    articleImageClass: '',
    articleDataClass: '',
};

export default Article;
