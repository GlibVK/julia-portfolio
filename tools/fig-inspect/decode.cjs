// Decode the local .fig file (zip -> canvas.fig -> kiwi) into a flat JSON list of nodes.
// Offline alternative to the Figma MCP server. Read-only: never writes to the .fig file.
// Usage (from julia-free/): node tools/fig-inspect/decode.cjs <canvas.fig> <out-nodes.json>
// Get canvas.fig first: Expand-Archive the .fig (it is a zip) into a temp folder.
const fs = require('fs');
const zlib = require('zlib');

const file = fs.readFileSync(process.argv[2]);
// Header: "fig-kiwi" + 4-byte version, then chunks: uint32 length + compressed data.
let offset = 12;
const chunks = [];
while (offset < file.length) {
  const len = file.readUInt32LE(offset);
  offset += 4;
  const raw = file.subarray(offset, offset + len);
  offset += len;
  let data;
  try { data = zlib.inflateRawSync(raw); } catch { try { data = zlib.zstdDecompressSync(raw); } catch { data = raw; } }
  chunks.push(data);
}

function reader(buf) {
  let p = 0;
  const f32 = new Float32Array(1);
  const u32 = new Uint32Array(f32.buffer);
  return {
    byte: () => buf[p++],
    varUint() { let r = 0, s = 0, c; do { c = buf[p++]; r |= (c & 127) << s; s += 7; } while (c & 128 && s < 35); return r >>> 0; },
    varInt() { const v = this.varUint(); return v & 1 ? ~(v >>> 1) : v >>> 1; },
    varUint64() { let r = 0n, s = 0n, c; do { c = buf[p++]; r |= BigInt(c & 127) << s; s += 7n; } while (c & 128); return r; },
    float() {
      const first = buf[p];
      if (first === 0) { p++; return 0; }
      let bits = first | (buf[p + 1] << 8) | (buf[p + 2] << 16) | (buf[p + 3] << 24);
      p += 4;
      bits = (bits << 23) | (bits >>> 9);
      u32[0] = bits;
      return f32[0];
    },
    string() { const start = p; while (buf[p] !== 0) p++; const s = buf.toString('utf8', start, p); p++; return s; },
  };
}

// Chunk 0: binary kiwi schema. Chunk 1: the document message.
const schemaReader = reader(chunks[0]);
const defs = [];
const defCount = schemaReader.varUint();
for (let i = 0; i < defCount; i++) {
  const def = { name: schemaReader.string(), kind: schemaReader.byte(), fields: [] };
  const fieldCount = schemaReader.varUint();
  for (let j = 0; j < fieldCount; j++) {
    def.fields.push({ name: schemaReader.string(), type: schemaReader.varInt(), isArray: schemaReader.byte(), value: schemaReader.varUint() });
  }
  defs.push(def);
}

const r = reader(chunks[1]);
const ENUM = 0, STRUCT = 1;
function readType(type) {
  switch (type) {
    case -1: return !!r.byte();
    case -2: return r.byte();
    case -3: return r.varInt();
    case -4: return r.varUint();
    case -5: return r.float();
    case -6: return r.string();
    case -7: case -8: return r.varUint64().toString();
  }
  const def = defs[type];
  if (def.kind === ENUM) { const v = r.varUint(); const f = def.fields.find((x) => x.value === v); return f ? f.name : v; }
  const out = {};
  if (def.kind === STRUCT) { for (const f of def.fields) out[f.name] = readField(f); return out; }
  for (;;) {
    const id = r.varUint();
    if (id === 0) return out;
    const f = def.fields.find((x) => x.value === id);
    if (!f) throw new Error(`Unknown field ${id} in ${def.name}`);
    out[f.name] = readField(f);
  }
}
function readField(f) {
  if (!f.isArray) return readType(f.type);
  const len = r.varUint();
  if (f.type === -2) { for (let i = 0; i < len; i++) r.byte(); return `[${len} bytes]`; }
  const arr = [];
  for (let i = 0; i < len; i++) arr.push(readType(f.type));
  return arr;
}

const message = readType(defs.findIndex((d) => d.name === 'Message'));
fs.writeFileSync(process.argv[3], JSON.stringify(message.nodeChanges));
console.log(`Decoded ${message.nodeChanges.length} nodes -> ${process.argv[3]}`);
