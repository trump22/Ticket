// src/components/EventSlider.jsx
import { useRef, useState, useEffect } from "react";

import instance from "../../services/axios";

const EventSlider = () => {
    const sliderRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy dữ liệu sự kiện từ API khi component mount
    useEffect(() => {
        instance
            .get("/api/Event/GetAllEvent")
            .then((response) => {
                setEvents(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
                setLoading(false);
            });
    }, []);

    const handleNext = () => {
        if (sliderRef.current) {
            // Lấy một slider-item để tính khoảng cách cần scroll
            const sliderItem = sliderRef.current.querySelector(".slider-item");
            if (sliderItem) {
                const itemStyle = window.getComputedStyle(sliderItem);
                const marginRight = parseInt(itemStyle.marginRight, 10);
                const itemWidth = sliderItem.offsetWidth + marginRight;
                sliderRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-600">Loading events...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header with title and next button */}
            <div className="flex items-center justify-between p-4">
                <h2 className="text-2xl font-semibold">Sự kiện đặc biệt</h2>
                <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-white"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
            {/* Slider track */}
            <div
                ref={sliderRef}
                className="flex justify-center overflow-x-auto scroll-smooth space-x-4 px-4 pb-4"
            >
                {events.map((event) => (
                    <div key={event.id} className="slider-item flex-shrink-0 w-48">
                        <a
                            href={`/event/${event.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={event.imageUrl}
                                alt={event.name}
                                className="rounded-lg object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventSlider;
