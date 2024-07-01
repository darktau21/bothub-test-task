FROM node:18-alpine As development

WORKDIR /app
COPY --chown=node:node package*.json ./

RUN npm ci
COPY --chown=node:node . .
USER node


FROM node:18-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build
ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node


FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD [ "node", "dist/main.js" ]