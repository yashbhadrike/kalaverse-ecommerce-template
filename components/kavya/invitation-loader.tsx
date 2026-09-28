// @ts-nocheck

"use client"

/**
 * WeddingInvitationLoader
 * ---------------------------------------------------------------------------
 * A ~3 second cinematic intro: closed envelope -> flap opens -> invitation
 * slides up -> soft gold glow -> your existing homepage is revealed.
 *
 * Needs: react, framer-motion, tailwindcss
 *   npm i framer-motion            (or change the import to "motion/react")
 *
 * USAGE (put it next to your homepage, don't wrap or change the homepage):
 *
 *   <>
 *     <WeddingInvitationLoader isReady={siteLoaded} />
 *     <HomePage />
 *   </>
 *
 * Optional: make the hero rise gently when the intro ends. Add to your CSS:
 *
 *   [data-intro="playing"] .hero-reveal { opacity: 0; transform: translateY(14px); }
 *   [data-intro="done"]    .hero-reveal { opacity: 1; transform: none;
 *                                         transition: opacity .7s ease, transform .7s ease; }
 *
 * Props
 *   isReady           boolean   Your "site has loaded" flag (optional).
 *   endEarlyWhenReady boolean   If true, jumps to the homepage the moment
 *                               isReady becomes true (default false, so the
 *                               short intro is always seen in full).
 *   repeatVisit       "skip" | "short" | "full"   What to do on repeat visits
 *                               (default "skip"; "short" = quick fade only).
 *   onReveal          () => void   Fires when the homepage starts to show.
 *   onComplete        () => void   Fires when the loader is removed.
 *   storageKey        string    localStorage key used to remember a visit.
 *   fontFamily        string    Serif used on the card. Match your site.
 *
 * The animation NEVER waits for the network. It has a hard cap of ~3 s.
 * Users with prefers-reduced-motion get a short fade, no 3D envelope.
 */
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

/* ----------------------------- palette ---------------------------------- */
const IVORY = "#F6EFE0";
const GOLD = "#D4AF5F";
const GOLD_LIGHT = "#F0D48A";
const DEFAULT_FONT =
  "'Playfair Display','Cormorant Garamond','Noto Serif Devanagari',Georgia,serif";

/* ----------------------------- timeline --------------------------------- */
const D = 3; // total seconds of the full intro
const seq = (times, ease = "easeInOut", total = D) => ({
  duration: total,
  times: times.map((t) => t / total),
  ease,
});

const GLOW = (blur, a) =>
  `drop-shadow(0px 0px ${blur}px rgba(240, 200, 110, ${a}))`;

const V = {
  root: {
    hidden: { opacity: 1 },
    play: {
      opacity: [1, 1, 0],
      transition: { duration: D, times: [0, 2.4 / D, 1], ease: "easeInOut" },
    },
    exit: { opacity: 0, transition: { duration: 0.38, ease: "easeOut" } },
  },
  // 0.0 - 0.5  fade/scale/rise in   |   2.2 - 2.95 gentle scale up + fade out
  stage: {
    hidden: { opacity: 0, scale: 0.96, y: 14 },
    play: {
      opacity: [0, 1, 1, 0, 0],
      scale: [0.96, 1, 1, 1.14, 1.14],
      y: [14, 0, 0],
      transition: {
        opacity: seq([0, 0.5, 2.5, 2.95, 3]),
        scale: seq([0, 0.5, 2.2, 2.95, 3]),
        y: seq([0, 0.5, 3], "easeOut"),
      },
    },
  },
  // 0.5 - 1.8  flap opens. z-index swaps at 90deg (t = 1.15s) so the flap
  // ends up BEHIND the card once it has folded over the top.
  flap: {
    hidden: { rotateX: 0, zIndex: 4 },
    play: {
      rotateX: [0, 0, -180, -180],
      zIndex: [4, 4, 1, 1],
      transition: {
        rotateX: seq([0, 0.5, 1.8, 3]),
        zIndex: seq([0, 1.13, 1.17, 3], "linear"),
      },
    },
  },
  // 0.9 - 1.9 card slides up out of the envelope, then picks up a gold rim
  card: {
    hidden: { y: "0%", filter: GLOW(0, 0) },
    play: {
      y: ["0%", "0%", "-50%", "-50%"],
      filter: [GLOW(0, 0), GLOW(0, 0), GLOW(12, 0.8), GLOW(22, 0.9), GLOW(22, 0.9)],
      transition: {
        y: seq([0, 0.9, 1.9, 3], "easeOut"),
        filter: seq([0, 1.8, 2.2, 2.7, 3]),
      },
    },
  },
  // 1.8 - 2.7 soft radial glow that blooms outward
  glow: {
    hidden: { opacity: 0, scale: 0.6 },
    play: {
      opacity: [0, 0, 0.55, 0.9, 0],
      scale: [0.6, 0.6, 1, 2.6, 3],
      transition: {
        opacity: seq([0, 1.8, 2.2, 2.65, 3]),
        scale: seq([0, 1.8, 2.2, 2.7, 3], "easeOut"),
      },
    },
  },
  // 2.2 - 2.7 screen briefly brightens
  flash: {
    hidden: { opacity: 0 },
    play: { opacity: [0, 0, 0.6, 0], transition: seq([0, 2.2, 2.55, 3]) },
  },
  skip: {
    hidden: { opacity: 0 },
    play: { opacity: 0.75, transition: { delay: 0.6, duration: 0.5 } },
  },
  dust: {
    hidden: { opacity: 0, y: 0 },
    play: (i) => ({
      opacity: [0, 0.9, 0],
      y: [0, -22],
      transition: {
        opacity: { duration: 0.9, times: [0, 0.35, 1], delay: 1.8 + (i % 8) * 0.05 },
        y: { duration: 0.9, ease: "easeOut", delay: 1.8 + (i % 8) * 0.05 },
      },
    }),
  },
};

