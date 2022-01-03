import React from 'react';

const Login = () => {
  return (
    <div className='font-sans'>
      <div className='relative flex flex-col items-center min-h-screen bg-gray-100 sm:justify-center '>
        <div className='relative w-full sm:max-w-sm'>
          <div className='absolute w-full h-full transform bg-blue-400 shadow-lg card rounded-3xl -rotate-6'></div>
          <div className='absolute w-full h-full transform bg-red-400 shadow-lg card rounded-3xl rotate-6'></div>
          <div className='relative w-full px-6 py-4 bg-gray-100 shadow-md rounded-3xl'>
            <label forHtml='' className='block mt-3 text-sm font-semibold text-center text-gray-700'>
              Đăng nhập
            </label>

            <div>
              <input
                type='email'
                placeholder='Email'
                className='block w-full mt-1 bg-gray-100 border-none shadow-lg h-11 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
              />
            </div>

            <div className='mt-7'>
              <input
                type='password'
                placeholder='Mật khẩu'
                className='block w-full mt-1 bg-gray-100 border-none shadow-lg h-11 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
              />
            </div>

            <div className='flex mt-7'>
              <label forHtml='remember_me' className='inline-flex items-center w-full cursor-pointer'>
                <input
                  id='remember_me'
                  type='checkbox'
                  className='text-indigo-600 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  name='remember'
                />
                <span className='ml-2 text-sm text-gray-600'>Nhớ mật khẩu</span>
              </label>

              <div className='w-full text-right'>
                <a className='text-sm text-gray-600 underline hover:text-gray-900' href='/auth/change_password'>
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <div className='mt-7'>
              <button className='w-full py-3 text-white transition duration-500 ease-in-out transform bg-blue-500 shadow-xl rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105'>
                Login
              </button>
            </div>

            <div className='flex items-center text-center mt-7'>
              <hr className='w-full border-gray-300 rounded-md border-1' />
              <label className='block w-full text-sm font-medium text-gray-600'>Đăng nhập bằng</label>
              <hr className='w-full border-gray-300 rounded-md border-1' />
            </div>

            <div className='flex justify-center w-full mt-7'>
              <button className='px-4 py-2 mr-5 text-white transition duration-500 ease-in-out transform bg-blue-500 border-none shadow-xl cursor-pointer rounded-xl hover:shadow-inner hover:-translate-x hover:scale-105'>
                Facebook
              </button>

              <button className='px-4 py-2 text-white transition duration-500 ease-in-out transform bg-red-500 border-none shadow-xl cursor-pointer rounded-xl hover:shadow-inner hover:-translate-x hover:scale-105'>
                Google
              </button>
            </div>

            <div className='mt-7'>
              <div className='flex items-center justify-center'>
                <label className='mr-2'>Bạn là người mới?</label>
                <a href='/auth/register' className='text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105'>
                  Tạo một tài khoản
                </a>
              </div>
            </div>
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
