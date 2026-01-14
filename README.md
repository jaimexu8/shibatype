# Shibatype

[https://shibatype.vercel.app](https://shibatype.vercel.app)

Customizable typing test website with a leaderboard, shop, user-authentication, and selectable themes.

## Tech Stack

- **Frontend**: React, TypeScript, Material-UI, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, MongoDB
- **Authentication**: Firebase
- **Deployment**: Vercel, Docker, GitHub Actions

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/jaimexu8/shibatype.git
   cd shibatype
   ```

2. **Install dependencies**

   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory following `.env.example`.

4. **Start development servers**

   ```bash
   docker-compose up --build
   ```
