# LMC'effp Website Review — v7.1

**Reviewed:** `lmceffp_v7_1.html` (MHTML snapshot, saved March 9, 2026)  
**Branch:** `claude/review-marketing-website-e4WJE`

---

## Critical Bugs (must fix before deployment)

### 1. Navigation links are local file paths
All nav links and the hero "Ver Serviços" CTA point to `file:///C:/Users/Usuario/Downloads/lmceffp_v7_1.html#section`. These must be converted to relative anchor links.

**Affected elements (7 total):**
- Logo link → `#hero`
- Nav: Sobre → `#sobre`
- Nav: Serviços → `#servicos`
- Nav: Portfólio → `#portfolio`
- Nav: Clientes → `#clientes`
- Nav: Contato → `#contato`
- Hero CTA "Ver Serviços" → `#servicos`

**Fix:** Replace all `file:///C:/Users/Usuario/Downloads/lmceffp_v7_1.html#` with `#`.

### 2. Portfolio videos use `blob:null/...` URLs
All 6 portfolio videos have `src="blob:null/..."` — these are in-memory browser blob references that only existed during the original browser session. They are permanently broken in the saved MHTML.

**Affected:** 3 video-editing styles (Informativo, Cinematográfico, Motivacional) and 3 design styles (Comunicado, Carrosel, Persuasivo).

**Fix:** Host the portfolio videos on a CDN or server and replace blob URLs with real URLs. Until then, these video cards show a blank player.

### 3. JavaScript stripped from MHTML snapshot
The MHTML save process stripped all `<script>` tags. The following interactive features are broken without JS:
- Contact form "Enviar via WhatsApp" (the button submits nowhere — the JS handler that builds the WhatsApp message URL is missing)
- Portfolio tab switching (🎬 Estilos de Vídeo / 🎨 Estilos de Design tabs do nothing)
- Custom cursor (`#cur`, `#cur-r`) stays static — cursor disappears on the page
- Scroll-reveal animations (`.rv` elements never receive `.in` class, so they stay invisible on load if JS was controlling this — though they appear to be pre-applied in the snapshot)
- Scroll progress bar stays at ~1.7% (frozen at snapshot scroll position)

**Fix:** The JS must be restored from the original `.html` source file (`lmceffp_v7_1.html`). Do not deploy the MHTML — deploy the original HTML file.

---

## SEO Issues

