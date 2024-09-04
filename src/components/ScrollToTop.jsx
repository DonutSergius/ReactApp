import React, {useState, useEffect} from 'react';

/**
 * A component that shows a "Back to Top" button when the user scrolls down.
 * Clicking the button smoothly scrolls the page back to the top.
 *
 * @returns {JSX.Element} The rendered component.
 */
const ScrollToTopDiv = () => {
    // State to control the visibility of the scroll-to-top button
    const [isVisible, setIsVisible] = useState(false);

    // Function to toggle the visibility of the button based on scroll position
    const toggleVisibility = () => {
        if (window.pageYOffset > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Function to scroll to the top of the page smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Effect to add and remove scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        isVisible && (
            <div onClick={scrollToTop} className="scroll_button">
                Back to Top ↑
            </div>
        )
    );
};

export default ScrollToTopDiv;
