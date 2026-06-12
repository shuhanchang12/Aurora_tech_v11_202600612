import fs from 'fs';
import path from 'path';

const p1 = fs.readFileSync('src/components/OriginalFXDashboard_part1.tsx', 'utf-8');
const p2 = fs.readFileSync('src/components/OriginalFXDashboard_part2.tsx', 'utf-8');
const p3 = fs.readFileSync('src/components/OriginalFXDashboard_part3.tsx', 'utf-8');

fs.writeFileSync('src/components/OriginalFXDashboard.tsx', p1 + '\n\n' + p2 + '\n\n' + p3);

fs.unlinkSync('src/components/OriginalFXDashboard_part1.tsx');
fs.unlinkSync('src/components/OriginalFXDashboard_part2.tsx');
fs.unlinkSync('src/components/OriginalFXDashboard_part3.tsx');
fs.unlinkSync('merge.ts');
