import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { auth } from '../firebase-config';

const firestore = getFirestore();

const MessagingInterface = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedReceiverId, setSelectedReceiverId] = useState('');

    useEffect(() => {
        const unsubscribeUsers = onSnapshot(query(collection(firestore, 'users'), where('coachId', '==', auth.currentUser.uid)), snapshot => {
            const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersData);
        });

        const unsubscribeMessages = onSnapshot(
            query(collection(firestore, 'messages'), orderBy('timestamp')),
            snapshot => {
                const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMessages(messagesData);
            }
        );


        return () => {
            unsubscribeUsers();
            unsubscribeMessages();
        };
    }, []);

    const sendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            await addDoc(collection(firestore, 'messages'), {
                text: newMessage,
                timestamp: new Date(),
                senderId: auth.currentUser.uid,
                receiverId: selectedReceiverId
            });
            setNewMessage('');
        } catch (error) {
            console.error('Mesaj gönderirken hata oluştu:', error);
        }
    };

    return (
        <div>
            {/* Mesajlar */}
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <p>{message.text}</p>
                        {/* Mesajla ilgili diğer bilgiler */}
                    </div>
                ))}
            </div>

            {/* Yeni mesaj gönderme arayüzü */}
            <div>
                <select onChange={(e) => setSelectedReceiverId(e.target.value)}>
                    <option value="">Alıcı Seçin</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.displayName} {/* Veya kullanıcı ismi */}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Gönder</button>
            </div>
        </div>
    );
};

export default MessagingInterface;
