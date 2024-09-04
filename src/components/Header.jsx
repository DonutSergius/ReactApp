import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import Service from "../services/Service";
import MenuLinks from "./Links/MenuLinks";
import SocialLinks from "./Links/SocialLinks";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import BurgerIcon from "./BurgerMenu/BurgerIcon";

const Header = () => {
    const [logoImage, setLogoImage] = useState(null);
    const [altText, setAltText] = useState('');
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    const fetchLogo = useCallback(async () => {
        try {
            const logoData = await Service.getLogo();
            const logoImageUrl = await Service.getImage(logoData.data.field_image.uri.url);
            setLogoImage(logoImageUrl);
            setAltText(logoData.data.field_image.meta.alt);
        } catch (error) {
            console.error("Error fetching logo data:", error);
        }
    }, []);

    useEffect(() => {
        fetchLogo();
    }, [fetchLogo]);

    const toggleBurger = () => {
        setIsBurgerOpen(prevState => !prevState);
    };

    return (
        <header className="header-container row">
            <div className="header-menu_container col-lg-9 col-md-6 col-6">
                <MenuLinks isBurgerOpen={isBurgerOpen}>
                    <Link to="/blog" className="link-to-home">
                        <img
                            loading="lazy"
                            width="40"
                            height="40"
                            src={logoImage}
                            alt={altText}
                            className="logo"
                        />
                    </Link>
                </MenuLinks>
            </div>
            <BurgerIcon onClick={toggleBurger} isOpen={isBurgerOpen} />
            <div className="header-social_container col-lg-3 col-md-6 col-6">
                <SocialLinks isBurgerOpen={isBurgerOpen} />
            </div>
            <BurgerMenu isBurgerOpen={isBurgerOpen} />
        </header>
    );
};

export default React.memo(Header);
