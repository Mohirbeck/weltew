import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Category({ categories }) {
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
                }
            ])
        );
        window.dispatchEvent(new Event("storage"));
    }
    return (
        <div className='container mt-12'>
            <Head>
                <title>Категории</title>
            </Head>
            <h1 className='text-lg text-center text-primary font-semibold uppercase'>Категории</h1>
            <div className='grid grid-cols-2 lg:grid-cols-6 gap-7 mt-6'>
                {categories.results.map((category: any, index: number) => (
                    <div key={index} className="!ascpect-square w-full">
                        <Link href={`/category/${category.id}`}>
                            <div className='ascpect-square w-full text-sm lg:text-lg text-primary text-center font-medium'>
                                <div className='mb-2 w-full flex items-center justify-center bg-[#f6f6f6] transtion h-[100px] lg:h-[140px] rounded-xl border border-transparent hover:border-primary hover:bg-white'>
                                    <div className='w-20 aspect-square relative'>
                                        <Image src={category.image || '/images/placeholder.webp'} fill alt={category.name} />
                                    </div>
                                </div>
                                {category.name}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}


export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.apiUrl}/categories/?limit=100`)
    const categories = await res.json()

    return {
        props: {
            categories,
        },
    }
}
