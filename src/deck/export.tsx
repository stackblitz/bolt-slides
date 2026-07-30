import { createRoot } from 'react-dom/client';
import type { ReactElement } from 'react';
import { toJpeg } from 'html-to-image';
import { DeckCtx } from './DeckContext';
// jspdf is dynamically imported below — it's only needed once the user
// actually exports, and it alone drags in a ~250kB html2canvas dependency
// we never call, so keep it out of the main bundle.

/* Export the deck as a PDF. Slides are arbitrary live web content (canvas,
   SVG, animation) — there's no way to turn that into an editable PDF, so
   each slide is rasterized to a JPEG (reusing the same isStatic:true /
   clicks:9999 context Thumb uses for thumbnails, so builds and entrance
   animations render fully revealed, in their final state, with no
   waiting) and the images are laid one-per-page into the PDF. */

const W = 1920;
const H = 1080; // capture at a fixed 16:9 canvas regardless of window size

async function captureSlide(slide: ReactElement, bg: string): Promise<string> {
  // A zero-size, clipped wrapper hides this from the viewer without moving
  // the captured node off-screen — html-to-image clones inline styles into
  // an SVG foreignObject, so a `left:-10000px` node renders 10000px outside
  // the captured canvas and comes back blank. The host itself stays at a
  // normal (unpositioned) layout so its clone paints at the origin.
  const clip = document.createElement('div');
  clip.style.cssText =
    'position:fixed; top:0; left:0; width:0; height:0; overflow:hidden; pointer-events:none;';
  const host = document.createElement('div');
  host.style.cssText = `width:${W}px; height:${H}px; overflow:hidden;`;
  clip.appendChild(host);
  document.body.appendChild(clip);
  const root = createRoot(host);
  try {
    await new Promise<void>((resolve) => {
      root.render(
        <div
          className="deck export-capture"
          style={{ width: W, height: H, position: 'relative' }}
        >
          <DeckCtx.Provider value={{ clicks: 9999, isStatic: true }}>
            <div className="slide-stage" style={{ animation: 'none' }}>
              {slide}
            </div>
          </DeckCtx.Provider>
        </div>
      );
      // isStatic renders final state on first commit — two rAFs just give
      // the browser a paint before we snapshot.
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
    // The live app's dark theme comes from `body`'s background — an
    // ancestor this offscreen host doesn't have. html-to-image also doesn't
    // reliably inline the captured root's own background, and a CSS custom
    // property wouldn't resolve inside the isolated SVG it rasterizes
    // through, so pass the theme color pre-resolved to a literal value.
    // JPEG (not PNG): the canvas is fully opaque, so there's no alpha
    // channel worth keeping — jsPDF embeds PNG's RGBA essentially
    // uncompressed (a 26-slide deck came out at 200MB+), while JPEG gives
    // real compression and is a fraction of the size at this quality.
    return await toJpeg(host, { pixelRatio: 1, backgroundColor: bg, quality: 0.92 });
  } finally {
    root.unmount();
    clip.remove();
  }
}

async function captureSlides(
  slides: ReactElement[],
  onProgress?: (done: number, total: number) => void
): Promise<string[]> {
  // fonts.ready only waits for faces something on-screen already requested
  // — force-load every family/weight the deck uses so a slide that's first
  // to use e.g. mono type doesn't get captured mid-fetch with a fallback font.
  await Promise.all(
    [
      '400 16px Inter',
      '500 16px Inter',
      '600 16px Inter',
      '700 16px Inter',
      '400 16px "JetBrains Mono"',
      '500 16px "JetBrains Mono"',
    ].map((f) => document.fonts?.load(f))
  );
  await document.fonts?.ready;
  const bg = getComputedStyle(document.documentElement)
    .getPropertyValue('--bg')
    .trim();
  const images: string[] = [];
  for (const [i, slide] of slides.entries()) {
    try {
      images.push(await captureSlide(slide, bg));
    } catch (err) {
      throw new Error(`Slide ${i + 1}: ${err instanceof Error ? err.message : err}`);
    }
    onProgress?.(images.length, slides.length);
  }
  return images;
}

function deckFilename(): string {
  const name = document.title
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '-')
    .slice(0, 80);
  return name || 'deck';
}

export async function exportPdf(
  slides: ReactElement[],
  onProgress?: (done: number, total: number) => void
): Promise<void> {
  const images = await captureSlides(slides, onProgress);
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [W, H] });
  images.forEach((img, i) => {
    if (i > 0) pdf.addPage([W, H], 'landscape');
    pdf.addImage(img, 'JPEG', 0, 0, W, H);
  });
  pdf.save(deckFilename() + '.pdf');
}
