# Spec visuelle — Scarlino

Sources, dans l’ordre utilisé :

1. HTML / CSS / SVG déjà dans le dépôt (`index.html`, `assets/css/style.css`, `assets/images/diagonals/*.svg`, `assets/js/main.js`).
2. Mesures Figma déjà lues avant la limite de quota (non relues).
3. Le brief de reconstruction (hero sans cercle, cartes, animations, i18n).

Aucun appel Figma MCP n’a été refait.

## Frames

| Frame | Node | Taille |
|---|---|---|
| DESKTOP — page | `1:2` | 1920 × 7156 |
| MOBILE — page | `1:340` | 382 × 7520 |
| COPY FR | `376:185` | 1920 × 7688 |
| COPY ENG | `376:181` | 1920 × 7688 |
| Hero mobile alternatif | `43:44` | 375 × 820 |

Le hero alternatif n’existe pas comme second écran dans le HTML. Le responsive suit le hero mobile du CSS, hauteur minimale 820 px, largeur fluide. L’écart 375 vs 382 n’a pas de variante séparée dans le code source.

## Sections desktop (ordre et hauteurs)

Largeur de référence : 1920 px.

| Ordre | Section | Node | y | Hauteur |
|---|---|---|---|---|
| 1 | Hero | `1:3` | 0 | 1022 |
| 2 | Bandeau DEVOPS & CLOUD AUTOMATION | `374:5` | 1022 | 308 |
| 3 | 01 / À propos (`02 — About Me` dans Figma) | `374:8` | 1330 | 1256 |
| 4 | 02 / Compétences | `374:27` | 2586 | 1761 |
| 5 | 03 / Projets | `374:65` | 4347 | 1305 |
| 6 | 04 / Contact + footer | `374:101` | 5652 | 1504 |

Le numéro affiché vient du HTML, pas du préfixe de calque Figma : `01 / ABOUT ME`, `02 / SKILLS`, `03 / PORTFOLIO — PROJETS`, `04 / CONTACT`.

## Couleurs

Strictement :

- `#000000`
- `#D7D7D7`
- `#FFFFFF`

`get_variable_defs` sur `1:2` était vide. Ces trois valeurs viennent du CSS (`--black`, `--gray`, `--white`) et du hero / about déjà extraits.

## Typographies

| Rôle | Police | Graisses | Source |
|---|---|---|---|
| Nom, « Hi, I am » | Raleway | 700 | CSS `.hero-hello`, `.hero-name` |
| Rôle, navigation, index, titres, signatures | Montserrat | 700 et 800 | CSS `--font-ui` |
| Textes courants | Open Sans | 400 et 600 | CSS `--font-body` |

Tailles desktop déjà relevées (elles coïncident avec les `clamp()` max du CSS) :

- Hero hello 36 px, nom 88 px, rôle 29 px, eyebrow 15 px
- Monogramme S : 48 px dans le contexte Figma du hero ; le CSS le pose à `2rem`. Le header reprend `2rem`, et `3rem` (48 px) à partir de 1200 px.
- Bandeau 31 px / 22 px
- Titres de section 55 px
- Navbar liens 17 px, CONTACT 15 px, pilule 147 × 46, rayon 30 px

## Diagonales desktop

Fond de section `#D7D7D7`, couche noire en `clip-path`, `z-index: 0`. Pourcentages calculés depuis les SVG du dépôt (mêmes viewBox que Figma).

### Hero — 1920 × 1022

Polygone noir : `(1050,0) (1920,0) (1920,1022) (0,1022) (850,850)`

```
polygon(54.6875% 0%, 100% 0%, 100% 100%, 0% 100%, 44.270833% 83.170254%)
```

### About — 1920 × 1256

Polygone noir : `(0,0) (1920,0) (1110,190) (900,1030) (0,1256)`

```
polygon(0% 0%, 100% 0%, 57.8125% 15.127389%, 46.875% 82.006369%, 0% 100%)
```

### Skills — 1920 × 1761

Repris de `assets/images/diagonals/skills.svg` (identique au `--clip-skills` du CSS) :

`(1920,0) (1920,1761) (0,1761) (880,1541) (1100,220)`

```
polygon(100% 0%, 100% 100%, 0% 100%, 45.833333% 87.507098%, 57.291667% 12.492902%)
```

### Projets — 1920 × 1305

Repris de `assets/images/diagonals/portfolio.svg` :

`(0,0) (1920,0) (1100,220) (880,1085) (0,1305)`

```
polygon(0% 0%, 100% 0%, 57.291667% 16.858238%, 45.833333% 83.141762%, 0% 100%)
```

### Contact — couche 1040 × 1504, origine x = 880

Repris de `assets/images/diagonals/contact.svg`. En coordonnées du frame 1920 × 1504 :

`(1920,0) (1920,1504) (880,1504) (1100,220)`

```
polygon(100% 0%, 100% 100%, 45.833333% 100%, 57.291667% 14.62766%)
```

## Diagonales mobile

Reprises de `style.css` (`max-width: 899px`). Le breakpoint du projet est **900 px**.

| Section | clip-path |
|---|---|
| Hero | `polygon(0 58%, 100% 48%, 100% 100%, 0 100%)` |
| About | `polygon(0 0, 100% 0, 100% 42%, 0 52%)` |
| Skills | `polygon(0 38%, 100% 28%, 100% 100%, 0 100%)` |
| Projets | `polygon(0 0, 100% 0, 100% 36%, 0 46%)` |
| Contact | `polygon(0 62%, 100% 52%, 100% 100%, 0 100%)` |

## Breakpoints

- Mobile : &lt; 900 px, calé sur le frame 382 px de large (contrôle à 390 px). Hero `min-height: 820px`.
- Desktop : ≥ 900 px. Hauteurs Figma en `min-height` à partir de 1200 px.
- Contrôle desktop demandé : 1440 px.

## Valeurs reprises du HTML/CSS ou estimées

Reprises telles quelles (pas une estimation) :

- Textes FR du HTML et textes EN de `assets/js/main.js`, y compris les chaînes de la modale « tous mes projets ».
- Diagonales Skills, Projets, Contact et toutes les diagonales mobile (CSS + SVG).
- Espacements horizontaux 160 / 1920 = 8,333 %.
- Hauteur de header `4.5rem`, ease `cubic-bezier(0.22, 1, 0.36, 1)`.
- Liens GitHub, email `josephscarlino@gmail.com`, stacks techniques des cartes.

Estimations marquées `~` :

- `~` Amplitude de parallaxe des diagonales : translation ±1,5 % et rotation ±0,4°. Le brief demande un effet discret ; aucune amplitude n’est dans le CSS (GSAP y morphait le `clip-path`, pas la rotation).
- `~` Fondu du portrait : dégradé vers `#000000` sur les 32 % inférieurs de l’image. Le brief demande le fondu, pas sa hauteur.
- `~` Portrait : `portrait-scarlino-raw.png` (400 × 400, détourage transparent, sans disque gris). Les exports 1484 × 1688 ont le gris `#CECECE` et le bas en ovale déjà peints dans les pixels. Aucune hauteur de fondu ni de cadrage plus précis n’était chiffrée hors Figma.
- `~` La section Projets dépasse 1305 px dès que l’aperçu terminal est ajouté au-dessus du texte. Les cartes Figma font 170 px sans aperçu. Le `clip-path` reste celui du SVG ; il s’étire avec la section.
- `~` Le hero du frame COPY est identique en FR et en ENG (anglais). Les chaînes FR ajoutées pour ce hero sont listées dans le rapport de livraison, pas dans Figma.
