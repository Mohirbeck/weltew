import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import Counter from '../../components/Counter';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Product({ collection, similar }) {
  function nextImageUrl(src: any) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${1920}&q=75`;
  }
  const [index, setIndex] = useState(-1);
  const [description, setDescription] = useState('<p></p>');
  useEffect(() => {
    setDescription(collection.description);
  }, [collection.description]);

  const size = useWindowSize();

  const slides = collection.images.map((image: any) => ({
    src: nextImageUrl(image.image),
    srcSet: [
      `${nextImageUrl(image.image)} 1920w`,
      `${nextImageUrl(image.image)} 1280w`,
      `${nextImageUrl(image.image)} 640w`,
      `${nextImageUrl(image.image)} 320w`,
    ],
    alt: collection.name,
  }));
  const [quantities, setQuantities] = useState(Array.from({ length: collection.products.length }, () => 0));
  return (
    <div className='lg-container pt-6 relative scroll-smooth'>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
      <h3 className='text-xl text-primary text-center font-bold mb-4 lg:hidden'>{collection.name}</h3>
      <hr className='lg:hidden' />
      <div className="grid lg:grid-cols-4 grid-cols-3 gap-x-12">
        <div className="col-span-3">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={size.width > 768}
            loop
            pagination={{ clickable: true }}
            style={{ '--swiper-pagination-color': '#fec33b', '--swiper-pagination-bullet-size': '10px', '--swiper-navigation-color': '#fec33b' }}
          >
            {collection.images.map((image: any, i: number) => (
              <SwiperSlide key={image.id}>
                <div className='w-full lg:h-[540px] h-[220px] bg-center bg-no-repeat bg-contain' onClick={() => setIndex(i)} style={{ backgroundImage: `url(${image.image})` }}>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='flex-col flex lg:hidden'>
            <div className='w-full px-2 py-4'>
              <div className='max-h-[170px] overflow-y-auto mt-4 border-b border-grey'>
                <table className='border-collapse w-full'>
                  <thead>
                    <tr className='border-y border-grey'>
                      <th className='text-primary font-semibold text-[13px] py-1 text-left'>Содержание сета</th>
                      <th className='text-primary font-semibold text-[13px] py-1 text-left'>Количество</th>
                      <th className='text-primary font-semibold text-[13px] py-1 text-center pl-2'>Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collection.default_products.map((product: any, i: number) => (
                      <tr key={product.id}>
                        <td className='text-primary font-medium text-[13px] py-1 text-left'>{product.name}</td>
                        <td className='text-primary font-medium text-[13px] py-1 text-center'>{quantities[i]}</td>
                        <td className='text-primary font-medium text-[13px] py-1 text-center'>{product.price > 0 ? product.price : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button onClick={() => { document.getElementById('products').scrollIntoView({ behavior: 'smooth' }) }} className='w-full text-sky-600 underline text-center mt-2'>Изменить содержимое сета</button>
            </div>
          </div>
          <h3 className='text-3xl text-primary text-center font-bold mt-8 hidden lg:block'>{collection.name}</h3>
          <div className='lg:mt-8 mt-4' dangerouslySetInnerHTML={{ __html: description }}>
          </div>
          <h5 className='lg:my-8 my-4 text-primary font-semibold text-lg lg:text-2xl text-center' id='products'>Настроить</h5>
          <table className='w-full border-collapse'>
            <tbody>
              {collection.products.map((product: any, i: number) => (
                <tr key={product.id} className='flex flex-col lg:flex-row items-center justify-between'>
                  <td className='border-[0.5px] border-grey w-full lg:p-4 p-2'>
                    <div className='flex items-center lg:space-x-10 space-x-3'>
                      <img src={product.images[0]?.image || '/images/placeholder.webp'} alt={product.name} className='lg:h-[160px] h-[75px] aspect-video object-contain' />
                      <div className='flex flex-col lg:flex-row lg:items-center lg:flex-grow justify-between space-y-4 lg:space-y-0'>
                        <Link className='text-primary font-medium text-sm lg:text-lg' href={`/products/${product.id}`}>{product.name}</Link>
                        <Counter count={quantities[i]} changeCount={
                          (count: number) => {
                            const newQuantities = [...quantities];
                            newQuantities[i] = count;
                            setQuantities(newQuantities);
                          }
                        } />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5 className='lg:my-8 my-4 text-primary font-semibold text-lg lg:text-2xl text-center'>Похожие продукты</h5>
          <Swiper
            spaceBetween={30}
            slidesPerView={"auto"}
            slidesPerGroupSkip={1}
            className='w-full select-none group !pb-8 mt-4'
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
            }}
            pagination={{
              clickable: true,
            }}
            style={{ '--swiper-pagination-color': '#fec33b', '--swiper-pagination-bullet-size': '10px' }}
          >

            {similar.results.map((item: any) => (
              <SwiperSlide key={item.id} className='!w-[280px] lg:!w-[334px]'>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  images={item.images}
                />
              </SwiperSlide>
            ))}
            <button className='next absolute right-2 top-1/2 -translate-y-1/2 z-20 lg:group-hover:block hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-secondary stroke-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button className='prev absolute left-2 top-1/2 -translate-y-1/2 z-20 lg:group-hover:block hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-secondary stroke-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </Swiper>
        </div>
        <div>
          <div className='flex-col sticky top-[104px] hidden lg:flex'>
            <div className='w-full px-5 py-9 border border-grey'>
              <h1 className='text-2xl text-primary font-bold text-center'>{collection.name}</h1>
              <div className='max-h-[170px] overflow-y-auto mt-4 border-b border-grey'>
                <table className='border-collapse w-full'>
                  <thead>
                    <tr className='border-y border-grey'>
                      <th className='text-primary font-semibold text-[13px] py-1 text-left'>Содержание сета</th>
                      <th className='text-primary font-semibold text-[13px] py-1 text-left'>Количество</th>
                      <th className='text-primary font-semibold text-[13px] py-1 text-center pl-2'>Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collection.default_products.map((product: any, i: number) => (
                      <tr key={product.id}>
                        <td className='text-primary font-medium text-[13px] py-1 text-left'>{product.name}</td>
                        <td className='text-primary font-medium text-[13px] py-1 text-center'>{quantities[i]}</td>
                        <td className='text-primary font-medium text-[13px] py-1 text-center'>{product.price > 0 ? product.price : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button onClick={() => { document.getElementById('products').scrollIntoView({ behavior: 'smooth' }) }} className='w-full text-sky-600 underline text-center mt-2'>Изменить содержимое сета</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let res = await fetch(`${process.env.apiUrl}/collections/${params.id}`);
  const collection = await res.json();
  res = await fetch(`${process.env.apiUrl}/collections/${params.id}/similar`);
  const similar = await res.json();
  return { props: { collection, similar } };
}


function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}