import { useLocation } from "react-router-dom";

const BREADCRUMB_MAP = {
    ticket: {
        purchased: "Vé đã mua",
        sold: "Vé đã bán"
    },
    profile: "Thông tin tài khoản",
    sellTicket: "Bán vé",
    myevent: "Sự kiện của tôi"
};

const getLabelFromMap = (segments) => {
    let current = BREADCRUMB_MAP;

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];

        if (typeof current === "string") {
            return current;
        } else if (!current[segment]) {
            return segment;
        } else {
            current = current[segment];
        }
    }

    if (typeof current === "string") {
        return current;
    } else {
        return segments[segments.length - 1];
    }
};
export const useBreadcrumbItems = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);

    const items = pathnames.map((_, i) => {
        const segments = pathnames.slice(0, i + 1);
        return {
            href: "/" + segments.join("/"),
            label: getLabelFromMap(segments),
            isLast: i === pathnames.length - 1,
        };
    });

    return items;
};
