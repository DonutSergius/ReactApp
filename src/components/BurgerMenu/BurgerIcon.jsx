import React from "react";

const BurgerIcon = ({ onClick, isOpen }) => (
    <div data-testid="burger-icon" className={`burger-icon ${isOpen ? 'open' : ''}`} onClick={onClick}>
        <span></span>
        <span></span>
        <span></span>
    </div>
);

export default BurgerIcon;