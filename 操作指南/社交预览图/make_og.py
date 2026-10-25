"""生成链接预览图（领英「精选」、微信/Slack 分享时显示的缩略图）。

用法：在网站根目录运行  python 操作指南/社交预览图/make_og.py
输出：
  assets/img/og-card.png  网站预览图（头像 + 姓名 + 方向），index.html 等页面的 og:image 指向它
  assets/img/og-cv.png    CV 第一页上半部分，用作领英「精选」里 CV 链接的缩略图（需在领英手动上传）
改了 data.js 的头衔或重新生成 cv.pdf 之后，重新运行一次即可。
"""
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[2]
IMG = ROOT / "assets" / "img"
W, H = 1200, 627  # 领英推荐的链接预览尺寸 (1.91:1)

BG = "#fbf3f0"      # 与网站 --tint 一致
TEXT = "#2a2422"
MUTED = "#74675f"
ACCENT = "#b84a3e"
FONT = "C:/Windows/Fonts/"


def font(name, size):
    return ImageFont.truetype(FONT + name, size)


def card():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 18, H], fill=ACCENT)

    # 圆角头像
    ph = ImageOps.fit(Image.open(IMG / "photo.jpg").convert("RGB"), (340, 425), centering=(0.5, 0.3))
    mask = Image.new("L", ph.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, *ph.size], radius=28, fill=255)
    im.paste(ph, (80, (H - ph.size[1]) // 2), mask)

    x = 480
    d.text((x, 150), "Anqi Tan", font=font("georgiab.ttf", 78), fill=TEXT)
    d.text((x, 252), "Ph.D. Student in Bioengineering, UIUC", font=font("calibri.ttf", 38), fill=TEXT)
    lines = [
        "Biosensing devices for point-of-care diagnostics",
        "Optical readers · hardware & software",
    ]
    for i, s in enumerate(lines):
        d.text((x, 322 + i * 46), s, font=font("calibri.ttf", 33), fill=MUTED)
    d.text((x, 450), "anqitan.github.io", font=font("calibrib.ttf", 36), fill=ACCENT)
    im.save(IMG / "og-card.png", optimize=True)


def cv_thumb():
    page = pymupdf.open(ROOT / "assets" / "cv.pdf")[0]
    pix = page.get_pixmap(dpi=200)
    pg = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    # 取第一页上部，按 1.91:1 裁剪，放在浅色底上留边
    inner_w, inner_h = W - 120, H - 80
    top = pg.crop((0, 0, pg.width, int(pg.width * inner_h / inner_w)))
    top = top.resize((inner_w, inner_h), Image.LANCZOS)
    im = Image.new("RGB", (W, H), BG)
    im.paste(top, (60, 80))
    ImageDraw.Draw(im).rectangle([60, 80, 60 + inner_w - 1, H], outline="#eadfd9", width=2)
    im.save(IMG / "og-cv.png", optimize=True)


if __name__ == "__main__":
    card()
    cv_thumb()
    print("OK:", IMG / "og-card.png", IMG / "og-cv.png")
