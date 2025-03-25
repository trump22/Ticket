import React, { useEffect, useState } from "react";
import instance from "../../services/axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setTickets, setEventsList, cancelTicket } from "../../store/ticketSlice.js";
const TicketListTable = React.lazy(() => import("./listTable.jsx"));

const TicketTabs = () => {
    const [activeTab, setActiveTab] = useState("all");
    const token = Cookies.get("token");
    const dispatch = useDispatch();

    const tickets = useSelector((state) => state.tickets.tickets);
    const eventsList = useSelector((state) => state.tickets.eventsList);

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
                console.log("ticket la ", ticketRes.data)
                dispatch(setTickets(ticketRes.data || []));
                dispatch(setEventsList(eventRes.data || []));
            } catch (err) {
                console.error("Lỗi khi load dữ liệu:", err);
            }
        };
        fetchData();
    }, [token, dispatch]);

    const eventMapping = eventsList.reduce((map, event) => {
        map[event.id] = event.name;
        return map;
    }, {});

    const handleCancelTicket = async (ticketId) => {
        try {
            await instance.put(`/api/OrderDetail/CancelOrderDetail/${ticketId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Cập nhật Redux
            dispatch(cancelTicket(ticketId));
        } catch (err) {
            console.error("Lỗi hủy vé:", err);
            alert("Không thể hủy vé!");
        }
    };

    let filteredTickets = [];

    if (Array.isArray(tickets)) {
        if (activeTab === "cancelled") {
            filteredTickets = tickets.filter((t) => t.status === "Đã huỷ");
        } else {
            filteredTickets = tickets.filter((t) => t.status !== "Đã huỷ");
        }
    } else {
        filteredTickets = [];
    }

    return (
        <div className="mx-auto px-4 md:px-2">
            <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`py-2 px-4 rounded text-black transition-colors duration-200 ${activeTab === "all"
                            ? "bg-[#ca9bf6] text-white"
                            : "bg-[#ca9bf6]/20 hover:bg-[#d8b7f9]"
                        }`}
                >
                    Vé đã mua
                </button>

                <button
                    onClick={() => setActiveTab("cancelled")}
                    className={`py-2 px-4 rounded text-black transition-colors duration-200 ${activeTab === "cancelled"
                            ? "bg-[#ca9bf6] text-white"
                            : "bg-[#ca9bf6]/20 hover:bg-[#d8b7f9]"
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