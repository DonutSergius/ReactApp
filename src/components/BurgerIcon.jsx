import React from "react";

const BurgerIcon = ({ onClick, isOpen }) => (
    <div className={`burger-icon ${isOpen ? 'open' : ''}`} onClick={onClick}>
        <span></span>
        <span></span>
        <span></span>
    </div>
);

export default BurgerIcon;