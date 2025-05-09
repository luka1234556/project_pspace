import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
/*the base uses paths for github and for vercel 
If you're deploying to GitHub Pages → base is /project_pspace/
If you're deploying to Vercel → base is /
Vercel sets VERCEL=1 in its environment automatically.
*/
  base: process.env.NODE_ENV === 'production' && process.env.VERCEL !== '1'
  ? '/project_pspace/'
  : '/', 
  plugins: [react()],
});
