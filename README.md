# 2024-SCD-notion-api-hands-on

### ✨발표자료 공유✨
https://docs.google.com/presentation/d/1VNTDxJXBx_FMeI0NLLz8xpsagpbIhnsReUzWc7bptfw/edit?usp=sharing
위 링크에서 전체 슬라이드를 확인하실 수 있습니다.

## Initial Setting
1. AWS 보안 자격 증명
```
aws configure
```
2. CostExplorerClient 설치
```
npm install @aws-sdk/client-cost-explorer
```

## env setting
`.env.sample` → `.env`
```
NOTION_TOKEN= 노션 api 토큰
NOTION_PAGE_ID= 노션 공유 url 뒤 id (ex. https://test-api.notion.site/cost-test-{page id}?pvs=4)
```

## How to Run
```
node src/aws-cost-explorer-to-notion.js
```
