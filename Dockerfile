# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=21.7.3
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js/Prisma"

# Node.js/Prisma app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp openssl pkg-config python-is-python3

# Copy package files and install dependencies
COPY --link package-lock.json package.json ./
RUN npm ci

# Install Prisma Client
COPY ./prisma ./prisma
RUN npm install @prisma/client

# Copy application code
COPY --link . .

# Copy the .env file and set environment variables for Prisma
COPY .env .env
RUN export $(cat .env | xargs) && npx prisma generate

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application from build stage
COPY --from=build /app /app

# Expose the port and set the default command
EXPOSE 3000
CMD ["node", "index.js"]
