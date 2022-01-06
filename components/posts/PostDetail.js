import React, {useEffect, useState} from "react";
import {db, storage} from "../../config/firebase";
import {useRouter} from "next/router";
import {format} from "date-fns";
import {vi} from "date-fns/locale";
import CommentSection from "./CommentSection";
import {query, collection, getDocs, where, doc, getDoc, limit} from "@firebase/firestore";
import {ref, uploadBytes} from "@firebase/storage"
import Modal from "../Modal";
import {GrDocumentUser} from "react-icons/gr"
import {MdOutlineSaveAlt} from "react-icons/md"
import useFirebaseAuth from "../../hooks/use-auth";
import {nanoid} from "nanoid/async"
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const postDataTemplate = {
    id: "",
    requirement: [],
    job_description: [],
    benefit: [],
    createTime: 0,
    expiredTime: 0,
    hr_info: {},
    salary: 0
}

const PostDetail = () => {
    const router = useRouter();
    const [postId, setPostId] = useState("");
    const [postData, setPostData] = useState(postDataTemplate);
    const [commentActive, setCommentActive] = useState(true);
    const [applyFormVisible, setApplyFormVisible] = useState(false);
    const [uploadedCV, setUploadedCV] = useState(null);
    const auth = useFirebaseAuth();
    const {authUser} = auth;

    useEffect(() => {
        console.log(uploadedCV);
    }, [uploadedCV]);

    useEffect(async () => {
        const getPost = async () => {
            if (!router.isReady) return;
            const {postId} = router.query;
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
                    })
                    const data = {
                        id: postId,
                        ...docSnap.data(),
                        requirement: docSnap.data().requirement.split("\n"),
                        job_description: docSnap.data().job_description.split("\n"),
                        benefit: docSnap.data().benefit.split("\n"),
                        createTime: docSnap.data().createTime.toDate().toString(),
                        expiredTime: docSnap.data().expiredTime.toDate().toString(),
                        hr_info: userInfo,
                    }
                    setPostData(data);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });

        }

        await getPost();
    }, [router.isReady]);

    const handleRateClick = () => {
        setCommentActive(false);
    }

    const handleCommentClick = () => {
        setCommentActive(true);
    }

    const handleApplyClick = () => {
        setApplyFormVisible(true);
    }

    const handleApplyFormClose = () => {
        setApplyFormVisible(false);
    }

    const handleApplySubmit = async () => {
        if (uploadedCV === null) {
            toast.error("Bạn đang để trống CV", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            const randomId = await nanoid();
            const fileName = `${authUser.fullName}_${randomId}.${uploadedCV.name.split('.').at(-1)}`
            const cvRef = ref(storage, `CV/${fileName}`);

            toast.loading("CV đang được tải lên", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false,
                toastId: "loadingCV"
            })
            uploadBytes(cvRef, uploadedCV).then((snapshot) => {
                setApplyFormVisible(false);
                toast.dismiss("loadingCV");
                toast.success("Đã nộp CV thành công", {
                    position: toast.POSITION.TOP_CENTER
                })
            })
        }
    }

    const ratingSection = (
        <div className="text-center">
            <p>In construction</p>
            <p>...</p>
        </div>
    )

    return (
        <>
            <ToastContainer className="absolute z-50" limit={3} autoClose={3000}/>
            <section className="flex flex-col items-center">
                <div className="bg-white drop-shadow-lg rounded-lg w-4/5 my-8 p-5 flex justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">{postData.title}</h1>
                        <h5>{postData.location}</h5>
                        <p><b>Vị trí:</b> {postData.level}</p>
                        <p><b>Số lượng:</b> {postData.quantity}</p>
                        <p><b>Thời hạn:</b> {format(new Date(postData.expiredTime), "dd MMMM yyyy", { locale: vi })}</p>
                        <section className="flex items-center gap-2 mt-2">
                            {postData.hr_info ? <img className="rounded-full h-12 w-12" src={postData.hr_info.avatar}  alt=""/> : <div className="rounded-full h-12 w-12 bg-gray-500 mr-2"/>}
                            <p>{postData.hr_info.fullName}</p>
                        </section>
                    </div>
                    <div className="flex flex-col justify-end gap-4">
                        <button className="flex items-center gap-4 text-white w-32 p-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded" onClick={handleApplyClick}>
                            <GrDocumentUser />
                            Ứng tuyển</button>
                        <button className="flex items-center gap-4 text-white w-32 p-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded">
                            <MdOutlineSaveAlt />
                            Lưu tin</button>
                    </div>
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg w-4/5 mb-8 p-5">
                    <h1 className="font-bold">Mô tả công việc</h1>
                    <ul className="list-disc pl-8">
                        {postData.job_description.map((descriptionLine, index) => (
                            <li key={index}>{descriptionLine}</li>
                        ))}
                    </ul>
                    <h1 className="font-bold">Yêu cầu công việc</h1>
                    <ul className="list-disc pl-8">
                        {postData.requirement.map((requirementLine, index) => (
                            <li key={index}>{requirementLine}</li>
                        ))}
                    </ul>
                    <h1 className="font-bold">Mức lương</h1>
                    <p className="pl-8">{postData.salary.toLocaleString()} VNĐ</p>
                    <h1 className="font-bold">Quyền lợi</h1>
                    <ul className="list-disc pl-8">
                        {postData.benefit.map((benefitLine, index) => (
                            <li key={index}>{benefitLine}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg w-4/5 mb-8 overflow-hidden">
                    <ul className="flex h-8">
                        <li className={`w-full flex items-center justify-center hover:text-indigo-500 font-semibold border-r ${commentActive ? "text-indigo-500" : "bg-gray-200"}`} onClick={handleCommentClick}>Bình luận</li>
                        <li className={`w-full flex items-center justify-center hover:text-indigo-500 font-semibold border-l ${commentActive ? "bg-gray-200" : "text-indigo-500"}`} onClick={handleRateClick}>Đánh giá</li>
                    </ul>
                    {commentActive ? <CommentSection postId={postId} /> : ratingSection}
                </div>
            </section>
            <Modal open={applyFormVisible} onClose={handleApplyFormClose}>
                <form action="#">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="cv-file" className="font-semibold">Tải lên CV</label>
                        <input type="file" id="cv-file" accept="application/pdf" onChange={(e) => setUploadedCV(e.target.files[0])} />
                        <button className="text-white w-32 p-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded self-end" onClick={handleApplySubmit}>
                            Ứng tuyển</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default PostDetail;