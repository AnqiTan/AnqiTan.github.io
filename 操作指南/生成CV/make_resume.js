// 按岗位生成多份一页英文 resume，输出到 assets/resumes/<id>.pdf（网站 CV 页可下载）
// 用法（在本文件夹）：node make_resume.js
// 每个岗位版本 = 下面 VARIANTS 里的一项：标题、简介、经历要点的顺序和取舍、技能顺序。
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..", "..");
global.window = {};
require(path.join(ROOT, "assets/js/data.js"));
const S = window.SITE;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ==================== 素材库（措辞在这里改）====================
const EDU = [
  ["Ph.D. in Bioengineering, University of Illinois Urbana-Champaign", "Aug 2022 – Expected May 2027", "Advisor: Prof. Brian T. Cunningham · Nanosensors Group"],
  ["B.S. in Mechanical Engineering (dual degree), UIUC & Zhejiang University", "Aug 2018 – Jun 2022", ""],
];

const BUL = {
  dod: "Lead developer of the portable fluorescence reader for a <b>$4.87M DoD (PRMRP)</b> project on point-of-care sepsis/ARDS phenotyping with Stanford, WashU, and UCSF.",
  dodDx: "Contribute to a <b>$4.87M DoD (PRMRP)</b> project developing a multiplexed IL-8/sTNFR-1 plasmonic-fluor LFA and handheld reader to classify sepsis/ARDS phenotypes at the bedside; lead the reader development.",
  // TODO: 补实测数字（检测限、与 ImageQuant 的 R²、单次读数秒数、物料成本），替换 "comparable to a lab ImageQuant scanner"
  reader: "Built a <b>$87 pocket-size NIR fluorescence reader</b> end to end: 750 nm excitation and custom optical filtering, Raspberry Pi imaging hardware, and an <b>Android control app (Kotlin)</b> with automated T/C analysis in <b>20 s per strip</b>; image quality comparable to a lab ImageQuant scanner; first-author manuscript in preparation.",
  readerShort: "Built an <b>$87 pocket-size fluorescence reader</b> (20 s per strip) with an Android control app (Kotlin), comparable to a lab ImageQuant scanner.",
  readerAI: "Developed the image-analysis pipeline for a pocket-size fluorescence reader: <b>automated test/control-line detection, background correction, and 4PL calibration</b> to convert strip images into cortisol concentrations in an Android app (Kotlin).",
  readerSW: "Wrote the reader's analysis pipeline (<b>automated test/control-line detection, background correction, 4PL calibration</b>) that converts strip images into cortisol concentrations.",
  cortisol: "Developed a competitive plasmonic-fluor lateral flow assay for salivary cortisol with a <b>≤0.12 ng/mL</b> detection limit (antibody loading, blocking, and sample-preparation optimization); collected saliva from <b>153 adults</b>; accepted for an <b>oral presentation at APHA 2026</b>.",
  cortisolShort: "Developed a plasmonic-fluor lateral flow assay for salivary cortisol (<b>≤0.12 ng/mL</b> LOD; <b>153 adults</b> sampled); <b>oral presentation, APHA 2026</b>.",
  infect: "Contributed to an ultrasensitive plasmon-enhanced LFA antigen test for <i>Neisseria gonorrhoeae</i> with WashU School of Medicine (<i>ACS Nano Medicine</i> 2026).",
  rcm: "Led a national-level research project designing a re-localizable remote-center-of-motion mechanism for minimally invasive surgery (<b>first-author paper, IEEE ICARM 2021</b>).",
};

const EXP = (order) => [
  { head: "Graduate Research Assistant, Nanosensors Group, UIUC", date: "Sep 2022 – Present", bullets: order.map((k) => BUL[k]) },
  { head: "Undergraduate Research Leader, ZJU-UIUC Institute", date: "2019 – 2021", bullets: [BUL.rcm] },
];

