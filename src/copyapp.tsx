import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import Bento from './components/Bento';
import Split from './components/Split';
import CountUp from './components/CountUp';
import TiltCard from './components/TiltCard';
import Marquee from './components/Marquee';
import VisualDashboard from './components/VisualDashboard';
import StatGrid from './components/StatGrid';
import Accordion from './components/Accordion';
import Comparison from './components/Comparison';
import Tabs from './components/Tabs';
import Timeline from './components/Timeline';
import CodeWindow from './components/CodeWindow';
import BrowserFrame from './components/BrowserFrame';
import SpotlightCard from './components/SpotlightCard';
import { BarChart, LineChart, DonutChart } from './components/Charts';
import Section from './components/Section';
import Quote from './components/Quote';
import Pricing from './components/Pricing';
import Steps from './components/Steps';
import Agenda from './components/Agenda';
import Team from './components/Team';
import Cover from './components/Cover';
import BigNumber from './components/BigNumber';
import Contrast from './components/Contrast';
import Chat from './components/Chat';
import Table from './components/Table';
import Globe from './components/Globe';

/* ══════════════════════════════════════════════════════════════════════
   ⚠️  THROWAWAY DEMO showing every component. DELETE these slides and AUTHOR
   THE USER'S DECK. Each child of <Deck> is one slide. Add speaker notes with
   notes="…" on any slide (shown in presenter mode — press P).
   ══════════════════════════════════════════════════════════════════════ */
const panel = (extra = 0.22): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  background: `radial-gradient(120% 100% at 30% 20%, color-mix(in srgb, var(--primary) ${
    extra * 100
  }%, transparent), transparent 60%), var(--surface-2)`,
});
const card: React.CSSProperties = {
  padding: 22,
  borderRadius: 'var(--radius)',
  background: 'var(--surface)',
  border: '1px solid var(--hair)',
};

