import React from "react";
const EventCard = React.lazy(() => import("./slider.jsx"));

const EventGroup = ({ categoryName, events }) => {
    if (!events || events.length === 0) return null;
    return (
        <div className="mb-10">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventGroup;
