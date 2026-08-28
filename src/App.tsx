import { useEffect, useState } from "react";

const LAUNCHPAD = "https://www.ponsfamily.com/launchpad";

const SPRINKLE_COLORS = ["#ff4fa3", "#ff9ac4", "#ffd93d", "#b06bff", "#ff9a4f"];

type Sprinkle = {
  left: number;
  size: number;
  dur: number;
  delay: number;
  color: string;
  shape: "circle" | "rod";
};

/* ─── pure-CSS candy mascot ─── */
function CandyMascot() {
  return (
    <div className="mascot" aria-hidden>
      <div className="mascot-glow" />
      <div className="lolli">
        <div className="lolli-stick" />
        <div className="lolli-head">
          <div className="lolli-swirl" />
          <div className="lolli-shine" />
          <div className="face">
            <div className="eye left">
              <span className="sparkle" />
            </div>
            <div className="eye right">
              <span className="sparkle" />
            </div>
            <div className="blush bl" />
            <div className="blush br" />
            <div className="smile" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── mini candy characters that run/bounce around ─── */
type Critter = {
  type: "lolli" | "gummy" | "wrap" | "donut" | "drop";
  top: number;
  dur: number;
  delay: number;
  scale: number;
  dir: "ltr" | "rtl";
  flip: boolean;
};

function CandyCritter({ type }: { type: Critter["type"] }) {
  if (type === "gummy") {
    return (
      <div className="cr cr-gummy">
        <div className="g-ear l" />
        <div className="g-ear r" />
        <div className="g-body">
          <span className="g-eye l" />
          <span className="g-eye r" />
          <span className="g-mouth" />
          <span className="g-cheek l" />
          <span className="g-cheek r" />
        </div>
        <div className="g-arm l" />
        <div className="g-arm r" />
        <div className="g-leg l" />
        <div className="g-leg r" />
      </div>
    );
  }
  if (type === "wrap") {
    return (
      <div className="cr cr-wrap">
        <span className="w-tail l" />
        <span className="w-tail r" />
        <div className="w-body">
          <span className="w-eye l" />
          <span className="w-eye r" />
          <span className="w-smile" />
        </div>
        <div className="w-leg l" />
        <div className="w-leg r" />
      </div>
    );
  }
  if (type === "donut") {
    return (
      <div className="cr cr-donut">
        <div className="d-body">
          <span className="d-hole" />
          <span className="d-eye l" />
          <span className="d-eye r" />
          <span className="d-smile" />
        </div>
        <div className="d-leg l" />
        <div className="d-leg r" />
      </div>
    );
  }
  if (type === "drop") {
    return (
      <div className="cr cr-drop">
        <div className="dr-body">
          <span className="dr-eye l" />
          <span className="dr-eye r" />
          <span className="dr-smile" />
          <span className="dr-shine" />
        </div>
        <div className="dr-leg l" />
        <div className="dr-leg r" />
      </div>
    );
  }
  // mini lollipop
  return (
    <div className="cr cr-lolli">
      <span className="cl-stick" />
      <div className="cl-head">
        <span className="cl-swirl" />
        <span className="cl-eye l" />
        <span className="cl-eye r" />
        <span className="cl-smile" />
      </div>
      <div className="cl-leg l" />
      <div className="cl-leg r" />
    </div>
  );
}

function CandyPlayground() {
  const [critters, setCritters] = useState<Critter[]>([]);
  const types: Critter["type"][] = ["lolli", "gummy", "wrap", "donut", "drop"];

  useEffect(() => {
    const arr: Critter[] = Array.from({ length: 11 }).map((_, i) => {
      const dir = Math.random() > 0.5 ? "ltr" : "rtl";
      return {
        type: types[i % types.length],
        top: 8 + Math.random() * 82,
        dur: 13 + Math.random() * 16,
        delay: Math.random() * -30,
        scale: 0.55 + Math.random() * 0.65,
        dir,
        flip: dir === "rtl",
      };
    });
    setCritters(arr);
  }, []);

  return (
    <div className="playground" aria-hidden>
      {critters.map((c, i) => (
        <div
          key={i}
          className={`runner ${c.dir}`}
          style={{
            top: `${c.top}%`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <div
            className="hopper"
            style={{
              transform: `scale(${c.scale}) scaleX(${c.flip ? -1 : 1})`,
              animationDelay: `${c.delay / 2}s`,
            }}
          >
            <CandyCritter type={c.type} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [sprinkles, setSprinkles] = useState<Sprinkle[]>([]);

  useEffect(() => {
    const arr: Sprinkle[] = Array.from({ length: 10 }).map(() => ({
      left: Math.random() * 100,
      size: 6 + Math.random() * 10,
      dur: 20 + Math.random() * 18,
      delay: Math.random() * -34,
      color: SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)],
      shape: Math.random() > 0.5 ? "circle" : "rod",
    }));
    setSprinkles(arr);
  }, []);

  return (
    <>
      {/* smooth drifting mesh-gradient background */}
      <div className="mesh" aria-hidden>
        <span className="m1" />
        <span className="m2" />
        <span className="m3" />
        <span className="m4" />
      </div>

      {/* subtle grain for premium finish */}
      <div className="grain" aria-hidden />

      {/* rame! candy characters running & hopping around */}
      <CandyPlayground />

      {/* soft floating sprinkles */}
      <div className="sprinkles" aria-hidden>
        {sprinkles.map((s, i) => (
          <span
            key={i}
            className={`sprinkle ${s.shape}`}
            style={{
              left: `${s.left}%`,
              width: s.shape === "rod" ? s.size * 0.5 : s.size,
              height: s.shape === "rod" ? s.size * 1.4 : s.size,
              background: s.color,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <main className="cs">
        {/* logo mark */}
        <div className="cs-brand">
          <span className="cs-mark" />
          <span className="cs-word">Pons Candy</span>
        </div>

        {/* status pill */}
        <span className="cs-pill">
          <span className="dot" />
          Launching on Pons · coming soon
        </span>

        {/* mascot */}
        <div className="cs-mascot">
          <CandyMascot />
        </div>

        {/* heading */}
        <h1 className="cs-head">
          The candy that pays the
          <br />
          <span className="cs-em">patient</span> hands
          <sup className="cs-fn">[1]</sup>
        </h1>

        {/* footnote */}
        <p className="cs-quote">
          <span className="cs-fnmark">[1]</span> Hold your $PCANDY, grow your sugar streak, and
          the sweetest, most patient hands get the biggest scoop from the Candy Jar.
        </p>

        {/* single quiet CTA */}
        <a className="cs-link" href={LAUNCHPAD} target="_blank" rel="noopener">
          Follow the launch on Pons →
        </a>

        <div className="cs-foot">
          $PCANDY · Robinhood Chain
        </div>
      </main>
    </>
  );
}
