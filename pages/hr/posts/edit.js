import { useEffect, useRef } from "react";
import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import SearchBar from "../../../components/SearchBar";
import { validatePost } from "./create";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/auth-context";

const db = getFirestore();

export async function getServerSideProps(context) {
  const { ID } = context.query;
  const docRef = doc(db, "posts", ID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const docData = docSnap.data();
    const post = { id: ID, ...docData, createTime: docData.createTime.toDate().toString(), expiredTime: docData.expiredTime.toDate().toString() };
    return {
      props: {
        post,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default function EditPost({ post }) {
  const titleRef = useRef();
  const jobDesRef = useRef();
  const requireRef = useRef();
  const salaryRef = useRef();
  const levelRef = useRef();
  const quantityRef = useRef();
  const expRef = useRef();
  const locationRef = useRef();
  const benefitRef = useRef();
  const expiredTimeRef = useRef();
  const { authUser } = useAuth();

  useEffect(() => {
    const expiredDate = new Date(post.expiredTime);
    const year = expiredDate.getFullYear();
    const month = expiredDate.getMonth() + 1;
    const day = expiredDate.getDate();
    titleRef.current.value = post.title;
    jobDesRef.current.value = post.job_description;
    requireRef.current.value = post.requirement;
    salaryRef.current.value = post.salary;
    quantityRef.current.value = post.quantity;
    expRef.current.value = post.experience;
    locationRef.current.value = post.location;
    benefitRef.current.value = post.benefit;
    expiredTimeRef.current.value = new Date(Date.UTC(year, month, day)).toISOString().split("T")[0];
  }, [post]);

  async function editPost() {
    console.log(authUser);
    const newPost = validatePost(titleRef, jobDesRef, requireRef, salaryRef, quantityRef, expRef, locationRef, benefitRef, expiredTimeRef, authUser?.id);
    if (newPost) {
      const docRef = doc(db, "posts", post.id);
      const docSnap = await updateDoc(docRef, newPost);
      toast.success("B???n ch???nh s???a ???? ???????c l??u l???i");
    }
  }

  return (
    <div>
      <Header />
      <SearchBar />
      <div className="w-full py-4 flex justify-center">
        <div className="w-4/5 max-w-screen-xl">
          <div className="text-3xl font-medium mb-5">Ch???nh s???a b???n tin tuy???n d???ng</div>
          {post ? (
            <div className="flex justify-center">
              <div className="w-full xl:w-4/5">
                <InputText title={"Ti??u ?????"} placeholder={"Ti??u ????? cho b???n tin tuy???n d???ng"} refInstance={titleRef} />
                <InputTextArea
                  title={"M?? t??? c??ng vi???c"}
                  placeholder={"M?? t??? nh???ng c??ng vi???c c??? th??? m?? ???ng vi??n s??? l??m"}
                  refInstance={jobDesRef}
                  height={"h-72"}
                />
                <InputTextArea title={"Y??u c???u"} placeholder={"Nh???ng k??? n??ng y??u c???u cho c??ng vi???c "} refInstance={requireRef} height={"h-48"} />
                <InputText title={"M???c l????ng"} placeholder={"M???c l????ng c???a c??ng vi???c"} refInstance={salaryRef} format={"number"} />
                <InputText title={"S??? l?????ng"} placeholder={"S??? l?????ng tuy???n d???ng"} refInstance={quantityRef} format={"number"} />
                <InputText title={"Kinh nghi???m"} placeholder={"Kinh nghi???m l??m vi???c y??u c???u"} refInstance={expRef} format={"number"} />

                <div className="w-full lg:flex justify-end items-center mt-4">
                  <div className="mr-4 font-medium">?????a ??i???m</div>
                  <select
                    ref={locationRef}
                    type="text"
                    name="requirement"
                    id="requirement"
                    className="w-10/12 px-2 py-2 border-2 bg-gray-200 rounded-md focus:border-2 focus:border-purple-500 focus:bg-white focus:outline-purple-500 caret-purple-500"
                  >
                    <option value="H??? Ch?? Minh">H??? Ch?? Minh</option>
                    <option value="H?? N???i">H?? N???i</option>
                    <option value="???? N???ng">???? N???ng</option>
                  </select>
                </div>

                <InputTextArea value={"????i ng???"} placeholder={"????i ng??? c???a c??ng vi???c ?????i v???i ???ng vi??n"} refInstance={benefitRef} height={"h-40"} />

                <div className="w-full lg:flex justify-end items-center mt-4">
                  <div className="mr-4 font-medium">H???n ???ng tuy???n</div>
                  <input
                    ref={expiredTimeRef}
                    type="date"
                    name="requirement"
                    id="requirement"
                    className="w-10/12 px-2 py-2 bg-gray-200 rounded-md focus:bg-white focus:outline-purple-500 caret-purple-500"
                  />
                </div>

                <div className="flex justify-center mt-6 mb-10">
                  <button onClick={editPost} className="bg-purple-900 px-4 py-2 rounded text-white">
                    L??u b???n ch???nh s???a
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="italic text-lg">Kh??ng t??m th???y k???t th??ch h???p</div>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

function InputText({ title, placeholder, refInstance, format = "text" }) {
  return (
    <div className="w-full lg:flex justify-end items-center mt-4">
      <div className="mr-4 font-medium">{title}</div>
      <input
        ref={refInstance}
        min={format == "number" ? 0 : null}
        type={format}
        placeholder={placeholder}
        className="w-10/12 px-2 py-2 bg-gray-200 rounded-md focus:bg-white focus:outline-purple-500 caret-purple-500"
      />
    </div>
  );
}

function InputTextArea({ title, placeholder, refInstance, height }) {
  return (
    <div className="w-full lg:flex justify-end items-start mt-4">
      <div className="mr-4 font-medium">{title}</div>
      <textarea
        ref={refInstance}
        type="text"
        placeholder={placeholder}
        className={`w-10/12 ${height} resize-none bg-gray-200 px-2 py-2 rounded-md focus:bg-white focus:outline-purple-500 caret-purple-500`}
      />
    </div>
  );
}
