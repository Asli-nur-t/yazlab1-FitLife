import React, { useState } from 'react';
import { auth, firestore } from '../firebase-config';
import CoachDashboard from './CoachDashboard';
import {signInWithEmailAndPassword} from "firebase/auth";
import {collection, query, where, getDocs } from "firebase/firestore";

const CoachLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCoach, setIsCoach] = useState(false); // Koç olup olmadığını kontrol etmek için state
    const [redirect, setRedirect] = useState(false); // Yönlendirme için state

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Giriş başarılı!', userCredential.user);

            const q = query(collection(firestore, 'coaches'), where('UID', '==', user.uid));
            const coachSnapshot = await getDocs(q);

            if (!coachSnapshot.empty) {
                setIsCoach(true);
                console.log("koç girişi yapıldı");
                setRedirect(true);
            } else {
                setIsCoach(false);
                alert('Koç değilsiniz!');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // Koç ise CoachDashboard sayfasına yönlendir, değilse giriş ekranını göster
    if (redirect) {
        return <CoachDashboard />;
    }

    return isCoach ? (
        <CoachDashboard />
    ) : (
        <div>
            <h1 style={{ color: 'darkorange', fontWeight: 'bold' }}>Koç Girişi</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
};

export default CoachLogin;
