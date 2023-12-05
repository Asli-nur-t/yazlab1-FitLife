import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { firestore, storage, auth } from '../firebase-config';
import {
    getDocs,
    collection,
    updateDoc,
    doc,
    deleteDoc,
    addDoc,
} from 'firebase/firestore';
import './AdminPanel.css';

const AdminPanel = () => {
    const [usersList, setUsersList] = useState([]);
    const [updatedDisplayName, setUpdatedDisplayName] = useState('');

    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const usersCollectionRef = collection(firestore, 'users');


    const getUsersList = async () => {
        try {
            const data = await getDocs(usersCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                email: doc.data().email,
                displayName: doc.data().displayName || 'No Name',
                age: doc.data().age || '',
                gender: doc.data().gender || '',
                height: doc.data().height || '',
                weight: doc.data().weight || '',
                photoURL: doc.data().photoURL || '',
            }));
            setUsersList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    const addUser = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword);
            await updateDoc(doc(firestore, 'users', userCredential.user.uid), {
                email: newUserEmail,
                displayName: '', // Burada yeni kullanıcı eklediğinizde varsayılan değerleri verebilirsiniz.
                age: '',
                gender: '',
                height: '',
                weight: '',
                photoURL: '',
            });
            setNewUserEmail('');
            setNewUserPassword('');
            getUsersList(); // Kullanıcı listesini güncelleyin, yeni kullanıcıyı göstermek için
        } catch (error) {
            console.error('Kullanıcı eklenirken bir hata oluştu:', error);
        }
    };
    const updateUserDisplayName = async (id) => {
        const userDoc = doc(firestore, 'users', id);
        await updateDoc(userDoc, { displayName: updatedDisplayName });
        getUsersList();
    };

    const deleteUser = async (id) => {
        const userDoc = doc(firestore, 'users', id);
        await deleteDoc(userDoc);
        getUsersList();
    };

    useEffect(() => {
        getUsersList();
    }, []);

    const [coachesList, setCoachesList] = useState([]);

    const coachesCollectionRef = collection(firestore, 'coaches');

    const getCoachesList = async () => {
        try {
            const coachesSnapshot = await getDocs(coachesCollectionRef);

            const coachesData = coachesSnapshot.docs.map((doc) => ({
                id: doc.id,
                email: doc.data().email || '',
                displayName: `${doc.data().name} ${doc.data().surname}` || 'No Name',
                age: doc.data().age || '',
                gender: doc.data().gender || '',
                height: doc.data().height || '',
                weight: doc.data().weight || '',
                photoURL: doc.data().photo || '',
                profession: doc.data().profession || '',
                point: doc.data().point || 0,
                price: doc.data().price || 0,
            }));
            setCoachesList(coachesData);
        } catch (err) {
            console.error(err);
        }
    };
    const [newCoach, setNewCoach] = useState({
        email: '',
        name: '',
        surname: '',
        photoURL: '',
        point: '',
        price: 0,
        profession: '',
        capacity: 0,
        UID: '',
        // Diğer alanlar buraya eklenebilir
    });

// ...

    const addCoach = async () => {
        try {
            await addDoc(coachesCollectionRef, newCoach);
            setNewCoach({
                email: '',
                name: '',
                surname: '',
                photoURL: '',
                point: '',
                price: 0,
                profession: '',
                capacity: 0,
                UID: '',
                // Diğer alanlar buraya eklenebilir
            });
            getCoachesList();
        } catch (error) {
            console.error('Koç eklenirken bir hata oluştu:', error);
        }
    };


    const deleteCoach = async (id) => {
        try {
            await deleteDoc(doc(coachesCollectionRef, id));
            getCoachesList();
        } catch (error) {
            console.error('Koç silinirken bir hata oluştu:', error);
        }
    };

    useEffect(() => {
        getCoachesList();
    }, []);



    return (
        <div>
            <div>
            <h2>Admin Panel - All Users</h2>
            <table>
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
                {usersList.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
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
                            <input
                                placeholder="New Display Name..."
                                onChange={(e) =>
                                    setUpdatedDisplayName(
                                        e.target.value
                                    )
                                }
                            />
                            <button
                                onClick={() =>
                                    updateUserDisplayName(user.id)
                                }
                            >
                                Update Display Name
                            </button>
                            <button onClick={() => deleteUser(user.id)}>
                                Delete User
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <h2>Kullanıcı Ekle</h2>
            <input
                type="email"
                placeholder="E-posta"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Şifre"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
            />
            <button onClick={addUser}>Kullanıcı Ekle</button>

            <h2>Admin Panel - Coaches</h2>
            <table>
                {/* ... */}
                <tbody>
                {coachesList.map((coach) => (
                    <tr key={coach.id}>
                        {/* ... */}
                        <td>
                            <input
                                placeholder="New Display Name..."
                                onChange={(e) =>
                                    setUpdatedDisplayName(
                                        e.target.value
                                    )
                                }
                            />
                            <button
                                onClick={() =>
                                    updateUserDisplayName(coach.id)
                                }
                            >
                                Update Display Name
                            </button>
                            <button onClick={() => deleteUser(coach.id)}>
                                Delete Coach
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div>
                <h2>Coaches Panel</h2>
                <div>
                    <h3>Add Coach</h3>
                    <input
                        type="text"
                        placeholder="Email"
                        value={newCoach.email}
                        onChange={(e) => setNewCoach({ ...newCoach, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={newCoach.name}
                        onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Surname"
                        value={newCoach.surname}
                        onChange={(e) => setNewCoach({ ...newCoach, surname: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Photo URL"
                        value={newCoach.photoURL}
                        onChange={(e) => setNewCoach({ ...newCoach, photoURL: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Point"
                        value={newCoach.point}
                        onChange={(e) => setNewCoach({ ...newCoach, point: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newCoach.price}
                        onChange={(e) => setNewCoach({ ...newCoach, price: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Profession"
                        value={newCoach.profession}
                        onChange={(e) => setNewCoach({ ...newCoach, profession: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Capacity"
                        value={newCoach.capacity}
                        onChange={(e) => setNewCoach({ ...newCoach, capacity: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="UID"
                        value={newCoach.UID}
                        onChange={(e) => setNewCoach({ ...newCoach, UID: e.target.value })}
                    />
                    {/* Diğer inputlar buraya eklenebilir */}
                    <button onClick={addCoach}>Add Coach</button>
                </div>
                <div>
                <table>
                    {/* Koçların listelendiği tablo */}
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Display Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        {/* Diğer alanlar buraya eklenebilir */}
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coachesList.map((coach) => (
                        <tr key={coach.id}>
                            <td>{coach.id}</td>
                            <td>{coach.email}</td>
                            <td>{coach.displayName}</td>
                            <td>{coach.age}</td>
                            <td>{coach.gender}</td>
                            {/* Diğer alanlar buraya eklenebilir */}
                            <td>
                                <button onClick={() => deleteCoach(coach.id)}>Delete</button>
                                {/* Güncelleme işlemi buraya eklenebilir */}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                    </div>
            </div>

        </div>


    );
};

export default AdminPanel;
