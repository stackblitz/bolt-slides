import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import Cover from './components/Cover';
import BigNumber from './components/BigNumber';
import Split from './components/Split';
import Contrast from './components/Contrast';
import SpotlightCard from './components/SpotlightCard';
import Comparison from './components/Comparison';
import Globe from './components/Globe';
import Steps from './components/Steps';
import StatGrid from './components/StatGrid';
import CountUp from './components/CountUp';
import Bento from './components/Bento';
import PhoneChat from './components/PhoneChat';
import Debrief from './components/Debrief';
import WedgeModel from './components/WedgeModel';

/* ══════════════════════════════════════════════════════════════════════
   COUCH — practice therapy before it counts.
   Pitch deck for Eric Simons, July 2026. Built with Bolt Slides.
   ══════════════════════════════════════════════════════════════════════ */

const panel = (extra = 0.2): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  background: `radial-gradient(120% 100% at 30% 20%, color-mix(in srgb, var(--primary) ${
    extra * 100
  }%, transparent), transparent 60%), var(--surface-2)`,
});

export default function App() {
  return (
    <Deck>
      {/* 1 — Cover */}
      <Cover
        nav="Couch"
        notes="One line, no jargon: virtual patients for therapists in training. The deck is itself a working web app — that's the point of the format."
        kicker="couch · trycouch.app"
        title={
          <>
            Practice therapy{' '}
            <span className="accent-text">before it counts.</span>
          </>
        }
        subtitle="Virtual patients for therapists in training."
      />

      {/* 2 — The sting */}
      <BigNumber
        nav="One rep"
        notes="Six years of theory, then a real human being. This number is the top-voted complaint in the student community — let it sit."
        kicker="years of theory. then a real human."
        value={<span style={{ fontFamily: 'var(--font-head)' }}>1</span>}
        caption="role-playing exercise in an entire psychology degree."
        foot="The top-voted complaint in the student community — real post, 54 upvotes · “I’m paying $60k for this degree. I shouldn’t be teaching myself.”"
      />

      {/* 3 — Meet Mia (the demo IS the slide) */}
      <Split
        nav="Meet Mia"
        notes="Click through the exchange one message at a time. Point at the register — lowercase, deflection, the late-night cadence. No install, no new app: the product lives in Messages."
        kicker="meet mia"
        title={
          <>
            A patient in your pocket{' '}
            <span className="accent-text">you can’t hurt.</span>
          </>
        }
        body={
          <>
            <p style={{ margin: 0 }}>
              Mia texts like a real first-time client: lowercase, guarded,
              sometimes hours between replies.
              <span className="hide-narrow">
                {' '}
                Rush to fix her and she cools off. Show real skill and she
                opens up. She’s winnable, not automatic.
              </span>
            </p>
            <p
              className="foot"
              style={{ marginTop: 'clamp(14px,2vh,22px)' }}
            >
              advance ( → ) to play the session
            </p>
          </>
        }
        media={
          <>
            <div style={panel(0.2)} />
            <div
              style={{
                position: 'relative',
                padding: 'clamp(14px,2.5vw,32px)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <PhoneChat
                beats={[
                  { kind: 'sep', text: 'Today 11:04 pm' },
                  {
                    kind: 'msg',
                    from: 'mia',
                    text: 'hi… i got your number from the uni counselling page. is this how this works? ive never done this before',
                  },
                  {
                    kind: 'msg',
                    from: 'mia',
                    text: 'honestly not even sure i should be texting',
                  },
                  {
                    kind: 'msg',
                    from: 'me',
                    text: 'Hey Mia, I’m glad you reached out. No pressure to have it all figured out — what made tonight the night you texted?',
                  },
                  { kind: 'status', text: 'Delivered' },
                  { kind: 'typing' },
                  {
                    kind: 'msg',
                    from: 'mia',
                    text: 'idk. couldnt sleep again. work stuff i guess',
                  },
                  { kind: 'msg', from: 'mia', text: 'its stupid' },
                  {
                    kind: 'msg',
                    from: 'me',
                    text: 'It doesn’t sound stupid. Sleep is usually the first thing to go when something’s weighing on us. What’s the work stuff been like?',
                  },
                  { kind: 'typing' },
                  {
                    kind: 'msg',
                    from: 'mia',
                    text: 'like im about to get found out. everyone thinks im doing fine',
                  },
                ]}
              />
            </div>
          </>
        }
      />

      {/* 4 — Receipts: real screenshots from the live build */}
      <Slide
        nav="Receipts"
        notes="These are unedited screenshots from the live build on iMessage — note the clock in the status bar. The reps happen at 1am because that's when students study. Mia opens the conversation, deflects, minimises ('everyone gets stressed sometimes lol'), and the register holds up."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            receipts
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 10,
            }}
          >
            Not a mockup.
          </h2>
          <p
            className="lead"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(18px,3vh,28px)',
            }}
          >
            Live on iMessage today.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="shots">
            <div className="shot">
              <img src="/receipts/r1.png" alt="Real Mia session — first contact" />
            </div>
            <div className="shot">
              <img src="/receipts/r2.png" alt="Real Mia session — 1am, work stress" />
            </div>
            <div className="shot">
              <img src="/receipts/r3.png" alt="Real Mia session — she minimises, then asks how sessions work" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="foot"
            style={{
              textAlign: 'center',
              marginTop: 'clamp(14px,2.5vh,22px)',
            }}
          >
            Unedited screenshots from the current build · July 2026
          </p>
        </Reveal>
      </Slide>

      {/* 5 — The debrief loop */}
      <Split
        flip
        nav="The debrief"
        notes="The drill references the exact exchange they just watched — feedback is specific to the session, never generic."
        kicker="the loop"
        title="Every rep ends in a debrief."
        body="Sessions run under 20 minutes; some are 6 or 7. Each one closes with three strengths, three next moves, and one micro-drill. Reps with specific feedback is how the skill actually builds."
        media={
          <>
            <div style={panel(0.13)} />
            <div
              style={{
                position: 'relative',
                padding: 'clamp(14px,2.5vw,32px)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Debrief />
            </div>
          </>
        }
      />

      {/* 5 — Why a prompted LLM can't do this */}
      <Contrast
        nav="Not ChatGPT"
        notes="The failure list is from published research — a 2025 study called naive LLM patients “the world’s most pleasant client.” Mia’s engine is a point-by-point rebuttal. Safety and booking never run on model phrasing."
        kicker="realism is engineered, not prompted"
        title="Students already practise on ChatGPT. It can’t play the part."
        left={{
          label: 'A prompted LLM',
          title: '“The world’s most pleasant client”',
          points: [
            'Agreeable on contact — resistance folds in one turn',
            'Over-discloses, in textbook language',
            '“Solved” in three turns',
          ],
        }}
        right={{
          label: 'Mia',
          title: 'Winnable, not automatic',
          points: [
            'Guarded, gradual disclosure that responds to technique',
            'A believable texting register — cadence, typos, hours-later replies',
            'Booking and safety handoffs on deterministic logic, never model phrasing',
          ],
        }}
      />

      {/* 6 — Evidence */}
      <Slide
        nav="Evidence"
        notes="Two independent sources, same direction. And the debrief engine is built to generate this evidence from our own usage as we grow."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            the evidence
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,38px)',
              maxWidth: '26ch',
            }}
          >
            Text-first is the recommended entry point, not a compromise.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="cols" style={{ maxWidth: 860, marginInline: 'auto' }}>
            <SpotlightCard>
              <div className="kicker accent-text" style={{ marginBottom: 12 }}>
                PATIENT-Ψ · EMNLP 2024
              </div>
              <p
                style={{
                  color: 'var(--fg-muted)',
                  fontSize: 15.5,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Trainees who practised with simulated patients gained skill and
                confidence beyond textbooks, videos, and peer role-play.
              </p>
            </SpotlightCard>
            <SpotlightCard>
              <div className="kicker accent-text" style={{ marginBottom: 12 }}>
                Counsellor-trainee study · 2025
              </div>
              <p
                style={{
                  color: 'var(--fg-muted)',
                  fontSize: 15.5,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Recommends text-based simulation as the starting modality for
                clinical practice — the pocket-sized rep comes first.
              </p>
            </SpotlightCard>
          </div>
        </Reveal>
        <Build at={1}>
          <p
            className="foot"
            style={{
              textAlign: 'center',
              marginTop: 'clamp(18px,3vh,28px)',
              marginInline: 'auto',
            }}
          >
            The debrief engine is built to generate the same evidence from our
            own usage.
          </p>
        </Build>
      </Slide>

      {/* 7 — The field */}
      <Slide
        nav="The field"
        notes="Actor patients are genuinely good — and $50–100+ an hour, booked weeks out, one take, in front of peers. ChatGPT is free and instant — and fails as a patient. Couch is the only column that is both real practice and always there."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            the real competitor is the status quo
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,38px)',
            }}
          >
            What a rep costs today.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ maxWidth: 860, marginInline: 'auto' }}>
            <Comparison
              cols={['', 'Couch', 'Role-play & actor patients', 'ChatGPT']}
              highlight={0}
              rows={[
                {
                  label: 'Cost per rep',
                  values: ['cents', '$50–100+ an hour', 'free'],
                },
                { label: 'There at 11pm', values: [true, false, true] },
                {
                  label: 'Resists like a real client',
                  values: [true, true, false],
                },
                {
                  label: 'Private — no peer audience',
                  values: [true, false, true],
                },
                { label: 'Debrief after every rep', values: [true, false, false] },
                {
                  label: 'Booked in seconds, not weeks',
                  values: [true, false, true],
                },
              ]}
            />
          </div>
        </Reveal>
      </Slide>

      {/* 8 — The wedge, geographically */}
      <Globe
        nav="The wedge"
        notes="Melbourne is a remarkably dense launch surface: 8,000+ psych students inside one tram network. Distribution is 1:1 — psych societies, supervisors, word of mouth — then the same motion widens outward."
        kicker="the wedge"
        title="Melbourne first. Then APAC."
        body="Distribution is 1:1 through psych societies, supervisors and word of mouth. Own one dense city, then widen through the same channels."
        markers={[
          {
            location: [-37.81, 144.96],
            size: 0.09,
            label: 'Melbourne',
            value: '8,000+ students',
          },
          { location: [-33.87, 151.21], size: 0.06 },
          { location: [-27.47, 153.03], size: 0.05 },
          { location: [-31.95, 115.86], size: 0.05 },
          { location: [-34.93, 138.6], size: 0.045 },
          { location: [-42.88, 147.33], size: 0.04 },
          { location: [-36.85, 174.76], size: 0.05 },
          { location: [1.35, 103.82], size: 0.05 },
        ]}
        arcs={[
          { from: [-37.81, 144.96], to: [-33.87, 151.21] },
          { from: [-37.81, 144.96], to: [-36.85, 174.76] },
          { from: [-37.81, 144.96], to: [1.35, 103.82] },
        ]}
        stats={[
          { value: '8,000+', label: 'psych students in Melbourne · 9 universities' },
          { value: '65–80k', label: 'psychology students across APAC' },
          { value: '1 city', label: 'is enough to prove the wedge' },
        ]}
      />

      {/* 9 — Business model */}
      <Steps
        nav="The model"
        notes="The churn objection, answered before it's asked: usage ending at licensure is the design. Students prove pull; institutions renew."
        kicker="how it makes money"
        title="Students are the wedge. The institution is the buyer that persists."
        items={[
          {
            title: 'Students subscribe',
            body: 'A$15–25 a month for private, high-frequency reps. Usage peaks across the 4–7 training years, then ends at licensure — by design.',
          },
          {
            title: 'Universities license cohorts',
            body: 'A voluntary, formative practice layer for a whole intake. Students graduate; the institution persists.',
          },
          {
            title: 'Professions expand',
            body: 'Social work, nursing, medical communication — the same theory-to-practice gap. Simulation is already a line item in health-education budgets.',
          },
        ]}
      />

      {/* 10 — Interactive model */}
      <Slide
        nav="Run it"
        notes="Grab a slider — the deck is a web app, so the model is live. Price is our confirmed launch range. The point isn't the projection; it's that the wedge is small enough to actually win and big enough to matter."
      >
        <Reveal>
          <div
            className="kicker"
            style={{ marginBottom: 12, textAlign: 'center' }}
          >
            drag it yourself
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(20px,3.5vh,34px)',
            }}
          >
            Run the Melbourne wedge.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <WedgeModel />
        </Reveal>
      </Slide>

      {/* 11 — Traction, honestly */}
      <StatGrid
        nav="Today"
        notes="No inflated numbers on purpose. Five students doing real weekly sessions; three active conversations with curriculum leaders, not LOIs. Voice and video run on the same patient engine and are in testing now."
        kicker="traction · july 2026"
        title="What exists today."
        stats={[
          {
            value: <CountUp to={5} />,
            label: 'students in closed alpha',
            caption: 'psychology & counselling, Melbourne',
          },
          {
            value: <CountUp to={3} />,
            label: 'universities in curriculum talks',
            caption: 'Melbourne, Deakin & Monash',
          },
          {
            value: <>$0</>,
            label: 'raised',
            caption: 'solo-built end to end',
          },
          {
            value: <>Built</>,
            label: 'voice & video sessions',
            caption: 'in testing — same patient engine as text',
          },
        ]}
      />

      {/* 12 — Founder */}
      <Bento
        nav="Founder"
        notes="MedReport is small and boring on purpose — it proves I can ship clinical software solo, sell it to this exact industry, and support it. Mango Club proves I can build distribution with zero ad spend. Couch is where both lines meet."
        kicker="why me"
        title="Second clinical product. Same solo founder."
        tiles={[
          {
            k: 'MedReport · product #1',
            fig: <CountUp to={8} />,
            title: 'practices paying $299/mo',
            body: 'Documentation for Australian psychology practices. Shipped solo, now maintenance mode — it pays the bills while Couch is built.',
            c: 5,
            variant: 'glow',
          },
          {
            k: 'the insight',
            title: 'Two years inside those practices',
            body: 'Watching graduates arrive visibly short on practice. Couch is that gap, productised.',
            c: 7,
          },
          {
            k: 'before software · Mango Club',
            title: '1,500–3,000 people every Friday, for two years',
            body: 'Co-founded at 21. Zero paid ads in year one — a 200+ promoter street team. Distribution is muscle memory.',
            c: 7,
          },
          {
            k: 'the build',
            title: 'Self-taught. Ships alone.',
            body: 'Early Couch prototypes built in Bolt. This deck is Bolt Slides.',
            c: 5,
            variant: 'accent',
          },
        ]}
      />

      {/* 13 — Why now */}
      <Slide
        center
        nav="Why now"
        notes="Capability, evidence, regulatory timing, and an unclaimed modality — all at once. This window is why the wedge is winnable by one focused person right now."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 14 }}>
            timing
          </div>
          <h2
            className="headline"
            style={{
              fontSize: 'clamp(32px,5vw,60px)',
              marginInline: 'auto',
            }}
          >
            Why now, specifically.
          </h2>
        </Reveal>
        <Build at={1}>
          <p className="lead" style={{ marginTop: 'clamp(20px,3.5vh,30px)' }}>
            Models can finally hold a patient who resists, remembers, and
            responds to technique. The validating research only landed in late
            2024 and 2025.
          </p>
        </Build>
        <Build at={2}>
          <p className="lead" style={{ marginTop: 14 }}>
            Australia’s psychology-education pathway is being redesigned right
            now. The training window itself is in play.
          </p>
        </Build>
        <Build at={3}>
          <p className="lead" style={{ marginTop: 14 }}>
            SimCare AI went institutional with live avatars. Theravue sells
            skills modules. Nobody owns the texting patient in the student’s
            pocket.
          </p>
        </Build>
      </Slide>

      {/* 14 — The ask */}
      <Slide
        center
        nav="The ask"
        notes="Direct ask, no round theater: $50k, first cheque, three named milestones. Burn stays tiny — one founder, product #1 still paying the bills."
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 16 }}>
            the ask
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(56px,10vw,140px)' }}>
            <span className="accent-text">$50k.</span>
          </h2>
        </Reveal>
        <Build at={1}>
          <p
            className="lead"
            style={{ marginTop: 'clamp(18px,3vh,26px)', maxWidth: '52ch' }}
          >
            First money in. It converts the Melbourne wedge: closed alpha to
            paid launch, a first university pilot, voice sessions out of
            testing.
          </p>
        </Build>
        <Build at={2}>
          <p className="lead" style={{ marginTop: 14, maxWidth: '52ch' }}>
            One founder, no office, product #1 still paying the bills. The
            money buys runway and experiments, not headcount.
          </p>
        </Build>
        <Build at={3}>
          <p
            className="lead"
            style={{
              marginTop: 'clamp(20px,3.5vh,30px)',
              maxWidth: '48ch',
              fontFamily: 'var(--font-head)',
              fontStyle: 'italic',
              color: 'var(--fg)',
            }}
          >
            Bolt closed the gap between wanting to build and building. Couch
            closes the gap between studying therapy and practising it.
          </p>
        </Build>
        <Reveal delay={0.2}>
          <p
            style={{
              marginTop: 'clamp(22px,4vh,34px)',
              fontSize: 15,
              color: 'var(--fg-muted)',
              fontWeight: 550,
            }}
          >
            Adam Sardo · trycouch.app · adam@trycouch.app
          </p>
        </Reveal>
      </Slide>
    </Deck>
  );
}
