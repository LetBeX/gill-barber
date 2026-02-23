import { Link } from 'react-router-dom';
import { mockData } from '../data/mockData';

const AboutPage = () => {
    const { hero, team, features } = mockData.about;

    return (
        <div className="w-full">
            {/* Hero Section: Our Heritage */}
            <section className="relative px-6 md:px-20 lg:px-40 py-16 md:py-24">
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                <div className="absolute bottom-10 left-10">
                    <h1 className="text-5xl font-black text-white">About Us</h1>
                    <div className="w-20 h-1.5 bg-[#C0392B] mt-4"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1 flex flex-col gap-8">
                        <div className="space-y-4">
                            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Our Heritage</span>
                            <h1 className="font-serif text-5xl md:text-7xl font-black leading-tight dark:text-white">
                                Crafted for the <br/><span className="italic text-primary">Modern Icon.</span>
                            </h1>
                            <p className="text-lg leading-relaxed text-[#6b5c44] dark:text-[#b8a878] max-w-xl">
                                {hero.description1}
                            </p>
                            <p className="text-lg leading-relaxed text-[#6b5c44] dark:text-[#b8a878] max-w-xl">
                                {hero.description2}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/services" className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity inline-block text-center">
                                View Our Services
                            </Link>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-primary/10 rounded-xl -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
                            <div className="relative h-[500px] w-full bg-center bg-cover rounded-xl shadow-2xl" style={{ backgroundImage: `url("${hero.heroImage}")` }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="bg-white dark:bg-[#181510] px-6 md:px-20 lg:px-40 py-20">
                <div className="text-center mb-16 space-y-2">
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">The Artisans</span>
                    <h2 className="font-serif text-4xl font-bold dark:text-white">Master Minds Behind the Magic</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {team.map((member, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-primary rounded-full scale-0 group-hover:scale-105 transition-transform duration-300 opacity-20"></div>
                                <div className="size-40 md:size-48 rounded-full border-4 border-background-light dark:border-[#2a2010] overflow-hidden bg-center bg-cover shadow-lg" style={{ backgroundImage: `url("${member.image}")` }}></div>
                            </div>
                            <h3 className="text-xl font-bold dark:text-white">{member.name}</h3>
                            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">{member.role}</p>
                            <p className="text-xs text-muted dark:text-[#b8a878] max-w-[150px]">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="px-6 md:px-20 lg:px-40 py-20 bg-background-light dark:bg-background-dark">
                <div className="flex flex-col md:flex-row gap-12 justify-between">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col gap-4 max-w-sm">
                            <div className="bg-primary/10 dark:bg-primary/20 size-14 rounded-xl flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                            </div>
                            <h4 className="text-xl font-bold dark:text-white">{feature.title}</h4>
                            <p className="text-[#6b5c44] dark:text-[#b8a878] leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

             {/* Final CTA */}
             <section className="px-6 md:px-20 lg:px-40 py-20">
                <div className="relative w-full overflow-hidden rounded-3xl bg-background-dark p-12 md:p-24 text-center">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <h2 className="text-4xl font-black text-white mb-6">Ready for your transformation?</h2>
                        <p className="text-[#b8a878] text-lg max-w-lg">
                            Experience the pinnacle of men's grooming. Book your seat at the barber shop.
                        </p>
                        <Link to="/booking" className="inline-block mt-8 bg-[#C0392B] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#992d22] transition-colors">
                            Book Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
