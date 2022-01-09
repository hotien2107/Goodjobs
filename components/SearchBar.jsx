import { useRouter } from "next/router";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchBar({ keyword }) {
  const keywordRef = useRef();
  const locationRef = useRef();
  const sortRef = useRef();

  const router = useRouter();

  const handleSearch = () => {
    if (keywordRef.current.value === "") {
      toast.error("Vui lòng nhập từ khóa cần tìm");
      return;
    }

    let url = `/search?keyword=` + encodeURIComponent(keywordRef.current.value);
    if (locationRef.current.value) {
      url += ` &location=${locationRef.current.value}`;
    }

    if (sortRef.current.value) {
      url += `&sort=${sortRef.current.value}`;
    }

    router.push(url);
  };

  return (
    <div className="w-full flex justify-center content-center py-6 border-b-[0.5px] bg-white">
      <div className="w-4/5 flex justify-start max-w-screen-xl">
        <input
          ref={keywordRef}
          type="text"
          defaultValue={keyword}
          className="w-1/2 border-[0.5px] px-4 py-1 mr-4 rounded-md focus:outline-purple-500 caret-purple-500"
          placeholder="Tìm kiếm bản tin tuyển dụng..."
        />

        <div className="flex items-center mr-4">
          <select
            ref={locationRef}
            name="location"
            id="location"
            className="px-4 py-1 rounded border-[0.5px] focus:border-purple-500 active:border-purple-500 focus-visible:outline-none"
          >
            <option value="">Địa điểm</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>
        </div>

        <div className="flex items-center">
          <select
            ref={sortRef}
            name="location"
            id="location"
            className="px-4 py-1 rounded border-[0.5px] focus:border-purple-500 active:border-purple-500 focus-visible:outline-none"
          >
            <option value="">Mức lương</option>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>

        <button onClick={handleSearch} className="flex justify-center items-center bg-purple-900 px-4 ml-6 rounded-lg">
          <div className="text-white">
            <svg width="1em" height="1em" viewBox="0 0 24 24">
              <g className="icon-tabler" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="10" r="7"></circle>
                <path d="M21 21l-6-6"></path>
              </g>
            </svg>
          </div>
          <div className="text-white ml-2">Tìm kiếm</div>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SearchBar;
