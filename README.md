# Node Sample App

## Requirements
- Node.js >= 20
- npm

## Run locally
```
cp .env.example .env
npm install
npm start
```
App runs on http://localhost:3000

## Endpoints
| Method | Path        | Description   |
|--------|-------------|---------------|
| GET    | /           | App info      |
| GET    | /health     | Health check  |
| GET    | /api/users  | List users    |
| POST   | /api/users  | Create user   |

## Environment variables
| Name     | Default     | Description        |
|----------|-------------|--------------------|
| PORT     | 3000        | App port           |
| NODE_ENV | development | Environment        |

## Deploy
**EC2 + PM2:** `npm install --omit=dev && pm2 start ecosystem.config.js`

**Docker:**
```
docker build -t node-sample-app .
docker run -d -p 3000:3000 --env-file .env node-sample-app
```
Health check URL: `/health`
