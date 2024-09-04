import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import Service from "../../services/Service";

/**
 * Wrapper component for BurgerMenu that provides the current location path from react-router.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} - The rendered BurgerMenu component with the current path.
 */
function BurgerMenuWrapper(props) {
    const location = useLocation();
    return <BurgerMenu {...props} currentPath={location.pathname}/>;
}

function BurgerMenu({currentPath, isBurgerOpen}) {
    const [socialLinks, setSocialLinks] = useState([]);
    const [menuLinks, setMenuLinks] = useState([]);

    /**
     * Fetches social and menu links when the component mounts.
     */
    useEffect(() => {
        async function fetchLinks() {
            const socialLinksResponse = await Service.getSocialLink();
            const menuLinksResponse = await Service.getMenuLink();
            setSocialLinks(socialLinksResponse.data.field_social_links);
            setMenuLinks(menuLinksResponse.data);
        }

        fetchLinks();
    }, []);

    /**
     * Determines the path for a link based on its title or URI.
     *
     * @param {Object} link - The link object.
     * @returns {string} - The determined path.
     */
    const getPath = (link) => {
        if (link.title === "Lain nya") {
            return "/lain_nya";
        } else {
            return link.link.uri.replace('internal:', '');
        }
    };

    /**
     * Renders a menu link as either an internal Link or an external anchor tag.
     *
     * @param {Object} link - The link object.
     * @param {number} index - The index of the link in the array.
     * @returns {JSX.Element} - The rendered menu link.
     */
    const renderMenuLink = (link, index) => {
        const path = getPath(link);
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
    };

    return (
        <div className={`header-burger-menu ${isBurgerOpen ? 'open' : ''}`}>
            <div className="burger-menu-links">
                {menuLinks.map((link, index) => renderMenuLink(link, index))}
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

export default BurgerMenuWrapper;
