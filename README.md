# Road to Secret Wars

A single-file fan site — Part II of the road that `roadtodoomsday.com` starts.

**What it covers:** the 364 days between *Avengers: Doomsday* (Dec 18, 2026) and
*Avengers: Secret Wars* (Dec 17, 2027), the 41 domes of Battleworld, the laws that
hold the planet together, and Marvel's announced Phase 7 slate on the other side.

## Running it

Just open `index.html` — no build, no dependencies, no network calls.

Or serve it:

```bash
npx -y http-server "road-to-secret-wars" -p 8126 -c-1
```

It's also registered in `.claude/launch.json` as `road-to-secret-wars` (port 8126).

## Sections

| Part | What's in it |
|---|---|
| I — The Last Mile | The 3 stops still ahead of Doomsday: Brand New Day, VisionQuest, Doomsday |
| II — The Interregnum | Every Marvel project announced inside the 2027 gap, tagged CONFIRMED / UNDATED / RUMORED |
| III — The Domes | 22 detailed dome dossiers + the 19 deep cuts that complete the 41 |
| IV — Laws of Battleworld | The 8 rules that make the planet work |
| V — Secret Wars | The destination card: date, directors, cast, position in the saga |
| VI — What Comes Next | Phase 7 / the Mutant Saga — X-Men, Black Panther 3, Ghost Rider, Blade |

## How it works

- **Progress saves on the device** via `localStorage`, under two keys:
  `roadToSecretWars.watched.v1` (road items) and `roadToSecretWars.domes.v1` (domes briefed).
- **Dual countdown** — toggle between Doomsday and Secret Wars. If Doomsday has already
  passed when the page loads, it defaults to Secret Wars automatically.
- **Dome filters** — All / Locked in / Strong case / Wildcard / Not yet briefed.
- **The background emblem is hand-built SVG**, not an image file: Doom's mask as a
  ghosted plate, with the Avengers "A" over it in gold, plus a crisp version of the
  "A" as the hero mark. Being vector, it stays sharp at any size and adds nothing to
  page weight. No copyrighted studio artwork is bundled or hotlinked.

## Editing the content

Everything lives in four arrays at the top of the `<script>` block in `index.html`:

- `PARTS` — the checkable road (Parts I and II)
- `DOMES` — the 22 dome dossiers, plus `DEEP_CUTS` for the remaining names
- `LAWS` — the Battleworld rules
- `NEXT` — the Phase 7 cards

Add or edit an entry and it renders automatically.

## Accuracy notes

- Release dates are Marvel's **announced** dates. They move often.
- Badges are honest about certainty: `CONFIRMED` means Marvel has said it,
  `UNDATED` means announced but unscheduled, `RUMORED` means trade reporting only.
- The dome dossiers are drawn from the 2015 *Secret Wars* comic (Hickman / Ribić).
  The "MCU case" on each card is analysis, **not** a leak — the page says so in
  Part III's intro and again in the footer.

Not affiliated with Marvel Studios or The Walt Disney Company.
