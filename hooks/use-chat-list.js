import { collection, getDocs, onSnapshot, query, where } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import useFirebaseAuth from './use-auth';

const useChatList = () => {
  const [chatList, setChatList] = useState([]);
  const [listParticipants, setListParticipants] = useState([]);
  const auth = useFirebaseAuth();
  const { authUser } = auth;

  useEffect(() => {
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'chats'));
      querySnapshot.forEach((doc) => {
        const list = [...listParticipants];
        list.push(doc.data());
        setListParticipants(list);
      });
    };
    getAllUsers();
  }, [db, setListParticipants]);

  useEffect(() => {
    const userList = listParticipants.map((item) => {
      if (authUser) return item.participants.find((user) => user !== authUser.uid);
      return [];
    });

    userList.map((user) => {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('uid', '==', user));

      onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setChatList((list) => {
          if (list.findIndex((user) => user.uid === data.uid) < 0) {
            return [...list, ...data];
          } else {
            return list;
          }
        });
      });
    });
  }, [listParticipants, authUser]);

  return { chatList };
};

export default useChatList;
