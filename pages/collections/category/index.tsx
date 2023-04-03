import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';

export default function Category({ categories }) {
    return (
        <div>
            <Head>
                <title>Sets</title>
            </Head>
            <div className='container mt-12'>
                <h1 className='text-lg text-center text-primary font-semibold uppercase'>Sets</h1>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-[30px] mt-8'>
                    {categories.results.map((item: any) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            category={{ name: '' }}
                            images={[{image: item.image}]}
                            to={`/collections/category/${item.id}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.apiUrl}/collections/categories`)
    const categories = await res.json()

    return {
        props: {
            categories,
        },
    }
}
