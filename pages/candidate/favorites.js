import { collection, deleteDoc, doc, documentId, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/layout/Header";
import SearchBar from "../../components/SearchBar";

const db = getFirestore();

function FavoritePosts() {
  const user_id = "8vl3sOWFx7I1WgUx3DjV";
  const [favorites, setFavorites] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const fetchFavoritePosts = async () => {
      let queryObj = await query(collection(db, "favorites"), where("user_id", "==", user_id));
      let dataSnapshot = await getDocs(queryObj);
      let fav = [];
      fav = dataSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      let favorite_id = fav.map((fav) => fav.post_id);
      if (favorite_id.length > 0) {
        queryObj = await query(collection(db, "posts"), where(documentId(), "in", favorite_id));
        onSnapshot(queryObj, (snapshot) => {
          fav = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          fav = fav.map((post) => ({ ...post, createTime: post.createTime.toDate().toString(), expiredTime: post.expiredTime.toDate().toString() }));
          setFavorites(fav);
        });
      }
    };

    fetchFavoritePosts();
  }, [setFavorites, db, toggle]);

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
      <Header />
      <SearchBar />
      <div className="w-full flex justify-center pb-72">
        <div className="w-3/5 max-w-screen-xl">
          {favorites.map((post) => (
            <div key={post.id} className="w-full min-h-[120px] shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] rounded-lg py-5 mb-5">
              <div className="flex justify-between items-center px-20">
                <div className="flex justify-start items-center">
                  <div className="w-20 rounded-full">
                    <Image src="/svg/logo.svg" height={32} width={32} layout="responsive" alt="profile image" />
                  </div>
                  <div className="ml-10">
                    <div className="font-semibold text-xl">{post.title}</div>
                    <div className="text-purple-900 font-bold mt-2">Nguyễn Ngọc A</div>
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
    </div>
  );
}

export default FavoritePosts;
