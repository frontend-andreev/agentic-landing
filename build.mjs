// build.mjs
import esbuild from 'esbuild';
import { exec } from 'child_process';

// Функция для асинхронного выполнения команд
const run = (cmd) => new Promise((resolve, reject) => {
  const p = exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      reject(err);
    } else {
      console.log(stdout);
      resolve();
    }
  });
  p.stdout.pipe(process.stdout);
  p.stderr.pipe(process.stderr);
});

console.log('Starting build process...');

try {
  // Шаг 1: Сборка фронтенда с помощью Vite
  console.log('Building client with Vite...');
  await run('vite build');

  // Шаг 2: Сборка бэкенда с помощью esbuild API
  console.log('Building server with esbuild...');
  await esbuild.build({
    entryPoints: ['server/index.ts'],
    platform: 'node',
    packages: 'external',
    bundle: true,
    format: 'esm',
    outdir: 'dist',
    // ЭТА НАСТРОЙКА ТЕПЕРЬ БУДЕТ ПРИМЕНЕНА НА 100%
    charset: 'utf8',
  });

  console.log('Build process completed successfully!');

} catch (e) {
  console.error('Build failed:', e);
  process.exit(1);
}