import Cookies from "js-cookie";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
    const token = Cookies.get("token");
    console.log("Token la",token)

    // Nếu không có token -> redirect về trang chủ (hoặc trang login)
    return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;