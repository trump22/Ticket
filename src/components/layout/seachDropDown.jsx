import searchIcon from "../../assets/images/search.png";
import { useEffect, useMemo, useRef, useState } from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const SeachDropDown = () => {
    const [searchResult, setSearchResult] = useState("");
    const dataSearch = useSelector((state) => state.event.allEvents);
    const [isFocused, setIsFocused] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    // Ẩn dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredResults = useMemo(() => {
        if (!searchResult.trim()) return [];
        const keywords = searchResult.toLowerCase().split(" ").filter(Boolean);
        return dataSearch.filter((item) => {
            const lowerItem = item.name?.toLowerCase() || "";
            return keywords.every((word) => lowerItem.includes(word));
        });
    }, [searchResult, dataSearch]);
    //Tifm theo tên
    const handleSearchSubmit = (e) => {
        e.preventDefault();


        if (searchResult.trim() !== "") {
            // Điều hướng kèm từ khóa tìm kiếm trên URL
            navigate(`/eventsearch?keyword=${encodeURIComponent(searchResult)}`);
        }
    };

    return (
        <div className="w-1x1  flex justify-center">
            <div ref={wrapperRef} className="relative w-full max-w-[376px]">
                {/* Search Box */}

                <form
                    onSubmit={handleSearchSubmit}
                    className="h-[47px] bg-white rounded-xl overflow-hidden w-full shadow-md"
                >
                    <div className="flex items-center w-full h-full  ">
                        <img src={searchIcon} alt="Search" className="w-6 h-6 md:w-8 md:h-8"/>
                        <input
                            type="text"
                            placeholder="Bạn tìm gì hôm nay?"
                            value={searchResult}
                            onChange={(e) => setSearchResult(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            className="flex-1 outline-none border-none text-black/70 text-sm md:text-base font-normal font-['Inter'] px-2"
                        />
                        <div className="hidden sm:block h-6 w-px bg-gray-300 mx-2 "/>
                        <button
                            className="text-black text-sm md:text-base font-['Inter'] px-4 md:px-4 py-1 mr-1 md:mr-3
                            whitespace-nowrap rounded-xl h-full

                            bg-transparent hover:bg-gray-100 transition  "
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </form>
            {/* Dropdown kết quả */}
            {isFocused && filteredResults.length > 0 && (
                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                        {filteredResults.map((item, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
                                onClick={() => {
                                    setSearchResult(item.name);
                                    setIsFocused(false);
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SeachDropDown;
