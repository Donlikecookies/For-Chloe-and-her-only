from pathlib import Path
import subprocess

from PIL import Image, ImageOps

# iPhone HEIC support (optional)
try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    pass

ROOT = Path(__file__).resolve().parent.parent
SRC_PHOTOS = ROOT / "originals" / "photos"
SRC_VIDEOS = ROOT / "originals" / "videos"
OUT_PHOTOS = ROOT / "media" / "photos"
OUT_VIDEOS = ROOT / "media" / "videos"

MAX_SIDE = 2000   # longest edge in pixels
QUALITY = 82      # JPEG quality
PHOTO_EXT = {".jpg", ".jpeg", ".png", ".heic", ".webp"}
VIDEO_EXT = {".mp4", ".mov", ".m4v"}


def clean_name(path: Path) -> str:
    return path.stem.lower().replace(" ", "-").replace("_", "-")


def optimize_photos():
    OUT_PHOTOS.mkdir(parents=True, exist_ok=True)
    for src in sorted(SRC_PHOTOS.iterdir()):
        if src.suffix.lower() not in PHOTO_EXT:
            continue
        out = OUT_PHOTOS / f"{clean_name(src)}.jpg"
        with Image.open(src) as img:
            img = ImageOps.exif_transpose(img).convert("RGB")
            img.thumbnail((MAX_SIDE, MAX_SIDE))
            img.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        print(f"photo: {out.name}  {out.stat().st_size // 1024} KB")


def optimize_videos():
    OUT_VIDEOS.mkdir(parents=True, exist_ok=True)
    for src in sorted(SRC_VIDEOS.iterdir()):
        if src.suffix.lower() not in VIDEO_EXT:
            continue
        name = clean_name(src)
        out = OUT_VIDEOS / f"{name}.mp4"
        poster = OUT_VIDEOS / f"{name}.jpg"

        subprocess.run([
            "ffmpeg", "-y", "-i", str(src),
            "-vf", "scale='min(1280,iw)':-2",
            "-c:v", "libx264", "-crf", "26", "-preset", "medium",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "128k",
            "-movflags", "+faststart",
            str(out),
        ], check=True)

        subprocess.run([
            "ffmpeg", "-y", "-i", str(out),
            "-ss", "00:00:01", "-frames:v", "1",
            str(poster),
        ], check=True)

        print(f"video: {out.name}  {out.stat().st_size // (1024 * 1024)} MB (+ poster)")


if __name__ == "__main__":
    optimize_photos()
    optimize_videos()
    print("Done.")