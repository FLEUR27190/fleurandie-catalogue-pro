#!/usr/bin/env python3
"""Reconstruit docs/index.html à partir des fichiers fournisseurs déposés dans sources/.
Usage : python3 build.py
  sources/*.xlsx  -> tarif du producteur italien (prix net vrac + royalty) x 1,6
  sources/*.pdf   -> disponible Paquereau (prix HT x 1,6, promos "Par N" conservées)
  sendkey.txt     -> clé Web3Forms (optionnelle) pour l'envoi direct du devis
"""
import glob, os, subprocess, sys, json
root=os.path.dirname(os.path.abspath(__file__)); b=os.path.join(root,'build'); py=[sys.executable,'-I']
xlsx=sorted(glob.glob(os.path.join(root,'sources','*.xlsx'))); pdf=sorted(glob.glob(os.path.join(root,'sources','*.pdf')))
if not xlsx: sys.exit('Aucun fichier Excel dans sources/')
subprocess.run(py+[os.path.join(b,'extract.py'),xlsx[-1],os.path.join(b,'items.json')],check=True)
if pdf:
    subprocess.run(['pdftotext','-layout',pdf[-1],os.path.join(b,'paq.txt')],check=True)
    subprocess.run(py+[os.path.join(b,'paq.py'),os.path.join(b,'paq.txt'),os.path.join(b,'paq.json')],check=True)
else:
    json.dump([],open(os.path.join(b,'paq.json'),'w'))
subprocess.run(py+[os.path.join(b,'merge.py')],cwd=b,check=True)
subprocess.run(py+[os.path.join(b,'assemble.py')],check=True)
