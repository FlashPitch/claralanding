/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"**/*.{html, jsx, js}",
		"**/*.js",
		"**/*.html",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Palette de marque couvreur
				slate: {
					dark: '#1e293b',
					950: '#0f172a',
				},
				terracotta: {
					DEFAULT: '#dc6b4a',
					light: '#e68968',
					dark: '#c85838',
				},
				beige: {
					natural: '#f5f1e8',
					light: '#faf8f3',
				},
				gold: {
					accent: '#d4af37',
					light: '#e0c460',
				},
			},
			fontFamily: {
				poly: ['"poly"', "serif"],
				heading: ['"Inter"', 'sans-serif'],
				body: ['"Crimson Text"', 'serif'],
			},
			backgroundImage: {
				'hero-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556 15.858 12.14 28 0zm5.656 0L50.142 12.485 48.728 13.9 35.828 0h1.828zm-11.312 0L13.857 12.485 15.272 13.9 28.172 0h-1.828z\" fill=\"%231e293b\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'fade-in-up': 'fadeInUp 0.6s ease-out',
				'slide-in': 'slideIn 0.4s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideIn: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
		},
	},
	plugins: [
		function({ addVariant }) {
			addVariant('firefox', ':-moz-any(&)')
		}
	],
}

