import React, {useEffect, useState} from "react";
import {query, collection, where, getDocs, addDoc, onSnapshot, orderBy} from "@firebase/firestore";
import {db} from "../../config/firebase";
import useFirebaseAuth from "../../hooks/use-auth";
import {format} from "date-fns";
import {vi} from "date-fns/locale";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentSection = ({postId}) => {
    const [comments, setComments] = useState([]);
    const auth = useFirebaseAuth();
    const {authUser} = auth;
    const [userComment, setUserComment] = useState("");

    useEffect(() => {
        const getComments = async () => {
            const q = query(collection(db, "comments"), where("post_id", "==", postId), orderBy("createdAt"));
            onSnapshot(q, (querySnapshot) => {
                const listComment = [...comments];
                querySnapshot.forEach(doc => {
                    const userQuery = query(collection(db, "users"), where("id", "==", doc.data().user_id));
                    let userInfo = {
                        id: "",
                        fullName: "",
                        avatar: ""
                    };
                    getDocs(userQuery).then(userSnapshot => {
                        userSnapshot.forEach((userDoc => {
                            userInfo = userDoc.data();
                        }))
                    }).then(() => {
                        listComment.push({
                            ...doc.data(),
                            createdAt: doc.data().createdAt.toDate().toString(),
                            id: doc.id,
                            userFullName: userInfo.fullName,
                            userAvatar: userInfo.avatar,
                            userRole: userInfo.role,
                        });
                        setComments(listComment);
                    });
                })
            })
            // const querySnap = await getDocs(q);
        }
        getComments();
    }, [postId, setComments])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (authUser) {
            const addComment = async () => {
                await addDoc(collection(db, "comments"), {
                    user_id: authUser.id,
                    post_id: postId,
                    comment: userComment,
                    createdAt: new Date()
                });
            }
            addComment();
        } else {
            toast.error("Bạn phải đăng nhập để bình luận", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        setUserComment("");
    }

    return (
        <div>
            <ToastContainer limit={1} autoClose={3000} />
            <section className="pl-2 py-2">
                {comments.length === 0 ? <p>Leave first comment here</p> : comments.map((comment) => (
                    <div className="flex items-center gap-2 mb-4" key={comment.id}>
                        {comment.userAvatar ?
                            <img src={comment.userAvatar} className="h-12 w-12 rounded-full" alt=""/> :
                            <div className="bg-gray-500 h-12 w-12 rounded-full"/>}
                        <div className="flex flex-col">
                            <p className="font-semibold">{comment.userFullName}{comment.userRole === 2 ?
                                <span className="bg-green-200 px-2 ml-2 rounded-lg">HR</span>: null}</p>
                            <p>{comment.comment}</p>
                            {/*<p>{format((new Date() - new Date(comment.createdAt)), "dd")}</p>*/}
                        </div>
                    </div>
                ))}
            </section>
            <section>
                {authUser ?
                    <form onSubmit={handleSubmit} className='left-0 flex w-full bg-slate-100 p-2'>
                        {authUser.avatar ?
                            <img src={authUser.avatar} alt="user-avt" className="rounded-full h-12 w-12 mr-2"/> :
                            <div className="rounded-full h-12 w-12 bg-gray-500 mr-2"/>}
                        <input
                            className='flex-grow h-12 p-2 rounded-full bg-white mr-2'
                            type='text'
                            value={userComment}
                            onChange={(e) => setUserComment(e.target.value)}
                            placeholder='Type your comment here...'
                        />
                    </form> : null}
            </section>
        </div>
    )
}

export default CommentSection;