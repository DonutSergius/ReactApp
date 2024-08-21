import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Service from "../../services/Service";

/**
 * Wrapper component for MenuLinks that provides the current location path from react-router.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} - The rendered MenuLinks component with the current path.
 */
function MenuLinksWrapper(props) {
    const location = useLocation();
    return <MenuLinks {...props} currentPath={location.pathname} />;
}

class MenuLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuLinks: [],
        };
    }

    /**
     * Fetches menu links when the component mounts.
     */
    async componentDidMount() {
        const menuLinks = await Service.getMenuLink();
        this.setState({
            menuLinks: menuLinks.data,
        });
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
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered article component.
     */
    render() {
        const { menuLinks } = this.state;
        const { children, isBurgerOpen } = this.props;

        return (
            <div className="header-menu_links">
                {children}
                <div className={`menu-links ${isBurgerOpen ? 'open' : ''}`}>
                    {menuLinks.map((link, index) => this.renderMenuLink(link, index))}
                </div>
            </div>
        );
    }
}

export default MenuLinksWrapper;
