import Image from "next/image";

function CategoriesNews({ icon, posts, title }) {
  return (
    <div className="w-full bg-white px-3 pt-5 rounded-md">
      <div className="font-bold text-lg flex items-center">
        <div className="text-2xl text-purple-900 mr-2">{icon}</div>
        <div>{title}</div>
      </div>

      <div>
        {posts.map((post) => (
          <div key={post.id} className="px-2 py-3 border-b-[0.5px] last:border-none">
            <div className="flex justify-start items-center">
              <div className="w-16 rounded-full">
                <Image src="/svg/logo.svg" height={32} width={32} layout="responsive" alt="profile image" />
              </div>
              <div className="ml-10">
                <div className="font-semibold text-base hover:text-purple-700 hover:underline underline-offset-2 cursor-pointer">{post.title}</div>
                <div className="text-xs text-gray-500">Lương: {new Intl.NumberFormat().format(post.salary)} đồng</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesNews;
