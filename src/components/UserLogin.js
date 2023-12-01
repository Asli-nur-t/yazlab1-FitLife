import React, { useState } from 'react';
import { auth } from '../firebase-config';
import {signInWithEmailAndPassword} from "firebase/auth";
import UserPanel from "./UserPanel";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [resetMessage, setResetMessage] = useState('');

    const handleUserLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setLoggedIn(true);
            console.log('Giriş başarılı!', userCredential.user);
        } catch (error) {
            console.error('Giriş başarısız!', error);
        }
    };

    const handleResetPassword = async () => {
        try {
            if (auth && auth.sendPasswordResetEmail) {
                await auth.sendPasswordResetEmail(email);
                setResetMessage('Şifre sıfırlama e-postası gönderildi!');
            } else {
                console.error('auth veya sendPasswordResetEmail fonksiyonu bulunamadı.');
            }
        } catch (error) {
            console.error('Şifre sıfırlama e-postası gönderilirken bir hata oluştu:', error);
        }
    };


    return (

        <div>
            {loggedIn ? (
                <UserPanel />
            ) : (
            <div>
            <h2>Üye Girişi</h2>
            <form onSubmit={handleUserLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Giriş Yap</button>
            </form>
            <button onClick={handleResetPassword}>Şifremi Unuttum</button>
            {resetMessage && <p>{resetMessage}</p>}
            </div>
                )}
        </div>
    );
};

export default UserLogin;
