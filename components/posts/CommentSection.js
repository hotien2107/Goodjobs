import React, {useEffect, useState} from "react";
import {query, collection, where, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase";
import {useAuth} from "../../context/auth-context";
import useFirebaseAuth from "../../hooks/use-auth";
import {FaPaperPlane} from "react-icons/fa";

const CommentSection = ({postId}) => {
    const [comments, setComments] = useState([]);
    const auth = useFirebaseAuth();
    const {authUser} = auth;
    const [userComment, setUserComment] = useState("");

    useEffect(() => {
        const getComments = async () => {
            const q = query(collection(db, "comments"), where("post_id", "==", postId));
            const querySnap = await getDocs(q);
            querySnap.forEach(doc => {
                const listComment = [...comments];
                listComment.push(doc.data());
                setComments(listComment);
            })
        }
        getComments();
        console.log(authUser);
    }, [])

    return (
        <div>
            <section>
                {comments.length === 0 ? <p>Leave first comment here</p> : null}
            </section>
            <section>
                {/*{authUser ?*/}
                {/*    <form className='left-0 flex w-full bg-slate-100 p-2'>*/}
                {/*        /!*{authUser.photoURL ? <img src={authUser.photoURL}  alt="user-avt"/> : <div className="rounded-full h-12 w-12 bg-gray-500" />}*!/*/}
                {/*        <div className="rounded-full h-12 w-12 bg-gray-500 mr-2"/>*/}
                {/*        <input*/}
                {/*            className='flex-grow h-12 p-2 rounded-full bg-white mr-2'*/}
                {/*            type='text'*/}
                {/*            value={userComment}*/}
                {/*            onChange={(e) => setUserComment(e.target.value)}*/}
                {/*            placeholder='Type your message here...'*/}
                {/*        />*/}
                {/*    </form> : null}*/}
                <form className='left-0 flex w-full bg-slate-100 p-2'>
                    {/*{authUser.photoURL ? <img src={authUser.photoURL}  alt="user-avt"/> : <div className="rounded-full h-12 w-12 bg-gray-500" />}*/}
                    <div className="rounded-full h-12 w-12 bg-gray-500 mr-2"/>
                    <input
                        className='flex-grow h-12 p-2 rounded-full bg-white mr-2'
                        type='text'
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        placeholder='Type your message here...'
                    />
                </form>
            </section>
        </div>
    )
}

export default CommentSection;