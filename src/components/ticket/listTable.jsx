// src/components/TicketListTable.jsx
import React from 'react';
import Cookies from 'js-cookie';
import { formatDateTime } from '../../helper/convertDate.js';
const NotFoundTicket = React.lazy(() => import("./notFound.jsx"));

const TicketListTable = ({ tickets, eventMapping, onCancel }) => {
    // eslint-disable-next-line react/prop-types
    if (!tickets || tickets.length === 0) {
        return (
            <div >
                <NotFoundTicket />
            </div>
        );
    }

    return (
        <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-md table-zebra w-full text-white border border-white">
                    <thead className="bg-base-200 text-white">
                        <tr>
                            <th className="border border-white">ID Vé</th>
                            <th className="border border-white">Giá</th>
                            <th className="border border-white">Trạng thái</th>
                            <th className="border border-white">Tên người dùng</th>
                            <th className="border border-white">Tên sự kiện</th>
                            <th className="border border-white">Tương tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id} className="hover:bg-base-300 text-white">
                                <td className="border border-white">{ticket.id}</td>
                                <td className="border border-white">{ticket.price.toLocaleString()} đ</td>
                                <td className="border border-white">{ticket.status}</td>
                                <td className="border border-white">{Cookies.get('username')}</td>
                                <td className="border border-white">{eventMapping[ticket.eventId] || 'Không xác định'}</td>
                                <td className="border border-white">
                                    {ticket.status !== "Đã huỷ" && (
                                        <button
                                            onClick={() => onCancel(ticket.id)}
                                            className="mt-2 py-1 px-4 text-white rounded transition-colors bg-[#a24bf4] hover:bg-[#bb73f7]"
                                        >
                                            Hủy vé
                                        </button>

                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden divide-y divide-white border border-white rounded-xl overflow-hidden">
                {tickets.map((ticket, index) => (
                    <div
                        key={ticket.id}
                        className={`bg-base-200 px-2 text-white ${index !== tickets.length - 1 ? 'border-b border-white' : ''
                            }`}
                    >
                        <p><strong>ID Vé:</strong> {ticket.id}</p>
                        <p><strong>Giá:</strong> {ticket.price} Đ</p>
                        <p><strong>Trạng thái:</strong> {ticket.status}</p>
                        <p><strong>Người dùng:</strong> {Cookies.get('username')}</p>
                        <p><strong>Tên sự kiện:</strong> {eventMapping[ticket.eventId] || 'Không xác định'}</p>

                        {ticket.status !== "Đã huỷ" && (
                            <button
                                onClick={() => onCancel(ticket.id)}
                                className="mt-2 py-1 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                                Hủy vé
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default TicketListTable;