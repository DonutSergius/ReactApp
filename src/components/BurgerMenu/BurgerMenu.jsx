import React from "react";
import Service from "../../services/Service";

class BurgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialLinks: [],
            menuLinks: [],
        }
    }

    async componentDidMount() {
        const socialLinks = await Service.getSocialLink();
        const menuLinks = await Service.getMenuLink();
        this.setState({
            socialLinks: socialLinks.data.field_social_links,
            menuLinks: menuLinks.data,
        });
    }
    render () {
        const {menuLinks, socialLinks} = this.state
        const {isBurgerOpen} = this.props;
// <div className={`${isBurgerOpen ? 'header-burger-menu-open' : 'header-burger-menu'}`}>
        return (
            <div className={`header-burger-menu ${isBurgerOpen ? 'open' : ''}`}>
                <div className="burger-menu-links">
                    {menuLinks.map((link, index) => {
                        const menuClassName = link.title === "Blog"
                            ? `menu-link active menu-link-${link.title}`
                            : `menu-link menu-link-${link.title}`;
                        return (
                            <a href={link.link.uri} className={menuClassName} key={index}>{link.title}</a>
                        );
                    })}
                    {socialLinks.map((link, index) => {
                        const socialClassName = `social-link social-link-${link.field_icon_svg.meta.alt}`;
                        return (
                            <a
                                key={index}
                                href={link.field_link.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialClassName}
                            >
                                {link.field_icon_svg.meta.alt}
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default BurgerMenu;