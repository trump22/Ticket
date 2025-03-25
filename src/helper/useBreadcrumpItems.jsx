import { useLocation } from "react-router-dom";

const BREADCRUMB_MAP = {
    ticket: {
        _label: "Vé",
        tab: "Vé đã mua",
        sold: "Vé đã bán"
    },
    profile: "Chỉnh sửa thông tin tài khoản",
    event: {
        _label: "Sự kiện",
        create: "Tạo sự kiện",
    },
    myevent: "Sự kiện của tôi"
};
//Ham lay tu map (_label se thay the ticket khi ghep vao ) _label =Ve -> /ticket/purchased thanh 've>ve da mua
const getLabelFromMap = (segments) => {
    let current = BREADCRUMB_MAP;
    let label = "";

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];

        if (typeof current === "string") {
            return current;
        } else if (!current[segment]) {
            return segment;
        } else {
            if (typeof current[segment] === "object") {
                if (current[segment]._label) {
                    label = current[segment]._label;
                } else {
                    label = segment;
                }
                current = current[segment];
            } else if (typeof current[segment] === "string") {
                label = current[segment];
                current = current[segment];
            } else {
                label = segment;
            }
        }
    }

    if (typeof label === "string") {
        return label;
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
