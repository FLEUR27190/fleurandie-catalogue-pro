import re, os, sys
here=os.path.dirname(os.path.abspath(__file__)); root=os.path.dirname(here)
t=open(os.path.join(here,'template.html'),encoding='utf-8').read(); data=open(os.path.join(here,'data.js'),encoding='utf-8').read()
kp=os.path.join(root,'sendkey.txt'); key=open(kp).read().strip() if os.path.exists(kp) else ''
LOADER='''(async()=>{
let RAW;
try{
  const r=await fetch('data.b64',{cache:'no-cache'}); if(!r.ok) throw new Error(r.status);
  const bin=Uint8Array.from(atob((await r.text()).trim()),c=>c.charCodeAt(0));
  const txt=await new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  const P=JSON.parse(txt); RAW=[];
  for(const [n,rs] of P.items) for(const r of rs) RAW.push([P.U[r[0]],P.C[r[1]],P.G[r[2]],/^\\d{6}$/.test(r[3])?'8032848'+r[3]:r[3],n,P.K[r[4]],r[5],r[6],r[7],r[8],r[9],r[10],r[11],r[12]]);
}catch(e){ document.getElementById('main').innerHTML='<div class="empty">Le catalogue n\\'a pas pu être chargé. Rechargez la page ou appelez le 02 32 38 07 51.</div>'; return; }
'''
assert t.count('const RAW = /*__DATA__*/;')==1 and t.count('</script>')==1
pages=t.replace('<script>\n','<script>\n'+LOADER,1).replace('const RAW = /*__DATA__*/;','').replace('</script>','})();\n</script>')
body=pages.replace('<meta name="claude:viewport-fit-sides" content="cover">\n','').replace('/*__STANDALONE__*/false','true').replace("/*__SENDKEY__*/''","'"+key+"'")
title=re.search(r'<title>.*?</title>\n',body).group(0); body=body.replace(title,'',1)
link=re.search(r'<link rel="stylesheet"[^>]*>\n',body).group(0); body=body.replace(link,'',1)
html=f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="Catalogue professionnel Fleurandie automne 2026 : arbres, haies, fruitiers, tarif paysagistes HT et devis en ligne.">
{title}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
{link}<style>[hidden]{{display:none!important}}img{{max-width:100%}}</style>
</head>
<body>
{body}
</body>
</html>
'''
os.makedirs(os.path.join(root,'docs'),exist_ok=True)
open(os.path.join(root,'docs','index.html'),'w',encoding='utf-8').write(html)
import subprocess; subprocess.run([sys.executable,'-I',os.path.join(here,'pack.py')],check=True)
# artifact flavour (no skeleton) for the claude.ai mirror
open(os.path.join(here,'artifact.html'),'w',encoding='utf-8').write(t.replace('/*__DATA__*/',data))
print('docs/index.html écrit, clé Web3Forms présente :', bool(key))
