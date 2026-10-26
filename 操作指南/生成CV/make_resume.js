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
  ["Ph.D. in Bioengineering, University of Illinois Urbana-Champaign", "Aug 2022 – Expected Dec 2027", "Advisor: Prof. Brian T. Cunningham · Nanosensors Group"],
  ["B.S. in Mechanical Engineering (dual degree), UIUC & Zhejiang University", "Aug 2018 – Jun 2022", ""],
];

// 每条 = 做了什么 + 怎么做的 + 结果/规模。动词统一：进行中用现在时，已结束用过去时。
const BUL = {
  reader: "Designed and built an <b>$87 pocket-size NIR fluorescence reader</b> for lateral flow strips end to end: 750 nm excitation and optical filtering, Raspberry Pi camera hardware, and an <b>Android app (Kotlin)</b> that quantifies test/control lines in <b>20 s per strip</b>; agrees with a lab ImageQuant scanner (<b>R² = 0.99</b>, <b>3.2% CV</b>); first-author manuscript in preparation.",
  readerDx: "Designed and built an <b>$87 pocket-size NIR fluorescence reader</b> (750 nm excitation, Raspberry Pi camera, <b>Android app in Kotlin</b>) that quantifies test/control lines in <b>20 s per strip</b>; agrees with a lab ImageQuant scanner (<b>R² = 0.99</b>, <b>3.2% CV</b>); first-author manuscript in preparation.",
  readerAI: "Built the image-analysis pipeline for a pocket-size fluorescence reader (<b>automated test/control-line detection, background correction, 4PL calibration</b>) that turns phone-captured strip images into cortisol concentrations inside an Android app (Kotlin).",
  readerSW: "Wrote the reader's analysis pipeline (<b>automated test/control-line detection, background correction, 4PL calibration</b>) that converts strip images into analyte concentrations.",
  dod: "Lead reader development for a <b>$4.87M DoD (PRMRP)</b> multi-site project with Stanford, WashU, and UCSF that builds a multiplexed IL-8/sTNFR-1 lateral flow test to classify sepsis/ARDS phenotypes at the bedside.",
  dodShort: "Lead reader development for a <b>$4.87M DoD (PRMRP)</b> point-of-care sepsis/ARDS project with Stanford, WashU, and UCSF.",
  cortisol: "Lead the Live Hormone project: developed a competitive plasmonic-fluor LFA for salivary cortisol (<b>LOD ≤0.12 ng/mL</b>, covering the physiological range) by optimizing antibody loading, blocking, and sample prep; collected saliva from <b>153 adults</b> in lab and community settings; <b>oral presentation, APHA 2026</b>.",
  cortisolShort: "Lead the Live Hormone project: a salivary cortisol lateral flow test (<b>LOD ≤0.12 ng/mL</b>) with a phone-controlled reader, tested with <b>153 adults</b>; <b>oral presentation, APHA 2026</b>.",
  infect: "Contributed to an ultrasensitive plasmon-enhanced LFA antigen test for <i>Neisseria gonorrhoeae</i> with WashU School of Medicine (<i>ACS Nano Medicine</i> 2026).",
  brainco: "Conducted literature and competitor reviews, recruited volunteers, and collected data for a sleep-aid stimulator and an EEG fatigue monitor.",
  rcm: "Led a national-level undergraduate research project designing a re-localizable remote-center-of-motion mechanism for minimally invasive surgery (<b>first-author paper, IEEE ICARM 2021</b>).",
};

const EXP = (order) => [
  { head: "Graduate Research Assistant, Nanosensors Group, UIUC", date: "Sep 2022 – Present", bullets: order.map((k) => BUL[k]) },
  { head: "Research Assistant Intern, Institute of Brain Science, BrainCo (Hangzhou, China)", date: "May 2022 – Aug 2022", bullets: [BUL.brainco] },
  { head: "Undergraduate Research Leader, ZJU-UIUC Institute", date: "2019 – 2021", bullets: [BUL.rcm] },
];

const PROJ = {
  stage: { head: "Mimicry Stage Lighting Control System (Senior Design, mechanical lead)", date: "Feb 2022 – May 2022",
    bullets: ["Designed a two-axis light manipulator (MATLAB kinematics, Euler–Lagrange torque analysis) and a 3D-printed/laser-cut portable structure (9.3 kg, 4.5 h battery); the light follows a handheld ESP32 + IMU controller in real time."] },
  crispr: { head: "CRISPR Mechanism Explainer (Ashby Prize Hackathon, NCSA) — 1st Place", date: "Oct 2025",
    bullets: ["Two-person team; found the public benchmark was almost all \"hit\" labels, rebuilt a balanced validation set with experimental context, and fine-tuned an LLM (Qwen3) to classify CRISPR screen outcomes and explain the mechanism; shipped a Gradio chat demo."] },
  gw: { head: "LLM-Automated Gravitational-Wave Workflow (Ashby Prize Hackathon) — Honorable Mention", date: "Apr 2024",
    bullets: ["Five-person team; built a pipeline that uses the OpenAI API as a natural-language front end to classify gravitational-wave signals from black-hole mergers."] },
};

// 投稿后把 "in preparation" 改成 "submitted"
const PUBS = "<b>First author:</b> 3 manuscripts in preparation (LumaPF reader for real-time salivary cortisol imaging; active learning for particle counting; plasmonic LFA labels) · IEEE ICARM 2021. <b>Co-author:</b> 4 journal papers (<i>Chemical Reviews</i>, <i>Lab on a Chip</i>, <i>ACS Nano Medicine</i>, <i>Biosensors</i>) and 1 Elsevier book chapter. <b>Talks:</b> APHA 2026 (oral), LOAC 2026.";
const HONORS = "1st Place, Ashby Prize Computational Science Hackathon, NCSA (2025) · TA, BIOE/ECE 415 Biomedical Instrumentation Lab (2025) and ME 170 Computer-Aided Design (3 semesters)";

