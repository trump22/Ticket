import { useRef } from 'react';

const EventSlider = () => {
    const sliderRef = useRef(null);

    const handleNext = () => {
        if (sliderRef.current) {
            const sliderItem = sliderRef.current.querySelector('.slider-item');
            if (sliderItem) {
                const itemStyle = window.getComputedStyle(sliderItem);
                const marginRight = parseInt(itemStyle.marginRight, 10);
                const itemWidth = sliderItem.offsetWidth + marginRight;
                sliderRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
            }
        }
    };

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
                {/* Slider Item */}
                <div className="slider-item flex-shrink-0 w-48">
                    <a
                        href="https://ticketbox.vn/kich-thanh-xa-bach-xa-86983?utm_medium=special-events&utm_source=tkb-homepage"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://images.tkbcdn.com/2/360/479/ts/ds/2a/9e/57/beb7172537b8cdccf0dfe263a6e8946b.jpg"
                            alt="event"
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </a>
                </div>
                <div className="slider-item flex-shrink-0 w-48">
                    <a
                        href="https://ticketbox.vn/kich-thanh-xa-bach-xa-86983?utm_medium=special-events&utm_source=tkb-homepage"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://images.tkbcdn.com/2/360/479/ts/ds/2a/9e/57/beb7172537b8cdccf0dfe263a6e8946b.jpg"
                            alt="event"
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </a>
                </div>
                <div className="slider-item flex-shrink-0 w-48">
                    <a
                        href="https://ticketbox.vn/kich-thanh-xa-bach-xa-86983?utm_medium=special-events&utm_source=tkb-homepage"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://images.tkbcdn.com/2/360/479/ts/ds/2a/9e/57/beb7172537b8cdccf0dfe263a6e8946b.jpg"
                            alt="event"
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </a>
                </div>
                <div className="slider-item flex-shrink-0 w-48">
                    <a
                        href="https://ticketbox.vn/kich-thanh-xa-bach-xa-86983?utm_medium=special-events&utm_source=tkb-homepage"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://images.tkbcdn.com/2/360/479/ts/ds/2a/9e/57/beb7172537b8cdccf0dfe263a6e8946b.jpg"
                            alt="event"
                            className="rounded-lg object-cover w-full h-full"
                        />




                    </a>
                </div>
                {/* Another Slider Item */}
                <div className="slider-item flex-shrink-0 w-48">
                    <a
                        href="https://ticketbox.vn/tphcm-nhung-thanh-pho-mo-mang-summer-2025-23769?utm_medium=special-events&utm_source=tkb-homepage"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://images.tkbcdn.com/2/360/479/ts/ds/59/0c/3a/2720601ecc1f0dc2ccb62a8856a4bf95.jpg"
                            alt="event"
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </a>
                </div>
                {/* Third Slider Item */}
                <div className="slider-item flex-shrink-0 w-48">
                    <a
                        href="https://ticketbox.vn/hype-fest-23811?utm_medium=special-events&utm_source=tkb-homepage"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://images.tkbcdn.com/2/360/479/ts/ds/e3/e6/14/99ced3f425e39bdf7c8ef1d418e71e86.jpg"
                            alt="event"
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </a>
                </div>
                {/* Add additional slider items as needed */}
                <div className="slider-item flex-shrink-0 w-48">
                    <a
                        href="https://ticketbox.vn/kich-thanh-xa-bach-xa-86983?utm_medium=special-events&utm_source=tkb-homepage"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://images.tkbcdn.com/2/360/479/ts/ds/2a/9e/57/beb7172537b8cdccf0dfe263a6e8946b.jpg"
                            alt="event"
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EventSlider;
