import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export default function About({ tips }) {
    const router = useRouter();
    const [open, setOpen] = useState(-1);
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('breadcrumbs',
            JSON.stringify([
                {
                    label: 'Главная',
                    path: '/'
                },
                {
                    label: 'Советы и идеи',
                    path: router.route
                }
            ])
        );
        window.dispatchEvent(new Event("storage"));
    }
    return (
        <div className="lg-container">
            <h1 className="text-xl text-primary font-semibold my-2 lg:my-4">Каталоги</h1>
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
                <div className="text-primary border border-grey lg:py-6 py-2 lg:px-8 px-2 lg:col-span-4 space-y-6">
                    {tips.results.map((item: any, index: number) => (
                        <div className="w-full border border-grey p-2">
                            <button className="w-full text-primary font-semibold texg-lg flex items-center justify-between" onClick={() => {
                                if (open === index) {
                                    setOpen(-1)
                                } else {
                                    setOpen(index)
                                }
                            }}>
                                <span>{item.title}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${open === index ? 'rotate-180' : ''}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            <div className={`w-full overflow-hidden transition-all duration-300 ${open === index ? 'max-h-999px transition-all duration-300' : 'max-h-0'}`}>
                                <div dangerouslySetInnerHTML={{ __html: item.description }} className="text-primary text-sm mt-3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.apiUrl}/tips`)
    const tips = await res.json()

    return {
        props: {
            tips
        }
    }
}