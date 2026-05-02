(function () {
  'use strict';

  function mp() { return typeof mixpanel !== 'undefined' ? mixpanel : null; }
  function path() { return window.location.pathname; }

  // ── CTA Clicked ──────────────────────────────────────────────────────────────
  // Fires on every <a> or <button> with class "cta" or data-cta attribute.
  function initCTATracking() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-cta], a.cta, button.cta');
      if (!el) return;
      var m = mp();
      if (!m) return;
      var label = el.getAttribute('data-cta') || el.textContent.trim().slice(0, 80);
      var dest = el.getAttribute('href') || '';
      m.track('CTA Clicked', {
        cta_label: label,
        cta_destination: dest,
        page_path: path()
      });
    });
  }

  // ── Form Submitted ────────────────────────────────────────────────────────────
  // Fires on any <form> submit. The contact form already tracks via inline JS;
  // this catches any other forms and de-dupes by checking a flag.
  function initFormTracking() {
    document.addEventListener('submit', function (e) {
      var form = e.target;
      if (!form || form._sapTracked) return;
      form._sapTracked = true;
      var m = mp();
      if (!m) return;
      m.track('Form Submitted', {
        form_id: form.id || form.getAttribute('name') || 'unknown',
        page_path: path()
      });
    }, true);
  }

  // ── Assessment Started ────────────────────────────────────────────────────────
  // Fires once when the user clicks the first Next button on /assessment.html.
  function initAssessmentTracking() {
    if (path().indexOf('assessment') === -1) return;
    var started = false;
    document.addEventListener('click', function (e) {
      if (started) return;
      var btn = e.target.closest('#nextBtn, #submitBtn');
      if (!btn) return;
      started = true;
      var m = mp();
      if (m) m.track('Assessment Started', { page_path: path() });
    });
  }

  // ── Article Read (75% scroll depth via IntersectionObserver) ─────────────────
  function initArticleReadTracking() {
    if (path().indexOf('/insights/') === -1) return;
    var article = document.querySelector('article');
    if (!article) return;

    var fired = false;

    // Create a sentinel div at the 75% mark of the article
    var sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;left:0;width:1px;height:1px;pointer-events:none;';

    var applyPosition = function () {
      var rect = article.getBoundingClientRect();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      sentinel.style.top = Math.round(scrollTop + rect.top + rect.height * 0.75) + 'px';
    };

    document.body.style.position = 'relative';
    document.body.appendChild(sentinel);
    applyPosition();
    window.addEventListener('resize', applyPosition);

    var observer = new IntersectionObserver(function (entries) {
      if (fired) return;
      if (entries[0].isIntersecting) {
        fired = true;
        observer.disconnect();
        var m = mp();
        if (m) {
          m.track('Article Read', {
            article_title: document.title,
            article_path: path(),
            scroll_depth: '75%'
          });
        }
      }
    });

    observer.observe(sentinel);
  }

  // ── Pricing Viewed (10-second dwell) ─────────────────────────────────────────
  function initPricingDwellTracking() {
    if (path().indexOf('pricing') === -1) return;
    var fired = false;
    setTimeout(function () {
      if (fired) return;
      fired = true;
      var m = mp();
      if (m) m.track('Pricing Viewed', { dwell_seconds: 10, page_path: path() });
    }, 10000);
  }

  // ── Insights filter button tracking (resolves Mixpanel "dead clicks") ─────────
  // The filter buttons are functional (they filter DOM cards) but Mixpanel's
  // heuristic flagged them as dead clicks because no navigation occurs.
  // Explicitly tracking the interaction resolves the false positives.
  function initFilterTracking() {
    var filters = document.getElementById('topicFilters');
    if (!filters) return;
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      var m = mp();
      if (m) {
        m.track('Insights Filtered', {
          filter: btn.getAttribute('data-filter') || 'all',
          page_path: path()
        });
      }
    });
  }

  function init() {
    initCTATracking();
    initFormTracking();
    initAssessmentTracking();
    initArticleReadTracking();
    initPricingDwellTracking();
    initFilterTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
