/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/**/*.html', './src/**/*.js'],
    content: ['./dist/*.html'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                darkBlue: 'hsl(217, 28%, 15%)',
                darkBlue1: 'hsl(219, 43%, 28%)',
                darkBlue2: 'hsl(216, 53%, 9%)',
                darkBlue3: 'hsl(219, 30%, 18%)',
                accentCyan: 'hsl(176, 68%, 64%)',
                accentBlue: 'hsl(198, 60%, 50%)',
                lightRed: 'hsl(0, 100%, 63%)',
            },
            fontFamily: {
                sans: ['Raleway', 'sans-serif'],
                opensans: ['Open Sans', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {
            backgroundImage: ['dark'],
        },
    },
    plugins: [],
};
