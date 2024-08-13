import React from "react";
import Service from "../../services/Service";

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

    componentDidUpdate(prevProps) {
        if (prevProps.isBurgerOpen !== this.props.isBurgerOpen) {
            console.log('MenuLinks isBurgerOpen updated:', this.props.isBurgerOpen);
            // Виконати дії при зміні стану
        }
    }

    render() {
        const { menuLinks } = this.state
        const { children, isBurgerOpen } = this.props;
        return (
            <div className="header-menu_links">
                {children}
                <div className={`menu-links ${isBurgerOpen ? 'open' : ''}`}>
                    {menuLinks.map((link, index) => {
                        const menuClassName = link.title === "Blog"
                            ? `menu-link active menu-link-${link.title}`
                            : `menu-link menu-link-${link.title}`;
                        return (
                            <a href={link.link.uri} className={menuClassName} key={index}>{link.title}</a>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MenuLinks;