import '../styles/globals.css'
import { Provider, useSelector } from 'react-redux'
import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';
import { useRouter } from 'next/router'
import { wrapper } from "../store/store";

let navigationPropsCache;

function MyApp({ Component, pageProps, navigationProps, ...rest }) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const router = useRouter()
    React.useEffect(() => {
        const handleRouteChange = (url: string) => {
            const top = document.getElementById('top')
            top.scrollIntoView({ behavior: 'smooth' })
        }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router.events])

    React.useEffect(() => {
        function getCookie(name: string) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        let device = getCookie('device')

        if (device == null || device == undefined) {
            device = uuidv4()
        }

        document.cookie = 'device=' + device + ";domain=;path=/"
        const resp = fetch(`${process.env.API_URL}/customers/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                device: device
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (typeof data.device === "object") {
                
            } else {
                store.dispatch({ type: 'setCustomer', payload: data })
            }
        })
    }, [])
    const customer = store.getState().customer.customer
    return (
        <Provider store={store}>
            <div className='bg-white drawer drawer-end'>
                <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className='text-transparent h-0' id='top'>top</div>
                    <Header />
                    <React.StrictMode>
                        <div className='py-[72px]'>
                            <Component {...pageProps} />
                        </div>
                    </React.StrictMode>
                    <Footer contacts={navigationProps} />
                </div>
                <div className="drawer-side">
                    <label htmlFor="cart-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    </ul>
                </div>
            </div>
        </Provider>
    )
}

MyApp.getInitialProps = async () => {
    if (navigationPropsCache) {
        return { navigationProps: navigationPropsCache }
    }

    const res = await fetch(`${process.env.apiUrl}/contacts`)
    const navigationProps = await res.json()
    navigationPropsCache = navigationProps

    return { navigationProps }
}

export default MyApp;
