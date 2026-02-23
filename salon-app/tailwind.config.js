/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                /* ── Hero-matched palette ── */
                "primary": "#C0392B", // bold crimson red (DEEP 5911 sign)
                "primary-dark": "#992d22", // deeper crimson for hover states
                "accent": "#C9A227", // rich gold (barber chair accents)
                "charcoal": "#1C1C1C", // near-black (signage, cabinets)
                "background-light": "#F5F0E8", // warm off-white (shop wall)
                "background-dark": "#111111", // deep charcoal black
                "surface-light": "#FFFFFF",
                "surface-dark": "#1E1E1E",
                "muted": "#8a7a65", // warm taupe for secondary text
            },
            fontFamily: {
                "sans": ["Work Sans", "sans-serif"],
                "serif": ["Playfair Display", "serif"]
            },
        },
    },
    plugins: [],
}
