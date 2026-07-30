import { Fragment, type ReactNode } from 'react';

/* A macOS-style code window with a gutter-ruled line-number column and
   restrained syntax tinting. Highlighting is intentionally minimal (keywords,
   strings, numbers, comments) to stay on-brand — one accent, no rainbow.
   <CodeWindow title="server.ts" highlight={[3]} code={`…`} /> */
const KW =
  /\b(const|let|var|function|return|if|else|for|while|import|from|export|default|class|new|await|async|type|interface|extends|implements|public|private|true|false|null|undefined)\b/g;
const NUM = /(\b\d+(?:\.\d+)?\b)/g;

function tintNumbers(s: string, key: number): ReactNode {
  const parts = s.split(NUM);
  if (parts.length === 1) return s;
  return (
    <Fragment key={key}>
      {parts.map((p, k) =>
        k % 2 === 1 ? (
          <span key={k} className="cw-num">
            {p}
          </span>
        ) : (
          p
        )
      )}
    </Fragment>
  );
}

// Find the start of a `//` line comment, skipping `//` that appears inside a
// string literal (e.g. a URL like 'https://…') so the string isn't cut short.
function commentStart(line: string): number {
  let quote = '';
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = '';
    } else if (c === '"' || c === "'" || c === '`') {
      quote = c;
    } else if (c === '/' && line[i + 1] === '/') {
      return i;
    }
  }
  return -1;
}

function hl(line: string): ReactNode {
  // split off a trailing line comment (ignoring `//` inside strings)
  const ci = commentStart(line);
  const code = ci >= 0 ? line.slice(0, ci) : line;
  const comment = ci >= 0 ? line.slice(ci) : '';
  // strings first (odd indices), then keywords, then numeric literals
  const segs = code.split(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g
  );
  return (
    <>
      {segs.map((seg, i) =>
        i % 2 === 1 ? (
          <span key={i} className="cw-str">
            {seg}
          </span>
        ) : (
          <Fragment key={i}>
            {seg.split(KW).map((s, j) =>
              j % 2 === 1 ? (
                <span key={j} className="cw-kw">
                  {s}
                </span>
              ) : (
                tintNumbers(s, j)
              )
            )}
          </Fragment>
        )
      )}
      {comment && <span className="cw-com">{comment}</span>}
    </>
  );
}

export default function CodeWindow({
  title = 'app.tsx',
  code,
  highlight = [],
}: {
  title?: string;
  code: string;
  highlight?: number[];
}) {
  const lines = code.replace(/\n$/, '').split('\n');
  return (
    <div className="cw mat">
      <div className="cw-bar">
        <span className="cw-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="cw-title">{title}</span>
      </div>
      <pre className="cw-body">
        <code>
          {lines.map((ln, i) => (
            <div
              key={i}
              className={'cw-line' + (highlight.includes(i + 1) ? ' hl' : '')}
            >
              <span className="cw-no">{i + 1}</span>
              <span className="cw-code">{ln.length ? hl(ln) : ' '}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
