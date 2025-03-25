import React from "react";
const UserInfo = React.lazy(() => import("../../components/account/infor.jsx"));



const userPage = () => (
    <div>
        <UserInfo />
    </div>
)
export default userPage;