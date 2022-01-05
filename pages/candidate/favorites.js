import { collection, deleteDoc, doc, documentId, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/layout/Header";
import SearchBar from "../../components/SearchBar";
import useFirebaseAuth from "../../hooks/use-auth";
import Footer from "../../components/layout/Footer";

const db = getFirestore();

function FavoritePosts() {
  const auth = useFirebaseAuth();
  const [favorites, setFavorites] = useState([]);
  const [HRs, setHRs] = useState({});
  const [toggle, setToggle] = useState(false);
  const { authUser, loading } = auth;

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      let queryObj = await query(collection(db, "favorites"), where("user_id", "==", authUser.id));
      let dataSnapshot = await getDocs(queryObj);
      let fav = [];
      fav = dataSnapshot.docs.map((doc) => ({ ...doc.data() }));
      let favorite_id = fav.map((fav) => fav.post_id);
      if (favorite_id.length > 0) {
        queryObj = await query(collection(db, "posts"), where("id", "in", favorite_id));
        dataSnapshot = await getDocs(queryObj);
        fav = dataSnapshot.docs.map((doc) => ({ ...doc.data() }));
        fav = fav.map((post) => ({ ...post, createTime: post.createTime.toDate().toString(), expiredTime: post.expiredTime.toDate().toString() }));

        let listHRId = fav.map((post) => post.hr_id);
        if (listHRId.length > 0) {
          queryObj = await query(collection(db, "users"), where("id", "in", listHRId));
          dataSnapshot = await getDocs(queryObj);
          const listHRs = dataSnapshot.docs.map((doc) => ({ ...doc.data() }));
          listHRs.forEach((hr) => {
            setHRs({ ...HRs, [hr.id]: hr });
          });
        }
        setFavorites(fav);
      }
    };

    if (authUser) {
      fetchFavoritePosts();
    }
  }, [setFavorites, db, toggle, authUser]);

  async function removeFavorite(post_id) {
    const queryObj = await query(collection(db, "favorites"), where("user_id", "==", user_id), where("post_id", "==", post_id));
    const dataSnapshot = await getDocs(queryObj);
    dataSnapshot.forEach(async (_doc) => {
      await deleteDoc(doc(db, "favorites", _doc.id));
    });
    toast.success("Xoá bài tuyển dụng ưu thích thành công.");
    setToggle(!toggle);
  }

  return (
    <div>
      <div>
        <Header />
        <SearchBar />
      </div>
      <div className="w-full flex justify-center pb-72">
        <div className="w-3/5 max-w-screen-xl mt-6">
          {favorites.map((post) => (
            <div key={post.id} className="w-full min-h-[120px] shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] rounded-lg py-5 mb-5">
              <div className="flex justify-between items-center px-20">
                <div className="flex justify-start items-center">
                  <div className="w-20 rounded-full">
                    <img src={HRs[post.hr_id]?.avatar?.length ? HRs[post.hr_id]?.avatar : "/svg/logo.svg"} alt="profile image" />
                  </div>
                  <div className="ml-6">
                    <div className="font-semibold text-xl">{post.title}</div>
                    <div className="text-purple-900 font-bold mt-2">{HRs[post.hr_id]?.fullName}</div>
                    <div className="text-gray-500 italic mt-2">Hạn ứng tuyển: {format(new Date(post.expiredTime), "dd MMMM yyyy", { locale: vi })}</div>
                  </div>
                </div>

                <div className="text-5xl text-red-700" onClick={() => removeFavorite(post.id)}>
                  <svg width="1em" height="1em" viewBox="0 0 256 256">
                    <path
                      d="M220.3 136.5l-81 81a15.9 15.9 0 0 1-22.6 0l-83.1-83.1a59.9 59.9 0 0 1 2.3-87c23.3-21.1 61.3-19.1 84.6 4.3l7.5 7.4l9.6-9.5A60.4 60.4 0 0 1 181.5 32a59.8 59.8 0 0 1 43.1 19.9c21 23.3 19.1 61.3-4.3 84.6z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default FavoritePosts;
