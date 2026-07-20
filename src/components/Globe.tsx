import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import Reveal from '../deck/Reveal';
import { useDeck } from '../deck/DeckContext';

/* A 3D-globe slide, hand-built on Canvas2D (no WebGL, no dependencies): a
   slowly-rotating, drag-to-spin dotted earth with accent markers at real
   coordinates, DOM-bound label chips that ride the globe (and fade behind
   it), great-circle arcs between locations, and stat rows beside it. Colors
   are probed from the live tokens, so re-theming recolors the globe too.
   ONLY for a genuinely geographic story — users or revenue by country,
   market entry, presence.
   <Globe kicker="Everywhere" title="Live in 28 regions."
     markers={[{ location: [37.77, -122.41], size: 0.08, label: 'sfo1', value: '221k evt/s' }, …]}
     arcs={[{ from: [37.77, -122.41], to: [51.5, -0.12] }]}
     stats={[{ value: '48%', label: 'North America' }, …]} />
   Thumbnails render a static disc; reduced motion stops the auto-spin. */
export type GlobeMarker = {
  location: [number, number];
  size?: number;
  /** chip anchored to the marker (e.g. a city or region code) */
  label?: string;
  /** accent badge beside the label (e.g. a share or throughput) */
  value?: string;
};
export type GlobeArc = { from: [number, number]; to: [number, number] };
export type GlobeStat = { value: ReactNode; label: string };

/* 256×128 equirectangular land mask (white = land). From the cobe project
   (MIT, shuding/cobe), map data via Wikipedia's blank world map. */
const LAND_MASK =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAAAXNSR0IArs4c6QAABA5JREFUeNrV179uHEUAx/Hf3JpbF+E2VASBsmVKTBcpKJs3SMEDcDwBiVJAAewYEBUivIHT0uUBIt0YCovKD0CRjUC4QfHYh8hYXu+P25vZ2Zm9c66gMd/GJ/tz82d3bk8GN4SrByYF2366FNTACIAkivVAAazQdnf3MvAlbNUQfOPAdQDvSAimMWhwy4I2g4SU+Kp04ISLpPBAKLxPyic3O/CCi+Y7rUJbiodcpDOFY7CgxCEXmdYD2EYK2s5lApOx5pEDDYCUwM1XdJUwBV11QQMg59kePSCaPAASQMEL2hwo6TJFgxpg+TgC2ymXPbuvc40awr3D1QCFfbH9kcoqAOkZozpQo0aqAGQRKCog/+tjkgbNFEtg2FffBvBGlSxHoAaAa1u6X4PBAwDiR8FFsrQgeUhfJTSALaB9jy5NCybJPn1SVFiWk7ywN+KzhH1aKAuydhGkbEF4lWohLXDXavlyFgHY7LBnLRdlAP6BS5Cc8RfVDXbkwN/oIvmY+6obbNeBP0JwTuMGu9gTzy1Q4RS/cWpfzszeYwd+CAFrtBW/Hur0gLbJGlD+/OjVwe/drfBxkbbg63dndEDfiEBlAd7ac0BPe1D6Jd8dfbLH+RI0OzseFB5s01/M+gMdAeluLOCAuaUA9Lezo/vSgXoCX9rtEiXnp7Q1W/CNyWcd8DXoS6jH/YZ5vAJEWY2dXFQe2TUgaFaNejCzJ98g6HnlVrsE58sDcYqg+9XY75fPqdoh/kRQWiXKg8MWlJQxUFMPjqnyujhFBE7UxIMjyszk0QwQlFsezImsyvUYYYVED2pk6m0Tg8T04Fwjk2kdAwSACqlM6gRRt3vQYAFGX0Ah7Ebx1H+MDRI5ui0QldH4j7FGcm90XdxD2Jg1AOEAVAKhEFXSn4cKUELurIAKwJ3MArypPscQaLhJFICJ0ohjDySAdH8AhDtCiTuMycH8CXzhH9jUACAO5uMhoAwA5i+T6WAKmmAqnLy80wxHqIPFYpqCwxGaYLt4Dyievg5kEoVEUAhs6pqKgFtDQYOuaXypaWKQfIuwwoGSZgfLsu/XAtI8cGN+h7Cc1A5oLOMhwlIPXuhu48AIvsSBkvtV9wsJRKCyYLfq5lTrQMFd1a262oqBck9K1V0YjQg0iEYYgpS1A9GlXQV5cykwm4A7BzVsxQqo7E+zCegO7Ma7yKgsuOcfKbMBwLC8wvVNYDsANYalEpOAa6zpWjTeMKGwEwC1CiQewJc5EKfgy7GmRAZA4vUVGwE2dPM/g0xuAInE/yG5aZ8ISxWGfYigUVbdyBElTHh2uCwGdfCkOLGgQVBh3Ewp+/QK4CDlR5Ws/Zf7yhCf8pH7vinWAvoVCQ6zz0NX5V/6GkAVV+2/5qsJ/gU8bsxpM8IeAQAAAABJRU5ErkJggg==';

