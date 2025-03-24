import React, { useEffect } from "react";

const Settings = React.lazy(() => import('../account/settings.jsx'),)
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Cookies from "js-cookie";
import { setUsername, clearUsername } from "../../store/authSlice.js";
const accountTitles = [
    { path: "/profile", label: "Thông tin tài khoản" },
    { path: "/ticket/purchased", label: "Vé đã đặt" },
];

const AccountLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const dispatch = useDispatch();
    let title = "Thông tin tài khoản"; // default
    //startsWith return true or false
    for (const item of accountTitles) {
        if (currentPath.startsWith(item.path)) {
            title = item.label;
            break;
        }
    }


    useEffect(() => {
        const checkUsername = () => {
            const usernameFromCookie = Cookies.get("username");
            if (usernameFromCookie) {
                dispatch(setUsername(usernameFromCookie));
            } else {
                dispatch(clearUsername());
            }
        };

        // Kiểm tra lần đầu
        checkUsername();

        // Theo dõi thay đổi cookies mỗi vài giây (nếu bạn không có hệ thống theo dõi cookies)
        const interval = setInterval(checkUsername, 2000);

        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <div>
            <div className="flex flex-col md:flex-row w-full">

                {/* Cột trái  */}
                {/*{!shouldHideSidebar && (*/}
                <div className="w-full md:w-[30%] p-4">
                    <div className="px-4 md:px-2 mt-4 md:mt-8">
                        <Settings />
                    </div>
                </div>
                {/*)}*/}


                {/* Cột phải  */}
                <div className="w-full md:w-[70%] px-4 md:px-6 pt-2">
                    <div className="px-4 md:px-2 mt-4 md:mt-8">
                        <h1 className={"font-bold " +
                            "text-white pb-1 border-b-2" +
                            " border-b-white " +
                            "mb-2 text-2xl px-4 md:px-2"}>
                            {title}
                        </h1>
                    </div>
                    <Outlet />
                </div>
            </div>

            {/* Viền  nội dung thêm bên dưới */}
            <div className="w-full md:w-[90%] mx-auto border-t-2 border-[#d2acf7] mt-8 px-4 md:px-6">
                <h2 className="text-base md:text-lg font-semibold">Thông tin thêm</h2>
                <p className="text-sm md:text-base text-muted-foreground mt-2">
                    Film content
                </p>
            </div>

        </div>
    )
}
export default AccountLayout