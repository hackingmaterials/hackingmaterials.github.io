# hackingmaterials.github.io
HackingMaterials group web site

live on:
https://hackingmaterials.github.io

## Adding a person

1. Upload their full-size photo to `_raw/`, named `team_<firstname><LastInitial>.jpg` (e.g. `team_liamJ.jpg`). JPG, PNG or WebP; any size.
2. Add their entry to `components/team.json`, with `"photo": "team_liamJ.jpg"`.

A GitHub Action (`.github/workflows/photos.yml`) then builds the web version in `media/` and commits it: a center-cropped 400×400 JPEG, Lanczos-downscaled with a light unsharp mask and metadata removed, usually 20–30 KB. To change the size or sharpening, edit the settings at the top of `tools/make_photo.py`. To run it by hand: `python tools/make_photo.py _raw/team_liamJ.jpg` (needs Pillow).

To move someone to alumni, move their entry from `team.json` to `components/alumni.json`.
