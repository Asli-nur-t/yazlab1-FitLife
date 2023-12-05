import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './CoachCarousel.css';
import { firestore } from '../firebase-config';
import {collection , getDocs} from "firebase/firestore"; // Firebase bağlantı dosyanızın yolunu doğru şekilde belirtmelisiniz

const CoachCarousel = () => {
    const [coachesData, setCoachesData] = useState([]);

    useEffect(() => {
        const fetchCoachesData = async () => {
            try {
                const coachesCollection = collection(firestore,'coaches');
                const snapshot = await getDocs(coachesCollection);

                const coaches = snapshot.docs.map(doc => doc.data());
                setCoachesData(coaches);
            } catch (error) {
                console.error('Error fetching coaches: ', error);
            }
        };

        fetchCoachesData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
    };



    const handlePackageSelection = (selectedCoach) => {
        // Seçilen koçluk paketinin işlenmesi
        console.log('Seçilen koçluk paketi:', selectedCoach);

        // İşlenecek diğer adımları buraya ekleyebilirsiniz.
        // Örneğin, seçilen koçluk paketiyle ilgili ek işlemler yapılabilir.
        // Seçilen paketin ID'si, adı, fiyatı gibi bilgiler alınabilir ve başka yerlerde kullanılabilir.
    };

    return (
        <div className="coach-carousel">
            <h2 style={{ color: 'white', fontWeight: 'bold' }}>Koçluk Paketleri</h2>
            <Slider {...settings}>
                {coachesData.map((coach, index) => (
                    <div key={index} className="coach-card">
                        <h3>{coach.name}</h3>
                        <p>{coach.profession}</p>
                        <p>{`${coach.price.toLocaleString('tr-TR')} ₺/saat`}</p>
                        <button onClick={() => handlePackageSelection(coach)} className="transparent-button">Seç</button>

                    </div>
                ))}

            </Slider>
        </div>
    );
};

export default CoachCarousel;
