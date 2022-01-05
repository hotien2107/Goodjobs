import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import { useEffect, useState } from "react";
import { collection, documentId, getDocs, getFirestore, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

function CategoriesNews({ icon, posts, title }) {
  const [HRs, setHRs] = useState({});

  useEffect(() => {
    const fetchHR = async () => {
      const listHRId = posts?.map((post) => post.hr_id) || [];
      const q = await query(collection(db, "users"), where("id", "in", listHRId));
      const dataSnapshot = await getDocs(q);
      const _listHR = dataSnapshot.docs.map((doc) => ({ ...doc.data() }));
      _listHR.forEach((hr) => {
        setHRs({ ...HRs, [hr.id]: hr });
      });
    };

    fetchHR();
  }, [posts, db, setHRs]);

  return (
    <div className="w-full bg-white px-3 pt-5 rounded-md">
      <div className="font-bold text-lg flex items-center">
        <div className="text-2xl text-purple-900 mr-2">{icon}</div>
        <div>{title}</div>
      </div>

      <div>
        {posts.map((post) => (
          <div key={post.id} className="px-2 py-3 border-b-[0.5px] last:border-none">
            <div className="flex justify-start items-center">
              <div className="w-1/6 rounded-full">
                <img src={HRs[post.hr_id]?.avatar?.length ? HRs[post.hr_id]?.avatar : "/svg/logo.svg"} alt="profile image" />
              </div>
              <div className="w-5/6 pl-6">
                <div className="font-semibold text-base hover:text-purple-700 hover:underline underline-offset-2 cursor-pointer">
                  <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">{post.title}</div>
                </div>
                <div className="text-xs text-gray-500">Lương: {new Intl.NumberFormat().format(post.salary)} đồng</div>
                <div className="text-xs text-gray-500">Hạn ứng tuyển: {format(new Date(post.expiredTime), "dd MMMM yyyy", { locale: vi })}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesNews;
