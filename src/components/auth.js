import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore, storage } from "../firebase-config"

import { collection, doc, setDoc } from "firebase/firestore";
import "./Auth.css";
import UserPanel from "./UserPanel";

export const Auth = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(""); // Şifre hatası için durum değişkeni
    const [displayName, setDisplayName] = useState("");
    const [surname, setSurname] = useState(""); // Soyad için state
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState(""); // Cinsiyet için state
    const [photoFile, setPhotoFile] = useState(null); // Profil fotoğrafı dosyası için state
    const [photoURL, setPhotoURL] = useState(""); // Profil fotoğrafı URL'si için state

    const userInformationsRef = collection(firestore ,"users");
    const signIn = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = auth.currentUser ? auth.currentUser.uid : null;

            try {
                if (password.length < 6) {
                    setPasswordError("Şifre en az 6 karakter olmalıdır."); // Şifre uzunluğu kontrolü
                    return;
                }

                // Geri kalan kayıt işlemleri...
            } catch (err) {
                console.error(err);
                const errorCode = err.code;
                const errorMessage = err.message;
                console.log(errorMessage);
                console.log(errorCode);
            }
            const user = userCredential.user;


            const bmi = calculateBMI(parseFloat(weight), parseFloat(height));

            // Firestore'da kullanıcı bilgilerini kaydetme
            try {

                const userDocRef = doc(userInformationsRef, userId);
                await setDoc(userDocRef, {
                    displayName: `${displayName} ${surname}`,
                    age: age,
                    weight: weight,
                    height: height,
                    gender: gender,
                    email: auth?.currentUser?.email,
                    userId: userId,
                    BMI: bmi // VKİ
                });
                setIsRegistered(true);
            } catch (err) {
                console.error(err);
                const errorCode = err.code;
                const errorMessage = err.message;
                console.log(errorMessage);
                console.log(errorCode);
            }


            // Fotoğrafı yükleme (Firebase Storage kullanılarak)
            if (photoFile) {
                const storageRef = storage.ref(`profile_pictures/${user.uid}`);
                const snapshot = await storageRef.put(photoFile);
                const downloadURL = await snapshot.ref.getDownloadURL();

                // Firestore'a fotoğraf URL'sini kaydetme
                await firestore.collection('users').doc(user.uid).update({
                    photoURL: downloadURL
                });
            }

            // Profil güncelleme işlemleri
            await updateProfile(user, {
                displayName: `${displayName} ${surname}`, // Ad ve soyadını birleştir
            });

        } catch (err) {
            console.log("updateprofil hatası");
            console.error(err);
        }
    };



    // Dosya seçildiğinde çağrılan fonksiyon
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhotoFile(file); // Seçilen dosyayı state'e kaydet
    };
    const calculateBMI = (weight, height) => {
        // Kilogram cinsinden ağırlık, metre cinsinden boy olarak hesaplama yapabilirsiniz
        const heightInMeters = height / 100; // Boyu metre cinsine çevirme
        return (weight / (heightInMeters * heightInMeters)).toFixed(2); // VKİ hesaplama ve iki ondalık basamağa yuvarlama
    };


    return (
        <div>
        {isRegistered ? (
                <UserPanel />
            ) : (
        <div className="auth-container">
            <div className="title">
                <h1>Fitlife 'a kayıt ol</h1>
                <h2 className="slogan">Yaşamınızı Forma Sokun, Enerjinizi Yükseltin!</h2>
            </div>

            <form className="auth-form">
                <div className="input-group">
                    <input
                        placeholder="Email..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        placeholder="Password.."
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <div className="input-group">
                    <input placeholder="Name..." onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div className="input-group">
                    <input placeholder="Surname..." onChange={(e) => setSurname(e.target.value)} />
                </div>
                <div className="input-group">
                    <input placeholder="Age..." onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="input-group">
                    <input placeholder="Weight..." onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="input-group">
                    <input placeholder="Height..." onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div className="input-group">
                    <select onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="input-group">
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="input-group">
                    <button onClick={signIn}>Sign In</button>
                </div>
            </form>

        </div>
            )}
</div>
    );

};