// src/components/SpecialEventsSlider.jsx

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SpecialEvents = () => {
    // Cấu hình cho slider
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,      // Trượt vòng tròn
        slidesToShow: 4,     // Hiển thị 4 card mỗi lần
        slidesToScroll: 1,   // Mỗi lần trượt 1 card
        speed: 500,
        autoplay: false,
        autoplaySpeed: 3000,
    };

    // Số lượng card placeholder muốn hiển thị
    const placeholderCount = 6;

    return (
        <div className="special-events-slider">
            <Slider {...settings}>
                {Array.from({ length: placeholderCount }).map((_, i) => (
                    <div key={i} className="px-[6px]">
                        {/* 
              px-[6px] = padding-left 6px + padding-right 6px
              => khoảng cách giữa 2 card kế tiếp = 6px + 6px = 12px 
            */}
                        <div
                            className="
                w-[240px]
                h-[351px]
                bg-[#D9D9D9]
                rounded-[20px]
              "
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SpecialEvents;
// 