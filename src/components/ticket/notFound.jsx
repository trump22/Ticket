const NoTicketsComponent = () => (
    <div className="flex flex-col items-center justify-center  text-center text-white px-4">

        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJtpgXK2c8oP1TYnBTCLJCUC9ObJ9g1fNiUQ&s"
            alt="Chưa có vé"
            className="w-48 h-auto mb-6"
        />
        <h2 className="text-2xl font-bold mb-4">Bạn chưa mua vé nào</h2>
        <p className="mb-6">Khám phá các sự kiện đang diễn ra và mua vé ngay!</p>
        <a
            href="/events"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
            Xem sự kiện
        </a>
    </div>
);
export default NoTicketsComponent;