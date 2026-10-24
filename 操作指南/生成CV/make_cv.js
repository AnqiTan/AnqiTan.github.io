// 根据 assets/js/data.js 生成英文学术 CV：
//   output/CV_Anqi_Tan.docx  （可在 Word 里继续编辑）
//   output/CV_Anqi_Tan.html  （排版源文件）
//   assets/cv.pdf            （网站 CV 按钮链接的文件，用本机 Edge 打印生成）
// 用法（在本文件夹）：第一次先 npm install，之后每次 node make_cv.js
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, TabStopType, BorderStyle, LevelFormat, ExternalHyperlink,
} = require("docx");

const ROOT = path.resolve(__dirname, "..", "..");
global.window = {};
require(path.join(ROOT, "assets/js/data.js"));
const S = window.SITE;

const en = (v) => (v && typeof v === "object" && !Array.isArray(v) && ("en" in v)) ? v.en : v;
const strip = (h) => String(h || "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

// ---------- 文本片段：自己的名字自动加粗 ----------
const ME = /(Anqi Tan|A\.Q\. Tan)/;
const segs = (text, style = {}) => strip(text).split(ME).filter(Boolean).map((t) => ({ text: t, ...style, bold: style.bold || ME.test(t) }));

// ---------- 内容模型 ----------
const B = [];
const add = (b) => B.push(b);

add({ t: "name", text: S.name });
add({ t: "subtitle", text: en(S.title) });
add({ t: "contact", items: [
  { text: S.social.email, href: "mailto:" + S.social.email },
  { text: "anqitan.github.io", href: "https://anqitan.github.io" },
  { text: S.social.scholar.replace("https://", ""), href: S.social.scholar },   // 显示完整网址，打印出来也能找到
] });

add({ t: "h", text: "Education" });
for (const e of S.education) add({ t: "entry", left: `${en(e.degree)}, ${en(e.school)}`, right: e.date, note: en(e.note) || "" });

add({ t: "h", text: "Research Interests" });
add({ t: "p", segs: segs(en(S.research.interests).join(" · ")) });

add({ t: "h", text: "Research Experience" });
for (const e of S.experience.filter((x) => !/Teaching Assistant|President|Volunteer/.test(en(x.role)))) {
  add({ t: "entry", left: `${en(e.role)}, ${en(e.org)}`, right: e.date });
  for (const b of en(e.bullets)) add({ t: "bullet", segs: segs(b) });
}
const sd = S.projects.find((p) => /Mimicry/.test(en(p.title)));
if (sd) {
  add({ t: "entry", left: "Senior Design (ECE 445, Team #29): Mimicry Stage Lighting Control System", right: en(sd.meta.Period) || "" });
  add({ t: "bullet", segs: segs("Mechanical design lead: two-axis light manipulator (MATLAB forward/inverse kinematics; Euler–Lagrange and Newton–Euler torque analysis) and a 3D-printed, laser-cut structure designed for assembly and portability (9.3 kg, 4.5 h battery life).") });
  add({ t: "bullet", segs: segs("A handheld ESP32 + MPU9250 joystick drives the light in real time over WiFi; a music-analysis module generates LED color sequences.") });
}

const dod = S.projects.find((p) => /DoD PRMRP/.test(en(p.title)));
if (dod) {
  add({ t: "h", text: "Research Funding Participation" });
  add({ t: "entry", left: "DoD Peer Reviewed Medical Research Program, Award HT9425-25-1-0825 ($4.87M)", right: "2025 – Present" });
  add({ t: "bullet", segs: segs("Point-of-care molecular phenotyping of sepsis and ARDS (PI: Pratik Sinha; with S. Singamaneni, C. Calfee, and B. T. Cunningham). Role: lead developer of the portable fluorescence reader.") });
}

add({ t: "h", text: "Publications" });
const P = S.publications;
const cite = (p) => [
  ...segs(p.authors + "."),
  { text: ` “${strip(p.title)}.” ` },
  { text: strip(en(p.venueFull)) + ".", italic: true },
];
[
  ["Journal Articles and Reviews", P.filter((p) => /Lab Chip|ACS Nano|Chem\. Rev|Biosensors/.test(p.venue))],
  ["Book Chapters", P.filter((p) => p.badge === "Book Chapter")],
  ["Conference Papers and Abstracts", P.filter((p) => /APHA|ICARM|Structures20/.test(p.venue))],
  ["Manuscripts Under Review / In Preparation", P.filter((p) => /In Prep/.test(p.venue) || p.badge === "Under Review")],
].forEach(([name, list], gi) => {
  if (!list.length) return;
  add({ t: "sub", text: name });
  list.forEach((p) => add({ t: "num", group: "p" + gi, segs: cite(p) }));
});

add({ t: "h", text: "Conference Presentations" });
S.talks.forEach((x) => add({ t: "num", group: "talks", segs: [...segs(strip(en(x.text)).replace(/\s*\[Abstract\]/, "")), { text: ` (${x.date})`, muted: true }] }));

add({ t: "h", text: "Honors and Awards" });
S.awards.forEach((a) => add({ t: "entry", left: strip(en(a.name)), right: a.date, light: true }));

add({ t: "h", text: "Teaching" });
S.experience.filter((e) => /Teaching Assistant/.test(en(e.role))).forEach((e) => add({ t: "entry", left: `Teaching Assistant, ${en(e.org)}`, right: e.date, light: true }));

add({ t: "h", text: "Leadership and Service" });
S.experience.filter((e) => /President|Volunteer/.test(en(e.role))).forEach((e) => add({ t: "entry", left: `${en(e.role)}, ${en(e.org)}`, right: e.date, light: true }));

add({ t: "h", text: "Skills" });
S.skills.forEach((g) => add({ t: "skill", label: en(g.group), text: g.items.map(en).join(", ") }));

const updated = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" });

// ==================== Word ====================
const FONT = "Calibri", SIZE = 21, PAGE_W = 12240, MARGIN = 1008, RIGHT = PAGE_W - 2 * MARGIN, ACC = "8C2F26";
const tr = (s) => new TextRun({ text: s.text, font: FONT, size: SIZE, bold: !!s.bold, italics: !!s.italic, color: s.muted ? "555555" : undefined });
const docxBlocks = [];
let groups = new Set();
for (const b of B) {
  if (b.t === "name") docxBlocks.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [new TextRun({ text: b.text, font: FONT, size: 40, bold: true })] }));
  else if (b.t === "subtitle") docxBlocks.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [new TextRun({ text: b.text, font: FONT, size: SIZE, color: "444444" })] }));
  else if (b.t === "contact") docxBlocks.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: b.items.flatMap((it, i) => [
    ...(i ? [new TextRun({ text: "  |  ", font: FONT, size: SIZE, color: "888888" })] : []),
    new ExternalHyperlink({ link: it.href, children: [new TextRun({ text: it.text, font: FONT, size: SIZE, color: ACC })] }),
  ]) }));
  else if (b.t === "h") docxBlocks.push(new Paragraph({ spacing: { before: 200, after: 80 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACC, space: 2 } }, children: [new TextRun({ text: b.text.toUpperCase(), font: FONT, size: 23, bold: true, color: ACC })] }));
  else if (b.t === "sub") docxBlocks.push(new Paragraph({ spacing: { before: 100, after: 40 }, children: [new TextRun({ text: b.text, font: FONT, size: SIZE, bold: true, italics: true })] }));
  else if (b.t === "entry") {
    docxBlocks.push(new Paragraph({ spacing: { before: b.light ? 20 : 80 }, tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }], children: [new TextRun({ text: b.left, font: FONT, size: SIZE, bold: !b.light }), new TextRun({ text: `\t${b.right || ""}`, font: FONT, size: SIZE })] }));
    if (b.note) docxBlocks.push(new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: b.note, font: FONT, size: SIZE, italics: true })] }));
  }
  else if (b.t === "bullet") docxBlocks.push(new Paragraph({ numbering: { reference: "b", level: 0 }, spacing: { after: 20 }, children: b.segs.map(tr) }));
  else if (b.t === "num") { groups.add(b.group); docxBlocks.push(new Paragraph({ numbering: { reference: b.group, level: 0 }, spacing: { after: 50 }, children: b.segs.map(tr) })); }
  else if (b.t === "p") docxBlocks.push(new Paragraph({ children: b.segs.map(tr) }));
  else if (b.t === "skill") docxBlocks.push(new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: b.label + ": ", font: FONT, size: SIZE, bold: true }), new TextRun({ text: b.text, font: FONT, size: SIZE })] }));
}
docxBlocks.push(new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { before: 200 }, children: [new TextRun({ text: `Last updated: ${updated}`, font: FONT, size: 16, color: "888888" })] }));
const numCfg = (ref) => ({ reference: ref, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "[%1]", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 460, hanging: 460 } } } }] });
const doc = new Document({
  creator: S.name, title: `CV - ${S.name}`,
  styles: { default: { document: { run: { font: FONT, size: SIZE } } } },
  numbering: { config: [
    { reference: "b", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 240 } } } }] },
    ...[...groups].map(numCfg),
  ] },
  sections: [{ properties: { page: { size: { width: PAGE_W, height: 15840 }, margin: { top: 900, bottom: 900, left: MARGIN, right: MARGIN } } }, children: docxBlocks }],
});

