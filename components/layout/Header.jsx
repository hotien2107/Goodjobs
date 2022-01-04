import Image from 'next/image';
import { useRouter } from 'next/router';
import useFirebaseAuth from '../../hooks/use-auth';
import { FaBell, FaCommentAlt, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import useChatList from '../../hooks/use-chat-list';

function Header() {
  const auth = useFirebaseAuth();
  const router = useRouter();
  const { chatList } = useChatList();
  const { authUser, logout } = auth;

  return (
    <div className='w-full flex justify-center content-center border-b-[0.5px] bg-white'>
      <div className='h-24 w-4/5 flex justify-between max-w-screen-xl'>
        <div className='h-full w-20 flex items-center'>
          <div className='h-4/5 w-full'>
            <Image src='/svg/logo.svg' layout='responsive' height='64' width='64' alt='' />
          </div>
        </div>

        <div className='flex items-center w-1/2 justify-around'>
          <Link href='/'>
            <div className='font-bold text-purple-900 underline underline-offset-4'>Trang chủ</div>
          </Link>
          <div>Mẹo tuyển dụng</div>
          <div>Template CV</div>
        </div>

        {!authUser ? (
          <div className='flex items-center'>
            <button
              className='p-3 rounded-lg bg-purple-600 text-white font-bold transition-all duration-200 hover:bg-purple-800'
              onClick={() => router.push('/auth/login')}
            >
              Login
            </button>
          </div>
        ) : (
          <>
            {/* chatting - start */}
            <div className='flex'>
              <div className='flex items-center mr-5'>
                <Link href={'/chat/' + chatList[0]?.uid}>
                  <div className='bg-gray-200 rounded-full p-3 text-purple-900 cursor-pointer transition-all duration-200 hover:bg-purple-900 hover:text-white'>
                    <FaCommentAlt className='text-2xl' />
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

              <div className='flex items-center'>
                <div className='bg-gray-200 rounded-full p-3 text-purple-900 cursor-pointer transition-all duration-200 hover:bg-purple-900 hover:text-white'>
                  <FaEnvelope className='text-2xl' />
                </div>
              </div>
            </div>

            <div className='flex items-center'>
              <button className='p-3 rounded-lg bg-purple-600 text-white font-bold transition-all duration-200 hover:bg-purple-800' onClick={logout}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
