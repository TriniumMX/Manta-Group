// MARCADOR DE POSICIÓN: una trufa que se abre y suelta fragmentos y cacao.
// Se sustituye por la secuencia real de frames (ver ScrollSequence `frames`).

const ease = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Aleatoriedad determinista para que cada cuadro sea idéntico entre repeticiones.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const R = rng(7);
const SHARDS = Array.from({ length: 46 }, () => ({
  angle: R() * Math.PI * 2,
  dist: 0.25 + R() * 0.55,
  size: 0.018 + R() * 0.05,
  spin: (R() - 0.5) * 6,
  depth: 0.4 + R() * 0.6,
  light: R(),
}));
const DUST = Array.from({ length: 90 }, () => ({
  angle: R() * Math.PI * 2,
  dist: 0.1 + R() * 0.9,
  size: 0.002 + R() * 0.006,
  delay: R() * 0.3,
}));

export function drawTruffle(ctx: CanvasRenderingContext2D, w: number, h: number, p: number) {
  const cx = w / 2;
  const cy = h / 2;
  const u = Math.min(w, h); // unidad de escala
  const open = ease(clamp((p - 0.15) / 0.6));

  // Fondo
  const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.75);
  bg.addColorStop(0, "#3A2A22");
  bg.addColorStop(1, "#14100E");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Resplandor cálido que crece al abrirse
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, u * (0.25 + open * 0.55));
  glow.addColorStop(0, `rgba(196,133,58,${0.1 + open * 0.38})`);
  glow.addColorStop(1, "rgba(196,133,58,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Polvo de cacao
  for (const d of DUST) {
    const t = ease(clamp((p - 0.2 - d.delay * 0.4) / 0.6));
    const r = d.dist * u * 0.7 * t;
    ctx.fillStyle = `rgba(214,170,110,${0.55 * (1 - t * 0.6) * t})`;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(d.angle) * r, cy + Math.sin(d.angle) * r, d.size * u, 0, Math.PI * 2);
    ctx.fill();
  }

  // Trufa central: dos mitades que se separan
  const body = u * 0.2 * (1 - open * 0.15);
  const split = open * u * 0.16;
  const tilt = open * 0.35;
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.translate(cx + side * split, cy - open * u * 0.02);
    ctx.rotate(side * tilt);
    ctx.beginPath();
    ctx.arc(
      0,
      0,
      body,
      side === -1 ? Math.PI / 2 : -Math.PI / 2,
      side === -1 ? -Math.PI / 2 : Math.PI / 2,
    );
    ctx.closePath();
    const g = ctx.createRadialGradient(-side * body * 0.3, -body * 0.35, body * 0.1, 0, 0, body);
    g.addColorStop(0, "#7A4A36");
    g.addColorStop(0.55, "#4A2E25");
    g.addColorStop(1, "#1E1310");
    ctx.fillStyle = g;
    ctx.fill();
    // Corte interior (ganache)
    ctx.beginPath();
    ctx.ellipse(0, 0, body * 0.12 + open * body * 0.1, body, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(196,133,58,${open * 0.55})`;
    ctx.fill();
    ctx.restore();
  }

  // Fragmentos de chocolate
  for (const s of SHARDS) {
    const t = ease(clamp((p - 0.18) / 0.65)) * s.depth;
    const r = s.dist * u * t;
    const x = cx + Math.cos(s.angle) * r;
    const y = cy + Math.sin(s.angle) * r - t * u * 0.04;
    const size = s.size * u * (0.6 + s.depth * 0.8);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(s.spin * t);
    ctx.globalAlpha = 0.25 + 0.75 * clamp(t * 3);
    const shade = Math.round(40 + s.light * 60);
    ctx.fillStyle = `rgb(${shade + 40},${shade},${shade - 8})`;
    ctx.beginPath();
    ctx.moveTo(-size, -size * 0.6);
    ctx.lineTo(size, -size * 0.3);
    ctx.lineTo(size * 0.5, size);
    ctx.lineTo(-size * 0.7, size * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