const VR = {
  root: {
    hidden: { opacity: 1 },
    play: {
      opacity: [1, 1, 0],
      transition: { duration: 1.1, times: [0, 0.7 / 1.1, 1], ease: "easeInOut" },
    },
    exit: V.root.exit,
  },
  card: {
    hidden: { opacity: 0 },
    play: { opacity: 1, transition: { duration: 0.35 } },
  },
};

// deterministic gold dust (no Math.random -> no hydration mismatch)
const DUST = Array.from({ length: 16 }, (_, i) => ({
  x: 10 + ((i * 47) % 80),
  y: -32 + ((i * 29) % 92),
  s: 2 + (i % 3),
}));

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ============================== ARTWORK ================================= */

/** Shared gradients / filters / ornaments. Rendered once, referenced by id. */
function Defs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="kv-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD_LIGHT} />
          <stop offset=".5" stopColor="#C9A24D" />
          <stop offset="1" stopColor="#A27A2C" />
        </linearGradient>
        <linearGradient id="kv-burg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7E1B2A" />
          <stop offset="1" stopColor="#4F0F1A" />
        </linearGradient>
        <linearGradient id="kv-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6A1523" />
          <stop offset="1" stopColor="#480C15" />
        </linearGradient>
        <linearGradient id="kv-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C4AF84" />
          <stop offset="1" stopColor="#DCCBA6" />
        </linearGradient>
        <linearGradient id="kv-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(60,30,10,.30)" />
          <stop offset=".45" stopColor="rgba(60,30,10,0)" />
        </linearGradient>
        <linearGradient id="kv-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#EFE4CB" />
          <stop offset="1" stopColor="#F5ECD8" />
        </linearGradient>
        <linearGradient id="kv-side-r" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#EADEC3" />
          <stop offset="1" stopColor="#F3E9D3" />
        </linearGradient>
        <linearGradient id="kv-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8F1E0" />
          <stop offset="1" stopColor="#EADFC4" />
        </linearGradient>
        <linearGradient id="kv-flap-out" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FAF3E2" />
          <stop offset="1" stopColor="#EBDFC4" />
        </linearGradient>
        <linearGradient id="kv-flap-in" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#E3D4B0" />
          <stop offset="1" stopColor="#C9B58A" />
        </linearGradient>
        <radialGradient id="kv-seal" cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#9A2A3A" />
          <stop offset="1" stopColor="#55111C" />
        </radialGradient>

        {/* paper grain */}
        <filter id="kv-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 .40  0 0 0 0 .28  0 0 0 0 .14  0 0 0 .8 -.25" />
        </filter>

        <clipPath id="kv-pocket">
          <polygon points="0,0 170,130 0,240" />
          <polygon points="340,0 170,130 340,240" />
          <polygon points="0,240 170,130 340,240" />
        </clipPath>
        <clipPath id="kv-flapclip">
          <polygon points="0,0 340,0 170,130" />
        </clipPath>

        {/* reusable ornaments */}
        <g id="kv-mandala" fill="none" stroke={GOLD} strokeWidth="1">
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={`a${i}`} cx="0" cy="-13" rx="4.5" ry="12" transform={`rotate(${i * 45})`} />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={`b${i}`} cx="0" cy="-25" rx="2.4" ry="6" transform={`rotate(${i * 45 + 22.5})`} />
          ))}
          <circle r="31" strokeWidth=".6" strokeDasharray="1.5 2.5" />
          <circle r="4" fill={GOLD} stroke="none" />
        </g>
        <g id="kv-corner" fill="none" stroke={GOLD} strokeWidth=".9" strokeLinecap="round">
          <path d="M0 22 V6 Q0 0 6 0 H22" />
          <path d="M5 16 Q5 5 16 5" />
          <circle cx="9" cy="9" r="1.6" fill={GOLD} stroke="none" />
        </g>
      </defs>
    </svg>
  );
}

