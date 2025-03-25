// src/components/EventSlider.jsx
import { useEffect, useRef, useState } from "react";
import instance from "../../services/axios";
import { useDispatch } from "react-redux";
import { setAllEvents } from "../../store/eventSlice.js";
import { Link } from "react-router-dom";

const EventSlider = () => {
    const sliderRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // Lấy dữ liệu sự kiện từ API khi component mount
    useEffect(() => {
        instance
            .get("/api/Event/GetAllEvent")
            .then((response) => {
                setEvents(response.data);
                dispatch(setAllEvents(response.data));

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-600">Loading events...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header với tiêu đề */}
            <div className="flex items-center justify-between p-4">
                <h2 className="text-2xl font-semibold">Sự kiện đặc biệt</h2>
            </div>
            {/* Slider track */}
            <div ref={sliderRef} className="flex overflow-x-auto scroll-smooth space-x-4 px-4 pb-4">
                {events.map((event) => (
                    <Link key={event.id} to={`/event/${event.id}`} className="block">
                        <div className="slider-item relative flex-shrink-0 w-80 h-[220px]">
                            <img
                                src={event.imageUrl}
                                alt={event.name}
                                className="rounded-lg w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-3 bg-black/50 text-white backdrop-blur-sm rounded-b-lg">
                                <p className="text-sm font-semibold line-clamp-2">{event.name}</p>
                                <div className="text-sm flex items-center mt-1">
                                    <span className="material-symbols-outlined text-base mr-1">calendar_month</span>
                                    <span>
                                        {event.starTime
                                            ? new Date(event.starTime).toLocaleDateString("vi-VN")
                                            : "Chưa xác định"}
                                        {" đến "}
                                        {event.endTime
                                            ? new Date(event.endTime).toLocaleDateString("vi-VN")
                                            : "Chưa xác định"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EventSlider;
