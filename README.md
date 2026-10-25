# site/ — Still Goods · 스틸 굿즈 기록 페이지(002 공개 사이트)

002 위탁판매 스토어의 **공개 기록 페이지**다. 정적 HTML 하나가 `public/summary.json` 을 읽어 숫자를 **글자 그대로** 보이고(셈 0 · 반올림 0), 면책 세 조각과 스토어로 가는 링크 하나를 둔다. 통합 사이트(groostudio.com) 카드는 이 페이지의 `groo.json`(선언문)과 `public/summary.json`(공개 숫자)을 읽는다.
규약: `C:\Users\PC\trading-bot-design\design-notes\통합사이트_프로젝트등록_규약.md` 5판(읽기만). 디자인 원본: `design/기록페이지_시안.html`.

## 들어 있는 것

| 파일 | 하는 일 | 공개 저장소에 |
|---|---|---|
| `index.html` | 기록 페이지 한 장(1280×800 · 폰 너비). 글은 전부 `textContent` 로만 넣는다 | 올림 |
| `assets/style.css` · `assets/app.js` | 겉모습 한 벌 · 숫자 읽기와 LED(SVG 경로 — 글꼴 파일 없음) | 올림 |
| `assets/groo/icon-1024.webp` | 카드 아이콘 1024×1024(글자 0 · 바탕 `#121418` = accent) | 올림 |
| `assets/groo/shot.webp` | 카드 화면 그림 1280×800 — 숫자가 없는 첫 밤 전(—) 화면 | 올림 |
| `assets/demo/summary.json` | `?demo=1` 예시 숫자(로컬 `localhost` · `127.0.0.1` 에서만 읽힌다) | 올려도 됨(바깥에서는 안 읽힘) |
| `public/summary.json` | **밤 배치가 덮어쓰는 단 하나의 파일.** 지금은 첫 밤 전 상태(day 0) | 올림 |
| `groo.json` | 통합 사이트 선언문(규약 2-1). **BUILDING 동안은 `public_json` · `figure` · `facts` 세 칸이 없다**(총책임 결정 2026-10-24 — 카드에 '0건 · 운영 0일'이 보이지 않게) | 올림 |
| `groo.D0.json` | D0 에 쓸 완성본(세 칸 포함 · count 꼴 2-4). D0 때 `groo.json` 으로 바꾸고 `status` ACTIVE · `started` 채움 | 안 올려도 됨 |
| `config.json` | `store_url` — 장터 주소 하나. 지금은 `#`(링크가 흐리게 선다) | 올림 |
| `.nojekyll` | GitHub Pages 가 Jekyll 을 돌리지 않게 | 올림 |
| `LICENSES.md` | 글꼴(OFL) · 그림 · 라이브러리 | 올림 |
| `check.py` | 규약 검사 여덟 흉내(아래) | 안 올려도 됨 |
| `tools/make_assets.py` | 아이콘 · shot · 캡처 다시 만들기(헤드리스 크롬 + Pillow) | 안 올림 |
| `캡처/` | 확인용 PNG 넷 + 목록 | 안 올림 |

## 이 PC 에서 미리 보기

```bash
python -m http.server 8801 --bind 127.0.0.1 --directory site
```

- 빈 상태: http://127.0.0.1:8801/ · 예시 숫자: http://127.0.0.1:8801/?demo=1 · shot 찍는 화면: http://127.0.0.1:8801/?shot=1 (LED 블록 · 작은 줄 · 번호 002 · 출처 · 라이선스 줄을 감추고 LED 자리에 얇은 선 하나 — 숫자 꼴 0. 꺼진 LED 틀도 카드 크기에서 '888'로 읽혀 같이 감춘다). 두 꼬리 모두 로컬에서만 먹는다.
- 포트 **8850~8870 은 쓰지 않는다**(통합 사이트 미리보기 자리). 8801 이 막혀 있으면 8802 처럼 그 밖의 번호로.
- `file://` 로 열면 JSON 을 못 읽어 '숫자를 불러오지 못함'이 뜬다 — 서버로 연다.

## 화면 규칙(한 장)

| 상황 | 화면 |
|---|---|
| `summary.json` 이 없음(404) 또는 `day` 가 0 | 꺼진 LED 가운데 — · `아직 판매 기록이 없습니다. 운영 시작 후 기록이 표시됩니다.`(화면 글 · aria 둘 다) |
| 값이 있음 | LED 에 `orders_total` 숫자 글자만 · `운영 일수 {day}일 · 판매 상품 수 {listings_live}개 · {as_of 를 ○월 ○일로} 기준` |
| 값 꼴이 어긋남(정수 아님 · 음수 · 8자리 이상 · 지수 꼴) | 그 자리만 — (규약 4-2). `as_of` 꼴이 어긋나면 그 조각만 뺌 |
| 서버 오류 · JSON 깨짐 | 꺼진 LED · `숫자를 불러오지 못함` |

