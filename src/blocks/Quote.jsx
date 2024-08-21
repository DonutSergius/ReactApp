import React from "react";
import Service from "../services/Service";

class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
            author: ''
        };
    }

    componentDidMount() {
        this.fetchQuote();
    }

    fetchQuote = async () => {
        const response = await Service.getQoutesOfTheDay();
        const quoteData = response.data[0];
        this.setState({
            quote: quoteData.quote,
            author: quoteData.author
        });
    };

    handleUpdateQuote = () => {
        this.fetchQuote();
    };

    render() {
        return (
            <div className="quote-container whitearea">
                <div className="quote-element">
                    <h2 className="quote-title">Quote of the Day</h2>
                    {this.state.quote ? (
                        <>
                            <p className="quote-body">" {this.state.quote} "</p>
                            <p className="quote-author">{this.state.author}</p>
                        </>
                    ) : (
                        <p className="quote-body">No quotes available at the moment.</p>
                    )}
                    <button className="quote-button" onClick={this.handleUpdateQuote}>Get Another Quote</button>
                </div>
            </div>
        );
    }
}

export default Quote;