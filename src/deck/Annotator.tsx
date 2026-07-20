import { useEffect, useRef, useState } from 'react';

/* State-of-the-art annotation: a full-screen canvas + a floating tool bar.
   Tools: pen, highlighter, line, arrow, rectangle, ellipse, eraser; a color
   palette; three sizes; undo + clear. Strokes are stored as data (per slide,
   in `store`) so they PERSIST on the slide they were made on, and undo /
   stroke-erase work cleanly. The bar + drawing are only interactive when
   `active`; otherwise the canvas just displays the slide's saved annotations.

   CONTENT-ANCHORED: when a stroke is committed it is anchored to the block
   element under its center (stored as a child-index path from the slide
   stage) with coordinates relative to THAT element's box. Because the slide
   DOM is identical at every viewport — only CSS reflows it — the same path
   resolves on any screen, so a circle drawn around a stat on a laptop rings
   the same stat on a phone, wherever the layout moved it. Strokes over empty
   background anchor to the stage and scale with the viewport. */

type Tool =
  | 'pen'
  | 'highlighter'
  | 'line'
  | 'arrow'
  | 'rect'
  | 'ellipse'
  | 'eraser';
type Pt = { x: number; y: number }; // relative to the stroke's anchor box (0..1)
export type Stroke = {
  tool: Tool;
  color: string;
  size: number;
  points: Pt[];
  anchor?: string;
};
type Box = { left: number; top: number; width: number; height: number };

const TOOLS: { id: Tool; label: string; path: string }[] = [
  { id: 'pen', label: 'Pen', path: 'M4 20h4L18 10a2 2 0 0 0-3-3L5 17z' },
  {
    id: 'highlighter',
    label: 'Highlighter',
    path: 'M4 20h5l8-8-4-4-9 9zM13 7l4 4',
  },
  { id: 'line', label: 'Line', path: 'M5 19L19 5' },
  { id: 'arrow', label: 'Arrow', path: 'M6 18L18 6M18 6h-6M18 6v6' },
  { id: 'rect', label: 'Rectangle', path: 'M4 6h16v12H4z' },
  {
    id: 'ellipse',
    label: 'Ellipse',
    path: 'M12 6c4.5 0 8 2.7 8 6s-3.5 6-8 6-8-2.7-8-6 3.5-6 8-6z',
  },
  {
    id: 'eraser',
    label: 'Eraser',
    path: 'M8 18l-4-4a2 2 0 0 1 0-3l7-7a2 2 0 0 1 3 0l4 4a2 2 0 0 1 0 3l-7 7zM7 17h11',
  },
];
const COLORS = ['var(--primary)', '#ffffff', '#ef4444', '#f5b73a', '#4aa8ff'];
const COLOR_LABELS: Record<string, string> = {
  'var(--primary)': 'Accent',
  '#ffffff': 'White',
  '#ef4444': 'Red',
  '#f5b73a': 'Amber',
  '#4aa8ff': 'Blue',
};
const SIZES = [3, 6, 11];
const SIZE_LABELS = ['Small stroke', 'Medium stroke', 'Large stroke'];

const IconUndo = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 8L5 12l4 4" />
    <path d="M5 12h9a4 4 0 1 1 0 8h-3" />
  </svg>
);
const IconTrash = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 7h14M10 7V5h4v2M6 7l1 13h10l1-13" />
  </svg>
);

/* ── content anchoring ─────────────────────────────────────────────── */
const stage = () => document.querySelector('.slide-stage');
const viewportBox = (): Box => ({
  left: 0,
  top: 0,
  width: window.innerWidth,
  height: window.innerHeight,
});

/* child-index path from the stage root, e.g. "0.2.1" ("" = the stage itself) */
function pathOf(el: Element): string {
  const root = stage();
  const parts: number[] = [];
  let cur: Element | null = el;
  while (cur && cur !== root) {
    const parent: Element | null = cur.parentElement;
    if (!parent) return '';
    parts.unshift(Array.prototype.indexOf.call(parent.children, cur));
    cur = parent;
  }
  return cur === root ? parts.join('.') : '';
}
function resolveAnchor(path?: string): Box | null {
  if (path === undefined) return null;
  const root = stage();
  if (!root) return null;
  let cur: Element = root;
  if (path !== '') {
    for (const i of path.split('.').map(Number)) {
      const next = cur.children[i];
      if (!next) return null;
      cur = next;
    }
  }
  const r = cur.getBoundingClientRect();
  return r.width > 4 && r.height > 4 ? r : null;
}
/* the block element under a client point (skipping the canvas + chrome) */
function anchorAt(cx: number, cy: number): string {
  for (const el of document.elementsFromPoint(cx, cy)) {
    if (!el.closest('.slide-stage')) continue;
    let block: Element | null = el;
    while (
      block &&
      block !== stage() &&
      getComputedStyle(block).display === 'inline'
    )
      block = block.parentElement;
    return block ? pathOf(block) : '';
  }
  return '';
}
/* a stroke's points mapped to client pixels at the CURRENT layout */
function clientPts(s: Stroke): Pt[] {
  const r = resolveAnchor(s.anchor) ?? viewportBox();
  return s.points.map((p) => ({
    x: r.left + p.x * r.width,
    y: r.top + p.y * r.height,
  }));
}

