import React from "react";
import Article from "./Article";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * Class component ArticleSlider that renders a slider of articles.
 *
 * @extends React.Component
 */
class ArticleSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }

    /**
     * Called immediately after the component is mounted.
     * Fetches the article data and processes it for rendering.
     */
    async componentDidMount() {
        const { fetchData, processData } = this.props;
        const response = await fetchData();
        const articles = processData(response);

        this.setState({ articles });
    }

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered article slider component.
     */
    render() {
        const { articles } = this.state;
        const { blockTitle, containerClass, titleClass, sliderClass } = this.props;

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
                <div className={titleClass}> { blockTitle } </div>
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
    }
}

export default ArticleSlider;
