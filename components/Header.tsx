import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Breadcrumbs from "./Breadcrumbs";
import useWindowDimensions from '../hooks/useWindowDimension';

export default function Header(props: any) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [phoneOpen, setPhoneOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const { width, height } = useWindowDimensions();
    const router = useRouter();
    useEffect(() => {
        setMobileOpen(false);
    }, [router.route]);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    useEffect(() => {
        let cart_count = localStorage.getItem('cart') || "0";
        const cart_count_el = document.getElementById('cart-count');
        if (cart_count !== "0") {
            cart_count = JSON.parse(cart_count).length.toString();
        }
        cart_count_el.innerHTML = cart_count;
        window.addEventListener('storage', () => {
            let crumbs: any = localStorage.getItem('breadcrumbs') || [];
            if (crumbs.length > 0) {
                crumbs = JSON.parse(crumbs);
            } else {
                crumbs = [
                    {
                        label: 'Главная',
                        path: '/'
                    }
                ]
            }
            setBreadcrumbs([...crumbs]);
        })
    }, []);


    return (
        <div>
            <div className={`w-full fixed bg-white z-50 ${breadcrumbs.length > 1 ? '' : 'shadow'}`}>
                <div className={`navbar lg-container bg-white lg:px-10 px-4 py-0`}>
                    <div className="block lg:hidden cursor-pointer mr-2" onClick={handleDrawerToggle}>
                        <span className={`${mobileOpen ? 'rotate-45 translate-y-[7px] w-[25px]' : 'w-[19px]'} h-[2px] bg-primary rounded transition-all duration-[400ms] block`}></span>
                        <span className={`${mobileOpen ? 'opacity-0' : ''} w-[25px] h-[2px] my-1.5 bg-primary rounded transition-all duration-[400ms] block`}></span>
                        <span className={`${mobileOpen ? '-rotate-45 translate-y-[-9px] w-[25px]' : 'w-[19px]'} h-[2px] bg-primary rounded transition-all duration-[400ms] block`}></span>
                    </div>
                    <div className="flex-1">
                        <Link href={'/'}><Image src="/images/logo.svg" width={width > 768 ? 290 : 195} height={100} alt={`logo`} /></Link>
                    </div>
                    <div className="flex space-x-2 py-3">
                        <div>
                            <div className="relative rounded-full hidden lg:block">
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    className="block w-[228px] h-10 pl-4 py-2 rounded-full bg-[#f2f2f2] border-[#f2f2f2] pr-10 sm:text-sm transition focus:bg-white focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                                    placeholder="Поиск"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            router.push(`/search?q=${e.currentTarget.value}`);
                                        }
                                    }}
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                            </div>
                            <button className="lg:hidden block" aria-label="Поиск" onClick={() => setSearchOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>
                        <a href="https://t.me/weltew_admin" className="btn btn-ghost hover:bg-transparent h-10 px-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                className="w-6 h-6 fill-[#2da4dc]"
                                viewBox="0 0 50 50">
                                <path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"></path>
                            </svg>
                        </a>
                        <button className="hidden lg:flex space-x-2" onClick={() => setPhoneOpen(!phoneOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            {phoneOpen && (
                                <span className="text-primary font-medium">+998 95 197 00 02</span>
                            )}
                        </button>
                        <a href="tel:+998951970002" className="btn flex lg:hidden btn-ghost hover:bg-transparent h-10 px-0 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                        </a>
                        <div className="z-[100]">
                            <label tabIndex={0} className="btn btn-ghost hover:bg-transparent h-10 px-0" htmlFor="cart-drawer">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-[30px] drawer-button" fill="none" viewBox="0 0 30 24" stroke="currentColor">
                                        <g id="Group_5" data-name="Group 5">
                                            <path id="Path_51" data-name="Path 51" d="M641.284-7575h3.863s1.6-.139,1.954,2.261,1.372,10.006,1.372,10.006.319,1.74,1.668,1.74h13.705s1.329.036,2.133-1.74,1.737-4.649,2.265-5.873.342-2.721-1.581-2.682H651.611" transform="translate(-641.284 7574.998)" fill="none" stroke="#0c3b5d" strokeLinecap="round" strokeWidth="1.4" />
                                            <g id="Ellipse_5" data-name="Ellipse 5" transform="translate(8.542 16.291)" fill="none" className="stroke-primary" strokeWidth="1.4">
                                                <circle cx="2.5" cy="2.5" r="2.5" stroke="none" />
                                                <circle cx="2.5" cy="2.5" r="1.8" fill="none" />
                                            </g>
                                            <g id="Ellipse_6" data-name="Ellipse 6" transform="translate(19.542 16.291)" fill="none" className="stroke-primary" strokeWidth="1.4">
                                                <circle cx="2.5" cy="2.5" r="2.5" stroke="none" />
                                                <circle cx="2.5" cy="2.5" r="1.8" fill="none" />
                                            </g>
                                        </g>
                                    </svg>
                                    <span id="cart-count" className="w-4 h-4 flex items-center justify-center rounded-full text-[10px] indicator-item bg-secondary border-secondary text-white"></span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={`bg-white border-y border-grey ${breadcrumbs.length > 1 && !searchOpen ? 'block' : 'hidden'}`}>
                    <div className="lg-container px-4 py-2">
                        <Breadcrumbs
                            items={breadcrumbs}
                        />
                    </div>
                </div>
                <div className={`bg-white border-y border-grey w-full ${searchOpen ? 'block' : 'hidden'}`}>
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="block w-full h-10 pl-4 py-2 bg-[#f2f2f2] border-[#f2f2f2] pr-10 sm:text-sm transition focus:bg-white focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Поиск"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    router.push(`/search?q=${e.currentTarget.value}`);
                                    setSearchOpen(false);
                                }
                            }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 left-0 w-full h-full bg-white shadow pt-[72px] transition-all duration-500 ${mobileOpen ? 'opacity-100 z-40' : 'opacity-0 -z-10'}`}>
                <ul className="space-y-2">
                    <li className="border-y border-grey py-2 lg-container">
                        <Link href={'/'} className={`text-lg hover:text-[#d02d8b] transition ${router.route === "/" ? 'text-[#d02d8b]' : 'text-primary'}`}>
                            Главная
                        </Link>
                    </li>
                    <li className="border-b border-grey py-2 lg-container">
                        <Link href={'/about'} className={`text-lg hover:text-[#d02d8b] transition ${router.route === "/about" ? 'text-[#d02d8b]' : 'text-primary'}`}>
                            О Weltew
                        </Link>
                    </li>
                    <li className="border-b border-grey py-2 lg-container">
                        <Link href={'/collections/category'} className={`text-lg hover:text-[#d02d8b] transition ${router.route === "/collections/category" ? 'text-[#d02d8b]' : 'text-primary'}`}>
                            Сеты
                        </Link>
                    </li>
                    <li className="border-b border-grey py-2 lg-container">
                        <Link href={'/category'} className={`text-lg hover:text-[#d02d8b] transition ${router.route === "/category" ? 'text-[#d02d8b]' : 'text-primary'}`}>
                            Категории
                        </Link>
                    </li>
                    <li className="border-b border-grey py-2 lg-container">
                        <Link href={'/delivery'} className={`text-lg hover:text-[#d02d8b] transition ${router.route === "/delivery" ? 'text-[#d02d8b]' : 'text-primary'}`}>
                            Доставка и оплата
                        </Link>
                    </li>
                    <li className="border-b border-grey py-2 lg-container">
                        <Link href={'/gaurantee'} className={`text-lg hover:text-[#d02d8b] transition ${router.route === "/gaurantee" ? 'text-[#d02d8b]' : 'text-primary'}`}>
                            Гарантия
                        </Link>
                    </li>
                    <li className="border-b border-grey py-2 lg-container">
                        <Link href={'/catalogues'} className={`text-lg hover:text-[#d02d8b] transition ${router.route === "/catalogues" ? 'text-[#d02d8b]' : 'text-primary'}`}>
                            Каталоги
                        </Link>
                    </li>
                    <li className="border-b border-grey py-2 lg-container">
                        <Link href={'/tips'} className={`text-lg hover:text-[#d02d8b] transition ${router.route === "/tips" ? 'text-[#d02d8b]' : 'text-primary'}`}>
                            Советы и идеи
                        </Link>
                    </li>
                    <li className="border-b border-grey py-2 lg-container">
                        <Link href={'/contacts'} className={`text-lg hover:text-[#d02d8b] transition ${router.route === "/contacts" ? 'text-[#d02d8b]' : 'text-primary'}`}>
                            Магазины
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
