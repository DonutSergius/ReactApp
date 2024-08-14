import React from "react";
import Service from "../services/Service";
import Article from "../components/Article";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class TutorialDesign extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
           designArticle: [],
        };
    }

    async componentDidMount() {
        const response = await Service.getTutorialDesign();
        const responseImageUrls = await Promise.all(response.map(item => Service.getImage(item.field_image_1)));
        this.setState({
            designArticle: response.map((item, index) => ({
                articleImages: responseImageUrls[index],
                articleDate: item.field_date,
                articleTitle: item.title_1,
                articleLink: item.view_node,
            })),
        });
    }

    render () {
        const { designArticle } = this.state;
        const blockTitle = "Tutorial design";

        const settings = {
            dots: false,
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
            <div className="tutorial-design-container">
                <div className="tutorial-design-title"> { blockTitle } </div>
                <div className="tutorial-design-slider-container row g-0">
                    <Slider {...settings}>
                        {designArticle.map((article, index) => (
                            <div key={index}>
                                <Article
                                    articleLink={article.articleLink}
                                    imageUrl={article.articleImages}
                                    imageAlt="Tutorial Design slide"
                                    articleDate={article.articleDate}
                                    articleTitle={article.articleTitle}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default TutorialDesign;