import { collection, getDocs, onSnapshot, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/auth-context";

const useChatList = () => {
  const [chatList, setChatList] = useState([]);
  const [listParticipants, setListParticipants] = useState([]);
  const auth = useAuth();
  const { authUser } = auth;

  useEffect(() => {
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "chats"));
      querySnapshot.forEach((doc) => {
        const list = [...listParticipants];
        if (authUser) {
          if (
            doc.data().participants.findIndex((data) => {
              return data === authUser.id;
            }) >= 0
          ) {
            if (
              list.findIndex((item) => {
                return item === doc.data();
              }) < 0
            )
              list.push(doc.data());
          }
          setListParticipants(list);
        } else {
          return;
        }
      });
    };
    getAllUsers();
  }, [db, setListParticipants]);

  useEffect(() => {
    const userList = listParticipants.map((item) => {
      if (authUser) return item.participants.find((user) => user !== authUser.id);
      return [];
    });
    userList.map((user) => {
      const userRef = collection(db, "users");
      const q = query(userRef, where("id", "==", user));

      onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setChatList((list) => {
          if (
            list.findIndex((user) => {
              return user.id === data[0]?.id;
            }) < 0
          ) {
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
