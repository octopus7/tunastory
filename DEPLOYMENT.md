# Cloudflare Pages 배포

이 저장소는 Astro 정적 사이트로 빌드되며 Cloudflare Pages의 Git 연동으로 자동 배포된다.

## Pages 설정

| 항목 | 값 |
|---|---|
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | 저장소 루트 |

## 로컬 확인

```bash
npm install
npm run check
npm run build
npm run preview
```

`main` 브랜치에 푸시하면 Cloudflare Pages가 자동으로 다시 빌드하고 배포한다.
