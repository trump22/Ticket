import React, { lazy, Suspense } from "react";
import EventDetails from "../components/event/detail.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home.jsx";
import NotFound from "../pages/NotFound.jsx";
import routes from "./index.jsx";

const EventByMonth = React.lazy(() =>import("../components/search/byThisMonth.jsx"))
const PrivateRoute = React.lazy(() => import("./private.jsx"))
const EventByType = React.lazy(() => import("../components/search/byType.jsx"));
const SearchPage = React.lazy(() => import("../components/search/byName.jsx"))
const Account = React.lazy(() => import("../components/layout/account.jsx"));

const RouteLoader = () => {
    const sidebarPaths = ["/user/update", "/ticket/tab", "/event/create", "/user/info"];

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {/*Bọc Private Route để khi không có token thì sẽ redirect đến home*/}
                <Route element={<PrivateRoute />}>
                    {/*Các route caafn sidebar account*/}
                    <Route element={<Account />}>
                        {routes
                            .filter(({ path }) => sidebarPaths.includes(path))
                            .map(({ path, component: Component }) => (
                                <Route key={path} path={path} element={<Component />} />
                            ))}
                    </Route>
                </Route>

                {/* Các route khác */}
                {routes.map(({ path, component: Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                <Route path="/eventmonth/:month" element={<EventByMonth />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/eventtype/:type" element={<EventByType />} />
                <Route path="/" element={<Home />} />
                <Route path="/eventsearch" element={<SearchPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default RouteLoader;
