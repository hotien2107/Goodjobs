import React, {useEffect, useState} from "react";
import {db} from "../../config/firebase";
import {useRouter} from "next/router";
import {format} from "date-fns";
import {vi} from "date-fns/locale";
import CommentSection from "./CommentSection";
import {query, collection, getDocs, where, doc, getDoc, limit} from "@firebase/firestore";

export function RiSearchLine(props) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}><path d="M18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7c-3.868 0-7 3.132-7 7c0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="currentColor"></path></svg>
    )
}

export function IcBaselineSaveAlt(props) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5l-5-5l1.41-1.41L11 12.67V3h2z" fill="currentColor"></path></svg>
    )
}

const postDataTemplate = {
    id: "",
    requirement: [],
    job_description: [],
    benefit: [],
    createTime: "",
    expiredTime: "",
    hr_info: {}
}

const PostDetail = () => {
    const router = useRouter();
    const [postId, setPostId] = useState("");
    const [postData, setPostData] = useState(postDataTemplate);
    const [commentActive, setCommentActive] = useState(true);

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
                        createTime: docSnap.data().createTime.toDate().toDateString(),
                        expiredTime: docSnap.data().expiredTime.toDate().toDateString(),
                        hr_info: userInfo,
                    }
                    console.log(data.expiredTime);
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

    const ratingSection = (
        <div className="text-center">
            <p>In construction</p>
            <p>...</p>
        </div>
    )

    return (
        <>
            <section className="flex flex-col items-center">
                <div className="bg-white drop-shadow-lg rounded-lg w-4/5 my-8 p-5 flex justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">{postData.title}</h1>
                        <h5>{postData.location}</h5>
                        <p><b>Vị trí:</b> {postData.level}</p>
                        <p><b>Số lượng:</b> {postData.quantity}</p>
                        {/*<p><b>Thời hạn:</b> {format(new Date(postData.createTime), "dd MMMM yyyy", { locale: vi })}</p>*/}
                        <section className="flex items-center gap-2 mt-2">
                            {postData.hr_info ? <img className="rounded-full h-12 w-12" src={postData.hr_info.avatar}  alt=""/> : <div className="rounded-full h-12 w-12 bg-gray-500 mr-2"/>}
                            <p>{postData.hr_info.fullName}</p>
                        </section>
                    </div>
                    <div className="flex flex-col justify-end gap-4">
                        <button className="flex items-center gap-4 text-white w-32 p-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded">
                            <RiSearchLine />
                            Ứng tuyển</button>
                        <button className="flex items-center gap-4 text-white w-32 p-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded">
                            <IcBaselineSaveAlt />
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
                    <h1 className="font-bold">Quyền lợi</h1>
                    <ul className="list-disc pl-8">
                        {postData.benefit.map((benefitLine, index) => (
                            <li key={index}>{benefitLine}</li>
                        ))}
                    </ul>
                    {/*<p>{format(new Date(postData.createTime), "dd MMMM yyyy", { locale: vi })}</p>*/}
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg w-4/5 mb-8 overflow-hidden">
                    <ul className="flex h-8">
                        <li className={`w-full flex items-center justify-center hover:text-indigo-500 font-semibold border-r ${commentActive ? "text-indigo-500" : "bg-gray-200"}`} onClick={handleCommentClick}>Bình luận</li>
                        <li className={`w-full flex items-center justify-center hover:text-indigo-500 font-semibold border-l ${commentActive ? "bg-gray-200" : "text-indigo-500"}`} onClick={handleRateClick}>Đánh giá</li>
                    </ul>
                    {commentActive ? <CommentSection postId={postId} /> : ratingSection}
                </div>
            </section>
        </>
    );
}

export default PostDetail;