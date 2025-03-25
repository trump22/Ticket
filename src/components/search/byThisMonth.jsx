import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import EventGroup from "../event/group.jsx";
import {useMemo} from "react";

const EventByMonth = () =>{

    const { month } = useParams(); // ví dụ: '2025-04'
      const allEvents = useSelector((state) => state.event.allEvents);
    const [, monthNumStr] = month.split("-");

    const monthNumber = Number(monthNumStr);
    console.log("monthNumber", monthNumber);
    //Lọc theo tháng này
    console.log("All avent trong event by month la",allEvents)
    console.log("Month param:", month);

    const filteredEvents = useMemo(() => {
        //!tháng thì về rỗng
        if (!month || !Array.isArray(allEvents)) return [];

        // Tách tháng
        const [year, monthNum] = month.split("-").map(Number);

        // Filter các event theo tháng
        const result = allEvents.filter((event) => {

            if (!event.starTime) return false;

            const eventDate = new Date(event.starTime);
            const eventYear = eventDate.getFullYear();
            const eventMonth = eventDate.getMonth() + 1;

            return eventYear === year && eventMonth === monthNum;
        });

        // Log kết quả sau lọc


        return result;
    }, [month, allEvents]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 capitalize">
                Sự kiện trong tháng {monthNumber}:
            </h1>
            <EventGroup categoryName={`Tháng ${month}`} events={filteredEvents}/>
        </div>
    )
}
export default EventByMonth;