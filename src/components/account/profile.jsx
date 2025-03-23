import { Input, Button } from "@headlessui/react";
import clsx from 'clsx'
import instance from "../../services/axios.js";
import Cookies from "js-cookie";


const Profile = () => {
    const fields = [
        { label: "Họ tên", name: "Name", type: "text", placeholder: "Nhập họ tên" },
        { label: "Email", name: "email", type: "email", placeholder: "Nhập email" },
        { label: "Số điện thoại", name: "PhoneNumber", type: "tel", placeholder: "Nhập số điện thoại" },
        { label: "Giới tính", name: "gender" },
        { label: "Ngày sinh", name: "dob", type: "date", placeholder: "" }
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        if (data.gender === "true") {
            data.gender = true;
        } else {
            data.gender = false;
        }
        console.log("Dữ liệu đầu vào là ", data)

        try {
            const token = Cookies.get('token'); // hoặc nơi bạn lưu token
            console.log("Token trong file nafy la ", token)
            const response = await instance.put('/api/User/UpdateUser', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Cập nhật thành công:', response.data);
            // toast.success('Cập nhật thành công!');
        } catch (error) {
            console.error('Cập nhật thất bại:', error);
            // toast.error('Có lỗi xảy ra khi cập nhật.');
        }
    };
    return (
        <div>
            <div className={"w-full mr-auto  px-4 md:px-2  mt-8 "}>
                <div className="mt-10 flex flex-col md:flex-row gap-4 items-center md:items-start">
                    {/* Cột trái */}
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 flex justify-center items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFW0NbncSWEnZ83TNSs2LnzrIvoLcDCBU2pw&s" // ảnh đại diện
                            alt="Avatar"
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white shadow-md"
                        />
                    </div>

                    {/* Cột phải */}
                    <div className="w-4/5 p-4">
                        <h1 className={"text-muted-foreground font-light text-sm text-center pb-6 "}>
                            Cung cấp thông tin của bạn
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mt-2 flex flex-wrap gap-4">
                                {fields.map((field, index) => (
                                    <div key={index} className="flex flex-col w-full sm:w-[48%]">
                                        <label
                                            className="text-sm font-medium text-muted-foreground mb-1">{field.label}</label>
                                        {field.name === "gender" ? (
                                            <select
                                                name="gender"
                                                className={clsx(
                                                    'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-white',
                                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                )}
                                            >
                                                <option value="true">Nam</option>
                                                <option value="false">Nữ</option>
                                            </select>
                                        ) : (
                                            <Input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                className={clsx(
                                                    'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-white',
                                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                )}
                                            />
                                        )}


                                    </div>
                                ))}

                            </div>
                            <div className="mt-6 flex justify-center">
                                <Button
                                    type="submit"
                                    className="rounded-xl bg-[#d2acf7] py-2 px-4 text-sm text-[#5e2e91] hover:bg-[#dabef9] hover:text-[#333333]">
                                    Hoàn Thành
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Profile;