function distToSeg(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
) {
  const dx = bx - ax,
    dy = by - ay;
  const len = dx * dx + dy * dy || 1;
  let t = ((px - ax) * dx + (py - ay) * dy) / len;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}
function outline(tool: Tool, pts: Pt[]): Pt[] {
  if (pts.length < 2) return pts;
  const a = pts[0],
    b = pts[pts.length - 1];
  if (tool === 'rect') return [a, { x: b.x, y: a.y }, b, { x: a.x, y: b.y }, a];
  if (tool === 'ellipse') {
    const cx = (a.x + b.x) / 2,
      cy = (a.y + b.y) / 2,
      rx = Math.abs(b.x - a.x) / 2,
      ry = Math.abs(b.y - a.y) / 2;
    return Array.from({ length: 25 }, (_, i) => ({
      x: cx + rx * Math.cos((i / 24) * 2 * Math.PI),
      y: cy + ry * Math.sin((i / 24) * 2 * Math.PI),
    }));
  }
  return pts;
}
function hits(s: Stroke, x: number, y: number, r: number) {
  const pts = outline(s.tool, clientPts(s));
  if (pts.length === 1)
    return Math.hypot(pts[0].x - x, pts[0].y - y) < r + s.size;
  for (let i = 0; i < pts.length - 1; i++)
    if (
      distToSeg(x, y, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y) <
      r + s.size / 2
    )
      return true;
  return false;
}

