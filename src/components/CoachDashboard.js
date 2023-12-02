import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase-config';

const CoachDashboard = () => {
    const [coachInfo, setCoachInfo] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Koç bilgilerini Firestore'dan al
        const coachRef = firestore.collection('coaches').doc('F9oDXRUGmRXG5quu6GCI');

        coachRef.get().then((doc) => {
            if (doc.exists) {
                setCoachInfo(doc.data());
            } else {
                console.log('Koç bilgisi bulunamadı');
            }
        }).catch((error) => {
            console.error('Koç bilgisi alma hatası:', error);
        });

        // Danışanları Firestore'dan al
        const usersRef = firestore.collection('users');

        usersRef.get().then((snapshot) => {
            const usersData = [];
            snapshot.forEach((doc) => {
                usersData.push(doc.data());
            });
            setUsers(usersData);
        }).catch((error) => {
            console.error('Danışan bilgileri alma hatası:', error);
        });
    }, []);

    return (
        <div>
            {/* Koç bilgileri */}
            <div>
                <h2>Koç Bilgileri</h2>
                <img src={coachInfo.photoURL} alt="Coach" />
                <p>{coachInfo.name} {coachInfo.surname}</p>
                {/* Diğer koç bilgileri */}
            </div>

            {/* Danışanlar paneli */}
            <div>
                <h2>Danışanlar</h2>
                {users.map((user) => (
                    <div key={user.age}>
                        <img src={user.photoURL} alt="User" />
                        <p>{user.displayName}</p>
                        {/* Diğer danışan bilgileri */}
                    </div>
                ))}
            </div>

            {/* Spor ve Beslenme Programları */}
            <div>
                <h2>Spor Programları</h2>
                {/* Spor programları paneli */}
            </div>

            <div>
                <h2>Beslenme Programları</h2>
                {/* Beslenme programları paneli */}
            </div>

            {/* Mesajlaşma Tuşu */}
            <button>Mesajlaşma</button>
        </div>
    );
};

export default CoachDashboard;
