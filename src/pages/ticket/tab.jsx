import React, { useEffect, useState } from "react";
import instance from "../../services/axios.js";
import Cookies from "js-cookie";
const TicketListTable = React.lazy(() => import("../../components/ticket/listTable.jsx"));


const TicketTabs = () => {
    const [tickets, setTickets] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const [activeTab, setActiveTab] = useState("all"); // 'all' hoặc 'cancelled'
    const token = Cookies.get("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ticketRes, eventRes] = await Promise.all([
                    instance.get("/api/OrderDetail/GetOrderDetailByUserId", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    instance.get("/api/Event/GetAllEvent", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
                setTickets(ticketRes.data || []);
                setEventsList(eventRes.data || []);
            } catch (err) {
                console.error("Lỗi khi load dữ liệu:", err);
            }
        };
        fetchData();
    }, [token]);

    const eventMapping = eventsList.reduce((map, event) => {
        map[event.id] = event.name;
        return map;
    }, {});

    const handleCancelTicket = async (ticketId) => {
        try {
            await instance.put(`/api/OrderDetail/CancelOrderDetail/${ticketId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Cập nhật lại trạng thái vé trong danh sách
            setTickets((prev) =>
                prev.map((ticket) =>
                    ticket.id === ticketId ? { ...ticket, status: "Đã huỷ" } : ticket
                )
            );
        } catch (err) {
            console.error("Lỗi hủy vé:", err);
            alert("Không thể hủy vé!");
        }
    };

    const filteredTickets =
        activeTab === "cancelled"
            ? tickets.filter((t) => t.status === "Đã huỷ")
            : tickets.filter((t) => t.status !== "Đã huỷ");

    return (
        <div className=" mx-auto px-4 md:px-2">
            <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`py-2 px-4 rounded text-black ${
                        activeTab === "all" ? "bg-[#ca9bf6] text-white" : "bg-gray-200"
                    }`}
                >
                    Vé đã mua
                </button>
                <button
                    onClick={() => setActiveTab("cancelled")}
                    className={`py-2 px-4 rounded text-black ${
                        activeTab === "cancelled" ? " bg-[#ca9bf6] text-white" : "bg-gray-200"
                    }`}
                >
                    Vé đã hủy
                </button>
            </div>

            <TicketListTable
                tickets={filteredTickets}
                eventMapping={eventMapping}
                onCancel={handleCancelTicket}
            />
        </div>
    );
};

export default TicketTabs;
