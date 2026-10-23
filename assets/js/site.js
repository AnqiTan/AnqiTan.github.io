/* 公共逻辑：导航栏、页脚、以及根据 data.js 渲染各页面内容。一般不需要修改。 */
(function () {
  const S = window.SITE;
  const root = document.body.dataset.root || "";   // 子目录页面（如 blog/）设置 data-root="../"
  const page = document.body.dataset.page || "";
  const url = (p) => (!p || /^(https?:|mailto:|#)/.test(p) ? p : root + p);
  const esc = (s) => String(s ?? "");

  // ---------- 导航 ----------
  const NAV = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "CV", key: "cv", children: [
      { label: "CV", href: "cv.html", key: "cv" },
      { label: "Skills", href: "skills.html", key: "skills" } ] },
    { label: "Research", key: "research", children: [
      { label: "Research", href: "research.html", key: "research" },
      { label: "Current Projects", href: "projects.html#current", key: "projects" },
      { label: "Past Projects", href: "projects.html#past", key: "projects" } ] },
    { label: "Blog", key: "blog", children: [
      { label: "Blog", href: "blog.html", key: "blog" },
      { label: "Gallery", href: "gallery.html", key: "gallery" } ] },
    { label: "Contact", href: "contact.html", key: "contact" }
  ];

  const isActive = (item) =>
    item.key === page || (item.children || []).some((c) => c.key === page);

  const navHTML = NAV.map((item) => {
    const cls = isActive(item) ? "active" : "";
    if (!item.children) return `<li><a class="${cls}" href="${url(item.href)}">${item.label}</a></li>`;
    return `<li class="has-dd">
      <button class="dd-toggle ${cls}" aria-expanded="false">${item.label}<span class="caret"></span></button>
      <ul class="dd">${item.children.map((c) => `<li><a href="${url(c.href)}">${c.label}</a></li>`).join("")}</ul>
    </li>`;
  }).join("");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="wrap header-inner">
      <a class="brand" href="${url("index.html")}"><span class="brand-mark">${esc(S.brand).trim().charAt(0)}</span>${esc(S.brand)}</a>
      <button class="menu-btn" aria-label="Menu"><span></span><span></span><span></span></button>
      <nav><ul class="nav-list">${navHTML}</ul></nav>
    </div>`;
  document.body.prepend(header);

  header.querySelector(".menu-btn").addEventListener("click", () => header.classList.toggle("open"));
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
  document.addEventListener("click", () =>
    header.querySelectorAll(".has-dd.open").forEach((x) => x.classList.remove("open"))
  );

  // ---------- 页脚 ----------
  const so = S.social || {};
  const socialLinks = [
    so.email && `<a href="mailto:${so.email}">Email</a>`,
    so.linkedin && `<a href="${so.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`,
    so.github && `<a href="${so.github}" target="_blank" rel="noopener">GitHub</a>`,
    so.scholar && `<a href="${so.scholar}" target="_blank" rel="noopener">Google Scholar</a>`
  ].filter(Boolean).join("");

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap footer-inner">
      <div>
        <h4>About Me</h4>
        <p>Welcome to my personal website, where I share my research, projects, and life.</p>
      </div>
      <div>
        <h4>Follow Me</h4>
        <div class="social">${socialLinks}</div>
      </div>
    </div>
    <p class="copy">© ${new Date().getFullYear()} ${esc(S.name)}${S.updated ? ` · Last updated: ${S.updated}` : ""}</p>`;
  document.body.append(footer);

  // ---------- 渲染工具 ----------
  const fmtDate = (d) =>
    new Date(d + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const projectCard = (p) => `
    <article class="project${p.image ? "" : " no-img"}">
      ${p.image ? `<div class="project-img"><img src="${url(p.image)}" alt="" loading="lazy">${p.imageCredit ? `<span class="img-credit">${p.imageCredit}</span>` : ""}</div>` : ""}
      <div class="project-body">
        <h3>${p.link ? `<a href="${url(p.link)}">${p.title}</a>` : p.title}</h3>
        <p>${p.summary}</p>
        <dl class="meta">${Object.entries(p.meta || {}).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
      </div>
    </article>`;

  const postCard = (p) => `
    <a class="post-card" href="${url(p.url)}">
      <div class="post-cover"><img src="${url(p.cover)}" alt="" loading="lazy"></div>
      <div class="post-body">
        ${p.category ? `<span class="tag">${p.category}</span>` : ""}
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
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
        ${p.badge ? `<span class="venue-badge">${p.badge}</span>` : ""}
        ${p.image ? `<img src="${url(p.image)}" alt="" loading="lazy">` : ""}
        ${p.image && p.imageCredit ? `<span class="img-credit">${p.imageCredit}</span>` : ""}
      </div>
      <div class="pub-main">
        <h3>${p.title}</h3>
        <p class="authors">${boldMe(p.authors || "")}</p>
        <p class="venue-full">${p.venueFull || ""}</p>
        ${(p.highlights || []).filter(Boolean).map((h) => `<p class="highlight">${h}</p>`).join("")}
        ${links || bib ? `<div class="pub-links">${links}${bib}</div>` : ""}
        ${p.bibtex ? `<pre class="bibtex" hidden>${p.bibtex.replace(/</g, "&lt;")}</pre>` : ""}
      </div>
    </article>`;
  };

  const dated = (list) => list.map((n) => `<div class="dated"><span class="d">${n.date}</span><span>${n.text}</span></div>`).join("");

  const ICONS = {
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3z"/><path d="M5 13.2v3.6C6.7 18.8 9.2 20 12 20s5.3-1.2 7-3.2v-3.6L12 17l-7-3.8z"/></svg>',
    github: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/></svg>',
    cv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>'
  };
  const LABELS = { email: "Email", scholar: "Scholar", github: "GitHub", linkedin: "LinkedIn", cv: "CV" };

  const R = {
    "intro": () => S.intro.map((t) => `<p>${t}</p>`).join(""),
    "name": () => esc(S.name),
    "title": () => esc(S.title),
    "projects-featured": () => S.projects.slice(0, 3).map(projectCard).join(""),
    "projects-current": () => S.projects.filter((p) => p.status === "current").map(projectCard).join("") || `<p class="empty">Coming soon.</p>`,
    "projects-past": () => S.projects.filter((p) => p.status === "past").map(projectCard).join("") || `<p class="empty">Coming soon.</p>`,
    "posts-latest": () => posts.slice(0, 3).map(postCard).join(""),
    "posts-all": () => posts.map(postCard).join("") || `<p class="empty">No posts yet.</p>`,
    "research-statement": () => `<p>${S.research.statement}</p>`,
    "research-interests": () => S.research.interests.map((i) => `<li>${i}</li>`).join(""),
    "publications": () => S.publications.map(pubCard).join(""),
    "pubs-selected": () => S.publications.filter((p) => p.selected).map(pubCard).join(""),
    "name-split": () => {
      const [first, ...rest] = esc(S.name).split(" ");
      return `<strong>${first}</strong> ${rest.join(" ")}`;
    },
    "social-icons": () => [
      ...Object.entries(so).filter(([, v]) => v).map(([k, v]) =>
        `<a href="${k === "email" ? "mailto:" + v : v}" target="_blank" rel="noopener" title="${LABELS[k] || k}">${ICONS[k] || ""}<span>${LABELS[k] || k}</span></a>`),
      S.cv && `<a href="${url(S.cv)}" target="_blank" title="CV">${ICONS.cv}<span>CV</span></a>`
    ].filter(Boolean).join(""),
    "news": () => {
      const n = S.news || [], lim = S.newsLimit || 6;
      return dated(n.slice(0, lim)) + (n.length > lim
        ? `<details class="more-news"><summary>Show more</summary>${dated(n.slice(lim))}</details>` : "");
    },
    "talks": () => dated(S.talks || []),
    "teaching": () => dated(S.teaching || []),
    "awards-list": () => S.awards.map((a) => `<li><span>${a.name}</span><span class="date">${a.date || ""}</span></li>`).join(""),
    "projects-mini": () => S.projects.filter((p) => p.featured).map((p) => `
      <a class="mini-project${p.image ? "" : " no-img"}" href="${url(p.link || "projects.html")}">
        ${p.image ? `<img src="${url(p.image)}" alt="" loading="lazy">` : ""}
        <div><h3>${p.title}</h3><p>${p.summary}</p>
        ${p.meta && p.meta.Period ? `<span class="date">${p.meta.Period}</span>` : ""}</div>
      </a>`).join(""),
    "skills": () => S.skills.map((g) => `
      <div class="skill-group"><h3>${g.group}</h3>
        <div class="chips">${g.items.map((i) => `<span class="chip">${i}</span>`).join("")}</div></div>`).join(""),
    "education": () => S.education.map((e) => `
      <div class="entry"><div class="entry-head"><h3>${e.school}</h3><span class="date">${e.date}</span></div>
        <p class="sub">${e.degree}</p>${e.note ? `<p>${e.note}</p>` : ""}</div>`).join(""),
    "experience": () => S.experience.map((e) => `
      <div class="entry"><div class="entry-head"><h3>${e.role} — ${e.org}</h3><span class="date">${e.date}</span></div>
        <ul>${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul></div>`).join(""),
    "awards": () => S.awards.map((a) => `<div class="entry-head"><span>${a.name}</span><span class="date">${a.date}</span></div>`).join(""),
    "gallery": () => S.gallery.map((g, i) =>
      `<figure data-i="${i}"><img src="${url(g.src)}" alt="${g.caption || ""}" loading="lazy"><figcaption>${g.caption || ""}</figcaption></figure>`).join(""),
    "contact-links": () => socialLinks
  };

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

  document.title = document.title.replace("{name}", S.name);

  // BIB 展开/收起
  document.addEventListener("click", (e) => {
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
      if (!fig) return;
      const g = S.gallery[fig.dataset.i];
      box.querySelector("img").src = url(g.src);
      box.querySelector("p").textContent = g.caption || "";
      box.classList.add("show");
    });
    box.addEventListener("click", () => box.classList.remove("show"));
    document.addEventListener("keydown", (e) => e.key === "Escape" && box.classList.remove("show"));
  }
})();