const Corner = ({ x, y, sx = 1, sy = 1, s = 1 }) => (
  <use href="#kv-corner" transform={`translate(${x} ${y}) scale(${sx * s} ${sy * s})`} />
);

function Grain({ clip }) {
  return (
    <rect
      width="340"
      height="240"
      filter="url(#kv-grain)"
      opacity=".22"
      clipPath={clip}
      style={{ mixBlendMode: "multiply" }}
    />
  );
}

/** The burgundy & gold invitation card (portrait 240 x 300). */
function InvitationCardArt({ fontFamily }) {
  const ARCH =
    "M38 256 V122 Q38 96 64 82 Q102 62 120 28 Q138 62 176 82 Q202 96 202 122 V256 Z";
  return (
    <svg viewBox="0 0 240 300" className="block h-full w-full" aria-hidden="true">
      <rect width="240" height="300" rx="3" fill="url(#kv-burg)" />
      <rect x="8" y="8" width="224" height="284" rx="1.5" fill="none" stroke={GOLD} strokeWidth="1.2" />
      <rect x="13" y="13" width="214" height="274" fill="none" stroke={GOLD} strokeWidth=".5" opacity=".7" />
      <Corner x={15} y={15} />
      <Corner x={225} y={15} sx={-1} />
      <Corner x={15} y={285} sy={-1} />
      <Corner x={225} y={285} sx={-1} sy={-1} />

      <path d={ARCH} fill="url(#kv-arch)" stroke={GOLD} strokeWidth="1" />
      <path
        d={ARCH}
        fill="none"
        stroke={GOLD}
        strokeWidth=".5"
        opacity=".7"
        transform="translate(120 150) scale(.93) translate(-120 -150)"
      />
      <use href="#kv-mandala" x="120" y="128" />

      <text
        x="120"
        y="192"
        textAnchor="middle"
        fontSize="27"
        fontStyle="italic"
        fill="url(#kv-gold)"
        style={{ fontFamily }}
      >
        You’re Invited
      </text>
      <path d="M84 212 H112 M128 212 H156" stroke={GOLD} strokeWidth=".8" />
      <path d="M120 208 L124 212 L120 216 L116 212 Z" fill={GOLD} />
      <text
        x="120"
        y="280"
        textAnchor="middle"
        fontSize="8.5"
        fill={GOLD}
        opacity=".9"
        style={{ fontFamily }}
      >
        ॥ श्री गणेशाय नमः ॥
      </text>
    </svg>
  );
}

function EnvelopeBack() {
  return (
    <div
      className="absolute inset-0 z-0 rounded-[3px]"
      style={{
        boxShadow:
          "0 22px 40px -18px rgba(74,30,14,.5), 0 2px 6px rgba(74,30,14,.18)",
      }}
    >
      <svg viewBox="0 0 340 240" className="block h-full w-full rounded-[3px]" aria-hidden="true">
        <rect width="340" height="240" rx="3" fill="url(#kv-back)" />
        <rect width="340" height="240" rx="3" fill="url(#kv-shade)" />
      </svg>
    </div>
  );
}

function EnvelopePocket() {
  return (
    <svg
      viewBox="0 0 340 240"
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      aria-hidden="true"
    >
      <polygon points="0,0 170,130 0,240" fill="url(#kv-side)" />
      <polygon points="340,0 170,130 340,240" fill="url(#kv-side-r)" />
      <polygon points="0,240 170,130 340,240" fill="url(#kv-bottom)" />
      <g clipPath="url(#kv-pocket)">
        <Grain />
        <path d="M9 9 V231 H331 V9" fill="none" stroke={GOLD} strokeWidth=".8" opacity=".75" />
        <Corner x={11} y={11} s={0.8} />
        <Corner x={329} y={11} sx={-1} s={0.8} />
        <Corner x={11} y={229} sy={-1} s={0.8} />
        <Corner x={329} y={229} sx={-1} sy={-1} s={0.8} />
      </g>
      <g fill="none" stroke="rgba(120,85,40,.32)" strokeWidth=".8">
        <polyline points="0,0 170,130" />
        <polyline points="340,0 170,130" />
        <polyline points="0,240 170,130 340,240" />
      </g>
    </svg>
  );
}

