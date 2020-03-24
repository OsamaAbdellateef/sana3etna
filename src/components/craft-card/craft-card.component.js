import React from 'react';
import './craft-card.style.scss';

const CraftCard = ({ imageCraftURL , imagePersonalURL, dispalyName, address, phoneNumber }) => (
    <div className="craft-card">
        <div className="">
            <img src={`${imagePersonalURL}`} />
            <h3>{dispalyName}</h3>
            <h4>{phoneNumber}</h4>
            <h4>{address}</h4>
            loreewfdni
        </div>
    </div>
)

export default CraftCard;