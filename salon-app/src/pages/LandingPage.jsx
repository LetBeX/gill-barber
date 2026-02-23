import { Link } from 'react-router-dom';
import { mockData } from '../data/mockData';
import { useEffect, useState } from 'react';

/* ── Auto-rotating testimonial carousel ─────────────────────────── */
const TestimonialCarousel = ({ reviews }) => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrent(prev => (prev + 1) % reviews.length);
                setFade(true);
            }, 350);
        }, 3000);
        return () => clearInterval(timer);
    }, [paused, reviews.length]);

    const go = (i) => {
        setFade(false);
        setTimeout(() => { setCurrent(i); setFade(true); }, 350);
    };

    const review = reviews[current];

    return (
        <div
            className="max-w-[760px] mx-auto text-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
                {[1,2,3,4,5].map(s => (
                    <span
                        key={s}
                        className="material-symbols-outlined text-2xl"
                        style={{
                            color: s <= review.rating ? '#f59e0b' : '#d1d5db',
                            fontVariationSettings: "'FILL' 1"
                        }}
                    >star</span>
                ))}
            </div>

            {/* Quote */}
            <blockquote
                className="text-xl md:text-2xl font-medium italic leading-relaxed mb-8 dark:text-white transition-opacity duration-300"
                style={{ opacity: fade ? 1 : 0 }}
            >
                "{review.text}"
            </blockquote>

            {/* Author */}
            <cite
                className="not-italic block transition-opacity duration-300"
                style={{ opacity: fade ? 1 : 0 }}
            >
                <span className="font-bold block text-base dark:text-white">{review.name}</span>
                <span className="text-muted dark:text-[#b8a878] text-xs uppercase tracking-widest font-bold">
                    ⭐ Google Review · {review.time}
                </span>
            </cite>

            {/* Dot nav */}
            <div className="flex justify-center gap-2 mt-8">
                {reviews.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => go(i)}
                        aria-label={`Review ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                            i === current
                                ? 'bg-primary w-6 h-2'
                                : 'bg-[#d4c090] dark:bg-[#4a3a10] w-2 h-2'
                        }`}
                    />
                ))}
            </div>

            {/* Google CTA */}
            <div className="mt-6">
                <a
                    href="https://maps.google.com/?q=Gill+Barber+7215+Goreway+Dr+Mississauga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-muted dark:text-[#b8a878] hover:text-primary dark:hover:text-primary transition-colors"
                >
                    <span>See all 277 reviews on Google</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
            </div>
        </div>
    );
};

/* ── Page ────────────────────────────────────────────────────────── */
const LandingPage = () => {
    const { hero, featuredServices, galleryPreview, reviews } = mockData.landing;

    return (
        <div className="w-full">

            {/* Hero */}
            <section className="px-4 md:px-10 py-6">
                <div className="relative w-full rounded-xl overflow-hidden">
                    {/* Image at natural ratio */}
                    <img
                        className="w-full h-auto block"
                        src={hero.image}
                        alt={hero.title}
                    />
                    {/* Gradient overlay + text pinned to bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-[#1C1C1C]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10 max-w-2xl">
                        <span className="inline-block bg-primary/20 backdrop-blur-md border border-primary/30 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                            Premium Men's Barber Experience
                        </span>
                        <h1
                            className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6"
                            dangerouslySetInnerHTML={{
                                __html: hero.title
                                    .replace(',', ', <br/>')
                                    .replace('Define Your Style', '<span style="color:#C0392B">Define Your Style</span>')
                            }}
                        />
                        <p className="text-white/80 text-lg md:text-xl font-medium mb-8 max-w-lg">
                            {hero.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/booking" className="rounded-lg bg-[#C0392B] px-10 py-4 text-base font-bold text-white hover:scale-105 transition-transform text-center shadow-lg shadow-[#C0392B]/20">
                                Book Appointment
                            </Link>
                            <Link to="/services" className="rounded-lg bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 text-base font-bold text-white hover:bg-white/20 transition-all text-center">
                                View Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Services */}
            <section className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h3 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">What we do</h3>
                        <h2 className="text-3xl md:text-4xl font-black dark:text-white">Our Featured Services</h2>
                    </div>
                    <p className="text-muted dark:text-[#b8a878] max-w-md">
                        Meticulously crafted treatments designed to rejuvenate your appearance and confidence.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredServices.map((service, index) => (
                        <div key={index} className="group flex flex-col bg-white dark:bg-[#1e1a10] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e8dfc8] dark:border-[#2a2010]">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={service.image} alt={service.title} />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#C0392B] dark:text-white border border-[#C0392B]/20">
                                    {service.price}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-xl font-bold dark:text-white">{service.title}</h4>
                                    <span className="material-symbols-outlined text-[#C0392B]">{service.icon}</span>
                                </div>
                                <p className="text-sm text-muted dark:text-[#b8a878] leading-relaxed mb-4">
                                    {service.description}
                                </p>
                                <Link to="/services" className="text-sm font-bold text-[#C0392B] flex items-center gap-2 group/link">
                                    {service.linkText}
                                    <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Style Gallery Preview */}
            <section className="bg-white dark:bg-[#181510] py-20 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 mb-12 flex items-center justify-between">
                    <h2 className="text-3xl font-black dark:text-white">The Style Gallery</h2>
                    <Link to="/gallery" className="text-sm font-bold text-primary hover:underline">View All Gallery</Link>
                </div>
                <div className="flex gap-4 overflow-x-auto px-6 pb-6 no-scrollbar">
                    {galleryPreview.map((url, index) => (
                        <Link to="/gallery" key={index} className="min-w-[300px] h-[400px] rounded-lg overflow-hidden flex-shrink-0 hover:opacity-90 transition-opacity">
                            <img className="w-full h-full object-cover" src={url} alt={`Gallery preview ${index + 1}`} />
                        </Link>
                    ))}
                </div>
            </section>

            {/* Testimonials — auto-rotating Google reviews */}
            <section className="py-20 px-6">
                <TestimonialCarousel reviews={reviews} />
            </section>

        </div>
    );
};

export default LandingPage;
