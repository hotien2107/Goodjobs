import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import SearchBar from "../components/SearchBar";
import { getDocs, query, collection, getFirestore, Timestamp, where, orderBy } from "firebase/firestore";
import Post from "../components/Post";

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
  dataSnapshot.forEach((doc) => posts.push({ id: doc.id, ...doc.data() }));

  posts = posts.map((post) => ({ ...post, createTime: post.createTime.toDate().toString(), expiredTime: post.expiredTime.toDate().toString() }));

  return {
    props: {
      posts,
      keyword,
    },
  };
}

export default function SearchPage({ posts, keyword }) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <SearchBar keyword={keyword} />
      <div className="w-full flex justify-center pb-72">
        <div className="w-3/5 max-w-screen-xl">
          {posts.length > 0 ? (
            <div>
              <div className="italic text-lg mb-3 ml-4">Có {posts.length} kết quả được tìm thấy</div>
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="italic text-lg">Không tìm thấy kết thích hợp</div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-72">
        <Footer />
      </div>
    </div>
  );
}
