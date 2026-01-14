FROM node:22.14.0-bookworm AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
# COPY selected item for production use

FROM node:22.14.0-slim
WORKDIR /app

# Install curl (and clean up to keep image small)
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
    
COPY --from=build /app /app

# Set environment variable placeholder (will be replaced during build)
ENV ENVIRONMENT=BUILD_CMD

# Copy entrypoint script
RUN mv /app/entrypoint.sh /entrypoint.sh \
    && chmod +x /entrypoint.sh

# Copy Build Info
RUN mv /app/build_info /build_info

# Expose port 3000
EXPOSE 3000

# Use entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