- 화면 글은 `docs/문구_통합본.md` K절(오너 확정 2026-10-25)이 원본이다: 제목 `판매 기록` · 설명 `실제 판매와 운영 현황을 숫자로 기록합니다.` · 숫자 이름 `판매 건수` · `운영 일수` · `판매 상품 수` · 시작 전 문구. 고정 문구 `실제 판매 기록 · 투자 아님 · 광고 아님` 은 규약 2-5 그대로. 바꿀 때는 K절부터 고친다.
- `groo.json` · `groo.D0.json` 의 글 칸(`facts` 의 `올린 상품` · `figure.label` 등)은 통합사이트에 얼려 둔 값이라 여기서 따로 고치지 않는다.

- 바꾸는 것은 꼴뿐이다: `2026-11-20` → `11월 20일`(앞 0 만 뗌). 반올림 · 천 단위 쉼표 · 셈 0.
- 링크는 스토어로 가는 **하나**. `config.json` 의 `store_url` 이 `https://` 주소일 때만 살아난다(새 탭 · `noopener`).
- 광고 · 가격 · 상품 이름 · 상품 사진 · '구매' · '할인' 0. 면책은 `실제 판매 기록 · 투자 아님 · 광고 아님`(규약 2-5 `sales`).

## GitHub Pages 에 올리기(오너 몫 — 화면 메뉴 이름 그대로)

1. **새 공개 저장소**: github.com 오른쪽 위 **+** → **New repository** → Repository name `still-goods` → **Public** → **Create repository**. (엔진 저장소 `groo-002` 는 비공개 그대로. 기록 페이지만 따로 공개한다.)
2. **파일 올리기**: 이 `site/` 폴더의 "올림" 표시 파일들을 그 저장소 **뿌리**에 넣는다(`site/` 라는 폴더째가 아니라 안의 내용을 뿌리에). 명령 줄로:
   ```bash
   git clone https://github.com/26rapper/still-goods.git C:\Users\PC\still-goods
   ```
   그 다음 `site\` 의 내용(캡처 · tools · check.py 빼고)을 `C:\Users\PC\still-goods\` 로 복사 → `git add -A` → `git commit -m "기록 페이지 첫 판"` → `git push`.
3. **Pages 켜기**: 저장소 → **Settings** → 왼쪽 **Pages**(Code and automation 아래) → **Build and deployment** → **Source**: `Deploy from a branch` → **Branch**: `main` · 폴더 `/ (root)` → **Save**.
   - 폴더 메뉴에는 `/ (root)` 와 `/docs` 둘만 있다. `site/` 폴더는 고를 수 없다 — 그래서 2번에서 내용을 뿌리에 둔다.
   - 1~2분 뒤 같은 화면 위에 "Your site is live at https://26rapper.github.io/still-goods/" 가 뜬다. **Enforce HTTPS** 에 표시가 있는지 본다.
4. **확인**: `https://26rapper.github.io/still-goods/` · `…/groo.json` · `…/public/summary.json` · `…/assets/groo/icon-1024.webp` · `…/assets/groo/shot.webp` 가 200 으로 열린다.
5. **기획에 보내기**: 선언문 주소 한 줄 `https://26rapper.github.io/still-goods/groo.json`(규약 6-9). 기획이 검사 여덟을 손으로 보고 `projects.json` 줄을 넣는다.
6. (통합 사이트가 열린 뒤) 저장소 첫 화면 오른쪽 **About** 의 ⚙ → **Topics** 에 `groo-studio` 를 넣는다 → 밤마다 저절로 검사된다(규약 5절 B).

## 밤 배치 — `summary.json` 하나만 바꿔 push

```
21:20  엔진(src/)  python -m groo002 export --out C:\Users\PC\still-goods\public\summary.json
          └ 여섯 칸만 낸다 · validate_summary 를 지나야 파일이 생긴다 · 실패하면 어제 파일 그대로(push 안 함)
       공개 저장소 클론에서
          git add public/summary.json
          git commit -m "summary 2026-11-20"
          git push origin main
       GitHub Pages 가 1분쯤 뒤 새 파일을 낸다 → 기록 페이지 · 통합 사이트 카드가 다음 읽기 때 새 숫자를 보인다
```

