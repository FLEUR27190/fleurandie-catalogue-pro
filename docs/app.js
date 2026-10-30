(async()=>{
let RAW;
try{
  const n=parseInt(await (await fetch('data-count.txt',{cache:'no-cache'})).text(),10)||8;
  const parts=await Promise.all(Array.from({length:n},(_,i)=>fetch(`data-${i+1}.txt`,{cache:'no-cache'}).then(r=>{if(!r.ok) throw new Error(r.status); return r.text()})));
  const bin=Uint8Array.from(atob(parts.join('').replace(/\s+/g,'')),c=>c.charCodeAt(0));
  const txt=await new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  const P=JSON.parse(txt); RAW=[];
  for(const [n,rs] of P.items) for(const r of rs) RAW.push([P.U[r[0]],P.C[r[1]],P.G[r[2]],/^\d{6}$/.test(r[3])?'8032848'+r[3]:r[3],n,P.K[r[4]],r[5],r[6],r[7],r[8],r[9],r[10],r[11],r[12]]);
}catch(e){ document.getElementById('main').innerHTML='<div class="empty">Le catalogue n\'a pas pu être chargé. Rechargez la page ou appelez le 02 32 38 07 51.</div>'; return; }
const STANDALONE = true;
// Clé d'accès Web3Forms liée à contact@fleurandie.com : collez-la entre les guillemets pour activer l'envoi direct du devis.
const SEND_KEY = '42c8c7cc-419d-4cfd-a66e-7c9afc86f30f';
const SEND_URL = 'https://api.web3forms.com/submit';

const ITEMS = RAW.map((a,idx)=>({idx,u:a[0],c:a[1],g:a[2],id:a[3],n:a[4],k:a[5],l:a[6],t:a[7],f:a[8],p:a[9],i:a[10],o:a[11]||null,m:a[12]||'',s:a[13]||'R'}));
const unit=(p,o,q)=>(o&&q>=o[0])?o[1]:p;

const UNIVERS = [
 {id:'arbres',label:'Arbres',sub:'Tiges, cépées, alignement, gros sujets',star:true,icon:'tree'},
 {id:'haies',label:'Haies & brise-vue',sub:'Persistants, palissés, cyprès, ifs',star:true,icon:'hedge'},
 {id:'fruitiers',label:'Fruitiers',sub:'Verger, figuiers, kakis, agrumes, vignes',star:true,icon:'fruit'},
 {id:'arbustes',label:'Arbustes & fleurs',sub:'Ornement, lilas des Indes, hortensias, rosiers',icon:'shrub'},
 {id:'erables',label:'Érables & terre de bruyère',sub:'Acer palmatum, magnolias, camélias, azalées',icon:'maple'},
 {id:'coniferes',label:'Conifères',sub:'Pins, cèdres, genévriers, ifs fastigiés',icon:'conifer'},
 {id:'mediterraneen',label:'Méditerranéen & oliviers',sub:'Oliviers, palmiers, yuccas, lauriers-roses',icon:'olive'},
 {id:'topiaires',label:'Topiaires & formes',sub:'Boules, pompons, spirales, nuages',icon:'topiary'},
 {id:'grimpantes',label:'Grimpantes, bambous & vivaces',sub:'Jasmin étoilé, glycines, graminées',icon:'vine'},
];
const UMAP = Object.fromEntries(UNIVERS.map(u=>[u.id,u]));

const FR = {
 'ABELIA':'Abélia','ABIES':'Sapin','ACACIA':'Mimosa','ACER':'Érable','ACER CAMPESTRE':'Érable champêtre','ACER PLATANOIDES':'Érable plane','ACER PSEUDOPLATANUS':'Sycomore','ACER PALMATUM':'Érable du Japon','ACER NEGUNDO':'Érable negundo','ACER RUBRUM':'Érable rouge','ACER FREEMANII':'Érable de Freeman','ACER GRISEUM':'Érable cannelle','ACER SACCHARINUM':'Érable argenté','ACER BUERGERANUM':'Érable trident','ACER SHIRASAWANUM':'Érable de Shirasawa',
 'ACTINIDIA':'Kiwi','AESCULUS':'Marronnier','AGAPANTHUS':'Agapanthe','AGAVE':'Agave','AKEBIA':'Akébia','ALBIZIA':'Arbre à soie','ALNUS':'Aulne','ALOCASIA':'Oreille d\'éléphant','ALOE':'Aloès','AMELANCHIER':'Amélanchier','ARALIA':'Aralia','ARBUTUS':'Arbousier','ASIMINA':'Asiminier','AUCUBA':'Aucuba','AZALEA':'Azalée','BERBERIS':'Épine-vinette','BETULA':'Bouleau','BETULA UTILIS':'Bouleau de l\'Himalaya','BOUGAINVILLEA':'Bougainvillier','BUDDLEJA':'Arbre aux papillons','BUTIA':'Palmier abricot','BUXUS':'Buis','CALLICARPA':'Arbuste aux bonbons','CALLISTEMON':'Rince-bouteille','CALOCEDRUS':'Cèdre à encens','CALYCANTHUS':'Arbre aux anémones','CAMELLIA':'Camélia','CAMPSIS':'Bignone','CARAGANA':'Caragana','CAREX':'Laîche','CARPINUS':'Charme','CARPINUS BETULUS':'Charme commun','CASTANEA':'Châtaignier','CATALPA':'Catalpa','CEDRUS':'Cèdre','CELTIS':'Micocoulier','CEPHALANTHUS':'Céphalanthe','CEPHALOTAXUS':'If à prunes','CERATONIA':'Caroubier','CERCIDIPHYLLUM':'Arbre au caramel','CERCIS':'Arbre de Judée','CERCIS CANADENSIS':'Gainier du Canada','CHAENOMELES':'Cognassier du Japon','CHAMAECYPARIS':'Faux-cyprès','CHAMAEROPS':'Palmier nain','CHIONANTUS':'Arbre de neige','CHITALPA':'Chitalpa','CINNAMOMUM':'Camphrier','CITRUS':'Agrume','CITRUS LIMONIA':'Citronnier','CITRUS SINENSIS':'Oranger','CITRUS RETICULATA':'Clémentinier','CITRUS NOBILIS':'Mandarinier','CITRUS PARADISI':'Pamplemoussier','COLOCASIA':'Taro','COPROSOMA':'Coprosma','CORDYLINE':'Cordyline','CORNUS':'Cornouiller','CORYLUS':'Noisetier','COTINUS':'Arbre à perruques','COTONEASTER':'Cotonéaster','COTONASTER':'Cotonéaster','CRATAEGUS':'Aubépine','CRYPTOMERIA':'Cèdre du Japon','CUPRESSOCYPARIS':'Cyprès de Leyland','CUPRESSUS':'Cyprès','CUPRESSUS SEMPERVIRENS':'Cyprès de Provence','CYCAS':'Cycas','CYDONIA':'Cognassier','CYRTOMIUM':'Fougère houx','DASYLIRION':'Dasylirion','DAVIDIA':'Arbre aux mouchoirs','DEUTZIA':'Deutzia','DICKSONIA':'Fougère arborescente','DIOSPYROS':'Plaqueminier (kaki)','ELAEAGNUS':'Chalef','ELAEAGNUS EBBINGEI':'Chalef persistant','ENKIANTHUS':'Enkianthus','ERIOBOTRYA':'Néflier du Japon','ESCALLONIA':'Escallonia','EUCALYPTUS':'Eucalyptus','EUONYMUS':'Fusain','EUONYMUS JAPONICUS':'Fusain du Japon','EXOCHORDA':'Arbre aux perles','FAGUS':'Hêtre','FARGESIA':'Bambou non traçant','FEIJOA':'Goyavier du Brésil','FICUS':'Figuier','FICUS CARICA':'Figuier','FORSYTHIA':'Forsythia','FRAXINUS':'Frêne','GARDENIA':'Gardénia','GINKGO':'Arbre aux quarante écus','GLEDITSIA':'Févier','GREVILLEA':'Grévillée','GUNNERA':'Rhubarbe géante','HAMAMELIS':'Noisetier des sorcières','HEDERA':'Lierre','HEMEROCALLIS':'Hémérocalle','HEPTACODIUM':'Arbre aux sept fleurs','HESPERALOE':'Yucca rouge','HIBISCUS':'Althéa','HYDRANGEA':'Hortensia','HYDRANGEA PANICULATA':'Hortensia paniculé','ILEX':'Houx','IMPERATA':'Herbe sanglante','JUGLANS':'Noyer','JUNIPERUS':'Genévrier','KERRIA':'Corète du Japon','KOELREUTERIA':'Savonnier','KOLKWITZIA':'Kolkwitzia','LABURNUM':'Cytise','LAGERSTROEMIA':'Lilas des Indes','LARIX':'Mélèze','LAURUS':'Laurier-sauce','LEUCOTHOE':'Leucothoe','LIGUSTRUM':'Troène','LIGUSTRUM JAPONICUM':'Troène du Japon','LIQUIDAMBAR':'Copalme d\'Amérique','LIRIODENDRON':'Tulipier de Virginie','LIRIOPE':'Liriope','LONICERA':'Chèvrefeuille','LOROPETALUM':'Loropetalum','MAGNOLIA':'Magnolia','MAGNOLIA GRANDIFLORA':'Magnolia persistant','MAHONIA':'Mahonia','MALUS':'Pommier','MANGAVE':'Mangave','MELIA':'Margousier','MESPILUS':'Néflier','METASEQUOIA':'Séquoia de Chine','METROSIDEROS':'Pohutukawa','MISCANTHUS':'Miscanthus','MORUS':'Mûrier','MUSA':'Bananier','MUSELLA':'Bananier lotus','MYRTUS':'Myrte','NANDINA':'Bambou sacré','NERIUM':'Laurier-rose','NOLINA':'Nolina','OLEA':'Olivier','OPUNTIA':'Figuier de Barbarie','OSMANTHUS':'Osmanthe','OSMAREA':'Osmarea','OSTRYA':'Charme-houblon','PANICUM':'Panic érigé','PARROTIA':'Arbre de fer','PARTHENOCISSUS':'Vigne vierge','PASSIFLORA':'Passiflore','PAULOWNIA':'Paulownia','PENNISETUM':'Herbe aux écouvillons','PEROWSKIA':'Sauge de Russie','PHILADELPHUS':'Seringat','PHILLYREA':'Filaire','PHOENIX':'Palmier dattier','PHORMIUM':'Lin de Nouvelle-Zélande','PHOTINIA':'Photinia','PHYLLOSTACHYS':'Bambou','PHYSOCARPUS':'Physocarpe','PICEA':'Épicéa','PIERIS':'Andromède du Japon','PINUS':'Pin','PISTACIA':'Pistachier','PITTOSPORUM':'Pittospore','PLATANUS':'Platane','PRUNUS':'Prunus','PRUNUS LAUROCERASUS':'Laurier-palme','PRUNUS LUSITANICA':'Laurier du Portugal','PRUNUS SERRULATA':'Cerisier à fleurs du Japon','PRUNUS CERASIFERA':'Prunier d\'ornement','PRUNUS AVIUM':'Cerisier','PRUNUS DOMESTICA':'Prunier','PRUNUS ARMENIACA':'Abricotier','PRUNUS PERSICA':'Pêcher / nectarinier','PRUNUS DULCIS':'Amandier','PRUNUS CERASUS':'Griottier','PRUNUS SALICINA':'Prunier japonais','PRUNUS SUBHIRTELLA':'Cerisier d\'hiver','PRUNUS PISSARDII':'Prunier pourpre','PSEUDOLARIX':'Mélèze doré','PSEUDOSASA':'Bambou métaké','PUNICA':'Grenadier','PYRACANTHA':'Buisson ardent','PYRUS':'Poirier','PYRUS CALLERYANA':'Poirier à fleurs','QUERCUS':'Chêne','QUERCUS ILEX':'Chêne vert','QUERCUS SUBER':'Chêne-liège','QUERCUS RUBRA':'Chêne rouge','RHAPHIOLEPIS':'Raphiolépis','RHODODENDRON':'Rhododendron','RHUS':'Sumac','RIBES':'Groseillier','ROBINIA':'Robinier','ROSA':'Rosier','ROSTRINCULA':'Rostrinucula','RUBUS':'Ronce fruitière','SABAL':'Palmier sabal','SALIX':'Saule','SAMBUCUS':'Sureau','SCHINUS':'Faux-poivrier','SOPHORA':'Sophora','SORBUS':'Sorbier','SPIRAEA':'Spirée','STEWARTIA':'Stewartia','STIPA':'Cheveux d\'ange','STRELITZIA':'Oiseau de paradis','STYRAX':'Styrax','SYRINGA':'Lilas','TAMARIX':'Tamaris','TAXUS':'If','TETRADIUM':'Arbre à miel','TETRAPANAX':'Tetrapanax','TEUCRIUM':'Germandrée','THUJA':'Thuya','TILIA':'Tilleul','TRACHELOSPERMUM':'Jasmin étoilé','TRACHYCARPUS':'Palmier chanvre','TULBAGHIA':'Ail d\'Afrique','ULMUS':'Orme','VACCINIUM':'Myrtille','VIBURNUM':'Viorne','VIBURNUM TINUS':'Laurier-tin','VITEX':'Gattilier','VITIS':'Vigne','WASHINGTONIA':'Palmier éventail','WEIGELA':'Weigela','WESTRINGIA':'Romarin d\'Australie','WISTERIA':'Glycine','YUCCA':'Yucca','ZELKOVA':'Orme du Japon','ZIZIPHUS':'Jujubier','ARONIA':'Aronia','CALLIANDRA':'Calliandra','CARYOPTERIS':'Barbe-bleue','CEANOTHUS':'Céanothe','CERATOSTIGMA':'Plumbago rustique','CHOISYA':'Oranger du Mexique','CISTUS':'Ciste','CONVOLVULUS':'Liseron arbustif','CYTISUS':'Genêt','EQUISETUM':'Prêle','EUPHORBIA':'Euphorbe','FATSIA':'Aralia du Japon','GAURA':'Gaura','GENISTA':'Genêt','GRISELINIA':'Griselinia','HELICHRYSUM':'Plante curry','HOUTTUYNIA':'Houttuynia','HYPERICUM':'Millepertuis','LAVANDULA':'Lavande','LEYCESTERIA':'Arbre aux faisans','PHLOMIS':'Sauge de Jérusalem','PHYSOCARPUS':'Physocarpe','ROSMARINUS':'Romarin','SALVIA':'Sauge','SEDUM':'Orpin','SPARTIUM':'Genêt d\'Espagne','SYMPHORICARPOS':'Symphorine','THYMUS':'Thym','FESTUCA':'Fétuque','MUHLENBERGIA':'Muhlenbergia','CLEMATIS':'Clématite','JASMINUM':'Jasmin','POLYGONUM':'Renouée grimpante','LYCIUM':'Goji','RIBES NIGRUM':'Cassis','RIBES RUBRUM':'Groseillier','RIBES UVA-CRISPA':'Groseillier à maquereaux','RUBUS FRUTICOSUS':'Mûre','RUBUS IDAEUS':'Framboisier','VACCINIUM':'Myrtille','CUPRESSUS SEMPERVIRENS':'Cyprès de Provence','MALUS COCCINELLA':'Pommier à fleurs','MALUS EVERESTE':'Pommier à fleurs','ACTINIDIA':'Kiwi','PRUNUS INCISA':'Cerisier nain du Japon','EUONYMUS FORTUNEI':'Fusain rampant'
};
function frName(n){
  const w=n.toUpperCase().replace(/[().]/g,' ').split(/\s+/).filter(Boolean);
  const g2=w.slice(0,2).join(' '), g1=w[0];
  if(FR[g2]) return FR[g2];
  if(g1==='ACER'&&w[1]==='PALM') return FR['ACER PALMATUM'];
  if(g1==='PRUNUS'){ if(/POMMIER|POIRIER|CERISIER|PRUNIER|ABRICOTIER|PECHER|NECTARINIER|AMANDIER/.test(n)) return (n.match(/\((POMMIER|POIRIER|CERISIER|PRUNIER|ABRICOTIER|PECHER|NECTARINIER|AMANDIER)\)/)||[])[1]?.toLowerCase().replace('pecher','pêcher').replace(/^\w/,c=>c.toUpperCase()); }
  return FR[g1]||'';
}
function genusOf(n){return n.toUpperCase().split(/\s+/)[0]}

/* ---------- helpers ---------- */
const norm=s=>(s||'').toString().normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const fmt=n=>n==null?'sur devis':n.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const COND={CLT:'Conteneur',COUPE:'Coupe','L.R.J.':'Pot souple',JARDINIERE:'Jardinière','POT DECO':'Pot déco','POT DECO CERAMIQUE':'Pot céramique','POT CLASSIC':'Pot classique','POT CARRE':'Pot carré'};
function condLabel(it){const k=COND[it.k]||it.k||''; const l=it.l?it.l+' L':''; return [k,l].filter(Boolean).join(' ')}
function sizeLabel(it){return [condLabel(it),it.t,it.f].filter(Boolean).join(' · ')}
function titleCase(s){return s.toLowerCase().replace(/(^|[\s(\-'./])([a-zà-ÿ])/g,(m,a,b)=>a+b.toUpperCase())}

/* forme → pictogramme */
function glyphKey(it){
  const f=norm(it.f), t=norm(it.t), n=norm(it.n);
  if(/pleur|pendul|rideau|parapluie|fontaine/.test(f+n)) return 'pleureur';
  if(/spirale|forme s|forme 8/.test(f)) return 'spirale';
  if(/pompon|nuage|plateau|tonnelle/.test(f)) return 'pompons';
  if(/boule/.test(f)) return 'boule';
  if(/cone|conique|pyramid/.test(f)) return 'cone';
  if(/colonn|cylindre|fastig/.test(f+n)) return 'colonne';
  if(/palmette|espalier|cordon|tresse|arche|gazebo/.test(f)) return 'espalier';
  if(/gobelet|scion|tigette|baliveau/.test(f)) return 'gobelet';
  if(/cepee|multitronc|tronc|cépée/.test(f)) return 'cepee';
  if(/1\/2 tige|3\/4 tige|1\/4 tige|demi/.test(f+t)) return 'demitige';
  if(/tige/.test(f)) return 'tige';
  if(/touffe|ramifie|buisson/.test(f)) return 'touffe';
  if(/^c\./.test(t)) return 'tige';
  if(it.u==='arbres') return 'tige';
  if(it.u==='haies'||it.u==='coniferes') return 'haie';
  return 'touffe';
}
const GL={
 tige:'<path d="M20 36V18" stroke-width="3"/><ellipse cx="20" cy="13" rx="9" ry="8" fill="currentColor" stroke="none"/>',
 demitige:'<path d="M20 36V24" stroke-width="3"/><ellipse cx="20" cy="17" rx="10" ry="9" fill="currentColor" stroke="none"/>',
 cepee:'<path d="M20 36V20M14 34c0-8 2-13 6-18M26 34c0-8-2-13-6-18" stroke-width="2.5"/><ellipse cx="20" cy="12" rx="11" ry="8" fill="currentColor" stroke="none"/>',
 touffe:'<ellipse cx="20" cy="22" rx="13" ry="12" fill="currentColor" stroke="none"/><path d="M20 36v-6" stroke-width="3"/>',
 boule:'<path d="M20 36v-5" stroke-width="3"/><circle cx="20" cy="19" r="11" fill="currentColor" stroke="none"/>',
 cone:'<path d="M20 36v-4" stroke-width="3"/><path d="M20 5 32 32H8z" fill="currentColor" stroke="none"/>',
 spirale:'<path d="M20 36v-3" stroke-width="3"/><path d="M26 8c-6 0-10 3-10 7s8 4 8 8-4 6-9 6M20 4c-9 0-13 5-13 10s12 5 12 11-5 8-11 8" stroke-width="2.5" fill="none"/>',
 pompons:'<path d="M20 36V14M20 20l-7-4M20 26l8-5" stroke-width="2.5"/><circle cx="20" cy="9" r="5" fill="currentColor" stroke="none"/><circle cx="10" cy="14" r="4" fill="currentColor" stroke="none"/><circle cx="30" cy="19" r="4.5" fill="currentColor" stroke="none"/>',
 colonne:'<path d="M20 36v-3" stroke-width="3"/><rect x="13" y="4" width="14" height="29" rx="7" fill="currentColor" stroke="none"/>',
 pleureur:'<path d="M20 36V16" stroke-width="3"/><path d="M20 14c-8 0-12 6-11 16M20 14c8 0 12 6 11 16M20 14c-3 4-4 10-3 16M20 14c3 4 4 10 3 16" stroke-width="2.5" fill="none"/><circle cx="20" cy="13" r="4" fill="currentColor" stroke="none"/>',
 espalier:'<path d="M20 36V8M8 14h24M8 22h24M8 30h24" stroke-width="2.5"/>',
 gobelet:'<path d="M20 36V22M20 22l-8-10M20 22l8-10M20 22v-14" stroke-width="2.5"/>',
 haie:'<rect x="5" y="12" width="30" height="20" rx="4" fill="currentColor" stroke="none"/><path d="M12 36v-4M20 36v-4M28 36v-4" stroke-width="3"/>',
};
function glyph(key,extra=''){return `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true" ${extra}>${GL[key]||GL.touffe}</svg>`}
const ICONS={
 home:'<path d="M3 11 12 3l9 8v10h-6v-6H9v6H3z" stroke-width="2" fill="none"/>',
 tree:GL.tige.replace(/20/g,'12').replace(/36/g,'22').replace(/18/g,'11').replace(/13/g,'8').replace(/rx="9" ry="8"/,'rx="6" ry="5.5"'),
 hedge:'<rect x="3" y="7" width="18" height="11" rx="2" fill="currentColor" stroke="none"/><path d="M7 22v-4M12 22v-4M17 22v-4" stroke-width="2"/>',
 fruit:'<circle cx="12" cy="14" r="7" fill="currentColor" stroke="none"/><path d="M12 7V3M12 4c2 0 4 1 4 3" stroke-width="2" fill="none"/>',
 shrub:'<circle cx="8" cy="11" r="5" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="5" fill="currentColor" stroke="none"/><circle cx="12" cy="7" r="4" fill="currentColor" stroke="none"/><path d="M12 22v-6" stroke-width="2"/>',
 maple:'<path d="M12 22v-7M12 3l2 4 4-1-1 4 4 2-4 2 1 4-4-1-2 4-2-4-4 1 1-4-4-2 4-2-1-4 4 1z" fill="currentColor" stroke="none"/>',
 conifer:'<path d="M12 22v-3M12 2l7 17H5z" fill="currentColor" stroke="none"/>',
 olive:'<path d="M12 22V12" stroke-width="2"/><ellipse cx="12" cy="9" rx="8" ry="6" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="2" fill="var(--bg)" stroke="none"/>',
 topiary:'<circle cx="12" cy="6" r="3.5" fill="currentColor" stroke="none"/><circle cx="12" cy="14" r="5" fill="currentColor" stroke="none"/><path d="M12 22v-3" stroke-width="2"/>',
 vine:'<path d="M4 20c4-2 4-8 8-10s6 4 9-2M4 14c3 0 5-4 8-4" stroke-width="2" fill="none"/><circle cx="17" cy="14" r="2.5" fill="currentColor" stroke="none"/>',
};
function icon(k){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true">${ICONS[k]||''}</svg>`}

/* estimated height (cm) for a hedge item */
function estHeight(it){
  const m=(it.t||'').match(/H\.?\s*(\d+)\s*\/\s*(\d+)/); if(m) return (+m[1]+ +m[2])/2;
  const l=parseFloat((it.l||'').toString().split('-')[0]); if(isNaN(l)) return 60;
  if(l<=3) return 50; if(l<=5) return 70; if(l<=10) return 90; if(l<=15) return 115; if(l<=20) return 140; if(l<=30) return 165; if(l<=50) return 190; return 230;
}
function heightLabel(it){const m=(it.t||'').match(/H\.?\s*\d+\s*\/\s*\d+/); return m?m[0]:'≈ '+Math.round(estHeight(it))+' cm'}

/* tree usage tags */
const USAGE=[
 ['alignement','Alignement & rue',/ACER (CAMPESTRE|PLATANOIDES|FREEMANII|RUBRUM|BUERGER)|CARPINUS|TILIA|PLATANUS|LIQUIDAMBAR|QUERCUS|FRAXINUS|PYRUS CALLERYANA|GINKGO|CELTIS|ZELKOVA|ROBINIA|SOPHORA|LIGUSTRUM|ULMUS|ALNUS|OSTRYA|GLEDITSIA|PRUNUS (SERRULATA|CERASIFERA)|MAGNOLIA GRANDIFLORA|PHOTINIA|KOELREUTERIA/],
 ['ombrage','Ombrage',/PLATANUS|TILIA|CATALPA|MORUS|ALBIZIA|PAULOWNIA|QUERCUS|FAGUS|ACER (PLATANOIDES|PSEUDOPLATANUS|SACCHARINUM|RUBRUM|FREEMANII)|CELTIS|GLEDITSIA|AESCULUS|ZELKOVA|FRAXINUS|ULMUS|JUGLANS|CARPINUS/],
 ['floraison','Floraison',/PRUNUS (SERRULATA|CERASIFERA|AVIUM PLENA|SUBHIRTELLA|ACCOLADE|KANZAN|PISSARDII)|MAGNOLIA|MALUS|CERCIS|LAGERSTROEMIA|ALBIZIA|KOELREUTERIA|CATALPA|ROBINIA|PAULOWNIA|SOPHORA|CRATAEGUS|AMELANCHIER|CHITALPA|LABURNUM|TAMARIX|SYRINGA|CORNUS|PYRUS CALLERYANA|DAVIDIA|STYRAX|HEPTACODIUM|TETRADIUM/],
 ['automne','Couleurs d\'automne',/LIQUIDAMBAR|ACER|GINKGO|QUERCUS (RUBRA|COCCINEA|PALUSTRIS)|PARROTIA|LIRIODENDRON|CERCIDIPHYLLUM|ZELKOVA|BETULA|AMELANCHIER|KOELREUTERIA|CORNUS|PISTACIA|METASEQUOIA|CARPINUS|FAGUS|CELTIS|PRUNUS SARGENTII/],
 ['persistant','Persistant',/QUERCUS (ILEX|SUBER)|MAGNOLIA GRANDIFLORA|LIGUSTRUM|PHOTINIA|OLEA|LAURUS|ILEX|ARBUTUS|EUCALYPTUS|ELAEAGNUS|PRUNUS LAUROCERASUS|CINNAMOMUM|PINUS|CUPRESSUS|PHILLYREA|ERIOBOTRYA/],
 ['petit','Petit jardin',/GLOBOSUM|NANUM|NANA|MINOR GLOBE|AMANOGAWA|KANZAN|KIKU|LAGERSTROEMIA|CERCIS|MAGNOLIA (SOULANG|STELLATA|LILIIFLORA|GENIE|SUSAN|GALAXY|BLACK)|AMELANCHIER|CORNUS|YOUNGII|CATALPA BIGNONIOIDES NANA|MORUS (PLATANIFOLIA|FRUITLESS|KAGAYAMAE)|CHITALPA|SALIX CAPREA|CRATAEGUS|KOELREUTERIA|PRUNUS (ACCOLADE|SUBHIRTELLA|CERASIFERA)|MALUS|SYRINGA|CRIMSON SENTRY|FASTIGIATA|COLUMNARE|PYRAMIDALIS|SLENDER|GUMBALL/],
 ['pleureur','Pleureur & formes',/PENDUL|YOUNGII|KIKU|SALIX|RIDEAU|PARAPLUIE|TONNELLE|PLATEAU|CEPEE|MULTITRONC/],
];
function usageTags(name,items){const s=name.toUpperCase()+' '+items.map(i=>i.f).join(' ').toUpperCase(); return USAGE.filter(u=>u[2].test(s)).map(u=>u[0])}

/* fruit families */
const FRUITS=[
 ['pommier','Pommier',/POMMIER|MALUS DOMESTICA/],['poirier','Poirier',/POIRIER|PYRUS COMMUNIS/],['cerisier','Cerisier',/CERISIER|PRUNUS AVIUM|PRUNUS CERASUS/],['prunier','Prunier',/PRUNIER|PRUNUS DOMESTICA|PRUNUS SALICINA/],
 ['abricotier','Abricotier',/ABRICOTIER|ARMENIACA/],['pecher','Pêcher / nectarinier',/PECHER|NECTARINIER|PERSICA/],['amandier','Amandier',/AMANDIER|DULCIS/],['figuier','Figuier',/FICUS CARICA|FIGUIER/],['kaki','Kaki',/DIOSPYROS/],
 ['agrumes','Agrumes',/CITRUS/],['vigne','Vigne',/VITIS/],['cognassier','Cognassier',/CYDONIA|COGNASSIER/],['neflier','Néflier',/MESPILUS|NEFLIER|ERIOBOTRYA/],['kiwi','Kiwi',/ACTINIDIA/],['noyer','Noyer, noisetier & châtaignier',/JUGLANS|CASTANEA|NOISETIER|CORYLUS AVELLANA/],['petits','Petits fruits & divers',/VACCINIUM|RIBES|RUBUS|SORBUS|PISTACIA|ZIZIPHUS|ASIMINA|FEIJOA|PUNICA|LYCIUM|MYRTILLE|CASSIS|GROSEILLIER|FRAMBOISIER|MÛRE|GOJI/],
];
const FORMS=[['gobelet','Gobelet / scion',/GOBELET|SCION|TIGETTE/],['demi','½ tige',/1\/2 TIGE/],['tige','Tige',/^TIGE|(^|[^/\d] )TIGE/],['palmette','Palmette / espalier',/PALMETTE|ESPALIER|CORDON/],['colonnaire','Colonnaire',/COLONN/],['nain','Nain',/NAIN/],['cepee','Cépée / touffe',/CEPEE|TOUFFE|RAMIFIE|BALIVEAU/]];
function fruitKeys(name){const s=name.toUpperCase(); return FRUITS.filter(f=>f[2].test(s)).map(f=>f[0])}
function formKey(it){const s=(it.f+' '+it.g+' '+it.n).toUpperCase(); for(const f of FORMS){ if(f[2].test(it.f.toUpperCase())||f[2].test(s)) return f[0]} return ''}

/* ---------- grouping ---------- */
function groupBy(items){
  const m=new Map();
  for(const it of items){ if(!m.has(it.n)) m.set(it.n,[]); m.get(it.n).push(it) }
  const out=[];
  for(const [n,arr] of m){
    arr.sort((a,b)=>(a.p??1e9)-(b.p??1e9));
    const ps=arr.map(i=>i.p).filter(p=>p!=null);
    out.push({n,items:arr,min:ps.length?Math.min(...ps):null,max:ps.length?Math.max(...ps):null,fr:frName(n),genus:genusOf(n),cats:[...new Set(arr.map(i=>i.c))],lim:arr.some(i=>/limit/.test(i.i)),sec:arr.some(i=>/deux/.test(i.i))});
  }
  out.sort((a,b)=>a.n.localeCompare(b.n,'fr'));
  return out;
}
const BYU={}; for(const u of UNIVERS) BYU[u.id]=groupBy(ITEMS.filter(i=>i.u===u.id));
const CATFR={'ORNEMENT':'Ornement','ALIGNEMENT':'Alignement','FRUITIERS':'Fruitier','PLANTES MEDITERRANEENS':'Méditerranéen',"CONIFERES D'ORNEMENT":'Conifère','TOPIAIRES':'Topiaire','ARBUSTES À FLEURS':'Arbuste à fleurs','ERABLES':'Érable',"PALISSE'":'Palissé','HAIE':'Haie','TERRE DE BRUYÈRE':'Terre de bruyère','LAGERSTROEMIA COLLECTION':'Collection','CYPRES':'Cyprès','BAMBOUS':'Bambou','AGRUMES':'Agrume','GRIMPANTES':'Grimpante','VIVACES':'Vivace','GROS SUJETS':'Gros sujet','ROSIER':'Rosier','VIGNE':'Vigne','ARBUSTES':'Arbuste','PETITS FRUITS':'Petit fruit','GRAMINÉES':'Graminée','CONIFÈRES':'Conifère','GRIMPANTES':'Grimpante'};

/* ---------- best-sellers ---------- */
const STARS={
 arbres:[['ACER CAMPESTRE','Érable champêtre','Alignement, rustique, taille facile'],['LIQUIDAMBAR STYRACIFLUA','Copalme d\'Amérique','Le feu d\'automne'],['BETULA UTILIS','Bouleau de l\'Himalaya','Écorce blanche, cépée ou tige'],['CARPINUS BETULUS','Charme commun','Alignement, rideau, palissé'],['QUERCUS ILEX','Chêne vert','Persistant, résiste à la sécheresse'],['TILIA','Tilleul','Ombrage généreux'],['PRUNUS SERRULATA','Cerisier à fleurs','Floraison rose spectaculaire'],['MAGNOLIA GRANDIFLORA','Magnolia persistant','Feuillage lustré toute l\'année'],['LAGERSTROEMIA INDICA','Lilas des Indes','Fleurit tout l\'été'],['GINKGO BILOBA','Arbre aux quarante écus','Or pur en octobre'],['PLATANUS','Platane','Grand ombrage, villes'],['MORUS','Mûrier','Ombrage de terrasse, plateau']],
 haies:[['PHOTINIA FRASERI RED ROBIN','Photinia Red Robin','La haie persistante n°1'],['PRUNUS LAUROCERASUS','Laurier-palme','Haie dense, croissance rapide'],['ELAEAGNUS EBBINGEI','Chalef','Brise-vent, bord de mer'],['CUPRESSOCYPARIS LEYLANDII','Cyprès de Leyland','Brise-vue rapide et haut'],['LIGUSTRUM JAPONICUM','Troène du Japon','Persistant, lustré'],['TAXUS BACCATA','If commun','Haie noble, taille parfaite'],['THUJA OCCIDENTALIS EMERAUDE','Thuya Emeraude','Haie étroite, vert franc'],['VIBURNUM TINUS','Laurier-tin','Fleurit tout l\'hiver'],['CARPINUS BETULUS','Charme palissé','Écran marcescent'],['EUONYMUS JAPONICUS','Fusain du Japon','Haie basse, bord de mer'],['OSMANTHUS','Osmanthe','Parfum d\'automne'],['TRACHELOSPERMUM','Jasmin étoilé palissé','Écran fleuri sur treillis']],
 fruitiers:[['POMMIER','Pommiers','Golden, Gala, Reinette…'],['POIRIER','Poiriers','Conférence, Williams, Comice'],['CERISIER','Cerisiers','Burlat, Napoléon, Montmorency'],['PRUNIER','Pruniers','Mirabelle, Reine-Claude, Quetsche'],['ABRICOTIER','Abricotiers','Bergeron, Rouge du Roussillon'],['PECHER','Pêchers & nectariniers','Chair jaune ou blanche'],['FICUS CARICA','Figuiers','Touffe, cépée ou ½ tige'],['DIOSPYROS KAKI','Kakis','Fruit d\'automne par excellence'],['CITRUS','Agrumes','Citronniers, orangers, kumquats'],['CYDONIA','Cognassiers','Gelées et pâtes de fruit'],['VITIS','Vignes','Table et vieux troncs'],['ACTINIDIA','Kiwis','Mâle, femelle, autofertile']],
 autres:[['OLEA EUROPAEA','Olivier','mediterraneen','Du 10 L au vieux tronc'],['ACER PALMATUM','Érable du Japon','erables','La star des petits jardins'],['HYDRANGEA PANICULATA','Hortensia paniculé','arbustes','Limelight, Polar Bear'],['PHYLLOSTACHYS','Bambous','grimpantes','Écran rapide, à contenir'],['TRACHYCARPUS','Palmier chanvre','mediterraneen','Rustique jusqu\'à -15 °C'],['PINUS','Pins','coniferes','Nuages, boules, tiges'],['CAMELLIA','Camélias','erables','Fleurs d\'hiver en terre acide'],['CERCIS CANADENSIS','Gainier du Canada','arbustes','Forest Pansy, feuillage pourpre'],['ILEX','Houx & topiaires','topiaires','Boules, cônes, nuages'],['WISTERIA','Glycines','grimpantes','Tiges, parapluies, palissées']],
};
function starGroups(uid,key){return BYU[uid].filter(g=>g.n.toUpperCase().includes(key))}

/* ---------- state & routing ---------- */
const state={view:'home',u:null,filter:'',genus:'',usage:'',fruit:'',form:'',limit:60,open:new Set()};
let quote=[]; try{quote=JSON.parse(localStorage.getItem('fleurandie_devis_a26')||'[]')}catch(e){quote=[]}
let info={}; try{info=JSON.parse(localStorage.getItem('fleurandie_devis_info')||'{}')}catch(e){info={}}
function saveQ(){try{localStorage.setItem('fleurandie_devis_a26',JSON.stringify(quote));localStorage.setItem('fleurandie_devis_info',JSON.stringify(info))}catch(e){}}

const $=s=>document.querySelector(s);
const main=$('#main');

function go(view,u,opts={}){
  state.view=view; state.u=u||null; state.filter=opts.filter||''; state.genus=''; state.usage=opts.usage||''; state.fruit=opts.fruit||''; state.form=''; state.limit=60; state.open=new Set(opts.open||[]);
  if(view!=='search'){ $('#q').value=''; $('#qclr').hidden=true }
  try{ history.replaceState(null,'','#'+(view==='home'?'accueil':view==='search'?'recherche':u)) }catch(e){}
  render(); window.scrollTo({top:0});
}
function renderTabs(){
  $('#tabs').innerHTML=`<a class="tab home" href="#accueil" ${state.view==='home'?'aria-current="page"':''}>${icon('home')}Essentiels d'automne</a>`+UNIVERS.map(u=>`<a class="tab ${u.star?'star':''}" href="#${u.id}" ${state.u===u.id?'aria-current="page"':''}>${icon(u.icon)}${u.label}</a>`).join('');
}
function render(){ renderTabs(); if(state.view==='home') renderHome(); else if(state.view==='search') renderSearch(); else renderUnivers(); updateCount() }

/* ---------- home ---------- */
function starCard(uid,key,label,why,fr){
  const gs=starGroups(uid,key); if(!gs.length) return '';
  const ps=gs.map(g=>g.min).filter(p=>p!=null); const min=ps.length?Math.min(...ps):null;
  const nvar=gs.length, nref=gs.reduce((s,g)=>s+g.items.length,0);
  const gk=glyphKey(gs[0].items[gs[0].items.length-1]);
  return `<button class="star" data-u="${uid}" data-key="${esc(key)}"><span class="g">${glyph(gk)}</span><span><span class="t">${esc(label)}</span><span class="l">${esc(why)}</span><span class="p">${nvar>1?nvar+' variétés · ':''}${nref} réf. · À partir de <b class="num">${fmt(min)}</b> HT</span></span></button>`;
}
function renderHome(){
  const nref=ITEMS.length, nvar=Object.values(BYU).reduce((s,a)=>s+a.length,0);
  main.innerHTML=`
  <section class="hero">
    <div class="txt"><div class="eyebrow">Une pépinière normande · tarif professionnel · semaine 42</div>
      <h1>L'automne, c'est maintenant qu'on plante 🍂</h1>
      <p class="lead">Arbres, haies et fruitiers sélectionnés pour vos chantiers d'automne, directement depuis nos serres en Normandie : ${nvar.toLocaleString('fr-FR')} variétés et ${nref.toLocaleString('fr-FR')} conditionnements, en tige, cépée, conteneur ou gros sujet. Cliquez une plante, choisissez la taille, ajoutez-la à votre devis.</p>
      <div class="chips" style="margin-top:14px">${UNIVERS.filter(u=>u.star).map(u=>`<a class="tab star" href="#${u.id}">${icon(u.icon)}${u.label}</a>`).join('')}</div>
    </div>
    <aside class="notes" aria-label="Bon à savoir">
      <div>${svgi('tag')}<span><b>Prix en moyenne -20 % inférieurs au marché</b><span>Tarif paysagiste net HT par plante, valable jusqu'au 31 décembre 2026 dans la limite des stocks.</span></span></div>
      <div>${svgi('leaf')}<span><b>Végétaux de qualité supérieure, garantie de croissance</b><span>Qualité producteur. Plantation d'octobre à mars : racines actives, arrosage réduit.</span></span></div>
      <div>${svgi('ruler')}<span><b>Lire les tailles</b><span>C.8-10 = tronc de 8 à 10 cm de tour (arbre d'environ 2,5 à 3 m). H.150/175 = hauteur totale en cm.</span></span></div>
      <div>${svgi('phone')}<span><b>Nos pépiniéristes sont là pour vous aider !</b><span>Devis confirmé après vérification des disponibilités, conseils de choix et de plantation au 02 32 38 07 51.</span></span></div>
    </aside>
  </section>
  ${['arbres','haies','fruitiers'].map(uid=>`<div class="sec"><h2>${esc(UMAP[uid].label)} <span style="font-weight:400;color:var(--muted);font-size:1rem">· les plus demandés</span></h2><a class="more" href="#${uid}">Tout le rayon ${esc(UMAP[uid].label.toLowerCase())} (${BYU[uid].length}) →</a></div><div class="stars">${STARS[uid].map(s=>starCard(uid,s[0],s[1],s[2])).join('')}</div>`).join('')}
  <div class="sec"><h2>Également très demandés à l'automne</h2></div>
  <div class="stars">${STARS.autres.map(s=>starCard(s[2],s[0],s[1],s[3])).join('')}</div>`;
  main.querySelectorAll('.star').forEach(b=>b.addEventListener('click',()=>go('univers',b.dataset.u,{filter:b.dataset.key})));
}
function svgi(k){const d={phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',tag:'<path d="M3 12V3h9l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/>',leaf:'<path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16z"/><path d="M4 20c4-5 8-8 12-11"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM8 12l2 2M11 9l2 2M14 6l2 2"/>'}[k];return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`}

/* ---------- univers ---------- */
function renderUnivers(){
  const u=UMAP[state.u]; const all=BYU[u.id];
  const genera=[...new Set(all.map(g=>g.genus))].sort().map(g=>({g,fr:FR[g]||'',n:all.filter(x=>x.genus===g).length}));
  let feat='';
  if(u.id==='arbres') feat=`<div class="panel"><h3>Choisir un arbre par usage</h3><p class="hint">Un clic filtre le rayon. Les silhouettes indiquent la forme de l'arbre : tige, cépée, ½ tige, pleureur…</p>
    <div class="chips" id="usage">${USAGE.map(x=>`<button class="chip" data-k="${x[0]}" aria-pressed="${state.usage===x[0]}">${x[1]}</button>`).join('')}</div>
    <h3 style="margin-top:16px">Repère de taille des tiges</h3>
    <div class="guide">${[['C.6-8','≈ 2 à 2,5 m'],['C.8-10','≈ 2,5 à 3 m'],['C.10-12','≈ 3 à 3,5 m'],['C.12-14','≈ 3,5 à 4 m'],['C.14-16','≈ 4 à 4,5 m'],['C.16-18','≈ 4,5 à 5 m'],['C.18-20','≈ 5 à 5,5 m'],['C.20-25','≈ 5,5 à 6,5 m']].map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div></div>`;
  if(u.id==='haies') feat=hedgeCalcHTML();
  if(u.id==='fruitiers') feat=`<div class="panel"><h3>Quel fruit cherchez-vous ?</h3><p class="hint">Puis affinez par forme : gobelet pour les petits jardins, ½ tige pour le verger, palmette contre un mur.</p>
    <div class="chips" id="fruit">${FRUITS.map(f=>{const n=all.filter(g=>fruitKeys(g.n).includes(f[0])).length; return n?`<button class="chip" data-k="${f[0]}" aria-pressed="${state.fruit===f[0]}">${f[1]} <small>${n}</small></button>`:''}).join('')}</div>
    <div class="chips" id="form" style="margin-top:10px">${FORMS.map(f=>`<button class="chip" data-k="${f[0]}" aria-pressed="${state.form===f[0]}">${glyph(f[0]==='demi'?'demitige':f[0]==='palmette'?'espalier':f[0]==='nain'?'touffe':f[0],'style="width:22px;height:22px;vertical-align:-5px;margin-right:4px"')}${f[1]}</button>`).join('')}</div></div>`;
  main.innerHTML=`<div class="uhead"><div><div class="eyebrow">${esc(u.sub)}</div><h1>${esc(u.label)}</h1></div><div class="cnt" id="cnt"></div></div>${feat}
  <div class="tools"><label for="genus">Genre</label><select id="genus"><option value="">Tous les genres (${all.length} variétés)</option>${genera.map(g=>`<option value="${g.g}" ${state.genus===g.g?'selected':''}>${esc(titleCase(g.g))}${g.fr?' · '+esc(g.fr):''} (${g.n})</option>`).join('')}</select>
  <input id="flt" type="search" placeholder="Filtrer dans ce rayon…" value="${esc(state.filter)}" aria-label="Filtrer dans ce rayon">${state.filter||state.genus||state.usage||state.fruit||state.form?`<button class="chip" id="reset">× Tout afficher</button>`:''}</div>
  <div class="list" id="list"></div>`;
  $('#genus').addEventListener('change',e=>{state.genus=e.target.value;state.limit=60;renderList()});
  $('#flt').addEventListener('input',e=>{state.filter=e.target.value;state.limit=60;renderList()});
  $('#reset')?.addEventListener('click',()=>go('univers',u.id));
  main.querySelectorAll('#usage .chip').forEach(b=>b.addEventListener('click',()=>{state.usage=state.usage===b.dataset.k?'':b.dataset.k;main.querySelectorAll('#usage .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.k===state.usage));state.limit=60;renderList()}));
  main.querySelectorAll('#fruit .chip').forEach(b=>b.addEventListener('click',()=>{state.fruit=state.fruit===b.dataset.k?'':b.dataset.k;main.querySelectorAll('#fruit .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.k===state.fruit));state.limit=60;renderList()}));
  main.querySelectorAll('#form .chip').forEach(b=>b.addEventListener('click',()=>{state.form=state.form===b.dataset.k?'':b.dataset.k;main.querySelectorAll('#form .chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.k===state.form));state.limit=60;renderList()}));
  if(u.id==='haies') wireHedgeCalc();
  renderList();
}
function filteredGroups(){
  const all=BYU[state.u]; const f=norm(state.filter);
  return all.map(g=>{
    let items=g.items;
    if(state.form) items=items.filter(i=>formKey(i)===state.form);
    if(!items.length) return null;
    if(state.genus&&g.genus!==state.genus) return null;
    if(f&&!(norm(g.n).includes(f)||norm(g.fr).includes(f)||norm(FR[g.genus]||'').includes(f))) return null;
    if(state.usage&&!usageTags(g.n,g.items).includes(state.usage)) return null;
    if(state.fruit&&!fruitKeys(g.n).includes(state.fruit)) return null;
    return items===g.items?g:{...g,items,min:Math.min(...items.map(i=>i.p??1e9)),max:Math.max(...items.map(i=>i.p??0))};
  }).filter(Boolean);
}
function renderList(){
  const gs=filteredGroups(); const list=$('#list');
  $('#cnt').textContent=`${gs.length} variété${gs.length>1?'s':''} · ${gs.reduce((s,g)=>s+g.items.length,0)} conditionnements`;
  if(!gs.length){list.innerHTML=`<div class="empty">Aucune plante ne correspond. Essayez un autre mot ou la recherche générale en haut de page.</div>`;return}
  list.innerHTML=gs.slice(0,state.limit).map(cardHTML).join('')+(gs.length>state.limit?`<button class="morebtn" id="more">Afficher ${Math.min(60,gs.length-state.limit)} variétés de plus (${gs.length-state.limit} restantes)</button>`:'');
  wireCards(list);
  $('#more')?.addEventListener('click',()=>{state.limit+=60;renderList()});
}
function cardHTML(g){
  const open=state.open.has(g.n);
  const tags=g.cats.filter(c=>!(UMAP[state.u]&&['HAIE','ALIGNEMENT','FRUITIERS','ORNEMENT'].includes(c)&&g.cats.length===1&&state.u!=='search')).map(c=>`<span class="badge">${esc(CATFR[c]||c)}</span>`).join('');
  return `<article class="card ${open?'open':''}" data-n="${esc(g.n)}" data-u="${g.u||state.u}"><button aria-expanded="${open}"><span><span class="nm">${esc(g.fr||titleCase(g.n))}</span>${g.fr?` <span class="fr">– ${esc(titleCase(g.n))}</span>`:''}<span class="meta">${g.items.length} taille${g.items.length>1?'s':''}${tags?' '+tags:''}${g.lim?' <span class="badge warn">Dispo limitée</span>':''}${g.sec?' <span class="badge gold">2e choix</span>':''}${g.items.some(i=>i.o)?' <span class="badge" style="background:var(--warn-soft);color:var(--sale)">Tarif par quantité</span>':''}</span></span><span style="display:flex;align-items:center;gap:10px"><span class="pr"><b class="num">${g.min==null?'sur devis':(g.min===g.max?fmt(g.min):'À partir de '+fmt(g.min))}</b><small>HT / unité</small></span><svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></button>${open?rowsHTML(g):''}</article>`;
}
function rowsHTML(g){
  return `<div class="rows"><table><thead><tr><th></th><th>Conditionnement</th><th>Taille / forme</th><th style="text-align:right">Prix HT</th><th style="text-align:right">Quantité</th></tr></thead><tbody>${g.items.map(it=>{
    const inq=quote.find(q=>q.id===it.id);
    return `<tr><td class="g">${glyph(glyphKey(it))}</td><td>${esc(condLabel(it))}${/limit/.test(it.i)?' <span class="badge warn">limité</span>':''}${/deux/.test(it.i)?' <span class="badge gold">2e choix</span>':''}</td><td>${esc([it.t,it.f].filter(Boolean).join(' · ')||'—')}${it.m?`<div class="mention">${esc(it.m)}</div>`:''}</td><td class="p num">${fmt(it.p)}${it.o?`<div class="promo">Par ${it.o[0]} : ${fmt(it.o[1])}</div>`:''}</td><td class="q">${it.p==null?'<span style="color:var(--muted)">nous consulter</span>':`<input type="number" min="1" value="${inq?inq.q:1}" aria-label="Quantité" id="qty-${it.id}"><button class="add ${inq?'done':''}" data-id="${it.id}">${inq?'✓ Au devis':'Ajouter'}</button>`}</td></tr>`}).join('')}</tbody></table></div>`;
}
function wireCards(root){
  root.querySelectorAll('.card>button').forEach(b=>b.addEventListener('click',()=>{
    const card=b.closest('.card'), n=card.dataset.n; const g=BYU[card.dataset.u].find(x=>x.n===n);
    if(state.open.has(n)){state.open.delete(n);card.classList.remove('open');b.setAttribute('aria-expanded','false');card.querySelector('.rows')?.remove()}
    else{state.open.add(n);card.classList.add('open');b.setAttribute('aria-expanded','true');card.insertAdjacentHTML('beforeend',rowsHTML(g));wireAdds(card)}
  }));
  wireAdds(root);
}
function findGroup(n){ for(const u of UNIVERS){const g=BYU[u.id].find(x=>x.n===n); if(g) return g} }
function wireAdds(root){
  root.querySelectorAll('.add').forEach(b=>b.addEventListener('click',()=>{
    const it=ITEMS.find(i=>i.id===b.dataset.id); const q=Math.max(1,parseInt(document.getElementById('qty-'+it.id)?.value||'1',10)||1);
    addToQuote(it,q); b.classList.add('done'); b.textContent='✓ Au devis';
  }));
}

/* ---------- search ---------- */
function renderSearch(){
  const f=norm(state.filter);
  const res=[]; for(const u of UNIVERS){ for(const g of BYU[u.id]){ if(norm(g.n).includes(f)||norm(g.fr).includes(f)||norm(FR[g.genus]||'').includes(f)) res.push({...g,u:u.id}) } }
  main.innerHTML=`<div class="uhead"><div><div class="eyebrow">Recherche</div><h1>« ${esc(state.filter)} »</h1></div><div class="cnt">${res.length} variété${res.length>1?'s':''}</div></div>`+
   (res.length?UNIVERS.map(u=>{const r=res.filter(g=>g.u===u.id); if(!r.length) return ''; return `<div class="sec"><h2>${icon(u.icon).replace('<svg','<svg style="width:26px;height:26px;vertical-align:-5px;color:var(--leaf)"')} ${esc(u.label)} <span style="color:var(--muted);font-size:1rem;font-family:var(--body);font-weight:400">${r.length}</span></h2><a class="more" href="#${u.id}">Ouvrir le rayon →</a></div><div class="list">${r.slice(0,40).map(cardHTML).join('')}${r.length>40?`<p style="color:var(--muted)">… et ${r.length-40} autres : affinez votre recherche ou ouvrez le rayon.</p>`:''}</div>`}).join('')
   :`<div class="empty">Rien trouvé pour « ${esc(state.filter)} ». Essayez le nom latin (Prunus, Acer…) ou le nom courant (laurier, pommier…).</div>`);
  main.querySelectorAll('.list').forEach(wireCards);
}
const q=$('#q');
let qt; q.addEventListener('input',()=>{ clearTimeout(qt); $('#qclr').hidden=!q.value; qt=setTimeout(()=>{ const v=q.value.trim(); if(v.length>=2){state.view='search';state.u=null;state.filter=v;state.open=new Set();render()} else if(!v&&state.view==='search') go('home') },180) });
$('#qclr').addEventListener('click',()=>{q.value='';$('#qclr').hidden=true;go('home')});

/* ---------- hedge calculator ---------- */
const HEDGE_PREF=['PHOTINIA FRASERI RED ROBIN','PRUNUS LAUROCERASUS NOVITA','PRUNUS LAUROCERASUS CAUCASICA','ELAEAGNUS EBBINGEI COMPACTA','CUPRESSOCYPARIS LEYLANDII','LIGUSTRUM JAPONICUM (LUCIDUM)','TAXUS BACCATA','THUJA OCCIDENTALIS EMERAUDE (SMARAGD)','VIBURNUM TINUS EVE PRICE','CARPINUS BETULUS','EUONYMUS JAPONICUS','OSMANTHUS HETEROPHYLLUS'];
function hedgeSpecies(){
  const all=BYU.haies.filter(g=>g.items.filter(i=>i.p!=null).length>=2);
  const pref=HEDGE_PREF.map(n=>all.find(g=>g.n===n)).filter(Boolean);
  const rest=all.filter(g=>!pref.includes(g));
  return [...pref,...rest];
}
function hedgeCalcHTML(){
  const sp=hedgeSpecies();
  return `<div class="panel"><h3>Calculez votre haie en 10 secondes</h3><p class="hint">Longueur, plante, taille : on vous donne le nombre de plants et le budget HT. L'espacement proposé est indicatif, ajustez-le selon la densité voulue.</p>
  <div class="calc">
    <label>Longueur de haie (m)<input id="h-len" type="number" min="1" step="0.5" value="20"></label>
    <label>Plante<select id="h-sp">${sp.map((g,i)=>`<option value="${esc(g.n)}">${esc(titleCase(g.n))}${g.fr?' · '+esc(g.fr):''}</option>`).join('')}</select></label>
    <label>Taille à la plantation<select id="h-sz"></select></label>
    <label>Espacement (cm)<input id="h-sp-cm" type="number" min="20" step="5" value="70"></label>
    <div class="out"><div><div class="big" id="h-out">—</div><div id="h-sub" style="color:var(--muted)"></div></div><button class="btn" id="h-add">Ajouter au devis</button></div>
  </div></div>`;
}
function wireHedgeCalc(){
  const sp=$('#h-sp'), sz=$('#h-sz'), len=$('#h-len'), cm=$('#h-sp-cm');
  function fillSizes(){ const g=BYU.haies.find(x=>x.n===sp.value); sz.innerHTML=g.items.filter(i=>i.p!=null).map(i=>`<option value="${i.id}">${esc(condLabel(i))} · ${esc(heightLabel(i))}${i.f?' · '+esc(i.f):''} · ${fmt(i.p)}${i.o?' (par '+i.o[0]+' : '+fmt(i.o[1])+')':''}</option>`).join(''); suggest(); }
  function suggest(){ const it=ITEMS.find(i=>i.id===sz.value); const h=estHeight(it); cm.value=h<80?50:h<125?70:h<175?90:100; calc(); }
  function calc(){ const it=ITEMS.find(i=>i.id===sz.value); const L=parseFloat(len.value)||0, s=parseFloat(cm.value)||70; const n=Math.max(1,Math.ceil(L*100/s)); const pu=unit(it.p,it.o,n); $('#h-out').innerHTML=`${n} plants · <b class="num">${fmt(n*pu)}</b> HT`; $('#h-sub').textContent=`${titleCase(it.n)} · ${condLabel(it)} · ${fmt(pu)} HT l'unité${it.o&&n>=it.o[0]?' (tarif par '+it.o[0]+' appliqué)':''} · 1 plant tous les ${s} cm`; $('#h-add').onclick=()=>{addToQuote(it,n)}; }
  sp.addEventListener('change',fillSizes); sz.addEventListener('change',suggest); len.addEventListener('input',calc); cm.addEventListener('input',calc);
  fillSizes();
}

/* ---------- quote ---------- */
function addToQuote(it,qty){
  const ex=quote.find(q=>q.id===it.id);
  if(ex) ex.q=qty; else quote.push({id:it.id,n:it.n,s:sizeLabel(it),p:it.p,o:it.o||null,q:qty});
  saveQ(); updateCount(); toast(`${titleCase(it.n)} × ${qty} ajouté au devis`);
}
function updateCount(){ $('#devcount').textContent=quote.reduce((s,q)=>s+q.q,0) }
function totals(){ const ht=quote.reduce((s,q)=>s+unit(q.p,q.o,q.q)*q.q,0); return {ht,tva:ht*0.10,ttc:ht*1.10} }
function openDrawer(){
  const d=$('#dev'); d.hidden=false; renderDrawer();
}
function renderDrawer(){
  const t=totals();
  $('#dev').innerHTML=`<div class="ov" id="ov"></div><aside class="drawer" role="dialog" aria-label="Mon devis"><header><h2>Mon devis</h2><button class="x" id="dx" aria-label="Fermer">×</button></header>
  <div class="body">
    <div class="info"><input id="i-soc" placeholder="Votre entreprise *" value="${esc(info.soc||'')}" autocomplete="organization"><input id="i-mail" type="email" placeholder="Votre e-mail *" value="${esc(info.mail||'')}" autocomplete="email"><input id="i-tel" type="tel" placeholder="Votre téléphone" value="${esc(info.tel||'')}" autocomplete="tel"><input id="i-ch" placeholder="Chantier / référence client" value="${esc(info.ch||'')}"></div><div id="sendstatus"></div>
    ${quote.length?quote.map((q,i)=>`<div class="line"><div><div class="n">${esc(titleCase(q.n))}</div><div class="d">${esc(q.s)} · ${fmt(unit(q.p,q.o,q.q))} HT${q.o?(q.q>=q.o[0]?' <b style="color:var(--sale)">tarif par '+q.o[0]+' appliqué</b>':' · par '+q.o[0]+' : '+fmt(q.o[1])):''}</div></div><div class="ctl"><button data-i="${i}" data-d="-1" aria-label="Moins">−</button><input type="number" min="1" value="${q.q}" data-i="${i}" aria-label="Quantité"><button data-i="${i}" data-d="1" aria-label="Plus">+</button></div><button class="rm" data-rm="${i}">Retirer</button><div class="tot num">${fmt(unit(q.p,q.o,q.q)*q.q)}</div></div>`).join('')
    :`<div class="empty">Votre devis est vide. Dans chaque rayon, ouvrez une plante, choisissez la quantité et cliquez « Ajouter ».</div>`}
    ${quote.length?`<div class="totals"><div><span>Total HT</span><b class="num">${fmt(t.ht)}</b></div><div><span>TVA 10 %</span><span class="num">${fmt(t.tva)}</span></div><div class="ttc"><span>Total TTC</span><span class="num">${fmt(t.ttc)}</span></div></div>
    <p style="color:var(--muted);font-size:.9rem">Prix HT, par unité. Envoyez ce devis à <b style="color:var(--green);user-select:all">contact@fleurandie.com</b> ou appelez le <b style="color:var(--green)">02 32 38 07 51</b> : nos pépiniéristes vous le confirment après vérification des disponibilités.</p>
    <details style="margin-top:8px"><summary style="cursor:pointer;font-weight:700">Voir le texte du devis</summary><textarea class="copy" id="qtext" readonly>${esc(quoteText())}</textarea></details>`:''}
  </div>
  <footer>${quote.length?`${SEND_KEY?`<button class="btn" id="send">Envoyer le devis à Fleurandie</button>`:''}${STANDALONE?`<a class="btn${SEND_KEY?' ghost':''}" style="text-align:center;text-decoration:none" href="mailto:contact@fleurandie.com?subject=${encodeURIComponent('Demande de devis – '+(info.soc||'paysagiste')+' – automne 2026')}&body=${encodeURIComponent(quoteText())}">${SEND_KEY?'Ou l\'envoyer depuis ma messagerie':'Envoyer le devis par e-mail à Fleurandie'}</a>`:''}<button class="btn ${STANDALONE?'ghost':''}" id="copy">Copier le devis${STANDALONE?'':" pour l'envoyer à contact@fleurandie.com"}</button>${STANDALONE?`<button class="btn ghost" id="print">Imprimer le devis</button>`:''}<button class="btn ghost" id="clear">Vider le devis</button>`:''}<button class="btn ghost" id="dclose">Continuer mes achats</button></footer></aside>`;
  const close=()=>{$('#dev').hidden=true};
  $('#ov').onclick=close; $('#dx').onclick=close; $('#dclose').onclick=close;
  ['soc','mail','tel','ch'].forEach(k=>$('#i-'+k).addEventListener('input',e=>{info[k]=e.target.value;saveQ();const ta=$('#qtext');if(ta)ta.value=quoteText()}));
  $('#dev').querySelectorAll('.ctl button').forEach(b=>b.onclick=()=>{const q=quote[+b.dataset.i];q.q=Math.max(1,q.q+ +b.dataset.d);saveQ();renderDrawer();updateCount()});
  $('#dev').querySelectorAll('.ctl input').forEach(i=>i.onchange=()=>{quote[+i.dataset.i].q=Math.max(1,parseInt(i.value,10)||1);saveQ();renderDrawer();updateCount()});
  $('#dev').querySelectorAll('.rm').forEach(b=>b.onclick=()=>{quote.splice(+b.dataset.rm,1);saveQ();renderDrawer();updateCount();if(state.view!=='home')render()});
  $('#clear')?.addEventListener('click',()=>{ if($('#clear').dataset.sure){quote=[];saveQ();renderDrawer();updateCount();if(state.view!=='home')render()} else {$('#clear').dataset.sure='1';$('#clear').textContent='Confirmer : vider le devis ?'} });
  $('#send')?.addEventListener('click',sendQuote);
  $('#print')?.addEventListener('click',()=>{ const d=$('#dev').querySelector('details'); if(d) d.open=true; window.print(); });
  $('#copy')?.addEventListener('click',()=>{ const txt=quoteText(); const done=()=>toast('Devis copié : collez-le dans un e-mail à contact@fleurandie.com'); if(navigator.clipboard?.writeText){navigator.clipboard.writeText(txt).then(done).catch(()=>{selectText()})} else selectText(); });
  function selectText(){ const d=$('#dev').querySelector('details'); d.open=true; const ta=$('#qtext'); ta.focus(); ta.select(); toast('Texte sélectionné : copiez-le avec Ctrl+C'); }
}
async function sendQuote(){
  const st=$('#sendstatus'), btn=$('#send');
  const soc=(info.soc||'').trim(), mail=(info.mail||'').trim();
  if(!soc||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)){ st.innerHTML='<div class="empty" style="color:var(--sale);padding:12px">Indiquez votre entreprise et un e-mail valide pour que nos pépiniéristes puissent vous répondre.</div>'; $('#i-'+(soc?'mail':'soc')).focus(); return; }
  btn.disabled=true; btn.textContent='Envoi en cours…';
  const t=totals();
  const payload={access_key:SEND_KEY, subject:`Devis catalogue pro – ${soc} – ${fmt(t.ht)} HT`, from_name:soc, email:mail, replyto:mail,
    entreprise:soc, telephone:info.tel||'', chantier:info.ch||'', total_ht:fmt(t.ht), nb_lignes:String(quote.length), message:quoteText(), botcheck:''};
  try{
    const r=await fetch(SEND_URL,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)});
    const j=await r.json().catch(()=>({}));
    if(r.ok&&j.success!==false){ const d=new Date().toLocaleString('fr-FR',{dateStyle:'short',timeStyle:'short'}); try{localStorage.setItem('fleurandie_devis_sent',d)}catch(e){}
      st.innerHTML=`<div class="empty" style="background:#e8f0e9;color:#428445;padding:12px;font-weight:600">Devis envoyé à Fleurandie le ${d}. Nos pépiniéristes vous répondent à ${esc(mail)}.</div>`; btn.textContent='Devis envoyé ✓'; toast('Devis envoyé à Fleurandie'); }
    else throw new Error(j.message||'refus');
  }catch(e){ btn.disabled=false; btn.textContent='Réessayer l\'envoi'; st.innerHTML='<div class="empty" style="color:var(--sale);padding:12px">L\'envoi n\'a pas abouti. Utilisez « Copier le devis » et collez-le dans un e-mail à contact@fleurandie.com, ou appelez le 02 32 38 07 51.</div>'; }
}
function quoteText(){
  const t=totals(); const L=[`DEMANDE DE DEVIS – FLEURANDIE Pépinière & Jardinerie en Normandie – Catalogue pro automne 2026`,`À : contact@fleurandie.com – 1 Le Plant au Cure, 27190 Le Val-Doré – 02 32 38 07 51`,`Entreprise : ${info.soc||'…'}`,`E-mail : ${info.mail||'…'}`,`Téléphone : ${info.tel||'…'}`,`Chantier : ${info.ch||'…'}`,``,`Réf.          Qté   Désignation`];
  for(const q of quote){ const u=unit(q.p,q.o,q.q); L.push(`${q.id}  ${String(q.q).padStart(3)}   ${titleCase(q.n)} – ${q.s} – ${fmt(u)} HT/u${q.o&&q.q>=q.o[0]?' (tarif par '+q.o[0]+')':''} = ${fmt(u*q.q)} HT`) }
  L.push(``,`Total HT : ${fmt(t.ht)}`,`TVA 10 % : ${fmt(t.tva)}`,`Total TTC : ${fmt(t.ttc)}`,``,`Prix HT valables jusqu'au 31/12/2026 sous réserve de disponibilité.`);
  return L.join('\n');
}
$('#devbtn').addEventListener('click',openDrawer);
let tt; function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,2600)}

/* ---------- routing ---------- */
function route(){ const h=(location.hash||'#accueil').slice(1); if(UMAP[h]) go('univers',h); else if(h==='recherche'&&state.filter) {} else go('home') }
window.addEventListener('hashchange',route);
route();
})();
