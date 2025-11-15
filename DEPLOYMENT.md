# Deployment Guide

This guide covers deploying Shibatype to various platforms.

## Overview

- **Frontend**: Deploy to Vercel (recommended) or any static hosting service
- **Backend**: Deploy to container hosting (Railway, Render, AWS, etc.) or Vercel serverless functions
- **Database**: MongoDB Atlas (recommended) or self-hosted MongoDB

## Frontend Deployment (Vercel)

### Prerequisites

- Vercel account
- GitHub repository connected to Vercel

### Steps

1. **Connect Repository**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Project Settings**

   - **Root Directory**: Leave as root (or set to `client` if deploying only frontend)
   - **Framework Preset**: Vite
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `cd client && npm install`

3. **Environment Variables**

   Add the following environment variables in Vercel dashboard:

   ```
   VITE_SERVER_URL=https://your-backend-url.com
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. **Deploy**

   - Click "Deploy"
   - Vercel will automatically build and deploy your frontend
   - Each push to main/master will trigger a new deployment

### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd client
vercel

# Deploy to production
vercel --prod
```

## Backend Deployment

### Option 1: Container Hosting (Recommended)

#### Railway

1. Create account at [Railway](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Add service → Deploy from GitHub repo
5. Set root directory to `server`
6. Add environment variables:
   - `PORT` (Railway sets this automatically)
   - `URI` (MongoDB connection string)
7. Deploy

#### Render

1. Create account at [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
5. Add environment variables
6. Deploy

#### AWS/DigitalOcean/Other

1. Build Docker image:
   ```bash
   docker build -t shibatype-server ./server
   ```

2. Push to container registry:
   ```bash
   docker tag shibatype-server your-registry/shibatype-server
   docker push your-registry/shibatype-server
   ```

3. Deploy to your container service using the image

### Option 2: Vercel Serverless Functions

Convert Express routes to Vercel serverless functions. This requires refactoring the backend code.

## Database Setup

### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all, or specific IPs)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/shibatype?retryWrites=true&w=majority
   ```
6. Use this connection string as `URI` environment variable

## CI/CD Pipeline

The project includes GitHub Actions workflows for:

- **CI**: Automated testing and linting on push/PR
- **Docker Build**: Building Docker images for verification

### Setting up CI/CD

1. **GitHub Secrets** (optional, for advanced CI/CD):

   Add secrets in GitHub repository settings:
   - `TEST_URI`: MongoDB test connection string
   - `DOCKER_REGISTRY`: Container registry URL (if pushing images)
   - `DOCKER_USERNAME`: Container registry username
   - `DOCKER_PASSWORD`: Container registry password

2. **Automatic Deployments**:

   - Vercel automatically deploys on push to main/master
   - Configure your backend hosting service to auto-deploy on push

## Environment Variables Reference

### Frontend (Vercel)

All variables must be prefixed with `VITE_`:

- `VITE_SERVER_URL` - Backend API URL
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

### Backend

- `PORT` - Server port (usually set by hosting service)
- `URI` - MongoDB connection string
- `TEST_URI` - MongoDB test connection string (for CI/CD)

## Post-Deployment Checklist

- [ ] Verify frontend is accessible
- [ ] Verify backend API is accessible
- [ ] Test API endpoints
- [ ] Verify database connection
- [ ] Test authentication flow
- [ ] Check CORS settings (backend should allow frontend domain)
- [ ] Set up monitoring/logging
- [ ] Configure custom domain (if needed)
- [ ] Set up SSL certificates (usually automatic)
- [ ] Test error handling

## Troubleshooting

### CORS Issues

If you see CORS errors, update `server/src/server.ts`:

```typescript
this.app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### Environment Variables Not Loading

- Vercel: Check that variables are set in project settings
- Backend: Ensure variables are set in hosting service dashboard
- Restart services after adding new variables

### Build Failures

- Check build logs in deployment dashboard
- Verify all dependencies are in `package.json`
- Ensure Node.js version matches (18+)

### Database Connection Issues

- Verify MongoDB connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

## Monitoring

Consider setting up:

- **Error Tracking**: Sentry, Rollbar
- **Analytics**: Google Analytics, Vercel Analytics
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Logging**: Logtail, Datadog

