/* 公共逻辑：导航栏、页脚、中英文切换、以及根据 data.js 渲染各页面内容。一般不需要修改。 */
(function () {
  const S = window.SITE;
  const root = document.body.dataset.root || "";   // 子目录页面（如 blog/）设置 data-root="../"
  const page = document.body.dataset.page || "";
  const url = (p) => (!p || /^(https?:|mailto:|#)/.test(p) ? p : root + p);
  const esc = (s) => String(s ?? "");
  const baseTitle = document.title;

  // ---------- 语言 ----------
  const LANGS = ["en", "zh"];
  let lang = (() => {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) return q;
    try { const s = localStorage.getItem("lang"); if (LANGS.includes(s)) return s; } catch (e) {}
    return "en";
  })();

  // 界面文字词典（网页上固定的标题、按钮、导航等）
  const T = {
    en: {
      switch: "中文", home: "Home", cv: "CV", skills: "Skills", research: "Research",
      current_projects: "Current Projects", past_projects: "Past Projects", blog: "Blog", gallery: "Gallery", contact: "Contact",
      about_me: "About Me", about_text: "Welcome to my personal website, where I share my research, projects, and life.",
      follow_me: "Follow Me", last_updated: "Last updated",
      news: "News", selected_papers: "Selected Papers", selected_projects: "Selected Projects", talks: "Talks & Posters",
      teaching: "Teaching", awards: "Awards & Honors", all_pubs: "All publications →", all_projects: "All projects →",
      show_more: "Show more", coming_soon: "Coming soon.", no_posts: "No posts yet.",
      email: "Email", scholar: "Scholar", github: "GitHub", linkedin: "LinkedIn", google_scholar: "Google Scholar",
      cv_eyebrow: "Curriculum Vitae", cv_title: "CV",
      cv_desc: 'A summary of my education and experience. <a data-href="cv" target="_blank">Download the full PDF →</a>',
      education: "Education", honors: "Honors & Awards", experience: "Experience", full_cv: "Full CV",
      skills_eyebrow: "Toolbox", skills_title: "Skills", skills_desc: "Technical skills, tools, and languages.",
      research_title: "Research Overview", research_statement: "Research Statement", research_interests: "Research Interests",
      publications: "Publications",
      projects_title: "Projects", projects_desc: "Research and engineering projects I have led or contributed to.",
      blog_title: "Notes & Stories", blog_desc: "Research updates, conference experiences, and life.",
      gallery_desc: "Moments from conferences, travels, and everyday life.",
      contact_eyebrow: "Get in touch", contact_desc: "I'm always happy to talk about research, collaborations, and opportunities.",
      say_hello: "Say hello", contact_text: 'The best way to reach me is by email: <a data-href="email">send me an email</a>.',
      "meta:Role": "Role", "meta:Lab": "Lab", "meta:Advisor": "Advisor", "meta:Collaborators": "Collaborators",
      "meta:Period": "Period", "meta:Team": "Team", "meta:Funding": "Funding",
      primary_email: "Primary", alt_email: "Alternate"
    },
    zh: {
      switch: "EN", home: "首页", cv: "简历", skills: "技能", research: "研究",
      current_projects: "当前项目", past_projects: "过往项目", blog: "博客", gallery: "相册", contact: "联系",
      about_me: "关于我", about_text: "欢迎来到我的个人网站，这里记录我的研究、项目与生活。",
      follow_me: "关注我", last_updated: "最后更新",
      news: "动态", selected_papers: "代表论文", selected_projects: "代表项目", talks: "报告与海报",
      teaching: "教学经历", awards: "荣誉奖项", all_pubs: "全部论文 →", all_projects: "全部项目 →",
      show_more: "显示更多", coming_soon: "敬请期待。", no_posts: "暂无文章。",
      email: "邮箱", scholar: "谷歌学术", github: "GitHub", linkedin: "LinkedIn", google_scholar: "谷歌学术",
      cv_eyebrow: "个人简历", cv_title: "简历",
      cv_desc: '我的教育背景与经历概览。<a data-href="cv" target="_blank">下载完整 PDF →</a>',
      education: "教育背景", honors: "荣誉奖项", experience: "经历", full_cv: "完整简历",
      skills_eyebrow: "工具箱", skills_title: "技能", skills_desc: "技术能力、工具与语言。",
      research_title: "研究概览", research_statement: "研究陈述", research_interests: "研究兴趣",
      publications: "论文发表",
      projects_title: "项目", projects_desc: "我主持或参与的科研与工程项目。",
      blog_title: "随笔与故事", blog_desc: "研究进展、会议经历与生活点滴。",
      gallery_desc: "会议、旅行与日常生活中的瞬间。",
      contact_eyebrow: "保持联系", contact_desc: "欢迎交流研究、合作与工作机会。",
      say_hello: "打个招呼", contact_text: '最方便的联系方式是邮件：<a data-href="email">给我发邮件</a>。',
      "meta:Role": "角色", "meta:Lab": "实验室", "meta:Advisor": "导师", "meta:Collaborators": "合作者",
      "meta:Period": "时间", "meta:Team": "团队", "meta:Funding": "资助",
      primary_email: "主邮箱", alt_email: "备用邮箱",
      "badge:First Author": "第一作者", "badge:Review": "综述", "badge:Under Review": "审稿中",
      "badge:Book Chapter": "书籍章节", "badge:Oral": "口头报告"
    }
  };
  const t = (k) => T[lang][k] ?? T.en[k] ?? k;

  // 内容取值：{en, zh} 对象按当前语言取，普通字符串原样返回
  const L = (v) => (v && typeof v === "object" && !Array.isArray(v) && ("en" in v || "zh" in v)) ? (v[lang] ?? v.en) : v;

  // 日期：中文模式下 "Sep 2022 – Present" → "2022.09 – 至今"
  const MON = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
  const D = (v) => {
    const s = esc(L(v));
    if (lang !== "zh") return s;
    return s
      .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* (\d{1,2}), (\d{4})/g, (_, m, d, y) => `${y}.${MON[m]}.${d.padStart(2, "0")}`)
      .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* (\d{4})/g, (_, m, y) => `${y}.${MON[m]}`)
      .replace(/Spring (\d{4})/g, "$1 春季").replace(/Fall (\d{4})/g, "$1 秋季").replace(/Summer (\d{4})/g, "$1 夏季")
      .replace(/Present/g, "至今").replace(/\(?expected\)?/gi, "（预计）");
  };

  // ---------- 导航 ----------
  const NAV = [
    { label: "home", href: "index.html", key: "home" },
    { label: "cv", key: "cv", children: [
      { label: "cv", href: "cv.html", key: "cv" },
      { label: "skills", href: "skills.html", key: "skills" } ] },
    { label: "research", key: "research", children: [
      { label: "research", href: "research.html", key: "research" },
      { label: "current_projects", href: "projects.html#current", key: "projects" },
      { label: "past_projects", href: "projects.html#past", key: "projects" } ] },
    { label: "blog", key: "blog", children: [
      { label: "blog", href: "blog.html", key: "blog" },
      { label: "gallery", href: "gallery.html", key: "gallery" } ] },
    { label: "contact", href: "contact.html", key: "contact" }
  ];
  const isActive = (item) =>
    item.key === page || (item.children || []).some((c) => c.key === page);

  // ---------- 渲染工具 ----------
  const so = S.social || {};
  const fmtDate = (d) =>
    new Date(d + "T00:00:00").toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "short", day: "numeric" });

  const metaHTML = (meta) => Object.entries(meta || {})
    .map(([k, v]) => `<div><dt>${t("meta:" + k)}</dt><dd>${k === "Period" ? D(v) : L(v)}</dd></div>`).join("");

  const projectCard = (p) => `
    <article class="project${p.image ? "" : " no-img"}">
      ${p.image ? `<div class="project-img"><a href="${url(p.image)}" target="_blank" title="View full size"><img src="${url(p.image)}" alt="" loading="lazy"></a>${p.imageCredit ? `<span class="img-credit">${L(p.imageCredit)}</span>` : ""}</div>` : ""}
      <div class="project-body">
        <h3>${p.link ? `<a href="${url(p.link)}">${L(p.title)}</a>` : L(p.title)}</h3>
        <p>${L(p.summary)}</p>
        <dl class="meta">${metaHTML(p.meta)}</dl>
        ${p.links ? `<div class="pub-links">${Object.entries(p.links).filter(([, v]) => v).map(([k, v]) => `<a class="pill" href="${url(v)}" target="_blank" rel="noopener">${k}</a>`).join("")}</div>` : ""}
        ${p.video ? `<video class="project-video" src="${url(p.video)}"${p.videoPoster ? ` poster="${url(p.videoPoster)}"` : ""} controls playsinline preload="none"></video>` : ""}
      </div>
    </article>`;

  const postCard = (p) => `
    <a class="post-card" href="${url(p.url)}">
      <div class="post-cover"><img src="${url(p.cover)}" alt="" loading="lazy"></div>
      <div class="post-body">
        ${p.category ? `<span class="tag">${L(p.category)}</span>` : ""}
        <h3>${L(p.title)}</h3>
        <p>${L(p.summary)}</p>
        <time>${fmtDate(p.date)}</time>
      </div>
    </a>`;

  const posts = [...(S.posts || [])].sort((a, b) => b.date.localeCompare(a.date));

  // 论文卡片：作者中自己的名字自动加粗；BIB 按钮展开 BibTeX
  const boldMe = (s) => s.split(S.name).join(`<strong>${S.name}</strong>`);
  const pubCard = (p) => {
    const links = Object.entries(p.links || {}).filter(([, v]) => v)
      .map(([k, v]) => `<a class="pill" href="${url(v)}" target="_blank" rel="noopener">${k}</a>`).join("");
    const bib = p.bibtex ? `<button class="pill bib-btn" type="button">BIB</button>` : "";
    return `
    <article class="pub">
      <div class="pub-side">
        <span class="venue">${p.venue || ""}</span>
        ${p.badge ? `<span class="venue-badge">${t("badge:" + p.badge) === "badge:" + p.badge ? p.badge : t("badge:" + p.badge)}</span>` : ""}
        ${p.image ? `<a href="${url(p.image)}" target="_blank" title="View full size"><img src="${url(p.image)}" alt="" loading="lazy"></a>` : ""}
        ${p.image && p.imageCredit ? `<span class="img-credit">${L(p.imageCredit)}</span>` : ""}
      </div>
      <div class="pub-main">
        <h3>${L(p.title)}</h3>
        <p class="authors">${boldMe(p.authors || "")}</p>
        <p class="venue-full">${L(p.venueFull) || ""}</p>
        ${(p.highlights || []).map(L).filter(Boolean).map((h) => `<p class="highlight">${h}</p>`).join("")}
        ${links || bib ? `<div class="pub-links">${links}${bib}</div>` : ""}
        ${p.bibtex ? `<pre class="bibtex" hidden>${p.bibtex.replace(/</g, "&lt;")}</pre>` : ""}
      </div>
    </article>`;
  };

  const dated = (list) => list.map((n) => `<div class="dated"><span class="d">${D(n.date)}</span><span>${L(n.text)}</span></div>`).join("");

  const ICONS = {
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3z"/><path d="M5 13.2v3.6C6.7 18.8 9.2 20 12 20s5.3-1.2 7-3.2v-3.6L12 17l-7-3.8z"/></svg>',
    github: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/></svg>',
    cv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>'
  };

  const socialLinks = () => [
    so.email && `<a href="mailto:${so.email}">${t("email")}</a>`,
    so.emailAlt && `<a href="mailto:${so.emailAlt}">Gmail</a>`,
    so.linkedin && `<a href="${so.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`,
    so.github && `<a href="${so.github}" target="_blank" rel="noopener">GitHub</a>`,
    so.scholar && `<a href="${so.scholar}" target="_blank" rel="noopener">${t("google_scholar")}</a>`
  ].filter(Boolean).join("");

  const R = {
    "intro": () => L(S.intro).map((x) => `<p>${x}</p>`).join(""),
    "name": () => esc(lang === "zh" && S.nameZh ? S.nameZh : S.name),
    "title": () => esc(L(S.title)),
    "projects-featured": () => S.projects.slice(0, 3).map(projectCard).join(""),
    "projects-current": () => S.projects.filter((p) => p.status === "current").map(projectCard).join("") || `<p class="empty">${t("coming_soon")}</p>`,
    "projects-past": () => S.projects.filter((p) => p.status === "past").map(projectCard).join("") || `<p class="empty">${t("coming_soon")}</p>`,
    "posts-latest": () => posts.slice(0, 3).map(postCard).join(""),
    "posts-all": () => posts.map(postCard).join("") || `<p class="empty">${t("no_posts")}</p>`,
    "research-statement": () => `<p>${L(S.research.statement)}</p>`,
    "research-interests": () => L(S.research.interests).map((i) => `<li>${i}</li>`).join(""),
    "publications": () => S.publications.map(pubCard).join(""),
    "pubs-selected": () => S.publications.filter((p) => p.selected).map(pubCard).join(""),
    "name-split": () => {
      if (lang === "zh" && S.nameZh) return `<strong>${S.nameZh}</strong> <span class="name-alt">${esc(S.name)}</span>`;
      const [first, ...rest] = esc(S.name).split(" ");
      return `<strong>${first}</strong> ${rest.join(" ")}`;
    },
    "social-icons": () => [
      ...Object.entries(so).filter(([k, v]) => v && k !== "emailAlt").map(([k, v]) =>
        `<a href="${k === "email" ? "mailto:" + v : v}" target="_blank" rel="noopener" title="${t(k)}">${ICONS[k] || ""}<span>${t(k)}</span></a>`),
      S.cv && `<a href="${url(S.cv)}" target="_blank" title="${t("cv")}">${ICONS.cv}<span>${t("cv")}</span></a>`
    ].filter(Boolean).join(""),
    "news": () => {
      const n = S.news || [], lim = S.newsLimit || 6;
      return dated(n.slice(0, lim)) + (n.length > lim
        ? `<details class="more-news"><summary>${t("show_more")}</summary>${dated(n.slice(lim))}</details>` : "");
    },
    "talks": () => dated(S.talks || []),
    "teaching": () => dated(S.teaching || []),
    "awards-list": () => S.awards.map((a) => `<li><span>${L(a.name)}</span><span class="date">${D(a.date || "")}</span></li>`).join(""),
    "projects-mini": () => S.projects.filter((p) => p.featured).map((p) => `
      <a class="mini-project${p.image ? "" : " no-img"}" href="${url(p.link || "projects.html")}">
        ${p.image ? `<div><img src="${url(p.image)}" alt="" loading="lazy">${p.imageCredit ? `<span class="img-credit">${L(p.imageCredit)}</span>` : ""}</div>` : ""}
        <div><h3>${L(p.title)}</h3><p>${L(p.summary)}</p>
        ${p.meta && p.meta.Period ? `<span class="date">${D(p.meta.Period)}</span>` : ""}</div>
      </a>`).join(""),
    "skills": () => S.skills.map((g) => `
      <div class="skill-group"><h3>${L(g.group)}</h3>
        <div class="chips">${g.items.map((i) => `<span class="chip">${L(i)}</span>`).join("")}</div></div>`).join(""),
    "education": () => S.education.map((e) => `
      <div class="entry"><div class="entry-head"><h3>${L(e.school)}</h3><span class="date">${D(e.date)}</span></div>
        <p class="sub">${L(e.degree)}</p>${L(e.note) ? `<p>${L(e.note)}</p>` : ""}</div>`).join(""),
    "experience": () => S.experience.map((e) => `
      <div class="entry"><div class="entry-head"><h3>${L(e.role)} — ${L(e.org)}</h3><span class="date">${D(e.date)}</span></div>
        <ul>${L(e.bullets).map((b) => `<li>${b}</li>`).join("")}</ul></div>`).join(""),
    "awards": () => S.awards.map((a) => `<div class="entry-head"><span>${L(a.name)}</span><span class="date">${D(a.date)}</span></div>`).join(""),
    "gallery": () => S.gallery.map((g, i) => g.video
      ? `<figure class="is-video"><video src="${url(g.video)}"${g.poster ? ` poster="${url(g.poster)}"` : ""} controls playsinline preload="none"></video><figcaption>${L(g.caption) || ""}</figcaption></figure>`
      : `<figure data-i="${i}"><img src="${url(g.src)}" alt="${L(g.caption) || ""}" loading="lazy"><figcaption>${L(g.caption) || ""}</figcaption></figure>`).join(""),
    "contact-links": () => socialLinks(),
    "contact-emails": () => [
      so.email && `<strong>${t("primary_email")}:</strong> <a href="mailto:${so.email}">${so.email}</a>`,
      so.emailAlt && `<strong>${t("alt_email")}:</strong> <a href="mailto:${so.emailAlt}">${so.emailAlt}</a>`
    ].filter(Boolean).join("<br>")
  };

  // ---------- 整页渲染（切换语言时重新执行）----------
  function render() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll(".site-header, .site-footer").forEach((el) => el.remove());

    const navHTML = NAV.map((item) => {
      const cls = isActive(item) ? "active" : "";
      if (!item.children) return `<li><a class="${cls}" href="${url(item.href)}">${t(item.label)}</a></li>`;
      return `<li class="has-dd">
        <button class="dd-toggle ${cls}" aria-expanded="false">${t(item.label)}<span class="caret"></span></button>
        <ul class="dd">${item.children.map((c) => `<li><a href="${url(c.href)}">${t(c.label)}</a></li>`).join("")}</ul>
      </li>`;
    }).join("");

    const brand = esc(L(S.brand));
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="wrap header-inner">
        <a class="brand" href="${url("index.html")}"><span class="brand-mark">${brand.trim().charAt(0)}</span>${brand}</a>
        <div class="header-right">
          <nav><ul class="nav-list">${navHTML}</ul></nav>
          <button class="lang-btn" type="button" aria-label="Switch language">${t("switch")}</button>
          <button class="menu-btn" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </div>`;
    document.body.prepend(header);

    header.querySelector(".menu-btn").addEventListener("click", () => header.classList.toggle("open"));
    header.querySelector(".lang-btn").addEventListener("click", () => {
      lang = lang === "en" ? "zh" : "en";
      try { localStorage.setItem("lang", lang); } catch (e) {}
      const u = new URL(location.href);
      if (u.searchParams.has("lang")) { u.searchParams.set("lang", lang); history.replaceState(null, "", u); }
      render();
    });
    header.querySelectorAll(".dd-toggle").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const li = btn.parentElement;
        const open = !li.classList.contains("open");
        header.querySelectorAll(".has-dd.open").forEach((x) => x.classList.remove("open"));
        li.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open);
      })
    );

    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="wrap footer-inner">
        <div><h4>${t("about_me")}</h4><p>${t("about_text")}</p></div>
        <div><h4>${t("follow_me")}</h4><div class="social">${socialLinks()}</div></div>
      </div>
      <p class="copy">© ${new Date().getFullYear()} ${esc(lang === "zh" && S.nameZh ? S.nameZh : S.name)}${S.updated ? ` · ${t("last_updated")}: ${D(S.updated)}` : ""}</p>`;
    document.body.append(footer);

    // 页面上固定文字
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.innerHTML = t(el.dataset.i18n); });

    // 数据驱动的内容
    document.querySelectorAll("[data-render]").forEach((el) => {
      const fn = R[el.dataset.render];
      if (fn) el.innerHTML = fn();
    });

    // 空数据的板块自动隐藏
    document.querySelectorAll("[data-hide-if-empty]").forEach((el) => {
      const list = S[el.dataset.hideIfEmpty];
      if (!list || !list.length) el.remove();
    });

    // 绑定链接 / 图片
    document.querySelectorAll("[data-href]").forEach((el) => {
      const v = el.dataset.href === "email" ? "mailto:" + so.email : S[el.dataset.href];
      el.href = url(v);
    });
    document.querySelectorAll("[data-src]").forEach((el) => {
      if (el.tagName === "IMG") el.onerror = () => { el.onerror = null; el.src = url("assets/img/placeholder.svg"); };
      el.src = url(S[el.dataset.src]);
    });

    document.title = baseTitle.replace("{name}", lang === "zh" && S.nameZh ? S.nameZh : S.name);
  }

  render();

  // ---------- 只需绑定一次的事件 ----------
  document.addEventListener("click", (e) => {
    // 点空白处收起下拉菜单
    document.querySelectorAll(".has-dd.open").forEach((x) => x.classList.remove("open"));
    // BIB 展开/收起
    const b = e.target.closest(".bib-btn");
    if (!b) return;
    const pre = b.closest(".pub-main").querySelector(".bibtex");
    pre.hidden = !pre.hidden;
    b.classList.toggle("on", !pre.hidden);
  });

  // ---------- 相册灯箱 ----------
  const gal = document.querySelector('[data-render="gallery"]');
  if (gal) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = `<img alt=""><p></p>`;
    document.body.append(box);
    gal.addEventListener("click", (e) => {
      const fig = e.target.closest("figure");
      if (!fig || fig.classList.contains("is-video")) return;   // 视频直接在卡片里播放
      const g = S.gallery[fig.dataset.i];
      box.querySelector("img").src = url(g.src);
      box.querySelector("p").textContent = L(g.caption) || "";
      box.classList.add("show");
    });
    box.addEventListener("click", () => box.classList.remove("show"));
    document.addEventListener("keydown", (e) => e.key === "Escape" && box.classList.remove("show"));
  }
})();
