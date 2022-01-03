import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import useFirebaseAuth from '../../hooks/use-auth';

const Login = () => {
  const [emailEntered, setEmailEntered] = useState('');
  const [passwordEntered, setPasswordEntered] = useState('');

  const router = useRouter();
  const auth = useFirebaseAuth();

  const signInWithEmailAndPassword = () => {
    const loginSuccess = () => {
      alert('Success')
      router.push('/');
    };
    auth.loginEmail(loginSuccess, emailEntered, passwordEntered);
  };

  const signInWithGoogle = () => {
    auth.loginGoogle(() => router.push('/'));
  };

  return (
    <div className='font-sans'>
      <div className='relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 '>
        <div className='relative sm:max-w-sm w-full'>
          <div className='card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6'></div>
          <div className='card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6'></div>
          <div className='relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md'>
            <label forhtml='' className='block mt-3 text-sm text-gray-700 text-center font-semibold'>
              Login
            </label>
            <form method='#' action='#' className='mt-10'>
              <div>
                <input
                  type='email'
                  placeholder='Email'
                  className='mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
                  value={emailEntered}
                  onChange={(e) => setEmailEntered(e.target.value)}
                />
              </div>

              <div className='mt-7'>
                <input
                  type='password'
                  placeholder='Mật khẩu'
                  className='mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
                  value={passwordEntered}
                  onChange={(e) => setPasswordEntered(e.target.value)}
                />
              </div>

              <div className='mt-7 flex'>
                <label forhtml='remember_me' className='inline-flex items-center w-full cursor-pointer'>
                  <input
                    id='remember_me'
                    type='checkbox'
                    className='rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    name='remember'
                  />
                  <span className='ml-2 text-sm text-gray-600'>Nhớ mật khẩu</span>
                </label>

                <div className='w-full text-right'>
                  <a className='underline text-sm text-gray-600 hover:text-gray-900' href='#'>
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <div className='mt-7'>
                <button onClick={signInWithEmailAndPassword} className='bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
                  Đăng nhập
                </button>
              </div>

              <div className='flex mt-7 items-center text-center'>
                <hr className='border-gray-300 border-1 w-full rounded-md' />
                <label className='block font-medium text-sm text-gray-600 w-full'>Đăng nhập bằng</label>
                <hr className='border-gray-300 border-1 w-full rounded-md' />
              </div>

              <div className='flex mt-7 justify-center w-full'>
                <button className='mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
                  Facebook
                </button>

                <button
                  onClick={() => signInWithGoogle()}
                  className='bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'
                >
                  Google
                </button>
              </div>

              <div className='mt-7'>
                <div className='flex justify-center items-center'>
                  <label className='mr-2'>Bạn là người mới?</label>
                  <a href='/auth/register' className=' text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
                    Tạo một tài khoản
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Login;
