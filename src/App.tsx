import { useEffect, useState } from "react";

const LAUNCHPAD = "https://www.ponsfamily.com/launchpad";

const TIERS = [
  { cls: "fresh", emoji: "🍬", name: "Fresh", days: "0–6 days", mult: "1.0x" },
  { cls: "sweet", emoji: "🍭", name: "Sweet", days: "7–29 days", mult: "1.5x" },
  { cls: "sticky", emoji: "🍫", name: "Sticky", days: "30–89 days", mult: "2.0x" },
  { cls: "rock", emoji: "💎", name: "Rock Candy", days: "90+ days", mult: "3.0x" },
];

const STEPS = [
  {
    emoji: "🛒",
    title: "Grab your candy",
    body: "Buy $PONSCANDY on Pons. The moment you hold, your sugar streak begins ticking.",
  },
  {
    emoji: "📈",
    title: "Grow the streak",
    body: "Every day you hold without selling, your streak climbs and your reward multiplier rises.",
  },
  {
    emoji: "🍯",
    title: "Get paid sweeter",
    body: "Rewards drip into the Candy Jar. The higher your streak, the bigger your scoop.",
  },
  {
    emoji: "🫠",
    title: "Don't let it melt",
    body: "Sell — even a little — and your streak melts back to zero. Patience is the whole game.",
  },
];

