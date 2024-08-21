import React from "react";
import Service from "../services/Service";

/**
 * Class component Quote that fetches and displays a quote of the day.
 *
 * @extends React.Component
 */
class Quote extends React.Component {
    /**
     * Initializes the component's state.
     *
     * @param {Object} props - The component's props.
     */
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
            author: ''
        };
    }

    /**
     * Called immediately after the component is mounted.
     * Fetches the initial quote of the day.
     */
    componentDidMount() {
        this.fetchQuote();
    }

    /**
     * Fetches a new quote of the day from the service and updates the component's state.
     *
     * @async
     */
    fetchQuote = async () => {
        const response = await Service.getQoutesOfTheDay();
        const quoteData = response.data[0];
        this.setState({
            quote: quoteData.quote,
            author: quoteData.author
        });
    };

    /**
     * Handles the click event to fetch and display a new quote.
     */
    handleUpdateQuote = () => {
        this.fetchQuote();
    };

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered component with the current quote and author, and a button to fetch a new quote.
     */
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
