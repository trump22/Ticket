import React from "react";
const EventDetails = React.lazy(() => import("../../components/event/detail.jsx"));

const EventDetail = () => {
    return (
        <div>
            <EventDetails />
        </div>
    )
}
export default EventDetail;