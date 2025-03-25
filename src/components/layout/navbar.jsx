import { useState, useEffect } from 'react';
import discountIcon from '../../assets/images/discountw.png';
import cartIcon from '../../assets/images/cartw.png';
import vnFlag from '../../assets/images/vnflag.png';
import logout from '../../assets/images/logout.png';
import axios from 'axios';
import gmail from '../../assets/svgs/Gmail 1.png';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/tokenSlice.js';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import SeachDropDown from "./seachDropDown.jsx";
import instance from "../../services/axios.js";
import {clearImgUrl, clearUsername, setImgUrl, setUsername} from "../../store/authSlice.js";
import {clearAllCookies} from "../../helper/removeAllCookie.js";

const Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
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

    const navigate = useNavigate();

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
            const response = await instance.post(
                '/api/Authen/Register',
                data,
                {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Response dang ki:", response.data);

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

                // cập nhật khi có dữ liệu từ API
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
            const response = await instance.get('/api/User/GetUserById', {
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
            console.log("user la ", user);
            Cookies.set('user', user, { expires: 7 });

            Cookies.set('username', user.name, { expires: 7 });
            Cookies.set('phonenumber', user.phoneNumber, { expires: 7 });
            Cookies.set('email', user.email, { expires: 7 });
            Cookies.set('dob',user.dob,{expires:7});
            // thêm dòng này
            Cookies.set("imgUrl", user.imageUrl, { expires:7 });

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
        clearAllCookies();
        dispatch(clearUsername());
        dispatch(clearImgUrl());
        // Đưa về trạng thái chưa đăng nhập
        setDisplayName("Đăng nhập");
        navigate('/')

    };
    //Alert thông báo vui lòng đăng nhập
    useEffect(() => {
        if (location.state?.alertMessage) {
            alert(location.state.alertMessage); // hoặc toast, modal, v.v.
        }
    }, [location]);


    return (
        <div>
            {/* HEADER */}
            <header className="bg-[#ca9bf6] h-20 flex items-center px-8">
                {/* Logo + Link trang chủ */}
                <div>
                    <Link to="/" className="text-3xl font-['Inter'] font-normal mr-8 ml-9">
                        ticketbox
                    </Link>
                </div>

                {/* search Bar */}
                <SeachDropDown />

                {/* Các nút hành động */}
                <div className="flex items-center ml-8 space-x-6">
                    <Link to="/event/create">
                        <button className="ml-8 border border-white rounded-3xl px-4 py-2 hover:bg-white/20">
                            Tạo sự kiện
                        </button>
                    </Link>


                    <div className="ml-8 flex items-center">
                        <img
                            src={discountIcon}
                            alt="Ticket"
                            className="w-[33.42px] h-[33.42px]"
                        />
                        <Link to="/ticket/tab">
                            <button className="text-white text-base font-normal font-['Inter'] whitespace-nowrap">
                                Vé đã mua
                            </button>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <img
                            src={cartIcon}
                            alt="Sale"
                            className="w-[33.42px] h-[33.42px]"
                        />

                        <button className="text-white text-base font-normal font-['Inter'] whitespace-nowrap ">
                            Bán vé
                        </button>

                        {/* PHẦN XỬ LÝ HIỂN THỊ: nếu displayName === "Đăng nhập" => nút login, register, ngược lại => dropdown */}
                        <div className="ml-[30px]">
                            {displayName === "Đăng nhập" ? (
                                <div className="flex items-center">
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
                            ) : (
                                // Nếu đã đăng nhập -> dropdown on hover với tên user
                                <div className="dropdown dropdown-hover">
                                    {/* Nút hiển thị tên user */}
                                    <div
                                        tabIndex={0}
                                        className="flex items-center text-white cursor-pointer"
                                    >
                                        {displayName}
                                        <svg

                                            width="10"
                                            height="8"
                                            viewBox="0 0 10 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mt-1 ml-2"
                                        >
                                            <path d="M5 8L0.67 0.5L9.33 0.5L5 8Z" fill="white" />
                                        </svg>

                                    </div>

                                    {/* Dropdown menu */}
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-box z-2 w-44 p-2 shadow-sm "
                                    >
                                        <li>
                                            <Link to="user/info"> <img src={discountIcon} alt="ticket"
                                                                      className="w-6 h-6"/> Tài khoản của tôi </Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout}><img src={logout} alt="logout"
                                                                                className="w-6 h-6"/>Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Account Icon */}
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
            <nav className="bg-black py-2 px-8 flex space-x-8 text-white">
                <Link to="/" className="hover:underline cursor-pointer">
                    Trang chủ
                </Link>
                <Link to="/eventtype/sknt" className="hover:underline cursor-pointer">
                    Sân khấu & Nghệ thuật
                </Link>
                <Link to="/eventtype/thethao" className="hover:underline cursor-pointer">
                    Thể thao
                </Link>
                <Link to="/eventtype/khac" className="hover:underline cursor-pointer">
                    Khác
                </Link>
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
        </div>
    );
};

export default Navbar;
