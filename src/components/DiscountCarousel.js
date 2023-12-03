import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DiscountCarousel.css';

const DiscountCarousel = () => {
    const discountData = [
        {
            gym: 'TRİO FITNESS',
            discount: 'Anlaşmalı fitness-beslenme paketi alana %20 indirim!',
            image: 'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?q=80&w=2862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            // Diğer bilgiler
        },
        {
            gym: 'CrossFit',
            discount: 'Üye olanlara ilk ay %30 indirim!',
            image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D'
            // Diğer bilgiler
        },
        // Diğer spor salonları
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <div className="discount-carousel">
            <h2>Anlaşmalı Spor Salonlarından İndirimler</h2>
            <Slider {...settings}>
                {discountData.map((discount, index) => (
                    <div key={index} className="discount-card">
                        <img
                            src={discount.image}
                            alt={discount.gym}
                            width="800" // Resim genişliği
                            height="400" // Resim yüksekliği
                        />
                        <h3>{discount.gym}</h3>
                        <p>{discount.discount}</p>
                        {/* Diğer indirim bilgileri */}
                    </div>
                ))}
            </Slider>

        </div>
    );
};



export default DiscountCarousel;
