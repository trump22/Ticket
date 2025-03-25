import { useState, useEffect } from 'react';
import instance from '../../services/axios';
import Cookies from 'js-cookie';

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            setError('Chưa đăng nhập!');
            setLoading(false);
            return;
        }

        instance
            .get('/api/User/GetUserById', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': '*/*',
                },
            })
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi khi lấy thông tin người dùng:", err);
                setError(err.message || 'Có lỗi xảy ra khi lấy thông tin người dùng');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600">Đang tải thông tin...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-4/5 p-4">
            <h1 className="text-muted-foreground font-light text-sm text-center pb-">Thông tin người dùng</h1>
            <div className="space-y-6">
                <h3>Tên người dùng</h3>
                <span className="mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">{user.name} </span>
            </div>
            <div className="mb-2">
                <h3>Email</h3>
                <span className="mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"> {user.email} </span>
            </div>

            <div className="mb-2">
                <h3>Số điện thoại</h3>
                <span className="mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">{user.phoneNumber} </span>
            </div>
            <div className="mb-2">
                <h3>Ngày sinh</h3>
                <span className="mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">{user.dob} </span>
            </div>
            <div className="mb-2">
                <h3>Giới tính</h3>
                <span className="mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">{user.gender ? "Nam" : "Nữ"} </span>
            </div>
            {/* Bạn có thể thêm các trường khác nếu cần */}
        </div>
    );
};

export default UserInfo;
