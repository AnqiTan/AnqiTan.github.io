# 个人网站

纯 HTML/CSS/JS 静态网站，托管在 GitHub Pages，无需安装任何框架。

## 网站结构

| 导航 | 页面 | 内容 |
|---|---|---|
| Home | `index.html` | 自我介绍 + 照片、精选项目、最新博客 |
| CV ▾ | `cv.html` / `skills.html` | 网页版简历 + 内嵌 PDF；技能标签 |
| Research ▾ | `research.html` / `projects.html#current` / `projects.html#past` | 研究方向、论文；当前/过往项目 |
| Blog ▾ | `blog.html` / `gallery.html` | 文章列表；相册（点击放大） |
| Contact | `contact.html` | 联系方式（可选在线留言表单） |

## 怎么修改内容

**绝大多数内容只需要改一个文件：[`assets/js/data.js`](assets/js/data.js)**：姓名、简介、项目、论文、博客列表、相册、技能、教育经历都在里面。

| 要做的事 | 怎么做 |
|---|---|
| 换照片 | 把照片存为 `assets/img/photo.jpg` |
| 放 CV | 把 PDF 存为 `assets/cv.pdf` |
| 首页横幅背景 | 放 `assets/img/banner-projects.jpg`、`assets/img/banner-blog.jpg`（没有就显示纯色） |
| 加项目 | 在 `data.js` 的 `projects` 里复制一条，图片放 `assets/img/projects/` |
| 写博客 | 复制 `blog/2019-guizhou-volunteer-teaching.html` 改名改内容（中英双语写在 `data-lang="en"` / `data-lang="zh"` 两段里），再在 `data.js` 的 `posts` 里加一条 |
| 加相册照片 | 图片放 `assets/img/gallery/`，在 `data.js` 的 `gallery` 里加一条 |
| 改配色 | 改 `assets/css/style.css` 最上面的 `:root` 颜色变量 |

## 本地预览

双击 `操作指南/双击打开本地预览.bat`，浏览器会自动打开 http://localhost:8000。直接双击 html 文件会缺样式，必须用这个方式。详见 [操作指南/使用说明.md](操作指南/使用说明.md)。

## 部署到 GitHub Pages（首次）

1. 登录 GitHub，新建仓库，**仓库名必须是 `你的用户名.github.io`**，设为 Public，不勾选添加 README。
2. 在本文件夹运行（把 `USERNAME` 换成你的用户名）：

   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
   git push -u origin main
   ```

3. 仓库 **Settings → Pages**：Source 选 `Deploy from a branch`，Branch 选 `main` / `/ (root)`，保存。
4. 1–2 分钟后访问 `https://USERNAME.github.io`。

## 之后更新

```bash
git add .
git commit -m "Update content"
git push
```
