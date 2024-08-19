
export const stripHtmlTags = (text) => text.replace(/<\/?[^>]+>/gi, '');

export const extractHref = (htmlString) => {
    const match = htmlString.match(/href="([^"]*)"/);
    return match ? match[1] : null;
};
