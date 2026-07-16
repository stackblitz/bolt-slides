import Deck from '../../deck/Deck';
import Slide from '../../deck/Slide';
import Build from '../../deck/Build';
import Cover from '../../components/Cover';
import Split from '../../components/Split';
import Comparison from '../../components/Comparison';
import Timeline from '../../components/Timeline';
import StatGrid from '../../components/StatGrid';
import Quote from '../../components/Quote';
import { BarChart } from '../../components/Charts';

const metrics = [
  { value: '6 min', label: 'Draft to review', caption: 'A short concept deck in one working session.' },
  { value: '7 slides', label: 'Starter narrative', caption: 'Enough structure to pitch a direction clearly.' },
  { value: '1 link', label: 'Shareable output', caption: 'Preview and present from the same deck runtime.' },
];

export default function SampleDeck() {
  return (
    <Deck>
      <Cover
        nav="Cover"
        notes="Welcome to Cubicle Slides. This sample deck is intentionally neutral and demonstrates the reusable presentation runtime."
        kicker="Cubicle Slides"
        title={
          <>
            Present ideas as
            <br />
            <span className="accent-text">living web slides.</span>
          </>
        }
        subtitle="A neutral starter deck for exploring the presentation engine, reusable components, and presenter workflow."
        foot="Sample deck"
      />

      <Slide
        center
        nav="Statement"
        notes="Use one strong statement, then reveal the supporting line on the first click."
      >
        <h2 className="headline" style={{ marginInline: 'auto' }}>
          A deck can be more than a static export.
        </h2>
        <Build at={1}>
          <p className="subhead" style={{ marginTop: 22 }}>
            Cubicle Slides keeps every slide responsive, interactive, and ready
            to present in the browser.
          </p>
        </Build>
      </Slide>

      <Split
        nav="Preview"
        notes="Show how one side can carry the story while the other side previews the interface."
        kicker="Preview instantly"
        title={
          <>
            Move from rough outline
            <br />
            to <span className="accent-text">presentable structure.</span>
          </>
        }
        body="The reusable engine supports full-bleed layouts, responsive content, and the same presentation controls across every deck."
        media={
          <div
            className="mat"
            style={{
              margin: 'clamp(20px,3vw,40px)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(20px,2.2vw,28px)',
              display: 'grid',
              gap: 14,
            }}
          >
            {[
              'Define the opening story',
              'Structure the key sections',
              'Preview the deck live',
              'Present with notes and controls',
            ].map((item, index) => (
              <Build
                key={item}
                at={index + 1}
                className="mat"
                style={{
                  borderRadius: 'var(--radius)',
                  padding: '16px 18px',
                  background: 'color-mix(in srgb, var(--surface-2) 95%, transparent)',
                }}
              >
                <div className="chip">Step {index + 1}</div>
                <h3 style={{ marginTop: 12, fontSize: 'clamp(18px,2vw,22px)' }}>
                  {item}
                </h3>
              </Build>
            ))}
          </div>
        }
      />

      <Slide nav="Comparison" notes="This slide shows the existing comparison component in a neutral form.">
        <div className="container">
          <div className="kicker" style={{ textAlign: 'center', marginBottom: 12 }}>
            Why this runtime
          </div>
          <h2 className="headline" style={{ textAlign: 'center', marginInline: 'auto', marginBottom: 34 }}>
            One engine, multiple deck experiences.
          </h2>
          <Comparison
            cols={['', 'Cubicle Slides', 'Static slides']}
            highlight={0}
            rows={[
              { label: 'Layout', values: ['Responsive web layouts', 'Fixed export dimensions'] },
              { label: 'Presentation controls', values: ['Built in', 'Usually external'] },
              { label: 'Speaker notes', values: ['Presenter overlay', 'Separate notes workflow'] },
              { label: 'Live updates', values: ['Preview in browser', 'Re-export required'] },
            ]}
          />
        </div>
      </Slide>

      <Slide nav="Timeline" notes="Use the timeline to tell a small, structured process story.">
        <div className="container">
          <div className="kicker" style={{ marginBottom: 12 }}>
            Workflow
          </div>
          <h2 className="headline" style={{ marginBottom: 22 }}>
            A simple path from concept to presentation.
          </h2>
          <Timeline
            items={[
              { time: 'Start', title: 'Draft the message', body: 'Frame the audience, the problem, and the one idea worth remembering.' },
              { time: 'Shape', title: 'Organize the story', body: 'Turn the draft into a short sequence of slides with clear transitions.' },
              { time: 'Refine', title: 'Review the visuals', body: 'Use reusable layouts, charts, and notes to tighten the presentation.' },
              { time: 'Present', title: 'Deliver live', body: 'Present, annotate, navigate with the keyboard, and keep notes in sync.' },
            ]}
          />
        </div>
      </Slide>

      <Slide nav="Metrics" notes="This slide demonstrates the stat grid and chart components together.">
        <div className="container">
          <div className="kicker" style={{ textAlign: 'center', marginBottom: 12 }}>
            Metrics and charts
          </div>
          <h2 className="headline" style={{ textAlign: 'center', marginInline: 'auto', marginBottom: 28 }}>
            Built-in components cover common presentation needs.
          </h2>
          <StatGrid stats={metrics} />
          <div
            className="mat"
            style={{
              marginTop: 24,
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
            }}
          >
            <div className="chip">Example trend</div>
            <div style={{ height: 220, marginTop: 18 }}>
              <BarChart
                height={220}
                data={[
                  { label: 'Outline', value: 2 },
                  { label: 'Draft', value: 4 },
                  { label: 'Review', value: 5 },
                  { label: 'Present', value: 7 },
                ]}
              />
            </div>
          </div>
        </div>
      </Slide>

      <Quote
        nav="Closing"
        notes="Close with a concise takeaway and invite the next step."
        text="Use the sample deck as a clean starting point, and keep the engine free to power many different stories."
        name="Cubicle Slides"
        role="Neutral sample deck"
      />
    </Deck>
  );
}
