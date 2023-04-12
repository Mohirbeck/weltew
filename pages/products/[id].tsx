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
import useWindowDimensions from '../../hooks/useWindowDimension';



export default function Product({ product, similar, cart }) {
  function nextImageUrl(src: any) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${1920}&q=75`;
  }
  const [index, setIndex] = useState(-1);
  const [description, setDescription] = useState('<p></p>');
  useEffect(() => {
    setDescription(product.description);
  }, [product.description]);

  const { width, height } = useWindowDimensions();

  const addToCart = async (product: any) => {
    const item = cart.cart.find((item: any) => item.id === product.id);
    let new_cart = [];
    if (item) {
    } else {
      new_cart = [...cart.cart, { name: product.name, quantity: 1, price: product.price, id: product.id, image: product.images[0].image }];
    }
    cart.setCart(new_cart)
    localStorage.setItem('cart', JSON.stringify(new_cart));
    const cart_count_el = document.getElementById('cart-count');
    cart_count_el.innerHTML = new_cart.length.toString();
  };

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
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('breadcrumbs',
      JSON.stringify([
        {
          label: 'Главная',
          path: '/'
        },
        {
          label: 'Категории',
          path: '/category'
        },
        {
          label: product.category?.name,
          path: "/category/" + product.category.id
        },
        {
          label: product.name,
          path: "/category/" + product.category.id + "/" + product.id
        }
      ])
    );
    window.dispatchEvent(new Event("storage"));
  }
  return (
    <div className='lg-container pt-6 relative mt-6'>
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
            navigation={width > 768 ? {
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
            <div className='w-full px-5 py-9 border border-grey'>
              <ul className='mt-4 space-y-2'>
                <li className='flex justify-between'>
                  <span className='text-primary'>Наличие:</span>
                  <span className='text-primary font-bold text-center'>{product.availibility ? 'В наличии' : 'Предзаказ'}</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-primary'>Цена:</span>
                  <span className='text-primary font-bold text-center'>{product.price} сум</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-primary'>Категория:</span>
                  <span className='text-primary font-bold text-center'>{product.category?.name}</span>
                </li>
              </ul>
              <button className='btn bg-primary hover:bg-[#0d4770] text-white space-x-2 mt-2 w-full' onClick={() => addToCart(product)}>
                <span>В корзину</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>
            </div>
            {product.collection && (
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
                  availibility={item.availibility}
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
              <ul className='mt-4 space-y-2'>
                <li className='flex justify-between'>
                  <span className='text-primary'>Наличие:</span>
                  <span className='text-primary font-bold text-center'>{product.availibility ? 'В наличии' : 'Предзаказ'}</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-primary'>Цена:</span>
                  <span className='text-primary font-bold text-center'>{product.price} сум</span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-primary'>Категория:</span>
                  <span className='text-primary font-bold text-center'>{product.category?.name}</span>
                </li>
              </ul>
              <button className='btn bg-primary hover:bg-[#0d4770] text-white space-x-2 mt-2 w-full' onClick={() => addToCart(product)}>
                <span>В корзину</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>
            </div>
            {product.collection && (
              <div className='w-full px-5 pb-9 pt-5 border border-grey mt-8 hidden lg:block'>
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

