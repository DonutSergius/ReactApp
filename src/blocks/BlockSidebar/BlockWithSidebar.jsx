import React, {useState, useEffect} from 'react';
import Service from "../../services/Service";
import ArtikelLainnya from "./ArtikelLainnya";
import Arsip from "./Arsip";
import Testimonial from "./Testimonial";

/**
 * Functional component BlockWithSidebar that renders a layout with a sidebar.
 *
 * @returns {JSX.Element} - The rendered component.
 */
const BlockWithSidebar = () => {
    const [sidebarImage, setSidebarImage] = useState('');

    useEffect(() => {
        const fetchSidebarImage = async () => {
            const response = await Service.getSidebarImage();
            setSidebarImage(Service.getImage(response.field_image.uri.url));
        };

        fetchSidebarImage();
    }, []);

    return (
        <div className="block-width-sidebar-container row">
            <div className="left-container col-lg-8">
                <ArtikelLainnya/>
            </div>
            <div className="right-container col-lg-4">
                <Arsip/>
                <img
                    loading="lazy"
                    width="680"
                    height="900"
                    src={sidebarImage}
                    alt="sidebar_image"
                />
                <Testimonial/>
            </div>
        </div>
    );
};

export default BlockWithSidebar;
