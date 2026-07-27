import fs from 'node:fs';

const path = new URL('../worker/src/index.js', import.meta.url);
const source = fs.readFileSync(path, 'utf8');
const required = [
  'adminRoutes','leaderboard','summon','daily','battleStart','battleSettle',
  'missions','claimMission','mailList','claimMail','publicCatalog',
  'catalogList','catalogSave','catalogDelete','mediaUpload'
];
const missing = required.filter(name => !new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`).test(source));
const requiredRoutes = ['/api/catalog','/api/leaderboard','/api/summon','/api/admin/players'];
const missingRoutes = requiredRoutes.filter(route => !source.includes(route));
if (missing.length || missingRoutes.length) {
  console.error('Worker integrity check failed.');
  if (missing.length) console.error('Missing functions:', missing.join(', '));
  if (missingRoutes.length) console.error('Missing routes:', missingRoutes.join(', '));
  process.exit(1);
}
console.log('Worker integrity check passed.');
