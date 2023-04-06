import Head from 'next/head';
import ProductCard from '../components/ProductCard';
import { useRouter } from 'next/router'
import Link from 'next/link';

async function getProducts(page = 0, q: any) {
    if (page) {
        page = Number(page) - 1
    }
    const res = await fetch(`${process.env.apiUrl}/search/?q=${q}&offset=${page * 15}&limit=15`)
    const data = await res.json()
    return data
}

export default function Category({ data }) {
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>{data.count} товаров найдено по запросу «{router.query.q}»</title>
            </Head>
            <div className='container mt-12'>
                <h1 className='text-lg text-center text-primary font-semibold uppercase'>{data.count} товаров найдено по запросу «{router.query.q}»</h1>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-[30px] mt-8'>
                    {data.results.map((item: any) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            images={[{ image: process.env.storageUrl + item.image }]}
                            to={item.collection ? `/collections/${item.id}` : `/products/${item.id}`}
                        />
                    ))}
                </div>
                <div className="flex justify-center items-center space-x-1 mt-8">
                    {data.previous && (
                        <Link className="w-7 aspect-square flex justify-center items-center border border-grey rounded-md"
                            href={`/search/?q=${router.query.q}&page=${Number(router.query.page) - 1}`}
                            scroll
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} className="w-3 h-3 stroke-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </Link>
                    )}
                    {(data.next || data.previous) && Array.from({ length: (data.count / 15) + 1 }, (_, i) => (
                        <Link
                            key={i}
                            scroll
                            href={`/search/?q=${router.query.q}&page=${i + 1}`}
                            className={`w-7 aspect-square flex justify-center items-center border border-grey rounded-md ${String(i + 1) == router.query.page ? 'text-primary bg-grey bg-opacity-50' : 'text-slate-500'}`}
                        >
                            {i + 1}
                        </Link>
                    ))}
                    {data.next && (
                        <Link className="w-7 aspect-square flex justify-center items-center border border-grey rounded-md"
                            href={`/search/?q=${router.query.q}&page=${(Number(router.query.page) + 1) || 2}`}
                            scroll
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} className="w-3 h-3 stroke-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context: any) {
    const data = await getProducts(context.query.page, context.query.q)
    return {
        props: {
            data,
        },
    }
}