- 밤 배치가 건드리는 파일은 `public/summary.json` **하나뿐**이다. `index.html` · `groo.json` · 그림은 손으로만 바꾼다(선언문이 바뀌면 기획 재검토 → 다음 검사를 지나야 카드가 바뀐다 — 규약 원칙 2).
- 페이지는 `cache: 'no-store'` 로 읽는다. 브라우저 캐시는 쌓이지 않는다.
- 첫 밤 전(지금)의 `public/summary.json` 은 손으로 둔 빈 상태 파일이다. `started` 칸이 없다(D0 를 모르므로 "모름" 대신 칸을 뺐다 — 규약은 `summary.json` 의 `started` 를 보지 않는다). 엔진 `validate_summary` 는 `started` 를 요구하므로, 엔진이 첫 밤에 덮어쓰는 파일부터는 `started` 가 들어간다.

## D0(첫 상품 공개일)에 바꾸는 것

1. `groo.D0.json` → `groo.json` 으로 바꾸고(`public_json` · `figure` · `facts` 세 칸이 들어온다) `"status": "ACTIVE"` · `"started": "YYYY-MM-DD"` 를 채운다. → 기획에 다시 알린다(재검토 뒤 카드가 바뀜).
2. `config.json`: `store_url` 을 장터 주소(`https://…`)로. 링크가 살아난다.
3. 엔진 밤 배치를 켠다(위 흐름). `python site/check.py` 가 통과하는지 본다.

## 규약 검사 여덟 — 올리기 전에 스스로 확인

`python site/check.py` 가 아래를 흉내 낸다(통과/실패를 줄마다 쉬운 말로, 하나라도 실패면 끝 코드 1). 눈으로만 볼 수 있는 것은 따로 적었다.

- [ ] **1 선언문** — `groo.json` 이 UTF-8 JSON 하나 · 8KB 이하 · 규약에 없는 칸 0
- [ ] **2 꼴** — 필수 칸 · `no` 세 자리 · `name` 영문 24자 · `line` 30자 · `kind` · `status` · `icon { src, frame }` · `accent` · 글자 수. BUILDING 이면 `public_json` · `figure` · `facts` 가 **없음**. `groo.D0.json` 은 세 칸이 있고 count 칸(`value` · `unit` · `label` · `small` · `as_of`) · `facts` 넷까지가 맞음
- [ ] **3 낱말** — 글 칸 전부 + 기록 페이지 보이는 글에 구매 · 할인 · 가격 · 특가 · 쿠폰 · 최저가 · 무료배송 · 주문하 · 금액 꼴 · 느낌표 · 말 걸기 · 권유 · 과장 · 수익 보장 0. **눈으로**: 상품 이름이 글에 없는지
- [ ] **4 면책 · 돈** — `money: true` · `money_kind: "sales"` · `notice` 가 `실제 판매 기록 · 투자 아님 · 광고 아님` 을 글자 그대로 품음
- [ ] **5 주소** — 주소 칸 전부 `https://26rapper.github.io/…` · 가리키는 파일이 다 있음. **올린 뒤**: 실제로 200 으로 열리는지(넘겨주기 0)
- [ ] **6 그림** — 아이콘 WebP 1024×1024 · 300KB 이하 · 글자 0 / shot WebP 1280×800 · 300KB 이하 · `?shot=1` 로 찍어 숫자 꼴 0(LED 틀 · 작은 줄 · 번호 · 출처 줄 없음). **눈으로**: shot 을 카드 크기(작게)로도 보며 숫자로 읽히는 모양 · 상품 사진 · 가격 없음
- [ ] **7 숫자 칸** — `summary.json` 에 `orders_total` · `day` · `as_of` · `listings_live` 가 있고 0 이상 정수 · 7자리 이하 · 날짜 꼴
- [ ] **8 번호** — `no: "002"` 가 groo-site `projects.json` 의 다른 줄과 겹치지 않음(**여기서는 못 봄** — 기획이 본다)
- [ ] **페이지** — 링크 하나 · `textContent` 만 · 바깥 요청은 Google Fonts 둘뿐 · 열쇠 꼴 0 · 콘솔 오류 0(내장 브라우저로 빈 상태 · `?demo=1` 둘 다)

## 다시 만들기(아이콘 · shot · 캡처)

```bash
python site/tools/make_assets.py all
```

헤드리스 크롬(이 PC 의 Google Chrome)으로 찍고 Pillow 로 WebP 로 바꾼다. 시작 전에 pytest 가 돌고 있으면 멈춘다(PC 자원 규칙 — 무거운 일은 한 번에 하나). `shot` · `captures` 는 미리보기 서버(8801)가 떠 있어야 한다. 아이콘만: `icon`, shot 만: `shot`(`?shot=1` 화면을 찍는다).
