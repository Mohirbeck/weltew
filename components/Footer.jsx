
import Link from "next/link"

export default function Footer(props) {

    return (
        <footer className="bg-white border-t border-grey pt-16 pb-8">
            <div className="lg-container">
                <nav className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 justify-between">
                    <div>
                        <h6 className="text-primary mb-3 font-medium">КОНТАКТ</h6>
                        <p className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-[#d02d8b] fill-none w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <span className="text-primary text-sm">
                                {props.contacts.results[0].address}
                            </span>
                        </p>
                        <p className="flex items-center space-x-3 mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="stroke-[#d02d8b] fill-none w-6 h-6 rotate-90">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            <span className="text-primary text-sm">
                                {props.contacts.results[0].phone}
                            </span>
                        </p>
                    </div>
                    <div>
                        <h6 className="text-primary mb-3 font-medium">СОЦИАЛЬНЫЕ МЕДИА</h6>
                        <p className="text-primary text-sm">Следить за Weltew в социальных сетях;</p>
                        <div className="flex items-center space-x-2 mt-3">
                            <a href="https://www.instagram.com/weltewhome_tashkent/" className="rounded-full aspect-square w-9 flex items-center justify-center bg-[#d02d8b] hover:-translate-y-2 transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-white stroke-2 fill-white"
                                    viewBox="0 0 50 50">
                                    <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                                </svg>
                            </a>
                            <a href="https://facebook.com/" className="rounded-full aspect-square w-9 flex items-center justify-center bg-[#3654a1] hover:-translate-y-2 transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-white stroke-2 fill-white"
                                    viewBox="0 0 30 30">
                                    <path d="M12,27V15H8v-4h4V8.852C12,4.785,13.981,3,17.361,3c1.619,0,2.475,0.12,2.88,0.175V7h-2.305C16.501,7,16,7.757,16,9.291V11 h4.205l-0.571,4H16v12H12z"></path>
                                </svg>
                            </a>
                            <a href="https://youtube.com/" className="rounded-full aspect-square w-9 flex items-center justify-center bg-[#dd040d] hover:-translate-y-2 transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-white stroke-2 fill-white"
                                    viewBox="0 0 50 50">
                                    <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
                                </svg>
                            </a>
                            <a href="https://t.me/weltew_admin" className="rounded-full aspect-square w-9 flex items-center justify-center bg-[#29b6f6] hover:-translate-y-2 transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-white stroke-2 fill-white"
                                    viewBox="0 0 50 50">
                                    <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h6 className="text-primary mb-3 font-medium">ПОКУПАТЕЛЯМ</h6>
                        <ul className="space-y-2">
                            <li>
                                <Link href={'/about'} className="text-primary text-sm hover:text-[#d02d8b] transition">
                                    О Weltew
                                </Link>
                            </li>
                            <li>
                                <Link href={'/delivery'} className="text-primary text-sm hover:text-[#d02d8b] transition">
                                    Доставка и оплата
                                </Link>
                            </li>
                            <li>
                                <Link href={'/gaurantee'} className="text-primary text-sm hover:text-[#d02d8b] transition">
                                    Гарантия
                                </Link>
                            </li>
                            <li>
                                <Link href={'/catalogues'} className="text-primary text-sm hover:text-[#d02d8b] transition">
                                    Каталоги
                                </Link>
                            </li>
                            <li>
                                <Link href={'/tips'} className="text-primary text-sm hover:text-[#d02d8b] transition">
                                    Советы и идеи
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-2">
                            <li>
                                <Link href={'/contacts'} className="text-primary mb-3 font-medium hover:text-[#d02d8b] transition">Магазины</Link>
                            </li>
                            <li>
                                <Link href={'/collections/category'} className="text-primary mb-3 font-medium hover:text-[#d02d8b] transition">Сеты</Link>
                            </li>
                            <li>
                                <Link href={'/category'} className="text-primary mb-3 font-medium hover:text-[#d02d8b] transition">Категории</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </footer>
    )
}
