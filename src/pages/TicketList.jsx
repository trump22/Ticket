// src/pages/TicketList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy danh sách vé đã mua từ API
    useEffect(() => {
        axios
            .get('http://13.239.1.215:8080/api/OrderDetail/GetOrderDetailByUserId', {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            })
            .then((response) => {
                setTickets(response.data);
            })
            .catch((err) => {
                console.error("Error fetching tickets:", err);
                setError(err.message || 'Error fetching data');
            });
    }, []);

    // Lấy danh sách sự kiện từ API
    useEffect(() => {
        axios
            .get('http://13.239.1.215:8080/api/Event/GetAllEvent', {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            })
            .then((response) => {
                setEventsList(response.data);
            })
            .catch((err) => {
                console.error("Error fetching events:", err);
                setError(err.message || 'Error fetching event data');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Tạo mapping từ eventId sang event name
    const eventMapping = eventsList.reduce((acc, event) => {
        acc[event.id] = event.name;
        return acc;
    }, {});

    // Hàm xử lý hủy vé
    const handleCancelTicket = async (orderId) => {
        try {
            // Gọi API hủy vé. Bạn có thể dùng axios.put hoặc axios.delete tùy API yêu cầu.
            const response = await axios.put(
                `http://13.239.1.215:8080/api/OrderDetail/CancelOrderDetail/${orderId}`,
                {},
                {
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                }
            );
            if (response.status === 200) {
                // Nếu hủy vé thành công, cập nhật lại danh sách vé (ví dụ: xóa vé đã hủy)
                setTickets(prevTickets =>
                    prevTickets.map(ticket =>
                        ticket.id === orderId ? { ...ticket, status: "Đã hủy" } : ticket
                    )
                );
                alert("Hủy vé thành công!");
            }
        } catch (err) {
            console.error("Error canceling ticket:", err);
            alert("Hủy vé thất bại, vui lòng thử lại!");
        }
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
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Danh sách vé đã mua</h1>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID Vé</th>
                        <th className="border p-2">Giá</th>
                        <th className="border p-2">Trạng thái</th>
                        <th className="border p-2">User ID</th>
                        <th className="border p-2">Tên sự kiện</th>
                        <th className="border p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="border p-4 text-center">
                                Không có vé mua.
                            </td>
                        </tr>
                    ) : (
                        tickets.map((ticket) => (
                            <tr key={ticket.id} className="text-center">
                                <td className="border p-2">{ticket.id}</td>
                                <td className="border p-2">{ticket.price.toLocaleString()} đ</td>
                                <td className="border p-2">{ticket.status}</td>
                                <td className="border p-2">{ticket.userId}</td>
                                <td className="border p-2">
                                    {eventMapping[ticket.eventId] || 'Không xác định'}
                                </td>
                                <td className="border p-2">
                                    {ticket.status !== "Đã hủy" && (
                                        <button
                                            onClick={() => handleCancelTicket(ticket.id)}
                                            className="py-1 px-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                        >
                                            Hủy vé
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TicketList;
