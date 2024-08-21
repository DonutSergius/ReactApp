import React from 'react';
import ArtikelLainnya from "./ArtikelLainnya";
import Arsip from "./Arsip";
import Service from "../../services/Service";
import Testimonial from "./Testimonial";

/**
 * Class component BlockWithSidebar that renders a layout with a sidebar.
 *
 * @extends React.Component
 */
class BlockWithSidebar extends React.Component {
    /**
     * Initializes the component and sets the initial state.
     *
     * @param {Object} props - The component's props.
     */
    constructor(props) {
        super(props);
        this.state = {
            sidebarImage: '',
        }
    }

    /**
     * Called immediately after the component is mounted.
     * Fetches the sidebar image data and updates the component state.
     */
    async componentDidMount() {
        const response = await Service.getSidebarImage();
        this.setState( {
                sidebarImage: Service.getImage(response.field_image.uri.url),
        })
    }

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered component.
     */
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