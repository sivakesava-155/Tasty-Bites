# React Tasty Bites (Frontend)

## Centralized API Configuration

All frontend API calls now use a single source of truth in `src/config/api.js`.

- `VITE_API_BASE_URL` controls REST API endpoints (default: `https://spring-apigateway.onrender.com/api`)
- `VITE_ASSET_BASE_URL` controls image/static asset host (default: `https://spring-apigateway.onrender.com`)

Create a root `.env` file:

```bash
cp .env.example .env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ASSET_BASE_URL=http://localhost:5000
```

For gateway usage:

```env
VITE_API_BASE_URL=https://spring-apigateway.onrender.com/api
VITE_ASSET_BASE_URL=https://spring-apigateway.onrender.com
```

## Run Frontend

```bash
npm install
npm run dev
```
