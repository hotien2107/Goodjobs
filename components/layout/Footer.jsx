import Image from "next/image";

function Footer() {
  return (
    <div className="w-full bg-purple-900 pb-4 h-72 pt-4">
      <div className="flex justify-center">
        <Image src="/svg/logo.svg" height={90} width={90} alt="GoodJobs" />
      </div>

      <div className="flex justify-between mt-4 px-5">
        <div>
          <div className="font-bold text-[#FEB93F] text-sm pb-3">Về GoodJobs</div>
          <div className="text-[#FEB93F] text-xs">Giới thiệu</div>
          <div className="text-[#FEB93F] text-xs">Liên hệ</div>
          <div className="text-[#FEB93F] text-xs">Hỏi đáp</div>
          <div className="text-[#FEB93F] text-xs">Chính sách bảo mật</div>
          <div className="text-[#FEB93F] text-xs">Điều khoản dịch vụ</div>
          <div className="text-[#FEB93F] text-xs">Quy chế hoạt động</div>
        </div>

        <div>
          <div className="font-bold text-[#FEB93F] text-sm pb-3">Hồ sơ và CV</div>
          <div className="text-[#FEB93F] text-xs">Quản lý CV của bạn</div>
          <div className="text-[#FEB93F] text-xs">TopCV Profile</div>
          <div className="text-[#FEB93F] text-xs">Hướng dẫn viết CV</div>
          <div className="text-[#FEB93F] text-xs">Review CV</div>
        </div>

        <div>
          <div className="font-bold text-[#FEB93F] text-sm pb-3">Xây dựng sự nghiệp</div>
          <div className="text-[#FEB93F] text-xs">Việc làm tốt nhất</div>
          <div className="text-[#FEB93F] text-xs">Việc làm lương cao</div>
          <div className="text-[#FEB93F] text-xs">Việc làm quản lý</div>
          <div className="text-[#FEB93F] text-xs">Việc làm từ xa (remote)</div>
          <div className="text-[#FEB93F] text-xs">Việc làm bán thời gian</div>
        </div>
        <div>
          <div className="font-bold text-[#FEB93F] text-sm pb-3">Cộng đồng</div>
          <div className="text-[#FEB93F] text-xs">Facebook Fanpage</div>
          <div className="text-[#FEB93F] text-xs">Youtube Offical Channel</div>
          <div className="text-[#FEB93F] text-xs">Linkedin</div>
          <div className="text-[#FEB93F] text-xs">Tiktok Offical Channel</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
