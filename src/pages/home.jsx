// src/pages/home.jsx
import React from "react";
const EventSlider = React.lazy(() => import("../components/home/EventSlider.jsx"));
const SliderBanner =React.lazy(() => import("../components/home/SliderBanner.jsx"));
const TrendingEvents = React.lazy(()=> import("../components/home/TrendingEvents.jsx"))
const Home = () => {
    return (
        <div className="bg-zinc-full text-white min-h-screen">
            <SliderBanner/>
            <EventSlider/>
            <TrendingEvents/>
            <TrendingEvents/>
            <TrendingEvents/>
            <TrendingEvents/>
        </div>

    );
}


export default Home;
