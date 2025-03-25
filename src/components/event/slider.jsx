import "react";
import {Link} from "react-router-dom";

const EventCard = ({ event }) => {
    return (
        <Link to={`/event/${event.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
