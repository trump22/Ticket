// routes/index.jsx
import { lazy } from "react";

//Lưu ý , các route qua đây đều chuyển qua lowercase trước( gias tri no ve lowercase) (Trong RouteLoader sẽ tu nhận chu thường)
//Mặc dù path vẫn có thể viet hoa

// Lấy tất cả các file JSX trong thư mục pages
const modules = import.meta.glob("../pages/**/*.jsx");

// Hàm xử lý path để tạo route path
const formatRoutePath = (path) => {
    // Loại bỏ ../pages và .jsx
    let routePath = path
        .replace("../pages", "")
        .replace(/\.jsx$/, "")
        .toLowerCase();

    // Xử lý các trường hợp đặc biệt
    if (routePath.endsWith("/index")) {
        routePath = routePath.replace("/index", "");
    }

    // Nếu là root path
    if (routePath === "") {
        return "/";
    }

    // Xử lý các route động (VD: [id].jsx -> :id)
    routePath = routePath.replace(/\[([^\]]+)\]/g, ":$1");

    return routePath;
};

// Sắp xếp routes để đảm bảo parent routes được xử lý trước
const sortRoutes = (routes) => {
    return routes.sort((a, b) => {
        // Đưa route "/" lên đầu
        if (a.path === "/") return -1;
        if (b.path === "/") return 1;

        // Sắp xếp theo độ dài của path (ngắn lên trước)
        return a.path.split("/").length - b.path.split("/").length;
    });
};

// Tạo routes
const routes = Object.keys(modules).map((path) => {
    const routePath = formatRoutePath(path);
    const Component = lazy(() => modules[path]());

    // Lấy tên component từ path
    const componentName = path
        .split("/")
        .pop()
        .replace(/\.jsx$/, "")
        .replace(/^\[(.+)\]$/, "$1");

    return {
        path: routePath,
        component: Component,
        name: componentName, // Hữu ích cho navigation và breadcrumbs
        // Thêm meta data nếu cần
        meta: {
            isIndex: path.endsWith("index.jsx"),
            isDynamic: path.includes("[") && path.includes("]"),
        }
    };
});

// Sắp xếp và export routes
export default sortRoutes(routes);

// Export helper function để lấy route theo path
export const getRouteByPath = (path) => {
    return routes.find(route => route.path === path);
};

// Export helper function để kiểm tra xem route có tồn tại không
export const routeExists = (path) => {
    return routes.some(route => route.path === path);
};