

const ReusableModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
                {children}
                <button
                    className="w-full bg-red-500 text-white py-2 rounded-md mt-4 hover:bg-red-600"
                    onClick={onClose}
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default ReusableModal;
