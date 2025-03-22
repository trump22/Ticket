// src/routes/RouteLoader.jsx
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./index";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "../pages/NotFound";
import Home from "../pages/home.jsx"; // Đảm bảo bạn có file này

const Loading = () => (
    <div className="loading">Loading...</div>
);

const RouteLoader = () => (
    <Suspense fallback={<Loading />}>
        <Routes>
            {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
        </Routes>
        <ToastContainer position="bottom-center" />
    </Suspense>
);

export default RouteLoader;
