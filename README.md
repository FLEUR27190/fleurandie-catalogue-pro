# Catalogue pro Fleurandie – automne 2026

Site statique publié par GitHub Pages depuis le dossier `docs/` (branche `main`), en ligne sur https://pro.fleurandie.fr.

## Contenu de `docs/` (ce qui est publié)
- `index.html` : la page (charte Fleurandie, recherche, devis).
- `app.js` : le script du catalogue.
- `data-1.txt` … `data-8.txt` + `data-count.txt` : le tarif, compressé et découpé en morceaux (décodé par le navigateur).
- `CNAME` : le domaine personnalisé (`pro.fleurandie.fr`). Ne pas supprimer.
- `robots.txt` : page non indexée par les moteurs de recherche.

## Mettre à jour le tarif
1. Déposer les nouveaux fichiers fournisseurs dans `sources/` (Excel du producteur, PDF du disponible de la pépinière partenaire). Ce dossier n'est jamais publié.
2. `python3 build.py` : régénère `docs/` (la page, le script et les morceaux de données).
3. Publier le dossier `docs/` : `git add docs && git commit -m "Tarif semaine XX" && git push`, ou, sur GitHub, « Add file → Upload files » dans `docs/` en glissant les fichiers régénérés. Le site est à jour en une minute environ.

## Envoi des devis
La clé Web3Forms liée à contact@fleurandie.com est dans `sendkey.txt` (fichier non publié). Après un changement de clé, relancer `build.py` et publier `docs/`.

## Domaine
`pro.fleurandie.fr` pointe vers GitHub Pages par un enregistrement DNS `CNAME pro → fleur27190.github.io`. Dans le dépôt, Settings → Pages : domaine personnalisé `pro.fleurandie.fr`, puis cocher « Enforce HTTPS » une fois le certificat émis.

## Règles de prix
Voir `CLAUDE.md` et `BRAND.md` : coefficient 1,6, arrondi au centime, tarifs par quantité conservés, fournisseurs jamais nommés côté client.
