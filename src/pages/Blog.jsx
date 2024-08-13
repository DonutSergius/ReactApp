import React from 'react';
import Service from "../services/Service";
import Header from "../components/Header";
import FeatureArticle from "../blocks/FeatureArticle";

class Blog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        };
    }

    async componentDidMount() {
        const rawHtml = await Service.getTitleLogo(); // Отримання асинхронних даних
        const title = this.stripHtmlTags(rawHtml);
        this.setState({ title });
    }

    stripHtmlTags(text) {
        return text.replace(/<\/?[^>]+>/gi, '');
    }

    render () {
        const { title } = this.state;
        return (
            <div className="blog-container dark">
                <Header />
                <h1 className="blog-page-title title">{title}</h1>
                <FeatureArticle />
            </div>
        );
    }
}

export default Blog;