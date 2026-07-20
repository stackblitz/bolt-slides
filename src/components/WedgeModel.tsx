import { useState } from 'react';

/* An interactive unit-economics model the audience drags themselves —
   launch price × share of the Melbourne wedge → MRR/ARR, recomputed live.
   Clearly labeled a model, not a forecast. Range inputs are ignored by the
   deck's keyboard handler (it skips INPUT targets), so arrow keys on a
   focused slider tune the model instead of changing slides. */

const MELBOURNE = 8000;

export default function WedgeModel() {
  const [price, setPrice] = useState(20);
  const [students, setStudents] = useState(800);
  const mrr = price * students;
  const pct = Math.round((students / MELBOURNE) * 100);
  const fmt = (n: number) =>
    'A$' + n.toLocaleString('en-AU', { maximumFractionDigits: 0 });

  return (
    <div className="wm mat">
      <div className="wm-controls">
        <label className="wm-ctl">
          <span className="wm-label">
            Price <em className="wm-val">A${price}/mo</em>
          </span>
          <input
            type="range"
            min={15}
            max={25}
            step={1}
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            aria-label="Monthly price, A$15 to A$25"
          />
          <span className="wm-hint">launch range A$15–25</span>
        </label>
        <label className="wm-ctl">
          <span className="wm-label">
            Students{' '}
            <em className="wm-val">
              {students.toLocaleString('en-AU')} · {pct}% of Melbourne
            </em>
          </span>
          <input
            type="range"
            min={0}
            max={MELBOURNE}
            step={50}
            value={students}
            onChange={(e) => setStudents(+e.target.value)}
            aria-label="Subscribed students, 0 to 8,000"
          />
          <span className="wm-hint">8,000+ psych students in Melbourne alone</span>
        </label>
      </div>
      <div className="wm-out">
        <div className="wm-cell">
          <span className="wm-k">MRR</span>
          <span className="wm-fig">{fmt(mrr)}</span>
        </div>
        <div className="wm-cell">
          <span className="wm-k">ARR</span>
          <span className="wm-fig">{fmt(mrr * 12)}</span>
        </div>
        <div className="wm-cell dim">
          <span className="wm-k">APAC ceiling</span>
          <span className="wm-fig sm">65–80k students</span>
        </div>
      </div>
      <div className="wm-foot">
        A model to drag, not a forecast. One rep costs cents to serve; the
        same engine then licenses to universities by the cohort.
      </div>
    </div>
  );
}
