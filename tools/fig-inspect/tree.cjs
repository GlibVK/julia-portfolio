// Print a node subtree with position, size, fills and text styles.
// Usage: node tools/fig-inspect/tree.cjs <nodes.json> <nodeId e.g. 1:130> [depth=3]
// Notes on units: lineHeight "100 PERCENT" = Figma "Auto" (Roboto: 1.172);
// "RAW" = multiplier of font size; letterSpacing PERCENT = % of font size (em/100).
const fs = require('fs');
const nodes = JSON.parse(fs.readFileSync(process.argv[2]));
const idOf = (g) => `${g.sessionID}:${g.localID}`;
const byId = {};
const children = {};
for (const n of nodes) {
  byId[idOf(n.guid)] = n;
  if (n.parentIndex) (children[idOf(n.parentIndex.guid)] ||= []).push(n);
}
for (const k in children) children[k].sort((a, b) => (a.parentIndex.position < b.parentIndex.position ? -1 : 1));

const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
const paints = (list) => (list || []).filter((f) => f.visible !== false)
  .map((f) => (f.type === 'SOLID' ? hex(f.color) + (f.opacity < 1 ? `@${f.opacity.toFixed(2)}` : '') : f.type)).join(',');

function print(n, depth, maxDepth) {
  const t = n.transform || {};
  let line = `${'  '.repeat(depth)}${idOf(n.guid)} ${n.type} "${n.name}"${n.visible === false ? ' HIDDEN' : ''}`
    + ` @${Math.round(t.m02 || 0)},${Math.round(t.m12 || 0)}`
    + (n.size ? ` ${Math.round(n.size.x)}x${Math.round(n.size.y)}` : '');
  const fill = paints(n.fillPaints);
  if (fill) line += ` fill=${fill}`;
  const stroke = paints(n.strokePaints);
  if (stroke) line += ` stroke=${stroke}/${n.strokeWeight}`;
  if (n.opacity != null && n.opacity < 1) line += ` opacity=${n.opacity.toFixed(2)}`;
  if (n.cornerRadius) line += ` radius=${n.cornerRadius}`;
  if (n.type === 'TEXT') {
    const lh = n.lineHeight ? `${+n.lineHeight.value.toFixed(3)}${n.lineHeight.units}` : '';
    const ls = n.letterSpacing ? `${+n.letterSpacing.value.toFixed(3)}${n.letterSpacing.units}` : '';
    const text = ((n.textData && n.textData.characters) || '').slice(0, 60).replace(/\n/g, '\n');
    line += ` font=${n.fontName ? `${n.fontName.family}/${n.fontName.style}` : ''} ${n.fontSize}px lh=${lh} ls=${ls}`;
    if (n.textCase && n.textCase !== 'ORIGINAL') line += ` case=${n.textCase}`;
    if (n.textDecoration && n.textDecoration !== 'NONE') line += ` decoration=${n.textDecoration}`;
    line += ` "${text}"`;
  }
  console.log(line);
  if (depth < maxDepth) for (const c of children[idOf(n.guid)] || []) print(c, depth + 1, maxDepth);
}

const start = byId[process.argv[3]];
if (!start) throw new Error(`Node ${process.argv[3]} not found`);
print(start, 0, Number(process.argv[4] ?? 3));
