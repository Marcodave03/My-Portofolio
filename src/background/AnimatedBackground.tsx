import React from 'react';
import './BubbleBackground.css'; // Import the CSS file for styles

const BubbleBackground = () => {
    return (
        <div className="fixed z-0 w-full h-full overflow-hidden bg-gradient-to-t from-gray-200 to-white">
            {/* Bubbles */}
            <div className="bubbles">
                {Array.from({ length: 100 }).map((_, index) => ( // Increased from 70 to 100
                    <div key={index} className="bubble"></div>
                ))}
            </div>

            {/* Circles */}
            <ul className="circles">
                {Array.from({ length: 30 }).map((_, index) => (
                    <li key={index} className={`circle-${index + 1}`}></li>
                ))}
            </ul>
        </div>
    );
};

export default BubbleBackground;
