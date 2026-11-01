/* =========================================================
   HDJ – Programme agences immobilières
   Lien à mettre dans le QR code de chaque agence :
   https://hdj-demenagements.fr/guide-demenagement/?agence=SLUG
   1) Ajouter l'agence ci-dessous :  "slug": "Nom affiché"
   2) Le guide affiche « Offert par votre agence … »
   3) Les demandes de devis indiquent l'agence qui a envoyé le client
   ========================================================= */
(function () {
  var AGENCES = {
    "exemple-agence": "Agence Exemple Mitry-Mory"
    // "century21-mitry": "Century 21 Mitry-Mory",
  };

  var KEY = 'hdj_agence';
  var store = {
    get: function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set: function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  };

  var slug = null;
  try { slug = new URLSearchParams(location.search).get('agence'); } catch (e) {}
  if (slug) {
    slug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 60);
    if (slug) store.set(slug);
  }
  var fromLink = !!slug; // le bandeau ne s'affiche que si on arrive avec un lien d'agence
  slug = slug || store.get();
  if (!slug) return;

  var nom = AGENCES[slug] || slug.split('-').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');

  // Les demandes de devis (FormSubmit) indiquent l'agence partenaire
  var origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function (url, opts) {
      try {
        if (typeof url === 'string' && url.indexOf('formsubmit.co') !== -1 && opts && typeof opts.body === 'string') {
          var d = JSON.parse(opts.body);
          d['Agence partenaire'] = nom + ' (' + slug + ')';
          if (d._subject) d._subject += ' – via ' + nom;
          opts.body = JSON.stringify(d);
        }
      } catch (e) {}
      return origFetch.apply(this, arguments);
    };
  }

  // Bandeau de bienvenue sur la page Guide
  function banner() {
    var page = document.querySelector('[data-route="guide"]');
    if (!fromLink || !page || document.getElementById('agence-welcome')) return;
    var en = (document.documentElement.lang || '').indexOf('en') === 0;
    var safe = nom.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
    var root = location.pathname.indexOf('/en/') !== -1 ? '../../' : '../';
    var el = document.createElement('section');
    el.id = 'agence-welcome';
    el.setAttribute('aria-label', en ? 'Welcome' : 'Bienvenue');
    el.innerHTML =
      '<div class="aw-in">' +
      '<h2>' + (en ? 'Thank you for your trust! 🎉' : 'Merci pour votre confiance ! 🎉') + '</h2>' +
      '<p class="aw-txt">' + (en ? 'Wishing you a stress-free move, here is our moving guide and checklist.'
                 : 'En vous souhaitant un déménagement serein, voici notre guide et notre check-list.') + '</p>' +
      '<p class="aw-from">' + (en ? 'Offered by your agency ' : 'Offert par votre agence ') + '<strong>' + safe + '</strong></p>' +
      '<div class="aw-btns"><a class="aw-b1" href="#guide-checklist">' + (en ? '⬇ Free checklist' : '⬇ Ma check-list gratuite') + '</a>' +
      '<a class="aw-b2" href="' + root + (en ? 'en/contact/' : 'contact/') + '">' + (en ? 'Free quote' : 'Devis gratuit') + '</a>' +
      '<a class="aw-b3" href="tel:+33651299910">06 51 29 99 10</a></div></div>';
    var css = document.createElement('style');
    css.textContent =
      '#agence-welcome{background:linear-gradient(135deg,#193E65,#0B1F3A);color:#fff;padding:clamp(1.6rem,4vw,2.6rem) 1.25rem}' +
      '#agence-welcome .aw-in{max-width:900px;margin:0 auto;text-align:center}' +
      '#agence-welcome .aw-from{margin-top:.7rem!important;font-size:.9rem;color:#BFD3EC!important}' +
      '#agence-welcome h2{color:#fff;font-size:clamp(1.5rem,3.4vw,2.3rem);line-height:1.15;margin:0 0 .6rem}' +
      '#agence-welcome p{color:#E3EBF7;margin:0 auto;max-width:60ch}' +
      '#agence-welcome .aw-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;margin-top:1.2rem}' +
      '#agence-welcome .aw-btns a{display:inline-flex;align-items:center;min-height:48px;padding:0 1.3rem;border-radius:999px;font-weight:700;text-decoration:none}' +
      '#agence-welcome .aw-b1{background:#D62828;color:#fff;box-shadow:0 8px 20px rgba(214,40,40,.35)}#agence-welcome .aw-b2{background:#fff;color:#193E65}' +
      '#agence-welcome .aw-b3{border:2px solid #fff;color:#fff}' +
      '@media (max-width:720px){#agence-welcome{padding-top:3.2rem}}';
    document.head.appendChild(css);
    page.insertBefore(el, page.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner); else banner();
})();
