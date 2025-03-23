// src/pages/home.jsx

import EventSlider from "../components/home/EventSlider.jsx";
import SliderBanner from "../components/home/SliderBanner.jsx";
import TrendingEvents from "../components/home/TrendingEvents.jsx";


const Home = () => {
    return (
        <div className="bg-zinc-full text-white min-h-screen">
            <SliderBanner />
            <EventSlider />
            <TrendingEvents />
            <TrendingEvents />
            <TrendingEvents />
            <TrendingEvents />
        </div>

    );
}


export default Home;
