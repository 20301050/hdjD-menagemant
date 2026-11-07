/* Bandeau cookies (style CNIL) : Tout accepter / Tout refuser / Personnaliser,
   + petit bouton 🍪 pour revenir sur son choix à tout moment.
   Réglages via les attributs data-* de la balise <script>. */
(function(){
var me=document.currentScript||document.querySelector("script[data-ck-key]");
if(!me)return;
var KEY=me.getAttribute("data-ck-key"),LOAD=me.getAttribute("data-ck-load"),
ACC=me.getAttribute("data-ck-accent")||"#2f8cff",BG=me.getAttribute("data-ck-bg")||"#0b1020";
var L=(document.documentElement.lang||"fr").slice(0,2);
var TX={
fr:{title:"🍪 Nous respectons votre vie privée",txt:"Nous utilisons des cookies de mesure d'audience (Google Analytics) pour savoir combien de personnes visitent le site et l'améliorer. Aucun cookie publicitaire. Vous pouvez tout accepter, tout refuser ou choisir.",more:"En savoir plus",all:"Tout accepter",none:"Tout refuser",cust:"Personnaliser",ptitle:"Paramètres des cookies",nec:"Cookies nécessaires",necd:"Indispensables au fonctionnement du site (mémoriser votre choix).",on:"Toujours actifs",ana:"Mesure d'audience",anad:"Google Analytics : nombre de visiteurs, pages vues, provenance des visites. Données statistiques, sans publicité.",save:"Enregistrer mes choix",manage:"Gérer les cookies",close:"Fermer"},
pl:{title:"🍪 Szanujemy Twoją prywatność",txt:"Używamy plików cookie do pomiaru ruchu (Google Analytics), aby wiedzieć, ile osób odwiedza stronę, i ją ulepszać. Bez reklamowych plików cookie. Możesz zaakceptować wszystkie, odrzucić wszystkie lub wybrać.",more:"Więcej informacji",all:"Akceptuj wszystkie",none:"Odrzuć wszystkie",cust:"Dostosuj",ptitle:"Ustawienia plików cookie",nec:"Niezbędne pliki cookie",necd:"Potrzebne do działania strony (zapamiętanie Twojego wyboru).",on:"Zawsze aktywne",ana:"Pomiar ruchu",anad:"Google Analytics: liczba odwiedzających, odsłony, źródła wizyt. Dane statystyczne, bez reklam.",save:"Zapisz wybór",manage:"Zarządzaj plikami cookie",close:"Zamknij"},
en:{title:"🍪 We respect your privacy",txt:"We use audience measurement cookies (Google Analytics) to know how many people visit the site and improve it. No advertising cookies. You can accept all, reject all or choose.",more:"Learn more",all:"Accept all",none:"Reject all",cust:"Customise",ptitle:"Cookie settings",nec:"Necessary cookies",necd:"Required for the site to work (remembering your choice).",on:"Always active",ana:"Audience measurement",anad:"Google Analytics: number of visitors, page views, traffic sources. Statistical data, no advertising.",save:"Save my choices",manage:"Manage cookies",close:"Close"}};
if(!TX[L])L="fr";
var T=TX[L],POL=me.getAttribute("data-ck-policy-"+L)||me.getAttribute("data-ck-policy-fr")||"#";

function get(){try{return localStorage.getItem(KEY);}catch(e){return null;}}
function save(v){try{localStorage.setItem(KEY,v);}catch(e){}}
function load(){var f=window[LOAD];if(typeof f==="function")f();}

var css=document.createElement("style");
css.textContent=
".ck-bar{position:fixed;left:0;right:0;bottom:0;z-index:99999;background:"+BG+";color:#fff;border-top:3px solid "+ACC+";box-shadow:0 -6px 30px rgba(0,0,0,.35);font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}"+
".ck-in{max-width:1200px;margin:0 auto;padding:18px 20px;display:flex;gap:24px;align-items:center}"+
".ck-tx{flex:1}.ck-tx b{display:block;font-size:16px;margin-bottom:4px}.ck-tx p{margin:0;opacity:.92}.ck-tx a{color:#fff;text-decoration:underline}"+
".ck-bt{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}"+
".ck-b{cursor:pointer;font:inherit;font-weight:700;border-radius:8px;padding:10px 18px;border:2px solid "+ACC+";white-space:nowrap}"+
".ck-p{background:"+ACC+";color:#fff}.ck-s{background:transparent;color:#fff}.ck-l{background:transparent;color:#fff;border-color:transparent;text-decoration:underline;font-weight:600}"+
".ck-b:focus-visible,.ck-fab:focus-visible,.ck-sw input:focus-visible+span{outline:3px solid #fff;outline-offset:2px}"+
".ck-ov{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px}"+
".ck-md{background:#fff;color:#1a1a1a;border-radius:14px;max-width:520px;width:100%;max-height:90vh;overflow:auto;padding:22px;font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}"+
".ck-md h2{margin:0 0 14px;font-size:19px}.ck-row{display:flex;gap:14px;align-items:flex-start;justify-content:space-between;padding:14px 0;border-top:1px solid #e5e5e5}"+
".ck-row b{display:block}.ck-row p{margin:2px 0 0;color:#555;font-size:13px}.ck-on{color:#1a7f37;font-weight:700;font-size:13px;white-space:nowrap}"+
".ck-sw{position:relative;display:inline-block;width:46px;height:26px;flex:none}.ck-sw input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}"+
".ck-sw span{position:absolute;inset:0;background:#bbb;border-radius:26px;transition:.2s;pointer-events:none}.ck-sw span:before{content:'';position:absolute;left:3px;top:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:.2s}"+
".ck-sw input:checked+span{background:"+ACC+"}.ck-sw input:checked+span:before{transform:translateX(20px)}"+
".ck-md .ck-bt{margin-top:16px}.ck-md .ck-s{color:#1a1a1a}.ck-md .ck-l{color:#1a1a1a}"+
".ck-fab{position:fixed;left:14px;bottom:14px;z-index:9998;width:44px;height:44px;border-radius:50%;border:2px solid "+ACC+";background:"+BG+";color:#fff;font-size:22px;line-height:1;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.35)}"+
"@media (max-width:760px){.ck-in{flex-direction:column;align-items:stretch;gap:14px;padding:16px}.ck-bt{justify-content:stretch}.ck-bt .ck-b{flex:1 1 45%}.ck-bt .ck-l{flex-basis:100%}}"+
"@media (prefers-reduced-motion:reduce){.ck-sw span,.ck-sw span:before{transition:none}}";
document.head.appendChild(css);

var bar=null,fab=null;
function btn(cls,label,fn){var b=document.createElement("button");b.type="button";b.className="ck-b "+cls;b.textContent=label;b.onclick=fn;return b;}
function clearGA(){document.cookie.split(";").forEach(function(c){var n=c.split("=")[0].trim();if(/^_ga/.test(n)){var h=location.hostname.split(".");for(var i=0;i<h.length;i++){var d=h.slice(i).join(".");document.cookie=n+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=."+d;}document.cookie=n+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";}});}
function decide(v){save(v);if(v==="no")clearGA();if(bar){bar.remove();bar=null;}if(v==="yes")load();showFab();}
function showBar(){
  if(bar)return;
  bar=document.createElement("div");bar.className="ck-bar";bar.setAttribute("role","region");bar.setAttribute("aria-label",T.ptitle);
  bar.innerHTML='<div class="ck-in"><div class="ck-tx"><b></b><p></p></div><div class="ck-bt"></div></div>';
  bar.querySelector("b").textContent=T.title;
  var p=bar.querySelector("p");p.textContent=T.txt+" ";var a=document.createElement("a");a.href=POL;a.textContent=T.more;p.appendChild(a);
  var bt=bar.querySelector(".ck-bt");
  bt.appendChild(btn("ck-s",T.none,function(){decide("no");}));
  bt.appendChild(btn("ck-p",T.all,function(){decide("yes");}));
  bt.appendChild(btn("ck-l",T.cust,openPanel));
  document.body.appendChild(bar);
  if(fab){fab.remove();fab=null;}
}
function openPanel(){
  var ov=document.createElement("div");ov.className="ck-ov";
  var md=document.createElement("div");md.className="ck-md";md.setAttribute("role","dialog");md.setAttribute("aria-modal","true");md.setAttribute("aria-labelledby","ck-h");
  md.innerHTML='<h2 id="ck-h"></h2>'+
   '<div class="ck-row"><div><b class="n1"></b><p class="d1"></p></div><span class="ck-on"></span></div>'+
   '<div class="ck-row"><div><b class="n2"></b><p class="d2"></p></div><label class="ck-sw"><input type="checkbox" id="ck-ana"><span></span></label></div>'+
   '<div class="ck-bt"></div>';
  md.querySelector("h2").textContent=T.ptitle;md.querySelector(".n1").textContent=T.nec;md.querySelector(".d1").textContent=T.necd;
  md.querySelector(".ck-on").textContent=T.on;md.querySelector(".n2").textContent=T.ana;md.querySelector(".d2").textContent=T.anad;
  var cb=md.querySelector("#ck-ana");cb.checked=get()==="yes";cb.setAttribute("aria-label",T.ana);
  function close(){ov.remove();document.removeEventListener("keydown",esc);}
  function esc(e){if(e.key==="Escape")close();}
  var bt=md.querySelector(".ck-bt");
  bt.appendChild(btn("ck-s",T.none,function(){close();decide("no");}));
  bt.appendChild(btn("ck-p",T.save,function(){close();decide(cb.checked?"yes":"no");}));
  ov.appendChild(md);ov.addEventListener("click",function(e){if(e.target===ov)close();});
  document.addEventListener("keydown",esc);
  document.body.appendChild(ov);cb.focus();
}
function showFab(){
  if(fab)return;
  fab=document.createElement("button");fab.type="button";fab.className="ck-fab";fab.textContent="🍪";
  fab.title=T.manage;fab.setAttribute("aria-label",T.manage);fab.onclick=openPanel;
  document.body.appendChild(fab);
}
function init(){if(get())showFab();else showBar();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
