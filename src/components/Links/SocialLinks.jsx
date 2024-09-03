import React from "react";
import Service from "../../services/Service";

class SocialLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialLinks: [],
            socialImages: [],
        };
    }

    /**
     * Fetches social links and images when the component mounts.
     */
    async componentDidMount() {
        const socialLinks = await Service.getSocialLink();
        const socialImages = await Promise.all(
            socialLinks.data.field_social_links.map(async (item) => {
                const url = await Service.getImage(item.field_icon_svg.uri.url);
                return {
                    ...item,
                    imageUrl: url,
                };
            })
        );
        this.setState({
            socialLinks: socialLinks.data.field_social_links,
            socialImages: socialImages,
        });
    }

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered article component.
     */
    render() {
        const {socialImages} = this.state;
        const {isBurgerOpen} = this.props;
        return (
            <div className={`header-social_links ${isBurgerOpen ? 'open' : ''}`}>
                {socialImages.map((link, index) => {
                    const socialClassName = `social-link social-link-${link.field_icon_svg.meta.alt}`;
                    return (
                        <a
                            key={index}
                            href={link.field_link.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={socialClassName}
                        >
                            <img loading="lazy" width="22" height="22" src={link.imageUrl}
                                 alt={link.field_icon_svg.meta.alt}/>
                        </a>
                    );
                })}
            </div>
        );
    }
}

export default SocialLinks;
