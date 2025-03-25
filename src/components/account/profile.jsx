import { Input, Button } from "@headlessui/react";
import clsx from 'clsx'
import instance from "../../services/axios.js";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {setImgUrl, setUsername} from "../../store/authSlice.js";

const fields = [
    { label: "Họ tên", name: "Name", type: "text", placeholder: "Nhập họ tên" },
    { label: "Email", name: "email", type: "email", placeholder: "Nhập email" },
    { label: "Số điện thoại", name: "PhoneNumber", type: "tel", placeholder: "Nhập số điện thoại" },
    { label: "Giới tính", name: "gender" },
    { label: "Ngày sinh", name: "dob", type: "date", placeholder: "" },

]

const Profile = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileBackground = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImageUrl(previewUrl);
            setImagePreview(previewUrl)// Chỉ lưu đường dẫn tạm vào state
        }
    };

    const handleDropBackground = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setImageUrl(previewUrl);
        }

    };

    const handleDragOverBackground = (e) => {
        e.preventDefault(); // Cho phép drop
    };

    const dispatch = useDispatch();
    const [showMessage, setShowMessage] = useState("");

    const [messageType, setMessageType] = useState("success");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        //Gender = string
        if (data.gender === "true") {
            data.gender = true;
        } else {
            data.gender = false;
        }
        try {
            const token = Cookies.get('token');

            // ⏫ Bước 1: Upload ảnh lên trước (nếu có ảnh)
            let uploadedImageUrl = null;
            console.log("selectedFile la ", selectedFile);
            if (selectedFile) {
                const imageForm = new FormData();
                imageForm.append("file", selectedFile);
                const uploadRes = await instance.post("/api/upload/Upload", imageForm, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Upload img la ",uploadRes.data);
                uploadedImageUrl = uploadRes.data?.imageUrl;
                data.imageUrl = uploadedImageUrl;
            }

            console.log("data laf",data)

            // ✅ Bước 2: Gửi thông tin user
            const response = await instance.put("/api/User/UpdateUser", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log('Cập nhật thành công:', response.data);

            // Cập nhật redux & cookies
            if (data.Name) {
                Cookies.set("username", data.Name);
                dispatch(setUsername(data.Name));
            }

            if (uploadedImageUrl) {
                dispatch(setImgUrl(uploadedImageUrl));
                Cookies.set("imgUrl", uploadedImageUrl);
            }

            setShowMessage("Cập nhật thành công");
        } catch (error) {
            console.error("Cập nhật thất bại:", error);
            setShowMessage("Cập nhật không thành công");

            setMessageType("error");
        }
    };
    return (
        <div>
            <div className={"w-full mr-auto  px-4 md:px-2  mt-8 "}>
                <div className="mt-10 flex flex-col
                 md:flex-row gap-4 items-center md:items-start">
                    {/* Cột trái */}
                    <div
                        className={`w-full
                         sm:w-2/3 md:w-1/2 lg:w-1/3 p-6
                          flex flex-col justify-center items-center
                           gap-4 border-2 border-dashed 
                           rounded-2xl min-h-[250px] ${
                            imagePreview ? "p-0 bg-transparent border-none" : "bg-gray-50"
                        }`}
                    >
                        <label
                            htmlFor="file-upload"
                            onDragOver={handleDragOverBackground}
                            onDrop={handleDropBackground}
                            className="cursor-pointer
                             w-full h-full flex items-center
                             justify-center text-center text-gray-500"
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview"
                                     className="w-full h-full object-cover rounded-xl"/>
                            ) : (
                                <span className="text-sm">Kéo & thả ảnh vào đây hoặc nhấn để chọn ảnh</span>
                            )}
                        </label>
                        <input
                            id="file-upload"
                            name="imgUrl"
                            type="file"
                            accept="image/*"
                            onChange={handleFileBackground}
                            className="hidden"
                        />
                    </div>


                    {/* Cột phải */}
                    <div className="w-4/5 p-4">
                        <h1 className={"text-muted-foreground font-light" +
                            " text-sm text-center pb-6 "}>
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
                                                    'mt-3 block w-full rounded-lg' +
                                                    ' border-none bg-white/5 py-1.5 px-3' +
                                                    ' text-sm text-white',
                                                    'focus:outline-none data-[focus]:outline-2' +
                                                    ' data-[focus]:-outline-offset-2 ' +
                                                    'data-[focus]:outline-white/25'
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
                                                    'mt-3 block w-full rounded-lg' +
                                                    ' border-none bg-white/5 py-1.5' +
                                                    ' px-3 text-sm text-white',
                                                    'focus:outline-none data-[focus]:outline-2 ' +
                                                    'data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                )}
                                            />
                                        )}


                                    </div>
                                ))}

                            </div>
                            <div className="mt-6 flex justify-center">
                                <Button
                                    type="submit"
                                    className="rounded-xl bg-[#d2acf7]
                                     py-2 px-4 text-sm text-[#5e2e91]
                                     hover:bg-[#dabef9] hover:text-[#333333]">
                                    Hoàn Thành
                                </Button>
                            </div>
                            {showMessage && (
                                <p className={`mt-2 text-sm font-medium ${messageType === "success" ? "text-green-600" : "text-red-600"
                                }`}>
                                    {showMessage}
                                </p>
                            )}
                        </form>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default Profile;