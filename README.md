# Road to Secret Wars

Part two of [The Doomsday Protocol](https://claude28claude.github.io/whattowatchbeforedoomsday/):
a fan-made road from *Avengers: Doomsday* (18 December 2026) to *Avengers: Secret Wars*
(17 December 2027).

**Live:** https://claude28claude.github.io/road-to-secret-wars/

Rebuilt on 16 November 2026 on the Doomsday Protocol's own engine and design, so the two
sites read as one series: poster-as-checkbox rows, glass panels, the Avengers "A" fixed
behind the page, progress bars, filters, search, save/load, installable offline app.
Doomsday is green; this one is violet, because violet is what Doomsday already uses to
mean Secret Wars.

## What is on it

| Part | Contents |
|---|---|
| I — The Last Mile | Brand New Day, VisionQuest, Endgame Encore, Avengers: Doomsday (the spoiler gate) |
| II — The Interregnum | The 2027 gap: Born Again S3, X-Men '97 S3, Beyond the Spider-Verse, the animation slate, and the 1984 and 2015 comics |
| III — The Battleworld Rewatch | 23 titles the domes are built from, each linked to the domes it explains |
| IV — The Domes | 22 dome dossiers with designed dome posters, graded Locked in / Strong case / Wildcard, plus the 19 deep cuts |
| Laws, Destination, After | The 8 laws of Battleworld, the Secret Wars card with the official logo and a countdown, and the post-Secret Wars slate |

## Files

| file | contents |
|---|---|
| `index.html` | markup and prose |
| `styles.css` | the Doomsday stylesheet, recoloured violet, plus dome-poster and destination styles |
| `data.js` | `PARTS`, `DOMES`, `POSTERS`, `COMPOSED` — must load before `app.js` |
| `app.js` | rendering, ticks, stats, countdowns, the Battleworld mark generator, PWA wiring |
| `sw.js` / `manifest.webmanifest` | offline app — **bump `CACHE` in `sw.js` on every content change** |
| `assets/` | the Avengers A glyph, the Secret Wars logo (SVG), app icons |

## Rules that matter

- Progress is saved per title id under `roadToSecretWars.v2`. Domes are stored as
  `dome:<id>` because a dome and a film can share a name (Apocalypse). Ticks from the first
  version of the site (`roadToSecretWars.watched.v1` / `.domes.v1`) are carried over once.
- Never present a rumour as announced. Unreleased titles say "Not out yet" and say plainly
  when a date or runtime is a placeholder.
- Posters are hotlinked from Wikipedia; every URL was checked to serve an image.

## Running it locally

```bash
npx -y http-server road-to-secret-wars -p 8126 -c-1
```

Registered in the workspace `.claude/launch.json` as `road-to-secret-wars`. A stale service
worker will serve old files while testing — unregister it and clear caches first.

Fan-made, non-commercial, not affiliated with Marvel Studios, Disney or Sony.
