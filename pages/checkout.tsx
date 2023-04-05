import Form from '../components/Form'
import { useState } from 'react'

export default function Checkout({ name, cart }) {
    const [text, setText] = useState('');
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const saveData = (data: any) => {
        let items = { products: [], collections: [], total: getTotal(), ...data }
        cart.cart.forEach((item: any) => {
            if (item?.collection) {
                items.collections.push(
                    {
                        id: item.id,
                        products: getProductsCollection(item.id)
                    }
                )
            } else {
                items.products.push({ id: item.id, quantity: item.quantity, name: item.name });
            }
        })
        if (items.collections.length > 0 || items.products.length > 0) {
            fetch(`${process.env.API_URL}/checkout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            })
            setText('Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время.')
            setSuccess(true);
            setOpen(true);
        } else {
            setText('Вы не выбрали ни одного товара.')
            setSuccess(false);
            setOpen(true);
        }
    }
    const getTotal = () => {
        let total = 0;
        cart.cart.forEach((item: any) => {
            if (item?.collection) {
                total += getTotalCollection(item.id);
            } else {
                total += (item.price * item.quantity) || 0;
            }
        })
        return total;
    }
    const formatCurrency = (num: number) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
    const getTotalQuantity = () => {
        let total = 0;
        cart.cart.forEach((item: any) => {
            if (item?.collection) {
                total += getTotalQuantityCollection(item.id);
            } else {
                total += item.quantity || 0;
            }
        })
        return total;
    }
    const getTotalCollection = (collection_id: number) => {
        let colls: any = localStorage.getItem('collections') || [];
        let total = 0;
        if (colls.length > 0) {
            colls = JSON.parse(colls);
        }
        colls.find((item: any) => item.id === collection_id).default_products.forEach((item: any) => {
            total += item.price * item.quantity;
        })
        return total;
    }
    const getTotalQuantityCollection = (collection_id: number) => {
        let colls: any = localStorage.getItem('collections') || [];
        let total = 0;
        if (colls.length > 0) {
            colls = JSON.parse(colls);
        }
        colls.find((item: any) => item.id === collection_id).default_products.forEach((item: any) => {
            total += item.quantity;
        })
        return total;
    }
    const getProductsCollection = (collection_id: number) => {
        let colls: any = localStorage.getItem('collections') || [];
        let products = [];
        if (colls.length > 0) {
            colls = JSON.parse(colls);
        }
        colls.find((item: any) => item.id === collection_id).default_products.forEach((item: any) => {
            products.push({ id: item.id, quantity: item.quantity, name: item.name });
        })
        return products;
    }
    return (
        <div className="lg-container mt-4">
            <h1 className="text-primary text-2xl font-semibold">{name}</h1>
            <div className="flex lg:space-x-12 w-full mt-8 flex-col-reverse lg:flex-row">
                <div className="w-full max-w-[1040px] mt-12 lg:mt-0">
                    <div className="w-full max-w-[820px] border border-grey p-8">
                        <h6 className="text-primary text-lg font-medium">Контактные данные</h6>
                        <Form submit={(data: any) => saveData(data)} />
                    </div>
                </div>
                <div className='flex-grow'>
                    <div className='border border-grey p-8 w-full'>
                        <div className='flex justify-between items-center'>
                            <h6 className="text-primary text-lg font-medium">Корзина <span className='text-secondary ml-2'>{getTotalQuantity()}</span></h6>
                            <button className='text-blue-500 text-sm font-medium' onClick={() => document.getElementById('cart-drawer').click()}>Изменить</button>
                        </div>
                        <p className='text-primary text-sm mt-4 font-medium'>В сумму включено</p>
                        <div className='flex justify-between items-center mt-2'>
                            <p className='text-primary text-sm'>{getTotalQuantity()} товаров</p>
                            <p className='text-primary text-sm'>{formatCurrency(getTotal())} сум</p>
                        </div>
                        <p className='text-primary text-sm mt-4 font-medium'>Всего</p>
                        <p className='text-primary text-2xl font-semibold'>{formatCurrency(getTotal())} сум</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {

    return {
        props: {
            name: 'Оформление заказа',
        }
    }
}