function FlapOuter() {
  return (
    <svg viewBox="0 0 340 130" className="block h-full w-full" aria-hidden="true">
      <polygon points="0,0 340,0 170,130" fill="url(#kv-flap-out)" />
      <g clipPath="url(#kv-flapclip)">
        <rect width="340" height="130" filter="url(#kv-grain)" opacity=".22" style={{ mixBlendMode: "multiply" }} />
      </g>
      <polygon points="13.6,3.5 326.4,3.5 170,123" fill="none" stroke={GOLD} strokeWidth=".8" opacity=".8" />
      <polygon points="0,0 340,0 170,130" fill="none" stroke="rgba(120,85,40,.35)" strokeWidth=".8" />
      {/* wax seal */}
      <ellipse cx="170" cy="110.5" rx="16" ry="15" fill="rgba(60,20,10,.25)" />
      <circle cx="170" cy="108" r="16" fill="url(#kv-seal)" />
      <circle cx="170" cy="108" r="12.5" fill="none" stroke={GOLD} strokeWidth=".7" opacity=".85" />
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="170"
          cy="101.5"
          rx="2.3"
          ry="5.2"
          fill={GOLD_LIGHT}
          opacity=".9"
          transform={`rotate(${i * 45} 170 108)`}
        />
      ))}
      <circle cx="170" cy="108" r="2.2" fill="#55111C" />
    </svg>
  );
}

function FlapInner() {
  // drawn upside-down on purpose: the face is flipped twice (rotateX 180 on the
  // face + the flap's own -180) so it ends up upright.
  return (
    <svg viewBox="0 0 340 130" className="block h-full w-full" aria-hidden="true">
      <polygon points="0,130 340,130 170,0" fill="url(#kv-flap-in)" />
      <polygon points="13.6,126.5 326.4,126.5 170,7" fill="none" stroke={GOLD} strokeWidth=".8" opacity=".6" />
      <polygon points="0,130 340,130 170,0" fill="none" stroke="rgba(120,85,40,.35)" strokeWidth=".8" />
    </svg>
  );
}

/* ============================== COMPONENT =============================== */

