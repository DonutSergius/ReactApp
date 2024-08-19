import React, { useState, useEffect } from 'react';

const ScrollToTopDiv = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
