import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@firebase/auth';
import { addDoc, collection, getDocs, onSnapshot, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';

const GoogleProvider = new GoogleAuthProvider();

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        setUsers((listUsers) => {
          listUsers.push(doc.data());
          return listUsers;
        });
      });
    };
    getAllUsers();
  }, []);

  const authStateChanged = (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const userRef = collection(db, 'users');
    const q = query(userRef, where('id', '==', authState.uid));

    onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data()
      }));

      setAuthUser(data[0]);
    });

    setLoading(false);
  };

  const loginGoogle = async (loginSuccess) => {
    try {
      const loginRes = await signInWithPopup(auth, GoogleProvider);

      if (!loginRes.user) {
        return;
      }

      if (users.findIndex((userId) => userId.id === loginRes.user.uid) < 0) {
        await addDoc(collection(db, 'users'), {
          id: loginRes.user.uid,
          fullName: loginRes.user.displayName,
          email: loginRes.user.email,
          avatar: loginRes.user.photoURL,
          role: 1,
          DOB: 0,
          isDelete: false,
          phoneNumber: '',
        });
      }

      loginSuccess();
    } catch (error) {
      console.log(error.message);
    }
  };

  // sign up with email and password
  const signUpWithEmailAndPassword = async (signUpSuccess, email, password, fullName, roleRegister) => {
    try {
      const signUpRef = await createUserWithEmailAndPassword(auth, email, password);

      if (!signUpRef.user) {
        return;
      }

      if (users.findIndex((userId) => userId.uid === signUpRef.user.uid) < 0) {
        await addDoc(collection(db, 'users'), {
          id: signUpRef.user.uid,
          fullName: fullName,
          email: email,
          avatar: signUpRef.user.photoURL,
          role: roleRegister,
          DOB: 0,
          isDelete: false,
          phoneNumber: '',
        });
      }

      signUpSuccess();
    } catch (error) {
      console.log(error.message);
    }
  };

  // login with email and password
  const LoginWithEmailAndPassword = async (loginSuccess, email, password) => {
    try {
      const loginRef = await signInWithEmailAndPassword(auth, email, password);

      if (!loginRef.user) {
        return;
      }

      loginSuccess();
    } catch (error) {
      console.log(error.message);
    }
  };

  const forgotPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    try {
      router.push('/auth/login');
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    loginGoogle,
    signUp: signUpWithEmailAndPassword,
    loginEmail: LoginWithEmailAndPassword,
    logout,
    forgotPassword,
  };
}
