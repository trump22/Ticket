// src/pages/list.jsx
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import instance from "../../services/axios.js";
import {formatDateTime} from "../../helper/convertDate.js";
import { useDispatch, useSelector } from 'react-redux';
import {setTickets,cancelTicket} from "../../store/ticketSlice.js";

const NoTicketsComponent = React.lazy(() => import("./notFound.jsx"));

const BuyList = () => {
    const dispatch = useDispatch();
    const tickets = useSelector(state => state.tickets.list);
    const [eventsList, setEventsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const activeTickets = tickets.filter(ticket => ticket.status !== "Đã huỷ");

    let token = Cookies.get('token');

    // Lấy danh sách vé đã mua từ API
    useEffect(() => {
        instance
            .get('/api/OrderDetail/GetOrderDetailByUserId', {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("Response ticket data:", response.data);
                if (Array.isArray(response.data)) {
                    setTickets(response.data);
                    dispatch(setTickets(response.data));
                } else {
                    setTickets([]);
                    dispatch(setTickets([]));
                }
                console.log(response.data);
            })
            .catch((err) => {
                console.error("Error fetching tickets:", err);
                setError(err.message || 'Error fetching data');
            });
    }, []);

    // Lấy danh sách sự kiện từ API
    useEffect(() => {
        instance
            .get('/api/Event/GetAllEvent', {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${token}`
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
    if (activeTickets.length === 0) {
        return <NoTicketsComponent />;
    }



    // Tạo mapping từ eventId sang event name
    const eventMapping = eventsList.reduce((acc, event) => {
        console.log("eventID la ",event.id)
        acc[event.id] = event.name;
        return acc;
    }, {});

    // Hàm xử lý hủy vé
    const handleCancelTicket = async (orderId) => {
        try {
            // Gọi API hủy vé. Bạn có thể dùng axios.put hoặc axios.delete tùy API yêu cầu.
            const response = await instance.put(
                `api/OrderDetail/CancelOrderDetail/${orderId}`,
                {},
                {
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${token}`
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
                dispatch(cancelTicket(orderId));
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
        <div className="max-w-6xl mx-auto p-4 sm:p-8">

            {/* Table for larger screens */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-md table-zebra w-full text-white border border-white">
                    <thead className="bg-base-200 text-white">
                    <tr>
                        <th className="border border-white">ID Vé</th>
                        <th className="border border-white">Giá</th>
                        <th className="border border-white">Trạng thái</th>
                        <th className="border border-white">Tên người dùng</th>
                        <th className="border border-white">Tên sự kiện</th>
                        <th className="border border-white">Thời gian tạo</th>
                        <th className="border border-white">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activeTickets.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center border border-white py-4">
                                Không có vé mua.
                            </td>
                        </tr>
                    ) : (
                        activeTickets.map((ticket) => (
                            <tr key={ticket.id} className="hover:bg-base-300 text-white">
                                <td className="border border-white">{ticket.id}</td>
                                <td className="border border-white">{ticket.price.toLocaleString()} đ</td>
                                <td className="border border-white">{ticket.status}</td>
                                <td className="border border-white">{Cookies.get('username')}</td>
                                <td className="border border-white">{eventMapping[ticket.eventId] || 'Không xác định'}</td>
                                <th className="border border-white whitespace-nowrap">{formatDateTime(ticket.createAt)}</th>
                                <td className="border border-white">
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

            {/* Card layout for mobile */}
            {/* Card layout for mobile */}
            <div className="md:hidden divide-y divide-white border border-white rounded-xl overflow-hidden">
                {activeTickets.length === 0 ? (
                    <p className="text-center text-white p-4">Không có vé mua.</p>
                ) : (
                    activeTickets.map((ticket, index) => (
                        <div
                            key={ticket.id}
                            className={`bg-base-200 px-2 text-white ${
                                index !== tickets.length - 1 ? "border-b border-white" : ""
                            }`}
                        >
                            <p className="font-light">
                                <span className="border-b-2 font-semibold">ID Vé:</span>
                                <span className="ml-2 ">{ticket.id}</span>
                            </p>
                            <p className={"font-light"}>
                                <span className="border-b-2 font-semibold">Giá:</span>
                                <span className="ml-2 ">{ticket.price} Đ</span>
                            </p>
                            <p>
                                <span className="border-b-2 font-semibold">Trạng thái:</span>
                                <span className="ml-2 ">{ticket.status}</span>

                            </p>
                            <p>
                                <span className="border-b-2 font-semibold">Tên người dùng:</span>
                                <span className="ml-2 ">{Cookies.get('username')}</span>
                            </p>
                            <p>
                                <span className="border-b-2 font-semibold">Tên sự kiện:</span>
                                <span className={"ml-2"}> {eventMapping[ticket.eventId] || 'Không xác định'}</span>
                            </p>
                            <p>
                                <span className="border-b-2 font-semibold">Thời gian tạo :</span>
                                <span className={"ml-2 whitespace-nowrap"}> {formatDateTime(ticket.createAt)}</span>
                            </p>
                            {activeTickets.status !== "Đã hủy" && (
                                <button
                                    onClick={() => handleCancelTicket(ticket.id)}
                                    className="mt-2 py-1 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                >
                                    Hủy vé
                                </button>

                            )}
                            <button className="btn btn-primary">Nút nè!</button>
                        </div>
                    ))
                )}
            </div>
        </div>


    );
};

export default BuyList;
