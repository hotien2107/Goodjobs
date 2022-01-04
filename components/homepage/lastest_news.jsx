import Image from "next/image";
import {Info } from "../Post"
import { format } from "date-fns";
import vi from "date-fns/locale/vi";

function LastestNews({posts}) {
  return (
    <div className="w-full bg-white px-3 py-5 mb-8 rounded-md">
      <div className="font-bold text-xl flex items-center">
        <div className="text-4xl text-purple-900 mr-2">
          <svg width="1em" height="1em" viewBox="0 0 100 100">
            <path
              d="M88.558 49.96c0-.885-.435-1.663-1.097-2.151l.014-.024l-9.324-5.383l5.367-9.296l-.018-.011a2.666 2.666 0 0 0-.127-2.408a2.667 2.667 0 0 0-2.025-1.314v-.026H70.58V18.61h-.022a2.667 2.667 0 0 0-1.314-2.022a2.662 2.662 0 0 0-2.412-.125l-.013-.023l-9.481 5.474l-5.25-9.094l-.019.011a2.668 2.668 0 0 0-2.149-1.094c-.885 0-1.664.435-2.151 1.097l-.024-.014l-5.337 9.244l-9.19-5.306l-.011.019a2.666 2.666 0 0 0-2.408.127a2.666 2.666 0 0 0-1.315 2.025h-.027v10.674H18.845v.021a2.667 2.667 0 0 0-2.022 1.314a2.667 2.667 0 0 0-.126 2.41l-.023.014l5.246 9.087l-9.394 5.424l.011.019a2.668 2.668 0 0 0-1.094 2.149c0 .885.435 1.664 1.097 2.151l-.014.024l9.324 5.383l-5.367 9.296l.018.01a2.666 2.666 0 0 0 .127 2.408a2.667 2.667 0 0 0 2.025 1.314v.027H29.42V81.39h.022c.092.816.549 1.58 1.314 2.022a2.665 2.665 0 0 0 2.412.125l.013.023l9.481-5.474l5.25 9.094l.019-.011a2.668 2.668 0 0 0 2.149 1.094c.885 0 1.664-.435 2.151-1.096l.023.013l5.337-9.244l9.191 5.306l.011-.019a2.666 2.666 0 0 0 2.408-.127a2.666 2.666 0 0 0 1.315-2.025h.027V70.398h10.613v-.021a2.667 2.667 0 0 0 2.022-1.314a2.67 2.67 0 0 0 .126-2.411l.023-.013l-5.246-9.087l9.394-5.424l-.011-.019a2.666 2.666 0 0 0 1.094-2.149zM43.715 61.355l-9.846-4.35l4.345 7.525l-2.456 1.418l-6.662-11.537l2.525-1.459l9.53 4.162l-4.185-7.248l2.457-1.418l6.66 11.537l-2.368 1.37zm4.652-2.686l-6.661-11.538l8.165-4.713l1.248 2.162l-5.709 3.295l1.398 2.422l5.587-3.225l1.248 2.16l-5.587 3.227l1.518 2.629l5.709-3.295l1.248 2.162l-8.164 4.714zm18.906-10.915L60.675 41l2.567 9.08l-2.611 1.508l-9.965-9.629l2.75-1.588l6.838 7.168l-2.617-9.605l1.92-1.108l6.993 7.079l-2.79-9.506l2.75-1.588l3.375 13.436l-2.612 1.507z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div>TIN TUYỂN DỤNG MỚI NHẤT</div>
      </div>

      <div className="py-5 px-4 grid grid-cols-2 gap-x-10">
        {posts.map((post) => (
          <div key={post.id} className="w-full min-h-[120px] shadow-[0_0_5px_2px_rgba(0,0,0,0.1)] rounded-lg pt-5 mb-6">
            <div className="flex justify-center">
              <div>
                <div className="w-full h-64 relative overflow-hidden">
                  <div className="px-6">
                    <div className="flex justify-start items-center">
                      <div className="w-20 rounded-full">
                        <Image src="/svg/logo.svg" height={32} width={32} layout="responsive" alt="profile image" />
                      </div>
                      <div className="ml-10">
                        <div className="font-semibold text-xl hover:text-purple-700 hover:underline underline-offset-2 cursor-pointer">{post.title}</div>
                        <div className="text-lg text-gray-500">Nguyễn Ngọc A</div>
                        <div className="text-gray-500 mt-2 text-xs">Ngày đăng: {format(new Date(post.createTime), "dd MMMM yyyy", { locale: vi })}</div>
                      </div>
                    </div>
                    <Info name={"Mô tả công việc"} content={post.job_description} />
                    <Info name={"Yêu cầu công việc"} content={post.requirement} />
                    <Info name={"Mức lương dự kiến"} content={post.salary} />
                    <Info name={"Số lượng tuyển dụng"} content={post.quantity} />
                    <Info name={"Số năm kinh nghiệm tối thiểu"} content={post.experience} />
                    <Info name={"Thành phố"} content={post.location} />
                    <Info name={"Đãi ngộ"} content={post.benefit} />
                    <Info name={"Hạn ứng tuyển"} content={post.expiredTime} />
                  </div>

                  <div className="absolute h-36 flex justify-center items-end bottom-0 left-0 right-0 bg-gradient-to-t from-white">
                    <div className="mb-2 text-purple-500 text-lg font-semibold cursor-pointer">Xem chi tiết</div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex justify-around py-3 border-t-2 ">
                    <div className="flex items-center text-2xl text-gray-600">
                      <svg width="1em" height="1em" viewBox="0 0 20 20">
                        <path
                          fill="currentColor"
                          d="M1.36 9.495v7.157h3.03l.153.018c2.813.656 4.677 1.129 5.606 1.422c1.234.389 1.694.484 2.531.54c.626.043 1.337-.198 1.661-.528c.179-.182.313-.556.366-1.136a.681.681 0 0 1 .406-.563c.249-.108.456-.284.629-.54c.16-.234.264-.67.283-1.301a.682.682 0 0 1 .339-.57c.582-.337.87-.717.93-1.163c.066-.493-.094-1.048-.513-1.68a.683.683 0 0 1 .176-.936c.401-.282.621-.674.676-1.23c.088-.886-.477-1.541-1.756-1.672a9.42 9.42 0 0 0-3.394.283a.68.68 0 0 1-.786-.95c.5-1.058.778-1.931.843-2.607c.085-.897-.122-1.547-.606-2.083c-.367-.406-.954-.638-1.174-.59c-.29.062-.479.23-.725.818c-.145.348-.215.644-.335 1.335c-.115.656-.178.952-.309 1.34c-.395 1.176-1.364 2.395-2.665 3.236a11.877 11.877 0 0 1-2.937 1.37a.676.676 0 0 1-.2.03H1.36zm-.042 8.52c-.323.009-.613-.063-.856-.233c-.31-.217-.456-.559-.459-.953l.003-7.323c-.034-.39.081-.748.353-1.014c.255-.25.588-.368.94-.36h2.185A10.505 10.505 0 0 0 5.99 6.95c1.048-.678 1.82-1.65 2.115-2.526c.101-.302.155-.552.257-1.14c.138-.789.224-1.156.422-1.628c.41-.982.948-1.462 1.69-1.623c.73-.158 1.793.263 2.465 1.007c.745.824 1.074 1.855.952 3.129c-.052.548-.204 1.161-.454 1.844a10.509 10.509 0 0 1 2.578-.056c2.007.205 3.134 1.512 2.97 3.164c-.072.712-.33 1.317-.769 1.792c.369.711.516 1.414.424 2.1c-.106.79-.546 1.448-1.278 1.959c-.057.693-.216 1.246-.498 1.66a2.87 2.87 0 0 1-.851.834c-.108.684-.335 1.219-.706 1.595c-.615.626-1.714.999-2.718.931c-.953-.064-1.517-.18-2.847-.6c-.877-.277-2.693-.737-5.43-1.377H1.317zm1.701-8.831a.68.68 0 0 1 .68-.682a.68.68 0 0 1 .678.682v7.678a.68.68 0 0 1-.679.681a.68.68 0 0 1-.679-.681V9.184z"
                        ></path>
                      </svg>
                      <span className="text-sm font-semibold ml-3">Thích </span>
                    </div>

                    <div className="flex items-center text-2xl text-gray-600">
                      <svg width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M3.25 4a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 .75.75v3.19l3.72-3.72a.75.75 0 0 1 .53-.22h10a.25.25 0 0 0 .25-.25V4.25a.25.25 0 0 0-.25-.25H3.25zm-1.75.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 0 1-1.75 1.75h-9.69l-3.573 3.573A1.457 1.457 0 0 1 5 21.043V18.5H3.25a1.75 1.75 0 0 1-1.75-1.75V4.25z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <span className="text-sm font-semibold ml-3">Bình luận </span>
                    </div>

                    <div className="flex items-center text-2xl text-gray-600">
                      <svg width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          d="M13.17 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59zM16 15c0 2.34-2.01 4.21-4.39 3.98C9.53 18.78 8 16.92 8 14.83V9.64c0-1.31.94-2.5 2.24-2.63A2.5 2.5 0 0 1 13 9.5V14c0 .55-.45 1-1 1s-1-.45-1-1V9.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v5.39c0 1 .68 1.92 1.66 2.08A2 2 0 0 0 14 15v-3c0-.55.45-1 1-1s1 .45 1 1v3zm-2-8V4l4 4h-3c-.55 0-1-.45-1-1z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <span className="text-sm font-semibold ml-3">Ứng tuyển </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LastestNews;
