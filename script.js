// 価格フェーズ切替: 3フェーズ
//  - 早期(¥48,000): 〜2026-04-20 23:59 JST
//  - 通常(¥68,000): 2026-04-21 00:00 〜 2026-04-28 23:59 JST
//  - 最終(¥78,000): 2026-04-29 00:00 〜 2026-05-19 23:59 JST
(function () {
  'use strict';

  const regularSwitchTime = new Date('2026-04-21T00:00:00+09:00').getTime();
  const finalSwitchTime   = new Date('2026-04-29T00:00:00+09:00').getTime();

  // URLクエリで強制切替: ?phase=early / ?phase=regular / ?phase=final (テスト用)
  const forcePhase = new URLSearchParams(window.location.search).get('phase');

  let phase;
  if (forcePhase === 'early' || forcePhase === 'regular' || forcePhase === 'final') {
    phase = forcePhase;
  } else {
    const now = Date.now();
    if (now >= finalSwitchTime) {
      phase = 'final';
    } else if (now >= regularSwitchTime) {
      phase = 'regular';
    } else {
      phase = 'early';
    }
  }

  if (phase === 'regular') {
    document.body.classList.add('is-regular');
  } else if (phase === 'final') {
    document.body.classList.add('is-final');
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
