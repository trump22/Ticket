// src/pages/NotFound.jsx
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-4">Trang bạn đang tìm kiếm không tồn tại.</p>
            <a
                href="/"
                className="text-blue-500 hover:text-blue-700 underline"
            >
                Quay về trang chủ
            </a>
        </div>
    );
};

export default NotFound;