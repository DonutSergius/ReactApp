import React from "react";
import SocialLinks from "./Links/SocialLinks";
import { Link } from 'react-router-dom';
import MenuLinks from "./Links/MenuLinks";
import BurgerIcon from "./BurgerMenu/BurgerIcon";
import Service from "../services/Service";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoImage: null, // URL of the logo image
            altText: '', // Alt text for the logo image
            isBurgerOpen: false, // State to control the visibility of the burger menu
        }
    }

    async componentDidMount() {
        // Fetch logo data and image URL after the component mounts
        const logoData = await Service.getLogo();
        const logoImageUrl = Service.getImage(logoData.data.field_image.uri.url);
        this.setState({
            logoImage: logoImageUrl,
            altText: logoData.data.field_image.meta.alt,
        });
    }

    toggleBurger = () => {
        // Toggle the state of the burger menu and log the state
        this.setState(prevState => {
            const newState = { isBurgerOpen: !prevState.isBurgerOpen };
            console.log('Header isBurgerOpen:', newState.isBurgerOpen);
            return newState;
        });
    }

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered article component.
     */
    render() {
        const { logoImage, altText, isBurgerOpen } = this.state;
        return (
            <header className="header-container row">
                <div className="header-menu_container col-lg-9 col-md-6 col-6">
                    <MenuLinks isBurgerOpen={isBurgerOpen}>
                        <Link to="/blog" className="link-to-home">
                            <img loading="lazy" width="40" height="40" src={logoImage} alt={altText} className="logo"/>
                        </Link>
                    </MenuLinks>
                </div>
                <BurgerIcon onClick={this.toggleBurger} isOpen={isBurgerOpen} />
                <div className="header-social_container col-lg-3 col-md-6 col-6">
                    <SocialLinks isBurgerOpen={isBurgerOpen}/>
                </div>
                <BurgerMenu isBurgerOpen={isBurgerOpen}/>
            </header>
        );
    }
}

export default Header;
