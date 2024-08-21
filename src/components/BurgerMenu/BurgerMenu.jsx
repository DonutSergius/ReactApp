import React from "react";
import Service from "../../services/Service";
import { Link, useLocation } from "react-router-dom";

/**
 * Wrapper component for BurgerMenu that provides the current location path from react-router.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} - The rendered BurgerMenu component with the current path.
 */
function BurgerMenuWrapper(props) {
    const location = useLocation();
    return <BurgerMenu {...props} currentPath={location.pathname} />;
}

class BurgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialLinks: [],
            menuLinks: [],
        };
    }

    /**
     * Fetches social and menu links when the component mounts.
     */
    async componentDidMount() {
        const socialLinks = await Service.getSocialLink();
        const menuLinks = await Service.getMenuLink();
        this.setState({
            socialLinks: socialLinks.data.field_social_links,
            menuLinks: menuLinks.data,
        });
    }

    /**
     * Renders a menu link as either an internal Link or an external anchor tag.
     *
     * @param {Object} link - The link object.
     * @param {number} index - The index of the link in the array.
     * @returns {JSX.Element} - The rendered menu link.
     */
    renderMenuLink(link, index) {
        const path = this.getPath(link);
        const { currentPath } = this.props;
        const isActive = currentPath === path;
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

    /**
     * Determines the path for a link based on its title or URI.
     *
     * @param {Object} link - The link object.
     * @returns {string} - The determined path.
     */
    getPath(link) {
        if (link.title === "Lain nya") {
            return "/lain_nya";
        } else {
            return link.link.uri.replace('internal:', '');
        }
    }

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered article component.
     */
    render() {
        const { menuLinks, socialLinks } = this.state;
        const { isBurgerOpen } = this.props;

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
