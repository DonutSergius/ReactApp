import React from "react";

/**
 * Functional component that renders a burger icon for a navigation menu.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - Function to call when the icon is clicked.
 * @param {boolean} props.isOpen - Boolean indicating if the menu is open.
 *
 * @returns {JSX.Element} - The rendered burger icon.
 */
const BurgerIcon = ({onClick, isOpen}) => (
    <div data-testid="burger-icon" className={`burger-icon ${isOpen ? 'open' : ''}`} onClick={onClick}>
        <span></span>
        <span></span>
        <span></span>
    </div>
);

export default BurgerIcon;