export default function Annotator({
  slide,
  store,
  active,
}: {
  slide: number;
  store: Record<number, Stroke[]>;
  active: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  if (!store[slide]) store[slide] = [];
  const strokes = useRef<Stroke[]>(store[slide]);
  const draft = useRef<Stroke | null>(null); // draft points are raw client px
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(SIZES[1]);
  const toolRef = useRef(tool),
    colorRef = useRef(color),
    sizeRef = useRef(size);
  toolRef.current = tool;
  colorRef.current = color;
  sizeRef.current = size;

  const resolve = (c: string) =>
    c.startsWith('var(')
      ? getComputedStyle(document.documentElement)
          .getPropertyValue('--primary')
          .trim() || '#4fe5b0'
      : c;

  function paint(ctx: CanvasRenderingContext2D, s: Stroke, p: Pt[]) {
    if (!p.length) return;
    ctx.save();
    ctx.strokeStyle = resolve(s.color);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = s.size;
    if (s.tool === 'highlighter') {
      ctx.globalAlpha = 0.32;
      ctx.lineWidth = s.size * 3.2;
    }
    const a = p[0],
      b = p[p.length - 1];
    ctx.beginPath();
    if (s.tool === 'pen' || s.tool === 'highlighter') {
      ctx.moveTo(a.x, a.y);
      for (let i = 1; i < p.length; i++) ctx.lineTo(p[i].x, p[i].y);
      ctx.stroke();
    } else if (s.tool === 'line' || s.tool === 'arrow') {
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      if (s.tool === 'arrow') {
        const ang = Math.atan2(b.y - a.y, b.x - a.x),
          h = 8 + s.size * 1.8;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(
          b.x - h * Math.cos(ang - 0.4),
          b.y - h * Math.sin(ang - 0.4)
        );
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(
          b.x - h * Math.cos(ang + 0.4),
          b.y - h * Math.sin(ang + 0.4)
        );
        ctx.stroke();
      }
    } else if (s.tool === 'rect') {
      ctx.strokeRect(
        Math.min(a.x, b.x),
        Math.min(a.y, b.y),
        Math.abs(b.x - a.x),
        Math.abs(b.y - a.y)
      );
    } else if (s.tool === 'ellipse') {
      ctx.ellipse(
        (a.x + b.x) / 2,
        (a.y + b.y) / 2,
        Math.abs(b.x - a.x) / 2,
        Math.abs(b.y - a.y) / 2,
        0,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
    ctx.restore();
  }
  function redraw() {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cv.width / dpr, cv.height / dpr);
    for (const s of strokes.current) paint(ctx, s, clientPts(s));
    if (draft.current) paint(ctx, draft.current, draft.current.points);
  }
  function commit() {
    store[slide] = strokes.current;
    redraw();
  }
  function erase(x: number, y: number) {
    const before = strokes.current.length;
    strokes.current = strokes.current.filter((s) => !hits(s, x, y, 12));
    if (strokes.current.length !== before) commit();
  }

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
      cv.style.width = window.innerWidth + 'px';
      cv.style.height = window.innerHeight + 'px';
      redraw();
    };
    fit();
    const onUp = () => {
      const d = draft.current;
      if (!d) return;
      draft.current = null;
      // anchor the stroke to the content under its center, then store its
      // points relative to that element's box
      const xs = d.points.map((p) => p.x),
        ys = d.points.map((p) => p.y);
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
      const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      d.anchor = anchorAt(cx, cy);
      const r = resolveAnchor(d.anchor) ?? viewportBox();
      d.points = d.points.map((p) => ({
        x: (p.x - r.left) / r.width,
        y: (p.y - r.top) / r.height,
      }));
      strokes.current.push(d);
      commit();
    };
    // re-render after the slide's entrance motion settles (anchor boxes move)
    const t1 = window.setTimeout(redraw, 400);
    const t2 = window.setTimeout(redraw, 1100);
    window.addEventListener('resize', fit);
    window.addEventListener('pointerup', onUp);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', fit);
      window.removeEventListener('pointerup', onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function down(e: React.PointerEvent) {
    if (toolRef.current === 'eraser') {
      erase(e.clientX, e.clientY);
      return;
    }
    draft.current = {
      tool: toolRef.current,
      color: colorRef.current,
      size: sizeRef.current,
      points: [{ x: e.clientX, y: e.clientY }],
    };
    redraw();
  }
  function move(e: React.PointerEvent) {
    if (toolRef.current === 'eraser') {
      if (e.buttons) erase(e.clientX, e.clientY);
      return;
    }
    const d = draft.current;
    if (!d) return;
    if (d.tool === 'pen' || d.tool === 'highlighter')
      d.points.push({ x: e.clientX, y: e.clientY });
    else d.points = [d.points[0], { x: e.clientX, y: e.clientY }];
    redraw();
  }

  // drag-to-scroll for the bar when it overflows (phones scroll natively by
  // touch; this covers mouse users). A 4px threshold keeps clicks working,
  // and a capture-phase click handler swallows the click after a real drag.
  const barRef = useRef<HTMLDivElement>(null);
  const barDrag = useRef({ down: false, moved: false, x: 0, left: 0 });
  function barDown(e: React.PointerEvent) {
    if (e.pointerType !== 'mouse' || !barRef.current) return;
    barDrag.current = {
      down: true,
      moved: false,
      x: e.clientX,
      left: barRef.current.scrollLeft,
    };
  }
  function barMove(e: React.PointerEvent) {
    const d = barDrag.current;
    if (!d.down || !barRef.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 4) return;
    d.moved = true;
    barRef.current.scrollLeft = d.left - dx;
  }
  function barUp() {
    barDrag.current.down = false;
  }
  function barClickCapture(e: React.MouseEvent) {
    if (barDrag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      barDrag.current.moved = false;
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="ann-canvas"
        style={{
          pointerEvents: active ? 'auto' : 'none',
          cursor: tool === 'eraser' ? 'cell' : 'crosshair',
        }}
        onPointerDown={down}
        onPointerMove={move}
      />
      {active && (
        <div
          className="ann-bar"
          ref={barRef}
          onPointerDown={barDown}
          onPointerMove={barMove}
          onPointerUp={barUp}
          onPointerLeave={barUp}
          onClickCapture={barClickCapture}
        >
          {TOOLS.map((t) => (
            <button
              key={t.id}
              className={'ann-btn' + (tool === t.id ? ' on' : '')}
              data-tip={t.label}
              aria-label={t.label}
              aria-pressed={tool === t.id}
              onClick={() => setTool(t.id)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={t.path} />
              </svg>
            </button>
          ))}
          <span className="ann-sep" />
          {COLORS.map((c) => (
            <button
              key={c}
              className={'ann-color' + (color === c ? ' on' : '')}
              data-tip="Color"
              aria-label={(COLOR_LABELS[c] ?? 'Color') + ' pen'}
              aria-pressed={color === c}
              onClick={() => setColor(c)}
              style={{ background: c }}
            />
          ))}
          <span className="ann-sep" />
          {SIZES.map((s, i) => (
            <button
              key={s}
              className={'ann-size' + (size === s ? ' on' : '')}
              data-tip="Stroke size"
              aria-label={SIZE_LABELS[i]}
              aria-pressed={size === s}
              onClick={() => setSize(s)}
            >
              <span style={{ width: s + 4, height: s + 4 }} />
            </button>
          ))}
          <span className="ann-sep" />
          <button
            className="ann-btn"
            data-tip="Undo"
            aria-label="Undo"
            onClick={() => {
              strokes.current = strokes.current.slice(0, -1);
              commit();
            }}
          >
            <IconUndo />
          </button>
          <button
            className="ann-btn"
            data-tip="Clear all"
            aria-label="Clear all"
            onClick={() => {
              strokes.current = [];
              commit();
            }}
          >
            <IconTrash />
          </button>
        </div>
      )}
    </>
  );
}
