// src/pages/HomePage.jsx

import EventSlider from "../components/EventSlider";
import SliderBanner from "../components/SliderBanner";
import TrendingEvents from "../components/TrendingEvents";


const HomePage = () => {
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


export default HomePage;
