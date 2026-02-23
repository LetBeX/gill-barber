import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { mockData } from '../data/mockData';

const Layout = () => {
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            {/* Sticky Header */}
            <header className="sticky-nav relative w-full px-6 md:px-20 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div style={{color:'#C0392B'}}>
                            <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                        </div>
                        <h2 className="text-charcoal dark:text-white text-xl font-black tracking-tighter uppercase">GILL BARBER</h2>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-10">
                    {mockData.navigation.map((item) => (
                        <Link 
                            key={item.name} 
                            to={item.href}
                            className={`text-sm font-semibold transition-colors ${pathname === item.href ? 'text-[#C0392B]' : 'text-charcoal hover:text-[#C0392B]'}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <Link to="/admin/login" className="hidden sm:flex items-center justify-center rounded-lg border border-[#C0392B] px-4 py-2 text-sm font-bold text-[#C0392B] hover:bg-[#C0392B] hover:text-white transition-all">
                        Admin
                    </Link>
                    <Link to="/booking" className="hidden sm:flex items-center justify-center rounded-lg bg-[#C0392B] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#992d22] transition-all shadow-lg shadow-[#C0392B]/20">
                        Book Now
                    </Link>
                    <button 
                        className="md:hidden text-charcoal dark:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="material-symbols-outlined">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 w-full bg-white dark:bg-charcoal border-t border-[#e8dfc8] dark:border-[#2a2010] shadow-lg z-50 py-4 px-6 flex flex-col gap-4 md:hidden">
                            {mockData.navigation.map((item) => (
                                <Link 
                                    key={item.name} 
                                    to={item.href}
                                    className={`text-sm font-semibold transition-colors py-2 ${pathname === item.href ? 'text-[#C0392B]' : 'text-charcoal dark:text-white hover:text-[#C0392B]'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link 
                                to="/admin/login" 
                                className="flex items-center justify-center rounded-lg border border-[#C0392B] px-6 py-2.5 text-sm font-bold text-[#C0392B] hover:bg-[#C0392B] hover:text-white transition-all w-full"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin
                            </Link>
                            <Link 
                                to="/booking" 
                                className="flex items-center justify-center rounded-lg bg-[#C0392B] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#992d22] transition-all shadow-lg shadow-[#C0392B]/20 w-full"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Book Now
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-charcoal border-t border-[#2a2010] pt-16 pb-8 px-6 md:px-20">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Branding */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div style={{color:'#C0392B'}}>
                                <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                            </div>
                            <h2 className="text-white text-lg font-black tracking-tighter uppercase">GILL BARBER</h2>
                        </div>
                        <p className="text-sm text-[#b8a878] mb-6">
                            Join our crew for exclusive offers and barbering tips.
                        </p>
                        <div className="flex">
                            <input className="bg-[#252015] border-none rounded-l-lg px-4 py-2 text-sm w-full text-white focus:ring-1 focus:ring-primary outline-none placeholder:text-[#8a7a65]" placeholder="Your email" type="email"/>
                            <button className="bg-[#C0392B] text-white px-4 py-2 rounded-r-lg hover:bg-[#992d22] transition">
                                <span className="material-symbols-outlined text-sm">send</span>
                            </button>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-4 text-sm font-medium text-[#b8a878]">
                            <li><Link className="hover:text-[#C0392B] transition-colors" to="/booking">Booking</Link></li>
                            <li><Link className="hover:text-[#C0392B] transition-colors" to="/services">Services</Link></li>
                            <li><Link className="hover:text-[#C0392B] transition-colors" to="/about">About Us</Link></li>
                            <li><Link className="hover:text-[#C0392B] transition-colors" to="/gallery">Gallery</Link></li>
                        </ul>
                    </div>
                    {/* Hours */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Hours</h4>
                        <ul className="space-y-4 text-sm font-medium text-[#b8a878]">
                            <li className="flex justify-between w-48"><span>Mon - Fri</span> <span>9am - 9pm</span></li>
                             <li className="flex justify-between w-48"><span>Saturday</span> <span>9am - 8pm</span></li>
                             <li className="flex justify-between w-48"><span>Sunday</span> <span>9am - 7pm</span></li>
                        </ul>
                    </div>
                    {/* Location */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Location</h4>
                         <p className="text-sm font-medium text-[#b8a878] mb-4">
                             7215 Goreway Dr #1c17<br/>Mississauga, ON L4T 0B4
                         </p>
                         <p className="text-sm font-bold text-[#C0392B] mb-4">+1 647-679-9829</p>
                        <div className="flex gap-4">
                            <a className="size-8 rounded-full bg-[#C0392B]/10 flex items-center justify-center text-[#C0392B] hover:bg-[#C0392B] hover:text-white transition-all" href="#">
                                <span className="material-symbols-outlined text-sm">share</span>
                            </a>
                            <a className="size-8 rounded-full bg-[#C0392B]/10 flex items-center justify-center text-[#C0392B] hover:bg-[#C0392B] hover:text-white transition-all" href="#">
                                <span className="material-symbols-outlined text-sm">camera_alt</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1200px] mx-auto pt-8 border-t border-[#2a2010] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-[#8a7a65]">
                    <p>© 2024 GILL BARBER. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a className="hover:underline" href="#">Privacy Policy</a>
                        <a className="hover:underline" href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
