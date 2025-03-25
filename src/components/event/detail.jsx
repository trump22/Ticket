// src/pages/EventDetails.jsx
import { useEffect, useState } from 'react';
import ticket from '../../assets/images/Subtract.png';
import placeholderImg from '../../assets/svgs/ok.png';
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
        instance
            .get(`/api/Event/GetEventById/${id}`)
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
        <div id="banner" className="max-w-6xl mx-auto mt-4 md:mt-8 px-4">
            {/* Container có kích thước cố định: 1209px x 476px */}
            <div
                className="flex w-[1209px] h-[476px] bg-cover bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${ticket})`,
                }}
            >
                {/* Phần thông tin event bên trái: fixed width 454px, full height */}
                <div className="w-[448px] h-full p-8">
                    <div className="info">
                        <p
                            id="title"
                            className="font-bold text-xl md:text-3xl text-white mb-8"
                        >
                            {event.name}
                        </p>
                        <p id="date" className="flex items-center text-xl text-white mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                className="mr-1"
                            >
                                <g clipPath="url(#calendar-detail_svg__clip0)">
                                    <path
                                        d="M6.25 0a1 1 0 011 1v1h6V1a1 1 0 112 0v1h1a4 4 0 014 4v2h-20V6a4 4 0 014-4h1V1a1 1 0 011-1zM20.25 10h-20v8a2 2 0 002 2h16a2 2 0 002-2v-8z"
                                        fill="#000"
                                    ></path>
                                </g>
                                <defs>
                                    <clipPath id="calendar-detail_svg__clip0">
                                        <path fill="#fff" transform="translate(.25)" d="M0 0h20v20H0z"></path>
                                    </clipPath>
                                </defs>
                            </svg>
                            <strong>
                                Bắt đầu:{" "}
                                {event.starTime
                                    ? new Date(event.starTime).toLocaleString()
                                    : "N/A"}{" "}
                                - Đến:{" "}
                                {event.endTime
                                    ? new Date(event.endTime).toLocaleString()
                                    : "N/A"}
                            </strong>
                        </p>
                        <p id="venue" className="flex items-center text-xl text-white mt-2 mb-5">
                            <svg
                                width="22"
                                height="28"
                                viewBox="0 0 22 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.031 3.307a10.514 10.514 0 0113.937 0c4.485 3.945 4.955 10.854 1.058 15.392l-7.015 8.17a1.333 1.333 0 01-2.023 0l-7.015-8.17C-.923 14.161-.454 7.252 4.031 3.307zM11 14.667A3.333 3.333 0 1011 8a3.333 3.333 0 000 6.666z"
                                    fill="#000"
                                ></path>
                            </svg>
                            <div className="venue-text font-medium text-base">
                                {event.location || "Not provided"}
                            </div>
                        </p>
                        <div className="price mt-4">
                            <div id="ticket-price" className="text-sm text-white space-x-1">
                                <span>Giá từ</span>
                                <div className="text-green-500 font-bold inline-flex items-center">
                                    <span>150.000đ</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <button
                                    id="buynow-btn"
                                    className="px-4 py-2 bg-[#2DC275] text-white rounded hover:opacity-90 transition"
                                >
                                    Mua vé ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Phần ảnh event bên phải: fixed width 755px, full height */}
                <div className="relative w-[763px] h-[476px] rounded-lg overflow-hidden">
                    {/* Placeholder mask: dùng ảnh này làm khuôn */}
                    <div
                        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${placeholderImg})`,
                            maskImage: `url(${placeholderImg})`,
                            maskSize: 'cover',
                            maskRepeat: 'no-repeat',
                            WebkitMaskImage: `url(${placeholderImg})`,
                            WebkitMaskSize: 'cover',
                            WebkitMaskRepeat: 'no-repeat',
                        }}
                    />
                    {/* Ảnh event: nếu có, sẽ được hiển thị đè lên và “cắt” theo mask */}
                    {event.imageUrl && (
                        <img
                            src={event.imageUrl}
                            alt={event.name}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                                maskImage: `url(${placeholderImg})`,
                                maskSize: 'cover',
                                maskRepeat: 'no-repeat',
                                WebkitMaskImage: `url(${placeholderImg})`,
                                WebkitMaskSize: 'cover',
                                WebkitMaskRepeat: 'no-repeat',
                            }}
                        />
                    )}
                </div>

            </div>
        </div >


    );
};

export default EventDetails;
