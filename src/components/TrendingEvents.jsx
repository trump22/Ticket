import { useRef } from "react";
// Hoặc dùng SVG tùy ý, ở đây ví dụ dùng react-icons

// Giả sử bạn có mảng sự kiện tĩnh (mock) như sau:
// Trong thực tế, bạn sẽ fetch dữ liệu từ API
const eventsData = [
    {
        id: 1,
        title: 'Vở Kịch Rối "THẠCH SANH LÝ THÔNG"',
        image: 'https://images.tkbcdn.com/2/608/332/ts/ds/68/e3/02/ed4601249b30da012d9ab58065dbf5c3.jpg',
        price: '100.000đ',
        date: '23 tháng 03, 2025',
        link: '#',
    },
    {
        id: 2,
        title: "Sân Khấu Hồng Vân: Vở Kịch Người Vợ Ma",
        image: 'https://images.tkbcdn.com/2/608/332/ts/ds/b3/54/c7/5f793edaebc0462080ec56694d7a3b42.jpg',
        price: '300.000đ',
        date: '30 tháng 03, 2025',
        link: '#',
    },
    {
        id: 3,
        title: "Nhà Hát Kịch IDECAF: Cái gì Vui Vẻ thì mình Ưu Tiên",
        image: 'https://images.tkbcdn.com/2/608/332/ts/ds/2b/1a/a5/371b379ac0bdd94e091cfc20ae2ce99d.jpg',
        price: '270.000đ',
        date: '23 tháng 03, 2025',
        link: '#',
    },
    {
        id: 4,
        title: "[FLOWER 1969’s] WORKSHOP SOLID PERFUME - NƯỚC HOA KHÔ",
        image: 'https://images.tkbcdn.com/2/608/332/ts/ds/d1/91/35/4b4ca883013ffa19ccd3ce6889e96d69.png',
        price: '279.000đ',
        date: '22 tháng 03, 2025',
        link: '#',
    },
    // ... Thêm nhiều object tương tự
];

function TrendingEvents() {
    // Dùng useRef để tham chiếu div cuộn ngang
    const scrollContainerRef = useRef(null);

    // Hàm scroll sang phải
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300, // tuỳ chỉnh px cuộn mỗi lần
                behavior: 'smooth',
            });
        }
    };

    // Hàm scroll sang trái
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            });
        }
    };

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
            hidden md:block  /* Ẩn trên mobile, chỉ hiển thị trên md */
          "
                >

                </button>

                {/* Container cuộn ngang */}
                <div
                    ref={scrollContainerRef}
                    className="
            flex justify-center
            overflow-x-auto
            gap-4
            scrollbar-hide  /* Tuỳ bạn, có thể giấu scrollbar bằng plugin Tailwind */
            scroll-smooth
            px-6
            py-2
          "
                >
                    {eventsData.map((ev) => (
                        <a
                            key={ev.id}
                            href={ev.link}
                            className="
                w-[240px]
                h-[351px] 
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
                                src={ev.image}
                                alt={ev.title}
                                className="w-full h-full object-cover"
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
                                <p className="text-sm font-semibold line-clamp-2">{ev.title}</p>
                                <p className="text-green-400 text-sm font-bold">
                                    Từ {ev.price}
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
                                    <span>{ev.date}</span>
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

                </button>
            </div>
        </div>
    );
}

export default TrendingEvents;
