import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer'

export default function templateCV() {
  return (
    <div>
      <Header></Header>
      <div className="w-full flex justify-center content-center">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 w-4/5">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Template CV</h1>

          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {templates.map((template) => (
                <div key={template.id} className="group relative justify-center">
                  <div className="flex justify-center bg-emerald-300/70 rounded-t py-8 border border-purple-900 border-b-0">
                    <img src={template.imageSrc} className="w-4/6"></img>
                  </div>
                  <div className="flex justify-betwen rounded-b border border-purple-900 border-t-0 bg-slate-100">
                    <div className="py-5">
                      <p className="font-bold pl-2">{template.template}</p>
                    </div>
                    <div className="flex px-2">
                      <a className="bg-purple-900/20 px-4 py-2 rounded text-purple-900 font-bold hover:bg-purple-900 hover:text-white m-auto" href={template.href} target="_blank">Download</a>
                    </div>
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

const templates = [
  {
    id: 1,
    template: 'Mẫu xin việc cho sinh viên mới ra trường 1',
    href: 'https://docs.google.com/document/d/1V3fCNajrE0oMKHvL50gCKNrc0989G7fs/edit?usp=sharing&ouid=111073976401366175723&rtpof=true&sd=true',
    imageSrc: '/images/image-cv/cv-sv-1.png',
  },
  {
    id: 2,
    template: 'Mẫu xin việc cho sinh viên mới ra trường 2',
    href: 'https://docs.google.com/document/d/1dWwgF8DnvSuP6pWonpt9Wj8FgGe1fWUp/edit?usp=sharing&rtpof=true&sd=true',
    imageSrc: '/images/image-cv/cv-sv-2.png',
  },
  {
    id: 3,
    template: 'Mẫu xin việc cho sinh viên mới ra trường 3',
    href: 'https://docs.google.com/document/d/18Hi3lJw1zUrg_mKPEmrZOZmUXEjBTxYh/edit?usp=sharing&ouid=111073976401366175723&rtpof=true&sd=true',
    imageSrc: '/images/image-cv/cv-sv-3.png',
  },
  {
    id: 4,
    template: 'Mẫu xin việc cho sinh viên mới ra trường 4',
    href: 'https://docs.google.com/document/d/1P8QLPYesHirhgJkVECYifwkihR3kgRmc/edit?usp=sharing&ouid=111073976401366175723&rtpof=true&sd=true',
    imageSrc: '/images/image-cv/cv-sv-4.png',
  },
  {
    id: 5,
    template: 'Mẫu xin việc cho sinh viên mới ra trường 5',
    href: 'https://docs.google.com/document/d/1woekgoGZqqudtkX5MLUO402czUa7pNxo/edit?usp=sharing&ouid=111073976401366175723&rtpof=true&sd=true',
    imageSrc: '/images/image-cv/cv-sv-5.png',
  },
  {
    id: 6,
    template: 'Mẫu xin việc cho sinh viên mới ra trường 6',
    href: 'https://docs.google.com/document/d/1H5Keq4QiQeLl8r4emmu3lVhgCoZ0DeRU/edit?usp=sharing&ouid=111073976401366175723&rtpof=true&sd=true',
    imageSrc: '/images/image-cv/cv-sv-6.png',
  },
  {
    id: 7,
    template: 'Mẫu xin việc cho sinh viên mới ra trường 7',
    href: 'https://docs.google.com/document/d/1AMtATdxtcickSHQFAZpCMzGsc1YC-W_U/edit?usp=sharing&ouid=111073976401366175723&rtpof=true&sd=true',
    imageSrc: '/images/image-cv/cv-sv-7.png',
  },
  {
    id: 8,
    template: 'Mẫu xin việc cho sinh viên mới ra trường 8',
    href: 'https://docs.google.com/document/d/1-h7ItCQ1DLNG7uLduyJrxfptR1aekj2j/edit?usp=sharing&ouid=111073976401366175723&rtpof=true&sd=true',
    imageSrc: '/images/image-cv/cv-sv-8.png',
  },
  {
    id: 9,
    template: 'Mẫu xin việc cho sinh viên mới ra trường 9',
    href: 'https://docs.google.com/document/d/1dj7kY5czEuj1gpS1HulDRejmuUfcg81r/edit?usp=sharing&ouid=111073976401366175723&rtpof=true&sd=true',
    imageSrc: '/images/image-cv/cv-sv-9.png',
  },
  {
    id: 10,
    template: 'Mẫu xin việc cho sinh viên mới ra trường 10',
    href: 'https://docs.google.com/document/d/1ucP_t6Fu6iY53nc7A1MMUhQMXL0UICAe/edit?usp=sharing&ouid=111073976401366175723&rtpof=true&sd=true',
    imageSrc: '/images/image-cv/cv-sv-10.png',
  },
]