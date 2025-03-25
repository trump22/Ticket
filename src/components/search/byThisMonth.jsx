import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import EventGroup from "../event/group.jsx";
import {useMemo} from "react";

const EventByMonth = () =>{
    const { month } = useParams(); // ví dụ: '2025-04'
    const allEvents = useSelector((state) => state.event.allEvents);
    //Lọc theo tháng này

    const filteredEvents = useMemo(() => {
        //!thàng thì về rỗng
        if (!month || !Array.isArray(allEvents)) return [];

        //Tách tháng
        const [year, monthNum] = month.split("-").map(Number);
        //Rturn cac event da loc
        return allEvents.filter((event) => {
            if (!event.startTime) return false;

            const eventDate = new Date(event.startTime);
            const eventYear = eventDate.getFullYear();
            const eventMonth = eventDate.getMonth() + 1;

            if (eventYear === year && eventMonth === monthNum) {return true};
            return false;
        });

    }, [month, allEvents]);
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 capitalize">
                Sự kiện trong tháng: {month}
            </h1>
            <EventGroup categoryName={`Tháng ${month}`} events={filteredEvents}/>
        </div>
    )
}
export default EventByMonth;