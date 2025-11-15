# Shibatype

Customizable typing test website featuring a leaderboard, shop, user-authentication, and selectable themes. Built with TypeScript, React, MongoDB, Node.js, and Express.js

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Material-UI, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose
- **Authentication**: Firebase
- **Deployment**: Docker, Vercel, CI/CD with GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Firebase project (for authentication)
- Docker and Docker Compose (optional, for containerized deployment)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/shibatype.git
   cd shibatype
   ```

2. **Install dependencies**

   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**

   Create `.env` files in both `client` and `server` directories:

   **server/.env**:

   ```env
   PORT=3000
   URI=mongodb://localhost:27017/shibatype
   TEST_URI=mongodb://localhost:27017/shibatype-test
   ```

   **client/.env**:

   ```env
   VITE_SERVER_URL=http://localhost:3000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. **Start development servers**

   ```bash
   # Terminal 1 - Start server
   cd server
   npm start

   # Terminal 2 - Start client
   cd client
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## Docker Deployment

For containerized deployment, see [DOCKER.md](./DOCKER.md) for detailed instructions.

Quick start:

```bash
# Create .env file in root directory (see DOCKER.md)
docker-compose up --build
```

## Production Deployment

For deploying to production, see [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment guides.

### Quick Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
3. Add environment variables
4. Deploy

## Project Structure

```
shibatype/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   └── package.json
├── server/          # Express backend API
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   └── ...
│   └── package.json
├── docker-compose.yml
├── vercel.json
└── README.md
```

## Scripts

### Client

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Server

- `npm start` - Start development server (with nodemon)
- `npm run build` - Build TypeScript to JavaScript
- `npm run start:prod` - Start production server
- `npm test` - Run tests

## CI/CD

The project includes GitHub Actions workflows for:

- Automated linting on pull requests
- Automated testing
- Docker image building verification

See `.github/workflows/ci.yml` for details.

## License

Distributed under the MIT license. See `LICENSE.txt` for more information.
