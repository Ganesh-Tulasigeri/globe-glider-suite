import { useEffect, useRef } from 'react';

// ── Styles ──────────────────────────────────────────────
// Auto‑injected on first import. Idempotent and SSR‑safe.
const __TRANSITION_STYLES = `
:root {
  --reel-dur: 1400ms;
  --reel-cell: 30px;
  --reel-spin-blur: 3px;
  --reel-stagger: 90ms;
  --reel-ease: cubic-bezier(0.16, 1, 0.3, 1);
}

.t-reel { display: inline-flex; align-items: center; height: var(--reel-cell); font-variant-numeric: tabular-nums; }
.t-reel-col {
  position: relative; height: var(--reel-cell); overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%);
}
.t-reel-strip { display: flex; flex-direction: column; will-change: transform, filter; }
.t-reel-digit { height: var(--reel-cell); display: flex; align-items: center; justify-content: center; }

@media (prefers-reduced-motion: reduce) {
  .t-reel-strip { transition: none !important; filter: none !important; }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('transitions-p26')) {
  const __style = document.createElement('style');
  __style.id = 'transitions-p26';
  __style.textContent = __TRANSITION_STYLES;
  document.head.appendChild(__style);
}

const SPINS = 3;
const CELL = 30;
const DUR = 1400;
const STAGGER = 90;
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/**
 * Counter – animated number display.
 * @param target Numeric value to display.
 * @param className Optional class names for the outer container.
 */
export default function Counter({ target = 0, className = '' }: { target?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function build(str: string) {
    if (!ref.current) return [];
    ref.current.innerHTML = '';
    const strips: { strip: HTMLElement; digit: number }[] = [];
    for (const ch of str) {
      if (ch < '0' || ch > '9') {
        const sep = document.createElement('span');
        sep.className = 't-reel-sep';
        sep.textContent = ch;
        ref.current.appendChild(sep);
        continue;
      }
      const col = document.createElement('span');
      col.className = 't-reel-col';
      const strip = document.createElement('span');
      strip.className = 't-reel-strip';
      for (let k = 0; k < (SPINS + 1) * 10 + 1; k++) {
        const cell = document.createElement('span');
        cell.className = 't-reel-digit';
        cell.textContent = String(k % 10);
        strip.appendChild(cell);
      }
      col.appendChild(strip);
      ref.current.appendChild(col);
      strips.push({ strip, digit: +ch });
    }
    return strips;
  }

  function spin() {
    const formatted = Math.round(target).toLocaleString('en-US');
    const strips = build(formatted);
    strips.forEach(({ strip }) => {
      strip.style.transition = 'none';
      strip.style.transform = 'translateY(0)';
    });
    // Force reflow
    void ref.current?.offsetWidth;
    strips.forEach(({ strip, digit }, i) => {
      strip.style.transition = `transform ${DUR}ms ${EASE} ${i * STAGGER}ms`;
      strip.style.transform = `translateY(-${(SPINS * 10 + digit) * CELL}px)`;
    });
  }

  useEffect(() => {
    // Initialise at zero
    build('0').forEach(({ strip, digit }) => {
      strip.style.transform = `translateY(-${digit * CELL}px)`;
    });
    const id = requestAnimationFrame(() => spin());
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className={`t-reel ${className}`} aria-label={String(target)} />;
}
