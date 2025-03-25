import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const EventGroup = React.lazy(() => import("../event/group.jsx"));

//Tao mot map de co the thay the duong ten link
//VD : '/eventype/thể thao -> '/eventtype/thethao'
const typeMap = {
    thethao: "thể thao",
    sknt: "sân khấu & nghệ thuật",
    khac: "khác",
    am:"âm nhạc",
};

const EventByTypePage = () => {
    //Cau truc path localhost/routepath/:param

    //Khai bao trong RouteLoader
    //  <Route path="/eventtype/:type" element={<EventByType />} /
    //-> param sẽ là type

    const { type } = useParams(); // ví dụ: 'thethao'
    //Lấy trong Redux (Khuyến nghị su dụng Redux Dev Tools
    const allEvents = useSelector((state) => state.event.allEvents);
    console.log("AllEventsss ma toi co ", allEvents);

    //Dùng map để chiếu xạ đến type(param)

    //Nếu params là thethao -> Thể thao -> Đã lấy đuược loại event
    const mappedType = typeMap[type];

    //Cấu trúc useMemmo :
    // const result = useMemo(() => {
    //     // tính toán phức tạp ở đây
    //     return kết_quả;
    // }, [các_giá_trị_phụ_thuộc]);
    //Sử dụng useMemmo trong trường hợp cần lọc , tisnh toán , tìm kiếm ,.. để không render lại page
    //useMemmo có tác dụng nếu giá trị trả về trong useMemmo mà không thay đổi -> không reload lại mà ghi nhớ
    //Chỉ khi các_giá_trị_phụ_thuộc thay đổi thì useMemmo mới tính toán lại

    const filteredEvents = useMemo(() => {
        if (!mappedType || !Array.isArray(allEvents)) return [];

        return allEvents.filter((event) => {
            if (!event.eventType) {
                return false;
            }
            return event.eventType.toLowerCase() === mappedType.toLowerCase();
        })
    }, [mappedType, allEvents]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 capitalize">Sự kiện: {mappedType || type}</h1>
            <EventGroup categoryName={mappedType || type} events={filteredEvents} />
        </div>
    );
};

export default EventByTypePage;
