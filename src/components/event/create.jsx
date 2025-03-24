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
    const [imageUrl, setImageUrl] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [organizerName, setOrganizerName] = useState('');
    const [organizerPhone, setOrganizerPhone] = useState('');
    const [organizerEmail, setOrganizerEmail] = useState('');
    const [organizerLocation, setOrganizerLocation] = useState('');
    const [organizerLogoUrl, setOrganizerLogoUrl] = useState('');

    // State thông báo thành công và lỗi
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Tạo payload theo cấu trúc API yêu cầu
        const data = {
            eventName,
            location,
            eventType,
            startTime, // Nếu cần convert sang ISO string: new Date(startTime).toISOString()
            endTime,   // new Date(endTime).toISOString()
            status,
            imageUrl,
            logoUrl,
            organizerName,
            organizerPhone,
            organizerEmail,
            organizerLocation,
            organizerLogoUrl
        };

        try {
            // Lấy token từ cookies (hoặc có thể từ Redux)
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
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Tạo Event & Organizer</h1>

            {successMessage && (
                <p className="text-green-500 mb-4">{successMessage}</p>
            )}
            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Event Info */}
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

                <div>
                    <label className="block text-sm font-medium mb-1">Image URL (Event)</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Logo URL (Event)</label>
                    <input
                        type="text"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
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

                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Tạo Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
