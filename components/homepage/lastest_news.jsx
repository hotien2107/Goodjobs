import { Info } from "../Post";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import { useEffect, useState } from "react";
import { collection, documentId, getDocs, getFirestore, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useRouter } from "next/router";

function LastestNews({ posts }) {
  const [HRs, setHRs] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchHR = async () => {
      const listHRId = posts?.map((post) => post.hr_id) || [];
      const q = await query(collection(db, "users"), where("id", "in", listHRId));
      const dataSnapshot = await getDocs(q);
      const _listHR = dataSnapshot.docs.map((doc) => ({ ...doc.data() }));
      const objHRs = {};
      _listHR.forEach((hr) => {
        let id = hr.id;
        objHRs = { ...objHRs, [id]: JSON.parse(JSON.stringify(hr)) };
      });
      setHRs(objHRs);
    };

    fetchHR();
  }, [posts, db, setHRs]);

  return (
    <div className="w-full bg-white px-3 py-5 mb-8 rounded-md">
      <div className="font-bold text-xl flex items-center">
        <div className="text-4xl text-purple-900 mr-2">
          <svg width="1em" height="1em" viewBox="0 0 100 100">
            <path
              d="M88.558 49.96c0-.885-.435-1.663-1.097-2.151l.014-.024l-9.324-5.383l5.367-9.296l-.018-.011a2.666 2.666 0 0 0-.127-2.408a2.667 2.667 0 0 0-2.025-1.314v-.026H70.58V18.61h-.022a2.667 2.667 0 0 0-1.314-2.022a2.662 2.662 0 0 0-2.412-.125l-.013-.023l-9.481 5.474l-5.25-9.094l-.019.011a2.668 2.668 0 0 0-2.149-1.094c-.885 0-1.664.435-2.151 1.097l-.024-.014l-5.337 9.244l-9.19-5.306l-.011.019a2.666 2.666 0 0 0-2.408.127a2.666 2.666 0 0 0-1.315 2.025h-.027v10.674H18.845v.021a2.667 2.667 0 0 0-2.022 1.314a2.667 2.667 0 0 0-.126 2.41l-.023.014l5.246 9.087l-9.394 5.424l.011.019a2.668 2.668 0 0 0-1.094 2.149c0 .885.435 1.664 1.097 2.151l-.014.024l9.324 5.383l-5.367 9.296l.018.01a2.666 2.666 0 0 0 .127 2.408a2.667 2.667 0 0 0 2.025 1.314v.027H29.42V81.39h.022c.092.816.549 1.58 1.314 2.022a2.665 2.665 0 0 0 2.412.125l.013.023l9.481-5.474l5.25 9.094l.019-.011a2.668 2.668 0 0 0 2.149 1.094c.885 0 1.664-.435 2.151-1.096l.023.013l5.337-9.244l9.191 5.306l.011-.019a2.666 2.666 0 0 0 2.408-.127a2.666 2.666 0 0 0 1.315-2.025h.027V70.398h10.613v-.021a2.667 2.667 0 0 0 2.022-1.314a2.67 2.67 0 0 0 .126-2.411l.023-.013l-5.246-9.087l9.394-5.424l-.011-.019a2.666 2.666 0 0 0 1.094-2.149zM43.715 61.355l-9.846-4.35l4.345 7.525l-2.456 1.418l-6.662-11.537l2.525-1.459l9.53 4.162l-4.185-7.248l2.457-1.418l6.66 11.537l-2.368 1.37zm4.652-2.686l-6.661-11.538l8.165-4.713l1.248 2.162l-5.709 3.295l1.398 2.422l5.587-3.225l1.248 2.16l-5.587 3.227l1.518 2.629l5.709-3.295l1.248 2.162l-8.164 4.714zm18.906-10.915L60.675 41l2.567 9.08l-2.611 1.508l-9.965-9.629l2.75-1.588l6.838 7.168l-2.617-9.605l1.92-1.108l6.993 7.079l-2.79-9.506l2.75-1.588l3.375 13.436l-2.612 1.507z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div>TIN TUYỂN DỤNG MỚI NHẤT</div>
      </div>

      <div className="py-5 px-4 grid grid-cols-2 gap-x-10">
        {posts.map((post) => (
          <div
            onClick={() => router.push(`/posts/${post.id}`)}
            key={post.id}
            className="w-full min-h-[120px] shadow-[0_0_5px_2px_rgba(0,0,0,0.1)] rounded-lg pt-5 mb-6 cursor-pointer"
          >
            <div className="flex justify-center">
              <div>
                <div className="w-full h-64 relative overflow-hidden">
                  <div className="px-6">
                    <div className="flex justify-start items-center">
                      <div className="w-20 rounded-full flex justify-center">
                        <img src={HRs[post.hr_id]?.avatar?.length ? HRs[post.hr_id]?.avatar : "/images/logo.png"} alt="profile image" />
                      </div>
                      <div className="ml-6">
                        <div className="font-semibold text-xl hover:text-purple-700 hover:underline underline-offset-2 cursor-pointer">{post.title}</div>
                        <div className="text-base text-gray-500">{HRs[post.hr_id]?.fullName}</div>
                        <div className="text-gray-500 mt-2 text-xs">Ngày đăng: {format(new Date(post.createTime), "dd MMMM yyyy", { locale: vi })}</div>
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
                    <div className="mb-2 text-purple-500 text-sm font-semibold cursor-pointer">Xem chi tiết</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LastestNews;
