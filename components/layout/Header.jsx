import Image from "next/image";

function Header() {
  return (
    <div className="w-full flex justify-center content-center shadow-md">
      <div className="h-24 w-4/5 flex justify-between max-w-screen-xl">
        <div className="h-full w-20 flex items-center">
          <div className="h-4/5 w-full">
            <Image src="/svg/logo.svg" layout="responsive" height="64" width="64" alt="" />
          </div>
        </div>

        <div className="flex items-center w-1/2 justify-around">
          <div className="font-bold text-purple-900 underline underline-offset-4">Trang chủ</div>
          <div>Mẹo tuyển dụng</div>
          <div>Template CV</div>
        </div>

        <div className="flex">
          <div className="flex items-center mr-5">
            <div className="bg-gray-200 rounded-full p-3 text-purple-900">
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  d="M20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>

          <div className="flex items-center mr-5">
            <div className="bg-gray-200 rounded-full p-3 text-purple-900">
              <svg width="1em" height="1em" viewBox="0 0 512 512">
                <path
                  d="M440.08 341.31c-1.66-2-3.29-4-4.89-5.93c-22-26.61-35.31-42.67-35.31-118c0-39-9.33-71-27.72-95c-13.56-17.73-31.89-31.18-56.05-41.12a3 3 0 0 1-.82-.67C306.6 51.49 282.82 32 256 32s-50.59 19.49-59.28 48.56a3.13 3.13 0 0 1-.81.65c-56.38 23.21-83.78 67.74-83.78 136.14c0 75.36-13.29 91.42-35.31 118c-1.6 1.93-3.23 3.89-4.89 5.93a35.16 35.16 0 0 0-4.65 37.62c6.17 13 19.32 21.07 34.33 21.07H410.5c14.94 0 28-8.06 34.19-21a35.17 35.17 0 0 0-4.61-37.66z"
                  fill="currentColor"
                ></path>
                <path
                  d="M256 480a80.06 80.06 0 0 0 70.44-42.13a4 4 0 0 0-3.54-5.87H189.12a4 4 0 0 0-3.55 5.87A80.06 80.06 0 0 0 256 480z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <a className="flex items-center" href='/login'>
            <div className="bg-gray-200 rounded-full p-3 text-purple-900">
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  d="M20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
