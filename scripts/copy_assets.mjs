import fs from 'fs';
import path from 'path';

const dirsToCopy = [
  'bloc1_governance',
  'bloc2_architecture',
  'bloc3_pipelines',
  'bloc4_ai_solutions'
];
const srcRoot = process.cwd();
const destRoot = path.resolve(process.cwd(), 'public');

function copyDirRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

for (let d of dirsToCopy) {
  const s = path.join(srcRoot, d);
  const dst = path.join(destRoot, d);
  if (fs.existsSync(s)) {
    copyDirRecursiveSync(s, dst);
  }
}
console.log('Copied repo folders to public');
