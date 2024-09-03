import React from 'react';
import Article from "../../components/Article/Article";
import Service from "../../services/Service";
import {stripHtmlTags, extractHref} from "../../utils/dataProcessor";

/**
 * Class component Arsip that displays a list of archived articles.
 *
 * @extends React.Component
 */
class Arsip extends React.Component {

    /**
     * Initializes the component and sets the initial state.
     *
     * @param {Object} props - The component's props.
     */
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }

    /**
     * Called immediately after the component is mounted.
     * Fetches the archive data and updates the component state.
     */
    async componentDidMount() {
        const response = await Service.getArchives();
        const responseTitles = response.map(item => ({
            title: stripHtmlTags(item.title_1),
            link: extractHref(item.title_1)
        }));

        const trimmedResponse = response.slice(1);

        const articles = trimmedResponse.map((item, index) => ({
            articleDate: item.field_date,
            articleTitle: responseTitles[index + 1].title,
            articleLink: responseTitles[index + 1].link,
        }));

        this.setState({articles});
    }

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered component.
     */
    render() {
        const {articles} = this.state;
        const blockTitle = "Arsip 2021";

        return (
            <div className="arsip-container row">
                <div className="arsip-title"> {blockTitle} </div>
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
    }
}

export default Arsip;