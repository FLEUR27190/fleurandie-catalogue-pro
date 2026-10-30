# Catalogue pro Fleurandie – automne 2026

Site statique publié via GitHub Pages depuis le dossier `docs/` (page `index.html` + données compressées `data.b64`).

## Mettre à jour le tarif
1. Déposer le nouveau fichier fournisseur dans `sources/` (Excel du producteur, PDF du disponible Paquereau). Ce dossier n'est pas publié.
2. `python3 build.py`
3. `git add docs && git commit -m "Tarif semaine XX" && git push` → en ligne en une minute.

## Envoi des devis
La clé Web3Forms liée à contact@fleurandie.com est lue dans `sendkey.txt` (fichier non publié) au moment de la construction.

## Règles de prix
Voir `CLAUDE.md` et `BRAND.md` : coefficient 1,6, arrondi au centime, fournisseurs jamais nommés côté client.