const PROJ = {
  stage: { head: "Mimicry Stage Lighting Control System (Senior Design, mechanical lead)", date: "Feb 2022 – May 2022",
    bullets: ["Designed a two-axis light manipulator (MATLAB kinematics, Euler–Lagrange torque analysis) and a 3D-printed/laser-cut portable structure (9.3 kg, 4.5 h battery); the light follows a handheld ESP32 + IMU controller in real time."] },
  crispr: { head: "CRISPR Mechanism Explainer (Ashby Prize Hackathon, NCSA) — 1st Place", date: "Oct 2025",
    bullets: ["Two-person team; found label bias in the public benchmark, built a balanced validation set with experimental-condition context, and fine-tuned an LLM (Qwen3) to classify CRISPR screen outcomes and explain the mechanism; shipped a Gradio chat demo."] },
  gw: { head: "LLM-Automated Gravitational-Wave Workflow (Ashby Prize Hackathon) — Honorable Mention", date: "Apr 2024",
    bullets: ["Five-person team; built a streamlined pipeline using OpenAI services as a front-end to classify gravitational-wave signals from black-hole collisions."] },
  cell: { head: "Intelligent Cell Culture Platform (China \"Internet+\" Competition) — National Silver Medal", date: "2021",
    bullets: ["Product lead for an automated, modular manipulator platform for standardized cell production."] },
};

// 投稿后把 "manuscript in preparation" 改成 "submitted"
const PUBS = "<b>First author:</b> IEEE ICARM 2021 paper · APHA 2026 oral presentation · pocket fluorescence reader manuscript (in preparation). <b>Co-author:</b> 4 journal papers (<i>Chemical Reviews</i>, <i>Lab on a Chip</i>, <i>ACS Nano Medicine</i>, <i>Biosensors</i>) and 1 Elsevier book chapter.";
const HONORS = "1st Place, Ashby Prize Computational Science Hackathon, NCSA (2025) · Honorable Mention, Ashby Prize Hackathon (2024) · National Silver Medal, China \"Internet+\" Innovation & Entrepreneurship Competition (2021)";
const TEACH = "TA, BIOE/ECE 415 Biomedical Instrumentation Lab (Fall 2025) · TA, ME 170 Computer-Aided Design (3 semesters)";

const SK = {
  bio: ["Biosensing", "lateral flow assays (competitive & sandwich), plasmonic-fluor labels, immunoassay optimization, ELISA, saliva/plasma sample prep, 3D cell culture, fluorescence imaging"],
  eng: ["Engineering", "SolidWorks, Creo, Fusion 360, Blender, 3D printing, laser cutting, optical/instrument design, COMSOL, FEA, design for assembly"],
  code: ["Software", "Python, MATLAB, Android app development (Kotlin), image processing, curve fitting (4PL)"],
  prog: ["Programming", "Python, MATLAB, LabVIEW, Android app development (Kotlin), Raspberry Pi, Arduino, ESP32"],
  ai: ["AI & Data", "Python, Android app development (Kotlin), LLM fine-tuning (Qwen3), OpenAI API, Gradio, image processing, curve fitting (4PL), MATLAB"],
  hw: ["Hardware", "Raspberry Pi, ESP32, Arduino, LabVIEW, sensors (IMU), optics"],
  optics: ["Optics & Hardware", "fluorescence imaging optics (NIR excitation, filter selection), camera modules, Raspberry Pi, ESP32, Arduino, LabVIEW, IMU sensors"],
  lang: ["Languages", "English (fluent), Chinese (native)"],
};

// ==================== 岗位版本 ====================
const VARIANTS = [
  {
    id: "hardware-systems",
    headline: "Optical & Hardware Systems Engineer · Portable Biomedical Instruments",
    summary: "Ph.D. candidate who designs portable optical instruments end to end: optics, mechanical design, embedded hardware, and the Android and analysis software that make them usable.",
    exp: EXP(["reader", "readerSW", "dod", "cortisolShort"]),
    proj: [PROJ.stage, PROJ.cell],
    skills: [SK.optics, SK.eng, SK.code, SK.lang],
  },
  {
    id: "medical-device",
    headline: "Biomedical Engineer · Point-of-Care Devices & Optical Instrumentation",
    summary: "Ph.D. candidate combining mechanical design and biosensing to build low-cost, portable diagnostic instruments, from optical readers to field-deployable hardware.",
    exp: EXP(["reader", "dod", "cortisolShort"]),
    proj: [PROJ.stage, PROJ.cell],
    skills: [SK.eng, SK.prog, SK.bio, SK.lang],
  },
  {
    id: "diagnostics",
    headline: "Diagnostic Device Engineer · Point-of-Care Readers & Lateral Flow Tests",
    summary: "Ph.D. candidate building portable readers for plasmon-enhanced lateral flow tests and validating them with human samples in lab and community settings.",
    exp: EXP(["reader", "dodDx", "cortisol", "infect"]),
    proj: [PROJ.crispr],
    skills: [SK.eng, SK.prog, SK.bio, SK.lang],
  },
  {
    id: "ai-health",
    headline: "Engineer · AI & Data for Health Technologies",
    summary: "Bioengineering Ph.D. candidate who builds data pipelines and LLM tools around real biomedical devices; two-time Ashby Prize hackathon winner (1st place, 2025).",
    exp: EXP(["readerAI", "dod", "cortisolShort"]),
    proj: [PROJ.crispr, PROJ.gw],
    skills: [SK.ai, SK.hw, SK.bio, SK.lang],
  },
];

