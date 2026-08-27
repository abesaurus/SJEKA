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
          <span className="cs-fnmark">[1]</span> Hold your $PONSCANDY, grow your sugar streak, and
          the sweetest, most patient hands get the biggest scoop from the Candy Jar.
        </p>

        {/* single quiet CTA */}
        <a className="cs-link" href={LAUNCHPAD} target="_blank" rel="noopener">
          Follow the launch on Pons →
        </a>

        <div className="cs-foot">
          $PONSCANDY · Robinhood Chain · a community meme token
        </div>
      </main>
    </>
  );
}
