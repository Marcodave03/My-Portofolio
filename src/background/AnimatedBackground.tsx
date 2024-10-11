
import './BubbleBackground.css'; 

const BubbleBackground = () => {
    return (
        <div className="fixed z-0 w-full h-full overflow-hidden bg-gradient-to-t from-gray-200 to-white">
            <div className="bubbles">
                {Array.from({ length: 200 }).map((_, index) => ( 
                    <div key={index} className="bubble"></div>
                ))}
            </div>

            <ul className="circles">
                {Array.from({ length: 70 }).map((_, index) => (
                    <li key={index} className={`circle-${index + 1}`}></li>
                ))}
            </ul>
        </div>
    );
};

export default BubbleBackground;
