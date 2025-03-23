import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home.jsx";
import NotFound from "../pages/NotFound.jsx";
import routes from "./index.jsx";
const Account = lazy(() => import("../components/layout/account.jsx"));

const RouteLoader = () => {
    const sidebarPaths = ["/profile", "/ticket/purchased","/ticket/buy"];

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {/* Group các route có sidebar */}
                <Route element={<Account />}>
                    {routes
                        .filter(({ path }) => sidebarPaths.includes(path))
                        .map(({ path, component: Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                </Route>

                {/* Các route khác */}
                {routes.map(({ path, component: Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}

                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default RouteLoader;
