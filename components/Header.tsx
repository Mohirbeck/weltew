import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header(props: any) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const size = useWindowSize();
    const router = useRouter();
    useEffect(() => {
        setMobileOpen(false);
    }, [router.route]);
    useEffect(() => {
        let cart_count = localStorage.getItem('cart') || "0";
        const cart_count_el = document.getElementById('cart-count');
        if (cart_count !== "0") {
            cart_count = JSON.parse(cart_count).length.toString();
        }
        cart_count_el.innerHTML = cart_count;
    }, []);
    return (
        <div>
            <div className="w-full fixed bg-white z-50 shadow">
                <div className="navbar lg-container bg-white lg:px-10 px-4 py-0">
                    <div className="block lg:hidden cursor-pointer mr-2" onClick={handleDrawerToggle}>
                        <span className={`${mobileOpen ? 'rotate-45 translate-y-[7px] w-[25px]' : 'w-[19px]'} h-[2px] bg-primary rounded transition-all duration-[400ms] block`}></span>
                        <span className={`${mobileOpen ? 'opacity-0' : ''} w-[25px] h-[2px] my-1.5 bg-primary rounded transition-all duration-[400ms] block`}></span>
                        <span className={`${mobileOpen ? '-rotate-45 translate-y-[-9px] w-[25px]' : 'w-[19px]'} h-[2px] bg-primary rounded transition-all duration-[400ms] block`}></span>
                    </div>
                    <div className="flex-1">
                        <Link href={'/'}><Image src="/images/logo.svg" width={size.width > 768 ? 290 : 195} height={100} alt={`logo`} /></Link>
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
                            <button className="lg:hidden block" aria-label="Поиск">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>
                        <div>
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
                        <Link href={'/collections/category'} className={`text-lg hover:text-[#d02d8b] transition ${router.route === "/about" ? 'text-[#d02d8b]' : 'text-primary'}`}>
                            Сеты
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