(function () {
  'use strict';

  var CONSENT_KEY = 'sap_analytics_consent';
  var GA_ID = 'G-YKTHF2B8VJ';
  var MP_TOKEN = '11313cd5aafb3ac2150a3be3c3846f37';
  var MP_LIB = 'https://cdn.jsdelivr.net/npm/mixpanel-browser@2.75.0/dist/mixpanel.min.js';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(v) {
    try { localStorage.setItem(CONSENT_KEY, v); } catch (e) { /* unavailable */ }
  }

  function loadGA() {
    if (window._sapGA) return;
    window._sapGA = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  var ALLOWED_HOSTS = ['solutionsadvisorypartners.com', 'www.solutionsadvisorypartners.com'];

  function isProductionHost() {
    var h = window.location.hostname;
    return ALLOWED_HOSTS.indexOf(h) !== -1;
  }

  function loadMixpanel() {
    if (window._sapMP) return;
    if (!isProductionHost()) {
      console.warn('[SAP Analytics] Mixpanel skipped on non-production host:', window.location.hostname);
      return;
    }
    window._sapMP = true;

    (function (f, b) {
      if (!b.__SV) {
        var e, g, i, h;
        window.mixpanel = b; b._i = [];
        b.init = function (e, f, c) {
          function g(a, d) {
            var b = d.split('.'); 2 == b.length && ((a = a[b[0]]), (d = b[1]));
            a[d] = function () { a.push([d].concat(Array.prototype.slice.call(arguments, 0))); };
          }
          var a = b;
          'undefined' !== typeof c ? (a = b[c] = []) : (c = 'mixpanel');
          a.people = a.people || [];
          a.toString = function (a) { var d = 'mixpanel'; 'mixpanel' !== c && (d += '.' + c); a || (d += ' (stub)'); return d; };
          a.people.toString = function () { return a.toString(1) + '.people (stub)'; };
          i = 'disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove'.split(' ');
          for (h = 0; h < i.length; h++) g(a, i[h]);
          var j = 'set set_once union unset remove delete'.split(' ');
          a.get_group = function () {
            function b(c) { d[c] = function () { call2_args = arguments; call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); a.push([e, call2]); }; }
            for (var d = {}, e = ['get_group'].concat(Array.prototype.slice.call(arguments, 0)), c = 0; c < j.length; c++) b(j[c]);
            return d;
          };
          b._i.push([e, f, c]);
        };
        b.__SV = 1.2;
        e = f.createElement('script'); e.type = 'text/javascript'; e.async = !0;
        e.src = MP_LIB;
        g = f.getElementsByTagName('script')[0]; g.parentNode.insertBefore(e, g);
      }
    })(document, window.mixpanel || []);

    mixpanel.init(MP_TOKEN, {
      autocapture: true,
      track_pageview: true,
      record_sessions_percent: 100,
      record_heatmap_data: true
    });
  }

  function loadAnalytics() {
    loadGA();
    loadMixpanel();
  }

  function removeBanner() {
    var el = document.getElementById('sap-consent-banner');
    if (el) {
      el.style.transform = 'translateY(100%)';
      setTimeout(function () { el.remove(); }, 300);
    }
  }

  function showBanner() {
    if (document.getElementById('sap-consent-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'sap-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.style.cssText =
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
      'background:#0f172a;border-top:1px solid #334155;' +
      'padding:1rem 1.5rem;display:flex;flex-wrap:wrap;align-items:center;' +
      'justify-content:space-between;gap:1rem;font-family:Inter,system-ui,sans-serif;' +
      'transform:translateY(100%);transition:transform .3s ease;';

    var text = document.createElement('p');
    text.style.cssText = 'color:#cbd5e1;font-size:.875rem;margin:0;max-width:48rem;line-height:1.5;';
    text.innerHTML =
      'We use cookies and analytics (Google Analytics, Mixpanel) to understand how visitors use our site. ' +
      'By accepting, you consent to analytics tracking and session recording. ' +
      '<a href="/privacy.html" style="color:#38bdf8;text-decoration:underline;">Privacy Policy</a>';

    var btns = document.createElement('div');
    btns.style.cssText = 'display:flex;gap:.5rem;flex-shrink:0;';

    var decline = document.createElement('button');
    decline.textContent = 'Decline';
    decline.style.cssText =
      'padding:.5rem 1.25rem;border:1px solid #475569;color:#e2e8f0;' +
      'background:transparent;border-radius:.375rem;font-size:.875rem;cursor:pointer;font-family:inherit;';
    decline.addEventListener('click', function () {
      setConsent('declined');
      removeBanner();
    });

    var accept = document.createElement('button');
    accept.textContent = 'Accept';
    accept.style.cssText =
      'padding:.5rem 1.25rem;border:none;color:#0f172a;' +
      'background:#38bdf8;border-radius:.375rem;font-size:.875rem;cursor:pointer;' +
      'font-weight:600;font-family:inherit;';
    accept.addEventListener('click', function () {
      setConsent('accepted');
      loadAnalytics();
      removeBanner();
    });

    btns.appendChild(decline);
    btns.appendChild(accept);
    banner.appendChild(text);
    banner.appendChild(btns);
    document.body.appendChild(banner);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.style.transform = 'translateY(0)';
      });
    });
  }

  var consent = getConsent();
  if (consent === 'accepted') {
    loadAnalytics();
  } else if (consent !== 'declined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
