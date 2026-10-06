# Hero background video

`mountain.mp4` — the hero background loop on the homepage.

## Before launch: compress this

The current file is **~68 MB**, which is far too large for a page background.
On a 4G connection that is roughly 30–50 seconds of downloading, and it burns
mobile data. Aim for **2–5 MB**.

Fix with ffmpeg (install from https://ffmpeg.org/download.html):

```bash
ffmpeg -i mountain.mp4 \
  -vf "scale=1280:-2" \
  -c:v libx264 -crf 28 -preset slow \
  -c:a aac -b:a 96k -movflags +faststart \
  mountain.mp4
```

`-movflags +faststart` matters: without it the browser cannot start playing
until the whole file has downloaded. Keep the result named `mountain.mp4` so
the path in `src/components/Hero.tsx` keeps working.

Other options that avoid shipping a large file at all:

- Re-export a short (6–10 s) seamless loop instead of the full clip.
- Trim to just the strongest shots.
- Encode WebM/VP9 alongside MP4 for roughly 30 % smaller files at the same
  quality, then add a second `<source>` to `Hero.tsx`.

## Poster

`mountain-poster.jpg` is the still image shown before the video starts
buffering. Replace it with a frame from the actual video once the video is
compressed, so the first paint matches what plays next.