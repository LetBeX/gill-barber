export const mockData = {
    navigation: [
        { name: 'Services', href: '/services' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/booking' }, // Mapping Contact to Booking for this demo
    ],
    landing: {
        hero: {
            title: "Elevate Your Look, Define Your Style",
            subtitle: "Experience premium barbering and grooming services tailored for the modern man in a sanctuary of craftsmanship.",
            image: "/assets/hero-section.jpeg"
        },
        featuredServices: [
            {
                title: "Haircut",
                description: "Professional precision haircut tailored to your style.",
                icon: "content_cut",
                linkText: "Book Now",
                price: "$25",
                image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Shave",
                description: "Classic hot towel shave with straight razor precision.",
                icon: "face_6",
                linkText: "Book Now",
                price: "$15",
                image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Face mask",
                description: "Rejuvenating skin treatment for a fresh look.",
                icon: "spa",
                linkText: "Book Now",
                price: "$50",
                image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=800"
            }
        ],
        galleryPreview: [
            "/assets/1.jpeg",
            "/assets/2.jpeg",
            "/assets/3.jpeg",
            "/assets/4.jpeg",
            "/assets/5.jpeg"
        ],
        testimonial: {
            text: "The most sophisticated grooming experience I've had. The attention to detail in both the service and the atmosphere is unmatched.",
            author: "Alex Richardson",
            role: "⭐ 4.9 (277 reviews) · Google"
        },
        reviews: [
            {
                name: "Malcolm Dsouza",
                meta: "8 reviews · 4 photos",
                time: "2 weeks ago",
                rating: 5,
                text: "Raja did an amazing job with my haircut — exactly what I was hoping for. He's skilled, attentive, and really takes the time to understand what you want. One of the best salon experiences I've had. Highly recommend asking for Raja!",
                ownerReply: "Thanks bro"
            },
            {
                name: "Vishal Kumar",
                meta: "Local Guide · 24 reviews · 14 photos",
                time: "1 week ago",
                rating: 5,
                text: "Had an amazing experience getting hair cut by Raja, he is professional and patient, he already knew what kind of hair cut would suit me and did a perfect job",
                ownerReply: null
            },
            {
                name: "Sudikshan Gupta",
                meta: "8 reviews",
                time: "1 week ago",
                rating: 5,
                text: "Raja bai did an amazing job clean fade and beard highly recommend 🔥",
                ownerReply: null
            },
            {
                name: "AJAIB SINGH",
                meta: "5 reviews",
                time: "2 months ago",
                rating: 5,
                text: "Raman is great hair stylist. He is good man with good behaviour and simplicity.",
                ownerReply: null
            },
            {
                name: "Aman Sukh786",
                meta: "7 reviews · 1 photo",
                time: "a month ago",
                rating: 5,
                text: "Raman nice haircut 👍 and very good cutting everyone people gud and nice guy 👍👍",
                ownerReply: null
            },
            {
                name: "Ishaan Garg",
                meta: "10 reviews · 1 photo",
                time: "7 months ago",
                rating: 5,
                text: "Bro, miss those Punjab-style haircuts from back home? No need to miss it now — Gill Barber here in Canada cutting exactly like old Indian style. Perfect fades, champi, full care. Come try it once — you'll feel like you're back in the pind! 💈🇮🇳",
                ownerReply: null
            },
            {
                name: "ABHISHEK PANDIT",
                meta: "6 reviews",
                time: "10 months ago",
                rating: 5,
                text: "Had an amazing experience at Gill Shop 5911. Hair cut by Mohit. The haircut and beard trim were done with precision and care. The barber was professional, skilled, and understood exactly what I wanted. Highly recommend for anyone looking for a fresh, stylish look!",
                ownerReply: null
            },
            {
                name: "Harbir Singh",
                meta: "Local Guide · 18 reviews",
                time: "9 months ago",
                rating: 5,
                text: "Great service by Deep. He takes his time and focuses on the quality of the cut and fade. He does an amazing job on beard as well. Also friendly environment and amazing prices.",
                ownerReply: "😊💕"
            },
            {
                name: "Bhavya Patel",
                meta: "8 reviews",
                time: "10 months ago",
                rating: 5,
                text: "Chamkor singh, Really really great job. I got great work. And I would really appreciate it. THANK YOU SO MUCH FOR MAKE MY COLLEGE FIRST DAY SO SPECIAL 😀😀",
                ownerReply: null
            },
            {
                name: "Kamalpreet Singh",
                meta: "9 reviews",
                time: "7 months ago",
                rating: 2,
                text: "I was a regular customer of this shop and recently had a pathetic experience and unprofessionalism. Very bad customer service, they don't know how to talk with customers. Went for a kids haircut and it was disappointing.",
                ownerReply: null
            }
        ]
    },
    services: {
        categories: [
            { id: 'all', name: 'All Services' }
        ],
        items: {
            all: [
                {
                    title: "Haircut",
                    description: "Professional precision haircut tailored to your style.",
                    price: "$25",
                    duration: "30 mins",
                    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800"
                },
                {
                    title: "Shave",
                    description: "Classic hot towel shave with straight razor precision.",
                    price: "$15",
                    duration: "20 mins",
                    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800"
                },
                {
                    title: "Face mask",
                    description: "Rejuvenating skin treatment for a fresh look.",
                    price: "$50",
                    duration: "30 mins",
                    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=800"
                }
            ]
        }
    },
    about: {
        hero: {
            title: "Crafted for the Modern Icon.",
            subtitle: "Modern Icon.",
            description1: "Founded in 2014, Gill Barber was born from a simple vision: to redefine barbering as an art form rather than a routine. We believe that true style lies in the details—the precision of a cut, the shape of a beard, and the feeling of absolute confidence.",
            description2: "Our shop is designed to be a sanctuary from the urban rush, where craftsmanship meets contemporary luxury for the modern man.",
            heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZVrZMVqDC4zFdz60z_vyF_vu9Frh3jKqe3G6KAJZn-lOuuKtxeD04PvPzyoPhaI8dQiLnUnXPubS_oLY-G8WByoJUL4C60efzn9YQv0tWJEj-qAZNnswqgjhgONy-Luqd4Nkw-ONRo0s23Zc6GuxfWeTL_8STlKKJOyc7-NxtecbFuKJGapVyz3RWXU76OQh8dhXecu261LHONYEq6ruIOrrpvIVFZe4WYdWP62G0sVzjLcBKdX3ErhwS4gUPW9AT8DplTuNZYFkg"
        },
        team: [
            { name: "James Wilson", role: "Master Barber", bio: "Expert in precision fades and classic gentleman grooming.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA9831vvyIlflzDKjJpH5laPWodHYEyW8F_gncJhNLXRDurs4vWOA1rEZcxPaKoVtjwH_pFBt2cktQ1li1RrlEEN5aiHcXWbMuPnuhdnXOoaUYRTdZO4sFEkFArSgcIddVmsZv-K-3SioQZXSsX_Y6cIz5EEDAOqwbEwckxvmoPCOmPdW2ZQhgTTC8UnMMahvitvh8rn7IlNpjNfZA3VMMgUsYskGdugkh1zt8TH7xy1h0fKue7HF6PP9xTotseI7dC84GCWdLDAPm" },
            { name: "Marcus Chen", role: "Senior Stylist", bio: "Specializes in modern cuts, textured looks, and creative men's styling.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDnIi4K1Uiu_FHe73x29yE37zWlXR5jEFHAqWyFmL8ZUh5Fb2EboOOhbJ3yBs2569-qI5_i6HUmpYWJq9GOUOxdIB-QttBLpd2BE9wWcjn8auJ87i2Zc2BM7bNSwqCZcEnypmzxLD20jn3LHdfOmZKaRO7oqh9dJF69HH_fmKVsscHrDTHGFdEDJYHx-9-gERdC3xmCFQKxACeuV_ew8mtnrmv6zaOV3nCEc4n3-TGXU1DDfbC85TGV_sps9YQnPYRMCuY9cNE_ikN" },
            { name: "Alex Rivera", role: "Beard Sculptor", bio: "Master of beard shaping, hot towel shaves, and straight razor techniques.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnZzclKuJFxV3IHHn1nA6Q9vyqPdq71if4ffyQPJ_9EPhL3hIJ9PUHDdzAslMTcU9vFJLYsJdnXeEzQgf5F-jniVnYTD_0LmCDUCF_WD8ElaY1FFC3GyqAYfyp3bOvyqZVrt86gMAW0FsnJqgFDa0ynVLVua6R4N1rFrumRsmr3kDDLyIsrFUOco72JquRKW0-UlAvZlseOQ4HXB2WS6a6pa57y8j0Zrq2WbksjXbllNUGGmZ5xbKbPj7CtGGMNmMIT1zTBQYwVazg" },
            { name: "Ryan Patel", role: "Fade Specialist", bio: "Known for flawless skin fades, drop fades, and razor-sharp lineups.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA9831vvyIlflzDKjJpH5laPWodHYEyW8F_gncJhNLXRDurs4vWOA1rEZcxPaKoVtjwH_pFBt2cktQ1li1RrlEEN5aiHcXWbMuPnuhdnXOoaUYRTdZO4sFEkFArSgcIddVmsZv-K-3SioQZXSsX_Y6cIz5EEDAOqwbEwckxvmoPCOmPdW2ZQhgTTC8UnMMahvitvh8rn7IlNpjNfZA3VMMgUsYskGdugkh1zt8TH7xy1h0fKue7HF6PP9xTotseI7dC84GCWdLDAPm" }
        ],
        features: [
            { title: "Expert Stylists", description: "Our team undergoes continuous education to stay at the forefront of global hair trends and techniques.", icon: "content_cut" },
            { title: "Premium Products", description: "We exclusively use sulfate-free, botanical-rich, and high-performance products that nourish your hair and skin.", icon: "eco" },
            { title: "Relaxing Ambiance", description: "Enjoy curated playlists, signature espresso, and a calm environment designed for your total relaxation.", icon: "spa" }
        ]
    },
    gallery: [
        { title: "Classic Taper Fade", category: "Haircut", image: "/assets/1.jpeg" },
        { title: "Modern Textured Quiff", category: "Styling", image: "/assets/2.jpeg" },
        { title: "Clean Fade & Beard", category: "Grooming", image: "/assets/3.jpeg" },
        { title: "Precision Beard Sculpt", category: "Grooming", image: "/assets/4.jpeg" },
        { title: "Sharp Lineup", category: "Haircut", image: "/assets/5.jpeg" },
        { title: "Skin Fade Finish", category: "Haircut", image: "/assets/6.jpeg" },
        { title: "Textured Crop", category: "Styling", image: "/assets/7.jpeg" },
        { title: "Drop Fade", category: "Haircut", image: "/assets/8.jpeg" },
        { title: "Punjab-Style Cut", category: "Styling", image: "/assets/9.jpeg" },
        { title: "Fresh Fade & Lineup", category: "Grooming", image: "/assets/10.jpeg" }
    ],
    bookings: []
};