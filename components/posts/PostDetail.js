import {useEffect, useState} from "react";
import {db} from "../../config/firebase";
import {doc, getDoc} from "firebase/firestore";
import {useRouter} from "next/router";

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

function toDateTime(secs) {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

const PostDetail = () => {
    const router = useRouter();
    const [postId, setPostId] = useState("");
    const [postData, setPostData] = useState({});

    useEffect(() => {
        const getPost = async () => {
            if (!router.isReady) return;
            const {postId} = router.query;
            setPostId(postId);
            const docRef = doc(db, "posts", postId.toString());
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setPostData(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        getPost();
    }, [router.isReady]);

    return (
        <>
            <section className="flex flex-col items-center">
                <div className="bg-white drop-shadow-lg rounded-lg w-3/5 my-8 p-5 flex justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">{postData.title}</h1>
                        <h5>{postData.location}</h5>
                        <p><b>Vị trí:</b> {postData.level}</p>
                        <p><b>Số lượng:</b> {postData.quantity}</p>
                        <p>Ten gi do o day</p>
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
                <div className="bg-white drop-shadow-lg rounded-lg w-3/5 mb-8 p-5">
                    <h1 className="font-bold">Mô tả công việc</h1>
                    <p className="pl-8">{postData["job_description"]}</p>
                    <h1 className="font-bold">Yêu cầu công việc</h1>
                    <p className="pl-8">{postData.requirement}</p>
                    <h1 className="font-bold">Quyền lợi</h1>
                    <p className="pl-8">{postData.benefit}</p>
                    <p>{toDateTime(postData.expiredTime).toString()}</p>
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg w-3/5 mb-8 p-5">
                    <p>Khung binh luan va danh gia</p>
                </div>
            </section>
        </>
    );
}

export default PostDetail;