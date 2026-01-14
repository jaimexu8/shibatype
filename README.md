# Shibatype

Customizable typing test website with a leaderboard, shop, user-authentication, and selectable themes.

## Tech Stack

- **Frontend**: React, TypeScript, Material-UI, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, MongoDB
- **Authentication**: Firebase
- **Deployment**: Vercel, Docker, CI/CD with GitHub Actions

## Getting Started

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/jaimexu8/shibatype.git
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

   Create a `.env` file in the root directory with all environment variables:

   **.env** (root directory):

   ```env
   # Client Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   VITE_SERVER_URL=http://localhost:3000

   # Server Configuration
   PORT=3000
   URI=mongodb://localhost:27017/shibatype
   TEST_URI=mongodb://localhost:27017/shibatype-test
   ```

4. **Start development servers**

   ```bash
   # Start server (runs on port 3000)
   cd server
   npm start

   # Start client (runs on port 5173)
   cd client
   npm run dev
   ```

### Local Development with Docker

1. **Start the containers**:

   ```bash
   docker-compose up --build
   ```

   - **Server**: http://localhost:3000
   - **Client**: http://localhost:5173

2. **Stop containers**:

   ```bash
   docker-compose down
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

## License

Distributed under the MIT license. See `LICENSE.txt` for more information.