| Issue | Impact |
|-------|--------|
| No `<meta name="description">` | Google uses URL as snippet, hurts CTR |
| No Open Graph tags (`og:title`, `og:description`, `og:image`) | Links shared on WhatsApp/Instagram show no preview |
| No Twitter Card meta | Same issue on Twitter/X |
| No `<link rel="canonical">` | Risk of duplicate content if URL parameters exist |
| Nav links used full file paths (see Critical Bug #1) | Broken anchor navigation |

**Recommended `<head>` additions:**
```html
<meta name="description" content="LMC'effp — Agência de marketing digital em Fortaleza, CE. Gestão de redes sociais, produção audiovisual e identidade visual para marcas que querem crescer.">
<meta property="og:title" content="LMC'effp — Agência de Marketing Digital | Fortaleza, CE">
<meta property="og:description" content="Marketing digital estratégico e produção audiovisual de alto impacto. Conteúdo que gera atenção, engajamento e resultado real.">
<meta property="og:image" content="[URL to the LMC logo or a brand cover image]">
<meta property="og:type" content="website">
<link rel="canonical" href="[production URL]">
```

---

## Accessibility Issues

### Missing alt attributes on key images
- `img-logo-lmc` (nav logo) — no `alt` attribute
- `img-sobre-lmc` (about section visual) — no `alt` attribute

All client logos have correct `alt` text (Lubnorte, LECF Cup, Nossa Troca, Virtus Vet, SUN7 Fitness). Good.

### Contact form lacks `<label>` elements
All inputs use only `placeholder` text for labeling. Screen readers and browser autofill are less effective without proper `<label for="...">` associations.

### Custom cursor removes system cursor
The CSS applies `cursor: none` globally. Without the JS cursor handler, users see no cursor at all. Ensure the JS is restored (see Critical Bug #3).

---

## Content / Copy Review

### Strengths
- **Hero headline** "Sua Marca No Topo." — direct, confident, memorable
- **Hero subtext** is specific: "Marketing digital estratégico e produção audiovisual de alto impacto. Conteúdo que gera atenção, engajamento e resultado real." — no buzzword padding
- **Founder quote** is authentic and differentiating: "Por trás de cada marca forte existe estratégia, fé e alguém que decidiu fazer diferente."
- **Stats are honest** — "5+ Clientes Ativos", "17k+ Seguidores Gerenciados", "2025 Fundação" — credible for a new agency rather than inflated
- **LTDA formalization** listed as a Diferencial — smart trust signal for B2B clients
- **Equipment list is specific**: naming iPhone 15 Pro, Hollyland MK2, Ulanzi J12 signals genuine professional capability
- **Client descriptions are specific**: Lubnorte "4 mil+ clientes no Nordeste", LECF Cup "12 mil+ seguidores" — not vague

### Issues to Fix

**Typo:**
- "Carrosel" (portfolio section, line 1266) → should be **"Carrossel"** (double 's' in Portuguese)

**Language inconsistency:**
- CTA section tag reads **"Welcome The Modern"** (English) in an otherwise 100% Portuguese site. Either translate it ("Bem-vindo ao Moderno" or similar) or remove it for consistency.

**Copyright year:**
- Footer reads **"© 2025"** but the MHTML was saved in March 2026. Update to "© 2026" or "© 2025–2026".

**Eyebrow label duplication:**
- The `#sobre` section has both `<p class="eyebrow">Quem Somos</p>` and `<h2>Quem<br>Somos</h2>` — the eyebrow and heading say the exact same thing. Consider changing the eyebrow to "Nossa História" or "A Agência" to add information rather than repeat.

---

## External Dependencies (potential fragility)

The software section (`#equipamentos`) loads the CapCut and Canva logos from **Wikimedia Commons** CDN URLs:
```
https://upload.wikimedia.org/wikipedia/commons/b/3/37/CapCut_Logo.svg/...
https://upload.wikimedia.org/wikipedia/commons/b/bb/Canva_Logo.svg/...
```
These could break if the Wikimedia URLs change. Host these icons locally or use official brand assets.

---

## Remotion Project Alignment

The `src/HelloWorld.tsx` is a generic Remotion starter and does not yet reflect the LMC'effp brand:

| Issue | Detail |
|-------|--------|
| Wrong color palette | Uses `#e94560` (red) / `#a8b2d8` (blue) instead of `--gold: #D4AF37` + `--black: #0d0d0d` |
| Generic text | "Agência LMC" / "Marketing Digital" / "Fortaleza, CE" placeholder text |
| Duration too short | 90 frames @ 30fps = 3 seconds — too short for a marketing intro |
| Missing brand fonts | Uses `sans-serif` fallback instead of Montserrat + Inter |

**Recommendation:** Update `HelloWorld.tsx` to use the website's design system as a brand intro animation (e.g., logo reveal, tagline fade-in, location tag).

---

## Summary

| Category | Status |
|----------|--------|
| Critical bugs | 3 (nav links, blob videos, missing JS) |
| SEO | Missing all meta tags beyond viewport |
| Accessibility | 2 images without alt, no form labels |
| Copy | 1 typo ("Carrosel"), 1 language inconsistency ("Welcome The Modern"), 1 stale copyright year |
| Brand consistency | Strong — gold/black palette, tone, and positioning are cohesive |
| Remotion project | Not yet branded; uses generic starter template |

**Do not deploy the MHTML file.** Deploy the original `lmceffp_v7_1.html` source after fixing the 7 local file:// links. The MHTML format is not suitable for web hosting.
