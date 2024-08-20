import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Service from "../../services/Service";

function MenuLinksWrapper(props) {
    const location = useLocation();
    return <MenuLinks {...props} currentPath={location.pathname}/>;
}

class MenuLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuLinks: [],
        }
    }

    async componentDidMount() {
        const menuLinks = await Service.getMenuLink();
        this.setState({
            menuLinks: menuLinks.data,
        });
    }

    getPath(link) {
        if (link.title === "Lain nya") {
            return "/lain_nya";
        } else {
            return link.link.uri.replace('internal:', '');
        }
    }

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

    render() {
        const {menuLinks} = this.state;
        const {children, isBurgerOpen} = this.props;
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