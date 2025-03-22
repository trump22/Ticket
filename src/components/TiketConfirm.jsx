const TicketConfirmationModal = ({ orderData, onClose, onSellTicket }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Xác nhận mua vé</h2>
                <div className="mb-4">
                    <p className="text-lg">
                        <strong>Order Detail ID:</strong> {orderData.orderDetailId}
                    </p>
                    <p className="text-lg">
                        <strong>Event ID:</strong> {orderData.eventID}
                    </p>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onSellTicket}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        Kiểm tra vé
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                        Đóng
                    </button>

                </div>
            </div>
        </div>
};
export default TicketConfirmationModal;