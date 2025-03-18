// src/pages/HomePage.jsx
import { useState } from "react";
import axios from 'axios';

const HomePage = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [dob, setDob] = useState("2025-03-18"); // Giá trị mặc định
    const [gender, setGender] = useState(true);
    const [imageUrl, setImageUrl] = useState("");

    // Xử lý khi submit form
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
            const response = await axios.post('http://13.239.1.215:8080/api/Authen/Register', data, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            console.error("Dữ liệu:", data);
        }
    };

    return (
        <div>
            <h1>Nhập thông tin người dùng</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên" />
                    </label>
                </div>
                <div>
                    <label>
                        Phone Number:
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Nhập số điện thoại" />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu" />
                    </label>
                </div>
                <div>
                    <label>
                        Re-Password:
                        <input type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} placeholder="Nhập lại mật khẩu" />
                    </label>
                </div>
                <div>
                    <label>
                        Date of Birth:
                        <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="YYYY-MM-DD" />
                    </label>
                </div>
                <div>
                    <label>
                        Gender:
                        <select value={gender.toString()} onChange={(e) => setGender(e.target.value === "true")}>
                            <option value="true">Nam</option>
                            <option value="false">Nữ</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Image URL:
                        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Nhập URL hình ảnh" />
                    </label>
                </div>
                <button type="submit">Gửi dữ liệu</button>
            </form>
        </div>
    );
}


export default HomePage;
