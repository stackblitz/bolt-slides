import { useState, type MouseEvent, type ReactNode } from 'react';

/* A prompt to copy, verbatim: mono text in a bordered box with a copy button.
   `label` names it (e.g. "Version 1"); `muted` styles a "before" prompt. */
export default function Prompt({
  children,
  label = 'Prompt à copier',
  muted,
  size = 'md',
}: {
  children: ReactNode;
  label?: string;
  muted?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [copied, setCopied] = useState(false);
  const fontSize = {
    sm: 'clamp(11.5px, 1.05vw, 15px)',
    md: 'clamp(13px, 1.3vw, 18px)',
    lg: 'clamp(16px, 2vw, 28px)',
  }[size];
  const copy = (e: MouseEvent<HTMLButtonElement>) => {
    const text =
      e.currentTarget.parentElement?.parentElement?.querySelector('pre')
        ?.innerText ?? '';
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div
      style={{
        textAlign: 'left',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${muted ? 'var(--hair)' : 'color-mix(in srgb, var(--primary) 40%, transparent)'}`,
        borderLeft: `3px solid ${muted ? 'var(--fg-faint)' : 'var(--primary)'}`,
        background: 'var(--surface-2)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 12px',
          borderBottom: '1px solid var(--hair-2)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: muted ? 'var(--fg-faint)' : 'var(--primary)',
        }}
      >
        <span>{label}</span>
        <button
          type="button"
          onClick={copy}
          style={{
            font: 'inherit',
            color: 'inherit',
            background: 'none',
            border: '1px solid var(--hair)',
            borderRadius: 6,
            padding: '2px 8px',
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copié' : 'Copier'}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: '12px 16px',
          whiteSpace: 'pre-wrap',
          fontFamily: 'var(--font-mono)',
          fontSize,
          lineHeight: 1.5,
          color: muted ? 'var(--fg-muted)' : 'var(--fg)',
        }}
      >
        {children}
      </pre>
    </div>
  );
}
