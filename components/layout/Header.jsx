import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaBell, FaCommentAlt, FaHeart } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";
import useFirebaseAuth from "../../hooks/use-auth";
import useChatList from "../../hooks/use-chat-list";

function Header() {
  const [isShowUserMenu, setIsShowUserMenu] = useState(false);
  const auth = useFirebaseAuth();
  const router = useRouter();
  const { chatList } = useChatList();
  const { authUser, logout } = auth;

  let currentPath = "";

  if (router.pathname === "/") {
    currentPath = "home";
  } else if (router.pathname === "/list-tips") {
    currentPath = "tips";
  } else if (router.pathname === "/template-cv") {
    currentPath = "cv";
  }

  const active = "font-bold text-purple-900 underline underline-offset-4";

  return (
    <div className='w-full flex justify-center content-center border-b-[0.5px] bg-white'>
      <div className='h-24 w-4/5 flex justify-between max-w-screen-xl relative'>
        <div className='h-full w-20 flex items-center'>
          <div className='h-4/5 w-full'>
            <Image src='/svg/logo.svg' layout='responsive' height='64' width='64' alt='' />
          </div>
        </div>

        <div className='flex items-center w-1/2 justify-around'>
          <Link href='/'>
            <div className={"cursor-pointer " + (currentPath === "home" ? active : "")}>Trang chủ</div>
          </Link>
          <Link href='/list-tips'>
            <div className={"cursor-pointer " + (currentPath === "tips" ? active : "")}>Mẹo tuyển dụng</div>
          </Link>
          <Link href='/template-cv'>
            <div className={"cursor-pointer " + (currentPath === "cv" ? active : "")}>Template CV</div>
          </Link>
        </div>

        {!authUser ? (
          <div className='flex items-center'>
            <button
              className='p-3 rounded-lg bg-purple-900 text-white font-bold transition-all duration-200 hover:bg-purple-800'
              onClick={() => router.push("/auth/login")}
            >
              Login
            </button>
          </div>
        ) : (
          <>
            {/* chatting - start */}
            <div className='flex'>
              <div className='flex items-center mr-5'>
                <Link href={"/chat/" + chatList[0]?.id}>
                  <div className='bg-gray-200 rounded-full p-3 text-purple-900 cursor-pointer transition-all duration-200 hover:bg-purple-900 hover:text-white'>
                    <FaCommentAlt className='text-xl' />
                  </div>
                </Link>
              </div>
              {/* chatting - end */}

              {/* notification - start */}
              <div className='flex items-center mr-5'>
                <div className='bg-gray-200 rounded-full p-3 text-purple-900 cursor-pointer transition-all duration-200 hover:bg-purple-900 hover:text-white'>
                  <FaBell className='text-2xl' />
                </div>
              </div>
              {/* notification - end */}
              {authUser.role == 2 ? (
                <div className='flex items-center' onClick={() => router.push("/hr/posts/create")}>
                  <div className='bg-gray-200 rounded-full p-3 text-purple-900 cursor-pointer transition-all duration-200 hover:bg-purple-900 hover:text-white'>
                    <VscEdit className='text-xl' />
                  </div>
                </div>
              ) : (
                <div className='flex items-center' onClick={() => router.push("/candidate/favorites")}>
                  <div className='bg-gray-200 rounded-full p-3 text-purple-900 cursor-pointer transition-all duration-200 hover:bg-purple-900 hover:text-white'>
                    <FaHeart className='text-xl' />
                  </div>
                </div>
              )}
            </div>

            {/* user - start */}
            <div className='flex items-center'>
              <div className='cursor-pointer' onClick={() => setIsShowUserMenu(!isShowUserMenu)}>
                {authUser.avatar ? (
                  <img src={authUser.avatar} alt='' className='w-10 h-10 rounded-full' />
                ) : (
                  <div className='w-10 h-10 rounded-full bg-purple-600 text-white flex justify-center items-center font-bold text-2xl'>
                    {authUser.fullName[0]}
                  </div>
                )}
              </div>
            </div>
            {/* user - start */}

            {isShowUserMenu ? (
              <ul
                className='absolute top-full right-0 text-center bg-white rounded-md shadow-lg cursor-pointer overflow-hidden z-50'
                onClick={() => setIsShowUserMenu(false)}
              >
                <Link href={"/profile"}>
                  <li className='text-xl font-medium hover:text-white hover:bg-purple-600 p-2'>Thông tin cá nhân</li>
                </Link>
                <li className='text-xl font-medium hover:text-white hover:bg-purple-600 p-2' onClick={logout}>
                  Đăng xuất
                </li>
              </ul>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