// ==================== HTML ====================
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const hs = (s) => { let t = esc(s.text); if (s.bold) t = `<b>${t}</b>`; if (s.italic) t = `<i>${t}</i>`; if (s.muted) t = `<span class="muted">${t}</span>`; return t; };
let html = "", openList = null;
const closeList = () => { if (openList) { html += `</${openList.tag}>`; openList = null; } };
const counters = {};
for (const b of B) {
  const wantList = b.t === "bullet" ? { tag: "ul", key: "ul" } : b.t === "num" ? { tag: "ol", key: b.group } : null;
  if (!wantList || !openList || openList.key !== wantList.key) closeList();
  if (b.t === "name") html += `<h1>${esc(b.text)}</h1>`;
  else if (b.t === "subtitle") html += `<div class="subtitle">${esc(b.text)}</div>`;
  else if (b.t === "contact") html += `<div class="contact">${b.items.map((i) => `<a href="${esc(i.href)}">${esc(i.text)}</a>`).join(`<span class="sep">|</span>`)}</div><div class="updated">Last updated: ${updated}</div>`;
  else if (b.t === "h") html += `<h2>${esc(b.text)}</h2>`;
  else if (b.t === "sub") html += `<h3>${esc(b.text)}</h3>`;
  else if (b.t === "entry") html += `<div class="entry${b.light ? " light" : ""}"><span class="l">${esc(b.left)}</span><span class="r">${esc(b.right || "")}</span></div>${b.note ? `<div class="note">${esc(b.note)}</div>` : ""}`;
  else if (b.t === "p") html += `<p>${b.segs.map(hs).join("")}</p>`;
  else if (b.t === "skill") html += `<p class="skill"><b>${esc(b.label)}:</b> ${esc(b.text)}</p>`;
  else if (wantList) {
    if (!openList) {
      counters[wantList.key] = counters[wantList.key] || 0;
      html += wantList.tag === "ol" ? `<ol>` : `<ul>`;
      openList = wantList;
    }
    html += `<li>${b.segs.map(hs).join("")}</li>`;
  }
}
closeList();
const page = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>CV - ${esc(S.name)}</title><style>
@page { size: Letter; margin: 0.6in 0.7in; }
body { font-family: Calibri, "Segoe UI", Arial, sans-serif; font-size: 10.5pt; line-height: 1.32; color: #1f1f1f; margin: 0; }
a { color: #8C2F26; text-decoration: none; }
h1 { text-align: center; font-size: 22pt; margin: 0 0 2pt; letter-spacing: .02em; }
.subtitle { text-align: center; color: #444; }
.contact { text-align: center; margin: 3pt 0 6pt; }
.sep { color: #999; margin: 0 8pt; }
h2 { font-size: 11.5pt; color: #8C2F26; text-transform: uppercase; letter-spacing: .06em; border-bottom: 1.2pt solid #8C2F26; padding-bottom: 1pt; margin: 11pt 0 4pt; page-break-after: avoid; }
h3 { font-size: 10.5pt; font-style: italic; margin: 6pt 0 2pt; page-break-after: avoid; }
.entry { display: flex; justify-content: space-between; gap: 16pt; margin-top: 4pt; font-weight: 700; page-break-after: avoid; }
.entry.light { font-weight: 400; margin-top: 1pt; }
.entry .r { white-space: nowrap; font-weight: 400; }
.note { font-style: italic; }
ul { margin: 1pt 0 2pt; padding-left: 16pt; }
ol { margin: 1pt 0 2pt; padding-left: 22pt; }
ol li { margin-bottom: 3pt; }
li { page-break-inside: avoid; }
p { margin: 2pt 0; }
.muted { color: #666; }
.updated { text-align: center; color: #999; font-size: 8pt; margin: -2pt 0 4pt; }
</style></head><body>${html}</body></html>`;

// ==================== 输出 ====================
const outDir = path.join(__dirname, "output");
fs.mkdirSync(outDir, { recursive: true });
const htmlPath = path.join(outDir, "CV_Anqi_Tan.html");
fs.writeFileSync(htmlPath, page, "utf8");
console.log("wrote", htmlPath);

const pdfPath = path.join(ROOT, "assets", "cv.pdf");
const browsers = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter((p) => fs.existsSync(p));
if (browsers.length) {
  execFileSync(browsers[0], ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, "file:///" + htmlPath.replace(/\\/g, "/")], { stdio: "ignore", timeout: 60000 });
  console.log("wrote", pdfPath);
} else {
  console.log("未找到 Edge/Chrome，请手动用浏览器打开 HTML 并打印为 PDF");
}

Packer.toBuffer(doc).then((buf) => {
  const docxPath = path.join(outDir, "CV_Anqi_Tan.docx");
  fs.writeFileSync(docxPath, buf);
  console.log("wrote", docxPath);
});
