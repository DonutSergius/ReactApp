import React from 'react';
import ScrollToTop from "../components/ScrollToTop";
import Quote from "../blocks/Quote";

/**
 * Functional component LianNya that displays the Lain Nya page with a quote.
 *
 * @returns {JSX.Element} - The rendered component for the Lain Nya page.
 */
const LianNya = () => {
    const title = "Lain Nya";

    return (
        <div className="lain_nya-container">
            <div className="dark">
                <h1 className="lain_nya-page-title title">{title}</h1>
            </div>
            <Quote/>
            <ScrollToTop/>
        </div>
    );
};

export default LianNya;
