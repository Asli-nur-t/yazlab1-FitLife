import React from 'react';
import DiscountCarousel from "./DiscountCarousel";
import CoachCarousel from "./CoachCarousel";
const HomePage = () => {
    return (
        <div className="home-page">
            {/* Diğer içerikler */}
            <DiscountCarousel />
            <CoachCarousel/>
            {/* Diğer içerikler */}
        </div>
    );
}

export default HomePage;
