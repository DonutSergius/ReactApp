import React from "react";
import Service from "../../services/Service";
import {Link, useLocation} from "react-router-dom";

function BurgerMenuWrapper(props) {
    const location = useLocation();
    return <BurgerMenu {...props} currentPath={location.pathname}/>;
}

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

    renderMenuLink(link, index) {
        const path = this.getPath(link);
        const { currentPath } = this.props;
        const isActive = currentPath === path;

        console.log(`path => ${path}`);
        console.log(`currentPath => ${currentPath}`);


        const menuClassName = `menu-link menu-link-${link.title} ${isActive ? 'active' : ''}`;
        const isExternal = link.link.uri.startsWith('http');

        if (isExternal) {
            return (
                <a
                    href={link.link.uri}
                    className={menuClassName}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {link.title}
                </a>
            );
        } else {
            return (
                <Link to={path} className={menuClassName} key={index}>
                    {link.title}
                </Link>
            );
        }
    }

    getPath(link) {
        if (link.title === "Lain nya") {
            return "/lain_nya";
        } else {
            return link.link.uri.replace('internal:', '');
        }
    }

    render () {
        const {menuLinks, socialLinks} = this.state
        const {isBurgerOpen} = this.props;

        return (
            <div className={`header-burger-menu ${isBurgerOpen ? 'open' : ''}`}>
                <div className="burger-menu-links">
                    {menuLinks.map((link, index) => this.renderMenuLink(link, index))}
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

export default BurgerMenuWrapper;