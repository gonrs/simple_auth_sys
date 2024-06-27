import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			components: '/src/components',
			ui: '/src/ui',
			routes: '/src/routes',
			store: '/src/store',
			modules: '/src/modules',
			utils: '/src/helpers',
		},
		extensions: ['.ts', '.tsx', '.json'],
	},
})