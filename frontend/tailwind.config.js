/** @type {import("tailwindcss").Config} */
module.exports = {
    mode: 'jit',
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            transitionProperty: {
                'height': 'height',
            }
        }
    },
    plugins: []
};
