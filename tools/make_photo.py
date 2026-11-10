"""Make the web version of a people photo: _raw/<name>.<ext>  ->  media/<name>.jpg

    python tools/make_photo.py _raw/team_liamJ.jpg [more files...]

Steps, in order:
  1. Rotate by the camera's EXIF orientation, so phone photos are upright.
  2. Center-crop to a square (the site shows people as circles).
  3. Downscale to SIZE x SIZE with Lanczos resampling.
  4. Light unsharp mask, to restore edge detail softened by the downscale.
  5. Save as a progressive JPEG with all metadata removed (no GPS or camera data on the web).
     Quality starts at QUALITY and steps down only if the file is over MAX_KB.
"""
import sys
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

SIZE = 400          # px; shown as a 180 px circle, so 400 stays sharp on 2x screens
QUALITY = 85        # starting JPEG quality
MIN_QUALITY = 70    # never go below this to hit the size target
MAX_KB = 60         # file-size target
UNSHARP = dict(radius=0.8, percent=60, threshold=2)  # gentle; raise percent for more bite

REPO = Path(__file__).resolve().parent.parent


def make(src: Path) -> Path:
    img = ImageOps.exif_transpose(Image.open(src))
    img = img.convert("RGB")
    img = ImageOps.fit(img, (SIZE, SIZE), method=Image.LANCZOS, centering=(0.5, 0.5))
    img = img.filter(ImageFilter.UnsharpMask(**UNSHARP))

    out = REPO / "media" / (src.stem + ".jpg")
    for q in range(QUALITY, MIN_QUALITY - 1, -5):
        img.save(out, "JPEG", quality=q, optimize=True, progressive=True, subsampling="4:2:0")
        if out.stat().st_size <= MAX_KB * 1024:
            break
    print(f"{src.name} -> media/{out.name}  {SIZE}x{SIZE}  q={q}  {out.stat().st_size // 1024} KB")
    return out


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for arg in sys.argv[1:]:
        make(Path(arg))