const SK = {
  bio: ["Biosensing", "lateral flow assays (competitive & sandwich), plasmonic-fluor labels, immunoassay optimization, ELISA, saliva/plasma sample prep, fluorescence imaging, human-sample studies"],
  eng: ["Engineering", "SolidWorks, Creo, Fusion 360, 3D printing, laser cutting, optical/instrument design, COMSOL, FEA, design for assembly"],
  code: ["Software", "Python, MATLAB, Android app development (Kotlin), image processing, curve fitting (4PL)"],
  prog: ["Programming", "Python, MATLAB, LabVIEW, Android (Kotlin), Raspberry Pi, Arduino, ESP32"],
  ai: ["AI & Data", "Python, LLM fine-tuning (Qwen3), OpenAI API, Gradio, image processing, curve fitting (4PL), MATLAB, Android (Kotlin)"],
  hw: ["Hardware", "Raspberry Pi, ESP32, Arduino, LabVIEW, IMU sensors, fluorescence optics"],
  optics: ["Optics & Hardware", "fluorescence imaging optics (NIR excitation, filter selection), camera modules, Raspberry Pi, ESP32, Arduino, LabVIEW, IMU sensors"],
  lang: ["Languages", "English (fluent), Chinese (native)"],
};

const AVAIL = "Available May–Aug 2027 (on-site or remote) and part-time remote during the school year.";

// ==================== 岗位版本 ====================
const VARIANTS = [
  {
    id: "hardware-systems",
    headline: "Ph.D. Student, Bioengineering · Seeking 2027 Internship in Optical & Hardware Engineering",
    summary: "Designs portable optical instruments end to end: optics, mechanical design, embedded hardware, and the Android and analysis software that make them usable.",
    exp: EXP(["reader", "readerSW", "dodShort", "cortisolShort"]),
    proj: [PROJ.stage],
    skills: [SK.optics, SK.eng, SK.code, SK.lang],
  },
  {
    id: "medical-device",
    headline: "Ph.D. Student, Bioengineering · Seeking 2027 Internship in Medical Device R&D",
    summary: "Mechanical engineer turned biosensing researcher who builds low-cost, portable diagnostic instruments and tests them with real users and human samples.",
    exp: EXP(["reader", "dod", "cortisolShort"]),
    proj: [PROJ.stage],
    skills: [SK.eng, SK.prog, SK.bio, SK.lang],
  },
  {
    id: "diagnostics",
    headline: "Ph.D. Student, Bioengineering · Seeking 2027 Internship in Diagnostics R&D",
    summary: "Develops plasmon-enhanced lateral flow assays and the portable readers that quantify them, and validates both with human samples in lab and community settings.",
    exp: EXP(["cortisol", "readerDx", "dod", "infect"]),
    proj: [PROJ.crispr],
    skills: [SK.bio, SK.eng, SK.prog, SK.lang],
  },
  {
    id: "ai-health",
    headline: "Ph.D. Student, Bioengineering · Seeking 2027 Internship in AI & Data for Health",
    summary: "Builds data pipelines and LLM tools around real biomedical devices and human-sample data; 1st place, Ashby Prize Computational Science Hackathon (2025).",
    exp: EXP(["readerAI", "cortisolShort", "dodShort"]),
    proj: [PROJ.crispr, PROJ.gw],
    skills: [SK.ai, SK.bio, SK.hw, SK.lang],
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
<div class="contact">Urbana, IL<span class="sep">|</span><a href="mailto:${S.social.email}">${S.social.email}</a><span class="sep">|</span><a href="https://anqitan.github.io">anqitan.github.io</a><span class="sep">|</span><a href="${S.social.linkedin}">LinkedIn</a><span class="sep">|</span><a href="${S.social.scholar}">Google Scholar</a></div>
<p class="summary">${esc(v.summary)} ${esc(AVAIL)}</p>
<h2>Education</h2>
${EDU.map(([l, r, n]) => `<div class="entry"><span class="l">${esc(l)}</span><span class="r">${esc(r)}</span></div>${n ? `<div class="note">${esc(n)}</div>` : ""}`).join("")}
<h2>Experience</h2>
${v.exp.map(entry).join("")}
<h2>Selected Projects</h2>
${v.proj.map(entry).join("")}
<h2>Publications</h2>
<p>${PUBS}</p>
<h2>Honors &amp; Teaching</h2>
<p>${esc(HONORS)}</p>
<h2>Skills</h2>
${v.skills.map(([k, val]) => `<p><b>${esc(k)}:</b> ${esc(val)}</p>`).join("")}
</body></html>`;

// ==================== 输出 ====================
const browser = [
  process.env.CHROME,
  "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].find((p) => p && fs.existsSync(p));
const htmlDir = path.join(__dirname, "output");
const pdfDir = path.join(ROOT, "assets", "resumes");
fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(pdfDir, { recursive: true });
for (const v of VARIANTS) {
  const htmlPath = path.join(htmlDir, `Resume_${v.id}.html`);
  const pdfPath = path.join(pdfDir, `anqi-tan-resume-${v.id}.pdf`);
  fs.writeFileSync(htmlPath, render(v), "utf8");
  execFileSync(browser, [...(process.platform === "linux" ? ["--no-sandbox"] : []), "--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, "file://" + (process.platform === "win32" ? "/" : "") + htmlPath.replace(/\\/g, "/")], { stdio: "ignore", timeout: 60000 });
  console.log("wrote", pdfPath);
}
