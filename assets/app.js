/* Still Goods · 스틸 굿즈 — 002 기록 페이지
   public/summary.json 의 값을 글자 그대로 옮긴다(셈 0 · 반올림 0 — 등록 규약 5판 4-2). 꼴이 어긋나면 그리지 않고 — 를 둔다.
   글은 전부 textContent 로만 넣는다(HTML 글자 끼워 넣기 0). LED 는 글꼴이 아니라 SVG 경로(문로그 SEG · SEGP 그대로).
   파일이 없거나(404) day 가 0 이면 운영 시작 전 화면(꺼진 LED + record.preparing 문구). ?demo=1 은 로컬(localhost · 127.0.0.1)에서만 assets/demo/summary.json 을 읽는다.
   화면 글은 docs/문구_통합본.md K절(오너 확정 2026-10-25) 그대로: 판매 기록 · 판매 건수 · 운영 일수 · 판매 상품 수 · 시작 전 문구. */
(function () {
  'use strict';

  var SUMMARY_URL = 'public/summary.json';
  var DEMO_URL = 'assets/demo/summary.json';
  var CONFIG_URL = 'config.json';
  var NS = 'http://www.w3.org/2000/svg';
  var SEG = {'0':'abcdef','1':'bc','2':'abged','3':'abgcd','4':'fgbc','5':'afgcd','6':'afgedc','7':'abc','8':'abcdefg','9':'abfgcd','-':'g',' ':''};
  var SEGP = {a:'M12 4 L48 4 L42 10 L18 10 Z', b:'M50 6 L50 46 L44 42 L44 12 Z', c:'M50 54 L50 94 L44 88 L44 58 Z',
              d:'M12 96 L48 96 L42 90 L18 90 Z', e:'M10 54 L10 94 L16 88 L16 58 Z', f:'M10 6 L10 46 L16 42 L16 12 Z',
              g:'M14 50 L20 45 L40 45 L46 50 L40 55 L20 55 Z'};
  var OFF = 'rgba(243,238,231,.06)';
  var ON = '#f3eee7';
  var REST = 'rgba(243,238,231,.55)';
  var DASH = '—';                       /* — */
  var PREPARING = '아직 판매 기록이 없습니다. 운영 시작 후 기록이 표시됩니다.';   /* 문구_통합본 K record.preparing — 화면 글 · aria 둘 다 */
  var LOAD_FAIL = '숫자를 불러오지 못함';                                        /* 규약 4-2 · 카드판 설계 2-1 */

  function $(id) { return document.getElementById(id); }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }

  /* LED 한 글자 — 일곱 토막. color 가 null 이면 전부 꺼짐 */
  function glyph(ch, color) {
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 60 100');
    svg.setAttribute('aria-hidden', 'true');
    var lit = SEG[ch] || '';
    'abcdefg'.split('').forEach(function (k) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', SEGP[k]);
      p.setAttribute('fill', lit.indexOf(k) >= 0 && color ? color : OFF);
      svg.appendChild(p);
    });
    return svg;
  }
  function drawLed(tokens, lit) {
    var box = $('ledBox');
    clear(box);
    var led = document.createElement('span');
    led.className = lit ? 'led lit' : 'led';
    tokens.forEach(function (t) { led.appendChild(glyph(t.ch, t.color)); });
    box.appendChild(led);
  }
  /* 숫자가 없는 상태 — 꺼진 칸 셋, 가운데만 —. 칸 수로 결과가 새지 않게 늘 세 칸 */
  function ledOff() {
    drawLed([{ch:'8', color:null}, {ch:'-', color:REST}, {ch:'8', color:null}], false);
    document.body.classList.remove('lit');
  }

  /* 규약 4-2 — count 값: JSON 수 · 유한 · 정수 · 0 이상 · String(값)에 e 없음 · 7자리 이하 */
  function okCount(v) {
    if (typeof v !== 'number' || !isFinite(v) || !Number.isInteger(v) || v < 0) return false;
    var s = String(v);
    return !/e/i.test(s) && s.length <= 7;
  }
  /* 규약 4-2 — facts 값: JSON 수 · 유한 · 소수 둘 이하 */
  function okFact(v) {
    if (typeof v !== 'number' || !isFinite(v)) return false;
    var s = String(v);
    if (/e/i.test(s)) return false;
    var dot = s.indexOf('.');
    return dot < 0 || (s.length - dot - 1) <= 2;
  }
  function okDate(s) { return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s); }
  /* 날짜 꼴 — '2026-10-23' 을 '10월 23일' 로. 값은 바꾸지 않고 글자 꼴만 바꾼다(앞 0 만 뗀다) */
  function md(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    return m[2].replace(/^0/, '') + '월 ' + m[3].replace(/^0/, '') + '일';
  }

  function setSmall(day, listings, tail) {
    $('dayV').textContent = day;
    var hasList = listings !== null;
    $('listPiece').hidden = !hasList;
    $('sep2').hidden = !hasList;
    if (hasList) $('listV').textContent = listings;
    var hasTail = tail !== null;
    $('asofPiece').hidden = !hasTail;
    $('sep3').hidden = !hasTail;
    if (hasTail) $('asofPiece').textContent = tail;
  }

  /* 운영 시작 전 · 또는 못 불러옴 — 꺼진 LED 와 한 줄(작은 줄 대신) */
  function showEmpty(msg) {
    ledOff();
    $('figure').setAttribute('aria-label', '판매 건수 ' + DASH + ' ' + msg);
    $('small').hidden = true;
    $('prep').textContent = msg;
    $('prep').hidden = false;
  }

  /* 값이 있는 상태 — 글자 그대로 */
  function showData(S) {
    $('prep').hidden = true;
    $('small').hidden = false;
    var n = S.orders_total;
    if (okCount(n)) {
      var s = String(n);
      drawLed(s.split('').map(function (ch) { return {ch: ch, color: ON}; }), true);
      document.body.classList.add('lit');
      $('figure').setAttribute('aria-label', '판매 건수 ' + s + '건');
    } else {
      ledOff();
      $('figure').setAttribute('aria-label', '판매 건수 ' + DASH);
    }
    var day = okCount(S.day) ? String(S.day) : DASH;
    var listings = okFact(S.listings_live) ? String(S.listings_live) : DASH;
    var tail = okDate(S.as_of) ? md(S.as_of) + ' 기준' : null;
    setSmall(day, listings, tail);
  }

  function isLocal() { return /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname); }

  /* ?shot=1(로컬에서만) — 카드 화면 그림(shot)을 찍는 순간: body.shot 으로 LED 블록(토막 · 단위) · 작은 줄 · 번호 002 · 출처 · 라이선스 줄을 감추고
     LED 자리에 얇은 선 하나를 둔다(숫자 꼴 0 — 꺼진 LED 유령 토막도 카드 크기에서 숫자로 읽힌다). 감추는 규칙은 style.css 의 body.shot 묶음 */
  function shotMode() {
    var q = new URLSearchParams(location.search);
    if (q.get('shot') === '1' && isLocal()) document.body.classList.add('shot');
  }

  function loadSummary() {
    var q = new URLSearchParams(location.search);
    var demo = q.get('demo') === '1' && isLocal();
    if (demo) {
      document.body.classList.add('demo');
      $('label').textContent = '예시 화면 · 판매 기록';
    }
    fetch(demo ? DEMO_URL : SUMMARY_URL, {cache: 'no-store'}).then(function (r) {
      if (r.status === 404) return null;
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    }).then(function (S) {
      if (S === null || typeof S !== 'object' || Array.isArray(S)) return showEmpty(PREPARING);
      if (S.day === 0) return showEmpty(PREPARING);
      showData(S);
    }).catch(function () {
      showEmpty(LOAD_FAIL);
    });
  }

  /* 스토어로 가는 링크 하나 — config.json 의 store_url 이 https 주소일 때만 산다 */
  function loadConfig() {
    var a = $('go');
    a.addEventListener('click', function (e) { if (a.classList.contains('is-off')) e.preventDefault(); });
    fetch(CONFIG_URL, {cache: 'no-store'}).then(function (r) { return r.ok ? r.json() : null; }).then(function (c) {
      var u = c && typeof c.store_url === 'string' ? c.store_url : '#';
      if (/^https:\/\/[^\s"'<>]+$/.test(u)) {
        a.href = u;
        a.target = '_blank';
        a.rel = 'noopener';
        a.classList.remove('is-off');
        a.removeAttribute('aria-disabled');
      }
    }).catch(function () {});
  }

  ledOff();
  shotMode();
  loadConfig();
  loadSummary();
})();
