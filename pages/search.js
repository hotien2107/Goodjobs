import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import SearchBar from "../components/SearchBar";
import { getDocs, query, collection, getFirestore, Timestamp, where, orderBy, documentId } from "firebase/firestore";
import Post from "../components/Post";
import useFirebaseAuth from "../hooks/use-auth";
import { useEffect } from "react";

const db = getFirestore();

export async function getServerSideProps(context) {
  const { keyword, location, sort } = context.query;
  let dataSnapshot;
  let q;
  if (location && sort) {
    q = await query(
      collection(db, "posts"),
      where("keywords", "array-contains", keyword.toLowerCase()),
      where("location", "==", location),
      orderBy("salary", sort)
    );
  } else if (location) {
    q = await query(collection(db, "posts"), where("keywords", "array-contains", keyword.toLowerCase().trim()), where("location", "==", location));
  } else if (sort) {
    q = await query(collection(db, "posts"), where("keywords", "array-contains", keyword.toLowerCase().trim()), orderBy("salary", sort));
  } else {
    q = await query(collection(db, "posts"), where("keywords", "array-contains", keyword.toLowerCase().trim()));
  }
  dataSnapshot = await getDocs(q);
  let posts = [];
  const HRs = {};
  dataSnapshot.forEach((doc) => posts.push({ ...doc.data() }));

  posts = posts.map((post) => ({ ...post, createTime: post.createTime.toDate().toString(), expiredTime: post.expiredTime.toDate().toString() }));

  let listHRId = posts.map((post) => post.hr_id);
  if (listHRId.length > 0) {
    q = await query(collection(db, "users"), where("id", "in", listHRId));
    dataSnapshot = await getDocs(q);
    const listHRs = dataSnapshot.docs.map((doc) => ({ ...doc.data() }));
    listHRs.forEach((hr) => {
      HRs[hr.id] = hr;
    });
  }

  return {
    props: {
      posts,
      keyword,
      HRs,
    },
  };
}

export default function SearchPage({ posts, keyword, HRs }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div>
        <Header />
        <SearchBar keyword={keyword} />
        <div className="w-full flex justify-center mt-10">
          <div className="w-3/5 max-w-screen-xl">
            {posts.length > 0 ? (
              <div>
                <div className="italic text-lg mb-3 ml-4">Có {posts.length} kết quả được tìm thấy</div>
                {posts.map((post) => (
                  <Post key={post.id} post={post} HRs={HRs} />
                ))}
              </div>
            ) : (
              <div className="italic text-lg">Không tìm thấy kết thích hợp</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