// ==================== 排版 ====================
const entry = (e) => `<div class="entry"><span class="l">${esc(e.head)}</span><span class="r">${esc(e.date)}</span></div><ul>${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;
const render = (v) => `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Resume - ${esc(S.name)}</title><style>
@page { size: Letter; margin: 0.42in 0.6in; }
body { font-family: Calibri, "Segoe UI", Arial, sans-serif; font-size: 10.5pt; line-height: 1.24; color: #1f1f1f; margin: 0; }
a { color: #8C2F26; text-decoration: none; }
h1 { text-align: center; font-size: 20pt; margin: 0; letter-spacing: .02em; }
.headline { text-align: center; font-weight: 700; color: #8C2F26; margin: 1pt 0; }
.contact { text-align: center; margin-bottom: 3pt; }
.sep { color: #999; margin: 0 7pt; }
.summary { margin: 3pt 0 0; font-style: italic; color: #333; text-align: center; }
h2 { font-size: 10.5pt; color: #8C2F26; text-transform: uppercase; letter-spacing: .06em; border-bottom: 1pt solid #8C2F26; padding-bottom: 1pt; margin: 7pt 0 2pt; }
.entry { display: flex; justify-content: space-between; gap: 12pt; margin-top: 3pt; font-weight: 700; }
.entry .r { white-space: nowrap; font-weight: 400; }
.note { font-style: italic; }
ul { margin: 1pt 0 1pt; padding-left: 14pt; }
li { margin-bottom: 1pt; }
p { margin: 1pt 0; }
</style></head><body>
<h1>${esc(S.name)}</h1>
<div class="headline">${esc(v.headline)}</div>
<div class="contact"><a href="mailto:${S.social.email}">${S.social.email}</a><span class="sep">|</span><a href="https://anqitan.github.io">anqitan.github.io</a><span class="sep">|</span><a href="${S.social.linkedin}">LinkedIn</a><span class="sep">|</span><a href="${S.social.scholar}">Google Scholar</a></div>
<p class="summary">${esc(v.summary)}</p>
<h2>Education</h2>
${EDU.map(([l, r, n]) => `<div class="entry"><span class="l">${esc(l)}</span><span class="r">${esc(r)}</span></div>${n ? `<div class="note">${esc(n)}</div>` : ""}`).join("")}
<h2>Experience</h2>
${v.exp.map(entry).join("")}
<h2>Selected Projects</h2>
${v.proj.map(entry).join("")}
<h2>Publications</h2>
<p>${PUBS}</p>
<h2>Honors &amp; Awards</h2>
<p>${esc(HONORS)}</p>
<h2>Teaching</h2>
<p>${esc(TEACH)}</p>
<h2>Skills</h2>
${v.skills.map(([k, val]) => `<p><b>${esc(k)}:</b> ${esc(val)}</p>`).join("")}
</body></html>`;

// ==================== 输出 ====================
const browser = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].find((p) => fs.existsSync(p));
const htmlDir = path.join(__dirname, "output");
const pdfDir = path.join(ROOT, "assets", "resumes");
fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(pdfDir, { recursive: true });
for (const v of VARIANTS) {
  const htmlPath = path.join(htmlDir, `Resume_${v.id}.html`);
  const pdfPath = path.join(pdfDir, `anqi-tan-resume-${v.id}.pdf`);
  fs.writeFileSync(htmlPath, render(v), "utf8");
  execFileSync(browser, ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, "file:///" + htmlPath.replace(/\\/g, "/")], { stdio: "ignore", timeout: 60000 });
  console.log("wrote", pdfPath);
}
