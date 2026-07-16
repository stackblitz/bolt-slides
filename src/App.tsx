import type { CSSProperties, ReactNode } from 'react';
import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import Cover from './components/Cover';
import Section from './components/Section';
import Timeline from './components/Timeline';
import Comparison from './components/Comparison';
import StatGrid from './components/StatGrid';
import CountUp from './components/CountUp';
import BrowserFrame from './components/BrowserFrame';
import { BarChart, LineChart, DonutChart } from './components/Charts';

const colors = {
  ink: '#0B1020',
  muted: '#667085',
  blue: '#2563EB',
  violet: '#7C3AED',
  cyan: '#06B6D4',
  green: '#16A34A',
  amber: '#D97706',
  rose: '#E11D48',
  surface: 'rgba(255,255,255,0.82)',
  line: 'rgba(15,23,42,0.10)',
};

const glass: CSSProperties = {
  border: `1px solid ${colors.line}`,
  background: colors.surface,
  boxShadow: '0 24px 80px rgba(15,23,42,0.08)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  borderRadius: 28,
};

const smallGlass: CSSProperties = {
  ...glass,
  borderRadius: 20,
  boxShadow: '0 14px 40px rgba(15,23,42,0.06)',
};

const gradientText: CSSProperties = {
  background: `linear-gradient(135deg, ${colors.blue}, ${colors.violet} 58%, ${colors.cyan})`,
  WebkitBackgroundClip: 'text',
  color: 'transparent',
};

const pageGlow: CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  background:
    'radial-gradient(circle at 18% 18%, rgba(37,99,235,.13), transparent 30%), radial-gradient(circle at 82% 26%, rgba(124,58,237,.12), transparent 31%), radial-gradient(circle at 50% 90%, rgba(6,182,212,.08), transparent 34%)',
};

const dotGrid: CSSProperties = {
  position: 'absolute',
  inset: 0,
  opacity: 0.36,
  pointerEvents: 'none',
  backgroundImage: 'radial-gradient(rgba(15,23,42,.15) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
  maskImage: 'linear-gradient(to bottom, black, transparent 88%)',
};

const titleStyle: CSSProperties = {
  fontSize: 'clamp(36px,5vw,72px)',
  lineHeight: 0.98,
  letterSpacing: '-0.055em',
  margin: 0,
  color: colors.ink,
};

const subtitleStyle: CSSProperties = {
  color: colors.muted,
  fontSize: 'clamp(17px,2vw,24px)',
  lineHeight: 1.5,
  margin: 0,
};

type IconName =
  | 'brain'
  | 'people'
  | 'spark'
  | 'layers'
  | 'database'
  | 'code'
  | 'shield'
  | 'rocket'
  | 'check'
  | 'globe'
  | 'chart'
  | 'briefcase'
  | 'mobile'
  | 'store'
  | 'health'
  | 'education'
  | 'government'
  | 'factory'
  | 'workflow'
  | 'cloud'
  | 'target'
  | 'money'
  | 'building'
  | 'support'
  | 'repeat'
  | 'map'
  | 'terminal'
  | 'cube';

function Icon({
  name,
  size = 28,
  color = colors.blue,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const paths: Record<IconName, ReactNode> = {
    brain: (
      <>
        <path {...common} d="M9.5 4.5A3.5 3.5 0 0 0 6 8v1.2A3.8 3.8 0 0 0 4 12.5 3.5 3.5 0 0 0 7.5 16H9V7.5" />
        <path {...common} d="M14.5 4.5A3.5 3.5 0 0 1 18 8v1.2a3.8 3.8 0 0 1 2 3.3 3.5 3.5 0 0 1-3.5 3.5H15V7.5" />
        <path {...common} d="M9 12H6.5M15 12h2.5M12 4v16M9 18.5a3 3 0 0 0 3 1.5 3 3 0 0 0 3-1.5" />
      </>
    ),
    people: (
      <>
        <circle {...common} cx="8" cy="8" r="3" />
        <circle {...common} cx="17" cy="7" r="2.5" />
        <path {...common} d="M3 20c.5-4 2.7-6 5-6s4.5 2 5 6M13 15c1-1.2 2.4-2 4-2 2.4 0 4.2 1.8 4.8 5" />
      </>
    ),
    spark: (
      <>
        <path {...common} d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Z" />
        <path {...common} d="m19 15 .9 2.6L22.5 19l-2.6.9L19 22.5l-.9-2.6-2.6-.9 2.6-1.4L19 15Z" />
      </>
    ),
    layers: (
      <>
        <path {...common} d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path {...common} d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    database: (
      <>
        <ellipse {...common} cx="12" cy="5" rx="8" ry="3" />
        <path {...common} d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </>
    ),
    code: (
      <>
        <path {...common} d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
      </>
    ),
    shield: (
      <>
        <path {...common} d="M12 3 5 6v5c0 4.8 2.9 8.1 7 10 4.1-1.9 7-5.2 7-10V6l-7-3Z" />
        <path {...common} d="m9 12 2 2 4-4" />
      </>
    ),
    rocket: (
      <>
        <path {...common} d="M14 4c3-2 5-1 6-1 0 1 1 3-1 6l-5 5-4-4 4-6Z" />
        <path {...common} d="m10 10-4 1-3 3 6 1 1-5ZM14 14l-1 4-3 3-1-6 5-1Z" />
        <circle {...common} cx="16" cy="7" r="1.5" />
      </>
    ),
    check: (
      <>
        <circle {...common} cx="12" cy="12" r="9" />
        <path {...common} d="m8 12 2.5 2.5L16 9" />
      </>
    ),
    globe: (
      <>
        <circle {...common} cx="12" cy="12" r="9" />
        <path {...common} d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9c-3-3-4-6-4-9s1-6 4-9Z" />
      </>
    ),
    chart: (
      <>
        <path {...common} d="M4 20V10M10 20V4M16 20v-7M22 20V7" />
        <path {...common} d="M3 20h20" />
      </>
    ),
    briefcase: (
      <>
        <rect {...common} x="3" y="7" width="18" height="13" rx="2" />
        <path {...common} d="M9 7V4h6v3M3 12h18M10 12v2h4v-2" />
      </>
    ),
    mobile: (
      <>
        <rect {...common} x="7" y="2" width="10" height="20" rx="2" />
        <path {...common} d="M10 5h4M11 19h2" />
      </>
    ),
    store: (
      <>
        <path {...common} d="M4 10v10h16V10M3 10l2-6h14l2 6" />
        <path {...common} d="M3 10c1.5 2 3 2 4.5 0 1.5 2 3 2 4.5 0 1.5 2 3 2 4.5 0 1.5 2 3 2 4.5 0M9 20v-6h6v6" />
      </>
    ),
    health: (
      <>
        <path {...common} d="M12 21s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 10c0 6.2-8 11-8 11Z" />
        <path {...common} d="M9 12h2V9h2v3h2v2h-2v3h-2v-3H9v-2Z" />
      </>
    ),
    education: (
      <>
        <path {...common} d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path {...common} d="M7 12v4c2.8 2 7.2 2 10 0v-4M21 9v6" />
      </>
    ),
    government: (
      <>
        <path {...common} d="m3 8 9-5 9 5H3ZM5 10v7M9 10v7M15 10v7M19 10v7M3 20h18" />
      </>
    ),
    factory: (
      <>
        <path {...common} d="M3 21V10l6 3V9l6 3V7l6 4v10H3Z" />
        <path {...common} d="M7 21v-4h3v4M15 15h2M15 18h2" />
      </>
    ),
    workflow: (
      <>
        <rect {...common} x="3" y="4" width="6" height="5" rx="1" />
        <rect {...common} x="15" y="4" width="6" height="5" rx="1" />
        <rect {...common} x="9" y="15" width="6" height="5" rx="1" />
        <path {...common} d="M6 9v3h6M18 9v3h-6M12 12v3" />
      </>
    ),
    cloud: (
      <>
        <path {...common} d="M6 19h12a4 4 0 0 0 .7-7.9A6.5 6.5 0 0 0 6.2 9.4 4.8 4.8 0 0 0 6 19Z" />
        <path {...common} d="m9 14 3-3 3 3M12 11v6" />
      </>
    ),
    target: (
      <>
        <circle {...common} cx="12" cy="12" r="9" />
        <circle {...common} cx="12" cy="12" r="5" />
        <circle {...common} cx="12" cy="12" r="1" />
      </>
    ),
    money: (
      <>
        <circle {...common} cx="12" cy="12" r="9" />
        <path {...common} d="M15 8.5c-.8-.7-1.8-1-3-1-1.7 0-3 .8-3 2 0 1.3 1.2 1.8 3 2.2 1.8.4 3 1 3 2.4 0 1.3-1.3 2.4-3.2 2.4-1.4 0-2.7-.5-3.6-1.4M12 5.5v13" />
      </>
    ),
    building: (
      <>
        <path {...common} d="M5 21V5l7-3 7 3v16M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" />
      </>
    ),
    support: (
      <>
        <circle {...common} cx="12" cy="12" r="9" />
        <path {...common} d="M7 13v-2a5 5 0 0 1 10 0v2M7 13H5v4h3v-4ZM17 13h2v4h-3v-4ZM16 18c-1 2-3 2-4 2" />
      </>
    ),
    repeat: (
      <>
        <path {...common} d="M17 2l4 4-4 4M21 6H8a5 5 0 0 0-5 5M7 22l-4-4 4-4M3 18h13a5 5 0 0 0 5-5" />
      </>
    ),
    map: (
      <>
        <path {...common} d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path {...common} d="M9 3v15M15 6v15" />
      </>
    ),
    terminal: (
      <>
        <rect {...common} x="3" y="4" width="18" height="16" rx="2" />
        <path {...common} d="m7 9 3 3-3 3M12 15h5" />
      </>
    ),
    cube: (
      <>
        <path {...common} d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path {...common} d="m3 7 9 5 9-5v10l-9 5-9-5V7ZM12 12v10" />
      </>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Background() {
  return (
    <>
      <div style={pageGlow} />
      <div style={dotGrid} />
    </>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: '.16em',
        fontWeight: 800,
        color: colors.blue,
        marginBottom: 16,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: `linear-gradient(135deg, ${colors.blue}, ${colors.violet})`,
          boxShadow: '0 0 0 6px rgba(37,99,235,.08)',
        }}
      />
      {children}
    </div>
  );
}

function SlideTitle({
  kicker,
  title,
  body,
  align = 'left',
}: {
  kicker?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <Reveal>
      <div style={{ textAlign: align, maxWidth: align === 'center' ? 940 : 820, marginInline: align === 'center' ? 'auto' : undefined }}>
        {kicker && <Kicker>{kicker}</Kicker>}
        <h2 style={titleStyle}>{title}</h2>
        {body && <div style={{ ...subtitleStyle, marginTop: 18 }}>{body}</div>}
      </div>
    </Reveal>
  );
}

function GlassCard({
  children,
  style,
  accent,
}: {
  children: ReactNode;
  style?: CSSProperties;
  accent?: string;
}) {
  return (
    <div
      style={{
        ...smallGlass,
        padding: 22,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {accent && (
        <div
          style={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderRadius: 999,
            right: -44,
            top: -48,
            background: accent,
            filter: 'blur(42px)',
            opacity: 0.14,
          }}
        />
      )}
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

function IconBadge({ name, color = colors.blue, size = 30 }: { name: IconName; color?: string; size?: number }) {
  return (
    <div
      style={{
        width: size + 22,
        height: size + 22,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 18,
        background: `${color}12`,
        border: `1px solid ${color}20`,
      }}
    >
      <Icon name={name} size={size} color={color} />
    </div>
  );
}

function Pill({ children, tone = colors.blue }: { children: ReactNode; tone?: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        padding: '8px 12px',
        background: `${tone}0E`,
        border: `1px solid ${tone}1F`,
        color: colors.ink,
        fontSize: 13,
        fontWeight: 650,
      }}
    >
      {children}
    </span>
  );
}

function Flow({
  items,
  columns = 1,
  compact = false,
}: {
  items: { title: string; subtitle?: string; icon?: IconName; tone?: string }[];
  columns?: number;
  compact?: boolean;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns > 1 ? `repeat(${columns}, minmax(0,1fr))` : '1fr',
        gap: compact ? 8 : 12,
      }}
    >
      {items.map((item, index) => (
        <Build key={`${item.title}-${index}`} at={index + 1}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: item.icon ? 'auto 1fr auto' : '1fr auto',
              gap: 12,
              alignItems: 'center',
              padding: compact ? '10px 12px' : '14px 16px',
              borderRadius: compact ? 15 : 18,
              border: `1px solid ${colors.line}`,
              background: 'rgba(255,255,255,.80)',
              boxShadow: '0 10px 30px rgba(15,23,42,.05)',
            }}
          >
            {item.icon && <IconBadge name={item.icon} color={item.tone || colors.blue} size={compact ? 18 : 22} />}
            <div>
              <div style={{ fontWeight: 750, fontSize: compact ? 14 : 16, color: colors.ink }}>{item.title}</div>
              {item.subtitle && <div style={{ color: colors.muted, fontSize: compact ? 11 : 13, marginTop: 3 }}>{item.subtitle}</div>}
            </div>
            {index !== items.length - 1 && (
              <div style={{ color: item.tone || colors.blue, fontSize: 22, fontWeight: 300 }}>↓</div>
            )}
          </div>
        </Build>
      ))}
    </div>
  );
}

