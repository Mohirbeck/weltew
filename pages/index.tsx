import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import Image from 'next/image';
import useWindowDimensions from '../hooks/useWindowDimension';

export default function Home({ banners, categories, secondary_banners, toprated_collections, youtube, instagram, collection_categories }) {
  const { width, height } = useWindowDimensions();

  return (
    <div className='pb-10'>
      <Head>
        <title>Главная</title>
        <meta property="og:title" content="Главная" key="title" />
        <meta name="description" content="Мебель от турецкого бренда с мировым именем Weltew Home с гарантией 24 месяца. ⭐ В наличии более 30 коллекций мягкой и корпусной мебели." />
        <meta property="og:description" content="Мебель от турецкого бренда с мировым именем Weltew Home с гарантией 24 месяца. ⭐ В наличии более 30 коллекций мягкой и корпусной мебели." />
      </Head>
      {banners.map((banner: any, index: number) => (
        <a key={index} href={banner.link}>
          <div className="banner w-full relative">
            <Image src={banner.image} fill alt='banner' />
          </div>
        </a>
      ))}
      <Swiper
        spaceBetween={width > 768 ? 30 : 12}
        slidesPerView={"auto"}
        slidesPerGroupSkip={1}
        modules={[Navigation]}
        navigation={{
          nextEl: '.next',
          prevEl: '.prev',
        }}
        className='w-full select-none mt-8 group'
      >
        {categories.map((category: any, index: number) => (
          <SwiperSlide key={index} className="!ascpect-square lg:!w-[100px] !w-[80px]">
            <Link href={`/category/${category.id}`}>
              <div className='ascpect-square w-[80px] lg:w-[100px] text-xs text-primary text-center font-medium'>
                <div className='mb-2 w-full flex items-center justify-center bg-[#f6f6f6] transtion h-[60px] lg:h-[80px] rounded-xl border border-transparent hover:border-primary hover:bg-white'>
                  <div className='w-12 aspect-square relative'>
                    <Image src={category.image || '/images/placeholder.webp'} fill alt={category.name} />
                  </div>
                </div>
                {category.name}
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <button className='next absolute right-2 top-1/2 -translate-y-1/2 z-20 lg:group-hover:block hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 stroke-secondary stroke-[3]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button className='prev absolute left-2 top-1/2 -translate-y-1/2 z-20 lg:group-hover:block hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 stroke-secondary stroke-[3]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </Swiper>
      <section>
        <div className='container mt-12'>
          <h2 className='text-[22px] text-primary font-medium uppercase'><span className='text-secondary font-bold'>#</span>Сеты</h2>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-[30px] mt-8'>
            {collection_categories.results.map((item: any, index: number) => {
              if (item.id !== 2) {
                return (
                  <ProductCard
                    key={index}
                    id={item.id}
                    name={item.name}
                    category={{ name: '' }}
                    images={[{ image: item.image }]}
                    availibility={item.availibility}
                    to={`/collections/category/${item.id}`}
                  />
                )
              }
            })}

          </div>
        </div>
      </section>
      {/* <section>
        <div className='container mx-auto'>
          <div className='mt-16'>
            <h2 className='text-[22px] text-primary font-medium uppercase'><span className='text-secondary font-bold'>#</span>Бестселлеры</h2>
            <Swiper
              spaceBetween={30}
              slidesPerView={"auto"}
              slidesPerGroupSkip={1}
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: '.next',
                prevEl: '.prev',
              }}
              pagination={{
                clickable: true,
              }}
              className='w-full select-none group !pb-8 mt-4 index-vars'
            >

              {bestseller_collections.map((item: any) => (
                <SwiperSlide key={item.id} className='!w-[280px] lg:!w-[400px]'>
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    images={item.images}
                    to={`/collections/${item.id}`}
                  />
                </SwiperSlide>
              ))}
              {bestseller_products.map((item: any) => (
                <SwiperSlide key={item.id} className='!w-[280px] lg:!w-[400px]'>
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
        </div>
      </section> */}
      <section>
        <div className='lg:h-[700px] h-[200px] w-full mt-12'>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
            }}
            pagination={{
              clickable: true,
            }}
            className='w-full select-none !max-h-[700px] !h-full index-vars'
          >
            {secondary_banners.map((banner: any, index: number) => (
              <SwiperSlide key={index} className="max-h-[700px] h-full">
                <a href={banner.link} className="h-full">
                  <div className='bg-center bg-cover bg-no-repeat w-full h-full py-[30px]' style={{ 'backgroundImage': `url(${banner.image})` }}>
                    <div className='lg-container'>
                      <div className='lg:min-w-[300px] min-w-[100px] p-2 lg:p-5 bg-[#ffffffb8] inline-block'>
                        <h1 className='text-[16px] lg:text-[67px] text-primary font-bold'>{banner.title}</h1>
                        <p className='lg:text-[22px] text-xs text-primary font-medium'>{banner.description}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
            <button className='next absolute right-2 top-1/2 -translate-y-1/2 z-20'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="lg:w-12 lg:h-12 w-6 h-6 stroke-secondary stroke-[3]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button className='prev absolute left-2 top-1/2 -translate-y-1/2 z-20'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="lg:w-12 lg:h-12 w-6 h-6 stroke-secondary stroke-[3]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </Swiper>
        </div>
      </section>
      <section>
        <div className='container mx-auto'>
          <div className='mt-16'>
            <h2 className='text-[22px] text-primary font-medium uppercase'><span className='text-secondary font-bold'>#</span>Популярные</h2>
            <div className='grid-cols-3 gap-7 mt-8 hidden lg:grid'>
              {toprated_collections.map((item: any, index: number) => (
                <ProductCard
                  key={index}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  images={item.images}
                  horizontal={index % 3 === 0}
                  to={`/collections/${item.id}`}
                />
              ))}
            </div>
            <div className='lg:hidden'>
              <Swiper
                spaceBetween={30}
                slidesPerView={"auto"}
                slidesPerGroupSkip={1}
                className='w-full select-none group !pb-8 mt-4 index-vars'
              >

                {toprated_collections.map((item: any, index: number) => (
                  <SwiperSlide key={index} className='!w-[280px] lg:!w-[400px]'>
                    <ProductCard
                      id={item.id}
                      name={item.name}
                      category={item.category}
                      images={item.images}
                      to={`/collections/${item.id}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container mx-auto'>
          <div className='mt-16'>
            <h2 className='text-[22px] text-primary font-medium uppercase'><span className='text-secondary font-bold'>#</span>youtube</h2>
            <div className='grid grid-cols-1 lg:grid-cols-4 mt-4'>
              <div className='lg:col-span-3'>
                <div className='w-full aspect-video flex justify-center items-center group bg-center bg-no-repeat bg-cover cursor-pointer' style={{ backgroundImage: `url(${youtube.cover})` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-20 h-20 fill-white group-hover:scale-110 transition">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className='flex flex-col lg:p-10 p-4 border border-grey justify-center h-full'>
                <h6 className='text-primary'>
                  {youtube.title}
                </h6>
                <p className='text-primary text-xs mt-4 mb-4'>
                  Чтобы подписаться на канал Weltew Home на YouTube;
                </p>
                <a href={youtube.channel_link} className='flex w-fit space-x-2 items-center bg-[#fe0000] hover:bg-primary text-white text-xl font-semibold transition rounded-lg p-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 fill-white'
                    viewBox="0 0 50 50">
                    <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
                  </svg>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container mx-auto mt-12'>
          <h2 className='text-[22px] text-primary font-medium uppercase'><span className='text-secondary font-bold'>#</span>instagram</h2>
          <div className="grid grid-cols-4 gap-4 relative mt-4">
            {instagram.posts.map((post: any, index: number) => (
              <a href={post.permalink} key={index} target="_blank" className="w-full aspect-square overflow-hidden relative">
                {post.thumbnail_url && (
                  <Image fill src={post.thumbnail_url} alt={post.permalink}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                )}
                {!post.thumbnail_url && (
                  <Image fill src={post.media_url} alt={post.permalink}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                )}
              </a>
            ))}

            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center items-center bg-white py-3 px-2">
              <a href="https://www.instagram.com/weltewhome_tashkent/" className="w-full h-full" target="_blank">
                <div className="flex flex-col items-center w-full h-auto">
                  <Image width={48} height={48} src="/images/insta.webp" alt="instagram" />
                  <span className="text-xl mt-2 text-primary">@weltewhome_tashkent</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  let res = await fetch(`${process.env.apiUrl}/banners/main`).then((res) => res.json())
  const banners = res.results
  res = await fetch(`${process.env.apiUrl}/banners/secondary`).then((res) => res.json())
  const secondary_banners = res.results
  res = await fetch(`${process.env.apiUrl}/categories?limit=30`).then((res) => res.json())
  const categories = res.results
  // res = await fetch(`${process.env.apiUrl}/bestsellers`).then((res) => res.json())
  // const bestseller_collections = res.results[0].collections
  // const bestseller_products = res.results[0].products
  res = await fetch(`${process.env.apiUrl}/toprated`).then((res) => res.json())
  const toprated_collections = res.results[0].collections
  res = await fetch(`${process.env.apiUrl}/social/youtube`).then((res) => res.json())
  const youtube = res.results[0]
  res = await fetch(`${process.env.apiUrl}/social/instagram`).then((res) => res.json())
  const instagram = res.results[0]
  res = await fetch(`https://graph.instagram.com/v15.0/me/media?fields=media_url,thumbnail_url,permalink&access_token=${instagram?.token}`).then((res) => res.json())
  instagram.posts = res.data.slice(0, 8)
  res = await fetch(`${process.env.apiUrl}/collections/categories`)
  const collection_categories = await res.json()

  return {
    props: {
      banners,
      categories,
      // bestseller_collections,
      // bestseller_products,
      secondary_banners,
      toprated_collections,
      youtube,
      instagram,
      collection_categories
    },
  }
}
