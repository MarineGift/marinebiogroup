// restructure-and-fix-imports.js
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function moveFile(oldPath, newPath) {
  ensureDir(path.dirname(newPath));
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`✅ Moved: ${oldPath} → ${newPath}`);
    return true;
  }
  return false;
}

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
    console.log(`🗑 Deleted: ${filePath}`);
  }
}

function updateImports(dir, oldImport, newImport) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      updateImports(filePath, oldImport, newImport);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(oldImport)) {
        content = content.replace(new RegExp(oldImport, 'g'), newImport);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✏ Updated imports in: ${filePath}`);
      }
    }
  });
}

function deleteBackupFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      deleteBackupFiles(filePath);
    } else if (file.endsWith('.backup')) {
      deleteFile(filePath);
    }
  });
}

// === 1. use-toast.ts 이동 ===
const moved = moveFile(
  path.join(srcDir, 'features', 'use-toast.ts'),
  path.join(srcDir, 'hooks', 'use-toast.ts')
);
if (moved) {
  updateImports(srcDir, './features/use-toast', './hooks/use-toast');
  updateImports(srcDir, '../features/use-toast', '../hooks/use-toast');
}

// === 2. features 폴더 삭제 ===
deleteFile(path.join(srcDir, 'features'));

// === 3. globals.css 중복 제거 ===
const stylesGlobals = path.join(srcDir, 'styles', 'globals.css');
const appGlobals = path.join(srcDir, 'app', 'globals.css');
if (fs.existsSync(stylesGlobals) && fs.existsSync(appGlobals)) {
  deleteFile(stylesGlobals);
}

// === 4. .backup 파일 삭제 ===
deleteBackupFiles(srcDir);

console.log("🎉 Folder structure cleaned & imports fixed!");
