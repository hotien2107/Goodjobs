import React, { useRef, useState } from "react";
import { useRouter } from 'next/router';
import { auth } from '../../config/firebase';
import useFirebaseAuth from '../../hooks/use-auth';

const change_password = () => {
  const [emailEntered, setEmailEntered] = useState('');
  const router = useRouter();
  const auth = useFirebaseAuth();

  const forgotPassword = () => {
    alert('Kiểm tra email xác thực')
    router.push('/login');
    auth.forgotPassword(emailEntered);
  };

  return (
    <div className='container mx-auto'>
      <div className='flex justify-center px-6 my-12'>
        <div className='flex w-full xl:w-3/4 lg:w-11/12'>
          <div
            className='hidden w-full h-auto bg-gray-400 bg-cover rounded-l-lg lg:block lg:w-1/2'
            style={{ backgroundImage: "url('https://source.unsplash.com/oWTW-jNGl9I/600x800')" }}
          ></div>
          <div className='w-full p-5 bg-white rounded-lg lg:w-1/2 lg:rounded-l-none'>
            <div className='px-8 mb-4 text-center'>
              <h3 className='pt-4 mb-2 text-2xl'>Quên mật khẩu?</h3>
              <p className='mb-4 text-sm text-gray-700'>
                Chỉ cần nhập địa chỉ email của bạn dưới đây và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn!
              </p>
            </div>
            <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded'>
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='email'>
                  Email
                </label>
                <input
                  className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  placeholder='Nhập địa chỉ email...'
                  value={emailEntered}
                  onChange={(e) => setEmailEntered(e.target.value)}
                />
              </div>
              <div className='mb-6 text-center'>
                <button
                  className='w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline'
                  type='button' onClick={forgotPassword}
                >
                  Đặt lại mật khẩu
                </button>
              </div>
              <hr className='mb-6 border-t' />
              <div className='text-center'>
                <a className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800' href='./register'>
                  Tạo một tài khoản!
                </a>
              </div>
              <div className='text-center'>
                <a className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800' href='./'>
                  Đã có tài khoản? Đăng nhập!
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default change_password;
