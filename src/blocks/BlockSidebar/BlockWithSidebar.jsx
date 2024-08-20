import React from 'react';
import ArtikelLainnya from "./ArtikelLainnya";
import Arsip from "./Arsip";
import Service from "../../services/Service";
import Testimonial from "./Testimonial";

class BlockWithSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarImage: '',
        }
    }

    async componentDidMount() {
        const response = await Service.getSidebarImage();
        this.setState( {
                sidebarImage: Service.getImage(response.field_image.uri.url),
        })
    }

    render () {
        const { sidebarImage } = this.state;

        return (
            <div className="block-width-sidebar-container row">
                <div className="left-container col-lg-8">
                    <ArtikelLainnya />
                </div>
                <div className="right-container col-lg-4">
                    <Arsip />
                    <img loading="lazy" width="680" height="900" src={sidebarImage} alt="sidebar_image"/>
                    <Testimonial />

                </div>
            </div>
        );
    }
}

export default BlockWithSidebar;