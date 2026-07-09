# -*- coding: utf-8 -*-
"""
图片压缩脚本（针对 public/cities 下的 JPEG）

三种模式（命令行参数 --mode 选择）：

  lossless  （默认，无损）：保持像素完全不变，仅做：
            - 复用原图的量化表（quality='keep'，不重新量化 → 像素无损）
            - 优化 Huffman 表（optimize=True）
            - 转为渐进式 JPEG（progressive=True，体积更小且加载更快）
            - 去除 EXIF/元数据
            典型节省 5%~20%。

  lossy    （有损，体积更小）：按质量 85 重新编码 + 可选缩小尺寸。
            适合网页展示，肉眼几乎无差异。

  webp     （无损转 WebP）：像素无损，体积通常比 JPEG 小不少，
            但文件扩展名变为 .webp，前端需相应支持。

用法：
  python compress_images.py                      # 默认 lossless
  python compress_images.py --mode lossy --quality 85
  python compress_images.py --mode lossy --quality 85 --max-width 1920
  python compress_images.py --mode webp
  python compress_images.py --dry-run            # 只预览，不实际写入

安全：默认会先把原文件备份到 public/cities_backup_<时间戳>/。
"""

import argparse
import os
import shutil
import sys
import time

try:
    from PIL import Image
except ImportError:
    sys.exit("需要 Pillow：pip install Pillow")

CITIES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public", "cities")
EXTS = (".jpg", ".jpeg", ".png")


def human(size):
    for unit in ("B", "KB", "MB", "GB"):
        if size < 1024:
            return f"{size:.1f}{unit}"
        size /= 1024
    return f"{size:.1f}TB"


def backup_dir():
    ts = time.strftime("%Y%m%d_%H%M%S")
    return os.path.join(CITIES_DIR, f"cities_backup_{ts}")


def process_lossless(path):
    """无损：保持原格式，仅做格式内优化（不改变像素）。
    JPEG: 复用原量化表 + 优化 Huffman + 渐进式 + 去 EXIF。
    PNG:  optimize=True（重新压缩 zlib，像素不变）。
    注意：照片用 PNG 本身就极占空间，无损优化能省的有限。
    """
    with Image.open(path) as img:
        fmt = img.format
        buf_path = path + ".tmp"
        if fmt == "JPEG":
            img.save(buf_path, format="JPEG", quality="keep",
                     optimize=True, progressive=True)
        elif fmt == "PNG":
            img.save(buf_path, format="PNG", optimize=True)
        else:
            img.save(buf_path, format=fmt)
    new_size = os.path.getsize(buf_path)
    old_size = os.path.getsize(path)
    if new_size < old_size:
        os.replace(buf_path, path)
        return old_size, new_size, True
    else:
        os.remove(buf_path)
        return old_size, old_size, False


def process_jpeg(path, quality):
    """转换为真正的 JPEG（保持原文件名/后缀不变）。
    适合把 PNG 伪 .jpg 转成真 JPEG：照片体积大幅下降，q90 肉眼无损。
    """
    with Image.open(path) as img:
        img.load()
        if img.mode not in ("RGB", "L"):
            img = img.convert("RGB")
        buf_path = path + ".tmp"
        img.save(buf_path, format="JPEG", quality=quality,
                 optimize=True, progressive=True)
    new_size = os.path.getsize(buf_path)
    old_size = os.path.getsize(path)
    os.replace(buf_path, path)
    return old_size, new_size, True


def process_lossy(path, quality, max_width):
    """有损：重编码 + 可选缩放。"""
    with Image.open(path) as img:
        img.load()
        if img.mode not in ("RGB", "L"):
            img = img.convert("RGB")
        if max_width and img.width > max_width:
            ratio = max_width / img.width
            img = img.resize((max_width, int(img.height * ratio)), Image.LANCZOS)
        buf_path = path + ".tmp"
        img.save(
            buf_path,
            format="JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
        )
    new_size = os.path.getsize(buf_path)
    old_size = os.path.getsize(path)
    os.replace(buf_path, path)
    return old_size, new_size, True


def process_webp(path, lossless=True):
    """转 WebP（默认无损）。返回 (旧大小, 新大小, 是否替换)。"""
    with Image.open(path) as img:
        img.load()
        out_path = os.path.splitext(path)[0] + ".webp"
        img.save(out_path, format="WEBP", lossless=lossless, quality=85, method=6)
    new_size = os.path.getsize(out_path)
    old_size = os.path.getsize(path)
    return old_size, new_size, out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mode", choices=["lossless", "jpeg", "lossy", "webp"], default="lossless")
    ap.add_argument("--quality", type=int, default=85, help="lossy 模式下的 JPEG 质量")
    ap.add_argument("--max-width", type=int, default=0, help="lossy 模式下最大宽度，0=不缩放")
    ap.add_argument("--dry-run", action="store_true", help="只统计不写入")
    ap.add_argument("--no-backup", action="store_true", help="跳过自动备份")
    args = ap.parse_args()

    if not os.path.isdir(CITIES_DIR):
        sys.exit(f"目录不存在：{CITIES_DIR}")

    files = [f for f in os.listdir(CITIES_DIR) if f.lower().endswith(EXTS)]
    if not files:
        sys.exit("没有找到图片。")

    print(f"模式：{args.mode} | 文件数：{len(files)} | 目录：{CITIES_DIR}")
    if args.dry_run:
        print("（dry-run：仅预览，不写入）")
    elif not args.no_backup:
        bdir = backup_dir()
        os.makedirs(bdir, exist_ok=True)
        print(f"备份原文件到：{bdir}")
        for f in files:
            shutil.copy2(os.path.join(CITIES_DIR, f), os.path.join(bdir, f))

    total_old = total_new = 0
    for i, f in enumerate(sorted(files), 1):
        path = os.path.join(CITIES_DIR, f)
        old_size = os.path.getsize(path)
        try:
            if args.dry_run:
                print(f"  [{i}/{len(files)}] {f}  {human(old_size)}  (预览，跳过)")
                total_old += old_size
                total_new += old_size
                continue

            if args.mode == "lossless":
                o, n, changed = process_lossless(path)
                tag = f"{human(o)} -> {human(n)}"
            elif args.mode == "jpeg":
                o, n, changed = process_jpeg(path, args.quality)
                tag = f"{human(o)} -> {human(n)}"
            elif args.mode == "lossy":
                o, n, changed = process_lossy(path, args.quality, args.max_width)
                tag = f"{human(o)} -> {human(n)}"
            else:  # webp
                o, n, out = process_webp(path, lossless=True)
                tag = f"{human(o)} -> {human(n)} ({os.path.basename(out)})"
                # webp 模式：若新文件不比原图小，删掉 webp
                if n >= o:
                    os.remove(out)
                    tag = f"{human(o)} (webp 反而更大，已跳过)"

            if args.mode in ("lossless", "lossy"):
                total_old += o
                total_new += n
            else:
                total_old += o
                total_new += min(o, n) if n < o else o
            print(f"  [{i}/{len(files)}] {f}  {tag}")
        except Exception as e:
            print(f"  [{i}/{len(files)}] {f}  出错：{e}")

    saved = total_old - total_new
    pct = (saved / total_old * 100) if total_old else 0
    print("-" * 50)
    print(f"总计：{human(total_old)} -> {human(total_new)}  节省 {human(saved)} ({pct:.1f}%)")


if __name__ == "__main__":
    main()
