/* =========================================================
 * 网站内容都在这个文件里修改（姓名、简介、News、论文、项目、博客、相册……）
 * 改完保存，刷新网页即可看到效果。
 * 图片路径都是相对网站根目录，例如 "assets/img/projects/xxx.jpg"
 * 任何列表留空 [] 时，对应板块会自动隐藏。
 * 标有 TODO 的地方是还需要你确认或补充的。
 * ========================================================= */

window.SITE = {
  name: "Anqi Tan",               // 首页大标题：第一个词加粗，其余细体
  brand: "Anqi Tan",              // 左上角显示的名字
  title: "Ph.D. Student in Bioengineering · University of Illinois Urbana-Champaign",
  photo: "assets/img/photo.jpg",  // 首页头像
  cv: "assets/cv.pdf",            // CV PDF 路径
  updated: "October 22, 2026",    // 页脚 "Last updated"

  // 首页自我介绍：每个字符串是一段。可用 <strong>加粗</strong> 和 <a href="...">链接</a>
  intro: [
    "I am a Ph.D. student in <strong>Bioengineering</strong> at <strong>UIUC</strong>, working with <a href=\"https://nano.ece.illinois.edu/people/brian-t-cunningham/\" target=\"_blank\">Prof. Brian T. Cunningham</a> in the <a href=\"https://nano.ece.illinois.edu\" target=\"_blank\">Nanosensors Group</a>. I study <strong>biosensors and portable monitoring devices</strong>, with a focus on <strong>plasmon-enhanced lateral flow assays</strong> and portable readers for ultrasensitive point-of-care diagnostics, such as quantitative salivary cortisol measurement in community settings.",
    "I am passionate about bridging biomedical monitoring with engineering so that people can better understand their own health. Before my Ph.D., I received B.S. degrees in Mechanical Engineering from both UIUC and Zhejiang University, where I worked on robotic mechanism design for minimally invasive surgery.",
    "🙋 Feel free to reach out via <a href=\"mailto:anqitan2@illinois.edu\">email</a> if you are interested in my research."
  ],

  social: {
    email: "anqitan2@illinois.edu",
    scholar: "https://scholar.google.com/citations?user=SkxZzOoAAAAJ",
    github: "",                   // TODO: 确认 GitHub 用户名后填 "https://github.com/用户名"
    linkedin: ""                  // TODO: LinkedIn 链接
  },

  // ---------- 首页 News：日期 + 一句话，新的放最上面 ----------
  news: [
    { date: "Nov 2026", text: "I will present our <strong>portable plasmonic-fluor-enhanced lateral flow assay for salivary cortisol</strong> at the <strong>APHA 2026 Annual Meeting and Expo</strong>." },
    { date: "May 2026", text: "Our critical review <strong>Point of Care Molecular Cancer Diagnostics</strong> was published in <strong>Lab on a Chip</strong>." },
    { date: "Feb 2026", text: "Our paper on an <strong>ultrasensitive point-of-care antigen test for <em>Neisseria gonorrhoeae</em></strong> using plasmon-enhanced lateral flow assays was published in <strong>ACS Nano Medicine</strong>." },
    { date: "Jul 2025", text: "Our review <strong>Photonic Crystal Grating Resonance and Interfaces for Health Diagnostic Technologies</strong> was published in <strong>Chemical Reviews</strong>." },
    { date: "Feb 2023", text: "Our review on <strong>HIV self-testing technologies</strong> was published in <strong>Biosensors</strong>." },
    { date: "2022", text: "Graduated with B.S. degrees in Mechanical Engineering from UIUC and Zhejiang University, and joined the <strong>Nanosensors Group</strong> at UIUC as a Ph.D. student." }
  ],
  newsLimit: 6,                   // 首页最多显示几条，多余的折叠在 "Show more" 里

  // ---------- 论文：selected: true 的会显示在首页 ----------
  // venue: 左侧徽章文字；badge: 徽章下的小标签；image: 缩略图（可留空）；imageCredit: 图片出处（转载他人/期刊图片时必填）
  // ⚠️ 只能用 CC BY 等开放许可论文的图，或你自己制作的图。ACS / IEEE / Elsevier 版权论文的图不要直接放。
  // links: 按钮名 → 链接（如 PAPER / PDF / CODE / SLIDES），留空的不显示；作者里你的名字自动加粗
  publications: [
    {
      selected: true,
      venue: "APHA'26",
      badge: "First Author",
      image: "",
      title: "Portable Plasmonic Fluor-Enhanced Lateral Flow Assay for Quantitative Salivary Cortisol Measurement in Community Settings",
      authors: "Anqi Tan, Kai-Ning Wang, Tasfia Ashrafee, Ami Patel, Yuxiong Liu, Saurabh Umrao, Srikanth Singamaneni, Jenna Riis, Jacinda K. Dariotis, and Brian T. Cunningham",
      venueFull: "APHA 2026 Annual Meeting and Expo. 2026",
      highlights: [],
      links: {},
      bibtex: "@inproceedings{tan2026portable,\n  title = {Portable Plasmonic Fluor-Enhanced Lateral Flow Assay for Quantitative Salivary Cortisol Measurement in Community Settings},\n  author = {Tan, Anqi and Wang, Kai-Ning and Ashrafee, Tasfia and Patel, Ami and Liu, Yuxiong and Umrao, Saurabh and Singamaneni, Srikanth and Riis, Jenna and Dariotis, Jacinda K. and Cunningham, Brian T.},\n  booktitle = {APHA 2026 Annual Meeting and Expo},\n  year = {2026}\n}"
    },
    {
      selected: true,
      venue: "Lab Chip'26",
      badge: "Review",
      image: "assets/img/papers/labchip-2026.jpg",
      imageCredit: "Graphical abstract, Bhaskar et al., Lab Chip 2026 (CC BY)",
      title: "Point of Care Molecular Cancer Diagnostics",
      authors: "Seemesh Bhaskar, Saurabh Umrao, Han Keun Lee, Joseph Tibbs, Amanda Bacon, Skye Shepherd, Takhmina Ayupova, Fatma Uysal Ciloglu, Leyang Liu, Anqi Tan, Wang-Chien Chen, My Thi Tra Nguyen, Maria Grace Scannell, Ugur Aygun, Ugur Parlatan, Catherine Zhang, Manish Kohli, Guy R. Adami, Wali Badar, Ron C. Gaba, Aaron Mansfield, Joel Schwartz, Xing Wang, Utkan Demirci, and Brian T. Cunningham",
      venueFull: "Lab on a Chip, 26(10), 2948–3001. 2026",
      highlights: [],
      links: { PAPER: "https://pubs.rsc.org/lc/article/26/10/2948/1230310" },
      bibtex: "@article{bhaskar2026point,\n  title = {Point of Care Molecular Cancer Diagnostics},\n  author = {Bhaskar, Seemesh and Umrao, Saurabh and Lee, Han Keun and Tibbs, Joseph and Bacon, Amanda and Shepherd, Skye and Ayupova, Takhmina and Uysal Ciloglu, Fatma and Liu, Leyang and Tan, Anqi and Chen, Wang-Chien and Nguyen, My Thi Tra and Scannell, Maria Grace and Aygun, Ugur and Parlatan, Ugur and Zhang, Catherine and Kohli, Manish and Adami, Guy R. and Badar, Wali and Gaba, Ron C. and Mansfield, Aaron and Schwartz, Joel and Wang, Xing and Demirci, Utkan and Cunningham, Brian T.},\n  journal = {Lab on a Chip},\n  volume = {26},\n  number = {10},\n  pages = {2948--3001},\n  year = {2026}\n}"
    },
    {
      selected: true,
      venue: "ACS Nano Med.'26",
      badge: "",
      image: "",
      title: "Ultrasensitive Point-of-Care Antigen Test for Detection of Neisseria gonorrhoeae Using Plasmon-Enhanced Lateral Flow Assays",
      authors: "Yuxiong Liu, Qisheng Jiang, Anqi Tan, Gayathri Kondepati, Prashant Gupta, Yixuan Wang, Yajur Chandar, Tracey H. Bach, Stacey L. House, Peter A. Rice, Bijal A. Parikh, Brian T. Cunningham, Sanjay Ram, Ige A. George, Srikanth Singamaneni, and Sumanth Gandra",
      venueFull: "ACS Nano Medicine, 1(4), 1036–1047. 2026",
      highlights: [],
      links: { PAPER: "https://doi.org/10.1021/acsnanomed.5c00150" },
      bibtex: "@article{liu2026ultrasensitive,\n  title = {Ultrasensitive Point-of-Care Antigen Test for Detection of Neisseria gonorrhoeae Using Plasmon-Enhanced Lateral Flow Assays},\n  author = {Liu, Yuxiong and Jiang, Qisheng and Tan, Anqi and Kondepati, Gayathri and Gupta, Prashant and Wang, Yixuan and Chandar, Yajur and Bach, Tracey H. and House, Stacey L. and Rice, Peter A. and Parikh, Bijal A. and Cunningham, Brian T. and Ram, Sanjay and George, Ige A. and Singamaneni, Srikanth and Gandra, Sumanth},\n  journal = {ACS Nano Medicine},\n  volume = {1},\n  number = {4},\n  pages = {1036--1047},\n  year = {2026},\n  doi = {10.1021/acsnanomed.5c00150}\n}"
    },
    {
      selected: true,
      venue: "Chem. Rev.'25",
      badge: "Review",
      image: "",
      title: "Photonic Crystal Grating Resonance and Interfaces for Health Diagnostic Technologies",
      authors: "Seemesh Bhaskar, Weijing Wang, Hankeun Lee, Leyang Liu, Saurabh Umrao, Weinan Liu, Amanda Bacon, Joseph Tibbs, Kodchakorn Khemtonglang, Anqi Tan, Takhmina Ayupova, Wang-Chien Chen, Xing Wang, and Brian T. Cunningham",
      venueFull: "Chemical Reviews, 125(14), 6435–6540. 2025",
      highlights: [],
      links: { PAPER: "https://doi.org/10.1021/acs.chemrev.4c00653" },
      bibtex: "@article{bhaskar2025photonic,\n  title = {Photonic Crystal Grating Resonance and Interfaces for Health Diagnostic Technologies},\n  author = {Bhaskar, Seemesh and Wang, Weijing and Lee, Hankeun and Liu, Leyang and Umrao, Saurabh and Liu, Weinan and Bacon, Amanda and Tibbs, Joseph and Khemtonglang, Kodchakorn and Tan, Anqi and Ayupova, Takhmina and Chen, Wang-Chien and Wang, Xing and Cunningham, Brian T.},\n  journal = {Chemical Reviews},\n  volume = {125},\n  number = {14},\n  pages = {6435--6540},\n  year = {2025},\n  doi = {10.1021/acs.chemrev.4c00653}\n}"
    },
    {
      selected: false,
      venue: "Elsevier'25",
      badge: "Book Chapter",
      image: "",
      title: "Nano-Engineering at Functional Photonic Crystal Interfaces",
      authors: "Seemesh Bhaskar, Yanyu Xiong, Skye Shepherd, Joseph Tibbs, Amanda K. Bacon, Weinan Liu, Lucas D. Akin, Takhmina Ayupova, Weijing Wang, Hankeun Lee, Leyang Liu, Anqi Tan, Kodchakorn Khemtonglang, Xiaojing Wang, and Brian T. Cunningham",
      venueFull: "In Nano-Engineering at Functional Interfaces for Multi-Disciplinary Applications, Elsevier. 2025",
      highlights: [],
      links: { PAPER: "https://doi.org/10.1016/B978-0-443-21691-6.00007-X" },
      bibtex: "@incollection{bhaskar2025nano,\n  title = {Nano-Engineering at Functional Photonic Crystal Interfaces},\n  author = {Bhaskar, Seemesh and Xiong, Yanyu and Shepherd, Skye and Tibbs, Joseph and Bacon, Amanda K. and Liu, Weinan and Akin, Lucas D. and Ayupova, Takhmina and Wang, Weijing and Lee, Hankeun and Liu, Leyang and Tan, Anqi and Khemtonglang, Kodchakorn and Wang, Xiaojing and Cunningham, Brian T.},\n  booktitle = {Nano-Engineering at Functional Interfaces for Multi-Disciplinary Applications},\n  publisher = {Elsevier},\n  year = {2025},\n  doi = {10.1016/B978-0-443-21691-6.00007-X}\n}"
    },
    {
      selected: false,
      venue: "Biosensors'23",
      badge: "Review",
      image: "assets/img/papers/biosensors-2023.jpg",
      imageCredit: "Fig. 1, Bacon et al., Biosensors 2023 (CC BY 4.0)",
      title: "Review of HIV Self Testing Technologies and Promising Approaches for the Next Generation",
      authors: "Amanda Bacon, Weijing Wang, Hankeun Lee, Saurabh Umrao, Prima Dewi Sinawang, Demir Akin, Kodchakorn Khemtonglang, Anqi Tan, Sabina Hirshfield, Utkan Demirci, Xing Wang, and Brian T. Cunningham",
      venueFull: "Biosensors, 13(2), 298. 2023",
      highlights: [],
      links: { PAPER: "https://doi.org/10.3390/bios13020298" },
      bibtex: "@article{bacon2023review,\n  title = {Review of HIV Self Testing Technologies and Promising Approaches for the Next Generation},\n  author = {Bacon, Amanda and Wang, Weijing and Lee, Hankeun and Umrao, Saurabh and Sinawang, Prima Dewi and Akin, Demir and Khemtonglang, Kodchakorn and Tan, Anqi and Hirshfield, Sabina and Demirci, Utkan and Wang, Xing and Cunningham, Brian T.},\n  journal = {Biosensors},\n  volume = {13},\n  number = {2},\n  pages = {298},\n  year = {2023},\n  doi = {10.3390/bios13020298}\n}"
    },
    {
      selected: false,
      venue: "ICARM'21",
      badge: "",
      image: "",
      title: "Design Optimization of a Mechanically Constrained Re-Localizable Remote-Center-of-Motion",
      authors: "Anqi Tan, Shenwei Chen, Hanyu Gan, and Liangjing Yang",
      venueFull: "2021 6th IEEE International Conference on Advanced Robotics and Mechatronics (ICARM). 2021",
      highlights: [],
      links: { PAPER: "https://doi.org/10.1109/ICARM52023.2021.9536150" },
      bibtex: "@inproceedings{tan2021design,\n  title = {Design Optimization of a Mechanically Constrained Re-Localizable Remote-Center-of-Motion},\n  author = {Tan, Anqi and Chen, Shenwei and Gan, Hanyu and Yang, Liangjing},\n  booktitle = {2021 6th IEEE International Conference on Advanced Robotics and Mechatronics (ICARM)},\n  year = {2021},\n  doi = {10.1109/ICARM52023.2021.9536150}\n}"
    }
  ],

  // ---------- 项目：status 为 "current" 或 "past"；featured: true 的显示在首页 ----------
  projects: [
    {
      title: "Portable Plasmonic-Fluor LFA for Salivary Cortisol in Community Settings",
      status: "current",
      featured: true,
      image: "",                  // TODO: 放一张自己的项目图（实验装置/试纸条/读取器照片等）
      summary: "Building a portable, plasmonic-fluor-enhanced lateral flow assay and reader for quantitative measurement of salivary cortisol, a key stress biomarker, enabling non-invasive monitoring outside the lab. To be presented at APHA 2026.",
      meta: {
        "Role": "Lead researcher",
        "Lab": "Nanosensors Group, UIUC",
        "Collaborators": "Singamaneni Lab (WashU), Prof. Jenna Riis, Prof. Jacinda K. Dariotis"
        // TODO: 加上 "Period": "20XX – Present"
      },
      link: ""
    },
    {
      title: "Plasmon-Enhanced Lateral Flow Assays for Point-of-Care Diagnostics",
      status: "current",
      featured: true,
      image: "",                  // TODO: 放一张自己的项目图
      summary: "Developing plasmon-enhanced lateral flow assays (p-LFAs) for ultrasensitive detection of infectious-disease antigens and nucleic acids, such as SARS-CoV-2 and Neisseria gonorrhoeae, in point-of-care settings.",
      meta: {
        "Lab": "Nanosensors Group, UIUC",
        "Advisor": "Prof. Brian T. Cunningham",
        "Period": "2022 – Present"
      },
      link: ""                    // 项目详情链接（博客文章、论文、GitHub），留空则不显示
    },
    {
      title: "Re-Localizable Remote-Center-of-Motion Mechanism for Minimally Invasive Surgery",
      status: "past",
      featured: true,
      image: "",                  // TODO: 放一张自己的项目图（机构 CAD 图/样机照片）
      summary: "Designed and optimized a mechanically constrained, re-localizable remote-center-of-motion (RCM) mechanism for robot-assisted minimally invasive procedures. Published at IEEE ICARM 2021.",
      meta: {
        "Lab": "ZJU-UIUC Institute",
        "Advisor": "Prof. Liangjing Yang",
        "Period": "2020 – 2021"     // TODO: 确认时间
      },
      link: "https://doi.org/10.1109/ICARM52023.2021.9536150"
    }
  ],

  // ---------- Talks / 报告 ----------
  talks: [
    { date: "Nov 2026", text: "Presentation at the <strong>APHA 2026 Annual Meeting and Expo</strong> on a portable plasmonic-fluor-enhanced lateral flow assay for salivary cortisol." }
  ],

  // ---------- Teaching / 助教 ----------
  teaching: [
    { date: "TA", text: "<strong>BIOE 415 / ECE 415: Biomedical Instrumentation Lab</strong>, University of Illinois Urbana-Champaign" }   // TODO: 把 "TA" 换成学期，如 "Spring 2025"
  ],

  // ---------- 奖项（首页和 CV 页都会显示）----------
  awards: [
    { name: "National Silver Medal, China \"Internet+\" Innovation and Entrepreneurship Competition", date: "2021" },
    { name: "Scholarship of Zhejiang University", date: "2019" },
    { name: "First Prize, RoboMaster Mecha Master (College Level)", date: "2019" },
    { name: "Second Prize, Zhejiang Province Biology Olympiad", date: "2017" }
  ],

  // ---------- Research 页面 ----------
  research: {
    statement: "My research focuses on ultrasensitive, low-cost biosensing technologies that bring laboratory-grade diagnostics to the point of care. I work on plasmon-enhanced lateral flow assays and portable readout systems, aiming to integrate biomedical monitoring with engineering design so that people can better understand and manage their own health.",
    interests: ["Biosensors", "Point-of-Care Diagnostics", "Plasmon-Enhanced Lateral Flow Assays", "Portable Monitoring Devices", "Salivary Biomarkers", "Photonic Biosensing"]
  },

  // ---------- 博客：每篇文章在 blog/ 文件夹下一个 html 文件 ----------
  posts: [
    {
      title: "Hello World — Why I Built This Website",
      date: "2026-10-19",
      category: "Life",
      summary: "A first post introducing myself and what I plan to share here.",
      cover: "assets/img/placeholder.svg",
      url: "blog/hello-world.html"
    }
  ],

  // ---------- 相册 ----------
  gallery: [
    { src: "assets/img/placeholder.svg", caption: "Photo caption" },
    { src: "assets/img/placeholder.svg", caption: "Photo caption" },
    { src: "assets/img/placeholder.svg", caption: "Photo caption" }
  ],

  // ---------- 技能（TODO: 按实际情况修改）----------
  skills: [
    { group: "Biosensing & Wet Lab", items: ["Lateral Flow Assays", "Plasmonic Nanomaterials", "Immunoassays"] },
    { group: "Engineering", items: ["Mechanical Design", "CAD", "3D Printing"] },
    { group: "Programming", items: ["Python", "MATLAB"] },
    { group: "Languages", items: ["English (Fluent)", "Chinese (Native)"] }
  ],

  // ---------- CV 页面上的摘要（PDF 之外的网页版简历）----------
  education: [
    { school: "University of Illinois Urbana-Champaign", degree: "Ph.D. in Bioengineering", date: "2022 – Present", note: "Advisor: Prof. Brian T. Cunningham" },
    { school: "University of Illinois Urbana-Champaign", degree: "B.S. in Mechanical Engineering", date: "2022", note: "" },
    { school: "Zhejiang University (ZJU-UIUC Institute)", degree: "B.S. in Mechanical Engineering", date: "2022", note: "" }
  ],
  experience: [
    { role: "Graduate Research Assistant", org: "Nanosensors Group, UIUC", date: "2022 – Present", bullets: ["Developing plasmon-enhanced lateral flow assays for ultrasensitive point-of-care detection of infectious diseases."] },
    // TODO: Teaching Assistant 的 date 填学期
    { role: "Teaching Assistant", org: "BIOE/ECE 415 Biomedical Instrumentation Lab, UIUC", date: "", bullets: ["Supported laboratory instruction in biomedical instrumentation for undergraduate students."] },
    { role: "Undergraduate Research Assistant", org: "ZJU-UIUC Institute, Zhejiang University", date: "2021", bullets: ["Designed and optimized a re-localizable remote-center-of-motion mechanism for minimally invasive surgical robotics (IEEE ICARM 2021)."] }
  ]
};
