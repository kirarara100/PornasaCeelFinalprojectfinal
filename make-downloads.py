"""
Makes the downloads folder used by the Download buttons.

WHY: browsers refuse to save files when a site is opened straight from a folder
(file://) or when images come from another domain. This script stores a copy of every
image in downloads/ as a tiny script, which the site loads only when someone clicks Download.

WHEN TO RUN: after you add, rename, or replace an image inside images/
    python make-downloads.py
(Nothing else needs to change. If this step is skipped, downloads still work online.)
"""
import base64, mimetypes, pathlib

root = pathlib.Path(__file__).parent
out = root / "downloads"
out.mkdir(exist_ok=True)
for old in out.glob("*.js"):
    old.unlink()

count = 0
for image in sorted((root / "images").rglob("*")):
    if image.suffix.lower() not in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".pdf"}:
        continue
    key = image.relative_to(root).as_posix()                    # e.g. images/certs/cert1.png
    mime = mimetypes.guess_type(image.name)[0] or "application/octet-stream"
    data = base64.b64encode(image.read_bytes()).decode()
    name = key.replace("/", "__") + ".js"
    (out / name).write_text(
        '(window.EMBEDDED_FILES = window.EMBEDDED_FILES || {})["%s"] = "data:%s;base64,%s";\n' % (key, mime, data),
        encoding="utf-8",
    )
    count += 1
print("Done: %d files written to downloads/" % count)
