import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'child_process';
import { cpSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

execSync('npx tsc -b --pretty false', { stdio: 'inherit' });

await build({
  configFile: false,
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist', emptyOutDir: true },
});

// Copy PHP backend files into dist/ so they are served alongside the React app on cPanel
const serverDir = resolve(__dirname, 'server');
const distDir = resolve(__dirname, 'dist');

// Copy send_email.php
cpSync(resolve(serverDir, 'send_email.php'), resolve(distDir, 'send_email.php'));

// Copy vendor/ (PHPMailer)
const vendorSrc = resolve(serverDir, 'vendor');
if (existsSync(vendorSrc)) {
  cpSync(vendorSrc, resolve(distDir, 'vendor'), { recursive: true });
}

// Copy .env from src/pages/ (where SMTP credentials live)
const envSrc = resolve(__dirname, 'src', 'pages', '.env');
if (existsSync(envSrc)) {
  cpSync(envSrc, resolve(distDir, '.env'));
}

console.log('Build complete. PHP backend files copied to dist/.');
