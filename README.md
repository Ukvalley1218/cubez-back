# Cubez Capital Backend API

This is the backend API for the Cubez Capital website.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   - MongoDB connection string
   - JWT secret
   - Email SMTP settings (for password reset)
   - Cloudinary settings (for image uploads)

3. Seed the database (first time setup):
   ```bash
   npm run seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run seed` - Seed database with initial data

## API Endpoints

### Auth
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `PUT /api/contact/:id` - Update contact status

### Content
- `GET /api/content` - Get all content
- `PUT /api/content/:key` - Update content

### And more...

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| NODE_ENV | Environment (development/production) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret for JWT tokens |
| JWT_EXPIRE | Token expiration time |
| SMTP_HOST | Email SMTP host |
| SMTP_PORT | Email SMTP port |
| SMTP_USER | Email SMTP username |
| SMTP_PASS | Email SMTP password |
| ADMIN_EMAIL | Default admin email |
| ADMIN_PASSWORD | Default admin password |
| FRONTEND_URL | Frontend URL for CORS |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |