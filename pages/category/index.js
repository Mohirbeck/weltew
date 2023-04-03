import Head from 'next/head';
import Link from 'next/link';

export default function Category({ categories }) {
    return (
        <div>
            <Head>
                <title>Categories</title>
            </Head>
            <ul>
                {categories.map((category) => (
                    <li key={category}><Link href={`/category/${category}`}>{category}</Link></li>
                ))}
            </ul>
        </div>
    )
}


export async function getServerSideProps({ params }) {
    const res = await fetch(`https://fakestoreapi.com/products/categories`)
    const categories = await res.json()

    return {
        props: {
            categories,
        },
    }
}
