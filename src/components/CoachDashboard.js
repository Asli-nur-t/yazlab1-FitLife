import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc , getDoc} from 'firebase/firestore';
import { firestore } from '../firebase-config';
import MessagingInterface from "./MessagingInterface";
import AdminPanel from "./AdminPanel";

const CoachDashboard = () => {
    const [coachInfo, setCoachInfo] = useState({});
    const [users, setUsers] = useState([]);
    const [exercisePlan, setExercisePlan] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [programs, setPrograms] = useState([]);


    const programsCollectionRef = collection(firestore, 'programs');

    const getProgramsList = async () => {
        try {
            const data = await getDocs(programsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                program: doc.data().program || 'No Program',
                createdAt: doc.data().createdAt || '',
                userUID: doc.data().userUID || '',
                // Other fields as needed...
            }));
            setPrograms(filteredData);
        } catch (err) {
            console.error(err);
        }
    };



    const updateProgram = async (id) => {
        const programDoc = doc(firestore, 'programs', id);
        await updateDoc(programDoc, { program: 'Updated Program Name' });
        getProgramsList();
    };

    const handleExercisePlanChange = (e) => {
        setExercisePlan(e.target.value);
    };

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const sendExercisePlan = async () => {
        if (!selectedUser) {
            alert('Lütfen bir danışan seçin!');
            return;
        }

        const programsRef = collection(firestore, 'programs');

        const newProgram = {
            program: exercisePlan,
            createdAt: new Date(),
            userUID: selectedUser
        };

        try {
            await addDoc(programsRef, newProgram);
            console.log('Spor programı başarıyla eklendi:', newProgram);
        } catch (error) {
            console.error('Spor programı eklenirken hata oluştu:', error);
        }
    };

    useEffect(() => {
        const getCoachInfo = async () => {
            try {
                const coachDocRef = doc(firestore, 'coaches', 'F9oDXRUGmRXG5quu6GCI');
                const docSnap = await getDoc(coachDocRef);

                if (docSnap.exists()) {
                    setCoachInfo(docSnap.data());
                } else {
                    console.log('Koç bilgisi bulunamadı');
                }
            } catch (error) {
                console.error('Koç bilgisi alma hatası:', error);
            }
        };

        getCoachInfo();
    }, []);

    useEffect(() => {
        getProgramsList();

        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'programs'));
                // Geri kalan Firestore işlemleri...
            } catch (error) {
                console.error('Firestore işlemleri sırasında hata oluştu:', error);
            }
        };

        fetchData();
    }, []);
    const [pushMessage, setMessage] = useState(false);
    const handleMessaging = () => {
        setMessage(true);
        // Mesajlaşma sayfasına yönlendirme işlemi
        // Örnek olarak window.location ile bir sayfaya yönlendirme:

    };

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

            <div>
                <h1>Spor Programı Oluştur</h1>
                <select onChange={handleUserChange}>
                    <option value="">Danışan Seçin</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.displayName} {/* Veya kullanıcı ismi */}
                        </option>
                    ))}
                </select>
                <textarea
                    placeholder="Spor programını buraya yazın..."
                    value={exercisePlan}
                    onChange={handleExercisePlanChange}
                    rows={10}
                    cols={50}
                ></textarea>
                <br />
                <button onClick={sendExercisePlan}>Programı Gönder</button>
            </div>

            <div>
                <h2>Beslenme Programları</h2>
                {/* Beslenme programları paneli */}
            </div>
            {pushMessage ? (
                <MessagingInterface />
            ) : (

            <button onClick={handleMessaging}>Mesajlaşma</button>)}
        </div>
    );
};

export default CoachDashboard;
