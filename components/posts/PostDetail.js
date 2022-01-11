import React, { useEffect, useState } from "react";
import { db, storage } from "../../config/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import CommentSection from "./CommentSection";
import { query, collection, getDocs, where, doc, getDoc, limit } from "@firebase/firestore";
import { ref, uploadBytes } from "@firebase/storage";
import Modal from "../Modal";
import useFirebaseAuth from "../../hooks/use-auth";
import { nanoid } from "nanoid/async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, deleteDoc, setDoc } from "@firebase/firestore";
import { AiFillFileZip, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

const postDataTemplate = {
  id: "",
  requirement: [],
  job_description: [],
  benefit: [],
  createTime: 0,
  expiredTime: 0,
  hr_info: {},
  salary: 0,
};

const PostDetail = () => {
  const router = useRouter();
  const [postId, setPostId] = useState("");
  const [postData, setPostData] = useState(postDataTemplate);
  // const [commentActive, setCommentActive] = useState(true);
  const [applyFormVisible, setApplyFormVisible] = useState(false);
  const [uploadedCV, setUploadedCV] = useState(null);
  const [cvSubmitDisable, setCVSubmitDisable] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const auth = useFirebaseAuth();
  const { authUser } = auth;

  useEffect(() => {
    const getPost = async () => {
      if (!router.isReady) return;
      const { postId } = router.query;
      setPostId(postId);
      const docRef = doc(db, "posts", postId.toString());
      getDoc(docRef).then(async (docSnap) => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const hrQuery = query(collection(db, "users"), where("id", "==", docSnap.data().hr_id), limit(1));
          const hrSnap = await getDocs(hrQuery);
          let userInfo;
          hrSnap.forEach((userData) => {
            userInfo = userData.data();
          });
          const data = {
            id: postId,
            ...docSnap.data(),
            requirement: docSnap
              .data()
              .requirement.replace(/\s+/g, " ")
              .trim()
              .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\;)\s/gm),
            job_description: docSnap
              .data()
              .job_description.replace(/\s+/g, " ")
              .trim()
              .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\;)\s/gm),
            benefit: docSnap
              .data()
              .benefit.replace(/\s+/g, " ")
              .trim()
              .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\;)\s/gm),
            createTime: docSnap.data().createTime.toDate().toString(),
            expiredTime: docSnap.data().expiredTime.toDate().toString(),
            hr_info: userInfo,
          };
          setPostData(data);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    };

    getPost();
  }, [router.isReady]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const queryObj = await query(collection(db, "favorites"), where("user_id", "==", authUser.id));
      const dataSnapshot = await getDocs(queryObj);
      let fav = [];
      fav = dataSnapshot.docs.map((doc) => ({ ...doc.data() }));
      const favorite_ids = fav.map((fav) => fav.post_id);
      setFavoriteIds(favorite_ids);
      setIsFavorite(favorite_ids.includes(postId));
    };
    if (authUser) {
      fetchFavorites();
    }
  }, [authUser]);

  // const handleRateClick = () => {
  //   setCommentActive(false);
  // };
  //
  // const handleCommentClick = () => {
  //   setCommentActive(true);
  // };

  const handleApplyClick = () => {
    setApplyFormVisible(true);
  };

  const handleApplyFormClose = () => {
    setApplyFormVisible(false);
  };

  const handleApplySubmit = async () => {
    setCVSubmitDisable(true);
    if (uploadedCV === null) {
      toast.error("Bạn đang để trống CV", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const randomId = await nanoid();
      const fileName = `${authUser.fullName}_${randomId}.${uploadedCV.name.split(".").at(-1)}`;
      const cvRef = ref(storage, `CV/${fileName}`);

      toast.loading("CV đang được tải lên", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
        toastId: "loadingCV",
      });
      uploadBytes(cvRef, uploadedCV).then((snapshot) => {
        addDoc(collection(db, "user_applying"), {
          user_id: authUser.id,
          post_id: postId,
          cv_path: snapshot.metadata.fullPath,
        }).then(() => {
          setApplyFormVisible(false);
          setCVSubmitDisable(false);
          toast.dismiss("loadingCV");
          toast.success("Đã nộp CV thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      });
    }
  };

  const handleFavoriteClick = async () => {
    if (authUser) {
      if (authUser.role && authUser.role === 1) {
        if (isFavorite) {
          const queryObj = await query(collection(db, "favorites"), where("user_id", "==", authUser.id), where("post_id", "==", postId));
          const dataSnapshot = await getDocs(queryObj);
          dataSnapshot.forEach(async (_doc) => {
            await deleteDoc(doc(db, "favorites", _doc.id));
          });
          toast.success("Xóa tin khỏi danh sách đã lưu");
        } else {
          const docRef = doc(collection(db, "favorites"));
          await setDoc(docRef, {
            id: docRef.id,
            user_id: authUser.id,
            post_id: postId,
            note: "",
          });
          toast.success("Lưu tin vào danh sách yêu thích");
        }
        setIsFavorite(!isFavorite);
      } else {
        toast.error("Bạn không có quyền thực hiện chức năng này!");
      }
    }
  };

  return (
    <>
      <ToastContainer className="absolute z-50" limit={3} autoClose={3000} />
      <section className="flex flex-col items-center">
        <div className="bg-white drop-shadow-lg rounded-lg w-4/5 my-8 p-5 flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{postData.title}</h1>
            <h5>{postData.location}</h5>
            <p>
              <b>Vị trí:</b> {postData.level}
            </p>
            <p>
              <b>Mức lương dự kiến:</b> {new Intl.NumberFormat("vi", { style: "currency", currency: "VND" }).format(postData.salary)}
            </p>
            <p>
              <b>Số lượng tuyển:</b> {postData.quantity}
            </p>
            <p>
              <b>Thời hạn:</b> {format(new Date(postData.expiredTime), "dd MMMM yyyy", { locale: vi })}
            </p>
            <section className="flex items-center gap-2 mt-2">
              {postData.hr_info ? (
                <img className="rounded-full h-12 w-12" src={postData.hr_info.avatar} alt="" />
              ) : (
                <div className="rounded-full h-12 w-12 bg-gray-500 mr-2" />
              )}
              <p>{postData.hr_info.fullName}</p>
            </section>
          </div>
          <div className="flex flex-col justify-end gap-4">
            {authUser?.role == 1 ? (
              <div className="flex items-center text-2xl bg-purple-700 text-white px-3 py-2 rounded-lg cursor-pointer" onClick={handleApplyClick}>
                <AiFillFileZip />
                <span className="text-sm font-semibold ml-3">Ứng tuyển</span>
              </div>
            ) : null}
            {authUser?.id == postData.hr_id ? (
              <Link href={`/hr/posts/edit?ID=${postId}`}>
                <div className="flex items-center text-2xl bg-purple-700 text-white px-3 py-2 rounded-lg cursor-pointer">
                  <FiEdit2 />
                  <span className="text-sm font-semibold ml-3">Chỉnh sửa</span>
                </div>
              </Link>
            ) : (
              <Link href={`/chat/${postData.hr_info.id}`}>
                <div className="flex items-center text-2xl bg-purple-700 text-white px-3 py-2 rounded-lg cursor-pointer">
                  <FaComment />
                  <span className="text-sm font-semibold ml-3">Nhắn tin HR</span>
                </div>
              </Link>
            )}

            {authUser?.id == postData.hr_id || authUser?.role == 2 ? null : (
              <div className="flex items-center text-2xl bg-purple-700 text-white px-3 py-2 rounded-lg cursor-pointer" onClick={handleFavoriteClick}>
                {isFavorite ? (
                  <>
                    <AiFillHeart />
                    <span className="text-sm font-semibold ml-3">Xóa yêu thích</span>
                  </>
                ) : (
                  <>
                    <AiOutlineHeart />
                    <span className="text-sm font-semibold ml-3">Yêu thích</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="bg-white drop-shadow-lg rounded-lg w-4/5 mb-8 p-5">
          <h1 className="font-bold">Mô tả công việc</h1>
          <ul className="list-disc pl-8">
            {postData.job_description.map((descriptionLine, index) => (descriptionLine !== "" ? <li key={index}>{descriptionLine}</li> : null))}
          </ul>
          <h1 className="font-bold">Yêu cầu công việc</h1>
          <ul className="list-disc pl-8">
            {postData.requirement.map((requirementLine, index) => (requirementLine !== "" ? <li key={index}>{requirementLine}</li> : null))}
          </ul>
          <h1 className="font-bold">Quyền lợi</h1>
          <ul className="list-disc pl-8">{postData.benefit.map((benefitLine, index) => (benefitLine !== "" ? <li key={index}>{benefitLine}</li> : null))}</ul>
        </div>
        <div className="bg-white drop-shadow-lg rounded-lg w-4/5 mb-8 overflow-hidden">
          {/*<ul className="flex h-8">*/}
          {/*  <li*/}
          {/*    className={`w-full flex items-center justify-center hover:text-indigo-500 font-semibold border-r ${*/}
          {/*      commentActive ? "text-indigo-500" : "bg-gray-200"*/}
          {/*    }`}*/}
          {/*    onClick={handleCommentClick}*/}
          {/*  >*/}
          {/*    Bình luận*/}
          {/*  </li>*/}
          {/*  <li*/}
          {/*    className={`w-full flex items-center justify-center hover:text-indigo-500 font-semibold border-l ${*/}
          {/*      commentActive ? "bg-gray-200" : "text-indigo-500"*/}
          {/*    }`}*/}
          {/*    onClick={handleRateClick}*/}
          {/*  >*/}
          {/*    Đánh giá*/}
          {/*  </li>*/}
          {/*</ul>*/}
          <div className="h-12 flex items-center pl-4 font-semibold text-xl border-b-2">Bình luận</div>
          <CommentSection postId={postId} />
        </div>
      </section>
      <Modal open={applyFormVisible} onClose={handleApplyFormClose}>
        <form action="#">
          <div className="flex flex-col gap-2">
            <label htmlFor="cv-file" className="font-semibold">
              Tải lên CV
            </label>
            <input type="file" id="cv-file" accept="application/pdf" onChange={(e) => setUploadedCV(e.target.files[0])} />
            <button
              className="text-white w-32 p-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded self-end"
              onClick={handleApplySubmit}
              disabled={cvSubmitDisable}
            >
              Ứng tuyển
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PostDetail;