const SPRINKLE_COLORS = ["#ff4fa3", "#7cff6b", "#4fc3ff", "#ffd93d", "#b06bff", "#ff9a4f"];

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
  const [day, setDay] = useState(0);

  useEffect(() => {
    const arr: Sprinkle[] = Array.from({ length: 26 }).map(() => ({
      left: Math.random() * 100,
      size: 8 + Math.random() * 16,
      dur: 12 + Math.random() * 16,
      delay: Math.random() * -28,
      color: SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)],
      shape: Math.random() > 0.5 ? "circle" : "rod",
    }));
    setSprinkles(arr);
  }, []);

  useEffect(() => {
    let n = 0;
    const target = 47;
    const id = setInterval(() => {
      n += 1;
      setDay(n);
      if (n >= target) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* animated background blobs */}
      <div className="blobs" aria-hidden>
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>

      {/* floating sprinkles */}
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

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            <span className="brand-candy" />
            Pons Candy
          </div>
          <div className="nav-links">
            <a href="#streak" className="hide-mobile">
              Sugar Streak
            </a>
            <a href="#how" className="hide-mobile">
              How it works
            </a>
            <a href="#tokenomics" className="hide-mobile">
              Tokenomics
            </a>
            <a className="btn btn-primary sm" href={LAUNCHPAD} target="_blank" rel="noopener">
              Buy on Pons 🍬
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero wrap">
          <div className="hero-copy">
            <span className="pill">🍭 Live on Robinhood Chain</span>
            <h1>
              Hold your candy.
              <br />
              <span className="grad">Grow your streak.</span>
            </h1>
            <p className="sub">
              Pons Candy rewards the sweetest hands. The longer you hold without selling, the
              bigger your scoop from the Candy Jar. Sell, and your streak melts away.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href={LAUNCHPAD} target="_blank" rel="noopener">
                Grab $PONSCANDY 🍬
              </a>
              <a className="btn btn-ghost" href="#streak">
                See how streaks work
              </a>
            </div>
            <div className="ticker-chip">
              <span>🎟️</span> $PONSCANDY
            </div>
          </div>
          <div className="hero-visual">
            <CandyMascot />
          </div>
        </section>

        {/* STREAK CARD */}
        <section className="section wrap" id="streak">
          <div className="section-head">
            <div className="kicker">The Sugar Streak</div>
            <h2>Every day you hold, it gets sweeter</h2>
            <p>
              Your streak is the number of days you&apos;ve held without selling. It powers a
              reward multiplier — and it resets the instant you sell.
            </p>
          </div>

          <div className="streak-card">
            <div className="streak-flame">🔥</div>
            <div className="streak-day">Day {day}</div>
            <div className="streak-tier">🍫 Sticky — 2.0x rewards</div>
            <div className="streak-bar">
              <div />
            </div>
            <div className="streak-hint">43 more days to reach 💎 Rock Candy (3.0x)</div>
            <div className="melt-warn">⚠️ Selling now melts your 47-day streak</div>
          </div>
        </section>

        {/* TIERS */}
        <section className="section wrap">
          <div className="section-head">
            <div className="kicker">Sweetness Tiers</div>
            <h2>The longer you last, the harder your candy</h2>
          </div>
          <div className="tiers">
            {TIERS.map((t) => (
              <div className={`tier ${t.cls}`} key={t.name}>
                <div className="emoji">{t.emoji}</div>
                <h3>{t.name}</h3>
                <div className="days">{t.days}</div>
                <div className="mult">{t.mult}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section wrap" id="how">
          <div className="section-head">
            <div className="kicker">How it works</div>
            <h2>Four sweet steps</h2>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className="step" key={s.title}>
                <div className="num">{i + 1}</div>
                <div className="emoji">{s.emoji}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CANDY JAR BAND */}
        <section className="section wrap">
          <div className="jar-band">
            <div className="jar-emoji">🍯</div>
            <h2>The Candy Jar</h2>
            <p>
              The Candy Jar rewards the sweetest, most patient hands. It&apos;s split across
              holders by streak — the longer you hold, the bigger your scoop of sugar.
            </p>
            <div className="jar-stats">
              <div className="jar-stat">
                <div className="big">💎</div>
                <div className="lbl">rewards patient hands</div>
              </div>
              <div className="jar-stat">
                <div className="big">3.0x</div>
                <div className="lbl">max streak multiplier</div>
              </div>
              <div className="jar-stat">
                <div className="big">0</div>
                <div className="lbl">streak after you sell</div>
              </div>
            </div>
          </div>
        </section>

        {/* TOKENOMICS */}
        <section className="section wrap" id="tokenomics">
          <div className="section-head">
            <div className="kicker">Tokenomics</div>
            <h2>Simple &amp; sweet</h2>
            <p>Fixed supply, launched on Pons. Your wallet submits every transaction.</p>
          </div>
          <div className="tok-grid">
            <div className="tok-list">
              <div className="tok-row">
                <span className="k">
                  <span className="swatch" style={{ background: "#ff4fa3" }} />
                  Liquidity &amp; market
                </span>
                <span className="v">70%</span>
              </div>
              <div className="tok-row">
                <span className="k">
                  <span className="swatch" style={{ background: "#b06bff" }} />
                  Candy Jar rewards
                </span>
                <span className="v">20%</span>
              </div>
              <div className="tok-row">
                <span className="k">
                  <span className="swatch" style={{ background: "#4fc3ff" }} />
                  Community &amp; events
                </span>
                <span className="v">10%</span>
              </div>
            </div>
            <div className="donut-wrap">
              <div
                className="donut"
                style={{
                  background:
                    "conic-gradient(#ff4fa3 0 70%, #b06bff 70% 90%, #4fc3ff 90% 100%)",
                }}
              >
                <div className="hole">
                  $PONSCANDY
                  <br />
                  supply
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section wrap">
          <div className="section-head">
            <div className="kicker">Questions</div>
            <h2>Sweet answers</h2>
          </div>
          <div className="faq">
            <details>
              <summary>What is a sugar streak?</summary>
              <p>
                It&apos;s the number of days you&apos;ve held $PONSCANDY without selling. The
                longer your streak, the higher your reward multiplier — up to 3.0x at 90+ days.
              </p>
            </details>
            <details>
              <summary>What happens if I sell?</summary>
              <p>
                Your streak melts back to zero and your multiplier resets to 1.0x. To climb the
                tiers again, you start fresh. Patience is the whole point.
              </p>
            </details>
            <details>
              <summary>Does moving tokens to another wallet reset my streak?</summary>
              <p>
                Yes. Any transfer out of your wallet counts as breaking the streak, so you
                can&apos;t game it by hopping wallets. Hold steady and stay sweet.
              </p>
            </details>
            <details>
              <summary>How does the Candy Jar reward holders?</summary>
              <p>
                The Candy Jar is distributed to holders weighted by their streak tier. The more
                patient the hand, the bigger the scoop of sugar.
              </p>
            </details>
            <details>
              <summary>How do I buy?</summary>
              <p>
                Connect your wallet on Pons (Robinhood Chain), find $PONSCANDY, and buy. Your
                wallet submits every transaction — Pons does not custody your assets.
              </p>
            </details>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final wrap">
          <div className="final-card">
            <div className="final-candy" />
            <h2>Stay sweet. 🍬</h2>
            <p>Grab your candy, grow your streak, and let the sweetest hands get paid.</p>
            <a className="btn btn-primary" href={LAUNCHPAD} target="_blank" rel="noopener">
              Buy $PONSCANDY on Pons →
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="brand">
            <span className="brand-candy" />
            Pons Candy
          </div>
          <div>$PONSCANDY · Launched on Pons · Robinhood Chain</div>
          <p className="disclaimer">
            Pons Candy is a community meme token. Nothing here is financial advice. Transactions
            are submitted through your own wallet and may be irreversible. Tokens can be volatile
            or lose all value. Hold responsibly.
          </p>
        </div>
      </footer>
    </>
  );
}
