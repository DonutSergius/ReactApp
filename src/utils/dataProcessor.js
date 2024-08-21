/**
 * Removes HTML tags from a given text.
 * @param {string} text - The text from which HTML tags should be removed.
 * @returns {string} The text with HTML tags removed.
 */
export const stripHtmlTags = (text) => text.replace(/<\/?[^>]+>/gi, '');

/**
 * Extracts the value of the href attribute from an HTML string.
 * @param {string} htmlString - The HTML string containing the href attribute.
 * @returns {string|null} The value of the href attribute or null if not found.
 */
export const extractHref = (htmlString) => {
    const match = htmlString.match(/href="([^"]*)"/);
    return match ? match[1] : null;
};
