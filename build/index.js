const packager = require('electron-packager');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

async function launch() {
  const appPaths = await packager({
    dir: path.join(__dirname, '../'),
    out: path.join(__dirname, '../out'),
    overwrite: true,
    ignore: [
      /^\/node_modules/,
      /^\/view/,
      /^\/design/,
      /^\/pack/,
      /^\/build/,
      /\/README/,
      /\/yarn/,
      /\/.git/,
      /\/.eslint/,
      /\/.idea/,
      /\/.npmrc/,
      /\/.compilerc/,
    ],
    download: {
      mirror: 'http://npm.taobao.org/mirrors/electron/',
    },
  });
  console.log(`Pack done at: ${appPaths.join('\n')}`);

  const toPath = path.join(appPaths[0], './luoo.qy.app/Contents/Resources/app/');
  fs.copyFileSync(
    path.join(__dirname, '../package.json'),
    path.join(toPath, './package.json'),
  );
  console.log('Install node_modules');
  cp.execSync(`cd ${toPath}; cnpm i --production`);
}

launch().then(() => {
  console.log('Done');
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
