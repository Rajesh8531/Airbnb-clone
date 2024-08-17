

FROM node:22-alpine3.19

# Use production node environment by default.

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY next.config.mjs /app/

RUN npx prisma generate

RUN npm install

COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run dev
