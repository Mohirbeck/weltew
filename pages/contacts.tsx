import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import ymaps from 'ymaps';

export default function About({ data }) {
    const router = useRouter();
    const [open, setOpen] = useState(-1);
    React.useEffect(() => {
        ymaps.load(init);
        function init() {
            var myMap = new ymaps.Map("map", {
                center: [41.311294, 69.269107],
                zoom: 7
            });
            var myPlacemark = new ymaps.Placemark([41.311294, 69.269107], {
                balloonContent: 'г. Ташкент, ул. Мирзо-Улугбекский район, д. 1, офис 1'
            });
            myMap.geoObjects.add(myPlacemark);
        }
    }, []);
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('breadcrumbs',
            JSON.stringify([
                {
                    label: 'Главная',
                    path: '/'
                },
                {
                    label: 'Магазины',
                    path: router.route
                }
            ])
        );
        window.dispatchEvent(new Event("storage"));
    }
    return (
        <div className="lg-container">
            <h1 className="text-xl text-primary font-semibold my-2 lg:my-4">Магазины</h1>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-7">
                <div className="hidden lg:block">
                    <div className="border border-grey py-[25px] px-[30px] sticky top-[80px]">
                        <ul className="space-y-2">
                            <li className={`border-l-4 border-secondary pl-3 ${router.route === "/about" ? 'border-secondary' : 'border-transparent'}`}>
                                <Link href={'/about'} className={`text-sm hover:font-black transition text-primary ${router.route === "/about" ? 'font-black' : 'font-semibold'}`}>
                                    О Weltew
                                </Link>
                            </li>
                            <li className={`border-l-4 border-secondary pl-3 ${router.route === "/delivery" ? 'border-secondary' : 'border-transparent'}`}>
                                <Link href={'/delivery'} className={`text-sm hover:font-black transition text-primary ${router.route === "/delivery" ? 'font-black' : 'font-medium'}`}>
                                    Доставка и оплата
                                </Link>
                            </li>
                            <li className={`border-l-4 border-secondary pl-3 ${router.route === "/gaurantee" ? 'border-secondary' : 'border-transparent'}`}>
                                <Link href={'/gaurantee'} className={`text-sm hover:font-black transition text-primary ${router.route === "/gaurantee" ? 'font-black' : 'font-medium'}`}>
                                    Гарантия
                                </Link>
                            </li>
                            <li className={`border-l-4 border-secondary pl-3 ${router.route === "/catalogues" ? 'border-secondary' : 'border-transparent'}`}>
                                <Link href={'/catalogues'} className={`text-sm hover:font-black transition text-primary ${router.route === "/catalogues" ? 'font-black' : 'font-medium'}`}>
                                    Каталоги
                                </Link>
                            </li>
                            <li className={`border-l-4 border-secondary pl-3 ${router.route === "/tips" ? 'border-secondary' : 'border-transparent'}`}>
                                <Link href={'/tips'} className={`text-sm hover:font-black transition text-primary ${router.route === "/tips" ? 'font-black' : 'font-medium'}`}>
                                    Советы и идеи
                                </Link>
                            </li>
                            <li className={`border-l-4 border-secondary pl-3 ${router.route === "/contacts" ? 'border-secondary' : 'border-transparent'}`}>
                                <Link href={'/contacts'} className={`text-sm hover:font-black transition text-primary ${router.route === "/contacts" ? 'font-black' : 'font-medium'}`}>
                                    Магазины
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-primary border border-grey lg:py-8 py-2 lg:px-10 px-2 lg:col-span-4">
                    {/* <div style={{ position: 'relative', overflow: 'hidden' }}><a href="https://yandex.com/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>Tashkent</a><a href="https://yandex.com/maps/10335/tashkent/stops/1543141339/?ll=69.269107%2C41.311294&tab=overview&utm_medium=mapframe&utm_source=maps&z=13" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}>Paxtakor metro station in — Yandex Maps</a><iframe src="https://yandex.com/map-widget/v1/?pt=69.269107,41.311294&&pt=69.24855824924867,41.280534621470366&z=7&lang=ru" width="560" height="400" frameBorder="0" allowFullScreen style={{ position: 'relative' }}></iframe></div> */}
                    <div id="map"></div>
                    {data.results.map((item: any, index: number) => (
                        <div key={index} className="border border-grey py-1 px-2">
                            <button className="flex space-x-2 items-center" onClick={() => {
                                if (open === index) {
                                    setOpen(-1);
                                } else {
                                    setOpen(index);
                                }
                            }}>
                                {open === index ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-primary w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-primary w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>)
                                }
                                <span className="text-primary text-lg flex-grow truncate">{item.address}</span>
                            </button>
                            {open === index && (
                                <div className="space-y-2 mt-2">
                                    <div className="w-full h-[400px] relative">
                                        <Image fill src={item.image} alt={item.address} />
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        <a href={`tel:${item.phone}`} className="text-primary text-lg flex-grow truncate">{item.phone}</a>
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        <a href={`tel:${item.phone_2}`} className="text-primary text-lg flex-grow truncate">{item.phone_2}</a>
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-primary w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                        <a href={`mailto:${item.email}`} className="text-primary text-lg flex-grow truncate">{item.email}</a>
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-primary w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-primary text-lg flex-grow truncate">{item.working_hours}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                        <a href={item.facebook} target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-transparent border border-grey hover:border-primary transition-all text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-[#d02d8b]">
                                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-primary uppercase font-semibold text-xs">посмотреть на карте</span>
                                        </a>
                                        <a href={item.facebook} target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-transparent border border-grey hover:border-primary transition-all text-primary">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 355.612 355.612" enableBackground="new 0 0 355.612 355.612" className="w-5 h-5 fill-[#d02d8b]">
                                                <path d="m182.806,132.806h124.806l48-60-48-60h-124.806-20v70h-114.806l-48,60 48,60h114.806v120h-77.5v20h175v-20h-77.5v-120-70zm0-100h115.194l32,40-32,40h-115.194v-30-50zm-125.194,150l-32-40 32-40h105.194v30 50h-105.194z" />
                                            </svg>
                                            <span className="text-primary uppercase font-semibold text-xs">получить маршрут</span>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.apiUrl}/contacts`)
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}