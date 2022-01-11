import { useEffect, useRef } from "react";
import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import SearchBar from "../../../components/SearchBar";
import generateKeywords from "../../../helpers/generatekeywords";
import { addDoc, collection, doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/auth-context";
import { useRouter } from "next/router";

const db = getFirestore();

export default function CreatePost() {
  const auth = useAuth();
  const { authUser, loading } = auth;
  const router = useRouter();

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

  async function createPost() {
    const newPost = validatePost(titleRef, jobDesRef, requireRef, salaryRef, quantityRef, expRef, locationRef, benefitRef, expiredTimeRef, authUser?.id);
    if (newPost) {
      const docRef = doc(collection(db, "posts"));
      await setDoc(docRef, { ...newPost, id: docRef.id });
      toast.success("Tạo bản tin tuyển dụng thành công");
      router.push("/");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-gray-100">
        <div>
          <Header />
          <SearchBar />
        </div>
        <div className="w-full flex justify-center text-9xl text-purple-900">
          <svg className="animate-spin" width="1em" height="1em" viewBox="0 0 1024 1024">
            <path
              d="M955 768q-20 34-58 44.5t-72.5-9.5t-45-58.5T789 672q61-106 68-226.5T817.5 216T680 29q47 16 88 40q90 52 152 134.5t87 176t12.5 196T955 768zM768 955q-90 52-192.5 64.5t-196-12.5t-176-87T69 768q-20-34-10-72.5t44.5-58.5t73-9.5T235 672q46 80 116 138t151 86.5t170.5 31T846 899q-37 33-78 56zM512 192q-123 0-230.5 54.5T103 395.5T9 608q-9-49-9-96q0-104 40.5-199t109-163.5T313 40.5T512 0q40 0 68 28t28 68t-28 68t-68 28z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <Footer />
      </div>
    );
  }

  if (!authUser || (authUser && authUser.role != 2)) {
    //router.replace("/auth/login");
  }

  // console.log("Auth user:" + authUser + ", loading:" + loading);
  console.log(auth);

  return (
    <div>
      <Header />
      <SearchBar />
      <div className="w-full py-4 flex justify-center">
        <div className="w-4/5 max-w-screen-xl">
          <div className="text-3xl font-medium mb-5">Tạo bản tin tuyển dụng</div>
          <div className="flex justify-center">
            <div className="w-full xl:w-4/5">
              <InputText value={"Tiêu đề"} placeholder={"Tiêu đề cho bản tin tuyển dụng"} refInstance={titleRef} />
              <InputTextArea
                value={"Mô tả công việc"}
                placeholder={"Mô tả những công việc cụ thể mà ứng viên sẽ làm"}
                refInstance={jobDesRef}
                height={"h-72"}
              />
              <InputTextArea value={"Yêu cầu"} placeholder={"Những kỹ năng yêu cầu cho công việc "} refInstance={requireRef} height={"h-48"} />
              <InputText value={"Mức lương"} placeholder={"Mức lương của công việc"} refInstance={salaryRef} format={"number"} />
              <InputText value={"Số lượng"} placeholder={"Số lượng tuyển dụng"} refInstance={quantityRef} format={"number"} />
              <InputText value={"Số năm kinh nghiệm"} placeholder={"Kinh nghiệm làm việc yêu cầu"} refInstance={expRef} format={"number"} />

              <div className="w-full lg:flex justify-end items-center mt-4">
                <div className="mr-4 font-medium">Địa điểm</div>
                <select
                  ref={locationRef}
                  type="text"
                  name="requirement"
                  id="requirement"
                  className="w-10/12 px-2 py-2 border-2 bg-gray-200 rounded-md focus:border-2 focus:border-purple-500 focus:bg-white focus:outline-purple-500 caret-purple-500"
                >
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
              </div>

              <InputTextArea value={"Đãi ngộ"} placeholder={"Đãi ngộ của công việc đối với ứng viên"} refInstance={benefitRef} height={"h-40"} />

              <div className="w-full lg:flex justify-end items-center mt-4">
                <div className="mr-4 font-medium">Hạn ứng tuyển</div>
                <input
                  ref={expiredTimeRef}
                  type="date"
                  name="requirement"
                  id="requirement"
                  className="w-10/12 px-2 py-2 bg-gray-200 rounded-md focus:bg-white focus:outline-purple-500 caret-purple-500"
                />
              </div>

              <div className="flex justify-center mt-6 mb-10">
                <button onClick={createPost} className="bg-purple-900 px-4 py-2 rounded text-white">
                  Tạo tin tuyển dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

function InputText({ value, placeholder, refInstance, format = "text" }) {
  return (
    <div className="w-full lg:flex justify-end items-center mt-4">
      <div className="mr-4 font-medium">{value}</div>
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

function InputTextArea({ value, placeholder, refInstance, height }) {
  return (
    <div className="w-full lg:flex justify-end items-start mt-4">
      <div className="mr-4 font-medium">{value}</div>
      <textarea
        ref={refInstance}
        type="text"
        placeholder={placeholder}
        className={`w-10/12 ${height} resize-none bg-gray-200 px-2 py-2 rounded-md focus:bg-white focus:outline-purple-500 caret-purple-500`}
      />
    </div>
  );
}

export function validatePost(titleRef, jobDesRef, requireRef, salaryRef, quantityRef, expRef, locationRef, benefitRef, expiredTimeRef, hr_id) {
  if (
    !titleRef.current.value ||
    !jobDesRef.current.value ||
    !requireRef.current.value ||
    !locationRef.current.value ||
    !benefitRef.current.value ||
    !expiredTimeRef.current.value
  ) {
    toast.error("Vui lòng điền đầy đủ thông tin");
    return;
  }

  const salary = parseInt(salaryRef.current.value);
  if (!salaryRef.current.value || !salary || salary < 0) {
    toast.error("Mức lương không hợp lệ");
    return;
  }

  const quantity = parseInt(quantityRef.current.value);
  if (!quantityRef.current.value || !quantity || quantity < 0) {
    toast.error("Số lượng tuyển dụng không hợp lệ");
    return;
  }

  const exp = parseFloat(expRef.current.value);
  if (!expRef.current.value || !exp || exp < 0) {
    toast.error("Số năm kinh nghiệm không hợp lệ");
    return;
  }

  console.log(hr_id);
  if (!hr_id) return;

  const newPost = {
    title: titleRef.current.value,
    job_description: jobDesRef.current.value,
    requirement: requireRef.current.value,
    salary: salary,
    level: "Intern",
    quantity: quantity,
    experience: exp,
    location: locationRef.current.value,
    benefit: benefitRef.current.value,
    createTime: Timestamp.fromDate(new Date(Date.now())),
    expiredTime: Timestamp.fromDate(new Date(expiredTimeRef.current.value)),
    keywords: generateKeywords(titleRef.current.value),
    hr_id: hr_id,
    isHide: false,
  };

  return newPost;
}
