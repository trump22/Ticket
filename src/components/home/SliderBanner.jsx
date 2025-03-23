// src/components/SliderBanner.jsx

import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

// Dữ liệu banner
const bannerData = [
    {
        id: 1,
        title: "Những Thành Phố Mơ Màng Summer Tour",
        video:
            "https://salt.tkbcdn.com/ts/ds/83/6e/a5/0b985cdefd89aa50448ef8f6007cffb1.mp4",
        poster:
            "https://images.tkbcdn.com/2/614/350/ts/ds/7d/fa/16/4b639d22442960ea3d315bf289416618.jpg",
        link: "#",
    },
    {
        id: 2,
        title: "Duy Music | 1st Streaming in Vietnam",
        video:
            "https://salt.tkbcdn.com/ts/ds/92/52/05/2727460a3014820a22b5ea4c1e350f39.mp4",
        poster:
            "https://images.tkbcdn.com/2/614/350/ts/ds/21/5f/d7/92e9981cc46850451627316bfea4abd5.jpg",
        link: "#",
    },
    {
        id: 3,
        title: "Duy Music | 1st Streaming in Vietnam",
        video:
            "https://salt.tkbcdn.com/ts/ds/d5/52/aa/8d896339d3e35815ae5df88805b27e53.mp4",
        poster:
            "https://images.tkbcdn.com/2/614/350/ts/ds/e4/38/1c/cfaac8114909e17df1378def23b43252.jpg",
        link: "#",
    },
    {
        id: 4,
        title: "Duy Music | 1st Streaming in Vietnam",
        video:
            "https://salt.tkbcdn.com/ts/ds/92/52/05/2727460a3014820a22b5ea4c1e350f39.mp4",
        poster:
            "https://images.tkbcdn.com/2/614/350/ts/ds/21/5f/d7/92e9981cc46850451627316bfea4abd5.jpg",
        link: "#",
    },
];

// Arrow Trái (Prev)
function PrevArrow(props) {
    const { onClick, className, style } = props;
    return (
        <div
            onClick={onClick}
            style={{ ...style }}
            className={`
        ${className}
        custom-arrow
        w-10 h-10
        bg-black/20
        hover:bg-black/60
        rounded-full
        flex items-center justify-center
        text-white
        z-10
        cursor-pointer
        transition-colors
        duration-300
        absolute
        left-2
        top-1/2
        -translate-y-1/2
      `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </div>
    );
}

// Arrow Phải (Next)
function NextArrow(props) {
    const { onClick, className, style } = props;
    return (
        <div
            onClick={onClick}
            style={{ ...style }}
            className={`
        ${className}
        custom-arrow
        w-10 h-10
        bg-black/20
        hover:bg-black/60
        rounded-full
        flex items-center justify-center
        text-white
        z-10
        cursor-pointer
        transition-colors
        duration-300
        absolute
        right-2
        top-1/2
        -translate-y-1/2
      `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </div>
    );
}

// Component BannerCard: hiển thị ảnh mặc định và chuyển sang video khi di chuột vào card
function BannerCard({ banner }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative bg-black rounded-md overflow-hidden group h-[320px]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {hovered ? (
                <video
                    src={banner.video}
                    poster={banner.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
            ) : (
                <img
                    src={banner.poster}
                    alt={banner.title}
                    className="object-cover w-full h-full transition-transform duration-300"
                />
            )}
            <a
                href={banner.link}
                className="absolute bottom-2 left-2 bg-white text-black text-sm px-3 py-1 rounded hover:opacity-90 transition"
            >
                Xem chi tiết
            </a>
        </div>
    );
}

const SliderBanner = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: true, // Hiển thị chấm tròn
        arrows: true, // Hiển thị mũi tên
        infinite: true,
        speed: 500,
        slidesToShow: 2, // 2 banner cạnh nhau
        slidesToScroll: 2, // Cuộn 2 banner/lần
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        // Tùy chỉnh chấm
        customPaging: () => (
            <button className="w-2 h-2 block rounded-full bg-white" />
        ),
        dotsClass: "slick-dots !flex justify-center space-x-2 mb-4",
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto my-4">
            <Slider ref={sliderRef} {...settings}>
                {bannerData.map((banner) => (
                    <div key={banner.id} className="px-2">
                        <BannerCard banner={banner} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};
PrevArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
};

NextArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
};

BannerCard.propTypes = {
    banner: PropTypes.shape({
        video: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
    }).isRequired,
};

export default SliderBanner;
