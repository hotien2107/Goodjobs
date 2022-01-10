import { collection, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import SearchBar from "../components/SearchBar";
import LastestNews from "../components/homepage/lastest_news";
import CategoriesNews from "../components/homepage/categories_news";
import { db } from "../config/firebase";

export async function getServerSideProps(context) {
  let posts = [];
  let highestPaid = [];
  let HCMCity = [];
  let Expired = [];

  let dataSnapshot = await getDocs(query(collection(db, "posts"), orderBy("createTime", "desc"), limit(10)));
  dataSnapshot.forEach((doc) => posts.push({ ...doc.data() }));
  posts = posts.map((post) => ({
    ...post,
    createTime: post.createTime.toDate().toString(),
    expiredTime: post.expiredTime.toDate().toString(),
  }));

  dataSnapshot = await getDocs(query(collection(db, "posts"), orderBy("salary", "desc"), limit(5)));
  dataSnapshot.forEach((doc) => highestPaid.push({ ...doc.data() }));
  highestPaid = highestPaid.map((post) => ({
    ...post,
    createTime: post.createTime.toDate().toString(),
    expiredTime: post.expiredTime.toDate().toString(),
  }));

  dataSnapshot = await getDocs(query(collection(db, "posts"), where("location", "==", "Hồ Chí Minh"), limit(5)));
  dataSnapshot.forEach((doc) => HCMCity.push({ ...doc.data() }));
  HCMCity = HCMCity.map((post) => ({
    ...post,
    createTime: post.createTime.toDate().toString(),
    expiredTime: post.expiredTime.toDate().toString(),
  }));

  dataSnapshot = await getDocs(query(collection(db, "posts"), orderBy("expiredTime", "desc"), limit(5)));
  dataSnapshot.forEach((doc) => Expired.push({ ...doc.data() }));
  Expired = Expired.map((post) => ({
    ...post,
    createTime: post.createTime.toDate().toString(),
    expiredTime: post.expiredTime.toDate().toString(),
  }));

  return {
    props: {
      posts,
      highestPaid,
      HCMCity,
      Expired,
    },
  };
}

export default function Home({ posts, highestPaid, HCMCity, Expired }) {
  const iconSalary = (
    <svg width='0.97em' height='1em' viewBox='0 0 960 993'>
      <path
        d='M704 992q-45 1-224 1t-224-1q-127-3-191.5-17T0 928q0-20 20-80.5t44-127t44-153T128 416q0-192 352-192t352 192q0 65 20 151.5t44 153t44 127t20 80.5q0 33-64.5 47T704 992zM480 448q68 0 113.5 16t46.5 47v1q0 13 9.5 22.5T672 544t22.5-9.5T704 512q0-117-192-127v-33q0-13-9.5-22.5T480 320t-22.5 9.5T448 352v33q-192 10-192 127q0 22 6.5 38t21 26.5t31.5 17t45 9.5t54 4t66 1q69 0 114.5 16.5T640 672t-45.5 47.5T480 736q-68 0-113.5-16T320 673v-1q0-13-9.5-22.5T288 640t-22.5 9.5T256 672q0 117 192 127v33q0 13 9.5 22.5T480 864t22.5-9.5T512 832v-33q192-10 192-127q0-128-224-128q-14 0-35 .5t-34 1t-29 0t-26-2.5t-19-5.5t-13-10t-4-15.5q0-31 46-47.5T480 448zm0-288q-60 0-110 6q-21-42-35.5-81.5T320 32q0-16 26-32q24 14 61 23t73 9t73-9t61-23q26 16 26 32q0 13-14.5 52.5T590 166q-50-6-110-6z'
        fill='currentColor'
      ></path>
    </svg>
  );

  const iconCity = (
    <svg width='1em' height='1em' viewBox='0 0 24 24'>
      <path
        d='M10 2v2.26l2 1.33V4h10v15h-5v2h7V2H10M7.5 5L0 10v11h15V10L7.5 5M14 6v.93L15.61 8H16V6h-2m4 0v2h2V6h-2M7.5 7.5L13 11v8h-3v-6H5v6H2v-8l5.5-3.5M18 10v2h2v-2h-2m0 4v2h2v-2h-2z'
        fill='currentColor'
      ></path>
    </svg>
  );

  const iconExpired = (
    <svg width='1em' height='1em' viewBox='0 0 15 15'>
      <g fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M5.5.5A.5.5 0 0 1 6 0h3a.5.5 0 0 1 0 1H8v1.12a6.363 6.363 0 0 1 2.992 1.016a.638.638 0 0 1 .066-.078l1-1a.625.625 0 0 1 .884.884l-.975.975A6.4 6.4 0 1 1 7 2.119V1H6a.5.5 0 0 1-.5-.5zm-3.4 8a5.4 5.4 0 1 1 10.8 0a5.4 5.4 0 0 1-10.8 0zm5.4 0V4.1a4.4 4.4 0 1 0 3.111 7.511L7.5 8.5z'
          fill='currentColor'
        ></path>
      </g>
    </svg>
  );

  return (
    <div>
      <Head>
        <title>Goodjobs</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='min-h-screen flex flex-col justify-between bg-gray-100'>
        <div>
          <Header />
          <SearchBar />
          <div className='w-full flex justify-center mb-6'>
            <div className='w-4/5 content-center max-w-screen-xl'>
              <div className='mt-4 font-bold text-xl'>Website chuyên cung cấp thông tin tuyển dụng</div>
              <div className='text-sm'>
                Giúp các Ứng viên có nhiều vơ hội việc làm, kết nối Ứng viên với HR với nhau
              </div>
              <div className='w-full my-4'>
                <Image src={"/images/banner.png"} layout='responsive' height='64' width='299' alt='' />
              </div>
              <LastestNews posts={posts} />
              <div className='my-12 grid grid-cols-3 gap-x-6'>
                <div className='flex items-center justify-center px-4 py-8 bg-purple-900 text-white rounded-lg'>
                  <div className='text-3xl mr-4'>
                    <svg width='1em' height='1em' viewBox='0 0 32 32'>
                      <path
                        d='M28.916 8.01L15.953 1.887a.92.92 0 0 0-1.288.638c-.003.01-1.04 4.83-2.58 9.635c-.525 1.647-1.113 3.275-1.727 4.705l1.665.786c2-4.642 3.584-11.05 4.18-13.613L27.47 9.353c-.346 1.513-1.233 5.223-2.42 8.927c-.767 2.4-1.665 4.797-2.585 6.532c-.89 1.79-1.958 2.67-2.197 2.552c-1.42.03-2.418-1.262-3.09-2.918a13.7 13.7 0 0 1-.657-2.246c-.128-.618-.167-1.006-.17-1.006a.906.906 0 0 0-.52-.73l-12.96-6.12a.924.924 0 0 0-.926.08a.92.92 0 0 0-.38.847c.008.046.195 1.85.947 3.737c.522 1.32 1.407 2.818 2.846 3.575l12.956 6.13l.006-.012c.562.295 1.2.487 1.947.496c1.797-.117 2.777-1.668 3.818-3.525c3-5.69 5.32-16.6 5.338-16.64a.91.91 0 0 0-.504-1.02z'
                        fill='currentColor'
                      ></path>
                    </svg>
                  </div>
                  <div className='text-2xl'>Khám phá kho mẫu CV</div>
                </div>

                <div className='flex items-center justify-center px-4 py-8 bg-purple-900 text-white rounded-lg'>
                  <div className='text-3xl mr-4'>
                    <svg width='1em' height='1em' viewBox='0 0 24 24'>
                      <path
                        d='M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27c-1.11-.64-3.77-2.68-3.77-6.5C1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm4.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z'
                        fill='currentColor'
                      ></path>
                    </svg>
                  </div>
                  <div className='text-2xl'>Xem mẹo tuyển dụng của HR</div>
                </div>

                <div className='flex items-center justify-center px-4 py-8 bg-purple-900 text-white rounded-lg'>
                  <div className='text-3xl mr-4'>
                    <svg width='1em' height='1em' viewBox='0 0 512 512'>
                      <path
                        d='M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64z'
                        fill='none'
                        stroke='currentColor'
                        strokeMiterlimit='10'
                        strokeWidth='32'
                      ></path>
                      <path
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeMiterlimit='10'
                        strokeWidth='32'
                        d='M338.29 338.29L448 448'
                      ></path>
                    </svg>
                  </div>
                  <div className='text-2xl'>Tìm kiếm việc làm</div>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-x-6'>
                <CategoriesNews icon={iconSalary} posts={highestPaid} title={"VIỆC LÀM LƯƠNG CAO"} />
                <CategoriesNews icon={iconCity} posts={HCMCity} title={"VIỆC LÀM TP.HCM"} />
                <CategoriesNews icon={iconExpired} posts={Expired} title={"VIỆC LÀM SẮP HẾT HẠN TUYỂN DỤNG"} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
