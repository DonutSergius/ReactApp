import React from "react";
import Service from "../../services/Service";

class SocialLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialLinks: [],
            socialImages: [],
        }
    }
    async componentDidMount() {
        const socialLinks = await Service.getSocialLink();
        const socialImages = await Promise.all(
            socialLinks.data.field_social_links.map(async (item) => {
                const url = Service.getImage(item.field_icon_svg);
                return {
                    ...item,
                    imageUrl: url,
                };
            })
        )
        this.setState({
            socialLinks: socialLinks.data.field_social_links,
            socialImages: socialImages,
        });
    }

    render() {
        const { socialImages } = this.state;
        return (
            <div className="header-social_links col-lg-3 col-md-6 col-6">
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
                            <img src={link.imageUrl} alt={link.field_icon_svg.meta.alt}/>
                        </a>
                    );
                })}
            </div>
        )
    }
}

export default SocialLinks;