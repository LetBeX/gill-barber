import { Link } from 'react-router-dom';
import { mockData } from '../data/mockData';

const GalleryPage = () => {
    const { gallery } = mockData;

    return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 dark:text-white">Artistry in Every Detail</h1>
                <p className="text-base opacity-70 max-w-2xl mx-auto dark:text-[#b8a878]">
                    Explore our curated collection of premium transformations, from precision haircuts to revitalizing skincare treatments.
                </p>
            </div>



            {/* Gallery Grid — uniform 3-col, natural image ratio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-xl bg-white dark:bg-[#252015] shadow-sm">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <span className="text-[#C0392B] font-bold text-xs tracking-widest uppercase mb-1">{item.category}</span>
                            <h3 className="text-white text-xl font-bold mb-3">{item.title}</h3>
                            <div className="flex items-center text-white/80 text-sm gap-2">
                                <span>View Project</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Experience Transformation CTA */}
            <div className="mt-24 bg-charcoal dark:bg-[#C0392B]/10 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C0392B]/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C0392B]/10 blur-[100px] rounded-full" />
                <div className="relative z-10">
                    <h2 className="text-white text-3xl md:text-5xl font-black mb-6">Experience the Transformation</h2>
                    <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
                        Ready for a change? Join us at Gill Barber for a premium barbering session tailored to your unique style.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/booking" className="w-full sm:w-auto min-w-[200px] flex items-center justify-center h-14 bg-[#C0392B] text-white font-bold rounded-xl transition-all hover:bg-[#992d22] hover:shadow-lg hover:shadow-[#C0392B]/30">
                            Book Appointment
                        </Link>
                        <Link to="/services" className="w-full sm:w-auto min-w-[200px] flex items-center justify-center h-14 bg-white/10 text-white font-bold rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
                            View Pricing
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;
