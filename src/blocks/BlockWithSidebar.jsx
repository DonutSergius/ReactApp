import React from 'react';
import ArtikelLainnya from "./ArtikelLainnya";

class BlockWithSidebar extends React.Component {
    render () {
        return (
            <div className="block-width-sidebar-container row">
                <div className="left-container col-lg-8">
                    <ArtikelLainnya />
                </div>
                <div className="right-container col-lg-4">

                </div>
            </div>
        );
    }
}

export default BlockWithSidebar;