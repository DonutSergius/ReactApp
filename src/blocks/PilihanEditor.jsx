import React from 'react';
import Article from "../components/Article";
import Service from "../services/Service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class PilihanEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }

    async componentDidMount () {
        const response = await Service.getPilihanEditor();
        const responseImageUrls = await Promise.all(response.map(item => Service.getImage(item.field_image_1)));
        const responseBody = await Promise.all(response.map(item => this.stripHtmlTags(item.body)));
        const responseTitles = response.map(item => {
            const href = this.extractHref(item.title_1);
            return {
                title: this.stripHtmlTags(item.title_1),
                link: href
            };
        });

        this.setState({
            articles: response.map((item, index) => ({
                articleImages: responseImageUrls[index],
                articleDate: item.field_date,
                articleTitle: responseTitles[index].title,
                articleLink: responseTitles[index].link,
                articleBody: responseBody[index],
            })),
        });
    }

    stripHtmlTags(text) {
        return text.replace(/<\/?[^>]+>/gi, '');
    }

    extractHref(htmlString) {
        const match = htmlString.match(/href="([^"]*)"/);
        return match ? match[1] : null;
    }

    render () {
        const { articles } = this.state;
        const blockTitle = "Pilihan editor";

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
            <div className="pilihan-editor-container">
                <div className="pilihan-editor-title"> { blockTitle } </div>
                <div className="pilihan-editor-slider-container row g-0">
                    <Slider {...settings}>
                        {articles.slice(1, -1).map((article, index) => (
                            <div key={index}>
                                <Article
                                    articleLink={article.articleLink}
                                    imageUrl={article.articleImages}
                                    imageAlt="pilihan editor slide"
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

export default PilihanEditor;