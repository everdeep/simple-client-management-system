npm ci

# Setup the frontend server
(cd frontend && corepack enable && yarn install) &

# Setup the backend server
(cd backend && npm ci && cp .env.template .env) &

wait