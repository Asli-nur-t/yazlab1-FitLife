import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase-config';
import MessagingInterface from "./MessagingInterface";
import AdminPanel from "./AdminPanel";
import './CoachDashboard.css';
const CoachDashboard = () => {
    const [coachInfo, setCoachInfo] = useState({});
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedUserProgram, setSelectedUserProgram] = useState({
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
    });
    const [coachUsers, setCoachUsers] = useState([]);

    useEffect(() => {
        const unsubscribeUsers = onSnapshot(query(collection(firestore, 'users'), where('coachId', '==', auth.currentUser.uid)), snapshot => {
            const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersData);

            return () => {
                unsubscribeUsers();
            };
        });

        const unsubscribeCoachUsers = onSnapshot(query(collection(firestore, 'users'), where('coachId', '==', auth.currentUser.uid)), snapshot => {
            const coachUsersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCoachUsers(coachUsersData);

            return () => {
                unsubscribeCoachUsers();
            };
        });
    }, []);

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleProgramChange = (e, day) => {
        setSelectedUserProgram({
            ...selectedUserProgram,
            [day]: e.target.value,
        });
    };

    const sendExercisePlan = async () => {
        if (!selectedUser) {
            alert('Lütfen bir danışan seçin!');
            return;
        }

        const programsRef = collection(firestore, 'programs');

        const newProgram = {
            ...selectedUserProgram,
            userUID: selectedUser,
        };

        try {
            await addDoc(programsRef, newProgram);
            console.log('Spor programı başarıyla eklendi:', newProgram);
        } catch (error) {
            console.error('Spor programı eklenirken hata oluştu:', error);
        }
    };

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
                    <div key={user.id}>
                        <img src={user.photoURL} alt="User" />
                        <p>{user.displayName}</p>
                        {/* Diğer danışan bilgileri */}
                    </div>
                ))}
            </div>

            {/* Danışmanlar paneli */}
            <div>
                <h2>Danışmanlar</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>E-Posta</th>
                        {/* Diğer bilgiler */}
                    </tr>
                    </thead>
                    <tbody>
                    {coachUsers.map((coachUser) => (
                        <tr key={coachUser.id}>
                            <td>{coachUser.name}</td>
                            <td>{coachUser.surname}</td>
                            <td>{coachUser.email}</td>
                            {/* Diğer bilgiler */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h1>Spor Programı Oluştur</h1>
                <select onChange={handleUserChange}>
                    <option value="">Danışan Seçin</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.displayName}
                        </option>
                    ))}
                </select>
                <br />
                {Object.keys(selectedUserProgram).map((day) => (
                    <div key={day}>
                        <label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
                        <textarea
                            value={selectedUserProgram[day]}
                            onChange={(e) => handleProgramChange(e, day)}
                            rows={4}
                            cols={50}
                            placeholder={`Enter program for ${day}`}
                        ></textarea>
                    </div>
                ))}
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
                <button onClick={handleMessaging}>Mesajlaşma</button>
            )}
        </div>
    );
};

export default CoachDashboard;
