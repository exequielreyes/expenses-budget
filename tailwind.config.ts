import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			'custom-black': '#1E1E1E',
  			'custom-gray': '#717171',
  			'custom-green': '#089981',
  			'custom-red': '#F23645',
  			'custom-yellow': '#F6A000',
  			'custom-light-gray': '#ADADAD',
  			'custom-dark-gray': '#434343'
  		},
  		gridTemplateColumns: {
  			'19': 'repeat(19, minmax(0, 1fr))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    'text-custom-green',
    'text-custom-yellow',
    'text-custom-red',
  ],
};
export default config;
