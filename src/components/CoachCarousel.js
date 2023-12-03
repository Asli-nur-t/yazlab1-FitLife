import React from 'react';
import Slider from 'react-slick';
import './CoachCarousel.css';

const CoachCarousel = () => {
    const coachesData = [
        {
            name: 'İlayda Akyüz',
            specialty: 'Fitness ve Beslenme',
            price: '$50/saat',
            // Diğer bilgiler
        },
        {
            name: 'Koç Adı 2',
            specialty: 'Sadece Fitness',
            price: '$60/saat',
            // Diğer bilgiler
        },
        {
            name: 'Koç Adı 3',
            specialty: 'Sadece Beslenme',
            price: '$70/saat',
            // Diğer bilgiler
        },
        // Diğer koçlar
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="coach-carousel">
            <h2 style={{ color: 'white', fontWeight: 'bold' }}>Koçluk Paketleri</h2>
            <Slider {...settings}>
                {coachesData.map((coach, index) => (
                    <div key={index} className="coach-card">
                        <h3>{coach.name}</h3>
                        <p>{coach.specialty}</p>
                        <p>{coach.price}</p>
                        {/* Diğer koçluk paketi bilgileri */}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CoachCarousel;
