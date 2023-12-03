import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { firestore, storage, auth } from '../firebase-config';
import {
    getDocs,
    collection,
    updateDoc,
    doc,
    deleteDoc,
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

    return (
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

        </div>

    );
};

export default AdminPanel;
