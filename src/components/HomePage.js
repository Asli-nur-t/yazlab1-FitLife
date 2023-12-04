import React from 'react';
import DiscountCarousel from "./DiscountCarousel";
import CoachCarousel from "./CoachCarousel";
import './alternative.css';
const HomePage = () => {
    return (

        <div className="home-page">
            <div className="title">
                <h1>Fitlife</h1>
                <h2 className="slogan">Yaşamınızı Forma Sokun, Enerjinizi Yükseltin!</h2>
            </div>
            {/* Diğer içerikler */}
            <DiscountCarousel />
            <CoachCarousel/>
            {/* Diğer içerikler */}
        </div>

    );
}

export default HomePage;
