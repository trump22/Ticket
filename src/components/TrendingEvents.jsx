import { useRef } from 'react';

const TrendingEvents = () => {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            const item = sliderRef.current.querySelector('.trending-item');
            if (item) {
                const itemStyle = window.getComputedStyle(item);
                const marginRight = parseInt(itemStyle.marginRight, 10);
                const itemWidth = item.offsetWidth + marginRight;
                sliderRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
            }
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            const item = sliderRef.current.querySelector('.trending-item');
            if (item) {
                const itemStyle = window.getComputedStyle(item);
                const marginRight = parseInt(itemStyle.marginRight, 10);
                const itemWidth = item.offsetWidth + marginRight;
                sliderRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="relative max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center space-x-2 p-4">
                <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0)">
                        <mask
                            id="mask0"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="24"
                            height="25"
                            style={{ maskType: 'luminance' }}
                        >
                            <path d="M0 .5h24v24H0V.5z" fill="#fff" />
                        </mask>
                        <g mask="url(#mask0)">
                            <path
                                d="M22.735 13.132a10.71 10.71 0 00-.656-3.707c-.291 3.404-2.105 5.152-4.002 4.338-1.776-.763-.579-3.737-.49-5.156.149-2.406-.008-5.16-4.378-7.449 1.816 3.474.21 5.631-1.474 5.763-1.868.146-3.578-1.605-2.947-4.447C6.743 3.98 6.683 6.517 7.314 8.158c.658 1.71-.026 3.131-1.631 3.29-1.793.176-2.79-1.921-1.87-5.264a10.696 10.696 0 00-2.551 6.948c0 5.93 4.807 10.736 10.737 10.736s10.736-4.806 10.736-10.736z"
                                fill="#F4900C"
                            />
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <path fill="#fff" transform="translate(0 .5)" d="M0 0h24v24H0z" />
                        </clipPath>
                    </defs>
                </svg>
                <div className="text-lg font-semibold">Sự kiện xu hướng</div>
            </div>

            {/* Trending Items Slider */}
            <div
                className="flex space-x-4 overflow-x-auto scroll-smooth p-4"
                ref={sliderRef}
            >
                {/* Item for Rank 1 */}
                <div className="trending-item flex-shrink-0 w-48 bg-white rounded shadow p-2">
                    <div className="flex items-center space-x-2">
                        <div className="rank-icon">
                            {/* Rank 1 Icon */}
                            <svg
                                width="27"
                                height="75"
                                viewBox="0 0 27 75"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 6.675l11.297-.976V75h6.636V0L0 1.275v5.4zM21.961 0h-1.658v75h6.635V4.8L21.961 0z"
                                    fill="#2DC275"
                                />
                                <path d="M0 14.25l9.006-.675V7.95L0 8.55v5.7z" fill="#2DC275" />
                            </svg>
                        </div>
                        <span>
                            <img
                                src="/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2Ff9%2Fa3%2F4e%2Fd15abfcdd55c7634d9871b4da907488f.png&w=1080&q=75"
                                alt="event"
                                className="rounded object-cover w-full h-full"
                            />
                        </span>
                    </div>
                </div>
                {/* Item for Rank 2 */}
                <div className="trending-item flex-shrink-0 w-48 bg-white rounded shadow p-2">
                    <div className="flex items-center space-x-2">
                        <div className="rank-icon">
                            {/* Rank 2 Icon */}
                            <svg
                                width="53"
                                height="75"
                                viewBox="0 0 53 75"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.852 22.108c.157-5.327 1.561-9.303 3.824-12.303 2.42-3.001 5.307-4.952 8.974-6.153a32.794 32.794 0 0111.237-1.5c3.746.15 7.413.825 10.535 1.876A28.677 28.677 0 0031.448.65c-3.511-.675-7.1-.825-10.77-.45-3.589.45-7.022 1.5-10.143 3.152-3.122 1.65-5.541 3.976-7.57 7.127C1.014 13.63 0 17.607 0 22.408v2.175h5.852v-2.476.001z"
                                    fill="#2DC275"
                                />
                                <path
                                    d="M42.14 40.189c2.575-2.702 4.448-5.627 5.696-9.003 1.17-3.152 1.56-6.302 1.404-9.602-.234-3.152-1.093-6.002-2.81-8.778-1.56-2.477-3.98-4.651-6.867-6.302-3.122-1.651-6.789-2.475-11.237-2.475-3.667 0-6.711.45-9.365 1.5-2.419.975-4.291 2.25-5.852 3.75-1.405 1.726-2.575 3.151-3.278 5.028-.702 1.651-1.17 3.3-1.404 4.952-.157 1.5-.312 2.85-.312 3.826v1.5h5.697v-1.65c-.156-1.201 0-2.476.312-4.2.234-1.427.858-3.152 1.951-4.577 1.015-1.725 2.42-3 4.448-4.202 2.107-.976 4.683-1.65 8.116-1.65 2.81 0 5.384.674 7.413 2.024 2.263 1.126 3.824 2.776 5.073 4.651 1.326 1.95 1.873 3.976 1.873 5.928 0 3.676-.547 6.827-1.717 9.828-1.093 2.776-2.965 5.476-5.54 7.802-2.42 2.176-5.385 5.102-9.286 8.778-3.824 3.827-7.804 7.652-11.784 11.478-3.98 3.976-7.413 7.278-10.144 10.128C1.717 71.55.312 73.05.312 73.05V75h48.382l1.718-5.477h-38.47s1.17-.976 3.434-3.301c2.262-2.176 4.993-4.951 8.427-8.103 3.277-3.151 6.554-6.452 10.066-9.827 3.277-3.152 6.01-5.928 8.272-8.103h-.001z"
                                    fill="#2DC275"
                                />
                            </svg>
                        </div>
                        <span>
                            <img
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                alt="event"
                                className="rounded object-cover"
                            />
                        </span>
                    </div>
                </div>
                {/* Item for Rank 3 */}
                <div className="trending-item flex-shrink-0 w-48 bg-white rounded shadow p-2">
                    <div className="flex items-center space-x-2">
                        <div className="rank-icon">
                            {/* Rank 3 Icon (using similar SVG as rank 2 for demo) */}
                            <svg
                                width="53"
                                height="75"
                                viewBox="0 0 53 75"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* For brevity, you can adjust the SVG path for each rank */}
                                <path
                                    d="M5.852 22.108c.157-5.327 1.561-9.303 3.824-12.303 2.42-3.001 5.307-4.952 8.974-6.153a32.794 32.794 0 0111.237-1.5c3.746.15 7.413.825 10.535 1.876A28.677 28.677 0 0031.448.65c-3.511-.675-7.1-.825-10.77-.45-3.589.45-7.022 1.5-10.143 3.152-3.122 1.65-5.541 3.976-7.57 7.127C1.014 13.63 0 17.607 0 22.408v2.175h5.852v-2.476.001z"
                                    fill="#2DC275"
                                />
                                <path
                                    d="M42.14 40.189c2.575-2.702 4.448-5.627 5.696-9.003 1.17-3.152 1.56-6.302 1.404-9.602-.234-3.152-1.093-6.002-2.81-8.778-1.56-2.477-3.98-4.651-6.867-6.302-3.122-1.651-6.789-2.475-11.237-2.475-3.667 0-6.711.45-9.365 1.5-2.419.975-4.291 2.25-5.852 3.75-1.405 1.726-2.575 3.151-3.278 5.028-.702 1.651-1.17 3.3-1.404 4.952-.157 1.5-.312 2.85-.312 3.826v1.5h5.697v-1.65c-.156-1.201 0-2.476.312-4.2.234-1.427.858-3.152 1.951-4.577 1.015-1.725 2.42-3 4.448-4.202 2.107-.976 4.683-1.65 8.116-1.65 2.81 0 5.384.674 7.413 2.024 2.263 1.126 3.824 2.776 5.073 4.651 1.326 1.95 1.873 3.976 1.873 5.928 0 3.676-.547 6.827-1.717 9.828-1.093 2.776-2.965 5.476-5.54 7.802-2.42 2.176-5.385 5.102-9.286 8.778-3.824 3.827-7.804 7.652-11.784 11.478-3.98 3.976-7.413 7.278-10.144 10.128C1.717 71.55.312 73.05.312 73.05V75h48.382l1.718-5.477h-38.47s1.17-.976 3.434-3.301c2.262-2.176 4.993-4.951 8.427-8.103 3.277-3.151 6.554-6.452 10.066-9.827 3.277-3.152 6.01-5.928 8.272-8.103h-.001z"
                                    fill="#2DC275"
                                />
                            </svg>
                        </div>
                        <span>
                            <img
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                alt="event"
                                className="rounded object-cover"
                            />
                        </span>
                    </div>
                </div>
                {/* Last item example (e.g. rank 10) */}
                <div className="trending-item flex-shrink-0 w-48 bg-white rounded shadow p-2">
                    <div className="flex items-center space-x-2">
                        <div className="rank-icon">
                            {/* Rank 10 Icon */}
                            <svg
                                width="92"
                                height="75"
                                viewBox="0 0 92 75"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M36.329 33.398c1.73-17.09 8.568-25.745 20.594-25.745 2.908 0 5.581.747 8.096 2.24a20.652 20.652 0 016.131 5.67c1.808 2.314 3.144 4.925 4.087 7.76.865 2.762 1.337 5.597 1.337 8.358 0 2.986-.158 6.343-.314 10.224-.236 3.955-1.023 7.537-2.36 10.896-1.257 3.358-3.38 5.82-6.445 7.536-2.909 1.717-7.074 1.94-12.341.522l.707.672c.315.373.943.97 1.887 1.343 1.021.521 2.122.97 3.616 1.418 1.572.448 3.302.597 5.502.597 2.908 0 5.817-1.343 8.646-4.253 2.908-2.762 5.03-6.94 6.446-12.463 1.494-5.522 1.73-12.387.629-20.596-1.258-7.238-3.852-12.985-7.86-17.238-4.088-4.254-8.804-6.792-14.07-7.761-5.424-.97-10.77 0-16.035 2.761-2.044.97-4.088 2.686-6.289 5.075-2.122 2.388-3.931 5.82-5.66 10.074-1.572 4.254-2.357 9.701-2.593 16.268-.078 7.24.943 13.805 2.987 19.402 2.122 5.597 5.345 10.074 9.589 13.209 4.323 3.357 9.825 5.075 16.427 5.224l7.625-.373c-8.096 0-14.463-2.016-19.1-5.896-4.559-3.955-7.703-9.03-9.51-15.372-1.73-6.118-2.28-12.761-1.73-19.55v-.002z"
                                    fill="#2DC275"
                                />
                                <path
                                    d="M53.623.638C61.875.19 68.4 1.832 73.273 5.787c4.875 3.806 8.253 8.955 10.219 15.223 1.965 6.27 2.594 12.91 1.965 19.85-.943 8.956-3.066 15.447-6.524 19.552-3.458 4.328-8.175 6.342-14.148 6.417-9.197-.521-15.17-5.97-18-16.192-1.101-4.179-1.65-8.73-1.808-13.656 0-4.775.707-9.253 2.2-13.432 1.416-4.254 3.695-7.313 6.84-9.403 3.143-2.09 7.152-2.24 12.105-.523-.472-.597-1.101-1.343-2.28-2.09-.943-.895-2.515-1.418-4.48-1.716-1.966-.3-4.56-.15-7.625.745-2.202.523-4.48 2.24-6.84 5-2.357 2.91-4.165 6.79-5.423 11.94-1.18 5.149-1.337 11.493-.158 19.104 1.179 6.566 3.302 12.014 6.682 16.416 3.38 4.328 7.545 7.09 12.733 8.432 5.03 1.269 10.847.746 17.292-1.642 4.796-1.792 8.646-5.522 11.398-11.045 2.83-5.672 4.323-12.91 4.323-21.865 0-5-.55-9.924-1.965-14.701-1.179-4.851-3.222-9.104-6.13-12.686-2.91-3.656-6.839-6.343-11.791-8.059C66.984-.186 60.853-.41 53.62.636l.002.002zM0 6.675l11.297-.976V75h6.636V0L0 1.275v5.4zM21.961 0h-1.658v75h6.635V4.8L21.961 0z"
                                    fill="#2DC275"
                                />
                                <path d="M0 14.25l9.006-.675V7.95L0 8.55v5.7z" fill="#2DC275" />
                            </svg>
                        </div>
                        <span>
                            <img
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                alt="event"
                                className="rounded object-cover"
                            />
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={scrollLeft}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
                aria-label="Scroll Left"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15 6l-6 6 6 6"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <button
                onClick={scrollRight}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
                aria-label="Scroll Right"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: 'rotate(180deg)' }}
                >
                    <path
                        d="M15 6l-6 6 6 6"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default TrendingEvents;
