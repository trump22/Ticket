// src/components/EventSlider.jsx
import { useRef, useState, useEffect } from "react";

import instance from "../../services/axios";

const EventSlider = () => {
    const sliderRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy dữ liệu sự kiện từ API khi component mount
    useEffect(() => {
        instance
            .get("/api/Event/GetAllEvent", {
                headers: { "Accept": "*/*" }
            })
            .then((response) => {
                setEvents(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching events:", err);
                setError(err.message || "Error fetching data");
                setLoading(false);
            });
    }, []);

    // Hàm scroll sang phải
    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: 300, // số pixel cần cuộn mỗi lần
                behavior: "smooth",
            });
        }
    };

    // Hàm scroll sang trái
    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -300,
                behavior: "smooth",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-600">Đang tải sự kiện...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-red-500">Lỗi: {error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Tiêu đề */}
            <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-2xl font-bold">Sự kiện xu hướng</h2>
            </div>

            {/* Vùng chứa nút cuộn và danh sách sự kiện */}
            <div className="relative">
                {/* Nút cuộn trái */}
                <button
                    onClick={scrollLeft}
                    className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-10
            bg-black/20
            hover:bg-black/40
            text-white
            p-2
            rounded-full
            hidden md:block
          "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 rotate-180"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                {/* Container cuộn ngang */}
                <div
                    ref={sliderRef}
                    className="
            flex justify-center
            overflow-x-auto
            gap-4
            scrollbar-hide
            scroll-smooth
            px-6
            py-4

          "
                >
                    {events.map((ev) => (
                        <a
                            key={ev.id}
                            href={ev.link || "#"} // Nếu API không trả link, bạn có thể thay đổi thành đường dẫn đến trang chi tiết sự kiện
                            className="
                w-[336px]
                h-[283px]
                shrink-0
                relative
                rounded-md
                overflow-hidden
                bg-zinc-700
                hover:scale-105
                transition-transform
                duration-300
              "
                        >
                            {/* Ảnh sự kiện */}
                            <img
                                src={ev.imageUrl || "https://placehold.co/336x283"}
                                alt={ev.name}
                                className="block max-w-full w-auto h-auto bg-transparent border-0 m-0 p-0"
                            />

                            {/* Thông tin nổi bật */}
                            <div
                                className="
                  absolute
                  bottom-0
                  left-0
                  w-full
                  p-3
                  bg-black/50
                  text-white
                  backdrop-blur-sm
                "
                            >

                                <p className="text-sm font-semibold line-clamp-2">
                                    {ev.name}
                                </p>
                                <p className="text-green-400 text-sm font-bold">
                                    Từ 150.000đ
                                </p>


                                <div className="text-sm flex items-center mt-1">
                                    {/* Icon lịch */}
                                    <svg
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-1"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5.333 1.958c.369 0 .667.299.667.667v.667h4v-.667a.667.667 0 111.334 0v.667H12a2.667 2.667 0 012.667 2.666v8c0 .737-.597 1.334-1.333 1.334H2.667a1.333 1.333 0 01-1.333-1.334v-8A2.667 2.667 0 014 3.292h.667v-.667c0-.368.298-.667.667-.667zM10 4.625v.667a.667.667 0 101.334 0v-.667H12c.736 0 1.334.597 1.334 1.333v1.334H2.667V5.958c0-.736.597-1.333 1.333-1.333h.667v.667a.667.667 0 001.333 0v-.667h4zm-7.333 4h10.666v5.333H2.668V8.625z"
                                            fill="#fff"
                                        ></path>
                                    </svg>


                                    <span>
                                        {ev.starTime
                                            ? new Date(ev.starTime).toLocaleDateString()
                                            : ""}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Nút cuộn phải */}
                <button
                    onClick={scrollRight}
                    className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-10
            bg-black/20
            hover:bg-black/40
            text-white
            p-2
            rounded-full
            hidden md:block
          "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default EventSlider;
