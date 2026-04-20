// 価格フェーズ切替: 2026-04-21 00:00 JST 以降は通常価格(¥68,000)に切り替え
(function () {
  'use strict';

  const switchTime = new Date('2026-04-21T00:00:00+09:00').getTime();

  // URLクエリで強制切替できる(?phase=early / ?phase=regular): テスト用
  const forcePhase = new URLSearchParams(window.location.search).get('phase');

  let useRegular = false;
  if (forcePhase === 'regular') {
    useRegular = true;
  } else if (forcePhase === 'early') {
    useRegular = false;
  } else {
    useRegular = Date.now() >= switchTime;
  }

  if (useRegular) {
    document.body.classList.add('is-regular');
  }
})();

// スクロールに応じて要素をふわっと表示する
(function () {
  'use strict';

  // IntersectionObserver が使えないブラウザ(ごく稀)では即時表示
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 1回だけ発火
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
    observer.observe(el);
  });
})();
