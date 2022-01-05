import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import useFirebaseAuth from "../hooks/use-auth";

export default function Post({ post, HRs }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [liked, setLiked] = useState(false);
  const auth = useFirebaseAuth();
  const { authUser, loading } = auth;

  useEffect(() => {
    const fetchFavorites = async () => {
      let queryObj = await query(collection(db, "favorites"), where("user_id", "==", authUser.id));
      let dataSnapshot = await getDocs(queryObj);
      let fav = [];
      fav = dataSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      let favorite_id = fav.map((fav) => fav.post_id);
      setFavoriteIds(favorite_id);
    };

    if (authUser) {
      fetchFavorites();
    }
  }, [authUser, liked]);

  const changeFavorite = async () => {
    console.log(favoriteIds);
    if (authUser) {
      if (favoriteIds.includes(post.id)) {
        const queryObj = await query(collection(db, "favorites"), where("user_id", "==", authUser.id), where("post_id", "==", post.id));
        const dataSnapshot = await getDocs(queryObj);
        dataSnapshot.forEach(async (_doc) => {
          await deleteDoc(doc(db, "favorites", _doc.id));
        });
      } else {
        await addDoc(collection(db, "favorites"), {
          user_id: authUser.id,
          post_id: post.id,
          note: "",
        });
      }
      setLiked(!liked);
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
              <div className="mb-2 text-purple-500 text-base font-semibold">Xem chi tiết</div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-around py-3 border-t-2 ">
              <div className="flex items-center text-2xl text-gray-600" onClick={changeFavorite}>
                {favoriteIds.includes(post.id) ? (
                  <svg width="1em" height="1em" viewBox="0 0 512 512">
                    <path
                      d="M256 448l-9-6c-42.78-28.57-96.91-60.86-137-108.32c-42.25-50-62.52-101.35-62-157C48.63 114.54 98.46 64 159.08 64c48.11 0 80.1 28 96.92 48.21C272.82 92 304.81 64 352.92 64c60.62 0 110.45 50.54 111.08 112.65c.56 55.68-19.71 107-62 157c-40.09 47.49-94.22 79.78-137 108.35z"
                      fill="currentColor"
                    ></path>
                  </svg>
                ) : (
                  <svg width="1em" height="1em" viewBox="0 0 16 16">
                    <g fill="currentColor">
                      <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385c.92 1.815 2.834 3.989 6.286 6.357c3.452-2.368 5.365-4.542 6.286-6.357c.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </g>
                  </svg>
                )}
                <span className="text-sm font-semibold ml-3">Yêu thích</span>
              </div>

              <div className="flex items-center text-2xl text-gray-600">
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M3.25 4a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 .75.75v3.19l3.72-3.72a.75.75 0 0 1 .53-.22h10a.25.25 0 0 0 .25-.25V4.25a.25.25 0 0 0-.25-.25H3.25zm-1.75.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 0 1-1.75 1.75h-9.69l-3.573 3.573A1.457 1.457 0 0 1 5 21.043V18.5H3.25a1.75 1.75 0 0 1-1.75-1.75V4.25z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="text-sm font-semibold ml-3">Bình luận</span>
              </div>

              <div className="flex items-center text-2xl text-gray-600">
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    d="M13.17 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59zM16 15c0 2.34-2.01 4.21-4.39 3.98C9.53 18.78 8 16.92 8 14.83V9.64c0-1.31.94-2.5 2.24-2.63A2.5 2.5 0 0 1 13 9.5V14c0 .55-.45 1-1 1s-1-.45-1-1V9.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v5.39c0 1 .68 1.92 1.66 2.08A2 2 0 0 0 14 15v-3c0-.55.45-1 1-1s1 .45 1 1v3zm-2-8V4l4 4h-3c-.55 0-1-.45-1-1z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="text-sm font-semibold ml-3">Ứng tuyển</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
