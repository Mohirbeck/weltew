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
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Product({ collection, similar, collections, cart }) {
  let ps = [];
  const [products, setProducts] = useState([]);
  const [default_products, setDefaultProducts] = useState([]);
  useEffect(() => {
    let inside = false;
    let collec: any = localStorage.getItem('collections') || [];
    if (collec.length > 0) {
      collec = JSON.parse(collec);
    }
    collec.forEach((element: any) => {
      if (element.id === collection.id) {
        inside = true;
      }
    });
    if (!inside) {
      let new_collections = collections.collections;
      let products = getDefaultProducts(collection.default_products)
      new_collections.push({
        name: collection.name, id: collection.id, image: collection.images[0].image, default_products: products
      });
      setDefaultProducts(products);
      collections.setCollections(new_collections);
      localStorage.setItem('collections', JSON.stringify(new_collections));
    } else {
      const col = collec.find((element: any) => element.id === collection.id);
      setDefaultProducts(col.default_products);
      collection.products.forEach((element: any, i: number) => {
        let quantity = 0;
        col.default_products.forEach((element2: any) => {
          if (element.id === element2.id) {
            quantity = element2.quantity;
          }
        });
        ps.push({ name: element.name, id: element.id, image: element.images[0]?.image || '/images/placeholder.webp', price: Number(element.price), quantity: quantity });
      });
      setProducts([...ps]);
      ps = [];
    }
  });

  const getDefaultProducts = (ps: any) => {
    let default_products = [];
    ps.forEach((element: any) => {
      default_products.push({ name: element.name, id: element.id, image: element.images[0]?.image || '/images/placeholder.webp', price: Number(element.price), quantity: 1 });
    });
    return default_products;
  }


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
  const changeCount = (count: number, id: number) => {
    const i = default_products.findIndex((element: any) => element.id === id);
    const p_index = products.findIndex((element: any) => element.id === id);
    let dps = default_products;
    if (count < 1) {
      dps.splice(i, 1);
    }
    else {
      if (i < 0) {
        dps.push({ name: products[p_index].name, id: products[p_index].id, image: products[p_index].image, price: products[p_index].price, quantity: count });
      } else {
        dps[i].quantity = count;
      }
    }
    setDefaultProducts([...dps]);
    let new_collections = collections.collections;
    let col = new_collections.find((element: any) => element.id === collection.id);
    col.default_products = dps;
    new_collections[new_collections.findIndex((element: any) => element.id === collection.id)] = col;
    collections.setCollections(new_collections);
    localStorage.setItem('collections', JSON.stringify(new_collections));
  }

  const getTotal = () => {
    let total = 0;
    default_products.forEach((element: any) => {
      total += element.price * element.quantity;
    });
    return total;
  }

  const addToCart = async (collection: any) => {
    const item = cart.cart.find((item: any) => item.id === collection.id);
    let new_cart = [];
    if (item) {
    } else {
      new_cart = [...cart.cart, { id: collection.id, collection: true }];
    }
    cart.setCart(new_cart)
    localStorage.setItem('cart', JSON.stringify(new_cart));
    const cart_count_el = document.getElementById('cart-count');
    cart_count_el.innerHTML = new_cart.length.toString();
  };

  const formatCurrency = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
  }

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
            navigation={size.width > 768 ? {
              nextEl: '.next',
              prevEl: '.prev',
            } : false}
            loop
            pagination={{ clickable: true }}
            className='index-vars'
          >
            {collection.images.map((image: any, i: number) => (
              <SwiperSlide key={image.id}>
                <div className='w-full lg:h-[540px] h-[220px] bg-center bg-no-repeat bg-contain' onClick={() => setIndex(i)} style={{ backgroundImage: `url(${image.image})` }}>
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
                    {default_products?.map((product: any, i: number) => (
                      <tr key={product.id}>
                        <td className='text-primary font-medium text-[13px] py-1 text-left'>{product.name}</td>
                        <td className='text-primary font-medium text-[13px] py-1 text-center'>{product.quantity}</td>
                        <td className='text-primary font-medium text-[13px] py-1 text-center'>{product.price > 0 ? product.price : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='flex items-center justify-between mt-4'>
                <p className='text-primary font-medium text-[13px]'>Итого</p>
                <p className='text-primary font-semibold text-lg'>{formatCurrency(getTotal())} сум</p>
              </div>
              <button onClick={() => { document.getElementById('products').scrollIntoView({ behavior: 'smooth' }) }} className='w-full text-sky-600 underline text-center mt-2'>Изменить содержимое сета</button>
              <button className='btn bg-primary hover:bg-[#0d4770] text-white space-x-2 mt-2 w-full' onClick={() => addToCart(collection)}>
                <span>В корзину</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>
            </div>
          </div>
          <h3 className='text-3xl text-primary text-center font-bold mt-8 hidden lg:block'>{collection.name}</h3>
          <div className='lg:mt-8 mt-4' dangerouslySetInnerHTML={{ __html: description }}>
          </div>
          <h5 className='lg:my-8 my-4 text-primary font-semibold text-lg lg:text-2xl text-center' id='products'>Настроить</h5>
          <table className='w-full border-collapse'>
            <tbody>
              {products.map((product: any, i: number) => (
                <tr key={product.id} className='flex flex-col lg:flex-row items-center justify-between'>
                  <td className='border-[0.5px] border-grey w-full lg:p-4 p-2'>
                    <div className='flex items-center lg:space-x-10 space-x-3'>
                      <img src={product.image || '/images/placeholder.webp'} alt={product.name} className='lg:h-[160px] h-[75px] aspect-video object-contain' />
                      <div className='flex flex-col lg:flex-row lg:items-center lg:flex-grow justify-between space-y-4 lg:space-y-0'>
                        <Link className='text-primary font-medium text-sm lg:text-lg' href={`/products/${product.id}`}>{product.name}</Link>
                        <Counter min={0} max={15} count={product.quantity} changeCount={(count: number) => changeCount(count, product.id)} />
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
                    {default_products?.map((product: any, i: number) => (
                      <tr key={product.id}>
                        <td className='text-primary font-medium text-[13px] py-1 text-left'>{product.name}</td>
                        <td className='text-primary font-medium text-[13px] py-1 text-center'>{product.quantity}</td>
                        <td className='text-primary font-medium text-[13px] py-1 text-center'>{product.price > 0 ? product.price : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='flex items-center justify-between mt-4'>
                <p className='text-primary font-medium text-[13px]'>Итого</p>
                <p className='text-primary font-semibold text-lg'>{formatCurrency(getTotal())} сум</p>
              </div>
              <button onClick={() => { document.getElementById('products').scrollIntoView({ behavior: 'smooth' }) }} className='w-full text-sky-600 underline text-center mt-2'>Изменить содержимое сета</button>
              <button className='btn bg-primary hover:bg-[#0d4770] text-white space-x-2 mt-2 w-full' onClick={() => addToCart(collection)}>
                <span>В корзину</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>
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