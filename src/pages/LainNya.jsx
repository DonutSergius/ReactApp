import React from 'react';
import ScrollToTop from "../components/ScrollToTop";
import Quote from "../blocks/Quote";

class LianNya extends React.Component{
    render () {
        const title = "Lain Nya"

        return (
            <div className="lain_nya-container">
                <div className="dark">
                    <h1 className="lain_nya-page-title title">{title}</h1>
                </div>
                <Quote />
                <ScrollToTop/>
            </div>
        );
    }
}

export default LianNya;