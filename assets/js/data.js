/* =========================================================
 * 网站内容都在这个文件里修改（姓名、简介、News、论文、项目、博客、相册……）
 * 改完保存，刷新网页即可看到效果。
 * 图片路径都是相对网站根目录，例如 "assets/img/projects/xxx.jpg"
 * 任何列表留空 [] 时，对应板块会自动隐藏。
 * 标有 TODO 的地方是还需要你确认或补充的。
 *
 * 【中英文】任何文字都可以写成 { en: "English", zh: "中文" }，网页右上角切换语言时自动显示对应版本；
 *          只写一个字符串则中英文都显示同一内容（如论文标题、人名）。
 *          日期写英文即可（如 "Sep 2022 – Present"），中文模式会自动显示为 "2022.09 – 至今"。
 * ========================================================= */

window.SITE = {
  name: "Anqi Tan",               // 英文名：首页标题 + 论文作者列表里自动加粗（保持纯文本）
  nameZh: "谭安琪",               // 中文模式下的首页标题
  brand: { en: "Anqi Tan", zh: "谭安琪" },   // 左上角显示的名字
  title: { en: "Ph.D. Student in Bioengineering · University of Illinois Urbana-Champaign", zh: "伊利诺伊大学厄巴纳-香槟分校 · 生物工程博士生" },
  photo: "assets/img/photo.jpg",  // 首页头像
  cv: "assets/cv.pdf",            // CV PDF 路径
  updated: "Oct 23, 2026",        // 页脚 "Last updated"

  // 首页自我介绍：每个字符串是一段。可用 <strong>加粗</strong> 和 <a href="...">链接</a>
  intro: {
    en: [
      "I am a Ph.D. student in <strong>Bioengineering</strong> at <strong>UIUC</strong>, working with <a href=\"https://nano.ece.illinois.edu/people/brian-t-cunningham/\" target=\"_blank\">Prof. Brian T. Cunningham</a> in the <a href=\"https://nano.ece.illinois.edu\" target=\"_blank\">Nanosensors Group</a>. I build <strong>biosensing devices for point-of-care diagnostics</strong>: <strong>portable optical readers</strong>, together with the <strong>hardware and software</strong> that turn ultrasensitive plasmon-enhanced lateral flow tests into quantitative measurements, with applications from infectious disease detection to real-time hormone monitoring.",
      "I am passionate about bridging biomedical monitoring with engineering so that people can better understand their own health. Before my Ph.D., I received B.S. degrees in Mechanical Engineering from both UIUC and Zhejiang University, where I led a national-level research project on surgical robot mechanism design and was product leader of an intelligent cell culture platform that won a <strong>National Silver Medal</strong> in the China \"Internet+\" Competition.",
      "🙋 Feel free to reach out via <a href=\"mailto:anqitan2@illinois.edu\">email</a> if you are interested in my research."
    ],
    zh: [
      "我是<strong>伊利诺伊大学厄巴纳-香槟分校（UIUC）生物工程系</strong>的博士生，师从 <a href=\"https://nano.ece.illinois.edu/people/brian-t-cunningham/\" target=\"_blank\">Brian T. Cunningham 教授</a>，就读于 <a href=\"https://nano.ece.illinois.edu\" target=\"_blank\">Nanosensors Group（纳米传感器课题组）</a>。我做的是<strong>面向即时诊断（POC）的生物传感器件</strong>：<strong>便携式光学读取仪</strong>，以及把超灵敏的等离激元增强侧向流检测（LFA）变成定量结果的<strong>硬件与软件</strong>，应用范围从传染病检测到实时激素监测。",
      "我希望把生物医学监测与工程设计结合起来，让每个人都能更好地了解自己的身体状况。博士之前，我获得了 UIUC 与浙江大学的机械工程双学士学位；本科期间主持了国家级大学生创新训练项目，研究微创手术机器人机构设计，并作为产品负责人参与“智能细胞培养平台”项目，获得中国“互联网+”大学生创新创业大赛<strong>全国银奖</strong>。",
      "🙋 如果你对我的研究感兴趣，欢迎通过<a href=\"mailto:anqitan2@illinois.edu\">邮件</a>联系我。"
    ]
  },

  social: {
    email: "anqitan2@illinois.edu",          // 主邮箱
    emailAlt: "angie.anqi.tan@gmail.com",    // 备用邮箱（只在联系页和页脚显示）
    scholar: "https://scholar.google.com/citations?user=SkxZzOoAAAAJ",
    orcid: "https://orcid.org/0009-0003-4013-5508",
    github: "",                   // TODO: 想放的话填 "https://github.com/AnqiTan"
    linkedin: "https://www.linkedin.com/in/anqi-tan-35521a228"
  },

  // ---------- 首页 News：日期 + 一句话，新的放最上面 ----------
  news: [
    { date: "Nov 2026", text: {
      en: "I will give an <strong>oral presentation</strong> on our portable plasmonic-fluor-enhanced lateral flow assay for salivary cortisol at the <strong><a href=\"https://www.apha.org/events-and-meetings/apha-calendar/2026-apha-annual-meeting-and-expo\" target=\"_blank\">APHA 2026 Annual Meeting and Expo</a></strong> in San Antonio (Nov 3).",
      zh: "我将在圣安东尼奥举行的 <strong><a href=\"https://www.apha.org/events-and-meetings/apha-calendar/2026-apha-annual-meeting-and-expo\" target=\"_blank\">APHA 2026 年会</a></strong>上就便携式 plasmonic-fluor 增强侧向流唾液皮质醇检测做<strong>口头报告</strong>（11 月 3 日）。" } },
    { date: "Oct 2026", text: {
      en: "Presenting posters on our portable cortisol platform and its community acceptability at the <strong><a href=\"https://www.selectbioconferences.com/loacwc2026\" target=\"_blank\">Lab-on-a-Chip and Microfluidics World Congress 2026</a></strong> (Laguna Hills, CA) and the <strong><a href=\"https://www.osfinnovation.org/invent/innovation-academic-incubator/jump-arches/health-care-engineering-systems-symposium\" target=\"_blank\">Jump ARCHES Health Care Engineering Systems Symposium</a></strong> (Peoria, IL).",
      zh: "在 <strong><a href=\"https://www.selectbioconferences.com/loacwc2026\" target=\"_blank\">2026 芯片实验室与微流控世界大会</a></strong>（加州 Laguna Hills）和 <strong><a href=\"https://www.osfinnovation.org/invent/innovation-academic-incubator/jump-arches/health-care-engineering-systems-symposium\" target=\"_blank\">Jump ARCHES 医疗工程系统研讨会</a></strong>（伊利诺伊州 Peoria）展示便携式皮质醇检测平台及其社区可接受性研究的海报。" } },
    { date: "Sep 2026", text: {
      en: "Presented two posters on real-time salivary cortisol sensing and its community acceptability at the <strong><a href=\"https://personalizednutrition.research.illinois.edu/2026-pn-innovation-day/\" target=\"_blank\">2026 Personalized Nutrition Innovation Day</a></strong>.",
      zh: "在 <strong><a href=\"https://personalizednutrition.research.illinois.edu/2026-pn-innovation-day/\" target=\"_blank\">2026 个性化营养创新日</a></strong>展示两张海报：实时唾液皮质醇检测，以及其在社区中的可接受性研究。" } },
    { date: "May 2026", text: {
      en: "Our critical review <strong><a href=\"https://pubs.rsc.org/lc/article/26/10/2948/1230310\" target=\"_blank\">Point of Care Molecular Cancer Diagnostics</a></strong> was published in <strong>Lab on a Chip</strong>.",
      zh: "我们的综述 <strong><a href=\"https://pubs.rsc.org/lc/article/26/10/2948/1230310\" target=\"_blank\">Point of Care Molecular Cancer Diagnostics</a></strong> 发表于 <strong>Lab on a Chip</strong>。" } },
    { date: "Feb 2026", text: {
      en: "Our paper on an <strong><a href=\"https://doi.org/10.1021/acsnanomed.5c00150\" target=\"_blank\">ultrasensitive point-of-care antigen test for <em>Neisseria gonorrhoeae</em></a></strong> using plasmon-enhanced lateral flow assays was published in <strong>ACS Nano Medicine</strong>.",
      zh: "我们基于等离激元增强侧向流检测的<strong><a href=\"https://doi.org/10.1021/acsnanomed.5c00150\" target=\"_blank\">淋病奈瑟菌超灵敏即时抗原检测</a></strong>论文发表于 <strong>ACS Nano Medicine</strong>。" } },
    { date: "Nov 2025", text: {
      en: "🏆 Our team won <strong>First Place</strong> in the <a href=\"https://odsr.illinois.edu/2025-ashby-prize-in-computational-science-hackathon-winners-streamline-crispr-screening-with-ai/\" target=\"_blank\">2025 Ashby Prize in Computational Science Hackathon</a> at NCSA for using LLMs to predict CRISPR screen outcomes.",
      zh: "🏆 我们团队在 NCSA <a href=\"https://odsr.illinois.edu/2025-ashby-prize-in-computational-science-hackathon-winners-streamline-crispr-screening-with-ai/\" target=\"_blank\">2025 Ashby Prize 计算科学黑客松</a>中获得<strong>第一名</strong>，项目利用大语言模型预测 CRISPR 筛选结果。" } },
    { date: "Oct 2025", text: {
      en: "Presented our first-generation LFA scanning device for real-time salivary cortisol at the <strong><a href=\"https://personalizednutrition.research.illinois.edu/2025-pn-innovation-day/\" target=\"_blank\">2025 Personalized Nutrition Innovation Day</a></strong>. [<a href=\"https://personalizednutrition.research.illinois.edu/files/2025/10/2025_PN_Innovation-Day_DigitalBooklet.pdf#page=38\" target=\"_blank\">Abstract</a>]",
      zh: "在 <strong><a href=\"https://personalizednutrition.research.illinois.edu/2025-pn-innovation-day/\" target=\"_blank\">2025 个性化营养创新日</a></strong>展示第一代实时唾液皮质醇侧向流扫描设备。[<a href=\"https://personalizednutrition.research.illinois.edu/files/2025/10/2025_PN_Innovation-Day_DigitalBooklet.pdf#page=38\" target=\"_blank\">摘要</a>]" } },
    { date: "Sep 2025", text: {
      en: "Our collaborative project with WashU and UCSF on point-of-care phenotyping of sepsis and ARDS was funded by the <strong>Department of Defense</strong> ($4.87M). [<a href=\"https://source.washu.edu/2025/09/4-87-million-grant-supports-development-of-sepsis-diagnostic-device/\" target=\"_blank\">WashU</a>] [<a href=\"https://bioengineering.illinois.edu/news/sepsis-ards-detection\" target=\"_blank\">Illinois</a>]",
      zh: "我们与圣路易斯华盛顿大学、UCSF 合作的脓毒症与 ARDS 表型即时检测项目获<strong>美国国防部</strong>资助（487 万美元）。[<a href=\"https://source.washu.edu/2025/09/4-87-million-grant-supports-development-of-sepsis-diagnostic-device/\" target=\"_blank\">WashU 报道</a>] [<a href=\"https://bioengineering.illinois.edu/news/sepsis-ards-detection\" target=\"_blank\">UIUC 报道</a>]" } },
    { date: "Jul 2025", text: {
      en: "Our review <strong><a href=\"https://doi.org/10.1021/acs.chemrev.4c00653\" target=\"_blank\">Photonic Crystal Grating Resonance and Interfaces for Health Diagnostic Technologies</a></strong> was published in <strong>Chemical Reviews</strong>.",
      zh: "我们的综述 <strong><a href=\"https://doi.org/10.1021/acs.chemrev.4c00653\" target=\"_blank\">Photonic Crystal Grating Resonance and Interfaces for Health Diagnostic Technologies</a></strong> 发表于 <strong>Chemical Reviews</strong>。" } },
    { date: "May 2024", text: {
      en: "Our team received an <strong>Honorable Mention</strong> in the <a href=\"https://ai.ncsa.illinois.edu/2024-hackathon-winners-announced/\" target=\"_blank\">2024 Ashby Prize in Computational Science Hackathon</a> for an LLM-automated gravitational wave detection workflow.",
      zh: "我们团队在 <a href=\"https://ai.ncsa.illinois.edu/2024-hackathon-winners-announced/\" target=\"_blank\">2024 Ashby Prize 计算科学黑客松</a>中获得<strong>荣誉奖</strong>，项目利用大语言模型自动化引力波探测工作流。" } },
    { date: "Feb 2023", text: {
      en: "Our review on <strong><a href=\"https://doi.org/10.3390/bios13020298\" target=\"_blank\">HIV self-testing technologies</a></strong> was published in <strong>Biosensors</strong>.",
      zh: "我们关于 <strong><a href=\"https://doi.org/10.3390/bios13020298\" target=\"_blank\">HIV 自检技术</a></strong>的综述发表于 <strong>Biosensors</strong>。" } },
    { date: "2022", text: {
      en: "Graduated with B.S. degrees in Mechanical Engineering from UIUC and Zhejiang University, and joined the <strong><a href=\"https://nano.ece.illinois.edu\" target=\"_blank\">Nanosensors Group</a></strong> at UIUC as a Ph.D. student.",
      zh: "获得 UIUC 与浙江大学机械工程双学士学位，加入 UIUC <strong><a href=\"https://nano.ece.illinois.edu\" target=\"_blank\">Nanosensors Group</a></strong> 攻读博士学位。" } }
  ],
  newsLimit: 6,                   // 首页最多显示几条，多余的折叠在 "Show more" 里

  // ---------- 论文：selected: true 的会显示在首页 ----------
  // venue: 左侧徽章文字；badge: 徽章下的小标签；image: 缩略图（可留空）；imageCredit: 图片出处（转载他人/期刊图片时必填）
  // ⚠️ 只能用 CC BY 等开放许可论文的图，或你自己制作的图。ACS / IEEE / Elsevier 版权论文的图不要直接放。
  // links: 按钮名 → 链接（如 PAPER / PDF / CODE / SLIDES），留空的不显示；作者里你的名字自动加粗
  publications: [
    {
      selected: true,
      venue: "In Prep.",
      badge: "First Author",
      image: "",
      title: "Pocket Size Lateral Flow Assay Scanner for Plasmonic Fluor Tagged Paper Test Strip Assays",
      authors: "Anqi Tan, Han Keun Lee, Yuxiong Liu, Liang-ching Chen, Leyang Liu, Siyi Li, Xiaoyang Chu, Saurabh Umrao, Xing Wang, Srikanth Singamaneni, and Brian T. Cunningham",
      venueFull: "Manuscript in preparation",
      highlights: [],
      links: {},
      bibtex: ""
    },
    {
      selected: true,
      venue: "APHA'26",
      badge: "Oral",
      image: "assets/img/projects/cortisol-assay-principle.jpg",
      title: "Portable Plasmonic Fluor-Enhanced Lateral Flow Assay for Quantitative Salivary Cortisol Measurement in Community Settings",
      authors: "Anqi Tan, Kai-Ning Wang, Tasfia Ashrafee, Ami Patel, Yuxiong Liu, Saurabh Umrao, Srikanth Singamaneni, Jenna L. Riis, Jacinda K. Dariotis, and Brian T. Cunningham",
      venueFull: "APHA 2026 Annual Meeting and Expo, San Antonio, TX. Accepted for oral presentation, Nov 3, 2026",
      highlights: [{ en: "First author · Also presented at LOAC 2026, Jump ARCHES 2026, and PNI Innovation Day 2026", zh: "第一作者 · 同时在 LOAC 2026、Jump ARCHES 2026 和 2026 个性化营养创新日展示" }],
      links: { MEETING: "https://www.apha.org/events-and-meetings/apha-calendar/2026-apha-annual-meeting-and-expo" },
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
      image: "assets/img/projects/ng-plfa.jpg",
      imageCredit: "Fig. 1, Liu, Jiang, Tan et al., ACS Nano Medicine 2026",
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
      image: "assets/img/papers/chemrev-2025-fig6.jpg",
      imageCredit: { en: "Fig. 6, Bhaskar et al., Chem. Rev. 2025 (figure made by Anqi Tan)", zh: "Fig. 6，Bhaskar et al., Chem. Rev. 2025（由谭安琪制作）" },
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
      selected: true,
      venue: "ICARM'21",
      badge: "First Author",
      image: "assets/img/projects/rcm-cad.jpg",
      imageCredit: "Fig. 3, Tan et al., IEEE ICARM 2021 (© 2021 IEEE)",
      title: "Design Optimization of a Mechanically Constrained Re-Localizable Remote-Center-of-Motion",
      authors: "Anqi Tan, Shenwei Chen, Hanyu Gan, and Liangjing Yang",
      venueFull: "2021 6th IEEE International Conference on Advanced Robotics and Mechatronics (ICARM). 2021",
      highlights: [],
      links: { PAPER: "https://doi.org/10.1109/ICARM52023.2021.9536150" },
      bibtex: "@inproceedings{tan2021design,\n  title = {Design Optimization of a Mechanically Constrained Re-Localizable Remote-Center-of-Motion},\n  author = {Tan, Anqi and Chen, Shenwei and Gan, Hanyu and Yang, Liangjing},\n  booktitle = {2021 6th IEEE International Conference on Advanced Robotics and Mechatronics (ICARM)},\n  year = {2021},\n  doi = {10.1109/ICARM52023.2021.9536150}\n}"
    },
    {
      selected: false,
      venue: "Structures20",
      badge: "",
      image: "assets/img/papers/dragon-boat-2020.jpg",
      imageCredit: { en: "Adapted from Figs. 6, 7 & 9, Feng, Zhang, Tan et al., Structures20 (2020)", zh: "改编自 Fig. 6、7、9，Feng, Zhang, Tan et al., Structures20（2020）" },
      title: "Utilization of 3D Printing for Concrete Dragon Boat Model",
      authors: "Y.Q. Feng, K.H. Zhang, <strong>A.Q. Tan</strong>, K. Ma, and Y. Xiao",
      venueFull: "The 2020 Structures Congress (Structures20), in the 2020 World Congress on Advances in Civil, Environmental, & Materials Research (ACEM20), Seoul, Korea, Aug 25–28, 2020",
      highlights: [{ en: "🏆 The dragon boat won the Outstanding Performance and Innovation Award at the 1st International Concrete Dragon Boat Competition (American Concrete Institute & Zhejiang University, 2019)", zh: "🏆 龙舟作品获首届国际大学生混凝土龙舟比赛“杰出表现及创新奖”（美国混凝土协会 & 浙江大学，2019）" }],
      links: { PDF: "http://www.i-asem.org/publication_conf/structures20/7.CD/1.CD671/CD2671_6751F1.pdf" },
      bibtex: "@inproceedings{feng2020utilization,\n  title = {Utilization of 3D Printing for Concrete Dragon Boat Model},\n  author = {Feng, Y.Q. and Zhang, K.H. and Tan, A.Q. and Ma, K. and Xiao, Y.},\n  booktitle = {The 2020 Structures Congress (Structures20)},\n  address = {Seoul, Korea},\n  year = {2020}\n}"
    }
  ],

  // ---------- 项目：status 为 "current" 或 "past"；featured: true 的显示在首页 ----------
  // image 留空则不显示图片。项目图请用自己的照片/示意图，放在 assets/img/projects/
  // meta 的键名（Role / Lab / Advisor / Collaborators / Period）会自动翻译，值可写 {en, zh}
  projects: [
    {
      title: { en: "Point-of-Care Molecular Phenotyping of Sepsis and ARDS (DoD PRMRP)", zh: "脓毒症与 ARDS 分子表型的即时检测（美国国防部 PRMRP 项目）" },
      status: "current",
      featured: true,
      image: "assets/img/projects/dod-multiplex-lfa.png",
      summary: {
        en: "A $4.87M Department of Defense project to build a rapid blood test and handheld reader that measures IL-8 and sTNFR-1 on a single multiplexed plasmonic-fluor lateral flow strip and classifies critically ill patients into hyperinflammatory or hypoinflammatory phenotypes at the bedside, including in military and resource-limited settings. I lead the development of the portable, field-deployable fluorescence reader.",
        zh: "美国国防部资助的 487 万美元项目：开发快速血液检测与手持式读取仪，在一条多重 plasmonic-fluor 侧向流试纸上同时检测 IL-8 和 sTNFR-1，并在床旁将危重患者分为高炎症型或低炎症型表型，可用于军事和资源有限的场景。我负责便携式、可现场部署的荧光读取仪的研发。" },
      meta: {
        "Role": { en: "Lead developer, portable fluorescence reader", zh: "便携式荧光读取仪 研发负责人" },
        "Collaborators": { en: "Prof. Pratik Sinha (Stanford), Prof. Srikanth Singamaneni (WashU), Prof. Carolyn Calfee (UCSF)", zh: "Pratik Sinha 教授（斯坦福大学）、Srikanth Singamaneni 教授（圣路易斯华盛顿大学）、Carolyn Calfee 教授（加州大学旧金山分校）" },
        "Funding": { en: "DoD Peer Reviewed Medical Research Program, Award HT9425-25-1-0825", zh: "美国国防部 PRMRP，项目号 HT9425-25-1-0825" },
        "Period": "2025 – Present"
      },
      link: "https://bioengineering.illinois.edu/news/sepsis-ards-detection"
    },
    {
      title: { en: "Pocket-Size Lateral Flow Assay Scanner for Plasmonic-Fluor-Tagged Test Strips", zh: "面向 Plasmonic-Fluor 标记试纸条的口袋式侧向流检测扫描仪" },
      status: "current",
      featured: true,
      image: "assets/img/projects/reader-render.jpg",
      summary: {
        en: "Designing a low-cost ($87 in parts), pocket-size (66 × 68 × 95 mm) near-infrared fluorescence reader for plasmonic-fluor-tagged paper test strips, built on a Raspberry Pi with 750 nm LED excitation, optical filtering, phone-controlled acquisition, and automated T/C quantification in about 20 seconds per strip. Its readings agree with a laboratory ImageQuant scanner (R² = 0.99, 3.2% CV) at a fraction of the size and cost. This reader is also the device platform for our DoD sepsis/ARDS project. First-author manuscript in preparation.",
        zh: "设计一款低成本（物料约 87 美元）、口袋大小（66 × 68 × 95 mm）的近红外荧光读取仪，用于读取 plasmonic-fluor 标记的纸基试纸条：基于树莓派，750 nm LED 激发、光学滤波、手机控制采集与自动 T/C 定量，读一条试纸约 20 秒。读数与实验室 ImageQuant 扫描仪高度一致（R² = 0.99，CV 3.2%），而体积和成本大幅降低。该读取仪也是我们国防部脓毒症/ARDS 项目的设备平台。第一作者论文撰写中。" },
      meta: {
        "Role": { en: "Lead researcher", zh: "项目负责人" },
        "Lab": { en: "Nanosensors Group, UIUC", zh: "UIUC Nanosensors Group" },
        "Collaborators": { en: "Singamaneni Lab (WashU)", zh: "圣路易斯华盛顿大学 Singamaneni 课题组" },
        "Period": "Sep 2022 – Present"
      },
      link: ""
    },
    {
      title: { en: "Live Hormone: Competitive LFA Platform for Real-Time Testosterone, Cortisol, and Progesterone Monitoring", zh: "Live Hormone：基于竞争法侧向流检测的睾酮、皮质醇与孕酮实时监测平台" },
      status: "current",
      featured: true,
      image: "assets/img/projects/reader-phone.jpg",
      summary: {
        en: "Developing a competitive plasmonic-fluor-enhanced lateral flow assay (PF-LFA) with a phone-controlled portable reader for real-time monitoring of salivary hormones in community settings. The cortisol assay reaches a reported detection limit of ≤0.12 ng/mL, covering the physiological range, and saliva has been collected from 153 adults in laboratory and community settings. In a companion mixed-methods study, 95% of participants would recommend the device. Presented at APHA 2026 (oral), LOAC 2026, Jump ARCHES 2026, and PNI Innovation Day 2025–2026.",
        zh: "开发竞争法 plasmonic-fluor 增强侧向流检测（PF-LFA）与手机控制的便携读取仪，用于在社区场景中实时监测唾液激素。皮质醇检测的报告检测限 ≤0.12 ng/mL，覆盖生理浓度范围；已在实验室和社区采集 153 名成人的唾液样本。在配套的混合方法研究中，95% 的参与者愿意推荐该设备。成果在 APHA 2026（口头报告）、LOAC 2026、Jump ARCHES 2026 及 2025–2026 个性化营养创新日展示。" },
      meta: {
        "Role": { en: "Lead researcher", zh: "项目负责人" },
        "Lab": { en: "Nanosensors Group, UIUC", zh: "UIUC Nanosensors Group" },
        "Collaborators": { en: "Prof. Jenna L. Riis, Prof. Jacinda K. Dariotis (UIUC), Singamaneni Lab (WashU)", zh: "Jenna L. Riis 教授、Jacinda K. Dariotis 教授（UIUC）、圣路易斯华盛顿大学 Singamaneni 课题组" },
        "Funding": { en: "UIUC Personalized Nutrition Initiative Seed Grant, NSF, Jump ARCHES", zh: "UIUC 个性化营养计划种子基金、美国国家科学基金会（NSF）、Jump ARCHES" },
        "Period": "Sep 2024 – Present"
      },
      link: ""
    },
    {
      title: { en: "Plasmon-Enhanced Lateral Flow Assays for Infectious Disease Detection", zh: "等离激元增强侧向流检测用于传染病诊断" },
      status: "current",
      featured: false,
      image: "assets/img/projects/ng-plfa.jpg",
      imageCredit: "Fig. 1, Liu, Jiang, Tan et al., ACS Nano Medicine 2026",
      summary: {
        en: "Contributing to plasmon-enhanced lateral flow assays (p-LFAs) for ultrasensitive point-of-care detection of infectious-disease antigens and nucleic acids, including SARS-CoV-2 and Neisseria gonorrhoeae (ACS Nano Medicine 2026).",
        zh: "参与等离激元增强侧向流检测（p-LFA）研究，用于新冠病毒、淋病奈瑟菌等传染病抗原和核酸的超灵敏即时检测（ACS Nano Medicine 2026）。" },
      meta: {
        "Lab": { en: "Nanosensors Group, UIUC", zh: "UIUC Nanosensors Group" },
        "Collaborators": { en: "Singamaneni Lab & WashU School of Medicine", zh: "圣路易斯华盛顿大学 Singamaneni 课题组及医学院" },
        "Period": "2022 – Present"
      },
      link: "https://doi.org/10.1021/acsnanomed.5c00150"
    },
    {
      title: { en: "Mimicry Stage Lighting Control System (Senior Design)", zh: "Mimicry 舞台灯光控制系统（本科毕业设计）" },
      status: "past",
      featured: false,
      image: "assets/img/projects/stage-lighting.jpg",
      summary: {
        en: "ECE 445 senior design (Team #29): a portable stage-lighting system in which the light follows the operator's hand in real time. A handheld joystick (ESP32 + MPU9250 posture sensor) streams its orientation over WiFi to a central server, which maps it to pitch/roll commands for a servo-driven two-axis light arm; a music-analysis module (beat/energy tracking plus a self-trained emotion-recognition network) generates the LED color sequence. As the team's mechanical engineer, I designed the two-axis manipulator (forward/inverse kinematics simulated in MATLAB, torque analysis with Euler–Lagrange and Newton–Euler methods) and the 3D-printed and laser-cut structure, designed for assembly, maintenance, and portability (fits in a 40 L bag, 9.3 kg, 4.5 h battery life).",
        zh: "ECE 445 本科毕业设计（第 29 组）：一套便携式舞台灯光系统，灯光实时“模仿”操作者手部动作。手持控制器（ESP32 + MPU9250 姿态传感器）通过 WiFi 把姿态发送到中央服务器，转换为舵机驱动的两轴灯臂的俯仰/横滚指令；音乐分析模块（节拍、能量追踪 + 自训练情绪识别网络）生成 LED 颜色序列。我作为团队中的机械工程成员，负责两轴机械臂设计（MATLAB 正/逆运动学仿真，用欧拉–拉格朗日与牛顿–欧拉方法计算力矩）以及 3D 打印和激光切割结构，兼顾可装配、可维护与便携性（可装入 40 L 背包，重 9.3 kg，续航 4.5 小时）。" },
      meta: {
        "Role": { en: "Mechanical design lead", zh: "机械设计负责人" },
        "Team": { en: "Ruiqi Li (ECE), Haozhe Chen (ECE), Zhaohua Yang (EE), Anqi Tan (ME)", zh: "Ruiqi Li（ECE）、Haozhe Chen（ECE）、Zhaohua Yang（EE）、谭安琪（ME）" },
        "Period": "Feb 2022 – May 2022"
      },
      links: {
        SLIDES: "assets/files/mimicry-stage-lighting-final-presentation.pdf",
        GITHUB: "https://github.com/RickyL-2000/ECE445Project",
        DEMO: "https://www.youtube.com/watch?v=zT2t5CBC0IQ"
      },
      link: ""
    },
    {
      title: { en: "EEG-Based Sleep Assistance and Fatigue Monitoring (Industry Internship)", zh: "基于脑电的辅助睡眠与疲劳监测（企业实习）" },
      status: "past",
      featured: false,
      image: "",
      summary: {
        en: "Research assistant intern at the Institute of Brain Science of BrainCo (Zhejiang Qiangnao Technology). Completed research tasks for two projects: sleep assisted by acoustic and electrical stimulation, and fatigue monitoring with multimodal EEG.",
        zh: "在浙江强脑科技（BrainCo）脑科学研究院担任研究助理实习生，完成“声电刺激辅助睡眠”与“多模态脑电疲劳监测”两个项目的研究任务。" },
      meta: {
        "Role": { en: "Research assistant intern", zh: "研究助理实习生" },
        "Lab": { en: "Institute of Brain Science, BrainCo, Hangzhou", zh: "强脑科技 脑科学研究院，杭州" },
        "Period": "May 2022 – Aug 2022"
      },
      link: ""
    },
    {
      title: { en: "LLM-Based Prediction of CRISPR Screen Outcomes (Hackathon, 1st Place)", zh: "基于大语言模型的 CRISPR 筛选结果预测（黑客松第一名）" },
      status: "past",
      featured: false,
      image: "assets/img/projects/crispr-workflow.svg",
      summary: {
        en: "CRISPR Mechanism Explainer: a two-person project at the 2025 Ashby Prize in Computational Science Hackathon (NCSA) that uses large language models to predict whether a CRISPR gene perturbation changes a cellular phenotype, and to explain why. We found the public test set was almost entirely labeled \"hit\" (so an always-yes model looks accurate), rebuilt a balanced validation set with experimental-condition context, split the task into classification and mechanism reasoning, fine-tuned Qwen3 to generate three-sentence mechanistic explanations, and shipped a Gradio chat demo. Won First Place ($3,000).",
        zh: "CRISPR Mechanism Explainer：2025 Ashby Prize 计算科学黑客松（NCSA）两人团队项目，利用大语言模型判断 CRISPR 基因扰动是否改变细胞表型，并解释其机制。我们发现公开测试集几乎全部标为“命中”（一直回答“是”就能得高分），于是重建了带实验条件信息的平衡验证集；把任务拆成“分类”与“机制推理”两步，微调 Qwen3 生成三句话的机制解释，并做成 Gradio 聊天演示。获第一名（3000 美元）。" },
      meta: {
        "Team": "Jiahua Dong, Anqi Tan",
        "Period": "Oct 2025"
      },
      link: "https://ai.ncsa.illinois.edu/the-science-behind-the-2025-ashby-prize-in-computational-science-hackathon-winners-streamlining-crispr-screening-with-ai/"
    },
    {
      title: { en: "InitToWinIt: Automated Gravitational Wave Detection Workflow (Hackathon, Honorable Mention)", zh: "InitToWinIt：引力波探测自动化工作流（黑客松荣誉奖）" },
      status: "past",
      featured: false,
      image: "",
      summary: {
        en: "Built a streamlined code architecture using OpenAI services to automate the classification of gravitational waves from black hole collisions, using LLMs as a front-end to computational workflows. Honorable Mention at the 2024 Ashby Prize in Computational Science Hackathon (NCSA).",
        zh: "以大语言模型作为计算工作流的前端，基于 OpenAI 服务搭建精简的代码架构，自动化分类黑洞碰撞产生的引力波信号。获 2024 Ashby Prize 计算科学黑客松（NCSA）荣誉奖。" },
      meta: {
        "Team": "Anusha Verma Chandraju, Shengzhu Yin, Tanmoy Debnath, Anqi Tan, Jiahua Dong",
        "Period": "Apr 2024"
      },
      link: "https://ai.ncsa.illinois.edu/2024-hackathon-winners-announced/"
    },
    {
      title: { en: "Re-Localizable Remote-Center-of-Motion Mechanism for Minimally Invasive Surgery", zh: "面向微创手术的可重定位远程运动中心（RCM）机构" },
      status: "past",
      featured: true,
      image: "assets/img/projects/rcm-cad.jpg",
      imageCredit: "Fig. 3, Tan et al., IEEE ICARM 2021 (© 2021 IEEE)",
      summary: {
        en: "Led a national-level undergraduate research project to design and optimize a mechanically constrained, re-localizable remote-center-of-motion (RCM) mechanism for robot-assisted minimally invasive procedures. Published as first author at IEEE ICARM 2021.",
        zh: "主持国家级大学生创新训练项目，设计并优化一种机械约束式、可重定位的远程运动中心（RCM）机构，用于机器人辅助微创手术。以第一作者发表于 IEEE ICARM 2021。" },
      meta: {
        "Role": { en: "Project leader (National-Level Undergraduate Research Training Program)", zh: "项目负责人（国家级大学生创新训练项目）" },
        "Advisor": { en: "Prof. Liangjing Yang, ZJU-UIUC Institute", zh: "浙大国际联合学院（ZJUI） Liangjing Yang 老师" },
        "Period": "Jun 2020 – Jun 2021"
      },
      link: "https://doi.org/10.1109/ICARM52023.2021.9536150"
    },
    {
      title: { en: "Intelligent Cell Culture Platform (China \"Internet+\" Competition)", zh: "智能细胞培养平台（“互联网+”大赛项目）" },
      status: "past",
      featured: false,
      image: "",
      summary: {
        en: "Served as product leader for a fully compatible intelligent cell culture platform built around an automated, modular manipulator for standardized cell production. The project received RMB 8 million in R&D funding and won a National Silver Medal (International Track).",
        zh: "担任产品负责人，打造以自动化、模块化“机械手”为核心技术的全兼容智能细胞培养平台，实现细胞生产的自动化与标准化。项目获得 800 万元研发资金支持，获“互联网+”大赛国际赛道全国银奖。" },
      meta: { "Role": { en: "Product leader", zh: "产品负责人" }, "Period": "2021" },
      link: ""
    },
    {
      title: { en: "Biocompatible Electrically Stimulated Band-Aid", zh: "高生物相容性电刺激创可贴" },
      status: "past",
      featured: false,
      image: "",
      summary: {
        en: "Independent research project on constructing a highly biocompatible, electrically stimulated wound dressing.",
        zh: "独立研究项目：构建一种高生物相容性的电刺激伤口敷料。" },
      meta: { "Role": { en: "Personal project", zh: "个人项目" }, "Advisor": { en: "Prof. Yong He, Zhejiang University", zh: "浙江大学 Yong He 老师" }, "Period": "Jun 2021 – Sep 2021" },
      link: ""
    },
    {
      title: { en: "Rapid Forming of Special-Shaped Concrete: 3D-Printed Concrete Dragon Boat", zh: "新型特殊异形混凝土快速成型技术研究：3D 打印混凝土龙舟" },
      status: "past",
      featured: false,
      image: "assets/img/gallery/dragon-boat-award.jpg",
      summary: {
        en: "Developed a rapid concrete-forming technique that uses a 3D-printed frame with a new lightweight-aggregate engineered cementitious composite (ECC), plus FRP ribs and fabrics as structural components, and applied it to build a concrete dragon boat. The boat won the Outstanding Performance and Innovation Award at the 1st International Concrete Dragon Boat Competition (American Concrete Institute & Zhejiang University), and the work was published at Structures20/ACEM20.",
        zh: "提出一种新型混凝土快速成型技术：以 3D 打印框架为骨架，采用新型轻骨料 ECC（高延性水泥基复合材料），并以 FRP 筋和 FRP 布作为结构构件，用于制作混凝土龙舟。作品获首届国际大学生混凝土龙舟比赛（美国混凝土协会、浙江大学主办）“杰出表现及创新奖”，论文发表于 Structures20/ACEM20 国际会议。" },
      meta: {
        "Role": { en: "Main member (School-Level Research Training Program)", zh: "主要成员（校级大学生科研训练项目）" },
        "Team": { en: "Yiqi Feng, Anqi Tan, Kaihang Zhang", zh: "冯亦奇、谭安琪、张开航" },
        "Advisor": { en: "Prof. Yan Xiao, ZJU-UIUC Institute & USC", zh: "浙大国际联合学院（ZJUI）/ 南加州大学 Yan Xiao 老师" },
        "Period": "Mar 2019 – May 2020"
      },
      link: "http://www.i-asem.org/publication_conf/structures20/7.CD/1.CD671/CD2671_6751F1.pdf"
    },
    {
      title: { en: "Camera Tracking Method for a Manipulated Endoscope", zh: "机器人操控内窥镜的相机跟踪方法" },
      status: "past",
      featured: false,
      image: "",
      summary: {
        en: "Led a team implementing a camera tracking method for a robot-manipulated endoscope.",
        zh: "带领团队实现一种用于机器人操控内窥镜的相机跟踪方法。" },
      meta: { "Role": { en: "Team leader", zh: "团队负责人" }, "Advisor": { en: "Prof. Liangjing Yang, ZJU-UIUC Institute", zh: "浙大国际联合学院（ZJUI） Liangjing Yang 老师" }, "Period": "Jun 2019 – Aug 2019" },
      link: ""
    },
    {
      title: { en: "Single-Motor Legged Robots", zh: "单电机驱动足式机器人" },
      status: "past",
      featured: false,
      image: "",
      summary: {
        en: "Designed all transmission mechanisms for a four-legged linkage robot and a two-legged cam robot, each driven by a single motor, through 5+ design iterations (3D models and physical prototypes), using GeoGebra and MATLAB to optimize gait. Completed the rough-terrain course and placed third in the race.",
        zh: "独立完成单电机驱动的四足连杆机器人与双足凸轮机器人全部传动机构设计，迭代 5 个以上版本（三维模型 + 实物），并用 GeoGebra 和 MATLAB 仿真优化运动轨迹与步态。完成复杂地形赛道并获竞速第三名。" },
      meta: { "Role": { en: "Project leader", zh: "项目负责人" }, "Period": "Oct 2020 – Dec 2020" },
      link: ""
    },
    {
      title: { en: "RoboMaster Competition Robot", zh: "RoboMaster 机甲大师比赛机器人" },
      status: "past",
      featured: false,
      image: "assets/img/gallery/robomaster-cad.jpg",
      summary: {
        en: "Designed the full mechanical structure of a competition robot, including motor selection, transmission, gimbal, buffer mechanism, and projectile system. Won First Prize in the college-level RoboMaster Mecha Master competition.",
        zh: "负责比赛机器人整体机械结构设计，包括电机选型、传动系统、云台、缓冲机构与发射机构。获 RoboMaster 机甲大师校级赛一等奖。" },
      meta: { "Role": { en: "Mechanical lead", zh: "机械负责人" }, "Period": "2019" },
      link: ""
    },
    {
      title: { en: "Intlife: Campus Life Interactive App", zh: "Intlife：校园生活互动 App" },
      status: "past",
      featured: false,
      image: "",
      summary: {
        en: "Led needs analysis, feasibility research, and product/UI design for a one-stop campus life platform, built simultaneously as a web app and WeChat mini-program with uni-app and a uniCloud cloud database.",
        zh: "负责需求分析、可行性调研与产品/界面设计，基于 uni-app 同时构建网页端与微信小程序，并用 uniCloud 搭建云数据库，打造一站式校园生活交流平台。" },
      meta: { "Role": { en: "Project leader", zh: "项目负责人" }, "Period": "2020" },
      link: ""
    }
  ],

  // ---------- Talks / 报告 ----------
  // 只放已确认的报告/海报；APHA Phase II（Wang et al., Submitted）待接收后再加
  talks: [
    { date: "Nov 2026", text: {
      en: "<strong>Oral presentation (accepted)</strong>: \"Portable plasmonic fluor-enhanced lateral flow assay for quantitative salivary cortisol measurement in community settings.\" <a href=\"https://www.apha.org/events-and-meetings/apha-calendar/2026-apha-annual-meeting-and-expo\" target=\"_blank\">APHA 2026 Annual Meeting and Expo</a>, San Antonio, TX, Nov 3, 2026.",
      zh: "<strong>口头报告（已接收）</strong>：便携式 plasmonic-fluor 增强侧向流检测定量测量社区唾液皮质醇。<a href=\"https://www.apha.org/events-and-meetings/apha-calendar/2026-apha-annual-meeting-and-expo\" target=\"_blank\">APHA 2026 年会</a>，美国德州圣安东尼奥，2026 年 11 月 3 日。" } },
    { date: "Oct 2026", text: {
      en: "<strong>Poster</strong>: \"A portable plasmonic fluor-enhanced lateral flow platform for quantitative salivary cortisol measurement.\" <a href=\"https://www.selectbioconferences.com/loacwc2026\" target=\"_blank\">Lab-on-a-Chip and Microfluidics World Congress 2026</a> (SelectBIO), Laguna Hills, CA.",
      zh: "<strong>海报</strong>：用于唾液皮质醇定量检测的便携式 plasmonic-fluor 增强侧向流平台。<a href=\"https://www.selectbioconferences.com/loacwc2026\" target=\"_blank\">2026 芯片实验室与微流控世界大会</a>（SelectBIO），美国加州 Laguna Hills。" } },
    { date: "Oct 2026", text: {
      en: "<strong>Poster</strong>: \"Portable plasmonic fluor-enhanced lateral flow assay for quantitative salivary cortisol measurement in community settings.\" <a href=\"https://www.osfinnovation.org/invent/innovation-academic-incubator/jump-arches/health-care-engineering-systems-symposium\" target=\"_blank\">Health Care Engineering Systems Symposium 2026</a> (Jump ARCHES), Peoria, IL.",
      zh: "<strong>海报</strong>：便携式 plasmonic-fluor 增强侧向流检测定量测量社区唾液皮质醇。<a href=\"https://www.osfinnovation.org/invent/innovation-academic-incubator/jump-arches/health-care-engineering-systems-symposium\" target=\"_blank\">2026 医疗工程系统研讨会</a>（Jump ARCHES），美国伊利诺伊州 Peoria。" } },
    { date: "Oct 2026", text: {
      en: "<strong>Poster (co-author)</strong>: \"Assessing the acceptability and feasibility of real-time salivary hormone feedback and implications for building trust in biomedical research: A mixed-methods study.\" <a href=\"https://www.osfinnovation.org/invent/innovation-academic-incubator/jump-arches/health-care-engineering-systems-symposium\" target=\"_blank\">Health Care Engineering Systems Symposium 2026</a> (Jump ARCHES), Peoria, IL.",
      zh: "<strong>海报（合作者）</strong>：实时唾液激素反馈的可接受性与可行性及其对建立生物医学研究信任的意义——混合方法研究。<a href=\"https://www.osfinnovation.org/invent/innovation-academic-incubator/jump-arches/health-care-engineering-systems-symposium\" target=\"_blank\">2026 医疗工程系统研讨会</a>（Jump ARCHES），美国伊利诺伊州 Peoria。" } },
    { date: "Sep 2026", text: {
      en: "<strong>Poster</strong>: \"Portable plasmonic fluor-enhanced lateral flow assay for quantitative salivary cortisol measurement in community settings.\" <a href=\"https://personalizednutrition.research.illinois.edu/2026-pn-innovation-day/\" target=\"_blank\">2026 Personalized Nutrition Innovation Day</a>, UIUC.",
      zh: "<strong>海报</strong>：便携式 plasmonic-fluor 增强侧向流检测定量测量社区唾液皮质醇。<a href=\"https://personalizednutrition.research.illinois.edu/2026-pn-innovation-day/\" target=\"_blank\">2026 个性化营养创新日</a>，UIUC。" } },
    { date: "Sep 2026", text: {
      en: "<strong>Poster (co-author)</strong>: \"Assessing the acceptability and feasibility of real-time salivary hormone feedback and implications for building trust in biomedical research: A mixed-methods study.\" <a href=\"https://personalizednutrition.research.illinois.edu/2026-pn-innovation-day/\" target=\"_blank\">2026 Personalized Nutrition Innovation Day</a>, UIUC.",
      zh: "<strong>海报（合作者）</strong>：实时唾液激素反馈的可接受性与可行性及其对建立生物医学研究信任的意义——混合方法研究。<a href=\"https://personalizednutrition.research.illinois.edu/2026-pn-innovation-day/\" target=\"_blank\">2026 个性化营养创新日</a>，UIUC。" } },
    { date: "Oct 2025", text: {
      en: "<strong>Poster</strong>: \"Validating a lateral flow assay (LFA) scanning device for real-time salivary cortisol assaying.\" <a href=\"https://personalizednutrition.research.illinois.edu/2025-pn-innovation-day/\" target=\"_blank\">2025 Personalized Nutrition Innovation Day</a>, UIUC. [<a href=\"https://personalizednutrition.research.illinois.edu/files/2025/10/2025_PN_Innovation-Day_DigitalBooklet.pdf#page=38\" target=\"_blank\">Abstract</a>]",
      zh: "<strong>海报</strong>：用于实时唾液皮质醇检测的侧向流扫描设备验证。<a href=\"https://personalizednutrition.research.illinois.edu/2025-pn-innovation-day/\" target=\"_blank\">2025 个性化营养创新日</a>，UIUC。[<a href=\"https://personalizednutrition.research.illinois.edu/files/2025/10/2025_PN_Innovation-Day_DigitalBooklet.pdf#page=38\" target=\"_blank\">摘要</a>]" } }
  ],

  // ---------- Teaching / 助教 ----------
  teaching: [
    { date: "Fall 2025", text: {
      en: "Graduate TA, <strong>BIOE 415 / ECE 415: Biomedical Instrumentation Lab</strong>, University of Illinois Urbana-Champaign (lab section AB2). [<a href=\"https://courses.illinois.edu/schedule/2025/fall/BIOE/415\" target=\"_blank\">Course Explorer</a>]",
      zh: "研究生助教，<strong>BIOE 415 / ECE 415：生物医学仪器实验</strong>，UIUC（实验课 AB2 班）。[<a href=\"https://courses.illinois.edu/schedule/2025/fall/BIOE/415\" target=\"_blank\">UIUC 课程官网</a>]" } },
    { date: "2020 – 2022", text: {
      en: "Undergraduate TA, <strong>ME 170: Computer-Aided Design</strong>, University of Illinois Urbana-Champaign (three spring semesters)",
      zh: "本科生助教，<strong>ME 170：计算机辅助设计</strong>，UIUC（连续三个春季学期）" } }
  ],

  // ---------- 奖项（首页和 CV 页都会显示）----------
  awards: [
    { name: { en: "First Place ($3,000), Ashby Prize in Computational Science Hackathon, NCSA, UIUC", zh: "UIUC NCSA Ashby Prize 计算科学黑客松 第一名（3000 美元）" }, date: "2025" },
    { name: { en: "Honorable Mention, Ashby Prize in Computational Science Hackathon, NCSA, UIUC", zh: "UIUC NCSA Ashby Prize 计算科学黑客松 荣誉奖" }, date: "2024" },
    { name: { en: "National Silver Medal, China \"Internet+\" Innovation and Entrepreneurship Competition", zh: "中国“互联网+”大学生创新创业大赛 全国银奖" }, date: "2021" },
    { name: { en: "First Prize, RoboMaster Mecha Master (College Level)", zh: "RoboMaster 机甲大师校级赛 一等奖" }, date: "2019" },
    { name: { en: "Outstanding Performance and Innovation Award, 1st International Concrete Dragon Boat Competition (ICDBC), American Concrete Institute & Zhejiang University", zh: "首届国际大学生混凝土龙舟比赛（ICDBC）杰出表现及创新奖（美国混凝土协会、浙江大学；国家级）" }, date: "2019" },
    { name: { en: "Third-Class Scholarship, Zhejiang University", zh: "浙江大学三等奖学金" }, date: "2019" },
    { name: { en: "Public Service Pacesetter, Zhejiang University", zh: "浙江大学公益服务标兵" }, date: "2019" },
    { name: { en: "Model of Social Work, Zhejiang University (twice)", zh: "浙江大学社会工作标兵（两次）" }, date: "2019, 2020" },
    { name: { en: "Second Place, Social Research Competition, as team leader (three times)", zh: "社会调研 二等奖（负责人，三次）" }, date: "2019 – 2020" },
    { name: { en: "Second Prize, Zhejiang Province Biology Olympiad", zh: "浙江省生物学奥林匹克竞赛 二等奖" }, date: "2017" }
  ],

  // ---------- Research 页面 ----------
  research: {
    statement: {
      en: "My research focuses on the device side of biosensing: low-cost, portable instruments that bring laboratory-grade diagnostics to the point of care. I design optical readers and the hardware and software around them (optics, mechanical housings, Raspberry Pi-based acquisition, and automated image quantification) for ultrasensitive plasmon-enhanced lateral flow tests, with applications ranging from infectious disease detection to real-time hormone monitoring, so that people can better understand and manage their own health.",
      zh: "我的研究聚焦于生物传感的器件端：低成本、便携的检测仪器，把实验室级别的诊断能力带到即时检测场景。我为超灵敏的等离激元增强侧向流检测设计光学读取仪，以及与之配套的硬件和软件（光路、机械结构、基于树莓派的采集与自动图像定量），应用范围涵盖传染病检测到实时激素监测，帮助人们更好地了解和管理自己的健康。" },
    interests: {
      en: ["Biosensing Devices", "Point-of-Care Diagnostics", "Portable Optical Readers & Instrumentation", "Hardware–Software Integration for Biomedical Measurement", "Plasmon-Enhanced Lateral Flow Tests", "Real-Time Hormone Monitoring"],
      zh: ["生物传感器件", "即时诊断（POC）", "便携式光学读取仪与仪器", "生物医学测量的软硬件集成", "等离激元增强侧向流检测", "实时激素监测"] }
  },

  // ---------- 博客：每篇文章在 blog/ 文件夹下一个 html 文件 ----------
  posts: [
    {
      title: { en: "Volunteer Teaching in Rural Guizhou, 2019: Looking Back", zh: "2019 贵州支教 | 回首展望" },
      date: "2019-09-17",
      category: { en: "Volunteering", zh: "支教" },
      summary: {
        en: "A week with the children of Jiaoma, Changshun County, as part of the ZJU Liaoyuan volunteer teaching team: what we taught, what we learned, and why it felt like a matcha candy.",
        zh: "作为浙大“燎原”支教团的一员，在贵州长顺县交麻与孩子们度过的一周：我们教了什么、学到了什么，以及为什么这段回忆像一颗抹茶糖。" },
      cover: "assets/img/blog/guizhou-2019/team.jpg",
      url: "blog/2019-guizhou-volunteer-teaching.html"
    }
  ],

  // ---------- 相册 ----------
  gallery: [
    // 图片：{ src, caption }；视频：{ video, poster, caption }。caption 可写 { en, zh }
    { src: "assets/img/gallery/graduation-bachelor.jpg", caption: { en: "Bachelor's graduation (2022)", zh: "本科毕业照（2022）" } },
    { src: "assets/img/gallery/zju-uiuc-seminar-1.jpg", caption: { en: "ZJU International Campus delegation visit to UIUC", zh: "浙大国际校区代表团访问 UIUC" } },
    { src: "assets/img/gallery/alaska-fishing.jpg", caption: { en: "Deep-sea fishing in Valdez, Alaska (2024)", zh: "阿拉斯加 Valdez 海钓（2024）" } },
    { src: "assets/img/gallery/zju-uiuc-seminar-2.jpg", caption: { en: "Group photo with the ZJU International Campus delegation at UIUC", zh: "浙大国际校区代表团访问 UIUC 合影" } },
    { src: "assets/img/gallery/wedding-bridesmaid.jpg", caption: { en: "Bridesmaid at a friend's wedding", zh: "在好友婚礼上当伴娘" } },
    { src: "assets/img/gallery/lake.jpg", caption: { en: "A summer day by the lake", zh: "夏日湖边" } },
    { src: "assets/img/gallery/dragon-boat-award.jpg", caption: { en: "Outstanding Performance & Innovation Award, 1st International Concrete Dragon Boat Competition (2019)", zh: "首届国际大学生混凝土龙舟赛 · 杰出表现及创新奖（2019）" } },
    { src: "assets/img/gallery/guizhou-team.jpg", caption: { en: "Volunteer teaching team in Changshun, Guizhou (2019)", zh: "贵州长顺支教团合影（2019）" } },
    { src: "assets/img/gallery/robomaster-cad.jpg", caption: { en: "CAD render of our RoboMaster competition robot", zh: "RoboMaster 比赛机器人 CAD 渲染图" } },
    { video: "assets/img/projects/stage-lighting-demo.mp4", poster: "assets/img/projects/stage-lighting-demo-poster.jpg", caption: { en: "Demo of our senior design: Mimicry Stage Lighting Control System (Feb–May 2022)", zh: "本科毕设演示：Mimicry 舞台灯光控制系统（2022.02–05）" } },
    { video: "assets/img/gallery/cat-team-robot.mp4", poster: "assets/img/gallery/cat-team-robot-poster.jpg", caption: { en: "Robot design animation · The CAT Team (Anqi Tan, Zheyuan Zhang, Junkai Zhang, Qian Chen)", zh: "机器人设计动画 · The CAT Team（谭安琪、Zheyuan Zhang、Junkai Zhang、Qian Chen）" } },
    { src: "assets/img/gallery/industry-visit-floor.jpg", caption: { en: "Learning about sheet-metal parts on a factory floor", zh: "企业参观：在车间了解钣金零件" } },
    { src: "assets/img/gallery/industry-visit-group.jpg", caption: { en: "Organized an industry visit for classmates", zh: "组织同学企业参观" } },
    { src: "assets/img/gallery/autumn-games.jpg", caption: { en: "Autumn Fun Games with the residential college", zh: "学园秋季趣味运动会" } },
    { src: "assets/img/gallery/friends-winter.jpg", caption: { en: "New Year's Eve wish-sharing event at the residential college", zh: "书院跨年心意传递活动" } }
  ],

  // ---------- 技能 ----------
  skills: [
    { group: { en: "Biosensing & Wet Lab", zh: "生物传感与湿实验" }, items: ["Lateral Flow Assays", "Plasmonic-Fluor Labels", "ELISA", "3D Cell Culture", "Fluorescence Staining"] },
    { group: { en: "Mechanical Design & CAD", zh: "机械设计与 CAD" }, items: ["SolidWorks", "Creo", "Inventor", "Fusion 360", "AutoCAD", "Blender"] },
    { group: { en: "Fabrication & Simulation", zh: "制造与仿真" }, items: ["3D Printing", "Melt Electrowriting", "COMSOL", "FEA"] },
    { group: { en: "Programming & Hardware", zh: "编程与硬件" }, items: ["Python", "MATLAB", "LabVIEW", "Arduino", { en: "Android App Development (Kotlin)", zh: "Android App 开发（Kotlin）" }] },
    { group: { en: "Languages", zh: "语言" }, items: [{ en: "English (Fluent)", zh: "英语（流利）" }, { en: "Chinese (Native)", zh: "中文（母语）" }] }
  ],

  // ---------- CV 页“下载简历”卡片：PDF 由 操作指南/生成CV 下的脚本生成 ----------
  resumes: [
    { tag: { en: "Academic", zh: "学术" }, title: { en: "Full Academic CV", zh: "完整学术简历" }, desc: { en: "All publications, presentations, honors, teaching, and service (3 pages).", zh: "包含全部论文、学术报告、荣誉、教学与服务经历（3 页）。" }, file: "assets/cv.pdf" },
    { tag: { en: "Industry", zh: "工业界" }, title: { en: "Optical & Hardware Systems", zh: "光学与硬件系统" }, desc: { en: "One-page resume emphasizing end-to-end instrument design: optics, mechanical, embedded hardware, and Android software.", zh: "一页版，突出仪器全链条设计：光学、机械、嵌入式硬件与 Android 软件。" }, file: "assets/resumes/anqi-tan-resume-hardware-systems.pdf" },
    { tag: { en: "Industry", zh: "工业界" }, title: { en: "Medical Devices & Instrumentation", zh: "医疗器械与仪器" }, desc: { en: "One-page resume emphasizing portable reader design, optics, and mechanical engineering.", zh: "一页版，突出便携读取仪、光学与机械设计。" }, file: "assets/resumes/anqi-tan-resume-medical-device.pdf" },
    { tag: { en: "Industry", zh: "工业界" }, title: { en: "Diagnostic Devices", zh: "诊断器械" }, desc: { en: "One-page resume emphasizing point-of-care readers for lateral flow tests and human-sample validation.", zh: "一页版，突出侧向流检测的即时读数仪与人体样本验证。" }, file: "assets/resumes/anqi-tan-resume-diagnostics.pdf" },
    { tag: { en: "Industry", zh: "工业界" }, title: { en: "AI & Data for Health", zh: "AI 与健康数据" }, desc: { en: "One-page resume emphasizing image analysis, LLM tools, and hackathon wins.", zh: "一页版，突出图像分析、大语言模型工具与黑客松获奖。" }, file: "assets/resumes/anqi-tan-resume-ai-health.pdf" }
  ],

  // ---------- CV 页面上的摘要（PDF 之外的网页版简历）----------
  education: [
    { school: { en: "University of Illinois Urbana-Champaign", zh: "伊利诺伊大学厄巴纳-香槟分校（UIUC）" }, degree: { en: "Ph.D. in Bioengineering", zh: "生物工程 博士" }, date: "Aug 2022 – Present", note: { en: "Advisor: Prof. Brian T. Cunningham", zh: "导师：Brian T. Cunningham 教授" } },
    { school: { en: "University of Illinois Urbana-Champaign", zh: "伊利诺伊大学厄巴纳-香槟分校（UIUC）" }, degree: { en: "B.S. in Mechanical Engineering", zh: "机械工程 学士" }, date: "Aug 2018 – Jun 2022", note: "" },
    { school: { en: "Zhejiang University (ZJU-UIUC Institute)", zh: "浙江大学（浙江大学伊利诺伊大学厄巴纳香槟校区联合学院）" }, degree: { en: "B.S. in Mechanical Engineering", zh: "机械工程 学士" }, date: "Aug 2018 – Jun 2022", note: "" }
  ],
  experience: [
    { role: { en: "Graduate Research Assistant", zh: "研究助理（博士生）" }, org: { en: "Nanosensors Group, UIUC", zh: "UIUC Nanosensors Group" }, date: "Sep 2022 – Present", bullets: {
      en: [
        "Built an $87 pocket-size NIR fluorescence reader for plasmonic-fluor-tagged lateral flow strips end to end: 750 nm excitation and custom optical filtering, Raspberry Pi imaging hardware, and an Android control app (Kotlin); reads a strip in 20 s and agrees with a lab ImageQuant scanner (R² = 0.99, 3.2% CV). First-author manuscript in preparation.",
        "Wrote the reader's analysis pipeline (automated test/control-line detection, background correction, 4PL calibration) that converts strip images into hormone concentrations.",
        "Leading development of the portable fluorescence reader for a $4.87M DoD (PRMRP) project on point-of-care phenotyping of sepsis and ARDS, in collaboration with Stanford, WashU, and UCSF.",
        "Leading the Live Hormone project: a competitive LFA platform for real-time testosterone, cortisol, and progesterone monitoring; the salivary cortisol assay reaches ≤0.12 ng/mL, with saliva collected from 153 adults (oral presentation, APHA 2026).",
        "Contributing to plasmon-enhanced LFAs for infectious disease detection and to reviews in Chemical Reviews and Lab on a Chip."
      ],
      zh: [
        "独立完成一款物料成本 87 美元的口袋式近红外荧光读取仪，用于 plasmonic-fluor 标记的侧向流试纸条：750 nm 激发与定制光学滤波、树莓派成像硬件、Android 控制 App（Kotlin）；读一条试纸 20 秒，与实验室 ImageQuant 扫描仪高度一致（R² = 0.99，CV 3.2%）。第一作者论文撰写中。",
        "编写读取仪的分析算法（自动识别测试线/质控线、背景校正、4PL 标定），将试纸图像换算为激素浓度。",
        "负责美国国防部（PRMRP）487 万美元脓毒症/ARDS 即时表型检测项目中的便携式荧光读取仪研发，合作方包括斯坦福、圣路易斯华盛顿大学和 UCSF。",
        "负责 Live Hormone 项目：基于竞争法侧向流检测的睾酮、皮质醇、孕酮实时监测平台；唾液皮质醇检测限 ≤0.12 ng/mL，已采集 153 名成人唾液样本（APHA 2026 口头报告）。",
        "参与等离激元增强侧向流传染病检测研究，以及 Chemical Reviews、Lab on a Chip 综述的撰写。"
      ] } },
    { role: { en: "Teaching Assistant", zh: "助教" }, org: { en: "BIOE/ECE 415 Biomedical Instrumentation Lab, UIUC", zh: "UIUC BIOE/ECE 415 生物医学仪器实验" }, date: "Fall 2025", bullets: {
      en: ["Supported laboratory instruction in biomedical instrumentation for undergraduate students."],
      zh: ["协助本科生生物医学仪器实验课程教学。"] } },
    { role: { en: "Research Assistant Intern, Institute of Brain Science", zh: "脑科学研究院 研究助理实习生" }, org: { en: "Zhejiang Qiangnao Technology Co., Ltd. (BrainCo), Hangzhou", zh: "浙江强脑科技有限公司（BrainCo），杭州" }, date: "May 2022 – Aug 2022", bullets: {
      en: [
        "Completed research tasks for two projects: sleep assisted by acoustic and electrical stimulation, and fatigue monitoring with multimodal EEG."
      ],
      zh: [
        "完成“声电刺激辅助睡眠”与“多模态脑电疲劳监测”两个项目的研究任务。"
      ] } },
    { role: { en: "Teaching Assistant", zh: "助教" }, org: { en: "ME 170 Computer-Aided Design, UIUC", zh: "UIUC ME 170 计算机辅助设计" }, date: "Spring 2020, Spring 2021, Spring 2022", bullets: {
      en: ["Supported instruction in CAD modeling for undergraduate mechanical engineering students."],
      zh: ["协助机械工程本科生 CAD 建模课程教学。"] } },
    { role: { en: "Undergraduate Research Leader", zh: "本科科研负责人" }, org: { en: "ZJU-UIUC Institute, Zhejiang University", zh: "浙江大学 浙大国际联合学院" }, date: "2019 – 2021", bullets: {
      en: [
        "Led a national-level research training project on a re-localizable RCM mechanism for minimally invasive surgery (first-author paper, IEEE ICARM 2021).",
        "Led a team implementing camera tracking for a robot-manipulated endoscope; contributed to a 3D-printed concrete dragon boat (Structures20/ACEM20)."
      ],
      zh: [
        "主持国家级大学生创新训练项目，研究面向微创手术的可重定位 RCM 机构（第一作者论文，IEEE ICARM 2021）。",
        "带领团队实现机器人操控内窥镜的相机跟踪；参与 3D 打印混凝土龙舟研究（Structures20/ACEM20）。"
      ] } },
    // TODO: 确认学园学生会主席的结束时间
    { role: { en: "President, Residential College Student Committee", zh: "学园学生委员会 主席" }, org: { en: "Zhejiang University, Haining Campus", zh: "浙江大学海宁国际校区" }, date: "2019 – 2022", bullets: {
      en: ["Led student committee activities and community events for the residential college."],
      zh: ["组织学园学生委员会工作与社区活动。"] } },
    { role: { en: "Volunteer Teacher", zh: "支教志愿者" }, org: { en: "Rural Education Program, Guizhou Province", zh: "贵州山区支教活动" }, date: "Aug 2019", bullets: {
      en: ["Taught in volunteer education activities for students in underserved mountainous areas."],
      zh: ["参与贵州贫困山区的志愿支教活动。"] } }
  ]
};
