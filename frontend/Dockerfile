FROM node:20-alpine AS base

WORKDIR /app/frontend
COPY package*.json ./
#COPY next.config.js ./
#COPY node_modules ./node_modules
RUN npm ci --verbose
COPY . .
RUN npm run build


# Production Stage
FROM node:20-alpine AS PRODUCTION_STAGE
WORKDIR /app/frontend
COPY --from=base /app/frontend/package*.json ./
COPY --from=base /app/frontend/next.config.mjs ./
COPY --from=base /app/frontend/.next ./.next
COPY --from=base /app/frontend/public ./public
COPY --from=base /app/frontend/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3001
ENV PORT=3001
CMD ["npm", "start"]