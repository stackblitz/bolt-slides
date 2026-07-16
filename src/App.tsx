import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Reveal from './deck/Reveal';
import { LineChart, DonutChart } from './components/Charts';
import Timeline from './components/Timeline';

const aiRoles = [
  ['AI PM', 'Turns business goals into product scope'],
  ['Architect', 'Designs systems, modules, and integrations'],
  ['Database', 'Models data, policies, and storage'],
  ['Backend', 'Builds APIs, jobs, and business logic'],
  ['Frontend', 'Creates responsive product screens'],
  ['UI Designer', 'Crafts premium user experiences'],
  ['QA', 'Tests flows, edge cases, and acceptance'],
  ['Security', 'Reviews auth, privacy, and risk'],
  ['DevOps', 'Packages, previews, and deploys'],
];

const tech = [
  'React', 'Remix', 'TypeScript', 'Tailwind', 'Supabase',
  'Anthropic', 'OpenAI', 'Gemini', 'DeepSeek', 'GitHub',
  'Vercel', 'WebContainers',
];

const features = [
  'Project Dashboard', 'AI Engineering Team', 'Reviews', 'Timeline',
  'BuildersDB', 'Authentication', 'Generate Application',
  'Continue Development', 'Preview', 'Product Package',
  'Artifacts', 'Drafts', 'Approvals',
];

const roadmap = [
  'Current', 'GitHub', 'Templates', 'AI Context Memory',
  'Team Collaboration', 'CRM', 'Proposal Generator',
  'Deployment', 'Marketplace', 'AI Company Operating System',
];

const websites = [
  'Restaurant', 'Hotel', 'Clinic', 'Hospital', 'Dental Clinic',
  'Gym', 'Salon', 'School', 'College', 'Construction', 'Real Estate',
  'Manufacturer', 'Travel Agency', 'Architect', 'Law Firm',
  'Chartered Accountant', 'Interior Designer', 'Consultant', 'NGO',
  'Startup', 'Corporate', 'Portfolio', 'Landing Pages', 'Membership Sites',
];

const industries = [ /* your full list of 100+ industries */ ];

const s = {
  shell: { position: 'relative', overflow: 'hidden' } as React.CSSProperties,
  center: { textAlign: 'center', maxWidth: 1040, margin: '0 auto' } as React.CSSProperties,
  kicker: {
    color: '#5b5fed',
    textTransform: 'uppercase',
    letterSpacing: '.14em',
    fontSize: 13,
    fontWeight: 800,
    marginBottom: 14,
  } as React.CSSProperties,
  title: {
    fontSize: 'clamp(42px, 7vw, 96px)',
    lineHeight: 0.9,
    letterSpacing: '-.07em',
    margin: 0,
    color: '#070812',
  } as React.CSSProperties,
  h: {
    fontSize: 'clamp(34px, 5vw, 70px)',
    lineHeight: 0.94,
    letterSpacing: '-.055em',
    margin: 0,
    color: '#070812',
  } as React.CSSProperties,
  lead: {
    fontSize: 'clamp(18px, 2.2vw, 27px)',
    lineHeight: 1.34,
    color: '#4b5567',
    margin: '22px auto 0',
    maxWidth: 860,
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    gap: 16,
    marginTop: 34,
  } as React.CSSProperties,
  card: {
    border: '1px solid rgba(60,70,110,.13)',
    borderRadius: 28,
    padding: 24,
    background: 'rgba(255,255,255,.72)',
    boxShadow: '0 24px 70px rgba(32,42,80,.10)',
    backdropFilter: 'blur(18px)',
  } as React.CSSProperties,
  pill: {
    border: '1px solid rgba(74,85,130,.13)',
    borderRadius: 999,
    padding: '10px 14px',
    background: 'rgba(255,255,255,.72)',
    fontWeight: 700,
    color: '#22283b',
  } as React.CSSProperties,
};

function Aura() {
  return (
    <>
      <div style={{
        position: 'absolute',
        inset: '-25%',
        background: 'radial-gradient(circle at 25% 15%, rgba(66,120,255,.20), transparent 30%), radial-gradient(circle at 80% 30%, rgba(154,76,255,.18), transparent 28%), radial-gradient(circle at 50% 90%, rgba(0,205,255,.12), transparent 30%)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,.15), #fff 82%)',
        zIndex: 0,
      }} />
    </>
  );
}

