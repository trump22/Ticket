import React from "react";

const CreateEvent = React.lazy(() => import("../../components/event/Create.jsx"));

const CreateEventPage = () => {
    return (
        <div>
            <CreateEvent />
        </div>
    )
}
export default CreateEventPage;