import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useEffect, useState } from 'react';
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Product({ product, similar }) {
  function nextImageUrl(src: any) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${1920}&q=75`;
  }
  const [index, setIndex] = useState(-1);
  const [description, setDescription] = useState('<p></p>');
  useEffect(() => {
    setDescription(product.description);
  }, [product.description]);

  const size = useWindowSize();

  const slides = product.images.map((image: any) => ({
    src: nextImageUrl(image.image),
    srcSet: [
      `${nextImageUrl(image.image)} 1920w`,
      `${nextImageUrl(image.image)} 1280w`,
      `${nextImageUrl(image.image)} 640w`,
      `${nextImageUrl(image.image)} 320w`,
    ],
    alt: product.name,
  }));
  return (
    <div className='lg-container pt-6 relative'>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
      <h3 className='text-xl text-primary text-center font-bold mb-4 lg:hidden'>{product.name}</h3>
      <hr className='lg:hidden' />
      <div className="grid lg:grid-cols-4 grid-cols-3 gap-x-12">
        <div className="col-span-3">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={size.width > 768 ? {
              nextEl: '.next',
              prevEl: '.prev',
            } : false}
            pagination={{ clickable: true }}
            className='index-vars'
          >
            {product.images.map((image: any, i: number) => (
              <SwiperSlide key={image.id}>
                <div className='w-full h-[540px] bg-center bg-no-repeat bg-contain' onClick={() => setIndex(i)} style={{ backgroundImage: `url(${image.image})` }}>
                </div>
              </SwiperSlide>
            ))}
            <button className='next absolute right-2 top-1/2 -translate-y-1/2 z-20 lg:block hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 stroke-secondary stroke-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button className='prev absolute left-2 top-1/2 -translate-y-1/2 z-20 lg:block hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 stroke-secondary stroke-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </Swiper>
          <div className='flex-col flex lg:hidden'>
            {product.collection > 0 && (
              <div className='w-full px-5 pb-9 pt-5 border border-grey mt-8'>
                <h4 className='tex-lg text-center text-primary font-medium'>Коллекция продукта</h4>
                <Link href={`/collections/${product.collection.id}`}>
                  <div className='flex space-x-4 items-start mt-2'>
                    <div className='w-[100px] h-[55px] bg-center bg-no-repeat bg-cover' style={{ backgroundImage: `url(${product.collection.images[0]?.image || '/images/placeholder.webp'})` }}>
                    </div>
                    <h4 className='text-lg text-primary font-bold text-center'>{product.collection.name}</h4>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <h3 className='text-3xl text-primary text-center font-bold mt-8 hidden lg:block'>{product.name}</h3>
          <div className='lg:mt-8 mt-4' dangerouslySetInnerHTML={{ __html: description }}>
          </div>
          <h5 className='lg:mt-8 mt-4 text-primary font-semibold text-lg lg:text-2xl text-center'>Похожие продукты</h5>
          <Swiper
            spaceBetween={30}
            slidesPerView={"auto"}
            slidesPerGroupSkip={1}
            className='w-full select-none group !pb-8 mt-4 index-vars'
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
            }}
            pagination={{
              clickable: true,
            }}
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
              <h1 className='text-2xl text-primary font-bold text-center'>{product.name}</h1>
            </div>
            {product.collection > 0 && (
              <div className='w-full px-5 pb-9 pt-5 border border-grey mt-8'>
                <h4 className='tex-lg text-center text-primary font-medium'>Коллекция продукта</h4>
                <Link href={`/collections/${product.collection.id}`}>
                  <div className='flex space-x-4 items-start mt-2'>
                    <div className='w-[100px] h-[55px] bg-center bg-no-repeat bg-cover' style={{ backgroundImage: `url(${product.collection.images[0]?.image || '/images/placeholder.webp'})` }}>
                    </div>
                    <h4 className='text-lg text-primary font-bold text-center'>{product.collection.name}</h4>
                  </div>
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let res = await fetch(`${process.env.apiUrl}/products/${params.id}`);
  const product = await res.json();
  res = await fetch(`${process.env.apiUrl}/products/${params.id}/similar`);
  const similar = await res.json();
  return { props: { product, similar } };
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