import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Article from "./Article";

/**
 * Functional component ArticleSlider that renders a slider of articles.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} - The rendered article slider component.
 */
const ArticleSlider = React.memo(({
                                      fetchData,
                                      processData,
                                      blockTitle,
                                      containerClass,
                                      titleClass,
                                      sliderClass
                                  }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetch and process data when the component mounts
        const fetchArticles = async () => {
            const response = await fetchData();
            const processedArticles = processData(response);
            setArticles(processedArticles);
        };

        fetchArticles();
    }, [fetchData, processData]); // Dependencies ensure the effect runs when these props change

    // Slider settings
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className={containerClass}>
            <div className={titleClass}> {blockTitle} </div>
            <div className={sliderClass}>
                <Slider {...settings}>
                    {articles.map((article, index) => (
                        <div key={index}>
                            <Article
                                articleLink={article.articleLink}
                                imageUrl={article.articleImages}
                                imageAlt="slide"
                                articleDate={article.articleDate}
                                articleTitle={article.articleTitle}
                                articleBody={article.articleBody}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
});

ArticleSlider.propTypes = {
    fetchData: PropTypes.func.isRequired,
    processData: PropTypes.func.isRequired,
    blockTitle: PropTypes.string.isRequired,
    containerClass: PropTypes.string,
    titleClass: PropTypes.string,
    sliderClass: PropTypes.string,
};

ArticleSlider.defaultProps = {
    containerClass: '',
    titleClass: '',
    sliderClass: '',
};

export default ArticleSlider;