import { useState } from 'react';
import searchIcon from '../assets/images/search.png';
import discountIcon from '../assets/images/discountw.png';
import cartIcon from '../assets/images/cartw.png';
import vnFlag from '../assets/images/vnflag.png';

const NavBar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLoginClick = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false); // Đảm bảo modal đăng ký không mở cùng lúc
    };

    const handleRegisterClick = () => {
        setShowRegisterModal(true);
        setShowLoginModal(false); // Đảm bảo modal đăng nhập không mở cùng lúc
    };

    return (
        <div>
            {/* HEADER */}
            <header className="bg-[#ca9bf6] h-20 flex items-center px-8">
                <div className="text-2xl font-['Inter'] font-normal mr-8">TICKET</div>

                {/* Search Bar */}
                <div className="w-[376px] h-[47px] bg-white rounded-[13px] overflow-hidden">
                    <div className="flex items-center w-full h-full">
                        <img src={searchIcon} alt="Search" className="w-10 h-10 ml-2" />
                        <input
                            type="text"
                            placeholder="Bạn tìm gì hôm nay?"
                            className="flex-1 outline-none border-none text-black/50 text-base font-normal font-['Inter']"
                        />
                        <div className="h-6 w-px bg-gray-300 mx-2" />
                        <button className="mr-3 text-black font-['Inter']">Tìm kiếm</button>
                    </div>
                </div>

                {/* Các nút hành động */}
                <div className="flex items-center ml-8 space-x-6">
                    <button className="ml-8 border border-white rounded-3xl px-4 py-2 hover:bg-white/20">
                        Tạo sự kiện
                    </button>

                    <div className="ml-8 flex items-center">
                        <img src={discountIcon} alt="Ticket" className="w-[33.42px] h-[33.42px]" />
                        <button className="text-white text-base font-normal font-['Inter'] mr-8">
                            Vé đã mua
                        </button>
                    </div>

                    <div className="flex items-center">
                        <img src={cartIcon} alt="Sale" className="w-[33.42px] h-[33.42px]" />
                        <button className="text-white text-base font-normal font-['Inter']">Bán vé</button>
                        <div className="flex items-center ml-[30px]">
                            <button
                                onClick={handleLoginClick}
                                className="w-[110px] h-[33px] flex items-center justify-center text-white text-base font-normal font-['Inter']"
                            >
                                Đăng nhập
                            </button>
                            <div className="h-6 w-px bg-white mx-1" />
                            <button
                                onClick={handleRegisterClick}
                                className="w-[88px] h-[33px] flex items-center justify-center text-white text-base font-normal font-['Inter']"
                            >
                                Đăng kí
                            </button>
                        </div>
                    </div>

                    {/* Profile Icon */}
                    <div className="ml-6 flex items-center space-x-2 cursor-pointer">
                        <img src={vnFlag} alt="VN Flag" className="w-8 h-8" />
                        <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mt-1"
                        >
                            <path d="M5 8L0.67 0.5L9.33 0.5L5 8Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </header>

            {/* NAVIGATION TABS */}
            <nav className="bg-black py-2 px-8 flex space-x-8">
                <div className="hover:underline cursor-pointer">Nhạc sống</div>
                <div className="hover:underline cursor-pointer">Sân khấu &amp; Nghệ thuật</div>
                <div className="hover:underline cursor-pointer">Thể thao</div>
                <div className="hover:underline cursor-pointer">Khác</div>
            </nav>

            {/* Modal đăng nhập */}
            {showLoginModal && (
                <div className="modal modal-open bg-black/50 backdrop-blur-sm">
                    <div className="modal-box relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => setShowLoginModal(false)}
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold mb-4">Đăng nhập</h3>
                        <div className="flex flex-col space-y-3">
                            <input type="text" placeholder="Nhập email hoặc số điện thoại" className="input input-bordered w-full" />
                            <input type="password" placeholder="Nhập mật khẩu" className="input input-bordered w-full" />
                            <button className="btn btn-primary w-full">Tiếp tục</button>
                        </div>
                        <div className="mt-4 text-center">
                            <a href="#" className="text-sm link link-hover">
                                Quên mật khẩu?
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal đăng ký */}
            {showRegisterModal && (
                <div className="modal modal-open bg-black/50 backdrop-blur-sm">
                    <div className="modal-box relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => setShowRegisterModal(false)}
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold mb-4">Đăng ký</h3>
                        <div className="flex flex-col space-y-3">
                            <input type="text" placeholder="Họ và tên" className="input input-bordered w-full" />
                            <input type="text" placeholder="Số điện thoại" className="input input-bordered w-full" />
                            <input type="email" placeholder="Email" className="input input-bordered w-full" />
                            <input type="password" placeholder="Mật khẩu" className="input input-bordered w-full" />
                            <input type="password" placeholder="Nhập lại mật khẩu" className="input input-bordered w-full" />
                            <button className="btn btn-primary w-full">Tạo tài khoản</button>
                        </div>
                        <div className="mt-4 text-center">
                            <span className="text-sm">Bạn đã có tài khoản? </span>
                            <button onClick={handleLoginClick} className="text-blue-500 link link-hover">
                                Đăng nhập ngay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
