import React, { useState } from "react";
import classNames from "classnames";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function listTips() {
  const [hidden, setHidden] = useState(true);
  const [tipSrc, setTipSrc] = useState('');
  const showTip = (src) => {
    setTipSrc(src);
    setHidden(!hidden);
  }

  return (
    <div className="bg-slate-100 overflow-y-scroll w-full">
      <div onClick={showTip} className={'flex fixed h-full w-full z-10 justify-center bg-black/70' + (hidden ? ' hidden' : '')}>
        <iframe
          className="w-3/5 h-full"
          src={tipSrc}>
        </iframe>
      </div>
      <Header></Header>
      <div className="w-full flex justify-center content-center">
        <div className="max-w-2xl mx-auto py-6 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 w-4/5">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Mẹo tuyển dụng</h1>

          <div className="bg-white mt-24">
            <div>
              {tips.map((tip) => (
                <div
                  key={tip.id}
                  className={
                    'flex group relative justify-left justify-betwen py-4 cursor-pointer border-dashed border-indigo-600' + 
                    ' hover:bg-purple-900 hover:text-white' +
                    (tipSrc == tip.pdfSrc ? ' bg-purple-900 text-white': '') +
                    ((tip.id != 1) ? ' border-t-1': '')
                  }
                  onClick={() => showTip(tip.pdfSrc)}>
                  <div className="font-bold px-10">
                    <p className="text-center text-white bg-[#FEB93F] rounded-full w-6 h-6">{tip.id}</p>
                  </div>
                  <div className="font-bold">
                    <p>{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

const tips = [
  {
    id: 1,
    description: "8 bí quyết để có một CV súc tích",
    pdfSrc: "https://drive.google.com/file/d/1vICCDFIq5Eq_B2FrOVJYNOGGpU1xvcCS/preview",
  },
  {
    id: 2,
    description: "Các bài test free giúp bạn khám phá bạn thân",
    pdfSrc: "https://drive.google.com/file/d/16u0feQpz5tSecB77HgzXQraCqy3OmUbD/preview",
  },
  {
    id: 3,
    description: "Địa chỉ email của bạn nói lên điều gì với nhà tuyển dụng",
    pdfSrc: "https://drive.google.com/file/d/1Ane6NCcLRF0YbNFrKXPVYVyOiuER2v7v/preview",
  },
  {
    id: 4,
    description: "7 điều nhà tuyển dụng chỉ mất vài giây để đọc vị bạn",
    pdfSrc: "https://drive.google.com/file/d/13Jat0SJup8mq0yMetFwAv8qtTkRcdzMg/preview",
  },
  {
    id: 5,
    description: 'Nhà tuyển dụng "đọc vị" gì từ mạng xã hội của ứng viên trẻ?',
    pdfSrc: "https://drive.google.com/file/d/1kDOfpPc1RlgZy-anS3_pUbV4ma_0YWI1/preview",
  },
  {
    id: 6,
    description: "Thư xin việc hiểu quả",
    pdfSrc: "https://drive.google.com/file/d/1DNI8fQeT-7sEavgStmfkEKha6vw6sB5Y/preview",
  },
  {
    id: 7,
    description: "Thế nào là một lá thư xin việc viết hay?",
    pdfSrc: "https://drive.google.com/file/d/1jQtHyZP6InCnBYe91jZCgE1dzO1mFXMn/preview",
  },
] 
