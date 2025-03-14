
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				pixel: {
					green: '#5DFC9A',
					blue: '#38B5FF',
					purple: '#9C5FFF',
					pink: '#FF6AC2',
					yellow: '#FFDE59',
					orange: '#FF914D',
					red: '#FF5757',
					dark: '#191D3A',
					darkBlue: '#242B54',
					darkPurple: '#2E1E48',
					light: '#F5F7FA',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				pixel: ['"Press Start 2P"', 'cursive'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			boxShadow: {
				'pixel': '4px 4px 0px 0px rgba(0,0,0,0.2)',
				'pixel-md': '6px 6px 0px 0px rgba(0,0,0,0.2)',
				'pixel-lg': '8px 8px 0px 0px rgba(0,0,0,0.2)',
				'pixel-xl': '12px 12px 0px 0px rgba(0,0,0,0.2)',
				'pixel-2xl': '16px 16px 0px 0px rgba(0,0,0,0.2)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'pixel-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'12.5%': { transform: 'rotate(45deg)' },
					'25%': { transform: 'rotate(90deg)' },
					'37.5%': { transform: 'rotate(135deg)' },
					'50%': { transform: 'rotate(180deg)' },
					'62.5%': { transform: 'rotate(225deg)' },
					'75%': { transform: 'rotate(270deg)' },
					'87.5%': { transform: 'rotate(315deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'glitch-1': {
					'0%, 100%': { transform: 'none', opacity: '1' },
					'7%': { transform: 'skew(-0.5deg, -0.9deg)', opacity: '0.75' },
					'10%': { transform: 'none', opacity: '1' },
					'27%': { transform: 'none', opacity: '1' },
					'30%': { transform: 'skew(0.8deg, -0.1deg)', opacity: '0.75' },
					'35%': { transform: 'none', opacity: '1' },
					'52%': { transform: 'none', opacity: '1' },
					'55%': { transform: 'skew(-1deg, 0.2deg)', opacity: '0.75' },
					'50%': { transform: 'none', opacity: '1' },
					'72%': { transform: 'none', opacity: '1' },
					'75%': { transform: 'skew(0.4deg, 1deg)', opacity: '0.75' },
					'80%': { transform: 'none', opacity: '1' },
					'100%': { transform: 'none', opacity: '1' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse': 'pulse 2s ease-in-out infinite',
				'blink': 'blink 1s step-end infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'pixel-spin': 'pixel-spin 2s steps(8) infinite',
				'slide-in': 'slide-in 0.5s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'glitch-1': 'glitch-1 3s infinite',
			},
			backgroundImage: {
				'grid-pattern': 'linear-gradient(to right, rgba(100, 100, 100, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 100, 100, 0.1) 1px, transparent 1px)',
				'pixel-grid': 'linear-gradient(to right, rgba(100, 100, 100, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 100, 100, 0.05) 1px, transparent 1px)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