function OrbitalFactory() {
  const nodes = [
    { x: '8%', y: '22%', label: 'Product', icon: 'briefcase' as IconName },
    { x: '77%', y: '14%', label: 'Architecture', icon: 'layers' as IconName },
    { x: '80%', y: '72%', label: 'Engineering', icon: 'code' as IconName },
    { x: '11%', y: '76%', label: 'Quality', icon: 'shield' as IconName },
  ];

  return (
    <div style={{ ...glass, minHeight: 430, position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: '12%',
          border: '1px dashed rgba(37,99,235,.28)',
          borderRadius: '50%',
          animation: 'spin 30s linear infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '24%',
          border: '1px dashed rgba(124,58,237,.28)',
          borderRadius: '50%',
          animation: 'spin 22s linear infinite reverse',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '30%',
          borderRadius: 48,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(145deg, rgba(37,99,235,.12), rgba(124,58,237,.15))',
          border: '1px solid rgba(37,99,235,.18)',
          boxShadow: '0 30px 100px rgba(37,99,235,.16)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Icon name="factory" size={64} color={colors.blue} />
          <div style={{ fontWeight: 850, fontSize: 20, marginTop: 8 }}>AI Software Factory</div>
          <div style={{ color: colors.muted, fontSize: 13, marginTop: 4 }}>From idea to working product</div>
        </div>
      </div>
      {nodes.map((node) => (
        <div
          key={node.label}
          style={{
            position: 'absolute',
            left: node.x,
            top: node.y,
            ...smallGlass,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Icon name={node.icon} size={22} color={colors.violet} />
          <span style={{ fontWeight: 700, fontSize: 13 }}>{node.label}</span>
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,.12), transparent 45%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function FivePersonAI() {
  const positions = [
    { left: '4%', top: '15%', label: 'Strategy' },
    { left: '4%', top: '68%', label: 'Operations' },
    { left: '72%', top: '14%', label: 'Sales' },
    { left: '72%', top: '67%', label: 'Delivery' },
    { left: '38%', top: '2%', label: 'Product' },
  ];
  return (
    <div style={{ ...glass, height: 400, position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height="100%" viewBox="0 0 800 400" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" x2="1">
            <stop offset="0%" stopColor={colors.blue} stopOpacity=".18" />
            <stop offset="50%" stopColor={colors.violet} stopOpacity=".55" />
            <stop offset="100%" stopColor={colors.cyan} stopOpacity=".18" />
          </linearGradient>
        </defs>
        {[70, 160, 250, 340, 430].map((x, i) => (
          <path key={x} d={`M${x} ${i % 2 ? 305 : 90} Q400 200 400 200`} stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeDasharray="7 8" />
        ))}
      </svg>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '51%',
          transform: 'translate(-50%,-50%)',
          width: 150,
          height: 150,
          borderRadius: 48,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(145deg, rgba(37,99,235,.14), rgba(124,58,237,.16))',
          border: '1px solid rgba(37,99,235,.18)',
          boxShadow: '0 24px 80px rgba(37,99,235,.16)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Icon name="brain" size={54} color={colors.violet} />
          <div style={{ fontWeight: 800, marginTop: 6 }}>Builders AI</div>
        </div>
      </div>
      {positions.map((p, i) => (
        <div key={p.label} style={{ position: 'absolute', left: p.left, top: p.top, width: 150 }}>
          <GlassCard style={{ padding: 14, textAlign: 'center' }} accent={i % 2 ? colors.violet : colors.blue}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 999,
                margin: '0 auto 8px',
                display: 'grid',
                placeItems: 'center',
                background: `linear-gradient(145deg, ${i % 2 ? '#EDE9FE' : '#DBEAFE'}, #fff)`,
                border: `1px solid ${colors.line}`,
              }}
            >
              <Icon name="people" size={26} color={i % 2 ? colors.violet : colors.blue} />
            </div>
            <div style={{ fontWeight: 750, fontSize: 13 }}>{p.label}</div>
          </GlassCard>
        </div>
      ))}
    </div>
  );
}

function MiniMetric({ value, label, tone = colors.blue }: { value: ReactNode; label: string; tone?: string }) {
  return (
    <GlassCard style={{ padding: 18 }}>
      <div style={{ fontSize: 28, fontWeight: 850, letterSpacing: '-.04em', color: tone }}>{value}</div>
      <div style={{ fontSize: 12, color: colors.muted, marginTop: 6 }}>{label}</div>
    </GlassCard>
  );
}

function ProductCategory({
  icon,
  title,
  items,
  tone = colors.blue,
}: {
  icon: IconName;
  title: string;
  items: string[];
  tone?: string;
}) {
  return (
    <GlassCard style={{ padding: 20, height: '100%' }} accent={tone}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
        <IconBadge name={icon} color={tone} size={22} />
        <h3 style={{ margin: 0, fontSize: 18, letterSpacing: '-.02em' }}>{title}</h3>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {items.map((item) => (
          <Pill key={item} tone={tone}>{item}</Pill>
        ))}
      </div>
    </GlassCard>
  );
}

function AvatarRole({
  title,
  caption,
  icon,
  tone,
}: {
  title: string;
  caption: string;
  icon: IconName;
  tone: string;
}) {
  return (
    <GlassCard style={{ padding: 16, textAlign: 'center' }} accent={tone}>
      <div
        style={{
          width: 64,
          height: 64,
          margin: '0 auto 10px',
          display: 'grid',
          placeItems: 'center',
          borderRadius: 22,
          background: `linear-gradient(145deg, ${tone}18, rgba(255,255,255,.95))`,
          border: `1px solid ${tone}24`,
        }}
      >
        <Icon name={icon} size={30} color={tone} />
      </div>
      <div style={{ fontWeight: 780, fontSize: 13, lineHeight: 1.2 }}>{title}</div>
      <div style={{ color: colors.muted, fontSize: 10.5, lineHeight: 1.35, marginTop: 5 }}>{caption}</div>
    </GlassCard>
  );
}

const industries = [
  'Healthcare','Hospitals','Dental','Diagnostics','Pharmacy','Telemedicine','Education','Schools','Colleges','Universities',
  'Training','Coaching','EdTech','Retail','Supermarkets','Fashion','Textiles','Jewellery','Footwear','Furniture',
  'Electronics','Consumer Goods','E-commerce','D2C Brands','Hospitality','Hotels','Resorts','Restaurants','Cafés','Bakeries',
  'Catering','Travel','Tourism','Airlines','Automotive','Dealerships','Workshops','Rental Services','Logistics','Transport',
  'Courier','Warehousing','Supply Chain','Manufacturing','Engineering','Machinery','Foundries','Plastics','Chemicals','Packaging',
  'Construction','Architecture','Interior Design','Real Estate','Property Management','Agriculture','Farming','Dairy','Poultry','Food Processing',
  'Export','Import','Wholesale','Distribution','Finance','Banking','FinTech','Insurance','Accounting','Taxation',
  'Legal','Consulting','HR Services','Recruitment','Staffing','IT Services','Software','Cybersecurity','Startups','SaaS',
  'Media','Publishing','Entertainment','Cinema','Music','Events','Sports','Fitness','Gyms','Wellness',
  'Beauty','Salons','Spas','NGOs','Charities','Religious Organizations','Government','Municipalities','Utilities','Public Services',
  'Energy','Solar','Environment','Waste Management','Security Services','Facility Management','Repair Services','Professional Services','Freelancers','Associations',
];

const categoryData = {
  websites: ['Restaurant','Hotel','Clinic','Hospital','Dental Clinic','Gym','Salon','School','College','Construction','Real Estate','Manufacturer','Travel Agency','Architect','Law Firm','Chartered Accountant','Interior Designer','Consultant','NGO','Startup','Corporate','Portfolio','Landing Pages','Membership Sites'],
  business: ['CRM','ERP','Inventory','HRMS','Payroll','Attendance','Visitor Management','Invoice','Quotation','POS','Accounts','Purchase','Sales','Vendor Portal','Employee Portal','Customer Portal'],
  healthcare: ['Hospital Management','Dental Clinic','Appointment System','Patient Portal','Medical Store','Diagnostic Lab','Pharmacy','Healthcare CRM','Telemedicine'],
  education: ['School ERP','College ERP','Learning Platform','Exam Management','Attendance','Fee Management','Student Portal','Parent Portal','Library','Hostel','Transport'],
  retail: ['Inventory','POS','Billing','Online Store','Order Tracking','Warehouse','Franchise Management','Customer Loyalty'],
  ai: ['AI Chatbots','AI Customer Support','AI Knowledge Base','AI HR Assistant','AI Sales Assistant','AI Proposal Generator','AI Content Generator','AI Analytics','AI Agents','AI Automation'],
  mobile: ['Restaurant','Delivery','Taxi','School','Hospital','Retail','Fitness','Booking','Events','Travel','Finance','Community'],
  saas: ['CRM','HRMS','Project Management','Task Management','Bug Tracking','Helpdesk','Subscription Platform','Marketing Platform','Email Platform','Analytics'],
  government: ['Citizen Portal','Complaint Portal','Village Portal','Municipality Portal','Utility Management'],
  internal: ['Builders','Proposal Generator','Lead Manager','CRM','Employee Portal','Knowledge Base','Training Platform','Sales Dashboard','Project Dashboard','Support Desk','Marketing Automation'],
};

export default function App() {
  return (
    <Deck>
      {/* 1 — Hero */}
      <Slide
        nav="BUILDERS"
        center
        notes="Open with the long-term vision: Builders is the platform that lets CubicleTech repeatedly create software products."
      >
        <Background />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 'clamp(30px,5vw,74px)', alignItems: 'center', width: '100%' }}>
          <Reveal>
            <div>
              <Kicker>CubicleTech LLP · Founding Team</Kicker>
              <div style={{ fontSize: 'clamp(70px,11vw,150px)', fontWeight: 900, letterSpacing: '-.075em', lineHeight: .82, ...gradientText }}>
                BUILDERS
              </div>
              <h1 style={{ fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.04, letterSpacing: '-.045em', margin: '22px 0 18px', color: colors.ink }}>
                The AI Software Factory
              </h1>
              <p style={{ ...subtitleStyle, maxWidth: 650 }}>
                Build the platform once.<br />
                <strong style={{ color: colors.ink }}>Build unlimited software products forever.</strong>
              </p>
            </div>
          </Reveal>
          <Reveal>
            <OrbitalFactory />
          </Reveal>
        </div>
      </Slide>

      {/* 2 — Who we are */}
      <Slide nav="Who we are" notes="Position the team’s PMO and delivery experience as a competitive advantage, not a limitation.">
        <Background />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 42, alignItems: 'center' }}>
          <div>
            <SlideTitle
              kicker="The founding team"
              title={<>Five operators.<br /><span style={gradientText}>One AI multiplier.</span></>}
              body="We are not traditional software developers. Our strength is understanding business problems, coordinating complex work, and delivering measurable value."
            />
            <Reveal>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 26 }}>
                {['Project Management','PMO','Agile','Scrum','Product Delivery','Software Coordination'].map((item) => <Pill key={item}>{item}</Pill>)}
              </div>
            </Reveal>
            <Reveal>
              <GlassCard style={{ marginTop: 20, padding: 18 }} accent={colors.violet}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <IconBadge name="spark" color={colors.violet} size={22} />
                  <div>
                    <strong>Builders amplifies our existing strengths using AI.</strong>
                    <div style={{ color: colors.muted, fontSize: 13, marginTop: 4 }}>Business understanding + disciplined delivery + AI engineering.</div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
          <Reveal><FivePersonAI /></Reveal>
        </div>
      </Slide>

      {/* 3 — Why Builders */}
      <Slide nav="Why Builders" notes="Traditional development requires specialists, handoffs, budget, and time. Builders compresses the operating model.">
        <Background />
        <SlideTitle kicker="The transformation" title={<>Traditional software is <span style={{ color: colors.rose }}>heavy.</span><br />Builders makes it <span style={gradientText}>compounding.</span></>} align="center" />
        <Reveal>
          <div style={{ maxWidth: 980, margin: '34px auto 0' }}>
            <Comparison
              cols={['', 'Builders AI Company', 'Traditional Company']}
              highlight={0}
              rows={[
                { label: 'Delivery speed', values: ['Days / weeks', 'Months'] },
                { label: 'Core team', values: ['Small operator team + AI', 'Many specialists'] },
                { label: 'Cost structure', values: ['Lean and reusable', 'High and project-specific'] },
                { label: 'Knowledge retention', values: ['Persistent engineering memory', 'Scattered documents'] },
                { label: 'Product reuse', values: ['Templates and shared capabilities', 'Often rebuilt from zero'] },
              ]}
            />
          </div>
        </Reveal>
      </Slide>

      {/* 4 — Problem statement */}
      <Slide nav="The problem" notes="Businesses increasingly need software, but local and small businesses are often priced out of professional development.">
        <Background />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'center' }}>
          <div>
            <SlideTitle
              kicker="Problem statement"
              title={<>Every business needs software.<br /><span style={{ color: colors.rose }}>Most cannot afford it.</span></>}
              body="Demand has expanded far beyond websites. Businesses now require connected systems, automation, analytics, and AI."
            />
            <Reveal>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 28 }}>
                {['Websites','Mobile Apps','CRM','ERP','Automation','AI','Dashboards','Portals'].map((x) => <Pill key={x} tone={colors.rose}>{x}</Pill>)}
              </div>
            </Reveal>
          </div>
          <Reveal>
            <GlassCard style={{ padding: 28 }} accent={colors.blue}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
                {[
                  ['High agency pricing','money'],
                  ['Long delivery cycles','repeat'],
                  ['Too many specialists','people'],
                  ['Poor continuity','database'],
                ].map(([label, icon], i) => (
                  <GlassCard key={label} style={{ padding: 18, minHeight: 130 }}>
                    <IconBadge name={icon as IconName} color={i % 2 ? colors.violet : colors.blue} size={24} />
                    <div style={{ fontWeight: 780, marginTop: 18 }}>{label}</div>
                  </GlassCard>
                ))}
              </div>
              <div style={{ marginTop: 18, padding: 20, borderRadius: 20, background: 'linear-gradient(135deg, rgba(37,99,235,.10), rgba(124,58,237,.12))', border: `1px solid ${colors.line}` }}>
                <div style={{ fontSize: 22, fontWeight: 850, ...gradientText }}>Builders closes the affordability gap.</div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Slide>

      {/* 5 — Vision */}
      <Slide nav="Vision" notes="Builders should be understood as a software organization represented in software—not as a single chatbot.">
        <Background />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '.8fr 1.2fr', gap: 40, alignItems: 'center' }}>
          <SlideTitle
            kicker="Vision"
            title={<>Not another chatbot.<br /><span style={gradientText}>An AI software company.</span></>}
            body="Builders behaves like a complete engineering organization, moving work through specialized roles until a working product is ready."
          />
          <Reveal>
            <GlassCard style={{ padding: 20, maxHeight: 530, overflow: 'hidden' }}>
              <Flow
                compact
                columns={2}
                items={[
                  { title: 'Customer', icon: 'briefcase', tone: colors.ink },
                  { title: 'AI Product Manager', icon: 'target', tone: colors.blue },
                  { title: 'Architect', icon: 'layers', tone: colors.violet },
                  { title: 'Database Engineer', icon: 'database', tone: colors.cyan },
                  { title: 'Backend Engineer', icon: 'terminal', tone: colors.blue },
                  { title: 'Frontend Engineer', icon: 'code', tone: colors.violet },
                  { title: 'UI/UX Engineer', icon: 'spark', tone: colors.rose },
                  { title: 'QA Engineer', icon: 'check', tone: colors.green },
                  { title: 'Security Engineer', icon: 'shield', tone: colors.amber },
                  { title: 'DevOps Engineer', icon: 'cloud', tone: colors.cyan },
                  { title: 'Working Product', icon: 'rocket', tone: colors.green },
                ]}
              />
            </GlassCard>
          </Reveal>
        </div>
      </Slide>

      {/* 6 — Mission */}
      <Slide nav="Mission" center notes="The mission broadens the market from local micro businesses to global enterprises.">
        <Background />
        <SlideTitle
          kicker="Mission"
          title={<>Make software development<br /><span style={gradientText}>available to every business.</span></>}
          body={<span>From a neighbourhood bakery to a multinational company.</span>}
          align="center"
        />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 28, alignItems: 'center', maxWidth: 900, margin: '42px auto 0' }}>
            <GlassCard style={{ padding: 28, textAlign: 'center' }} accent={colors.amber}>
              <Icon name="store" size={64} color={colors.amber} />
              <div style={{ fontSize: 24, fontWeight: 850, marginTop: 14 }}>Local Bakery</div>
              <div style={{ color: colors.muted, marginTop: 6 }}>Website · orders · loyalty</div>
            </GlassCard>
            <div style={{ fontSize: 44, color: colors.blue }}>→</div>
            <GlassCard style={{ padding: 28, textAlign: 'center' }} accent={colors.violet}>
              <Icon name="building" size={64} color={colors.violet} />
              <div style={{ fontSize: 24, fontWeight: 850, marginTop: 14 }}>Global Enterprise</div>
              <div style={{ color: colors.muted, marginTop: 6 }}>Platforms · automation · AI</div>
            </GlassCard>
          </div>
        </Reveal>
      </Slide>

      {/* 7 — Core philosophy */}
      <Slide nav="Core philosophy" center notes="Use this as the memorable three-part mental model.">
        <Background />
        <SlideTitle kicker="Core philosophy" title={<>One prompt.<br /><span style={gradientText}>A complete engineering team.</span></>} align="center" />
        <Reveal>
          <div style={{ maxWidth: 1000, margin: '46px auto 0', display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 18, alignItems: 'center' }}>
            {[
              { icon: 'briefcase' as IconName, title: 'Business intent', body: 'Explain the problem and desired outcome.', tone: colors.blue },
              { icon: 'brain' as IconName, title: 'AI engineering team', body: 'Specialized roles analyze, build, review, and improve.', tone: colors.violet },
              { icon: 'rocket' as IconName, title: 'Production-ready app', body: 'Preview, package, continue development, and deploy.', tone: colors.green },
            ].map((x, i) => (
              <>
                <GlassCard key={x.title} style={{ padding: 26, textAlign: 'center', minHeight: 250 }} accent={x.tone}>
                  <IconBadge name={x.icon} color={x.tone} size={34} />
                  <h3 style={{ fontSize: 22, margin: '20px 0 10px' }}>{x.title}</h3>
                  <p style={{ margin: 0, color: colors.muted, lineHeight: 1.5 }}>{x.body}</p>
                </GlassCard>
                {i < 2 && <div key={`${x.title}-arrow`} style={{ fontSize: 36, color: colors.blue }}>→</div>}
              </>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 8 — How Builders works */}
      <Slide nav="How it works" notes="Walk through the end-to-end product pipeline, emphasizing that each stage creates reviewable artifacts.">
        <Background />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '.68fr 1.32fr', gap: 34, alignItems: 'start' }}>
          <SlideTitle
            kicker="Operating workflow"
            title={<>From customer need<br />to <span style={gradientText}>working product.</span></>}
            body="A guided, reviewable pipeline replaces disconnected prompts with an engineering process."
          />
          <Reveal>
            <GlassCard style={{ padding: 18 }}>
              <Flow
                compact
                columns={3}
                items={[
                  { title: 'Customer Requirements', icon: 'briefcase', tone: colors.blue },
                  { title: 'Requirement Analysis', icon: 'target', tone: colors.blue },
                  { title: 'Product Manager', icon: 'people', tone: colors.violet },
                  { title: 'Architecture', icon: 'layers', tone: colors.violet },
                  { title: 'Database', icon: 'database', tone: colors.cyan },
                  { title: 'Backend', icon: 'terminal', tone: colors.blue },
                  { title: 'Frontend', icon: 'code', tone: colors.violet },
                  { title: 'UI / UX', icon: 'spark', tone: colors.rose },
                  { title: 'QA', icon: 'check', tone: colors.green },
                  { title: 'Reviews', icon: 'shield', tone: colors.amber },
                  { title: 'Product Package', icon: 'cube', tone: colors.cyan },
                  { title: 'Generate Application', icon: 'factory', tone: colors.blue },
                  { title: 'Preview', icon: 'globe', tone: colors.violet },
                  { title: 'Continue Development', icon: 'repeat', tone: colors.green },
                ]}
              />
            </GlassCard>
          </Reveal>
        </div>
      </Slide>

      {/* 9 — AI engineering team */}
      <Slide nav="AI Engineering Team" notes="Introduce the nine specialized roles. Their separation creates accountability, context, and reviewable outputs.">
        <Background />
        <SlideTitle kicker="Meet the team" title={<>Nine AI engineers.<br /><span style={gradientText}>One coordinated product team.</span></>} align="center" />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 13, maxWidth: 980, margin: '30px auto 0' }}>
            <AvatarRole title="AI Product Manager" caption="Defines scope, outcomes, priorities, and acceptance criteria." icon="target" tone={colors.blue} />
            <AvatarRole title="Solution Architect" caption="Designs the system structure, services, and technical boundaries." icon="layers" tone={colors.violet} />
            <AvatarRole title="Database Engineer" caption="Models data, relationships, persistence, security, and migrations." icon="database" tone={colors.cyan} />
            <AvatarRole title="Backend Engineer" caption="Builds APIs, business logic, integrations, and server workflows." icon="terminal" tone={colors.blue} />
            <AvatarRole title="Frontend Engineer" caption="Implements product interfaces, state, interactions, and responsiveness." icon="code" tone={colors.violet} />
            <AvatarRole title="UI/UX Engineer" caption="Creates flows, visual systems, usability, and polished experiences." icon="spark" tone={colors.rose} />
            <AvatarRole title="QA Engineer" caption="Validates requirements, defects, edge cases, and release readiness." icon="check" tone={colors.green} />
            <AvatarRole title="Security Engineer" caption="Reviews access, data handling, risks, and application security." icon="shield" tone={colors.amber} />
            <AvatarRole title="DevOps Engineer" caption="Prepares environments, deployment, observability, and operations." icon="cloud" tone={colors.cyan} />
          </div>
        </Reveal>
      </Slide>

      {/* 10 — Review engine */}
      <Slide nav="Review Engine" notes="Reviews make Builders an engineering workflow rather than a chain of independent generations.">
        <Background />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '.8fr 1.2fr', gap: 42, alignItems: 'center' }}>
          <SlideTitle
            kicker="Quality by design"
            title={<>Every role reviews<br /><span style={gradientText}>what came before.</span></>}
            body="Nothing should move forward silently. Each engineer checks the relevant prior work, identifies gaps, and records approval or requested changes."
          />
          <Reveal>
            <GlassCard style={{ padding: 26 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 12, alignItems: 'center' }}>
                {[
                  { title: 'Output', icon: 'code' as IconName, tone: colors.blue },
                  { title: 'Review', icon: 'shield' as IconName, tone: colors.amber },
                  { title: 'Approval', icon: 'check' as IconName, tone: colors.green },
                ].map((x, i) => (
                  <>
                    <GlassCard key={x.title} style={{ padding: 24, textAlign: 'center' }} accent={x.tone}>
                      <Icon name={x.icon} size={42} color={x.tone} />
                      <div style={{ fontWeight: 850, fontSize: 18, marginTop: 12 }}>{x.title}</div>
                    </GlassCard>
                    {i < 2 && <div key={`${x.title}-arrow`} style={{ fontSize: 28, color: colors.blue }}>→</div>}
                  </>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 18 }}>
                <MiniMetric value="Traceable" label="Every decision and revision" tone={colors.blue} />
                <MiniMetric value="Reviewable" label="Human approval stays possible" tone={colors.violet} />
                <MiniMetric value="Recoverable" label="History supports iteration" tone={colors.green} />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Slide>

      {/* 11 — BuildersDB */}
      <Slide nav="BuildersDB" notes="BuildersDB is the institutional memory layer. It preserves engineering context across roles and sessions.">
        <Background />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '.75fr 1.25fr', gap: 40, alignItems: 'center' }}>
          <SlideTitle
            kicker="Persistent engineering memory"
            title={<>Everything is stored.<br /><span style={gradientText}>Nothing important is lost.</span></>}
            body="BuildersDB turns every project into a durable, searchable engineering record."
          />
          <Reveal>
            <GlassCard style={{ padding: 26, position: 'relative' }} accent={colors.cyan}>
              <div style={{ display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                <div style={{ width: 128, height: 128, borderRadius: 38, display: 'grid', placeItems: 'center', background: 'linear-gradient(145deg, rgba(6,182,212,.14), rgba(37,99,235,.12))', border: `1px solid ${colors.line}` }}>
                  <Icon name="database" size={66} color={colors.cyan} />
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, marginTop: 12 }}>BuildersDB</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                {['Projects','Reviews','Tasks','Artifacts','Timeline','History','Packages','Authentication','Engineering Memory'].map((x, i) => (
                  <div key={x} style={{ padding: '12px 10px', borderRadius: 14, background: i % 2 ? 'rgba(124,58,237,.06)' : 'rgba(37,99,235,.06)', border: `1px solid ${colors.line}`, textAlign: 'center', fontSize: 12.5, fontWeight: 700 }}>
                    {x}
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Slide>

      {/* 12 — Technology stack */}
      <Slide nav="Technology Stack" notes="This is a modern web and AI stack designed for extensibility, browser-based generation, and cloud deployment.">
        <Background />
        <SlideTitle kicker="Current technology stack" title={<>Modern foundations.<br /><span style={gradientText}>Built to evolve.</span></>} align="center" />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, maxWidth: 1000, margin: '34px auto 0' }}>
            {[
              ['React','code',colors.blue],['Remix','workflow',colors.violet],['TypeScript','terminal',colors.blue],['Tailwind','spark',colors.cyan],
              ['Supabase','database',colors.green],['Anthropic','brain',colors.violet],['OpenAI','spark',colors.ink],['Gemini','spark',colors.blue],
              ['DeepSeek','brain',colors.cyan],['GitHub','code',colors.ink],['Vercel','cloud',colors.ink],['WebContainers','cube',colors.amber],
            ].map(([name, icon, tone]) => (
              <GlassCard key={name} style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 13 }}>
                <IconBadge name={icon as IconName} color={tone as string} size={22} />
                <div style={{ fontWeight: 800 }}>{name}</div>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 13 — Current features */}
      <Slide nav="Current Features" notes="Highlight that Builders is already a working platform with project, review, persistence, generation, and continuation capabilities.">
        <Background />
        <SlideTitle kicker="Built today" title={<>The factory already has<br /><span style={gradientText}>a working production line.</span></>} align="center" />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, maxWidth: 1040, margin: '30px auto 0' }}>
            {[
              ['Project Dashboard','chart'],['AI Engineering Team','people'],['Reviews','shield'],['Timeline','repeat'],
              ['BuildersDB','database'],['Authentication','check'],['Generate Application','factory'],['Continue Development','repeat'],
              ['Preview','globe'],['Product Package','cube'],['Artifacts','layers'],['Drafts & Approvals','check'],
            ].map(([label, icon], i) => (
              <GlassCard key={label} style={{ padding: 16, minHeight: 118 }} accent={i % 3 === 0 ? colors.blue : i % 3 === 1 ? colors.violet : colors.cyan}>
                <Icon name={icon as IconName} size={26} color={i % 3 === 0 ? colors.blue : i % 3 === 1 ? colors.violet : colors.cyan} />
                <div style={{ fontWeight: 760, marginTop: 15, fontSize: 14 }}>{label}</div>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 14 — Roadmap */}
      <Slide nav="Roadmap" notes="The roadmap expands Builders from product generation into the operating system for an AI-powered software company.">
        <Background />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '.7fr 1.3fr', gap: 44, alignItems: 'start' }}>
          <SlideTitle
            kicker="Product roadmap"
            title={<>From software factory<br />to <span style={gradientText}>company operating system.</span></>}
            body="Each capability increases reuse, collaboration, customer acquisition, delivery quality, or recurring revenue."
          />
          <Reveal>
            <div style={{ ...glass, padding: 24, maxHeight: 530, overflow: 'hidden' }}>
              <Timeline
                items={[
                  { time: 'Current', title: 'Builders core', body: 'AI engineering workflow, BuildersDB, product package, preview, and continuation.' },
                  { time: 'Next', title: 'GitHub + reusable templates', body: 'Stronger source control, product starters, and repeatable delivery.' },
                  { time: 'Then', title: 'AI context memory + collaboration', body: 'Smarter continuity, shared projects, reviews, access, and handoffs.' },
                  { time: 'Growth', title: 'CRM + proposal generator + deployment', body: 'Connect sales, scoping, delivery, and customer operations.' },
                  { time: 'Vision', title: 'Marketplace + AI Company OS', body: 'Products, templates, agents, licensing, partners, and recurring ecosystems.' },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </Slide>

      {/* 15 — Why businesses need it */}
      <Slide nav="Business Value" notes="Translate the platform into business outcomes: lower cost, faster delivery, better documentation, and scalable execution.">
        <Background />
        <SlideTitle kicker="Business value" title={<>Why businesses need<br /><span style={gradientText}>Builders.</span></>} align="center" />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, maxWidth: 980, margin: '38px auto 0' }}>
            {[
              ['Cost reduction','money','Lower delivery and coordination overhead.',colors.green],
              ['Speed','rocket','Move from idea to preview dramatically faster.',colors.blue],
              ['AI engineering','brain','Access specialized roles without staffing every function.',colors.violet],
              ['Documentation','layers','Create durable artifacts, reviews, and history.',colors.cyan],
              ['Scalability','repeat','Reuse patterns, templates, and components across products.',colors.amber],
              ['Professional workflow','workflow','Operate with structured stages, approvals, and accountability.',colors.rose],
            ].map(([title, icon, body, tone]) => (
              <GlassCard key={title} style={{ padding: 22, minHeight: 180 }} accent={tone as string}>
                <IconBadge name={icon as IconName} color={tone as string} size={26} />
                <h3 style={{ margin: '18px 0 8px', fontSize: 19 }}>{title}</h3>
                <p style={{ margin: 0, color: colors.muted, fontSize: 13.5, lineHeight: 1.5 }}>{body}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 16 — Products overview */}
      <Slide nav="Products" notes="Use this as the category overview before exploring each product family.">
        <Background />
        <SlideTitle kicker="What we can build" title={<>One factory.<br /><span style={gradientText}>Many product categories.</span></>} align="center" />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 13, maxWidth: 1080, margin: '36px auto 0' }}>
            {[
              ['Business Websites','globe',colors.blue],['Management Software','briefcase',colors.violet],['Healthcare','health',colors.rose],['Education','education',colors.cyan],['Retail','store',colors.amber],
              ['AI Products','brain',colors.violet],['Mobile Apps','mobile',colors.blue],['SaaS','cloud',colors.cyan],['Public Sector','government',colors.green],['Internal Products','factory',colors.ink],
            ].map(([name, icon, tone]) => (
              <GlassCard key={name} style={{ padding: 18, textAlign: 'center', minHeight: 145 }} accent={tone as string}>
                <Icon name={icon as IconName} size={34} color={tone as string} />
                <div style={{ fontWeight: 820, fontSize: 14, marginTop: 15 }}>{name}</div>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 17 — Business websites */}
      <Slide nav="Business Websites" notes="These are ideal entry projects for the local market and portfolio-building phase.">
        <Background />
        <SlideTitle kicker="Product category 01" title={<>Business websites that<br /><span style={gradientText}>convert and operate.</span></>} />
        <Reveal>
          <div style={{ marginTop: 28 }}>
            <ProductCategory icon="globe" title="Websites, portals, and digital presence" items={categoryData.websites} tone={colors.blue} />
          </div>
        </Reveal>
      </Slide>

      {/* 18 — Business management */}
      <Slide nav="Management Software" notes="These products move customers from simple digital presence into recurring operational software.">
        <Background />
        <SlideTitle kicker="Product category 02" title={<>Software that runs<br /><span style={gradientText}>the daily business.</span></>} />
        <Reveal>
          <div style={{ marginTop: 28 }}>
            <ProductCategory icon="briefcase" title="Business management software" items={categoryData.business} tone={colors.violet} />
          </div>
        </Reveal>
      </Slide>

      {/* 19 — Healthcare */}
      <Slide nav="Healthcare Products" notes="Healthcare presents strong repeatable workflows, but projects must be scoped carefully for privacy, reliability, and regulation.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.7fr 1.3fr', gap: 34, alignItems: 'center' }}>
          <SlideTitle kicker="Product category 03" title={<>Digital healthcare<br /><span style={gradientText}>for better access.</span></>} body="Appointments, patient workflows, pharmacy, diagnostics, and coordinated care." />
          <Reveal><ProductCategory icon="health" title="Healthcare products" items={categoryData.healthcare} tone={colors.rose} /></Reveal>
        </div>
      </Slide>

      {/* 20 — Education */}
      <Slide nav="Education Products" notes="Education products combine portals, payments, attendance, communication, and operational workflows.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.7fr 1.3fr', gap: 34, alignItems: 'center' }}>
          <SlideTitle kicker="Product category 04" title={<>Connected learning.<br /><span style={gradientText}>Simplified administration.</span></>} body="Systems for institutions, students, parents, faculty, and administrators." />
          <Reveal><ProductCategory icon="education" title="Education products" items={categoryData.education} tone={colors.cyan} /></Reveal>
        </div>
      </Slide>

      {/* 21 — Retail */}
      <Slide nav="Retail Products" notes="Retail provides practical opportunities for websites, POS, inventory, loyalty, and omnichannel commerce.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.7fr 1.3fr', gap: 34, alignItems: 'center' }}>
          <SlideTitle kicker="Product category 05" title={<>From shelf to screen.<br /><span style={gradientText}>Retail, connected.</span></>} body="Help local stores improve billing, inventory, ordering, loyalty, and online reach." />
          <Reveal><ProductCategory icon="store" title="Retail products" items={categoryData.retail} tone={colors.amber} /></Reveal>
        </div>
      </Slide>

      {/* 22 — AI products */}
      <Slide nav="AI Products" notes="AI products can become add-ons, standalone services, or recurring subscriptions across almost every industry.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.7fr 1.3fr', gap: 34, alignItems: 'center' }}>
          <SlideTitle kicker="Product category 06" title={<>AI that works<br /><span style={gradientText}>inside the business.</span></>} body="Turn knowledge, service, sales, HR, content, analytics, and workflows into intelligent systems." />
          <Reveal><ProductCategory icon="brain" title="AI products and automation" items={categoryData.ai} tone={colors.violet} /></Reveal>
        </div>
      </Slide>

      {/* 23 — Mobile apps */}
      <Slide nav="Mobile Apps" notes="Mobile products expand customer reach and can complement websites, portals, and management systems.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.7fr 1.3fr', gap: 34, alignItems: 'center' }}>
          <SlideTitle kicker="Product category 07" title={<>Products people carry<br /><span style={gradientText}>everywhere.</span></>} body="Mobile experiences for services, commerce, communities, operations, and personal engagement." />
          <Reveal><ProductCategory icon="mobile" title="Mobile app opportunities" items={categoryData.mobile} tone={colors.blue} /></Reveal>
        </div>
      </Slide>

      {/* 24 — SaaS */}
      <Slide nav="SaaS Products" notes="SaaS is a central path to recurring revenue and product reuse.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.7fr 1.3fr', gap: 34, alignItems: 'center' }}>
          <SlideTitle kicker="Product category 08" title={<>Build once.<br /><span style={gradientText}>Subscribe many.</span></>} body="Reusable cloud products create recurring revenue, standardized delivery, and scalable customer acquisition." />
          <Reveal><ProductCategory icon="cloud" title="SaaS product opportunities" items={categoryData.saas} tone={colors.cyan} /></Reveal>
        </div>
      </Slide>

      {/* 25 — Government */}
      <Slide nav="Public Sector" notes="Public-sector opportunities require careful procurement, accessibility, hosting, security, and compliance planning.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.7fr 1.3fr', gap: 34, alignItems: 'center' }}>
          <SlideTitle kicker="Product category 09" title={<>Better digital access<br /><span style={gradientText}>for every citizen.</span></>} body="Portals can simplify service requests, complaints, local administration, and utility operations." />
          <Reveal><ProductCategory icon="government" title="Government and public-sector products" items={categoryData.government} tone={colors.green} /></Reveal>
        </div>
      </Slide>

      {/* 26 — Internal products */}
      <Slide nav="Internal Products" notes="CubicleTech can also use Builders to create its own operating tools, reducing cost while learning from real use.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.7fr 1.3fr', gap: 34, alignItems: 'center' }}>
          <SlideTitle kicker="Product category 10" title={<>We use the factory<br /><span style={gradientText}>to build the factory company.</span></>} body="Internal products become our operating system, demonstrations, reusable modules, and future commercial offerings." />
          <Reveal><ProductCategory icon="factory" title="CubicleTech internal products" items={categoryData.internal} tone={colors.ink} /></Reveal>
        </div>
      </Slide>

      {/* 27 — Industries */}
      <Slide nav="Industries" notes="The platform is industry-flexible. Our commercial focus should still be phased rather than attempting every sector at once.">
        <Background />
        <SlideTitle kicker="Market universe" title={<>More than 100 industries.<br /><span style={gradientText}>One adaptable platform.</span></>} align="center" />
        <Reveal>
          <div style={{ ...glass, padding: 20, marginTop: 24, maxHeight: 440, overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center' }}>
              {industries.map((item, i) => (
                <span
                  key={item}
                  style={{
                    padding: '7px 10px',
                    fontSize: 11.5,
                    fontWeight: 650,
                    borderRadius: 999,
                    background: i % 4 === 0 ? 'rgba(37,99,235,.08)' : i % 4 === 1 ? 'rgba(124,58,237,.08)' : i % 4 === 2 ? 'rgba(6,182,212,.08)' : 'rgba(15,23,42,.05)',
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Slide>

      {/* 28 — Initial market */}
      <Slide nav="Market Expansion" notes="Start where relationships, language, access, and credibility are strongest; scale outward as delivery becomes repeatable.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.75fr 1.25fr', gap: 40, alignItems: 'center' }}>
          <SlideTitle
            kicker="Go-to-market geography"
            title={<>Start local.<br /><span style={gradientText}>Scale deliberately.</span></>}
            body="Our expansion follows proven delivery, portfolio strength, reusable products, and customer referrals."
          />
          <Reveal>
            <GlassCard style={{ padding: 28 }} accent={colors.blue}>
              <div style={{ position: 'relative', minHeight: 390 }}>
                <svg viewBox="0 0 700 390" width="100%" height="390">
                  <defs>
                    <linearGradient id="route" x1="0" x2="1">
                      <stop offset="0%" stopColor={colors.blue} />
                      <stop offset="50%" stopColor={colors.violet} />
                      <stop offset="100%" stopColor={colors.cyan} />
                    </linearGradient>
                  </defs>
                  <path d="M70 310 C180 240, 220 260, 300 190 S470 140, 625 70" stroke="url(#route)" strokeWidth="4" fill="none" strokeDasharray="10 10" />
                  {[
                    [70,310,'Coimbatore','Now'],
                    [220,245,'Tamil Nadu','Next'],
                    [340,175,'South India','Scale'],
                    [500,118,'India','Expand'],
                    [625,70,'Global','Vision'],
                  ].map(([x,y,label,time], i) => (
                    <g key={String(label)}>
                      <circle cx={Number(x)} cy={Number(y)} r={i === 0 ? 16 : 11} fill={i === 0 ? colors.blue : '#fff'} stroke={i === 0 ? '#fff' : colors.violet} strokeWidth="4" />
                      <text x={Number(x)} y={Number(y)+36} textAnchor="middle" fill={colors.ink} fontSize="16" fontWeight="800">{String(label)}</text>
                      <text x={Number(x)} y={Number(y)+54} textAnchor="middle" fill={colors.muted} fontSize="11">{String(time)}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Slide>

      {/* 29 — Segments */}
      <Slide nav="Customer Segments" notes="Different segments need different offers, pricing, sales cycles, and support models.">
        <Background />
        <SlideTitle kicker="Who we serve" title={<>A platform for every<br /><span style={gradientText}>stage of business.</span></>} align="center" />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 13, maxWidth: 1080, margin: '36px auto 0' }}>
            {[
              ['Micro Business','store'],['Small Business','briefcase'],['Medium Business','building'],['Enterprise','globe'],['Government','government'],
              ['Education','education'],['Healthcare','health'],['NGOs','people'],['Startups','rocket'],['Professionals','target'],
            ].map(([name, icon], i) => (
              <GlassCard key={name} style={{ padding: 17, textAlign: 'center', minHeight: 132 }} accent={i % 2 ? colors.violet : colors.blue}>
                <Icon name={icon as IconName} size={30} color={i % 2 ? colors.violet : colors.blue} />
                <div style={{ fontWeight: 800, fontSize: 13.5, marginTop: 14 }}>{name}</div>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 30 — Sales strategy */}
      <Slide nav="Sales Strategy" notes="Phase 1 is deliberately affordable and portfolio-driven. Avoid complex ERP projects until the team has stronger delivery references and repeatable modules.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.8fr 1.2fr', gap: 42, alignItems: 'center' }}>
          <SlideTitle
            kicker="Phase 1"
            title={<>Win trust before<br /><span style={gradientText}>winning scale.</span></>}
            body="Focus on local businesses, clear outcomes, fast delivery, strong testimonials, and repeatable service."
          />
          <Reveal>
            <GlassCard style={{ padding: 26 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <GlassCard style={{ padding: 22 }} accent={colors.green}>
                  <div style={{ fontSize: 38, fontWeight: 900, color: colors.green }}>₹15K–₹75K</div>
                  <div style={{ color: colors.muted, marginTop: 6 }}>Initial project range</div>
                </GlassCard>
                <GlassCard style={{ padding: 22 }} accent={colors.blue}>
                  <div style={{ fontSize: 38, fontWeight: 900, color: colors.blue }}>10</div>
                  <div style={{ color: colors.muted, marginTop: 6 }}>First customers target</div>
                </GlassCard>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginTop: 16 }}>
                {['Build portfolio','Collect testimonials','Generate referrals','Create repeat customers','Avoid expensive ERP initially','Stay close to local customers'].map((x, i) => (
                  <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, background: 'rgba(15,23,42,.035)', border: `1px solid ${colors.line}` }}>
                    <Icon name="check" size={20} color={i < 4 ? colors.green : colors.amber} />
                    <span style={{ fontWeight: 680, fontSize: 13 }}>{x}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Slide>

      {/* 31 — Business model */}
      <Slide nav="Business Model" notes="The model intentionally mixes one-time projects, services, and recurring product revenue.">
        <Background />
        <SlideTitle kicker="How CubicleTech earns" title={<>Multiple offers.<br /><span style={gradientText}>Increasing recurring revenue.</span></>} align="center" />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 13, maxWidth: 1040, margin: '34px auto 0' }}>
            {[
              ['Custom Software','code'],['Website Development','globe'],['Annual Maintenance','repeat'],['Hosting','cloud'],
              ['AI Subscription','brain'],['SaaS','cube'],['Templates','layers'],['Consulting','briefcase'],
              ['Training','education'],['Support','support'],['Licensing','shield'],['Marketplace','store'],
            ].map(([name, icon], i) => (
              <GlassCard key={name} style={{ padding: 16, minHeight: 118 }} accent={i % 3 === 0 ? colors.blue : i % 3 === 1 ? colors.violet : colors.cyan}>
                <Icon name={icon as IconName} size={25} color={i % 3 === 0 ? colors.blue : i % 3 === 1 ? colors.violet : colors.cyan} />
                <div style={{ fontWeight: 760, fontSize: 13.5, marginTop: 14 }}>{name}</div>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 32 — Company structure */}
      <Slide nav="Company Structure" notes="CubicleTech is the company; Builders is the core platform; products and client solutions create revenue.">
        <Background />
        <SlideTitle kicker="Company architecture" title={<>One company.<br /><span style={gradientText}>A compounding product engine.</span></>} align="center" />
        <Reveal>
          <div style={{ maxWidth: 880, margin: '40px auto 0' }}>
            <Flow
              columns={1}
              items={[
                { title: 'CubicleTech LLP', subtitle: 'Company, governance, brand, sales, and delivery', icon: 'building', tone: colors.ink },
                { title: 'Builders', subtitle: 'AI software factory and reusable engineering platform', icon: 'factory', tone: colors.blue },
                { title: 'Products', subtitle: 'Templates, SaaS, internal tools, and industry solutions', icon: 'cube', tone: colors.violet },
                { title: 'Clients', subtitle: 'Custom projects, implementation, support, and partnerships', icon: 'people', tone: colors.cyan },
                { title: 'Recurring Revenue', subtitle: 'Subscriptions, AMC, support, hosting, licensing, and marketplace', icon: 'repeat', tone: colors.green },
              ]}
            />
          </div>
        </Reveal>
      </Slide>

      {/* 33 — Team structure */}
      <Slide nav="Founding Team" notes="The structure is collaborative. Titles can be finalized later, but every critical business function must have clear ownership.">
        <Background />
        <SlideTitle kicker="Five-founder operating model" title={<>Shared ownership.<br /><span style={gradientText}>Clear functional leadership.</span></>} align="center" />
        <Reveal>
          <div style={{ position: 'relative', maxWidth: 1050, margin: '36px auto 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
              {[
                ['CEO / Strategy','target',colors.ink],
                ['Operations & PMO','workflow',colors.blue],
                ['Sales & Business Development','chart',colors.green],
                ['Customer Success & Delivery','support',colors.cyan],
                ['AI Platform & Product Management','brain',colors.violet],
              ].map(([title, icon, tone]) => (
                <GlassCard key={title} style={{ padding: 20, textAlign: 'center', minHeight: 230 }} accent={tone as string}>
                  <div style={{ width: 78, height: 78, borderRadius: 999, margin: '0 auto 16px', display: 'grid', placeItems: 'center', background: `${tone}10`, border: `1px solid ${tone}20` }}>
                    <Icon name={icon as IconName} size={35} color={tone as string} />
                  </div>
                  <div style={{ fontWeight: 850, fontSize: 16, lineHeight: 1.2 }}>{title}</div>
                  <div style={{ color: colors.muted, fontSize: 11.5, marginTop: 12, lineHeight: 1.45 }}>Collaborative leadership with defined decision rights and measurable outcomes.</div>
                </GlassCard>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 16, color: colors.muted, fontSize: 13 }}>Specific founder assignments can be finalized after role and capacity discussions.</div>
          </div>
        </Reveal>
      </Slide>

      {/* 34 — Five-year vision */}
      <Slide nav="5-Year Vision" center notes="This is an ambition slide. Keep it directional rather than presenting unvalidated targets as commitments.">
        <Background />
        <SlideTitle kicker="Five-year vision" title={<>From five founders<br />to a <span style={gradientText}>global software company.</span></>} align="center" />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, maxWidth: 980, margin: '38px auto 0' }}>
            {[
              ['Thousands','Projects delivered','rocket',colors.blue],
              ['Hundreds','Products and templates','cube',colors.violet],
              ['Multiple','SaaS offerings','cloud',colors.cyan],
              ['International','Customers and partners','globe',colors.green],
              ['Marketplace','Templates, agents, solutions','store',colors.amber],
              ['Global','AI-powered software company','building',colors.ink],
            ].map(([value,label,icon,tone]) => (
              <GlassCard key={label} style={{ padding: 22, minHeight: 168 }} accent={tone as string}>
                <Icon name={icon as IconName} size={28} color={tone as string} />
                <div style={{ fontSize: 30, fontWeight: 900, marginTop: 15, color: tone as string }}>{value}</div>
                <div style={{ color: colors.muted, fontSize: 13, marginTop: 5 }}>{label}</div>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 35 — Revenue vision */}
      <Slide nav="Revenue Vision" notes="The goal is to shift the revenue mix over time from one-time projects toward predictable recurring streams.">
        <Background />
        <div style={{ display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 38, alignItems: 'center' }}>
          <div>
            <SlideTitle kicker="Revenue vision" title={<>Projects open doors.<br /><span style={gradientText}>Recurring revenue compounds.</span></>} />
            <Reveal>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 26 }}>
                {['Custom software','Website packages','Mobile apps','SaaS subscriptions','AMC','AI automation','Hosting','Support retainers','White-label licensing','Template marketplace','Consulting','Training'].map((x) => <Pill key={x} tone={colors.green}>{x}</Pill>)}
              </div>
            </Reveal>
          </div>
          <Reveal>
            <GlassCard style={{ padding: 24 }} accent={colors.green}>
              <div style={{ fontWeight: 800, marginBottom: 14 }}>Recurring revenue mix over time</div>
              <div style={{ height: 250 }}>
                <LineChart points={[12, 18, 26, 34, 48, 62, 78, 94]} height={250} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 14 }}>
                <MiniMetric value="Year 1" label="Projects + AMC" tone={colors.blue} />
                <MiniMetric value="Year 3" label="SaaS + licensing" tone={colors.violet} />
                <MiniMetric value="Year 5" label="Marketplace + scale" tone={colors.green} />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Slide>

      {/* 36 — Why we will win */}
      <Slide nav="Why We Win" notes="The advantage is the combination of operator experience, disciplined delivery, AI leverage, low cost, and reusable technology.">
        <Background />
        <SlideTitle kicker="Competitive advantage" title={<>Why we can<br /><span style={gradientText}>win this market.</span></>} align="center" />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, maxWidth: 990, margin: '35px auto 0' }}>
            {[
              ['Business experience','briefcase'],['PMO expertise','workflow'],['Agile mindset','repeat'],
              ['AI-powered engineering','brain'],['Low operational cost','money'],['Fast delivery','rocket'],
              ['Scalable platform','layers'],['Customer-first approach','support'],['Reusable product factory','factory'],
            ].map(([name,icon], i) => (
              <GlassCard key={name} style={{ padding: 19, display: 'flex', alignItems: 'center', gap: 13 }} accent={i % 3 === 0 ? colors.blue : i % 3 === 1 ? colors.violet : colors.cyan}>
                <IconBadge name={icon as IconName} color={i % 3 === 0 ? colors.blue : i % 3 === 1 ? colors.violet : colors.cyan} size={22} />
                <div style={{ fontWeight: 780, fontSize: 14 }}>{name}</div>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 37 — 12-month plan */}
      <Slide nav="12-Month Plan" notes="Use this as the execution discipline slide. The quarterly objectives should be reviewed and converted into measurable OKRs.">
        <Background />
        <SlideTitle kicker="Next 12 months" title={<>Build. Prove. Productize.<br /><span style={gradientText}>Then scale.</span></>} align="center" />
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, maxWidth: 1080, margin: '30px auto 0' }}>
            {[
              { q: 'Q1', title: 'Complete & prove', tone: colors.blue, items: ['Complete Builders MVP','Deliver first client projects','Build portfolio','Acquire first 10 customers'] },
              { q: 'Q2', title: 'Standardize', tone: colors.violet, items: ['Launch reusable templates','Strengthen GitHub integration','Improve AI context memory','Begin AMC contracts'] },
              { q: 'Q3', title: 'Productize', tone: colors.cyan, items: ['Launch first SaaS products','Expand across Tamil Nadu','Build referral network','Standardize delivery'] },
              { q: 'Q4', title: 'Scale', tone: colors.green, items: ['Expand across South India','Launch proposal & CRM modules','Hire talent if needed','Prepare national expansion'] },
            ].map((q) => (
              <GlassCard key={q.q} style={{ padding: 20, minHeight: 330 }} accent={q.tone}>
                <div style={{ fontSize: 12, fontWeight: 850, letterSpacing: '.15em', color: q.tone }}>{q.q}</div>
                <h3 style={{ fontSize: 22, margin: '10px 0 18px' }}>{q.title}</h3>
                <div style={{ display: 'grid', gap: 11 }}>
                  {q.items.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                      <Icon name="check" size={18} color={q.tone} />
                      <span style={{ color: colors.muted, fontSize: 12.5, lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* 38 — CTA */}
      <Slide nav="Software Factory" center notes="Close slowly. Reinforce that CubicleTech is building a reusable company capability, not just another services business.">
        <Background />
        <div style={{ position: 'relative', width: '100%', display: 'grid', gridTemplateColumns: '1fr .9fr', gap: 48, alignItems: 'center' }}>
          <Reveal>
            <div>
              <Kicker>The CubicleTech vision</Kicker>
              <h2 style={{ fontSize: 'clamp(46px,7vw,92px)', lineHeight: .98, letterSpacing: '-.06em', margin: 0, color: colors.ink }}>
                We are not building another software company.
              </h2>
              <Build at={1}>
                <div style={{ fontSize: 'clamp(44px,6.8vw,88px)', lineHeight: .98, letterSpacing: '-.06em', fontWeight: 900, marginTop: 24, ...gradientText }}>
                  We are building a Software Factory.
                </div>
              </Build>
              <p style={{ ...subtitleStyle, marginTop: 26 }}>CubicleTech LLP · Founding Team</p>
            </div>
          </Reveal>
          <Reveal><OrbitalFactory /></Reveal>
        </div>
      </Slide>
    </Deck>
  );
}
