import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleClick = () => {
        navigate('/login');
    };

    // For demonstration, the button is disabled if either field is empty.
    const isDisabled = !username || !password;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Your login logic goes here.
        console.log({ username, password });
    };

    return (
        <div onClick={handleClick} className="max-w-md mx-auto p-6 space-y-6">
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
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="64" fill="none">
                        {/* Insert your SVG paths here */}
                        <path fill="#FFD530" d="M75.538 76.358s-.678-12.34-9.182-25.508H21.221L21 57.5" />
                        {/* ...other paths */}
                    </svg>
                </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Nhập email hoặc số điện thoại"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button
                    type="submit"
                    disabled={isDisabled}
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
                <p className="text-sm text-blue-600 cursor-pointer">Tạo tài khoản ngay</p>
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
    );
};

export default LoginPage;
