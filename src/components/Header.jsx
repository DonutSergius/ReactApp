import React from "react";
import SocialLinks from "./Links/SocialLinks";
import MenuLinks from "./Links/MenuLinks";
import Service from "../services/Service";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoImage: null,
            altText: '',
        }
    }
    async componentDidMount() {
        const logoData = await Service.getLogo();
        const logoImageUrl = Service.getImage(logoData.data.field_image);
        this.setState({
            logoImage: logoImageUrl,
            altText: logoData.data.field_image.meta.alt,
        });
    }

    render() {
        const { logoImage, altText } = this.state
        return (
            <header className="header-container row">
                <MenuLinks><img src={logoImage} alt={altText} className="logo"/></MenuLinks>
                <SocialLinks/>
            </header>
        );
    }
}

export default Header;