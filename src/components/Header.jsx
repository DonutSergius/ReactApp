import React from "react";
import SocialLinks from "./Links/SocialLinks";
import MenuLinks from "./Links/MenuLinks";
import BurgerIcon from "./BurgerMenu/BurgerIcon";
import Service from "../services/Service";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoImage: null,
            altText: '',
            isBurgerOpen: false,
        }
    }
    async componentDidMount() {
        const logoData = await Service.getLogo();
        const logoImageUrl = Service.getImage(logoData.data.field_image.uri.url);
        this.setState({
            logoImage: logoImageUrl,
            altText: logoData.data.field_image.meta.alt,
        });
    }

    toggleBurger = () => {
        this.setState(prevState => {
            const newState = { isBurgerOpen: !prevState.isBurgerOpen };
            console.log('Header isBurgerOpen:', newState.isBurgerOpen);
            return newState;
        });
    }

    render() {
        const { logoImage, altText, isBurgerOpen } = this.state
        return (
            <header className="header-container row">
                <div className="header-menu_container col-lg-9 col-md-6 col-6">
                    <MenuLinks isBurgerOpen={isBurgerOpen}>
                        <img src={logoImage} alt={altText} className="logo"/>
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