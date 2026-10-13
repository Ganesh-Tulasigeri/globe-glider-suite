/**
 * ThreeUIIntro — self-contained chromatic wordmark intro animation.
 *
 * Derived from NeuformIsolatedEffects.tsx (SHA-256 fe9856234253…).
 * The animation runs inside a sandboxed iframe so it never touches the host
 * document's styles or globals, exactly as the ThreeUI library does it.
 *
 * Props:
 *  - text        Override wordmark text  (default: "Globe Glider")
 *  - mode        "dark" | "light"         (default: "dark")
 *  - hue         CSS hue-rotate degrees   (default: 0)
 *  - saturation  0–2                      (default: 1)
 *  - brightness  0.35–1.65               (default: 1)
 *  - className   extra class names
 *  - style       extra inline styles
 */
import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import creatorStudioIntroSource from './sources/creator-studio-intro-source';

export type ThreeUIIntroMode = 'dark' | 'light';

export interface ThreeUIIntroProps {
  text?: string;
  mode?: ThreeUIIntroMode;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Inject the focus-reset + colour-scheme styles and the isolation script into the raw HTML. */
function buildDocument(source: string, mode: ThreeUIIntroMode, text: string): string {
  const bg = mode === 'dark' ? '#000000' : '#f4f7fb';
  const focusStyle = `<style data-threeui-focus>
    html,body{width:100%!important;height:100%!important;margin:0!important;padding:0!important;
      overflow:hidden!important;background:${bg}!important;color-scheme:${mode}!important}
  </style>`;
  // Inject wordmark text override via a script before the main script executes.
  const initScript = `<script>window.__WORDMARK_TEXT=${JSON.stringify(text)};window.__WORDMARK_WIDTH=640;</script>`;
  return source
    .replace('</head>', `${focusStyle}${initScript}</head>`);
}

export default function ThreeUIIntro({
  text = 'Globe Glider',
  mode = 'dark',
  hue = 0,
  saturation = 1,
  brightness = 1,
  className,
  style,
}: ThreeUIIntroProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const safeMode: ThreeUIIntroMode = mode === 'light' ? 'light' : 'dark';
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);

  const cssFilter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  const srcDoc = useMemo(
    () => buildDocument(creatorStudioIntroSource, safeMode, text),
    [safeMode, text],
  );

  /** On mode/text change post a runtime message so the iframe doesn't need to
   *  reload (the iframe only reloads when srcDoc itself changes, which only
   *  happens when mode or text changes — already minimal). */
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const post = () =>
      frame.contentWindow?.postMessage(
        { threeuiRuntime: { text } },
        '*',
      );
    post();
    frame.addEventListener('load', post);
    return () => frame.removeEventListener('load', post);
  }, [text, srcDoc]);

  const bg = safeMode === 'dark' ? '#000000' : '#f4f7fb';

  return (
    <iframe
      ref={frameRef}
      className={className}
      data-mode={safeMode}
      title="ThreeUI chromatic wordmark intro"
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        border: 0,
        background: bg,
        filter: cssFilter,
        ...style,
      }}
    />
  );
}
