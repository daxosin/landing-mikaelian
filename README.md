# Landing page — Emmanuel Mikaelian

**Démo en ligne → https://landing-mikaelian.vercel.app**

One-page brutaliste, épurée. HTML + CSS + JS **vanilla**, zéro dépendance runtime,
zéro tracker, zéro cookie. Pensée pour un Lighthouse perf > 95.

Déployée sur Vercel avec intégration Git : tout `push` sur `main` redéploie automatiquement.

## Structure

```
index.html   # structure + textes (définitifs)
style.css    # direction artistique brutaliste + responsive + reduced-motion
script.js    # gestes sensoriels (hero qui se dépouille, complexe → simple)
```

## Lancer en local

Aucune build. Ouvrir `index.html` dans un navigateur suffit.
Pour servir proprement (recommandé, évite les soucis de cache) :

```bash
# Python
python -m http.server 8000
# ou Node
npx serve .
```

Puis ouvrir http://localhost:8000

## À remplir avant mise en ligne

| Placeholder            | Où                                   | Quoi mettre                                   |
|------------------------|--------------------------------------|-----------------------------------------------|
| `OG_IMAGE_À_REMPLIR`   | `index.html` → `<meta og:image>`     | URL d'une image de partage 1200×630 (après déploiement) |

Email de contact **déjà branché** : le CTA « Me contacter » pointe sur
`mailto:mikaelian78@gmail.com` (objet pré-rempli). Lien LinkedIn déjà renseigné
(`https://www.linkedin.com/in/emmanuel-mikaelian/`). Les captures/visuels de projets
pourront être ajoutés plus tard dans les cartes de la section « Réalisations ».

## Déployer

Site 100 % statique → déploiement instantané.

**Vercel**
```bash
npm i -g vercel
vercel        # suivre les prompts, framework = "Other"
vercel --prod
```

**Netlify**
- Glisser-déposer le dossier sur https://app.netlify.com/drop
- ou `netlify deploy --prod --dir .`

Aucune variable d'environnement, aucune étape de build.

## Choix de direction

- **Palette** : monochrome chaud (off-white `#f2f1ec` / encre `#111110`) + **deux accents
  sémantiques** : **vermillon `#ff3b00`** = registre décision/action (titres-marques,
  numéros, bouton), **cobalt `#1f44ff`** = registre rigueur/santé (cadre conformité,
  marqueurs techniques). Employés avec parcimonie, jamais décoratifs.
- **3 voix typographiques, toutes système** (zéro Google Fonts, zéro @font-face, rendu
  immédiat) : **grotesque** (impact, titres) · **serif** (substance, textes longs — allège
  la lecture et crédibilise) · **mono** (chrome technique).
- **Vocabulaire** : brutalisme **Swiss-industriel** (mode print/clair) — numéros de
  section géants en débord, chrome télémétrique mono (strip coordonnées, REV, statut),
  grille visible, grain analogique, repères crosshair. Easings **mécaniques** (cubic-bezier
  custom, jamais `linear` ni ressort bouncy).
- **Gestes sensoriels** :
  - *Hero* — l'écran s'ouvre saturé de jargon qui se barre puis s'efface ; un **compteur
    de retrait** décompte le superflu en direct, puis le titre **s'assemble ligne par ligne**
    (wipe net). La simplification jouée au chargement.
  - *Bandeaux* — deux rubans de substance vérifiable, sens & vitesses opposés :
    rouge = réalisations livrées, bleu = cadre santé maîtrisé (HDS, RGPD, traçabilité…).
  - *Réalisations* — le bloc « problème » se barre et se réduit à l'entrée dans le
    viewport, un tampon **Simplifié** tombe ; le résultat reste dominant.
  - *Curseur* — crosshair tactique sur desktop (pointeur fin), réactif aux cibles.
  - *Grain* — fine texture « document déclassifié », fixe et inerte.
- **`prefers-reduced-motion`** : grain, curseur, marquee, compteur et reveals sont
  **tous neutralisés** ; le contenu s'affiche directement dans son état final.
- **Vérifié au rendu réel** (Chrome headless, desktop + mobile) — zéro erreur console.
- **Accessibilité** : HTML sémantique, navigation clavier, skip-link, focus visibles,
  contrastes AA.
