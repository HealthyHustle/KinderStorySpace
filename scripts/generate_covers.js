const fs = require('fs');
const path = require('path');

const coversDir = path.join(__dirname, '..', 'public', 'assets', 'covers');
const modulesDir = path.join(__dirname, '..', 'public', 'assets', 'modules');

if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true });
if (!fs.existsSync(modulesDir)) fs.mkdirSync(modulesDir, { recursive: true });

function createSvgCover({ title, subtitle, bgGradient, iconSvg, accentColor, badge }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradient[0]}" />
      <stop offset="100%" stop-color="${bgGradient[1]}" />
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0B2447" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="600" height="800" rx="36" fill="url(#bgGrad)" />
  <rect width="600" height="800" rx="36" fill="url(#glowGrad)" />

  <!-- Playful Background Blobs & Stars -->
  <circle cx="90" cy="110" r="18" fill="#FFC928" opacity="0.8"/>
  <circle cx="520" cy="180" r="12" fill="#FFFFFF" opacity="0.6"/>
  <circle cx="500" cy="680" r="28" fill="#FFC928" opacity="0.5"/>
  <circle cx="70" cy="700" r="22" fill="#FFFFFF" opacity="0.4"/>
  
  <!-- Sparkles -->
  <path d="M510,90 L514,105 L529,109 L514,113 L510,128 L506,113 L491,109 L506,105 Z" fill="#FFC928" />
  <path d="M120,240 L122,250 L132,252 L122,254 L120,264 L118,254 L108,252 L118,250 Z" fill="#FFFFFF" opacity="0.8" />
  
  <!-- Clouds at bottom -->
  <path d="M-20,740 Q60,680 140,730 Q220,670 320,720 Q420,680 500,730 Q580,690 620,750 L620,800 L-20,800 Z" fill="#FFFFFF" opacity="0.25"/>
  <path d="M-20,760 Q90,720 200,750 Q310,710 430,750 Q520,720 620,770 L620,800 L-20,800 Z" fill="#FFFFFF" opacity="0.4"/>

  <!-- Badge / Tag -->
  <g transform="translate(48, 52)">
    <rect width="160" height="38" rx="19" fill="#FFFFFF" opacity="0.95" filter="url(#shadow)"/>
    <text x="80" y="24" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="700" fill="#0B2447" text-anchor="middle" letter-spacing="1">${badge}</text>
  </g>

  <!-- Central Graphic Container -->
  <g transform="translate(300, 360)" filter="url(#shadow)">
    <circle cx="0" cy="0" r="160" fill="#FFFFFF" opacity="0.95"/>
    <circle cx="0" cy="0" r="142" fill="${accentColor}" opacity="0.12"/>
    ${iconSvg}
  </g>

  <!-- Title & Subtitle Card -->
  <g transform="translate(50, 560)">
    <rect width="500" height="175" rx="28" fill="#FFFFFF" filter="url(#shadow)"/>
    
    <!-- Title -->
    <text x="250" y="60" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="30" font-weight="800" fill="#0B2447" text-anchor="middle">
      ${title}
    </text>
    
    <!-- Decorative Line -->
    <path d="M190,78 Q250,88 310,78" stroke="#FFC928" stroke-width="5" stroke-linecap="round" fill="none"/>

    <!-- Subtitle -->
    <text x="250" y="115" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16" font-weight="600" fill="#64748B" text-anchor="middle">
      ${subtitle}
    </text>
    
    <text x="250" y="145" font-family="'Caveat', cursive, sans-serif" font-size="20" font-weight="700" fill="#1687F8" text-anchor="middle">
      Kinder Story Space • Edisi PGPAUD
    </text>
  </g>
</svg>`;
}

const stories = [
  {
    filename: 'malin_kundang.svg',
    title: 'Malin Kundang',
    subtitle: 'Cerita Rakyat Sumatera Barat',
    badge: 'CERITA RAKYAT',
    bgGradient: ['#1687F8', '#0B4D9C'],
    accentColor: '#1687F8',
    iconSvg: `
      <!-- Big Ship at Sea -->
      <path d="M-90,30 Q0,55 90,30 L70,80 Q0,95 -70,80 Z" fill="#D97706"/>
      <path d="M-80,30 L80,30 L65,55 L-65,55 Z" fill="#F59E0B"/>
      <!-- Mast & Sails -->
      <line x1="0" y1="-100" x2="0" y2="30" stroke="#78350F" stroke-width="8" stroke-linecap="round"/>
      <path d="M5,-90 Q70,-45 5,10 Z" fill="#FFFFFF" filter="url(#shadow)"/>
      <path d="M-5,-70 Q-55,-35 -5,15 Z" fill="#EEF2F6"/>
      <!-- Flag -->
      <polygon points="0,-100 35,-85 0,-70" fill="#EF4444"/>
      <!-- Waves -->
      <path d="M-130,85 Q-70,65 -10,85 Q50,105 110,85 Q140,75 160,85" stroke="#38BDF8" stroke-width="8" fill="none" stroke-linecap="round"/>
    `
  },
  {
    filename: 'timun_mas.svg',
    title: 'Timun Mas',
    subtitle: 'Cerita Rakyat Jawa Tengah',
    badge: 'CERITA RAKYAT',
    bgGradient: ['#10B981', '#047857'],
    accentColor: '#10B981',
    iconSvg: `
      <!-- Golden Cucumber / Giant Leaf -->
      <ellipse cx="0" cy="0" rx="90" ry="120" fill="#FBBF24" transform="rotate(-15)"/>
      <ellipse cx="-15" cy="-10" rx="75" ry="105" fill="#FDE047" transform="rotate(-15)"/>
      <!-- Cucumber details & vine -->
      <path d="M-20,-115 Q0,-140 40,-130 Q70,-120 80,-80" stroke="#15803D" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="80" cy="-75" r="14" fill="#22C55E"/>
      <!-- Sparkles on golden cucumber -->
      <polygon points="-10,-30 -5,-15 10,-20 -5,-5 -10,10 -15,-5 -30,-20 -15,-15" fill="#FFFFFF"/>
      <polygon points="35,20 40,30 50,25 42,38 45,50 35,42 25,50 30,38" fill="#FFFFFF"/>
    `
  },
  {
    filename: 'bawang_merah_putih.svg',
    title: 'Bawang Merah & Putih',
    subtitle: 'Kisah Kebaikan dan Kesabaran',
    badge: 'PENDIDIKAN MORAL',
    bgGradient: ['#EC4899', '#9D174D'],
    accentColor: '#EC4899',
    iconSvg: `
      <!-- Red & White Onion / Flower basket -->
      <!-- Red bulb -->
      <ellipse cx="-45" cy="15" rx="55" ry="65" fill="#BE123C"/>
      <ellipse cx="-55" cy="5" rx="40" ry="50" fill="#E11D48"/>
      <path d="M-45,-50 Q-40,-85 -25,-100" stroke="#15803D" stroke-width="8" stroke-linecap="round" fill="none"/>
      <!-- White bulb -->
      <ellipse cx="45" cy="20" rx="52" ry="62" fill="#E2E8F0"/>
      <ellipse cx="38" cy="10" rx="38" ry="48" fill="#FFFFFF"/>
      <path d="M45,-42 Q40,-75 60,-95" stroke="#22C55E" stroke-width="8" stroke-linecap="round" fill="none"/>
      <!-- Magic Sparkles -->
      <circle cx="0" cy="-20" r="12" fill="#FFC928"/>
      <polygon points="0,-70 5,-50 25,-45 5,-40 0,-20 -5,-40 -25,-45 -5,-50" fill="#FFC928"/>
    `
  },
  {
    filename: 'kancil_buaya.svg',
    title: 'Kancil dan Buaya',
    subtitle: 'Fabel Cerdik & Edukatif',
    badge: 'FABEL NUSANTARA',
    bgGradient: ['#F59E0B', '#B45309'],
    accentColor: '#F59E0B',
    iconSvg: `
      <!-- Cute Deer / Kancil face & Crocodile -->
      <!-- Crocodile jaws below -->
      <path d="M-100,50 Q0,80 100,50 L80,100 Q0,120 -80,100 Z" fill="#15803D"/>
      <circle cx="-50" cy="45" r="10" fill="#FFFFFF"/><circle cx="-50" cy="45" r="5" fill="#000"/>
      <circle cx="50" cy="45" r="10" fill="#FFFFFF"/><circle cx="50" cy="45" r="5" fill="#000"/>
      <!-- Kancil jumping above -->
      <ellipse cx="0" cy="-30" rx="55" ry="45" fill="#92400E"/>
      <ellipse cx="0" cy="-25" rx="40" ry="32" fill="#F59E0B"/>
      <!-- Ears -->
      <ellipse cx="-45" cy="-80" rx="16" ry="32" fill="#92400E" transform="rotate(-25 -45 -80)"/>
      <ellipse cx="-45" cy="-80" rx="9" ry="20" fill="#FDE68A" transform="rotate(-25 -45 -80)"/>
      <ellipse cx="45" cy="-80" rx="16" ry="32" fill="#92400E" transform="rotate(25 45 -80)"/>
      <ellipse cx="45" cy="-80" rx="9" ry="20" fill="#FDE68A" transform="rotate(25 45 -80)"/>
      <!-- Eyes & cute nose -->
      <circle cx="-20" cy="-35" r="8" fill="#0B2447"/><circle cx="-18" cy="-38" r="3" fill="#FFF"/>
      <circle cx="20" cy="-35" r="8" fill="#0B2447"/><circle cx="22" cy="-38" r="3" fill="#FFF"/>
      <ellipse cx="0" cy="-18" rx="8" ry="6" fill="#000"/>
    `
  },
  {
    filename: 'sangkuriang.svg',
    title: 'Sangkuriang',
    subtitle: 'Asal Usul Tangkuban Parahu',
    badge: 'LEGENDA SUNDA',
    bgGradient: ['#6366F1', '#3730A3'],
    accentColor: '#6366F1',
    iconSvg: `
      <!-- Upside down boat & mountain -->
      <!-- Mountains -->
      <polygon points="-120,70 0,-60 120,70" fill="#4338CA" opacity="0.6"/>
      <polygon points="-50,70 40,-30 130,70" fill="#312E81" opacity="0.8"/>
      <!-- Upside down boat shape -->
      <path d="M-90,-10 Q0,-70 90,-10 L70,30 Q0,-15 -70,30 Z" fill="#92400E" filter="url(#shadow)"/>
      <line x1="-80" y1="-5" x2="80" y2="-5" stroke="#B45309" stroke-width="5"/>
      <!-- Moon & Stars -->
      <circle cx="-65" cy="-70" r="28" fill="#FEF08A"/>
      <circle cx="-55" cy="-75" r="24" fill="#6366F1"/>
      <circle cx="80" cy="-60" r="6" fill="#FFF"/>
    `
  },
  {
    filename: 'lutung_kasarung.svg',
    title: 'Lutung Kasarung',
    subtitle: 'Kisah Kasih & Kesetiaan',
    badge: 'CERITA RAKYAT',
    bgGradient: ['#0284C7', '#0369A1'],
    accentColor: '#0284C7',
    iconSvg: `
      <!-- Cute Black Langur / Prince Lutung -->
      <circle cx="0" cy="-10" r="75" fill="#334155"/>
      <circle cx="0" cy="0" r="55" fill="#64748B"/>
      <!-- Crown on Lutung head -->
      <polygon points="-40,-75 -20,-115 0,-85 20,-115 40,-75" fill="#FBBF24" filter="url(#shadow)"/>
      <circle cx="-20" cy="-115" r="6" fill="#EF4444"/>
      <circle cx="0" cy="-85" r="6" fill="#3B82F6"/>
      <circle cx="20" cy="-115" r="6" fill="#EF4444"/>
      <!-- Eyes & Face -->
      <ellipse cx="-20" cy="-5" rx="10" ry="12" fill="#0B2447"/>
      <circle cx="-17" cy="-8" r="4" fill="#FFF"/>
      <ellipse cx="20" cy="-5" rx="10" ry="12" fill="#0B2447"/>
      <circle cx="23" cy="-8" r="4" fill="#FFF"/>
      <path d="M-15,18 Q0,32 15,18" stroke="#0B2447" stroke-width="4" stroke-linecap="round" fill="none"/>
    `
  }
];

stories.forEach(story => {
  const svg = createSvgCover(story);
  fs.writeFileSync(path.join(coversDir, story.filename), svg);
});

// Module covers for PGPAUD
const modules = [
  {
    filename: 'modul_bahasa.svg',
    title: 'Bahasa & Literasi',
    subtitle: 'Mengenal Huruf & Bunyi Riang',
    badge: 'PGPAUD MODUL',
    bgGradient: ['#3B82F6', '#1D4ED8'],
    accentColor: '#3B82F6',
    iconSvg: `
      <rect x="-65" y="-55" width="130" height="110" rx="14" fill="#FFFFFF" filter="url(#shadow)"/>
      <text x="-25" y="15" font-family="'Plus Jakarta Sans', Arial" font-size="52" font-weight="900" fill="#1D4ED8">A</text>
      <text x="5" y="30" font-family="'Plus Jakarta Sans', Arial" font-size="62" font-weight="900" fill="#F59E0B">B</text>
      <text x="-40" y="-15" font-family="'Plus Jakarta Sans', Arial" font-size="28" font-weight="700" fill="#10B981">✨</text>
    `
  },
  {
    filename: 'modul_kognitif.svg',
    title: 'Kognitif & Seni',
    subtitle: 'Mengenal Warna di Sekitar Kita',
    badge: 'PGPAUD MODUL',
    bgGradient: ['#EC4899', '#BE185D'],
    accentColor: '#EC4899',
    iconSvg: `
      <!-- Paint Palette -->
      <path d="M-70,10 Q-80,-60 0,-70 Q80,-60 70,20 Q60,70 0,60 Q-30,55 -50,40 Z" fill="#FDF2F8"/>
      <circle cx="-35" cy="-20" r="16" fill="#EF4444"/>
      <circle cx="10" cy="-35" r="16" fill="#3B82F6"/>
      <circle cx="45" cy="-5" r="16" fill="#FBBF24"/>
      <circle cx="20" cy="30" r="16" fill="#10B981"/>
      <circle cx="-25" cy="20" r="14" fill="#EC4899"/>
    `
  },
  {
    filename: 'modul_sosial.svg',
    title: 'Sosial Emosional',
    subtitle: 'Mengenal Rasa & Belajar Empati',
    badge: 'PGPAUD MODUL',
    bgGradient: ['#F59E0B', '#D97706'],
    accentColor: '#F59E0B',
    iconSvg: `
      <!-- Two Smiling Hearts / Friends -->
      <circle cx="-35" cy="-10" r="45" fill="#FEF08A"/>
      <circle cx="35" cy="-10" r="45" fill="#FED7AA"/>
      <!-- Faces -->
      <circle cx="-48" cy="-18" r="5" fill="#000"/><circle cx="-22" cy="-18" r="5" fill="#000"/>
      <path d="M-45,-4 Q-35,10 -25,-4" stroke="#000" stroke-width="3" fill="none"/>
      <circle cx="22" cy="-18" r="5" fill="#000"/><circle cx="48" cy="-18" r="5" fill="#000"/>
      <path d="M25,-4 Q35,10 45,-4" stroke="#000" stroke-width="3" fill="none"/>
      <path d="M0,20 L5,28 L-5,28 Z" fill="#EF4444"/>
    `
  },
  {
    filename: 'modul_motorik.svg',
    title: 'Fisik & Motorik',
    subtitle: 'Gerak Ceria & Keterampilan Tangan',
    badge: 'PGPAUD MODUL',
    bgGradient: ['#10B981', '#059669'],
    accentColor: '#10B981',
    iconSvg: `
      <!-- Jumping Boy / Star -->
      <circle cx="0" cy="-45" r="26" fill="#FDE047"/>
      <circle cx="-8" cy="-48" r="4" fill="#000"/><circle cx="8" cy="-48" r="4" fill="#000"/>
      <path d="M-7,-38 Q0,-30 7,-38" stroke="#000" stroke-width="3" fill="none"/>
      <!-- Body arms up in victory -->
      <path d="M-45,-15 Q-15,-5 0,10 Q15,-5 45,-15" stroke="#059669" stroke-width="12" stroke-linecap="round" fill="none"/>
      <path d="M0,10 L0,55 M-25,85 L0,55 L25,85" stroke="#047857" stroke-width="12" stroke-linecap="round" fill="none"/>
    `
  },
  {
    filename: 'modul_lingkungan.svg',
    title: 'Pengenalan Lingkungan',
    subtitle: 'Alam Sekitar Sahabat Kita',
    badge: 'PGPAUD MODUL',
    bgGradient: ['#06B6D4', '#0891B2'],
    accentColor: '#06B6D4',
    iconSvg: `
      <!-- Tree & Sun -->
      <circle cx="45" cy="-45" r="24" fill="#FDE047"/>
      <rect x="-12" y="10" width="24" height="60" rx="8" fill="#78350F"/>
      <circle cx="0" cy="-15" r="50" fill="#22C55E"/>
      <circle cx="-25" cy="-5" r="35" fill="#16A34A"/>
      <circle cx="25" cy="-5" r="35" fill="#4ADE80"/>
    `
  },
  {
    filename: 'modul_numerasi.svg',
    title: 'Numerasi Dasar',
    subtitle: 'Belajar Angka & Berhitung Gembira',
    badge: 'PGPAUD MODUL',
    bgGradient: ['#8B5CF6', '#6D28D9'],
    accentColor: '#8B5CF6',
    iconSvg: `
      <!-- Blocks 1 2 3 -->
      <rect x="-70" y="-10" width="60" height="60" rx="12" fill="#F59E0B" filter="url(#shadow)"/>
      <text x="-40" y="32" font-family="'Plus Jakarta Sans', Arial" font-size="34" font-weight="900" fill="#FFF" text-anchor="middle">1</text>
      
      <rect x="-15" y="-55" width="60" height="60" rx="12" fill="#3B82F6" filter="url(#shadow)"/>
      <text x="15" y="-13" font-family="'Plus Jakarta Sans', Arial" font-size="34" font-weight="900" fill="#FFF" text-anchor="middle">2</text>

      <rect x="25" y="5" width="60" height="60" rx="12" fill="#EC4899" filter="url(#shadow)"/>
      <text x="55" y="47" font-family="'Plus Jakarta Sans', Arial" font-size="34" font-weight="900" fill="#FFF" text-anchor="middle">3</text>
    `
  }
];

modules.forEach(mod => {
  const svg = createSvgCover(mod);
  fs.writeFileSync(path.join(modulesDir, mod.filename), svg);
});

console.log('Successfully generated all book and module covers!');