export default function App() {
  return (
    <Deck>
      {/* Cover */}
      <Cover
        nav="Cover"
        notes="Welcome — introduce yourself, then set up the problem. Hold a beat on this slide."
        kicker="Bolt Slides · Component demo"
        title={<span className="accent-text">Bolt Slides</span>}
        subtitle="A responsive React deck engine. Delete this and build the real one."
        foot="June 2026 · Component demo"
      />

      {/* Statement + click-build */}
      <Slide
        center
        nav="Thesis"
        notes="Pause before revealing the second line. The whole pitch hangs on this contrast."
      >
        <h2
          className="headline"
          style={{ fontSize: 'clamp(34px,5.5vw,68px)', marginInline: 'auto' }}
        >
          Dashboards are everywhere.{' '}
          <span className="accent-text">Insight isn't.</span>
        </h2>
        <Build at={1}>
          <p className="subhead" style={{ marginTop: 20 }}>
            Bolt Slides turns raw events into answers — automatically.
          </p>
        </Build>
      </Slide>

      {/* Agenda */}
      <Agenda
        nav="Agenda"
        notes="Thirty seconds max — just orient the room, then move."
        kicker="Agenda"
        title="What we'll cover."
        items={[
          'The problem',
          'How Bolt Slides works',
          'Proof it compounds',
          { title: 'Pricing & the ask', hint: '5 min' },
        ]}
      />

      {/* Contrast — the problem */}
      <Contrast
        nav="The problem"
        notes="Let the left panel sting for a second before you talk to the right one."
        kicker="The shift"
        title="Stop digging. Start asking."
        left={{
          label: 'Before',
          title: 'Dashboard sprawl',
          points: [
            'Forty dashboards, zero answers',
            'Analysts as human query engines',
            'Insights arrive a week late',
          ],
        }}
        right={{
          label: 'With Bolt Slides',
          title: 'Answers on tap',
          points: [
            'Ask in plain English',
            'Sub-second, source-linked answers',
            'Alerts before the dashboard knows',
          ],
        }}
      />

      {/* Split feature */}
      <Split
        nav="Realtime"
        notes="Emphasize sub-second latency. Point at the live chart while you talk."
        kicker="Realtime"
        title={
          <>
            Everything, <span className="accent-text">as it happens.</span>
          </>
        }
        body="Live metrics with sub-second latency — no pipelines to babysit."
        media={
          <>
            <div style={panel(0.22)} />
            <div
              style={{
                position: 'relative',
                padding: 'clamp(14px,3vw,40px)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TiltCard>
                <VisualDashboard />
              </TiltCard>
            </div>
          </>
        }
      />

      {/* Bento */}
      <Bento
        nav="Platform"
        notes="Don't read every tile — let them scan. Land on throughput and uptime."
        kicker="One platform"
        title="Everything in one place."
        tiles={[
          {
            k: 'Throughput',
            fig: <CountUp to={9.4} decimals={1} suffix="M" />,
            body: 'events / min at peak.',
            c: 5,
            r: 2,
            variant: 'glow',
          },
          {
            k: 'Uptime',
            fig: <CountUp to={99.99} decimals={2} suffix="%" />,
            c: 4,
          },
          { k: 'Regions', fig: <CountUp to={28} />, c: 3, variant: 'accent' },
          {
            k: 'Connectors',
            title: '120+ native',
            body: 'Snowflake, Kafka, dbt…',
            c: 4,
          },
          { k: 'Compliance', title: 'SOC 2 · HIPAA', c: 3 },
        ]}
      />

      {/* Globe */}
      <Globe
        nav="Global"
        notes="Spin it if you like — the markers are our actual regions. Land on the APAC number."
        kicker="28 regions"
        title={
          <>
            Everywhere your <span className="accent-text">data lives.</span>
          </>
        }
        body="Ingest close to the source; answer from the nearest edge."
        markers={[
          {
            location: [37.77, -122.41],
            size: 0.08,
            label: 'sfo1',
            value: '221k evt/s',
          },
          { location: [40.71, -74.0], size: 0.08 },
          {
            location: [51.5, -0.12],
            size: 0.07,
            label: 'lhr1',
            value: '188k evt/s',
          },
          { location: [52.52, 13.4], size: 0.05 },
          {
            location: [1.35, 103.82],
            size: 0.07,
            label: 'sin1',
            value: '96k evt/s',
          },
          { location: [35.68, 139.69], size: 0.06 },
          { location: [-33.87, 151.2], size: 0.05 },
          { location: [-23.55, -46.63], size: 0.05 },
        ]}
        arcs={[
          { from: [37.77, -122.41], to: [51.5, -0.12] },
          { from: [51.5, -0.12], to: [1.35, 103.82] },
          { from: [37.77, -122.41], to: [-23.55, -46.63] },
        ]}
        stats={[
          { value: '48%', label: 'North America' },
          { value: '31%', label: 'EMEA' },
          { value: '21%', label: 'APAC + LATAM' },
        ]}
      />

      {/* StatGrid — traction */}
      <StatGrid
        nav="Traction"
        notes="These are the headline numbers investors remember. Say ARR is up 3× out loud."
        kicker="Traction"
        title="Numbers that compound."
        stats={[
          {
            value: <CountUp to={4.2} decimals={1} prefix="$" suffix="M" />,
            label: 'ARR',
            caption: 'up 3× year over year',
          },
          {
            value: <CountUp to={92} suffix="%" />,
            label: 'Net retention',
            caption: 'best in class',
          },
          {
            value: <CountUp to={120} suffix="+" />,
            label: 'Enterprise logos',
            caption: 'across six industries',
          },
        ]}
      />

      {/* BigNumber */}
      <BigNumber
        nav="Big number"
        notes="Let the number breathe. One sentence of context, then move."
        kicker="Every day"
        value={<CountUp to={2.4} decimals={1} suffix="B" />}
        caption="events answered in under a second."
        foot="Production traffic, trailing 30 days"
      />

      {/* Section divider */}
      <Section
        nav="Part two"
        notes="Breathe. New chapter."
        n={2}
        kicker="Part two"
        title={
          <>
            How it <span className="accent-text">works.</span>
          </>
        }
      />

      {/* Steps */}
      <Steps
        nav="How it works"
        notes="Walk left to right. The point is that step three is where competitors stop."
        kicker="How it works"
        title="Three steps to live data."
        items={[
          {
            title: 'Connect',
            body: 'Point Bolt Slides at your warehouse or event stream. No schema to define.',
          },
          {
            title: 'Model',
            body: 'It learns your entities and builds the metric graph automatically.',
          },
          {
            title: 'Act',
            body: 'Ask questions in plain English; alerts fire before dashboards notice.',
          },
        ]}
      />

      {/* Chat */}
      <Chat
        nav="Ask anything"
        notes="Click through the exchange one message at a time — pause after the answer lands."
        kicker="Ask anything"
        title="Plain English in. Answers out."
        name="Bolt Slides"
        messages={[
          { from: 'user', text: 'Why did signups dip last week?' },
          {
            from: 'ai',
            text: 'Signups fell 12% after Tuesday’s pricing-page change. The drop is entirely mobile — desktop is flat.',
          },
          { from: 'user', text: 'Roll it back for mobile only?' },
          {
            from: 'ai',
            text: 'Done. I’ll alert you when the trend recovers — based on current traffic, roughly 6 hours.',
          },
        ]}
      />

      {/* Comparison */}
      <Slide
        nav="Comparison"
        notes="Lead with realtime. If they push on price, point at the highlighted column."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            Why teams switch
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,38px)',
            }}
          >
            The honest comparison.
          </h2>
        </Reveal>
        <Reveal>
          <div style={{ maxWidth: 820, marginInline: 'auto' }}>
            <Comparison
              cols={['', 'Bolt Slides', 'Legacy tools']}
              highlight={0}
              rows={[
                { label: 'Realtime by default', values: [true, false] },
                { label: 'Self-host option', values: [true, false] },
                {
                  label: 'Time to first insight',
                  values: ['5 min', '2 weeks'],
                },
                { label: 'Starting price', values: ['$29', '$99'] },
              ]}
            />
          </div>
        </Reveal>
      </Slide>

      {/* Tabs */}
      <Slide
        nav="Use cases"
        notes="Click through the tabs as you speak to each team. Stop on the one that fits the room."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            One platform
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(20px,3vh,30px)',
            }}
          >
            Built for every team.
          </h2>
        </Reveal>
        <Reveal
          style={{ textAlign: 'center', maxWidth: 780, marginInline: 'auto' }}
        >
          <Tabs
            tabs={[
              {
                label: 'Engineering',
                content: (
                  <p className="lead">
                    Trace any request end-to-end, alert on anomalies, ship with
                    confidence.
                  </p>
                ),
              },
              {
                label: 'Data',
                content: (
                  <div style={{ height: 180 }}>
                    <BarChart
                      data={[
                        { label: 'Mon', value: 38 },
                        { label: 'Tue', value: 55 },
                        { label: 'Wed', value: 47 },
                        { label: 'Thu', value: 72 },
                        { label: 'Fri', value: 90 },
                      ]}
                      height={180}
                    />
                  </div>
                ),
              },
              {
                label: 'Ops',
                content: (
                  <p className="lead">
                    One source of truth for uptime, cost, and capacity — no
                    spreadsheets.
                  </p>
                ),
              },
            ]}
          />
        </Reveal>
      </Slide>

      {/* Split + code */}
      <Split
        nav="Developer-first"
        notes="Three lines, no schema. If there's an engineer in the room, this is the slide for them."
        kicker="Developer-first"
        title={
          <>
            Drop-in <span className="accent-text">simple.</span>
          </>
        }
        body="Add it to your app in three lines. No SDK to learn, no schema to define."
        media={
          <>
            <div style={panel(0.16)} />
            <div style={{ position: 'relative', padding: 36, width: '100%' }}>
              <CodeWindow
                title="app.ts"
                highlight={[3]}
                code={`import { track } from '@bolt-slides/sdk'

track('signup', {
  plan: 'pro',
  source: 'landing',
})`}
              />
            </div>
          </>
        }
      />

      {/* Browser frame */}
      <Slide
        center
        nav="Product"
        notes="Demo the real thing if you can. Otherwise walk the screen top to bottom."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 14 }}>
            See it live
          </div>
          <h2
            className="headline"
            style={{
              fontSize: 'clamp(30px,4.4vw,52px)',
              marginInline: 'auto',
              marginBottom: 'clamp(18px,3vh,28px)',
            }}
          >
            Your data, one screen.
          </h2>
        </Reveal>
        <Reveal>
          <div style={{ maxWidth: 800, marginInline: 'auto', width: '100%' }}>
            <BrowserFrame url="app.boltslides.dev">
              <div
                className="appmock"
                style={{ minHeight: 'clamp(280px, 42vh, 372px)' }}
              >
                <div
                  className="hide-narrow"
                  style={{
                    borderRight: '1px solid var(--hair-2)',
                    background: 'var(--surface)',
                    padding: '18px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <div
                    className="kicker"
                    style={{ marginBottom: 12, paddingLeft: 8 }}
                  >
                    Bolt Slides
                  </div>
                  {['Overview', 'Events', 'Funnels', 'Cohorts', 'Settings'].map(
                    (n, i) => (
                      <div
                        key={n}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 9,
                          fontSize: 14,
                          fontWeight: i === 0 ? 600 : 400,
                          color:
                            i === 0 ? 'var(--accent-ink)' : 'var(--fg-muted)',
                          background: i === 0 ? 'var(--accent)' : 'transparent',
                        }}
                      >
                        {n}
                      </div>
                    )
                  )}
                </div>
                <div style={{ padding: '20px 24px', textAlign: 'left' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginBottom: 16,
                    }}
                  >
                    <h3 style={{ fontSize: 19, fontWeight: 600, margin: 0 }}>
                      Overview
                    </h3>
                    <span className="foot">Last 30 days</span>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(min(110px, 100%), 1fr))',
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    {[
                      ['Revenue', '$1.24M', '▲ 18.2%'],
                      ['Active users', '48,210', '▲ 9.4%'],
                      ['Churn', '1.9%', '▼ 0.6%'],
                    ].map(([l, v, d]) => (
                      <div key={l} style={{ ...card, padding: 14 }}>
                        <div className="foot" style={{ marginBottom: 5 }}>
                          {l}
                        </div>
                        <div
                          style={{
                            fontSize: 23,
                            fontWeight: 600,
                            letterSpacing: '-0.02em',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {v}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: 'var(--primary)',
                            marginTop: 4,
                          }}
                        >
                          {d}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ ...card, padding: 16 }}>
                    <LineChart
                      points={[12, 16, 14, 22, 26, 34, 30, 44]}
                      height={120}
                    />
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </Reveal>
      </Slide>

      {/* Charts */}
      <Slide
        nav="Metrics"
        notes="Net retention at 94% is the one to call out — it means the product sells itself."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            The numbers
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,38px)',
            }}
          >
            Growth you can see.
          </h2>
        </Reveal>
        <Reveal>
          <div className="cols">
            <div style={card}>
              <div className="kicker" style={{ marginBottom: 14 }}>
                Weekly active
              </div>
              <div style={{ height: 150 }}>
                <BarChart
                  data={[
                    { label: 'W1', value: 30 },
                    { label: 'W2', value: 44 },
                    { label: 'W3', value: 39 },
                    { label: 'W4', value: 61 },
                    { label: 'W5', value: 78 },
                    { label: 'W6', value: 96 },
                  ]}
                  height={150}
                />
              </div>
            </div>
            <div style={card}>
              <div className="kicker" style={{ marginBottom: 14 }}>
                Revenue
              </div>
              <LineChart
                points={[12, 16, 14, 22, 26, 34, 30, 44]}
                height={150}
              />
            </div>
            <div
              style={{
                ...card,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DonutChart value={94} label="Net retention" size={150} />
            </div>
          </div>
        </Reveal>
      </Slide>

      {/* Data table */}
      <Slide
        nav="Unit economics"
        notes="Walk the growth column top to bottom — APAC is the story."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            Unit economics
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,38px)',
            }}
          >
            Growth, by region.
          </h2>
        </Reveal>
        <Reveal>
          <Table
            columns={['Region', 'ARR', 'Growth', 'NRR', 'Payback']}
            rows={[
              ['North America', '$2.4M', '+38%', '124%', '11 mo'],
              ['Europe', '$1.1M', '+52%', '118%', '13 mo'],
              ['APAC', '$0.7M', '+61%', '109%', '14 mo'],
              ['LATAM', '$0.2M', '+44%', '104%', '16 mo'],
            ]}
            highlightCol={2}
            caption="Company data, FY25 · NRR = net revenue retention"
          />
        </Reveal>
      </Slide>

      {/* Timeline */}
      <Slide
        nav="Roadmap"
        notes="Anchor on 'Now'. The AI insights line is what gets people excited — dwell there."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            Where we're going
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(20px,3vh,32px)',
            }}
          >
            The roadmap.
          </h2>
        </Reveal>
        <div style={{ maxWidth: 560, marginInline: 'auto' }}>
          <Timeline
            items={[
              {
                time: 'Shipped',
                title: 'Realtime core',
                body: 'Sub-second metrics across 28 regions.',
              },
              {
                time: 'Now',
                title: 'AI insights',
                body: 'Plain-English answers from your data.',
              },
              {
                time: 'Next',
                title: 'Enterprise',
                body: 'SSO, audit logs, and on-prem.',
              },
            ]}
          />
        </div>
      </Slide>

      {/* Pricing */}
      <Pricing
        nav="Pricing"
        notes="Anchor on Pro. Enterprise exists so Pro looks reasonable — don't oversell it."
        kicker="Pricing"
        title="Simple, honest plans."
        tiers={[
          {
            name: 'Starter',
            price: '$29',
            period: '/mo',
            blurb: 'For small teams getting live.',
            features: [
              '1M events / month',
              'Realtime dashboards',
              'Community support',
            ],
          },
          {
            name: 'Pro',
            price: '$79',
            period: '/mo',
            blurb: 'Everything growing teams need.',
            features: [
              '10M events / month',
              'AI insights + alerts',
              'Self-host option',
              'Priority support',
            ],
            highlight: true,
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            blurb: 'Scale, compliance, and control.',
            features: [
              'Unlimited events',
              'SSO + audit logs',
              'On-prem deploy',
              'Dedicated CSM',
            ],
          },
        ]}
      />

      {/* Spotlight principles */}
      <Slide
        nav="Principles"
        notes="Hover the cards for the glow if presenting on a screen. Keep this one short."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            What we believe
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,38px)',
            }}
          >
            Three principles.
          </h2>
        </Reveal>
        <Reveal>
          <div className="cols">
            {[
              {
                k: '01',
                t: 'Fast by default',
                d: 'Speed is a feature. Everything is realtime.',
              },
              {
                k: '02',
                t: 'Yours to own',
                d: 'Your data, your infra, no lock-in.',
              },
              {
                k: '03',
                t: 'Honest pricing',
                d: 'No per-seat tax. Scale without surprises.',
              },
            ].map((p) => (
              <SpotlightCard key={p.k}>
                <div
                  className="kicker accent-text"
                  style={{ marginBottom: 12 }}
                >
                  {p.k}
                </div>
                <h3
                  style={{
                    fontSize: 'clamp(20px,2.2vw,26px)',
                    fontWeight: 600,
                    margin: '0 0 8px',
                  }}
                >
                  {p.t}
                </h3>
                <p
                  style={{
                    color: 'var(--fg-muted)',
                    fontSize: 15,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {p.d}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>
      </Slide>

      {/* Accordion — FAQ */}
      <Slide
        nav="FAQ"
        notes="Only open the questions they actually ask. Skip the rest to keep momentum."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            Common questions
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(20px,3vh,30px)',
            }}
          >
            Frequently asked.
          </h2>
        </Reveal>
        <Reveal>
          <div style={{ maxWidth: 720, marginInline: 'auto' }}>
            <Accordion
              items={[
                {
                  title: 'How long does setup take?',
                  body: 'Five minutes — point Bolt Slides at your warehouse and you are live.',
                },
                {
                  title: 'Can we self-host?',
                  body: 'Yes. A Docker image and Terraform module ship with every plan.',
                },
                {
                  title: 'How is it priced?',
                  body: 'Flat monthly, no per-seat tax — you scale without surprises.',
                },
              ]}
            />
          </div>
        </Reveal>
      </Slide>

      {/* Team */}
      <Team
        nav="Team"
        notes="One line per person. The point is the operator pedigree, not the bios."
        kicker="The team"
        title="Built by operators."
        people={[
          { name: 'Dana Kim', role: 'CEO · ex-Stripe' },
          { name: 'Ade Obi', role: 'CTO · ex-Datadog' },
          { name: 'Mara Silva', role: 'Design · ex-Linear' },
          { name: 'Jon Park', role: 'GTM · ex-Snowflake' },
        ]}
      />

      {/* Logos */}
      <Slide
        center
        nav="Customers"
        notes="Name-drop the two logos most relevant to this audience."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 28 }}>
            Trusted by teams everywhere
          </div>
        </Reveal>
        <Marquee
          items={[
            'Northwind',
            'Globex',
            'Initech',
            'Umbra',
            'Hooli',
            'Vehement',
            'Soylent',
          ]}
        />
      </Slide>

      {/* Quote */}
      <Quote
        nav="Quote"
        notes="Read it slowly, then stay silent for a second. Let it land."
        text="We replaced four tools with Bolt Slides and never looked back."
        name="Dana Kim"
        role="VP Engineering, Acme"
      />

      {/* CTA */}
      <Slide
        center
        nav="Close"
        notes="Make the ask explicitly. Leave the contact details on screen while you take questions."
      >
        <Reveal>
          <h2 className="display" style={{ fontSize: 'clamp(40px,7vw,96px)' }}>
            <span className="accent-text">Let's talk.</span>
          </h2>
          <p className="subhead" style={{ marginTop: 16 }}>
            hello@bolt.new
          </p>
        </Reveal>
      </Slide>
    </Deck>
  );
}
