import React, { useState, useEffect } from 'react';
import { firestore ,auth } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const UserPanel = ({ userUid }) => {
    const [userData, setUserData] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [availableCoaches, setAvailableCoaches] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRef = collection(firestore, 'users');
                const userDataSnapshot = await getDocs(userRef);
                const userDataList = userDataSnapshot.docs.map((doc) => ({
                    id: doc.data().id,
                    email: doc.data().email,
                    displayName: doc.data().displayName || 'No Name',
                    age: doc.data().age || '',
                    gender: doc.data().gender || '',
                    height: doc.data().height || '',
                    weight: doc.data().weight || '',
                    photoURL: doc.data().photoURL || '',
                    VKI: doc.data().VKI || '',
                }));
                setUserData(userDataList); // Set user data to state
            } catch (err) {
                console.error('Kullanıcı verisi alınırken hata oluştu:', err);
            }
        };
        console.log(auth.currentUser.uid);
        fetchUserData();
    }, [userUid]);


    // Firestore'dan koçları alma ve uygun koçları filtreleme
    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const coachesRef = firestore.collection('coaches');
                const snapshot = await coachesRef.where('profession', '==', selectedPackage).get();
                const coaches = [];
                snapshot.forEach((doc) => {
                    const coach = doc.data();
                    if (coach.activeCap < coach.capacity) {
                        coaches.push(coach);
                    }
                });
                setAvailableCoaches(coaches);
            } catch (error) {
                console.error('Koçlar alınırken hata oluştu:', error);
            }
        };

        if (selectedPackage !== '') {
            fetchCoaches();
        }
    }, [selectedPackage]);

    // Paket seçimi
    const handlePackageSelection = (packageType) => {
        setSelectedPackage(packageType);
    };

    // Koç seçimi ve güncelleme
    const handleCoachSelection = async (coachId) => {
       // try {
         //   await firestore.collection('users').doc(userUid).update({ coachId: coachId });
          //  setUserData({ ...userData, coachId: coachId });
        //} catch (error) {
          //  console.error('Koç seçilirken hata oluştu:', error);
        //}
    };


    //if (!userData) {
     //   return <div>Loading...</div>;
    //}

    return (
        <div>

            {userData && auth.currentUser && userData.map((user) => (
                <div key={user.id}>
                    {user.id === auth.currentUser.uid && (
                        <div>
                    <h2>Merhaba, {user.displayName}!</h2>
                    <p>Kilo: {user.weight}</p>
                    <p>VKI: {user.VKI}</p>

                    <table key={user.id}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Display Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Photo</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.displayName}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                            <td>{user.height}</td>
                            <td>{user.weight}</td>
                            <td>
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={`Profile of ${user.displayName}`}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                        }}
                                    />
                                ) : (
                                    'No Photo'
                                )}
                            </td>
                            <td>
                                {/* Eylem butonları eklenebilir */}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {/* ... (Diğer içerikler) */}
                   </div>
                )}
                </div>

            ))}

            <h3>Paket Seçimi</h3>
            {/* ... (Paket seçimi butonları) */}
            {selectedPackage && (
                <div>
                    <h3>Uygun Koçlar</h3>
                    <ul>
                        {availableCoaches.map((coach) => (
                            <li key={coach.coachId}>
                                <p>{coach.name}</p>
                                <button onClick={() => handleCoachSelection(coach.coachId)}>
                                    Seç
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserPanel;
