// src/pages/EventDetails.jsx
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import instance from '../../services/axios';

const EventDetails = () => {
    // Lấy event id từ URL thông qua useParams
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Gọi API lấy thông tin sự kiện theo id
        instance.get(`/api/Event/GetEventById/${id}`)
            .then((response) => {
                setEvent(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching event details:", err);
                setError(err.message || "Error fetching event details");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600">Loading event details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600">No event details found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
            <img
                src={event.imageUrl}
                alt={event.name}
                className="w-full h-auto mb-4 rounded"
            />
            <p><strong>Location:</strong> {event.location || "Not provided"}</p>
            <p><strong>Event Type:</strong> {event.eventType}</p>
            <p>
                <strong>Start Time:</strong> {event.starTime ? new Date(event.starTime).toLocaleString() : "N/A"}
            </p>
            <p>
                <strong>End Time:</strong> {event.endTime ? new Date(event.endTime).toLocaleString() : "N/A"}
            </p>
            <p><strong>Status:</strong> {event.status || "N/A"}</p>
            <p><strong>Organizer ID:</strong> {event.organizersId}</p>
            {/* Thêm các thông tin khác nếu cần */}
        </div>
    );
};

export default EventDetails;
