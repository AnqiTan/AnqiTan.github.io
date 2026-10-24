// 一页英文 resume（求职投递用），输出到 output/：
//   Resume_Anqi_Tan.pdf   （用本机 Edge 打印生成）
//   Resume_Anqi_Tan.html  （排版源文件；也可以直接用 Word 打开编辑）
// 用法（在本文件夹）：node make_resume.js
// 内容比完整 CV 精简，措辞在下面直接改；联系方式和奖项等从 data.js 读取。
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..", "..");
global.window = {};
require(path.join(ROOT, "assets/js/data.js"));
const S = window.SITE;
const en = (v) => (v && typeof v === "object" && !Array.isArray(v) && ("en" in v)) ? v.en : v;
const strip = (h) => String(h || "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const me = (s) => esc(s).replace(/(Anqi Tan|A\.Q\. Tan)/g, "<b>$1</b>");

// ---------- 内容（可直接修改措辞）----------
const education = [
  ["Ph.D. in Bioengineering, University of Illinois Urbana-Champaign", "Aug 2022 – Present", "Advisor: Prof. Brian T. Cunningham · Nanosensors Group"],
  ["B.S. in Mechanical Engineering (dual degree), UIUC & Zhejiang University", "Aug 2018 – Jun 2022", ""],
];

const experience = [
  {
    head: "Graduate Research Assistant, Nanosensors Group, UIUC", date: "Sep 2022 – Present",
    bullets: [
      "Lead developer of the portable fluorescence reader for a <b>$4.87M DoD (PRMRP)</b> project on point-of-care sepsis/ARDS phenotyping with Stanford, WashU, and UCSF.",
      "Built a <b>~$100 pocket-size NIR fluorescence reader</b> (Raspberry Pi, 750 nm excitation, custom optics, phone-controlled capture, automated T/C analysis) with image quality comparable to a lab ImageQuant scanner; first-author manuscript in preparation.",
      "Developed a competitive plasmonic-fluor lateral flow assay for salivary cortisol with a <b>≤0.12 ng/mL</b> detection limit; collected saliva from <b>153 adults</b> in lab and community settings; accepted for an <b>oral presentation at APHA 2026</b>.",
      "Co-authored 4 journal papers and reviews (<i>Chemical Reviews</i>, <i>Lab on a Chip</i>, <i>ACS Nano Medicine</i>, <i>Biosensors</i>) and 2 book chapters on biosensing and point-of-care diagnostics.",
    ],
  },
  {
    head: "Research Assistant Intern, Institute of Brain Science, BrainCo (Hangzhou)", date: "May 2022 – Aug 2022",
    bullets: ["Completed research tasks for acoustic/electrical-stimulation sleep assistance and multimodal-EEG fatigue monitoring."],
  },
  {
    head: "Undergraduate Research Leader, ZJU-UIUC Institute", date: "2019 – 2021",
    bullets: ["Led a national-level research project designing a re-localizable remote-center-of-motion mechanism for minimally invasive surgery (<b>first-author paper, IEEE ICARM 2021</b>)."],
  },
];

const projects = [
  {
    head: "Mimicry Stage Lighting Control System (Senior Design, mechanical lead)", date: "Feb 2022 – May 2022",
    bullets: ["Designed a two-axis light manipulator (MATLAB kinematics, Euler–Lagrange torque analysis) and a 3D-printed/laser-cut portable structure; the light follows a handheld ESP32 + IMU controller in real time."],
  },
  {
    head: "CRISPR Mechanism Explainer (Ashby Prize Hackathon, NCSA) — 1st Place", date: "Oct 2025",
    bullets: ["Two-person team; found label bias in the public benchmark, built a balanced validation set, and fine-tuned an LLM (Qwen3) to classify CRISPR screen outcomes and explain the mechanism."],
  },
];

const honors = [
  "1st Place, Ashby Prize Computational Science Hackathon (2025)",
  "Honorable Mention, Ashby Prize Hackathon (2024)",
  "National Silver Medal, China \"Internet+\" Innovation & Entrepreneurship Competition (2021)",
  "1st Prize, RoboMaster (college level, 2019)",
  "Outstanding Performance & Innovation Award, Intl. Concrete Dragon Boat Competition (2019)",
];

const skills = [
  ["Biosensing", "lateral flow assays, plasmonic-fluor labels, ELISA, 3D cell culture, fluorescence imaging"],
  ["Engineering", "SolidWorks, Creo, Fusion 360, 3D printing, laser cutting, COMSOL, FEA, optical/instrument design"],
  ["Programming", "Python, MATLAB, LabVIEW, Raspberry Pi, Arduino, ESP32"],
  ["Languages", "English (fluent), Chinese (native)"],
];

// ---------- 排版 ----------
const entry = (e) => `<div class="entry"><span class="l">${esc(e.head)}</span><span class="r">${esc(e.date)}</span></div><ul>${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;
const body = `
<h1>${esc(S.name)}</h1>
<div class="contact"><a href="mailto:${S.social.email}">${S.social.email}</a><span class="sep">|</span><a href="https://anqitan.github.io">anqitan.github.io</a><span class="sep">|</span><a href="${S.social.scholar}">Google Scholar</a></div>

<h2>Education</h2>
${education.map(([l, r, n]) => `<div class="entry"><span class="l">${esc(l)}</span><span class="r">${esc(r)}</span></div>${n ? `<div class="note">${esc(n)}</div>` : ""}`).join("")}

<h2>Research Experience</h2>
${experience.map(entry).join("")}

<h2>Selected Projects</h2>
${projects.map(entry).join("")}

<h2>Honors &amp; Awards</h2>
<p>${honors.map(esc).join(" · ")}</p>

<h2>Teaching &amp; Leadership</h2>
<p>TA, BIOE/ECE 415 Biomedical Instrumentation Lab (Fall 2025) · TA, ME 170 Computer-Aided Design (3 semesters) · President, Residential College Student Committee, ZJU · Volunteer teacher, rural Guizhou (2019)</p>

<h2>Skills</h2>
${skills.map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join("")}
`;

const page = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Resume - ${esc(S.name)}</title><style>
@page { size: Letter; margin: 0.5in 0.6in; }
body { font-family: Calibri, "Segoe UI", Arial, sans-serif; font-size: 10.5pt; line-height: 1.28; color: #1f1f1f; margin: 0; }
a { color: #8C2F26; text-decoration: none; }
h1 { text-align: center; font-size: 20pt; margin: 0 0 1pt; letter-spacing: .02em; }
.contact { text-align: center; margin-bottom: 2pt; }
.sep { color: #999; margin: 0 7pt; }
h2 { font-size: 10.5pt; color: #8C2F26; text-transform: uppercase; letter-spacing: .06em; border-bottom: 1pt solid #8C2F26; padding-bottom: 1pt; margin: 8pt 0 3pt; }
.entry { display: flex; justify-content: space-between; gap: 12pt; margin-top: 3pt; font-weight: 700; }
.entry .r { white-space: nowrap; font-weight: 400; }
.note { font-style: italic; }
ul { margin: 1pt 0 1pt; padding-left: 14pt; }
li { margin-bottom: 1pt; }
p { margin: 1pt 0; }
</style></head><body>${body}</body></html>`;

const outDir = path.join(__dirname, "output");
fs.mkdirSync(outDir, { recursive: true });
const htmlPath = path.join(outDir, "Resume_Anqi_Tan.html");
const pdfPath = path.join(outDir, "Resume_Anqi_Tan.pdf");
fs.writeFileSync(htmlPath, page, "utf8");
const browser = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].find((p) => fs.existsSync(p));
execFileSync(browser, ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, "file:///" + htmlPath.replace(/\\/g, "/")], { stdio: "ignore", timeout: 60000 });
console.log("wrote", htmlPath, "\nwrote", pdfPath);
