# Couch × Eric Simons — deck notes

The deck lives in this repo now (`src/App.tsx`). It's a working web app, built
with Bolt Slides. Theme: "Product" — flat near-black, all Inter, iMessage blue
as the only accent (your pick). 15 slides. `Couch-Pitch-Deck.pdf` in the repo
root is a static export for DMs/email.

**Slide 4 ("Not a mockup.") is waiting on your real screenshots** — drop the
four iPhone screenshots into this folder (e.g. `screenshots/`) and tell
Claude; three get wired in at `public/receipts/r1–r3.png` and the PDF gets
recut. Until then it shows placeholder frames.

## Run it

```
npm install
npm run dev        # present at localhost:5173
npm run build      # static site in dist/
```

Present: `→` advances (slide 3's conversation and every build reveals
beat-by-beat), `F` fullscreen, `P` presenter notes, `A` annotate, `G` grid.
URL hash deep-links (`/#3` opens on Mia).

## Publish (do this before EOD Monday US time — ~10am Tue AEST)

Fastest paths, pick one:

1. **Bolt (on-brand for this campaign):** push this repo to your GitHub, open
   `bolt.new/github.com/<you>/<repo>`, hit Deploy. You get a `bolthost.dev`
   link viewable without login.
2. **Netlify/Vercel:** `npm run build`, then drop `dist/` into Netlify Drop
   (app.netlify.com/drop) — 30 seconds, no account gymnastics.

Test the link in an incognito tab and on your phone before posting.

## The reply (post publicly on his tweet — that was the mechanic he asked for)

> Couch — virtual patients for therapists in training.
>
> Psych students get ~1 role-play in an entire degree, then meet their first
> real client. Mia texts them like a real one — guarded, winnable — and
> debriefs every rep.
>
> Solo, Melbourne, $0 raised. Second clinical product; the first already pays.
>
> Deck (it's a working web app, obviously): [LINK]
> Slide 3 is playable. 🫡

Optional follow-up DM / email (he told one founder "For sure — email the
link"): same link + the PDF attached, one line: "Live deck + PDF backup.
Happy to do a 15-min call whenever suits — it's morning in Melbourne when
it's afternoon in SF."

## What changed in this repo

- `src/App.tsx` — the Couch deck (starter demo replaced)
- `src/styles/tokens.css` — "Product" theme (flat iMessage blue);
  `src/styles/couch.css` — styles for the phone demo, receipts row, debrief
  card, and wedge model; font import in `base.css` line 1
- New components: `PhoneChat` (native dark-mode iMessage, deliberately not
  tokenized so it matches the real screenshots in every theme), `Debrief`,
  `WedgeModel`
- `public/receipts/` — slide-4 screenshot slots (placeholders until your
  real ones land)
- `src/components/Globe.tsx` — one line: opening rotation starts on
  Australia instead of the Americas
- `index.html` — real title + 🛋️ favicon
- Engine (`src/deck/`) untouched. Alternate themes kept in the chat
  (variant A warm serif, variant B paper light) if you ever want to swap
  `tokens.css`.

## Guardrails honored

Current numbers only (5 alpha students, 3 uni conversations, $0 raised); no
"AI" framing anywhere near the front; no accreditation/placement-hours/
readiness claims — university layer described as voluntary + formative;
pricing A$15–25 included per your confirmation. One flag: the MedReport
"$299/mo" is written exactly as in your notes — if that's AUD and you'd
rather show "A$299", change it on slide 12 before publishing.
