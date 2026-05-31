// ---------- reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- topbar shrink on scroll ----------
const bar = document.querySelector('.topbar');
addEventListener('scroll', () => {
  bar.style.padding = scrollY > 40 ? '9px 28px' : '14px 28px';
});

// ---------- spooky scroll effects ----------
const spookyLayer = document.createElement('div');
spookyLayer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
document.body.appendChild(spookyLayer);

function rand(a, b) { return Math.random() * (b - a) + a; }

function makeBat(fromLeft) {
  const b = document.createElement('div');
  const startY = rand(10, 80);
  const dir = fromLeft ? 1 : -1;
  const travelVw = rand(110, 140);
  const wobbleY = rand(-10, 10);
  const dur = rand(2.8, 4.2);
  const seed = Math.floor(rand(1, 999));

  b.style.cssText = `
    position:absolute;
    width:38px;height:24px;
    top:${startY}vh;
    left:${fromLeft ? '-5%' : '105%'};
    opacity:0;
    filter:drop-shadow(0 0 3px rgba(0,0,0,.7));
    animation:ppBatFly${seed} ${dur}s ease-in-out forwards;
  `;

  const x1 = dir * travelVw * 0.45;
  const x2 = dir * travelVw * 1.05;
  const scx = fromLeft ? 1 : -1;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ppBatFly${seed} {
      0%   { opacity:0; transform:translate(0,0) scaleX(${scx}); }
      6%   { opacity:1; }
      48%  { transform:translate(${x1}vw,${wobbleY}vh) scaleX(${scx}); }
      94%  { opacity:.9; }
      100% { opacity:0; transform:translate(${x2}vw,${wobbleY * 1.4}vh) scaleX(${scx}); }
    }
    @keyframes ppWing${seed} {
      0%,100% { transform:scaleY(1) translateY(0); }
      50%     { transform:scaleY(0.38) translateY(1px); }
    }
  `;
  document.head.appendChild(style);

  b.innerHTML = `<svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
    <g style="transform-origin:19px 11px;animation:ppWing${seed} 0.17s ease-in-out infinite;">
      <path d="M19,12 C15,3 5,1 0,5 C5,7 10,9 14,12 C10,14 5,15 0,19 C5,23 15,21 19,12Z" fill="#1e1208"/>
      <path d="M19,12 C23,3 33,1 38,5 C33,7 28,9 24,12 C28,14 33,15 38,19 C33,23 23,21 19,12Z" fill="#1e1208"/>
    </g>
    <ellipse cx="19" cy="11" rx="3.2" ry="3.6" fill="#150d06"/>
    <ellipse cx="17.4" cy="10" rx="1.1" ry="1.3" fill="#3a2010"/>
    <ellipse cx="20.6" cy="10" rx="1.1" ry="1.3" fill="#3a2010"/>
    <path d="M17,13 Q19,14.5 21,13" stroke="#3a2010" stroke-width="0.7" fill="none" stroke-linecap="round"/>
    <path d="M16,8 L14,6 M22,8 L24,6" stroke="#1e1208" stroke-width="0.9" stroke-linecap="round"/>
  </svg>`;

  spookyLayer.appendChild(b);
  setTimeout(() => { b.remove(); style.remove(); }, dur * 1000 + 300);
}

function makeGhost() {
  const g = document.createElement('div');
  const sx = rand(15, 72);
  const sy = rand(20, 65);
  const driftX = rand(-80, 80);
  const driftY = rand(-120, -50);
  const dur = rand(5.5, 8.5);
  const seed = Math.floor(rand(1, 999));
  const hue = rand(195, 225);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ppGhost${seed} {
      0%   { opacity:0; transform:translateY(20px) translateX(0px); }
      10%  { opacity:1; }
      50%  { transform:translateY(${driftY * 0.5}px) translateX(${driftX * 0.5}px); opacity:.85; }
      90%  { opacity:.5; }
      100% { opacity:0; transform:translateY(${driftY}px) translateX(${driftX}px); }
    }
    @keyframes ppGhostWaver${seed} {
      0%,100% { filter:blur(0.6px) brightness(1); }
      50%     { filter:blur(2px) brightness(1.08); }
    }
  `;
  document.head.appendChild(style);

  g.style.cssText = `
    position:absolute;
    width:64px;height:96px;
    left:${sx}%;top:${sy}vh;
    opacity:0;
    animation:ppGhost${seed} ${dur}s ease-in-out forwards, ppGhostWaver${seed} ${rand(1.8,2.8)}s ease-in-out infinite;
  `;

  g.innerHTML = `<svg viewBox="0 0 64 96" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
    <defs>
      <radialGradient id="gh${seed}" cx="50%" cy="35%" r="55%">
        <stop offset="0%"   stop-color="hsla(${hue},65%,88%,0.72)"/>
        <stop offset="55%"  stop-color="hsla(${hue},50%,78%,0.52)"/>
        <stop offset="100%" stop-color="hsla(${hue},40%,68%,0)"/>
      </radialGradient>
      <radialGradient id="gb${seed}" cx="50%" cy="25%" r="65%">
        <stop offset="0%"   stop-color="hsla(${hue},58%,84%,0.58)"/>
        <stop offset="65%"  stop-color="hsla(${hue},44%,74%,0.36)"/>
        <stop offset="100%" stop-color="hsla(${hue},38%,65%,0)"/>
      </radialGradient>
      <filter id="gf${seed}" x="-30%" y="-30%" width="160%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.032" numOctaves="3" seed="${Math.floor(rand(1,99))}"/>
        <feDisplacementMap in="SourceGraphic" scale="8" xChannelSelector="R" yChannelSelector="G"/>
        <feGaussianBlur stdDeviation="1.6"/>
      </filter>
    </defs>
    <g filter="url(#gf${seed})">
      <ellipse cx="32" cy="30" rx="20" ry="24" fill="url(#gh${seed})"/>
      <ellipse cx="32" cy="58" rx="17" ry="28" fill="url(#gb${seed})"/>
      <ellipse cx="20" cy="80" rx="9"  ry="13" fill="hsla(${hue},44%,72%,0.28)"/>
      <ellipse cx="32" cy="83" rx="8"  ry="12" fill="hsla(${hue},44%,72%,0.22)"/>
      <ellipse cx="44" cy="80" rx="9"  ry="13" fill="hsla(${hue},44%,72%,0.25)"/>
      <ellipse cx="20" cy="28" rx="4"  ry="5.5" fill="hsla(${hue + 15},28%,18%,0.5)"/>
      <ellipse cx="44" cy="28" rx="4"  ry="5.5" fill="hsla(${hue + 15},28%,18%,0.5)"/>
      <path d="M26,37 Q32,40 38,37" stroke="hsla(${hue+15},28%,28%,0.35)" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;

  spookyLayer.appendChild(g);
  setTimeout(() => { g.remove(); style.remove(); }, dur * 1000 + 300);
}

function triggerSpooky() {
  const fromLeft = Math.random() > 0.5;
  makeBat(fromLeft);
  setTimeout(() => makeBat(!fromLeft), rand(300, 700));
  setTimeout(() => makeGhost(), rand(200, 600));
}

// observe each major section -- fires once per section
const triggered = new Set();
const spookyObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    const id = e.target.id || e.target.className;
    if (e.isIntersecting && !triggered.has(id)) {
      triggered.add(id);
      triggerSpooky();
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('#lore, #haunts, #details, #gallery, #contact').forEach(s => {
  spookyObserver.observe(s);
});
