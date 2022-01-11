import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import { collection, getDocs, query, where, setDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import useFirebaseAuth from "../hooks/use-auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function Post({ post, HRs }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [liked, setLiked] = useState(false);
  const auth = useFirebaseAuth();
  const { authUser, loading } = auth;
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      let queryObj = await query(collection(db, "favorites"), where("user_id", "==", authUser.id));
      let dataSnapshot = await getDocs(queryObj);
      let fav = [];
      fav = dataSnapshot.docs.map((doc) => ({ ...doc.data() }));
      let favorite_id = fav.map((fav) => fav.post_id);
      setFavoriteIds(favorite_id);
    };

    if (authUser) {
      fetchFavorites();
    }
  }, [authUser, liked]);

  const changeFavorite = async () => {
    if (authUser) {
      if (authUser.role && authUser.role === 1) {
        if (favoriteIds.includes(post.id)) {
          const queryObj = await query(collection(db, "favorites"), where("user_id", "==", authUser.id), where("post_id", "==", post.id));
          const dataSnapshot = await getDocs(queryObj);
          dataSnapshot.forEach(async (_doc) => {
            await deleteDoc(doc(db, "favorites", _doc.id));
          });
        } else {
          const docRef = doc(collection(db, "favorites"));
          await setDoc(docRef, {
            id: docRef.id,
            user_id: authUser.id,
            post_id: post.id,
            note: "",
          });
        }
        setLiked(!liked);
      } else {
        toast.error("Bạn không có quyền thực hiện chức năng này!");
      }
    }
  };

  return (
    <div className="w-full min-h-[120px] bg-white shadow-[0_0_5px_2px_rgba(0,0,0,0.1)] rounded-lg pt-5 mb-6">
      <div className="flex justify-center">
        <div>
          <div className="w-full h-96 relative overflow-hidden">
            <div className="px-20">
              <div className="flex justify-start items-center">
                <div className="w-20 rounded-full">
                  <img src={HRs[post.hr_id]?.avatar?.length ? HRs[post.hr_id]?.avatar : "/svg/logo.svg"} alt="profile image" />
                </div>
                <div className="ml-6">
                  <div className="font-semibold text-xl">{post.title}</div>
                  <div className="font-medium text-base">{HRs[post.hr_id]?.fullName}</div>
                  <div className="text-gray-500 text-sm mt-2">{format(new Date(post.createTime), "dd MMMM yyyy", { locale: vi })}</div>
                </div>
              </div>
              <Info name={"Mô tả công việc"} content={post.job_description} />
              <Info name={"Yêu cầu công việc"} content={post.requirement} />
              <Info name={"Mức lương dự kiến"} content={post.salary} />
              <Info name={"Số lượng tuyển dụng"} content={post.quantity} />
              <Info name={"Số năm kinh nghiệm tối thiểu"} content={post.experience} />
              <Info name={"Thành phố"} content={post.location} />
              <Info name={"Đãi ngộ"} content={post.benefit} />
              <Info name={"Hạn ứng tuyển"} content={post.expiredTime} />
            </div>

            <div className="absolute h-36 flex justify-center items-end bottom-0 left-0 right-0 bg-gradient-to-t from-white">
              <div onClick={() => router.push(`/posts/${post.id}`)} className="mb-2 text-purple-500 text-base font-semibold">
                Xem chi tiết
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-around py-3 border-t-2 ">
              {authUser?.role == 1 ? (
                <div className="flex items-center text-2xl text-gray-600 hover:text-red-600 cursor-pointer" onClick={changeFavorite}>
                  {favoriteIds.includes(post.id) ? (
                    <div className="flex text-red-600">
                      <svg width="1em" height="1em" viewBox="0 0 16 16">
                        <g fill="currentColor">
                          <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314z"></path>
                        </g>
                      </svg>
                      <span className="text-sm font-semibold ml-3">Yêu thích</span>
                    </div>
                  ) : (
                    <div className="flex">
                      <svg width="1em" height="1em" viewBox="0 0 16 16">
                        <g fill="currentColor">
                          <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385c.92 1.815 2.834 3.989 6.286 6.357c3.452-2.368 5.365-4.542 6.286-6.357c.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                        </g>
                      </svg>
                      <span className="text-sm font-semibold ml-3">Yêu thích</span>
                    </div>
                  )}
                </div>
              ) : null}

              <div onClick={() => router.push(`/posts/${post.id}`)} className="flex items-center text-2xl text-gray-600 hover:text-blue-500 cursor-pointer">
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M3.25 4a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 .75.75v3.19l3.72-3.72a.75.75 0 0 1 .53-.22h10a.25.25 0 0 0 .25-.25V4.25a.25.25 0 0 0-.25-.25H3.25zm-1.75.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 0 1-1.75 1.75h-9.69l-3.573 3.573A1.457 1.457 0 0 1 5 21.043V18.5H3.25a1.75 1.75 0 0 1-1.75-1.75V4.25z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="text-sm font-semibold ml-3">Bình luận</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export function Info({ name, content }) {
  return (
    <div className="mt-4">
      <div className="font-bold">{name}</div>
      <div className="ml-10 my-2 text-sm">{content}</div>
    </div>
  );
}
