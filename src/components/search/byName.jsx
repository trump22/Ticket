// src/pages/SearchPage.jsx
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import EventGroup from "../event/group.jsx";

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword") || "";

    const allEvents = useSelector((state) => state.event.allEvents);

    const filteredResults = useMemo(() => {
        if (!keyword.trim() || !Array.isArray(allEvents)) return [];

        const keywords = keyword.toLowerCase().split(" ").filter(Boolean);

        return allEvents.filter((event) => {
            const name = event.name?.toLowerCase() || "";
            return keywords.every((word) => name.includes(word));
        });
    }, [keyword, allEvents]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                Kết quả tìm kiếm cho: <span className="text-purple-600">{keyword}</span>
            </h1>

            {filteredResults.length === 0 ? (
                <p className="text-gray-500">Không tìm thấy sự kiện phù hợp.</p>
            ) : (
                <EventGroup categoryName="Kết quả" events={filteredResults} />
            )}
        </div>
    );
};

export default SearchPage;
