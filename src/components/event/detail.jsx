
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import ticket from '../../assets/images/Subtract.png';
import placeholderImg from '../../assets/svgs/ok.png';
import {useNavigate, useParams} from 'react-router-dom';
import instance from "../../services/axios.js";
import Cookies from "js-cookie";
import {fetchAllEvents} from "../../store/eventSlice.js";

const EventDetail = () => {

    const { id } = useParams(); // id từ URL

    const navigate = useNavigate();
    const token = Cookies.get('token');
    const allEvents = useSelector((state) => state.event.allEvents);
    const dispatch = useDispatch();
    //  Nếu allEvents trống thì gọi lại API trong trường hợp user reload

    useEffect(() => {
        if (allEvents.length === 0) {
            console.log("📥 Gọi fetchAllEvents vì allEvents đang rỗng.");
            dispatch(fetchAllEvents());
        }
    }, [allEvents, dispatch]);

    const event = useMemo(() => {
        if (!id || !Array.isArray(allEvents)) return null;
        let matchedEvent = null;

        if (Array.isArray(allEvents) && allEvents.length > 0) {
            // Duyệt qua từng sự kiện trong mảng
            for (let i = 0; i < allEvents.length; i++) {

                const currentEvent = allEvents[i];

                // Nếu id của event hiện tại trùng với id trên URL
                if (currentEvent.id === id) {

                    matchedEvent = currentEvent; // Lưu sự kiện phù hợp vào biến event
                    break;
                }
            }

        } else {
            console.warn("Danh sách sự kiện không hợp lệ hoặc đang trống.");
        }
        return matchedEvent;

    }, [id, allEvents]);


    const handleSubmit = async () => {
        const token = Cookies.get('token');

        if(!token){
            window.confirm("bạn chưa đăng nhập vui lòng đăng nhập trước khi mua");
            return
        }

        const confirmBuy = window.confirm("Bạn có chắc chắn muốn mua vé không?");
        if (!confirmBuy) {
            return;
        }
        try {
            const response = await instance.post(
                '/api/OrderDetail/AddOrderDetail',
                {
                    eventId: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                alert("Bạn đã mua vé thành công!");
                navigate("/ticket/tab");
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!");
                console.error("Chi tiết lỗi:", response);
            }
        } catch (error) {
            alert("Đã xảy ra lỗi khi mua vé!");
            console.error("Lỗi khi gọi API:", error);
        }
    };
    // Tìm event theo id


    if (!event) {
        if (allEvents.length === 0) {
            return <p className="text-center text-gray-500 mt-10">Đang tải sự kiện...</p>;
        } else {
            return <p className="text-center text-red-500 mt-10">Không tìm thấy sự kiện.</p>;
        }
    }
    return (
        <div id="banner" className="max-w-6xl mx-auto mt-4 md:mt-8 px-4">
            <div
                className="flex w-[1209px] h-[476px] bg-cover bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${ticket})`,
                }}
            >
                {/* LEFT info */}
                <div className="w-[448px] h-full p-8">
                    <div className="info">
                        <p
                            id="title"
                            className="font-bold text-xl md:text-3xl text-white mb-8"
                        >
                            {event.name}
                        </p>
                        <p id="date" className="flex items-center text-xl text-white mt-2">
                            {/* ICON */}
                            <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="21" height="20"
                                 viewBox="0 0 21 20" fill="none">
                                <path
                                    d="M6.25 0a1 1 0 011 1v1h6V1a1 1 0 112 0v1h1a4 4 0 014 4v2h-20V6a4 4 0 014-4h1V1a1 1 0 011-1zM20.25 10h-20v8a2 2 0 002 2h16a2 2 0 002-2v-8z"
                                    fill="#000"></path>
                            </svg>
                            <strong>
                                Bắt đầu: {event.starTime ? new Date(event.starTime).toLocaleString() : "N/A"} -
                                Đến:{" "}
                                {event.endTime ? new Date(event.endTime).toLocaleString() : "N/A"}
                            </strong>
                        </p>
                        <p id="venue" className="flex items-center text-xl text-white mt-2 mb-5">
                            {/* LOCATION ICON */}
                            <svg width="22" height="28" viewBox="0 0 22 28" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.031 3.307a10.514 10.514 0 0113.937 0c4.485 3.945 4.955 10.854 1.058 15.392l-7.015 8.17a1.333 1.333 0 01-2.023 0l-7.015-8.17C-.923 14.161-.454 7.252 4.031 3.307zM11 14.667A3.333 3.333 0 1011 8a3.333 3.333 0 000 6.666z"
                                    fill="#000"
                                ></path>
                            </svg>
                            <div className="venue-text font-medium text-base">
                                {event.location || "Không rõ địa điểm"}
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
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-[#2DC275] text-white rounded hover:opacity-90 transition"
                                >
                                    Mua vé ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT image */}
                <div className="relative w-[763px] h-[476px] rounded-lg overflow-hidden">
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
        </div>
    );
};

export default EventDetail;
