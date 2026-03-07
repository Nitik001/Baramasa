/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                parchment: "#F9F6F0",
                terracotta: "#C25934",
                olive: "#4A5D23",
                gold: "#C5A059",
                charcoal: "#1A1A1A"
            },
            fontFamily: {
                heritage: ['"Cormorant Garamond"', 'serif'],
                modern: ['"Outfit"', 'sans-serif'],
                display: ['"Playfair Display"', 'serif'],
            }
        },
    },
    plugins: [],
}