export default function WeddingInvitationLoader({
  isReady = true,
  endEarlyWhenReady = false,
  repeatVisit = "skip",
  onReveal = undefined,
  onComplete = undefined,
  storageKey = "kv-invite-intro-seen",
  fontFamily = DEFAULT_FONT,
}) {
  const [mode, setMode] = useState("pending"); // pending | full | reduced | skip
  const [phase, setPhase] = useState("play"); // play | exit
  const [done, setDone] = useState(false);

  const revealed = useRef(false);
  const skipped = useRef(false);
  const timers = useRef([]);
  const onRevealRef = useRef(onReveal);
  const onCompleteRef = useRef(onComplete);
  onRevealRef.current = onReveal;
  onCompleteRef.current = onComplete;

  const reveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;
    document.documentElement.dataset.intro = "done";
    onRevealRef.current?.();
  }, []);

  const finish = useCallback(() => {
    reveal();
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* private mode etc. */
    }
    setDone(true);
    onCompleteRef.current?.();
  }, [reveal, storageKey]);

  const skip = useCallback(() => {
    if (skipped.current) return;
    skipped.current = true;
    timers.current.forEach(clearTimeout);
    setPhase("exit");
    reveal();
    timers.current = [setTimeout(finish, 380)];
  }, [reveal, finish]);

  // decide how to play (before first paint, so repeat visitors never flash it)
  useIsoLayoutEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(storageKey) === "1";
    } catch {
      /* ignore */
    }
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    if (seen && repeatVisit === "skip") {
      setMode("skip");
      finish();
      return;
    }
    document.documentElement.dataset.intro = "playing";
    setMode(reduced || (seen && repeatVisit === "short") ? "reduced" : "full");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // hard-capped schedule + scroll lock + Esc to skip
  useEffect(() => {
    if (done || (mode !== "full" && mode !== "reduced")) return;
    const [revealAt, finishAt] = mode === "full" ? [2700, 3050] : [800, 1150];
    const t1 = setTimeout(reveal, revealAt);
    const t2 = setTimeout(finish, finishAt);
    timers.current = [t1, t2];

    const onKey = (e) => e.key === "Escape" && skip();
    window.addEventListener("keydown", onKey);

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
    };
  }, [mode, done, reveal, finish, skip]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // optional: leave as soon as the site reports it is ready
  useEffect(() => {
    if (endEarlyWhenReady && isReady && mode === "full") skip();
  }, [endEarlyWhenReady, isReady, mode, skip]);

  if (done || mode === "skip") return null;

  // one frame of plain ivory while we decide (avoids a flash of homepage)
  if (mode === "pending") {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[9999]"
        style={{ background: IVORY }}
      />
    );
  }

  const reduced = mode === "reduced";
  const rootV = reduced ? VR.root : V.root;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Opening your wedding invitation"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 42%, #FBF6EA 0%, ${IVORY} 60%, #F0E6D2 100%)`,
      }}
      variants={rootV}
      initial="hidden"
      animate={phase}
    >
      <Defs />
      <span className="sr-only" role="status">
        Opening your invitation
      </span>

      {reduced ? (
        /* ---- reduced motion: simple fade, no 3D envelope ---- */
        <motion.div
          variants={VR.card}
          className="w-[min(44vw,190px)] aspect-[240/300]"
          style={{ boxShadow: "0 14px 34px -12px rgba(74,14,23,.55)" }}
        >
          <InvitationCardArt fontFamily={fontFamily} />
        </motion.div>
      ) : (
        /* ---- full cinematic sequence ---- */
        <div className="relative mt-10 aspect-[340/240] w-[min(72vw,360px,64vh)]">
          {/* gold glow + dust: siblings of the stage so they outlive its fade */}
          <div className="pointer-events-none absolute left-1/2 top-[12%] h-0 w-0">
            <motion.div
              variants={V.glow}
              className="absolute rounded-full will-change-transform"
              style={{
                "--g": "min(110vw, 620px)",
                width: "var(--g)",
                height: "var(--g)",
                marginLeft: "calc(var(--g) / -2)",
                marginTop: "calc(var(--g) / -2)",
                background:
                  "radial-gradient(closest-side, rgba(255,226,150,.85), rgba(233,190,100,.35) 45%, rgba(233,190,100,0) 100%)",
              }}
            />
          </div>
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {DUST.map((p, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={V.dust}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.s,
                  height: p.s,
                  background: GOLD_LIGHT,
                  boxShadow: "0 0 6px 1px rgba(240,200,110,.8)",
                }}
              />
            ))}
          </div>

          {/* the envelope + invitation */}
          <motion.div variants={V.stage} className="absolute inset-0 will-change-transform">
            {/* soft ground shadow */}
            <div
              className="absolute -bottom-[9%] left-[6%] right-[6%] h-[14%]"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(74,14,23,.32), rgba(74,14,23,0) 70%)",
              }}
            />

            <div
              className="relative isolate h-full w-full"
              style={{ perspective: 1100 }}
            >
              <EnvelopeBack />

              {/* flap (rotates from the top fold) */}
              <motion.div
                variants={V.flap}
                className="absolute left-0 top-0 h-[54.1667%] w-full"
                style={{ transformOrigin: "50% 0%", transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <FlapOuter />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateX(180deg)",
                  }}
                >
                  <FlapInner />
                </div>
              </motion.div>

              {/* invitation card, clipped at the envelope's bottom edge */}
              <div
                className="absolute inset-0 z-[2]"
                style={{ clipPath: "inset(-100% -20% 0 -20%)" }}
              >
                <motion.div
                  variants={V.card}
                  className="absolute left-[14.7%] top-[12.5%] w-[70.6%] aspect-[240/300] will-change-transform"
                  style={{ boxShadow: "0 6px 18px rgba(60,20,10,.35)" }}
                >
                  <InvitationCardArt fontFamily={fontFamily} />
                </motion.div>
              </div>

              <EnvelopePocket />
            </div>
          </motion.div>
        </div>
      )}

      {/* brightening flash used as the visual transition */}
      {!reduced && (
        <motion.div
          variants={V.flash}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(255,238,196,.95), rgba(255,238,196,0) 65%)",
          }}
        />
      )}

      <motion.button
        type="button"
        variants={reduced ? { hidden: { opacity: 0 }, play: { opacity: 0.75, transition: { duration: 0.3 } } } : V.skip}
        onClick={skip}
        className="absolute rounded px-2 py-1 text-[11px] tracking-[0.08em] text-[#6B1522] transition-colors hover:text-[#4A0E17] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8893A]"
        style={{
          right: "max(1rem, env(safe-area-inset-right))",
          bottom: "max(1rem, env(safe-area-inset-bottom))",
          fontFamily,
        }}
      >
        Skip intro →
      </motion.button>
    </motion.div>
  );
}
