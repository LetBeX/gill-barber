import { Link } from 'react-router-dom';
import { mockData } from '../data/mockData';

const ServicesPage = () => {
    const { categories, items } = mockData.services;

    return (
        <div className="w-full">
            {/* Header / Hero */}
            <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-20 py-12">
                <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-black leading-tight tracking-[-0.033em] mb-4 dark:text-white">Our Services</h1>
                        <p className="text-muted dark:text-[#b8a878] text-lg font-normal max-w-md">
                            Expert care for every man's unique style. Premium barbering tailored to your personality and lifestyle.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-sm">filter_list</span>
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e8dfc8] dark:bg-[#252015] text-charcoal dark:text-white font-bold text-sm hover:bg-opacity-80 transition-colors">
                            View Specials
                        </button>
                    </div>
                </div>

                {/* Sticky Sub-Nav Categories */}
                <div className="sticky top-[72px] z-40 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md py-4 border-b border-[#d4c6a8] dark:border-[#2a2010] mb-12 overflow-x-auto no-scrollbar">
                    <div className="flex gap-10 whitespace-nowrap min-w-max">
                        {categories.map((cat, index) => (
                            <a key={cat.id} className="flex flex-col items-center group cursor-pointer" href={`#${cat.id}`}>
                                <p className={`text-sm font-bold pb-2 border-b-2 transition-all ${index === 0 ? 'text-primary border-primary' : 'text-muted dark:text-[#b8a878] border-transparent group-hover:border-primary group-hover:text-primary'}`}>
                                    {cat.name}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Service Categories Loop */}
                {Object.entries(items).map(([key, serviceList]) => {
                     const categoryName = categories.find(c => c.id === key)?.name;
                     return (
                        <section key={key} id={key} className="mb-16 scroll-mt-32">
                             <div className="flex items-center gap-4 mb-8">
                                <span className="material-symbols-outlined text-[#C0392B] text-3xl">
                                    {key === 'hair' ? 'content_cut' : key === 'beard' ? 'face' : key === 'skincare' ? 'spa' : 'auto_awesome'}
                                </span>
                                <h2 className="text-3xl font-bold tracking-tight dark:text-white">{categoryName}</h2>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {serviceList.map((service, idx) => (
                                    <div key={idx} className="bg-white dark:bg-[#1e1a10] p-5 rounded-xl shadow-sm hover:shadow-xl transition-shadow flex flex-col gap-4 border border-[#e8dfc8] dark:border-[#2a2010]">
                                        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url("${service.image}")` }}></div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold dark:text-white">{service.title}</h3>
                                                <p className="text-muted dark:text-[#b8a878] text-sm mt-1">{service.description}</p>
                                            </div>
                                            <span className="text-primary font-bold text-lg">{service.price}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-auto">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            <span>{service.duration}</span>
                                        </div>
                                        <Link to="/booking" className="w-full py-2 bg-[#C0392B]/5 hover:bg-[#C0392B]/10 text-[#C0392B] text-sm font-bold rounded-lg transition-colors text-center">
                                            Book Now
                                        </Link>
                                    </div>
                                ))}
                             </div>
                        </section>
                     );
                })}
            </div>
             {/* Mobile Floating Action */}
             <Link to="/booking" className="fixed bottom-8 right-8 size-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 md:hidden">
                <span className="material-symbols-outlined">calendar_month</span>
            </Link>
        </div>
    );
};

export default ServicesPage;
