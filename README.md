# Christophe GELONI Photographies

Site vitrine premium pour Christophe GELONI, photographe professionnel basé à Antibes (Côte d'Azur).

Photographe officiel : Festival Jazz à Juan-les-Pins, Ville d'Antibes, ABC Média, Mig's Communication.

## Structure

```
christophe-geloni-photo/
├── index.html          Home
├── univers.html        Univers photographiques
├── portfolio.html      Galerie avec filtres et lightbox
├── about.html          À propos + accréditations + partenaires
├── contact.html        Formulaire de contact
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/             Placeholders à remplacer
```

## Déploiement GitHub Pages

1. Pousser le code sur la branche `main`
2. Aller dans **Settings** > **Pages**
3. Source : **Deploy from a branch**
4. Branch : **main** / dossier **/ (root)**
5. Cliquer **Save**
6. Le site sera accessible à `https://<username>.github.io/christophe-geloni-photo/`

## Images placeholders à remplacer

Placer les fichiers dans le dossier `images/`. Formats recommandés : JPG optimisé, 1920px de large minimum.

### Hero et portraits
- `hero-main.jpg` — Image principale hero (paysage Côte d'Azur ou jazz)
- `portrait-christophe.jpg` — Portrait de Christophe GELONI

### Univers
- `jazz-juan.jpg` — Vignette Jazz & Événementiel (home)
- `antibes-ville.jpg` — Vignette Institutionnel & Ville (home)
- `corporate.jpg` — Vignette Corporate & Agences (home)
- `univers-jazz.jpg` — Image univers Jazz & Scène
- `univers-antibes.jpg` — Image univers Institutionnel & Patrimoine
- `univers-corporate.jpg` — Image univers Communication & Corporate
- `univers-portrait.jpg` — Image univers Portrait & Divers

### Galerie portfolio
- `gallery-01.jpg` — Jazz
- `gallery-02.jpg` — Jazz
- `gallery-03.jpg` — Jazz
- `gallery-04.jpg` — Institutionnel
- `gallery-05.jpg` — Institutionnel
- `gallery-06.jpg` — Institutionnel
- `gallery-07.jpg` — Corporate
- `gallery-08.jpg` — Corporate
- `gallery-09.jpg` — Corporate
- `gallery-10.jpg` — Portrait
- `gallery-11.jpg` — Portrait
- `gallery-12.jpg` — Portrait

## Configuration Formspree

Le formulaire de contact utilise [Formspree](https://formspree.io/) :

1. Créer un compte sur [formspree.io](https://formspree.io/)
2. Créer un nouveau formulaire
3. Copier l'ID du formulaire (ex: `xrgvabcd`)
4. Dans `contact.html`, remplacer `XXXX` dans `action="https://formspree.io/f/XXXX"`

## Personnalisations à faire

- [ ] Remplacer toutes les images placeholders par les photos réelles
- [ ] Configurer l'ID Formspree dans `contact.html`
- [x] ~~Remplacer l'email placeholder~~ → christophe.geloni@gmail.com + tél +33 6 77 59 79 60
- [ ] Ajouter l'URL Instagram réelle dans le footer (toutes les pages)
- [ ] Mettre à jour l'URL du site dans les balises Schema.org

## Stack technique

- HTML5 sémantique
- CSS3 (variables, Grid, Flexbox, animations)
- JavaScript vanilla (Intersection Observer, lightbox, filtres)
- Google Fonts : Playfair Display + Inter
- Aucune dépendance externe

## Crédits

Site réalisé par [Mig's Communication](https://agence-migs.com)
