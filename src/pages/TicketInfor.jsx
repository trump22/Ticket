// src/pages/TicketInfor.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

// Component Pop-up xác nhận mua vé
const TicketConfirmationModal = ({ orderData, onClose, onSellTicket }) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-black rounded-lg p-6 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Xác nhận mua vé</h2>
                <div className="mb-4">

                    <p className="text-lg">
                        <strong>Event ID:</strong> {orderData.eventID}
                    </p>
                </div>
                <div className="flex justify-end space-x-4">
                    <a href='/ticketlist'>Kiểm tra vé </a>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-black rounded hover:bg-gray-600 transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

const TicketInfor = () => {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // ID vé cần lấy thông tin
    const ticketId = "c4f66fef-2954-47ba-8ea9-5b3d5bfab76d";

    // Lấy token từ Redux/Cookies
    // Ở đây chúng ta dùng Cookies; nếu token được lưu dạng chuỗi thì dùng luôn
    const tokenRaw = Cookies.get('token');

    // State để hiển thị pop-up xác nhận
    const [showModal, setShowModal] = useState(false);

    // Giả sử dữ liệu order sau khi mua vé (bạn có thể thay đổi khi tích hợp API mua vé)
    const orderData = {
        orderDetailId: "0a3ded94-faa8-4cbb-9d08-b8963ef27000",
        eventID: ticketId
    };

    useEffect(() => {
        // Nếu chưa có ticketId hoặc token, không gọi API
        if (!ticketId || !tokenRaw) return;

        console.log("Fetching ticket info...");
        console.log("Raw token value:", tokenRaw, "| typeof:", typeof tokenRaw);

        // Nếu tokenRaw là object (VD: { token: 'abc123' }), cần lấy trường con, ngược lại dùng luôn
        const tokenString = (typeof tokenRaw === 'object' && tokenRaw !== null)
            ? tokenRaw.token
            : tokenRaw;

        if (typeof tokenString !== 'string') {
            console.error("Token is not a valid string:", tokenString);
            return;
        }

        axios.get(
            `http://13.239.1.215:8080/api/Event/GetEventByOrderDetailID/${ticketId}`,
            {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${tokenString}`
                }
            }
        )
            .then((response) => {
                setTicket(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching ticket info:", err);
                setError(err.message || 'Error fetching data');
                setLoading(false);
            });
    }, [ticketId, tokenRaw]);

    // Xử lý khi nhấn "Mua vé ngay"
    const handleBuyTicket = () => {
        // Thực hiện các bước xử lý mua vé nếu cần (gọi API mua vé, v.v.)
        // Sau đó hiển thị modal xác nhận
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSellTicket = () => {
        // Xử lý logic cho nút "Bán vé"
        console.log("Processing sell ticket with order data:", orderData);
        // Gọi API hoặc xử lý logic tiếp theo ở đây
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600">Đang tải...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">Lỗi: {error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-xl shadow-lg relative">
            <div className="flex flex-col md:flex-row">
                {/* Ảnh sự kiện */}
                <img
                    src={ticket?.imageUrl || "https://placehold.co/1200x600"}
                    alt={ticket?.name}
                    className="w-full md:w-1/2 rounded-xl object-cover"
                />
                {/* Thông tin sự kiện */}
                <div className="md:ml-8 mt-4 md:mt-0 flex flex-col justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">{ticket?.name}</h1>
                    <p className="mt-2 text-lg text-gray-600">Loại sự kiện: {ticket?.eventType}</p>
                    <p className="mt-2 text-gray-600">
                        Thời gian:{" "}
                        {ticket?.starTime ? new Date(ticket.starTime).toLocaleString() : "N/A"} -{" "}
                        {ticket?.endTime ? new Date(ticket.endTime).toLocaleString() : "N/A"}
                    </p>
                    <p className="mt-2 text-gray-600">
                        Địa điểm: {ticket?.location || "Chưa cập nhật"}
                    </p>
                    <p className="mt-2 text-gray-600">
                        Trạng thái: {ticket?.status || "Chưa cập nhật"}
                    </p>
                    <button
                        onClick={handleBuyTicket}
                        className="mt-4 py-2 px-4 bg-blue-600 text-black rounded hover:bg-blue-700 transition-colors"
                    >
                        Mua vé ngay
                    </button>
                </div>
            </div>
            {/* Hiển thị thêm thông tin chi tiết (dành cho debug) */}

            {/* Modal xác nhận mua vé */}
            {showModal && (
                <TicketConfirmationModal
                    orderData={orderData}
                    onClose={handleCloseModal}
                    onSellTicket={handleSellTicket}
                />
            )}
        </div>
    );
};

export default TicketInfor;
