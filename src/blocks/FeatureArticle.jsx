import React from "react";
import Article from "../components/Article/Article";
import Service from "../services/Service";
import { stripHtmlTags } from "../utils/dataProcessor";

class FeatureArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            importantArticle: [],
            otherArticles: [],
        };
    }

    async componentDidMount() {
        const responseImportant = await Service.getImportantTeaser();
        const responseOther = await Service.getOtherTeaser();

        const importantImageUrl = await Service.getImage(responseImportant.field_image_1);
        const otherImageUrls = await Promise.all(responseOther.map(item => Service.getImage(item.field_image_1)));

        const importantBody = stripHtmlTags(responseImportant.body);

        this.setState({
            importantArticle: {
                articleImages: importantImageUrl,
                articleDate: responseImportant.field_date,
                articleTitle: responseImportant.title_1,
                articleBody: importantBody,
                articleLink: responseImportant.view_node,
            },
            otherArticles: responseOther.map((item, index) => ({
                articleImages: otherImageUrls[index],
                articleDate: item.field_date,
                articleTitle: item.title_1,
                articleLink: item.view_node,
            })),
        });
    }

    render () {
        const { importantArticle, otherArticles } = this.state;
        return (
            <div className="feature-articles-container row">
                <div className="important_teaser col-lg-6 col-md-12">
                    <Article
                        articleLink={importantArticle.articleLink}
                        imageUrl={importantArticle.articleImages}
                        imageAlt="Important teaser image"
                        articleDate={importantArticle.articleDate}
                        articleTitle={importantArticle.articleTitle}
                        articleBody={importantArticle.articleBody}
                        articleImageClass="col-lg-12 col-md-6"
                    />
                </div>
                <div className="second_teaser col-lg-6 col-md-12">
                    {otherArticles.map((article, index) => (
                        <Article
                            key={index}
                            articleLink={article.articleLink}
                            imageUrl={article.articleImages}
                            imageAlt="Other teaser image"
                            articleDate={article.articleDate}
                            articleTitle={article.articleTitle}
                            articleImageClass="col-lg-5 col-md-3"
                            articleDataClass="col-lg-7 col-md-9 col-sm-7 col-7"
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default FeatureArticle;