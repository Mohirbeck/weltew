import '../styles/globals.css'
import Header from '../components/Header';
import Head from 'next/head';
import Footer from '../components/Footer';
import React from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image';
import Link from 'next/link';
import Counter from '../components/Counter';
import Script from 'next/script';

let navigationPropsCache;

function MyApp({ Component, pageProps, navigationProps, ...rest }) {
    const router = useRouter()
    React.useEffect(() => {
        const handleRouteChange = (url: string) => {
            const top = document.getElementById('top')
            top.scrollIntoView({ behavior: 'smooth' })
        }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router.events])


    const [toast, setToast] = React.useState({ text: '', show: false, success: false });
    React.useEffect(() => {
        if (toast.show) {
            setTimeout(() => {
                setToast({ ...toast, show: false })
            }, 4000)
        }
    }, [toast.show])

    const [cart, setCart] = React.useState([]);
    const [collections, setCollections] = React.useState([]);
    React.useEffect(() => {
        let cartt: any = localStorage.getItem('cart') || [];
        if (cartt.length > 0) {
            cartt = JSON.parse(cartt);
        }
        setCart(cartt);
    }, [])
    React.useEffect(() => {
        let collections: any = localStorage.getItem('collections') || [];
        if (collections.length > 0) {
            collections = JSON.parse(collections);
        }
        setCollections(collections);
    }, [])

    const deleteItem = (index: number) => {
        let cartt: any = localStorage.getItem('cart') || [];
        if (cartt.length > 0) {
            cartt = JSON.parse(cartt);
        }
        cartt.splice(index, 1);
        const cart_count_el = document.getElementById('cart-count');
        cart_count_el.innerHTML = cartt.length.toString();
        localStorage.setItem('cart', JSON.stringify(cartt));
        setCart(cartt);
    }

    const deleteAll = () => {
        localStorage.removeItem('cart');
        const cart_count_el = document.getElementById('cart-count');
        cart_count_el.innerHTML = '0';
        setCart([]);
    }

    const changeCount = (count: number, index: number) => {
        let cartt: any = localStorage.getItem('cart') || [];
        if (cartt.length > 0) {
            cartt = JSON.parse(cartt);
        }
        cartt[index].quantity = count;
        localStorage.setItem('cart', JSON.stringify(cartt));
        setCart(cartt);
    }

    const formatCurrency = (num: number) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }

    const getTotal = () => {
        let total = 0;
        cart.forEach((item: any) => {
            if (item?.collection) {
                total += getTotalCollection(item.id);
            } else {
                total += (item.price * item.quantity) || 0;
            }
        })
        return total;
    }

    const deleteFromCollection = (collection_id: number, index: number) => {
        let colls: any = localStorage.getItem('collections') || [];
        if (colls.length > 0) {
            colls = JSON.parse(colls);
        }
        colls.find((item: any) => item.id === collection_id).default_products.splice(index, 1);
        if (colls.find((item: any) => item.id === collection_id).default_products.length === 0) {
            colls.splice(colls.findIndex((item: any) => item.id === collection_id), 1);
        }
        localStorage.setItem('collections', JSON.stringify(colls));
        setCollections(colls);
    }

    const changeCountCollection = (count: number, collection_id: number, index: number) => {
        let colls: any = localStorage.getItem('collections') || [];
        if (colls.length > 0) {
            colls = JSON.parse(colls);
        }
        colls.find((item: any) => item.id === collection_id).default_products[index].quantity = count;
        localStorage.setItem('collections', JSON.stringify(colls));
        setCollections(colls);
    }

    const getTotalCollection = (collection_id: number) => {
        let colls: any = localStorage.getItem('collections') || [];
        let total = 0;
        if (colls.length > 0) {
            colls = JSON.parse(colls);
        }
        colls.find((item: any) => item.id === collection_id).default_products.forEach((item: any) => {
            total += item.price * item.quantity;
        })
        return total;
    }

    return (
        <div className='bg-white drawer drawer-end'>
            <Head>
                <meta name="facebook-domain-verification" content="pnsd0lf3a2ccvzn3lo73s6y6xajhk0" />
                <meta name="facebook-domain-verification" content="4jw1d10tqdseilrx1310lk37pext04" />
            </Head>

            {/* Google */}
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-JD9D7P9XP5"></Script>
            <Script>
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-JD9D7P9XP5');`}
            </Script>

            {/* Yandex */}
            <Script type="text/javascript" >
                {`(function(m,e,t,r,i,k,a){m[i] = m[i]function(){(m[i].a = m[i].a[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(93118356, "init", {
                        clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });`}
            </Script>
            <noscript><div><img src="https://mc.yandex.ru/watch/93118356" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript>

            {/* Pixel */}
            <Script>
                {`!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '893313091634356');
                fbq('track', 'PageView');`}
            </Script>
            <noscript><img height="1" width="1" style={{ display: 'none' }}
                src="https://www.facebook.com/tr?id=893313091634356&ev=PageView&noscript=1"
            /></noscript>

            <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className='text-transparent h-0' id='top'>top</div>
                <Header />
                <React.StrictMode>
                    <div className='py-[72px]'>
                        <Component {...pageProps} cart={{ cart, setCart }} collections={{ collections, setCollections }} setToast={setToast} />
                    </div>
                </React.StrictMode>
                <div className={`toast toast-top toast-end z-50 transition-all duration-500 ${toast.show ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`alert rounded ${toast.success ? 'alert-success' : 'alert-error'}`}>
                        <div>
                            <span className='text-white text-lg'>{toast.text}</span>
                        </div>
                    </div>
                </div>
                <Footer contacts={navigationProps} />
            </div>
            <div className="drawer-side">
                <label htmlFor="cart-drawer" className="drawer-overlay"></label>
                <ul className="p-4 w-full lg:w-96 bg-white">
                    <button className='flex items-center space-x-2' onClick={() => document.getElementById('cart-drawer').click()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-12 h-12 stroke-indigo-900">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className='flex justify-between items-center mt-4'>
                        <span className='text-primary text-lg font-semibold'>Корзина</span>
                        <button className='flex items-center space-x-2 pr-2' title="Очистить все" onClick={() => deleteAll()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-2 stroke-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                    <div className='mt-4 space-y-4'>
                        {cart.length > 0 ? cart.map((item: any, index) => {
                            if (item?.collection) {
                                let collection = collections.find((collection: any) => collection.id === item.id);
                                return (
                                    <div className='collapse' key={index}>
                                        <input type="checkbox" className="peer" />
                                        <button className='collapse-title flex items-center justify-between w-full text-primary px-0'>
                                            <span>{collection.name}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-primary w-6 h-6 peer-checked:rotate-180">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                        <div className='collapse-content px-0'>
                                            <div className='flex items-center justify-between my-2'>
                                                <span className='text-primary'>Итого:</span>
                                                <span className='text-primary font-medium text-lg'>{formatCurrency(getTotalCollection(collection.id))} сум</span>
                                            </div>
                                            {collection.default_products.map((product: any, i: number) => {
                                                return (
                                                    <div key={i + 100} className='w-full border border-grey px-2 py-2 pr-4 relative mb-4'>
                                                        <div className='flex items-center space-x-2'>
                                                            <div className='relative w-20 h-20 border border-grey'>
                                                                <Image fill style={{ objectFit: 'contain' }} src={product.image} alt={product.name} />
                                                            </div>
                                                            <p className='text-primary font-medium text-sm'>{product.name}</p>
                                                        </div>
                                                        <div className='flex items-center space-x-3 mt-4'>
                                                            <Counter min={1} count={product.quantity || 1} changeCount={(count: number) => changeCountCollection(count, collection.id, i)} />
                                                            <div>
                                                                <p className='text-primary font-medium text-lg'>{formatCurrency((product.quantity * product.price) || 0)} сум</p>
                                                                <p className='text-slate-400 text-sm'>{formatCurrency((product.price) || 0)} сум</p>
                                                            </div>
                                                        </div>
                                                        <button className='flex items-center space-x-2 absolute right-2 top-2' title="Удалить" onClick={() => deleteFromCollection(collection.id, i)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-2 stroke-red-600">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className='w-full border border-grey px-2 py-2 pr-4 relative'>
                                        <div className='flex items-center space-x-2'>
                                            <div className='relative w-20 h-20 border border-grey'>
                                                <Image fill src={item.image} alt={item.name} />
                                            </div>
                                            <p className='text-primary font-medium text-sm'>{item.name}</p>
                                        </div>
                                        <div className='flex items-center space-x-3 mt-4'>
                                            <Counter min={1} count={item.quantity} changeCount={(count: number) => changeCount(count, index)} />
                                            <div>
                                                <p className='text-primary font-medium text-lg'>{formatCurrency(item.quantity * item.price)} сум</p>
                                                <p className='text-slate-400 text-sm'>{formatCurrency(item.price)} сум / шт.</p>
                                            </div>
                                        </div>
                                        <button className='flex items-center space-x-2 absolute right-2 top-2' title="Удалить" onClick={() => deleteItem(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-2 stroke-red-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                )
                            }
                        }) : <div className='text-center text-primary text-lg font-semibold'>Корзина пуста</div>}
                        {cart.length > 0 && (
                            <div className='w-full border border-grey px-2 py-2 pr-4 relative'>
                                <h6 className='text-primary text-lg font-semibold'>Стоимость</h6>
                                <div className='flex items-center justify-between mt-4'>
                                    <span className='text-primary'>Итого:</span>
                                    <span className='text-primary font-medium text-lg'>{formatCurrency(getTotal())} сум</span>
                                </div>
                                <Link href={'/checkout'} className='btn bg-primary hover:bg-[#0d4770] text-white space-x-2 w-full mt-4' onClick={() => document.getElementById('cart-drawer').click()}>
                                    <span>В Оформление заказа</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    )
}

MyApp.getInitialProps = async () => {
    if (navigationPropsCache) {
        return { navigationProps: navigationPropsCache }
    }

    const res = await fetch(`${process.env.apiUrl}/contacts`)
    const navigationProps = await res.json()
    navigationPropsCache = navigationProps

    return { navigationProps }
}

export default MyApp;
