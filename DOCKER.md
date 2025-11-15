# Docker Setup Guide

This guide explains how to use Docker to run the Shibatype application locally.

## Prerequisites

- Docker installed on your system
- Docker Compose installed (usually comes with Docker Desktop)

## Quick Start

1. **Create environment files**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Server Configuration
   PORT=3000
   URI=mongodb://localhost:27017/shibatype
   TEST_URI=mongodb://localhost:27017/shibatype-test

   # Client Configuration
   VITE_SERVER_URL=http://localhost:3000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

2. **Build and start containers**

   ```bash
   docker-compose up --build
   ```

   This will:
   - Build both client and server Docker images
   - Start the server on port 3000
   - Start the client on port 80

3. **Access the application**

   - Frontend: http://localhost
   - Backend API: http://localhost:3000

## Docker Commands

### Build images

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build server
docker-compose build client
```

### Start containers

```bash
# Start in foreground
docker-compose up

# Start in background
docker-compose up -d

# Start with rebuild
docker-compose up --build
```

### Stop containers

```bash
# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### View logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs server
docker-compose logs client

# Follow logs
docker-compose logs -f
```

### Execute commands in containers

```bash
# Server container
docker-compose exec server sh

# Client container
docker-compose exec client sh
```

## Individual Container Management

### Build individual images

```bash
# Build client image
docker build -t shibatype-client ./client

# Build server image
docker build -t shibatype-server ./server
```

### Run individual containers

```bash
# Run server
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e URI=your_mongodb_uri \
  shibatype-server

# Run client
docker run -p 80:80 \
  -e VITE_SERVER_URL=http://localhost:3000 \
  shibatype-client
```

## Development Mode

For development with hot-reload, you may want to mount volumes:

```yaml
# In docker-compose.yml, volumes are already configured for server
# Uncomment the volumes section if you want live code updates
```

Note: The current setup uses production builds. For true hot-reload development, run the services locally without Docker.

## Troubleshooting

### Port already in use

If port 80 or 3000 is already in use, modify the ports in `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Change client port
  - "3001:3000"  # Change server port
```

### MongoDB connection issues

Ensure your MongoDB URI is correct and accessible. For local MongoDB:

```bash
# Start MongoDB locally (if not using Docker)
mongod

# Or use MongoDB Atlas connection string
URI=mongodb+srv://user:password@cluster.mongodb.net/shibatype
```

### Environment variables not loading

Make sure your `.env` file is in the root directory and contains all required variables.

### Container won't start

Check logs for errors:

```bash
docker-compose logs server
docker-compose logs client
```

## Production Considerations

For production deployment:

1. Remove volume mounts from `docker-compose.yml`
2. Use environment-specific `.env` files
3. Set up proper secrets management
4. Configure reverse proxy (nginx/traefik)
5. Set up health checks and monitoring
6. Use Docker secrets or external secret management

