import json, gzip, base64, collections, os, sys
here=os.path.dirname(os.path.abspath(__file__)); root=os.path.dirname(here)
rows=json.load(open(os.path.join(here,'data.js'),encoding='utf-8'))
U=sorted(set(r[0] for r in rows)); C=sorted(set(r[1] for r in rows)); K=sorted(set(r[5] for r in rows)); G=sorted(set(r[2] for r in rows))
groups=collections.OrderedDict()
for r in rows: groups.setdefault(r[4],[]).append(r)
out=[[n,[[U.index(r[0]),C.index(r[1]),G.index(r[2]),r[3][7:] if r[3].startswith('8032848') else r[3],K.index(r[5]),r[6],r[7],r[8],r[9],r[10],r[11],r[12],r[13]] for r in rs]] for n,rs in groups.items()]
s=json.dumps({'U':U,'C':C,'K':K,'G':G,'items':out},ensure_ascii=False,separators=(',',':'))
b64=base64.b64encode(gzip.compress(s.encode('utf-8'),9)).decode()
open(os.path.join(root,'docs','data.b64'),'w').write(b64)
print('docs/data.b64', len(b64), 'octets')
