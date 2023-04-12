import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function About({ data }) {
    const router = useRouter();
    let content = data.content;
    content = content.replace(/<img/g, '<img class="!w-full !h-auto"').replace(/<iframe/g, '<iframe class="!w-full !h-auto aspect-video mt-2"')
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('breadcrumbs',
            JSON.stringify([
                {
                    label: 'Главная',
                    path: '/'
                },
                {
                    label: data.page_name,
                    path: router.route
                }
            ])
        );
        window.dispatchEvent(new Event("storage"));
    }
    return (
        <div className="lg-container">
            <h1 className="text-xl text-primary font-semibold my-2 lg:my-4">{data.page_name}</h1>
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
                <div className="text-primary border border-grey lg:py-8 py-2 lg:px-10 px-2 lg:col-span-4" dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.apiUrl}/pages/delivery`)
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}