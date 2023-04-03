import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function About({ catalogues }) {
    const router = useRouter();
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
                <div className="text-primary border border-grey lg:py-8 py-2 lg:px-10 px-2 lg:col-span-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-7 gap-y-7">
                        {catalogues.results.map((item: any, index: number) => (
                            <div className="group border border-grey w-full min-h-[400px]">
                                <div className="w-full aspect-[16/11] relative">
                                    <Image src={item.image} alt={item.title} fill />
                                </div>
                                <div className="p-6">
                                    <h6 className="lg:text-2xl text-xl text-primary font-semibold text-center">{item.title}</h6>
                                    <div className="flex items-center mt-3">
                                        <button className="rounded-l-full flex items-center space-x-2 border border-grey w-1/2 py-2 justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-secondary">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-sm">Просмотреть</span>
                                        </button>
                                        <button className="rounded-r-full flex items-center space-x-2 border-y border-r border-grey w-1/2 py-2 justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-secondary">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                            <span className="text-sm">Загрузить</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.apiUrl}/catalogs`)
    const catalogues = await res.json()

    return {
        props: {
            catalogues
        }
    }
}