/* resolve a CSS custom property to 0–255 rgb by letting the browser compute it */
function probe(
  cssVar: string,
  prop: 'color' | 'backgroundColor' = 'color'
): [number, number, number] {
  const el = document.createElement('div');
  el.style.cssText = `position:absolute;visibility:hidden;${
    prop === 'color' ? 'color' : 'background-color'
  }:var(${cssVar})`;
  document.body.appendChild(el);
  const m = getComputedStyle(el)[prop].match(/[\d.]+/g);
  el.remove();
  if (!m || m.length < 3) return [128, 128, 128];
  return [+m[0], +m[1], +m[2]];
}
const mix = (a: number[], b: number[], t: number) =>
  [0, 1, 2].map((i) => Math.round(a[i] * (1 - t) + b[i] * t)) as [
    number,
    number,
    number
  ];
const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* land points on a Fibonacci sphere, filtered by the mask — computed once */
let landCache: Promise<Float32Array> | null = null;
function landPoints(): Promise<Float32Array> {
  if (landCache) return landCache;
  landCache = new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const W = 256,
        H = 128;
      const c = document.createElement('canvas');
      c.width = W;
      c.height = H;
      const g = c.getContext('2d')!;
      g.drawImage(img, 0, 0);
      const data = g.getImageData(0, 0, W, H).data;
      const N = 12000,
        GA = Math.PI * (3 - Math.sqrt(5));
      const pts: number[] = [];
      for (let i = 0; i < N; i++) {
        const y = 1 - (2 * i) / (N - 1);
        const rad = Math.sqrt(1 - y * y);
        const lng = (i * GA) % (2 * Math.PI);
        const x = Math.cos(lng) * rad;
        const z = Math.sin(lng) * rad;
        const lat = Math.asin(y);
        const l = Math.atan2(z, x); // -π..π
        const u = Math.min(W - 1, Math.floor((l / (2 * Math.PI) + 0.5) * W));
        const v = Math.min(H - 1, Math.floor((0.5 - lat / Math.PI) * H));
        if (data[(v * W + u) * 4] > 128)
          pts.push(
            Math.cos(lat) * Math.sin(l),
            Math.sin(lat),
            Math.cos(lat) * Math.cos(l)
          );
      }
      resolve(new Float32Array(pts));
    };
    img.src = LAND_MASK;
  });
  return landCache;
}

const toVec = ([lat, lng]: [number, number]): [number, number, number] => {
  const p = (lat * Math.PI) / 180,
    l = (lng * Math.PI) / 180;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
};

