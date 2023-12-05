import React, { useState, useEffect } from 'react';
import { firestore ,auth } from '../firebase-config';
import { collection, getDocs, doc  } from 'firebase/firestore';
import CoachCarousel from "./CoachCarousel";
import './UserPanel.css';
const UserPanel = ({ userUid }) => {
    const [userData, setUserData] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [availableCoaches, setAvailableCoaches] = useState([]);
    const [newWeight, setNewWeight] = useState('');
    const [userPrograms, setUserPrograms] = useState([]);

    useEffect(() => {
        const fetchUserPrograms = async () => {
            try {
                const programsRef = collection(firestore, 'programs');
                const querySnapshot = await getDocs(programsRef); // Tüm programları al

                const programs = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();

                    // İlgili kullanıcıya ait programları filtrele
                    if (data.userId.id === userUid) {
                        programs.push({
                            id: doc.id,
                            pazartesi: data.pazartesi || '', // Pazartesi programı
                            sali: data.sali || '', // Salı programı
                            carsamba: data.carsamba || '', // Çarşamba programı
                            persembe: data.persembe || '', // Perşembe programı
                            cuma: data.cuma || '', // Cuma programı
                            cumartesi: data.cumartesi || '', // Cumartesi programı
                            pazar: data.pazar || '', // Pazar programı
                            coachId: data.coachId || '', // Koç ID'si
                            userId: data.userId || '' // Kullanıcı ID'si
                            // Diğer alanları buraya ekle
                        });
                    }
                });

                setUserPrograms(programs);
            } catch (error) {
                console.error('Error fetching user programs: ', error);
            }
        };

        fetchUserPrograms();



        fetchUserPrograms();
    }, [userUid]);


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

    const handleWeightUpdate = async () => {
        try {
            const userDocRef = firestore.doc(`users/${userUid}`); // Kullanıcı dökümanı referansını alın

            const userDoc = await userDocRef.get(); // Kullanıcı belgesini al

            if (userDoc.exists) {
                const userData = userDoc.data();

                // Yeni kilo verisini alırken eski VKI bilgisini de kullanabilirsiniz
                const updatedVKI = calculateVKI(newWeight, userData.height);

                // Yeni veri objesini oluşturun
                const updatedData = {
                    ...userData,
                    weight: newWeight,
                    VKI: updatedVKI,
                };

                // Kullanıcı belgesini güncelleme
                await userDocRef.update(updatedData);

                // Kullanıcı verisini güncelleyerek state'i yenileme
                setUserData(prevUserData => {
                    const updatedUserData = prevUserData.map(user => {
                        if (user.id === auth.currentUser.uid) {
                            return { ...user, weight: newWeight, VKI: updatedVKI };
                        }
                        return user;
                    });
                    return updatedUserData;
                });
            } else {
                console.log('Kullanıcı belgesi bulunamadı.');
            }
        } catch (error) {
            console.error('Kilo güncellenirken hata oluştu:', error);
        }
    };



    // VKI hesaplama fonksiyonu
    const calculateVKI = (weight, height) => {
        // VKI hesaplama mantığı burada yapılabilir
        // Örnek bir hesaplama:
        const heightInMeters = height / 100; // Boyu metre cinsine çevirme
        const vki = weight / (heightInMeters * heightInMeters); // VKI hesaplama formülü
        return vki.toFixed(2); // VKI'yi istediğiniz formatta döndürebilirsiniz
    };
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

                            <input
                                type="number"
                                placeholder="Yeni kilo girin"
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
                            />
                            <button onClick={handleWeightUpdate}>Kilo Güncelle</button>

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
                            <h3>Kullanıcı Programları</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Pazartesi</th>
                                    <th>Salı</th>
                                    <th>Çarşamba</th>
                                    <th>Perşembe</th>
                                    <th>Cuma</th>
                                    <th>Cumartesi</th>
                                    <th>Pazar</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userPrograms.map(program => (
                                    <tr key={program.id}>
                                        <td>{program.pazartesi}</td>
                                        <td>{program.sali}</td>
                                        <td>{program.carsamba}</td>
                                        <td>{program.persembe}</td>
                                        <td>{program.cuma}</td>
                                        <td>{program.cumartesi}</td>
                                        <td>{program.pazar}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
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
            <CoachCarousel/>
        </div>
    );
};

export default UserPanel;
