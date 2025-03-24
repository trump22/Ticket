import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../services/axios.js";
const EventGroup = React.lazy(() => import("./group.jsx"));

const typeMap = {
    thethao: "thể thao",
    sknt: "sân khấu & nghệ thuật",
    khac: "khác",
};

const EventByTypePage = () => {
    const { type } = useParams(); // ví dụ: 'thethao'
    const [filteredEvents, setFilteredEvents] = useState([]);

    // tìm ra tên thể loại thực tế
    const mappedType = typeMap[type];

    useEffect(() => {
        if (!mappedType) {
            setFilteredEvents([]);
            return;
        }

        instance.get("/api/Event/GetAllEvent").then((res) => {
            const events = res.data || [];
            const match = events.filter(
                (e) => e.eventType?.toLowerCase() === mappedType.toLowerCase()
            );

            setFilteredEvents(match);
        });
    }, [type, mappedType]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 capitalize">Sự kiện: {mappedType || type}</h1>
            <EventGroup categoryName={mappedType || type} events={filteredEvents} />
        </div>
    );
};

export default EventByTypePage;
