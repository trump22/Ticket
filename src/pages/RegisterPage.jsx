import { useState } from "react";
import ReusableModal from "./ReusableModal";

const RegisterForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState(true);
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thông tin đăng ký đã được gửi!");
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => setIsOpen(true)}
            >
                Đăng Ký
            </button>

            <ReusableModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Đăng Ký">
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
                        type="text"
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
            </ReusableModal>
        </div>
    );
};

export default RegisterForm;
