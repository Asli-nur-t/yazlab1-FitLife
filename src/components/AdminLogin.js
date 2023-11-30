import React, { useState } from 'react';
import { auth } from '../firebase-config'; // Firebase Auth modülünü içe aktar
import { signInWithEmailAndPassword } from 'firebase/auth'; // signInWithEmailAndPassword fonksiyonunu içe aktar
import AdminPanel from './AdminPanel'

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Giriş başarılı!', userCredential.user);
            setLoggedIn(true);
        } catch (error) {
            console.error('Giriş başarısız!', error);
        }
    };

    return (
        <div>
            {loggedIn ? (
                <AdminPanel />
            ) : (
                <div>
                    <h2 style={{ color: 'orange', fontWeight: 'bold' }}>ADMİN GİRİŞİ</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label style={{ color: 'green', fontWeight: 'bold' }}>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label style={{ color: 'green', fontWeight: 'bold' }}>Şifre:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" style={{ color: 'white', fontWeight: 'bold' }}>Giriş Yap</button>
                    </form>
                </div>
            )}
        </div>
    );



};

export default AdminLogin;
