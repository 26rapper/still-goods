# LICENSES — site/ (002 Still Goods · 스틸 굿즈 기록 페이지 · 2026-10-24)

`site/` 가 쓰는 남의 글꼴 · 재질 · 라이브러리와 그 라이선스. 쓴 것은 전부 적는다. 여기 없는 것은 쓰지 않았다.
(엔진 `src/` 의 라이브러리는 저장소 뿌리 `LICENSES.md`, 디자인 시안은 `design/LICENSES.md`.)

## 글꼴 — 전부 SIL Open Font License 1.1

| 이름 | 받는 곳 | 라이선스 | 쓴 자리 |
|---|---|---|---|
| IBM Plex Mono(400 · 500) | Google Fonts CDN — https://fonts.google.com/specimen/IBM+Plex+Mono | OFL 1.1 — https://openfontlicense.org/open-font-license-official-text/ | `index.html` 영문 이름 · 번호 002 · 바닥 GROO STUDIO 각인 · 링크 화살표 |
| IBM Plex Sans KR(400 · 500) | Google Fonts CDN — https://fonts.google.com/specimen/IBM+Plex+Sans+KR | OFL 1.1 | `index.html` 한글 전부(작은 이름 · 라벨 · 단위 '건' · 작은 줄 · 면책 · 링크 글 · 출처 · 라이선스 줄) |

- 글꼴 파일을 저장소에 넣지 않았다. 001 문로그와 같이 `fonts.googleapis.com` 한 줄로 받는다(`display=swap`). 못 받으면 시스템 글꼴(Malgun Gothic · Apple SD Gothic Neo · 모노는 Consolas · Menlo)로 선다 — 시스템 글꼴은 각 OS 의 것이라 여기 적지 않는다.
- 방문자 브라우저가 바깥에서 받는 것은 이 글꼴 둘뿐이다(그 밖의 바깥 요청 0 — `check.py` 가 본다).
- OFL 은 글꼴 자체를 따로 파는 것만 막는다. 공개 사이트에 쓰는 것은 된다.

## 재질(텍스처) — CC0 자리

| 이름 | 만든 곳 | 라이선스 | 쓴 자리 |
|---|---|---|---|
| (없음) | — | — | 바깥 재질 파일을 쓰지 않았다 |

- 필름 결은 `index.html` 안의 SVG `feTurbulence` 로 화면 안에서 만든다(문로그와 같은 방법). 파일도, 바깥 출처도 없다.

## 그림 · 도형 — 스튜디오 안에서 그린 것

| 것 | 출처 | 비고 |
|---|---|---|
| `assets/groo/icon-1024.webp` | `design/icon-1024.svg`(디자인 세션이 직접 그림)를 이 PC 의 Google Chrome 헤드리스로 1024×1024 로 찍어 Pillow 로 WebP 로 바꿈(`tools/make_assets.py`) | 바깥 그림 · 글꼴 0. 바탕 `#121418` = `groo.json` 의 `accent` |
| `assets/groo/shot.webp` | 이 페이지의 첫 밤 전(—) 화면을 `?shot=1` 로 1280×800 으로 찍은 것 | 숫자 글자 0(`?shot=1` 이 번호 002 · 출처 · 라이선스 줄을 감춤) · 상품 사진 · 가격 0 |
| LED 일곱 토막 숫자(`assets/app.js` 의 `SEG` · `SEGP`) | GROO STUDIO 001 문로그 `site/index.html` 의 것을 그대로 옮김 | 스튜디오 안 자산. 글꼴이 아니라 SVG 경로 |
| `캡처/*.png` | 같은 방법으로 찍은 확인용 그림 | 공개 저장소에는 올리지 않아도 된다 |

## 라이브러리

| 이름 | 버전 | 라이선스 | 쓰는 곳 |
|---|---|---|---|
| (페이지 안) 없음 | — | — | `index.html` · `style.css` · `app.js` 는 순수 HTML · CSS · JS. 바깥 스크립트 0 |
| Pillow | 12.1.1 | MIT-CMU(HPND 계열) — https://github.com/python-pillow/Pillow/blob/main/LICENSE | `tools/make_assets.py` — PNG → WebP 변환(만들 때만, 페이지에 실리지 않음) |
| Google Chrome(헤드리스) | 이 PC 에 깔린 것 | 구글 이용약관(라이브러리 아님) | `tools/make_assets.py` — SVG · 화면을 PNG 로 찍는 데만 |
| 파이썬 표준 라이브러리 | 3.12 ~ 3.14 | PSF | `check.py` · `tools/make_assets.py` |

## 기록 글의 라이선스(우리가 내는 것)

- 기록 페이지의 글(고정 문구 · 공개 숫자)은 **CC BY-NC-SA 4.0**(001 문로그와 같게). 화면 바닥 줄에 적혀 있다. 상품 사진은 싣지 않는다.
