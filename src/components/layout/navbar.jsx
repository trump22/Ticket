import { useState, useEffect } from 'react';
import discountIcon from '../../assets/images/discountw.png';
import cartIcon from '../../assets/images/cartw.png';
import vnFlag from '../../assets/images/vnflag.png';
import axios from 'axios';
import gmail from '../../assets/svgs/Gmail 1.png';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/tokenSlice.js';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Searchbar from "./searchbar.jsx";
import instance from "../../services/axios.js";

const Navbar = () => {
    const dispatch = useDispatch();

    // ----- State liên quan đến modal đăng nhập / đăng ký -----
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    // ----- State form đăng ký -----
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [dob, setDob] = useState("2025-03-18");
    const [gender, setGender] = useState(true);
    const [imageUrl, setImageUrl] = useState("");

    // ----- State form đăng nhập -----
    const [emailOrPhone, setEmailOrPhone] = useState("");

    // ----- State hiển thị thông báo -----
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    // Tên hiển thị trên Navbar (nếu chưa login => “Đăng nhập”, nếu login => “username”)
    const [displayName, setDisplayName] = useState("Đăng nhập");

    // Mỗi khi mount hoặc username trong cookie thay đổi -> cập nhật lại displayName
    useEffect(() => {
        const savedUsername = Cookies.get('username');
        if (savedUsername) {
            setDisplayName(savedUsername);
        } else {
            setDisplayName("Đăng nhập");
        }
    }, []);

    // Chuyển modal sang đăng nhập
    const switchToLoginModal = () => {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };

    // ========================= MỞ MODAL =========================
    const handleLoginClick = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false);
    };
    const handleRegisterClick = () => {
        setShowRegisterModal(true);
        setShowLoginModal(false);
    };

    // ========================= ĐĂNG KÝ =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            phoneNumber,
            email,
            password,
            rePassword,
            dob,
            gender,
            imageUrl
        };

        try {
            const response = await axios.post(
                'http://13.239.139.152:8080/api/Authen/Register',
                data,
                {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Response:", response.data);

            if (response.status === 200) {
                setSuccessMessage("Đăng kí tài khoản thành công! Mời bạn đăng nhập.");
                setError("");
                // Tự động chuyển modal sang đăng nhập
                switchToLoginModal();
            } else {
                setError("Đăng ký thất bại, vui lòng thử lại!");
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            setError("Đăng ký thất bại, vui lòng thử lại!");
            setSuccessMessage("");
        }
    };

    // ========================= ĐĂNG NHẬP =========================
    const handleSubmit1 = async (e) => {
        e.preventDefault();

        const data = {
            phonenumberOrEmail: emailOrPhone,
            password
        };

        try {
            const response = await instance.post('/api/Authen/Login', data, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response:", response.data);

            if (response.status === 200) {
                setSuccessMessage("Đăng nhập tài khoản thành công <3");
                setError("");

                // Lưu token vào Redux
                dispatch(setToken(response.data.token));

                // Lưu token vào cookie
                Cookies.set('token', response.data.token, { expires: 7 });

                // Lấy thông tin user
                handleLoginSuccess(response.data.token);
            } else {
                setError("Đăng nhập thất bại, vui lòng thử lại!");
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            setError("Đăng nhập thất bại, vui lòng thử lại!");
            setSuccessMessage("");
        }
    };

    // Interceptor để debug token
    axios.interceptors.request.use(
        (config) => {
            console.log('Authorization Header:', config.headers.Authorization);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Gọi API lấy thông tin user
    const getUserById = async (tokenValue) => {
        try {
            const response = await axios.get('http://13.239.139.152:8080/api/User/GetUserById', {
                headers: {
                    'Authorization': `Bearer ${tokenValue}`,
                    'Accept': '*/*'
                }
            });
            return response.data; // Trả về thông tin người dùng
        } catch (error) {
            console.error("Lỗi khi gọi getUserById:", error);
            throw error;
        }
    };

    // Sau khi đăng nhập thành công
    const handleLoginSuccess = async (tokenValue) => {
        try {
            const user = await getUserById(tokenValue);
            // Lưu username vào cookie
            Cookies.set('username', user.name, { expires: 7 });

            // Cập nhật tên hiển thị
            setDisplayName(user.name);

            // Đóng modal đăng nhập
            setShowLoginModal(false);
        } catch (error) {
            console.error("Lỗi getUserById:", error);
        }
    };

    // ========================= LOGOUT (tuỳ chọn) =========================
    const handleLogout = () => {
        // Xoá cookie
        Cookies.remove('token');
        Cookies.remove('username');
        // Đưa về trạng thái chưa đăng nhập
        setDisplayName("Đăng nhập");
    };

    return (
        <div>
            {/* HEADER */}
            <header className="bg-[#ca9bf6] h-20 px-4 md:px-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-2xl font-semibold">ticketbox</Link>
                    <Searchbar/>
                </div>

                <div className="flex items-center ml-8 space-x-6 overflow-hidden">
                    <button
                        className="ml-8 border border-white rounded-3xl px-4 py-2 hover:bg-white/20 whitespace-nowrap">
                        Tạo sự kiện
                    </button>

                    {/* Vé đã mua - ẩn khi màn hình quá rộng */}
                    <div className="ml-8 hidden xl:flex items-center shrink-0">
                        <img src={discountIcon} alt="Ticket" className="w-[33.42px] h-[33.42px]"/>
                        <Link to="/ticket/list">
                            <button className="text-white text-base font-normal font-['Inter'] whitespace-nowrap">
                                Vé đã mua
                            </button>
                        </Link>
                    </div>

                    {/* Bán vé - ẩn khi màn hình quá rộng */}
                    <div className="hidden xl:flex items-center shrink-0">
                        <img src={cartIcon} alt="Sale" className="w-[33.42px] h-[33.42px]"/>
                        <button className="text-white text-base font-normal font-['Inter'] whitespace-nowrap">
                            Bán vé
                        </button>
                    </div>


                    {/* Tên user / Đăng nhập */}
                    <div className="ml-2">
                        {displayName === "Đăng nhập" ? (
                            <div className="flex space-x-2 text-sm">
                                <button onClick={handleLoginClick}>Đăng nhập</button>
                                <span className="text-white">|</span>
                                <button onClick={handleRegisterClick}>Đăng ký</button>
                            </div>
                        ) : (
                            <div className="dropdown dropdown-hover text-sm">
                                <div tabIndex={0} className="flex items-center text-white cursor-pointer">
                                    {displayName}
                                    <svg width="10" height="8" className="ml-1 mt-1" viewBox="0 0 10 8" fill="none">
                                        <path d="M5 8L0.67 0.5L9.33 0.5L5 8Z" fill="white"/>
                                    </svg>
                                </div>
                                <ul tabIndex={0}
                                    className="dropdown-content menu bg-base-100 rounded-box w-48 shadow z-10">
                                    <li><Link to="/profile">Tài khoản của tôi</Link></li>
                                    <li>
                                        <button onClick={handleLogout}>Đăng xuất</button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Quốc kỳ */}
                    <div className="ml-2 flex items-center space-x-1">
                        <img src={vnFlag} alt="VN Flag" className="w-6 h-6"/>
                        <svg width="10" height="8" className="mt-1" viewBox="0 0 10 8" fill="none">
                            <path d="M5 8L0.67 0.5L9.33 0.5L5 8Z" fill="white"/>
                        </svg>
                    </div>
                </div>
            </header>

            <nav className="bg-black px-4 md:px-8 py-2 flex flex-wrap justify-start md:space-x-8 text-sm text-white">
                <Link to="/" className="hover:underline">Trang chủ</Link>
                <span className="hover:underline cursor-pointer">Sân khấu & Nghệ thuật</span>
                <span className="hover:underline cursor-pointer">Thể thao</span>
                <span className="hover:underline cursor-pointer">Khác</span>
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

                        <div className="max-w-md mx-auto p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">

                                    <h2 className="text-xl font-semibold">Đăng nhập</h2>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit1} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nhập email hoặc số điện thoại"
                                        value={emailOrPhone}
                                        onChange={(e) => setEmailOrPhone(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                {successMessage && (
                                    <p className="text-green-500 mb-2">{successMessage}</p>
                                )}
                                {error && <p className="text-red-500 mb-2">{error}</p>}

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 text-white rounded disabled:opacity-50"
                                >
                                    Tiếp tục
                                </button>
                            </form>

                            <div className="text-center">
                                <p className="text-sm text-blue-600 cursor-pointer">
                                    Quên mật khẩu?
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <p className="text-sm text-gray-600">Chưa có tài khoản?</p>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    onClick={handleRegisterClick}
                                >
                                    Tạo tài khoản ngay
                                </button>
                            </div>

                            <div className="flex items-center my-4">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-2 text-gray-500">Hoặc</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            <div className="flex justify-center">
                                {/* Nút Đăng nhập Google (demo) */}
                                <img
                                    src={gmail}
                                    alt="Google Logo"
                                    title="Đăng nhập bằng Google"
                                    className="w-10 h-10 rounded-full border border-gray-300 p-1 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        // Xử lý sự kiện khi người dùng click vào logo Google
                                        console.log('Nhấn đăng nhập Google');
                                        // Ví dụ: gọi hàm handleGoogleLogin() hay mở link...
                                    }}
                                />
                            </div>

                            <div className="text-xs text-center text-gray-500">
                                Bằng việc tiếp tục, bạn đã đọc và đồng ý với{' '}
                                <a
                                    href="https://ticketbox.vn/customer-terms-of-use"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    Điều khoản sử dụng
                                </a>{' '}
                                và{' '}
                                <a
                                    href="https://ticketbox.vn/information-privacy-policy"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    Chính sách bảo mật thông tin cá nhân
                                </a>{' '}
                                của Ticketbox
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Modal đăng ký */}
            {
                showRegisterModal && (
                    <div className="modal modal-open bg-black/50 backdrop-blur-sm">
                        <div className="modal-box relative" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => setShowRegisterModal(false)}
                            >
                                ✕
                            </button>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nhập tên"
                                    className="w-full border p-2 rounded-md"
                                />
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Nhập số điện thoại"
                                    className="w-full border p-2 rounded-md"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Nhập email"
                                    className="w-full border p-2 rounded-md"
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu"
                                    className="w-full border p-2 rounded-md"
                                />
                                <input
                                    type="password"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
                                    placeholder="Nhập lại mật khẩu"
                                    className="w-full border p-2 rounded-md"
                                />
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    placeholder="YYYY-MM-DD"
                                    className="w-full border p-2 rounded-md"
                                />
                                <select
                                    value={gender.toString()}
                                    onChange={(e) => setGender(e.target.value === "true")}
                                    className="w-full border p-2 rounded-md"
                                >
                                    <option value="true">Nam</option>
                                    <option value="false">Nữ</option>
                                </select>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="Nhập URL hình ảnh"
                                    className="w-full border p-2 rounded-md"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                                >
                                    Gửi Dữ Liệu
                                </button>
                            </form>
                            {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
                            {error && <p className="text-red-500 mb-2">{error}</p>}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Navbar;
