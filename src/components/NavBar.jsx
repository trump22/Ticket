import { useState, useEffect } from 'react';
import searchIcon from '../assets/images/search.png';
import discountIcon from '../assets/images/discountw.png';
import cartIcon from '../assets/images/cartw.png';
import vnFlag from '../assets/images/vnflag.png';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setToken } from '../store/tokenSlice';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [dob, setDob] = useState("2025-03-18"); // Giá trị mặc định
    const [gender, setGender] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [loginShow, setLoginShow] = useState("");
    const [registerShow, setRegisterShow] = useState("");
    const [username, setUserName] = useState("");
    const [userphone, setUserPhone] = useState("");


    useEffect(() => {
        if (Cookies.get('username') === undefined) {
            setLoginShow("Đăng nhập");
            setRegisterShow("Đăng kí");
        } else {
            setLoginShow(Cookies.get('username'));
            setRegisterShow(Cookies.get('userphone'));
        }
    }, [username, userphone]);
    const handleBeforeLogin = () => {
        setLoginShow("Đăng nhập");
        setRegisterShow("Đăng kí");
    };


    const handleLoginClick = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false); // Đảm bảo modal đăng ký không mở cùng lúc
    };

    const handleRegisterClick = () => {
        setShowRegisterModal(true);
        setShowLoginModal(false); // Đảm bảo modal đăng nhập không mở cùng lúc
    };
    //aa
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
            // Gửi dữ liệu lên server
            const response = await axios.post('http:/http://13.239.139.152:8080/api/Authen/Register', data, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response:", response.data);
            if (response.status === 200) {
                setSuccessMessage("Đăng kí tài khoản thành công <3");
                setError("");
            } else {
                setError("Đăng ký thất bại, vui lòng thử lại!");
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            console.error("Dữ liệu:", data);
            setError("Đăng ký thất bại, vui lòng thử lại!");
            setSuccessMessage("");
        }
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();

        const data = {
            phonenumberOrEmail: emailOrPhone,
            password
        };

        try {
            // Gửi dữ liệu lên server   
            const response = await axios.post('http://13.239.139.152:8080/api/Authen/Login', data, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response:", response.data);

            if (response.status === 200) {
                setSuccessMessage("Đăng nhập tài khoản thành công <3");
                setError("");
                dispatch(setToken(response.data.token));
                Cookies.set('token', response.data.token, { expires: 7 });
                handleLoginSuccess(Cookies.get('token'));
            } else {
                handleBeforeLogin();
                setError("Đăng nhập thất bại, vui lòng thử lại!");
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            setError("Đăng nhập thất bại, vui lòng thử lại!");
            setSuccessMessage("");
        }
    };
    axios.interceptors.request.use(
        (config) => {
            // Kiểm tra và log token trong header Authorization (nếu có)
            console.log('Authorization Header:', config.headers.Authorization);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    const getUserById = async (tokenValue) => {
        try {
            const response = await axios.get('http://http://13.239.139.152/:8080/api/User/GetUserById', {
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

    const handleLoginSuccess = async (tokenValue) => {
        try {
            const user = await getUserById(tokenValue);
            setUserName(user.name);
            setUserPhone(user.phoneNumber);
            Cookies.set('username', user.name, { expires: 7 });
            Cookies.set('userphone', user.phoneNumber, { expires: 7 });
            Cookies.set('userid', user.id, { expires: 7 });
            setShowLoginModal(false);


        } catch (error) {
            console.error("Lỗi getUserById:", error);
            // Xử lý lỗi nếu cần
        }
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
                        <Link to="/ticket/list"> <button className="text-white text-base font-normal font-['Inter']">Vé đã mua</button></Link>
                    </div>

                    <div className="flex items-center">
                        <img src={cartIcon} alt="Sale" className="w-[33.42px] h-[33.42px]" />
                        <button className="text-white text-base font-normal font-['Inter']">Bán vé</button>
                        <div className="flex items-center ml-[30px]">
                            <button
                                onClick={handleLoginClick}
                                className="w-[110px] h-[33px] flex items-center justify-center text-white text-base font-normal font-['Inter']"
                            >
                                {loginShow}
                            </button>
                            <div className="h-6 w-px bg-white mx-1" />
                            <button
                                onClick={handleRegisterClick}
                                className="w-[88px] h-[33px] flex items-center justify-center text-white text-base font-normal font-['Inter']"
                            >
                                {registerShow}
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
                <div className="hover:underline cursor-pointer">

                    <Link to="/">Trang chủ</Link>
                </div>

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

                        <div className="max-w-md mx-auto p-6 space-y-6">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {/* Close Icon */}
                                    <button className="p-2">
                                        <svg width="32" height="32" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 8L8 16" stroke="#828BA0" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 8L16 16" stroke="#828BA0" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <h2 className="text-xl font-semibold">Đăng nhập</h2>
                                </div>

                                {/* Decorative SVG (example; replace with your actual SVG as needed) */}


                            </div>


                            {/* Login Form */}
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
                                {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
                                {error && <p className="text-red-500 mb-2">{error}</p>}
                                <button
                                    type="submit"


                                    className="w-full py-3 bg-blue-600 text-white rounded disabled:opacity-50"
                                >
                                    Tiếp tục
                                </button>
                            </form>

                            {/* Forgot Password Link */}
                            <div className="text-center">
                                <p className="text-sm text-blue-600 cursor-pointer">Quên mật khẩu?</p>
                            </div>

                            {/* Register Link */}
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-sm text-gray-600">Chưa có tài khoản?</p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    onClick={handleRegisterClick}
                                >
                                    Tạo tài khoản ngay
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="flex items-center my-4">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-2 text-gray-500">Hoặc</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            {/* Google Sign-In Button */}
                            <div className="flex justify-center">
                                <iframe
                                    src="https://accounts.google.com/gsi/button?type=icon&text=signin_with&shape=circle&size=large&theme=filled&class=g_id_signin&is_fedcm_supported=false&client_id=1087811486846-ukuold92cnmo9nd0u9apiv9bv4h6b0cl.apps.googleusercontent.com&iframe_id=gsi_134253_202900&cas=RiLtWu0XsRwceHeVnOKFHoGW2t%2BQb%2FnvC%2F6o2cIJLpM&hl=vi-VN"
                                    className="w-16 h-11 border-0"
                                    title="Nút Đăng nhập bằng Google"
                                    allow="identity-credentials-get"
                                ></iframe>
                            </div>

                            {/* Commitment Text */}
                            <div className="text-xs text-center text-gray-500">
                                Bằng việc tiếp tục, bạn đã đọc và đồng ý với{' '}
                                <a href="https://ticketbox.vn/customer-terms-of-use" target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                    Điều khoản sử dụng
                                </a>{' '}
                                và{' '}
                                <a href="https://ticketbox.vn/information-privacy-policy" target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                    Chính sách bảo mật thông tin cá nhân
                                </a>{' '}
                                của Ticketbox
                            </div>
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
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên" className="w-full border p-2 rounded-md" />
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
            )}
        </div>
    );
};

export default NavBar;
