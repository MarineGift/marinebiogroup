// restructure-preview.js
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');

function previewMoveFile(oldPath, newPath) {
  if (fs.existsSync(oldPath)) {
    console.log(`📦 Move: ${path.relative(rootDir, oldPath)} → ${path.relative(rootDir, newPath)}`);
  }
}

function previewDelete(filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`🗑 Delete: ${path.relative(rootDir, filePath)}`);
  }
}

function previewDeleteBackupFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      previewDeleteBackupFiles(filePath);
    } else if (file.endsWith('.backup')) {
      previewDelete(filePath);
    }
  });
}

// === 1. use-toast.ts 이동 ===
previewMoveFile(
  path.join(srcDir, 'features', 'use-toast.ts'),
  path.join(srcDir, 'hooks', 'use-toast.ts')
);

// === 2. features 폴더 삭제 ===
previewDelete(path.join(srcDir, 'features'));

// === 3. globals.css 중복 제거 ===
const stylesGlobals = path.join(srcDir, 'styles', 'globals.css');
const appGlobals = path.join(srcDir, 'app', 'globals.css');
if (fs.existsSync(stylesGlobals) && fs.existsSync(appGlobals)) {
  previewDelete(stylesGlobals);
}

// === 4. .backup 파일 삭제 ===
previewDeleteBackupFiles(srcDir);

console.log("👀 This is only a preview. No files were changed.");
