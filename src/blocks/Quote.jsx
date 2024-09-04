import React, {useState, useEffect} from "react";
import Service from "../services/Service";

/**
 * Functional component Quote that fetches and displays a quote of the day.
 *
 * @returns {JSX.Element} - The rendered component with the current quote and author, and a button to fetch a new quote.
 */
const Quote = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    /**
     * Fetches a new quote of the day from the service and updates the state.
     *
     * @async
     */
    const fetchQuote = async () => {
        try {
            const response = await Service.getQoutesOfTheDay();
            const quoteData = response.data[0];
            setQuote(quoteData.quote);
            setAuthor(quoteData.author);
        } catch (error) {
            console.error("Error fetching quote:", error);
        }
    };

    /**
     * Called immediately after the component is mounted.
     * Fetches the initial quote of the day.
     */
    useEffect(() => {
        fetchQuote();
    }, []);

    /**
     * Handles the click event to fetch and display a new quote.
     */
    const handleUpdateQuote = () => {
        fetchQuote();
    };

    return (
        <div className="quote-container whitearea">
            <div className="quote-element">
                <h2 className="quote-title">Quote of the Day</h2>
                {quote ? (
                    <>
                        <p className="quote-body">" {quote} "</p>
                        <p className="quote-author">{author}</p>
                    </>
                ) : (
                    <p className="quote-body">No quotes available at the moment.</p>
                )}
                <button className="quote-button" onClick={handleUpdateQuote}>Get Another Quote</button>
            </div>
        </div>
    );
};

export default Quote;
