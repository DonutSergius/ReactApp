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

    render() {
        const { menuLinks } = this.state
        const { children } = this.props;
        return (
            <div className="header-menu_links col-lg-9 col-md-6 col-6">
                {children}
                {menuLinks.map((link, index) => {
                    const menuClassName = link.title === "Blog"
                        ? `menu-link active menu-link-${link.title}`
                        : `menu-link menu-link-${link.title}`;
                    return (
                        <a href={link.link.uri} className={menuClassName} >{link.title}</a>
                    );
                })}
            </div>
        );
    }
}

export default MenuLinks;