function GlobeCanvas({
  markers,
  arcs = [],
}: {
  markers: GlobeMarker[];
  arcs?: GlobeArc[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();
  const drag = useRef({ down: false, startX: 0, r: 0, rBase: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const fg = probe('--fg');
    const bg = probe('--bg', 'backgroundColor');
    const primary = probe('--primary');
    // carry the theme: land dots and the atmosphere lean toward the accent
    const dot = mix(mix(bg, fg, 0.6), primary, 0.24);
    const atmo = mix(fg, primary, 0.45);
    const theta = 0.28;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let phi = 3.75; // open on Australia — this deck's story starts in Melbourne
    let raf = 0;
    let size = 0;
    const marks = markers.map((m) => ({
      v: toVec(m.location),
      s: m.size ?? 0.06,
    }));
    // arcs: lifted great-circle samples (slerp + radial lift), precomputed once
    const K = 44;
    const arcPts = arcs.map((a) => {
      const A = toVec(a.from),
        B = toVec(a.to);
      const d =
        clamp01((A[0] * B[0] + A[1] * B[1] + A[2] * B[2] + 1) / 2) * 2 - 1;
      const ang = Math.acos(Math.min(1, Math.max(-1, d)));
      const sinAng = Math.sin(ang) || 1e-4;
      const lift = 0.05 + 0.11 * (ang / Math.PI);
      const p = new Float32Array((K + 1) * 3);
      for (let i = 0; i <= K; i++) {
        const t = i / K;
        const w0 = Math.sin((1 - t) * ang) / sinAng;
        const w1 = Math.sin(t * ang) / sinAng;
        const r = 1 + lift * Math.sin(Math.PI * t);
        p[i * 3] = (A[0] * w0 + B[0] * w1) * r;
        p[i * 3 + 1] = (A[1] * w0 + B[1] * w1) * r;
        p[i * 3 + 2] = (A[2] * w0 + B[2] * w1) * r;
      }
      return p;
    });
    let pts: Float32Array | null = null;
    landPoints().then((p) => {
      pts = p;
    });

    const resize = () => {
      size = wrap.offsetWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const cosT = Math.cos(theta),
      sinT = Math.sin(theta);
    // smooth horizon fade: 0 at the limb, 1 once safely on the visible side
    const smooth = (zr: number) => {
      const t = clamp01(zr / 0.22);
      return t * t * (3 - 2 * t);
    };
    // arc-point visibility: in front of the globe, or outside its silhouette
    const arcVis = (xr: number, yr: number, zr: number) =>
      clamp01(Math.max(zr / 0.08, (Math.hypot(xr, yr) - 1) / 0.04));

    const render = () => {
      const s = size * dpr,
        cx = s / 2,
        cy = s / 2,
        R = s * 0.4;
      ctx.clearRect(0, 0, s, s);
      // atmosphere — limb brightening, then a soft falloff that reaches ZERO
      // exactly at the canvas half-size so nothing ever clips square
      const G = s * 0.5,
        inner = R * 0.8;
      const at = (r: number) => clamp01((r - inner) / (G - inner));
      const glow = ctx.createRadialGradient(cx, cy, inner, cx, cy, G);
      glow.addColorStop(0, rgba(atmo, 0));
      glow.addColorStop(at(R * 0.97), rgba(atmo, 0.05));
      glow.addColorStop(at(R * 0.995), rgba(atmo, 0.2));
      glow.addColorStop(at(R * 1.01), rgba(atmo, 0.22));
      glow.addColorStop(at(R * 1.07), rgba(atmo, 0.1));
      glow.addColorStop(at(R * 1.15), rgba(atmo, 0.035));
      glow.addColorStop(1, rgba(atmo, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, G, 0, 7);
      ctx.fill();
      const body = ctx.createRadialGradient(
        cx - R * 0.3,
        cy - R * 0.35,
        R * 0.1,
        cx,
        cy,
        R
      );
      body.addColorStop(0, rgba(mix(fg, primary, 0.2), 0.09));
      body.addColorStop(1, rgba(fg, 0.02));
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 7);
      ctx.fill();
      const a = phi + drag.current.r;
      const cosP = Math.cos(a),
        sinP = Math.sin(a);
      const proj = (
        x: number,
        y: number,
        z: number
      ): [number, number, number] => {
        const xr = x * cosP + z * sinP;
        const z1 = z * cosP - x * sinP;
        return [xr, y * cosT - z1 * sinT, y * sinT + z1 * cosT];
      };
      // land dots — round, sized and faded by depth, easing out at the limb
      if (pts) {
        ctx.fillStyle = rgba(dot, 1);
        for (let i = 0; i < pts.length; i += 3) {
          const [xr, yr, zr] = proj(pts[i], pts[i + 1], pts[i + 2]);
          if (zr <= 0) continue;
          const e = smooth(zr);
          const d = (0.5 + 0.75 * zr) * dpr * (0.6 + 0.4 * e);
          ctx.globalAlpha = (0.22 + 0.62 * zr) * e;
          ctx.beginPath();
          ctx.arc(cx + xr * R, cy - yr * R, d, 0, 7);
          ctx.fill();
        }
      }
      // arcs — great-circle connections, hidden where they pass behind
      ctx.lineCap = 'round';
      ctx.lineWidth = 1.3 * dpr;
      for (const p of arcPts) {
        let prev = proj(p[0], p[1], p[2]);
        let prevV = arcVis(prev[0], prev[1], prev[2]);
        for (let i = 1; i <= K; i++) {
          const cur = proj(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]);
          const curV = arcVis(cur[0], cur[1], cur[2]);
          const alpha = Math.min(prevV, curV) * 0.8;
          if (alpha > 0.01) {
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = rgba(primary, 1);
            ctx.beginPath();
            ctx.moveTo(cx + prev[0] * R, cy - prev[1] * R);
            ctx.lineTo(cx + cur[0] * R, cy - cur[1] * R);
            ctx.stroke();
          }
          prev = cur;
          prevV = curV;
        }
      }
      // markers — accent dots with a soft halo, easing over the limb too
      for (let mi = 0; mi < marks.length; mi++) {
        const m = marks[mi];
        const [xr, yr, zr] = proj(m.v[0], m.v[1], m.v[2]);
        const e = smooth(zr);
        // ride the DOM label chip on this marker (CSS pixels)
        const el = labelRefs.current[mi];
        if (el) {
          const lx = size * (0.5 + 0.4 * xr);
          const ly = size * (0.5 - 0.4 * yr);
          el.style.transform = `translate(${lx.toFixed(1)}px, ${ly.toFixed(
            1
          )}px) translate(-50%, calc(-100% - 12px))`;
          el.style.opacity = String(e * e);
        }
        if (zr <= 0) continue;
        const mx = cx + xr * R,
          my = cy - yr * R;
        const mr = (2.4 + m.s * 42) * dpr * (0.7 + 0.3 * zr);
        ctx.globalAlpha = e;
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, mr * 3);
        halo.addColorStop(0, rgba(primary, 0.5));
        halo.addColorStop(1, rgba(primary, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(mx, my, mr * 3, 0, 7);
        ctx.fill();
        ctx.fillStyle = rgba(primary, 1);
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let last = 0;
    const loop = (t: number) => {
      if (last && !reduce && !drag.current.down)
        phi += ((t - last) / 1000) * 0.22; // rad/s, frame-rate independent
      last = t;
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    const down = (e: PointerEvent) => {
      drag.current.down = true;
      drag.current.startX = e.clientX;
      canvas.style.cursor = 'grabbing';
    };
    const move = (e: PointerEvent) => {
      if (drag.current.down)
        drag.current.r =
          drag.current.rBase + (e.clientX - drag.current.startX) / 140;
    };
    const up = () => {
      drag.current.down = false;
      drag.current.rBase = drag.current.r;
      canvas.style.cursor = 'grab';
    };
    canvas.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [reduce, markers, arcs]);

  return (
    <div className="globe-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} />
      {markers.map((m, i) =>
        m.label ? (
          <div
            key={i}
            className="globe-label"
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
          >
            <span className="globe-label-name">{m.label}</span>
            {m.value && <span className="globe-label-val">{m.value}</span>}
          </div>
        ) : null
      )}
    </div>
  );
}

export default function Globe({
  kicker,
  title,
  body,
  markers,
  arcs,
  stats,
  flip,
}: {
  kicker?: string;
  title: ReactNode;
  body?: ReactNode;
  markers: GlobeMarker[];
  arcs?: GlobeArc[];
  stats?: GlobeStat[];
  flip?: boolean;
  nav?: string;
  notes?: string;
}) {
  const { isStatic } = useDeck();
  return (
    <div className="slide full">
      <div className={'split' + (flip ? ' flip' : '')}>
        <div className="split-body">
          {kicker && (
            <Reveal>
              <div className="kicker">{kicker}</div>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h2
              className="headline"
              style={{ fontSize: 'clamp(32px,4.6vw,54px)' }}
            >
              {title}
            </h2>
          </Reveal>
          {body && (
            <Reveal delay={0.16}>
              <div className="lead">{body}</div>
            </Reveal>
          )}
          {stats && stats.length > 0 && (
            <Reveal delay={0.24}>
              <div className="globe-stats">
                {stats.map((s, i) => (
                  <div key={i} className="globe-stat">
                    <span className="globe-stat-l">{s.label}</span>
                    <span className="globe-stat-v">{s.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
        <div className="split-media globe-media">
          {isStatic ? (
            <div className="globe-wrap">
              <div className="globe-static" aria-hidden />
            </div>
          ) : (
            <GlobeCanvas markers={markers} arcs={arcs} />
          )}
        </div>
      </div>
    </div>
  );
}
