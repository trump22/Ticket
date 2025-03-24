// src/pages/CreateEvent.jsx
import { useState } from 'react';
import Cookies from 'js-cookie';
import instance from '../../services/axios';


const CreateEvent = () => {
    // State cho các trường nhập liệu
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [eventType, setEventType] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [status, setStatus] = useState('');

    // Các state URL / file dành cho ảnh nền & logo
    const [imageUrl, setImageUrl] = useState('');    // Giá trị sẽ gửi lên server
    const [logoUrl, setLogoUrl] = useState('');      // Giá trị sẽ gửi lên server
    const [imagePreview, setImagePreview] = useState(null); // Hiển thị preview ảnh nền
    const [logoPreview, setLogoPreview] = useState(null);   // Hiển thị preview logo

    // State thông tin tổ chức
    const [organizerName, setOrganizerName] = useState('');
    const [organizerPhone, setOrganizerPhone] = useState('');
    const [organizerEmail, setOrganizerEmail] = useState('');
    const [organizerLocation, setOrganizerLocation] = useState('');
    const [organizerLogoUrl, setOrganizerLogoUrl] = useState('');

    // State thông báo
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    // ---------------------- Drag & Drop + Chọn file: Ảnh Nền ----------------------
    const handleFileBackground = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Tạo URL tạm để hiển thị preview
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            // Tuỳ ý: Lưu base64 hoặc upload file thực tế...
            // Ở đây demo, ta giữ file local, 
            // còn server side tuỳ ý: setImageUrl(base64) hoặc setImageUrl(previewUrl)
            // Tạm thời ta chỉ setImageUrl = previewUrl
            setImageUrl(previewUrl);
        }
    };

    const handleDropBackground = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setImageUrl(previewUrl);
        }
    };

    const handleDragOverBackground = (e) => {
        e.preventDefault(); // Cho phép drop
    };

    // ---------------------- Drag & Drop + Chọn file: Logo ----------------------
    const handleFileLogo = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
            setLogoUrl(previewUrl);
        }
    };

    const handleDropLogo = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
            setLogoUrl(previewUrl);
        }
    };

    const handleDragOverLogo = (e) => {
        e.preventDefault();
    };

    // ---------------------- Submit Form ----------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Tạo payload theo cấu trúc API yêu cầu
        const data = {
            eventName,
            location,
            eventType,
            startTime,
            endTime,
            status,
            imageUrl,   // URL ảnh nền (hoặc base64 tuỳ logic)
            logoUrl,    // URL logo
            organizerName,
            organizerPhone,
            organizerEmail,
            organizerLocation,
            organizerLogoUrl
        };

        try {
            // Lấy token từ cookies
            const token = Cookies.get('token');
            const response = await instance.post(
                '/api/Event/CreateEventAndOrganizer',
                data,
                {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                setSuccessMessage("Tạo event thành công!");
                setError("");
                // Reset form nếu muốn:
                setEventName('');
                setLocation('');
                setEventType('');
                setStartTime('');
                setEndTime('');
                setStatus('');
                setImageUrl('');
                setLogoUrl('');
                setImagePreview(null);
                setLogoPreview(null);
                setOrganizerName('');
                setOrganizerPhone('');
                setOrganizerEmail('');
                setOrganizerLocation('');
                setOrganizerLogoUrl('');
            } else {
                setError("Tạo event thất bại, vui lòng thử lại!");
                setSuccessMessage("");
            }
        } catch (err) {
            console.error("Lỗi khi tạo event:", err);
            setError("Lỗi khi tạo event, vui lòng kiểm tra lại!");
            setSuccessMessage("");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-300 rounded-md shadow">
            <h1 className="text-3xl font-bold mb-4">Tạo Event &amp; Organizer</h1>

            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Upload hình ảnh */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Upload hình ảnh</h2>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Logo Sự Kiện (720x458) */}
                        <div
                            className="w-[350px] h-[400px] bg-gray-300 rounded-md flex flex-col items-center justify-center relative"
                            onDragOver={handleDragOverLogo}
                            onDrop={handleDropLogo}
                        >
                            {logoPreview ? (
                                <img
                                    src={logoPreview}
                                    alt="Logo Preview"
                                    className="object-cover w-full h-full rounded-md"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center text-gray-600">
                                    <p className="text-sm mb-2">Thêm logo sự kiện</p>
                                    <p className="text-xs text-gray-500">(720x458)</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileLogo}
                            />
                        </div>

                        {/* Ảnh nền Sự Kiện (1280x720) */}
                        <div
                            className="w-[900px] h-[400px] bg-gray-300 rounded-md flex flex-col items-center justify-center relative"
                            onDragOver={handleDragOverBackground}
                            onDrop={handleDropBackground}
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Background Preview"
                                    className="object-cover w-full h-full rounded-md"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center text-gray-600">
                                    <p className="text-sm mb-2">Thêm ảnh nền sự kiện</p>
                                    <p className="text-xs text-gray-500">(1280x720)</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileBackground}
                            />
                        </div>
                    </div>
                </div>

                {/* Thông tin Event */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tên Event</label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Địa điểm (Event)</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Loại Event</label>
                    <input
                        type="text"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Thời gian bắt đầu</label>
                        <input
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Thời gian kết thúc</label>
                        <input
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Trạng thái</label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>


                {/* Organizer Info */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tên tổ chức</label>
                    <input
                        type="text"
                        value={organizerName}
                        onChange={(e) => setOrganizerName(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Số điện thoại tổ chức</label>
                    <input
                        type="text"
                        value={organizerPhone}
                        onChange={(e) => setOrganizerPhone(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email tổ chức</label>
                    <input
                        type="email"
                        value={organizerEmail}
                        onChange={(e) => setOrganizerEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Địa chỉ tổ chức</label>
                    <input
                        type="text"
                        value={organizerLocation}
                        onChange={(e) => setOrganizerLocation(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Logo URL (Organizer)</label>
                    <input
                        type="text"
                        value={organizerLogoUrl}
                        onChange={(e) => setOrganizerLogoUrl(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Tạo Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
