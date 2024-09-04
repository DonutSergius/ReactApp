import React, { useEffect, useState } from "react";
import Service from "../../services/Service";

const SocialLinks = ({ isBurgerOpen }) => {
    const [socialLinks, setSocialLinks] = useState([]);
    const [socialImages, setSocialImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const socialLinksResponse = await Service.getSocialLink();
                const socialLinksData = socialLinksResponse.data.field_social_links;

                const socialImagesData = await Promise.all(
                    socialLinksData.map(async (item) => {
                        const url = await Service.getImage(item.field_icon_svg.uri.url);
                        return {
                            ...item,
                            imageUrl: url,
                        };
                    })
                );

                setSocialLinks(socialLinksData);
                setSocialImages(socialImagesData);
            } catch (error) {
                console.error("Error fetching social links and images:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

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
                        <img
                            loading="lazy"
                            width="22"
                            height="22"
                            src={link.imageUrl}
                            alt={link.field_icon_svg.meta.alt}
                        />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialLinks;
