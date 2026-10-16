// สร้าง reports/test-summary.md จาก reports/results.json (ผลรันจริง ไม่แก้ไขด้วยมือ)
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('reports/results.json', 'utf8'));
const rows = [];
function walk(suite) {
  for (const spec of suite.specs || []) {
    for (const t of spec.tests) {
      const r = t.results[t.results.length - 1] || {};
      const err = r.error ? (r.error.message || '').split('\n')[0].replace(/\u001b\[[0-9;]*m/g, '') : '';
      rows.push({ title: spec.title, file: spec.file, status: t.status, err });
    }
  }
  for (const s of suite.suites || []) walk(s);
}
(data.suites || []).forEach(walk);
const passed = rows.filter(r => r.status === 'expected').length;
let md = `# Test Summary\n\nรันเมื่อ: ${data.stats?.startTime || '-'}\n\n`;
md += `รวม ${rows.length} tests | Passed ${passed} | Failed ${rows.length - passed}\n\n`;
md += `| Test | ผล | ข้อผิดพลาดที่พบ |\n|---|---|---|\n`;
for (const r of rows) {
  md += `| ${r.title} | ${r.status === 'expected' ? 'Passed' : 'Failed'} | ${r.err.replace(/\|/g, '/')} |\n`;
}
fs.writeFileSync('reports/test-summary.md', md);
console.log(md);
