# K.Navigator - Class Schedule and Location Finder

## Local Development Setup

1. Install MongoDB Community Edition locally:
   - Windows: [MongoDB Windows Installation Guide](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
   - macOS: `brew install mongodb-community`
   - Linux: [MongoDB Linux Installation Guide](https://www.mongodb.com/docs/manual/administration/install-on-linux/)

2. Start MongoDB service:
   - Windows: Start MongoDB service from Services
   - macOS/Linux: `sudo service mongod start` or `brew services start mongodb-community`

3. Initialize the database:
   Windows:
   ```powershell
   Get-Content scripts/init-db.js | mongosh
   ```
   
   macOS/Linux:
   ```bash
   mongosh < scripts/init-db.js
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the application:
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
     - Username: kashmala
     - Password: kashmala123

## Features

- Class schedule management
- Location tracking
- Teacher directory
- Real-time updates
- Admin panel for content management

## Tech Stack

- Next.js 13 (App Router)
- MongoDB
- NextAuth.js
- Tailwind CSS
- shadcn/ui