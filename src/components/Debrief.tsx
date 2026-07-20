/* The post-session debrief card — Couch's feedback surface: three strengths,
   three next moves, one micro-drill. Rendered as a product mock for a Split
   media panel. Pure tokens, no deps. */

const Check = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.5l4.5 4.5L19 6.5" />
  </svg>
);
const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export default function Debrief() {
  const strengths = [
    'Validated before problem-solving',
    'One open question did the heavy lifting',
    'Matched her pace — no rush to fix',
  ];
  const moves = [
    'Reflect the feeling, not just the facts',
    'Name the sleep pattern earlier',
    'Sit longer in the silence after “its stupid”',
  ];
  return (
    <div className="db-card mat">
      <div className="db-head">
        <span className="db-title">Session debrief</span>
        <span className="db-meta">Mia · 14 min · text</span>
      </div>
      <div className="db-sec">
        <div className="db-k">3 strengths</div>
        {strengths.map((s) => (
          <div key={s} className="db-row ok">
            <Check />
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="db-sec">
        <div className="db-k">3 next moves</div>
        {moves.map((s) => (
          <div key={s} className="db-row mv">
            <Arrow />
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="db-drill">
        <span className="db-drill-k">1 micro-drill</span>
        <p>
          Respond to “its stupid” three ways — without reassuring her once.
        </p>
      </div>
    </div>
  );
}