function Wrap({ kicker, title, children, wide = false }: {
  kicker?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <Reveal>
      <div style={{ ...s.center, maxWidth: wide ? 1180 : 1040, position: 'relative', zIndex: 1 }}>
        {kicker && <div style={s.kicker}>{kicker}</div>}
        <h2 style={s.h}>{title}</h2>
        {children}
      </div>
    </Reveal>
  );
}

function Factory() {
  return (
    <div style={{ ...s.card, margin: '40px auto 0', maxWidth: 900, padding: 30 }}>
      <svg viewBox="0 0 900 320" style={{ width: '100%', height: 'auto' }}>
        {/* Your SVG code remains the same */}
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#9333ea" />
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        {/* ... rest of your SVG ... */}
      </svg>
    </div>
  );
}

function Pipeline({ items }: { items: string[] }) {
  return (
    <div style={{ ...s.card, margin: '32px auto 0', maxWidth: 760 }}>
      {items.map((it, i) => (
        <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '8px 0' }}>
          <span style={{
            width: 34, height: 34, borderRadius: 12,
            display: 'grid', placeItems: 'center',
            background: 'linear-gradient(135deg,#2563eb,#8b5cf6)',
            color: '#fff', fontWeight: 800,
          }}>
            {i + 1}
          </span>
          <b style={{ fontSize: 18 }}>{it}</b>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#dbe5ff,transparent)' }} />
        </div>
      ))}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 30 }}>
      {items.map((x) => (
        <span key={x} style={s.pill}>{x}</span>
      ))}
    </div>
  );
}

function IconGrid({ items }: { items: string[] }) {
  return (
    <div style={s.grid}>
      {items.map((x, i) => (
        <div key={x} style={s.card}>
          <div style={{ fontSize: 30, marginBottom: 12 }}>
            {['✦', '◈', '⬡', '⌁', '◎', '▣'][i % 6]}
          </div>
          <b>{x}</b>
        </div>
      ))}
    </div>
  );
}

function AvatarTeam() {
  return (
    <div style={s.grid}>
      {aiRoles.map(([r, d], i) => (
        <div key={r} style={s.card}>
          <div style={{
            width: 58, height: 58, borderRadius: 22,
            background: `linear-gradient(135deg,hsl(${220 + i * 16} 90% 58%),hsl(${270 + i * 10} 90% 62%))`,
            margin: '0 auto 14px', display: 'grid', placeItems: 'center',
            color: '#fff', fontSize: 24,
          }}>
            🤖
          </div>
          <h3 style={{ margin: '0 0 8px' }}>{r}</h3>
          <p style={{ margin: 0, color: '#657084', fontSize: 14, lineHeight: 1.45 }}>{d}</p>
        </div>
      ))}
    </div>
  );
}

function SimpleSlide({ nav, kicker, title, body, children }: {
  nav: string;
  kicker?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Slide nav={nav} style={s.shell}>
      <Aura />
      <Wrap kicker={kicker} title={title}>
        {body && <p style={s.lead}>{body}</p>}
        {children}
      </Wrap>
    </Slide>
  );
}

export default function App() {
  return (
    <Deck>
      {/* Hero */}
      <Slide nav="BUILDERS" center style={s.shell}>
        <Aura />
        <Reveal>
          <div style={{ ...s.center, position: 'relative', zIndex: 1 }}>
            <div style={s.kicker}>CubicleTech LLP · Founding Team</div>
            <h1 style={s.title}>BUILDERS</h1>
            <p style={{ ...s.lead, fontSize: 'clamp(25px,3.6vw,44px)', color: '#111827' }}>
              The AI Software Factory
            </p>
            <p style={s.lead}>
              Build the platform once.<br />Build unlimited software products forever.
            </p>
            <Factory />
          </div>
        </Reveal>
      </Slide>

      {/* Rest of your slides using SimpleSlide + other helpers */}
      <SimpleSlide nav="Who We Are" kicker="Who we are" title="A five-member founding team amplified by AI." body="Strong experience in Project Management, PMO, Agile, Scrum..." />

      {/* ... add all other SimpleSlide calls as before ... */}

      {/* Final Call to Action */}
      <Slide nav="Call to Action" center style={s.shell}>
        <Aura />
        <Reveal>
          <div style={{ ...s.center, position: 'relative', zIndex: 1 }}>
            <div style={s.kicker}>Call to action</div>
            <h2 style={s.title}>“We are not building another software company.”</h2>
            <p style={{ ...s.lead, fontSize: 'clamp(26px,4vw,48px)', color: '#111827' }}>
              We are building a Software Factory.
            </p>
          </div>
        </Reveal>
      </Slide>
    </Deck>
  );
}
