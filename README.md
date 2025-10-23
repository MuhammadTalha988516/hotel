# LuxeStay Backend API

A comprehensive backend API for the LuxeStay hotel booking system built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Secure password hashing with bcrypt

- **User Management**
  - User registration and login
  - Profile management
  - Admin user management

- **Hotel Management**
  - Hotel CRUD operations
  - Room management
  - Review system
  - Featured hotels

- **Contact System**
  - Contact form submissions
  - Admin contact management
  - Status tracking

- **Security Features**
  - Helmet for security headers
  - Rate limiting
  - CORS configuration
  - Input validation

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env` file and update the following variables:
   ```env
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Hotels
- `GET /api/hotels` - Get all hotels (with filters)
- `GET /api/hotels/featured` - Get featured hotels
- `GET /api/hotels/:id` - Get single hotel
- `POST /api/hotels` - Create hotel (Admin only)
- `POST /api/hotels/:id/reviews` - Add review

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin only)
- `GET /api/contact/:id` - Get single contact (Admin only)
- `PUT /api/contact/:id/status` - Update contact status (Admin only)
- `POST /api/contact/:id/response` - Add response (Admin only)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id/status` - Update user status
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user

## Database Models

### User Model
- Personal information (name, email, phone)
- Authentication (password, role)
- Preferences and settings
- Activity tracking

### Hotel Model
- Basic information (name, description, images)
- Location details with coordinates
- Rooms and amenities
- Reviews and ratings
- Policies and contact information

### Contact Model
- Contact form submissions
- Status tracking and assignment
- Response management
- Priority levels

## Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Input Validation**: express-validator for request validation
- **CORS**: Configured for frontend domain
- **Helmet**: Security headers for protection

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxestay

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend
CLIENT_URL=http://localhost:5173
```

## Development

1. **Install nodemon for development**
   ```bash
   npm install -g nodemon
   ```

2. **Run in development mode**
   ```bash
   npm run dev
   ```

3. **API Testing**
   - Use Postman or similar tools
   - Health check: `GET /api/health`

## Deployment

1. **Set environment variables** in your hosting platform
2. **Update MONGODB_URI** with your production database
3. **Set NODE_ENV** to `production`
4. **Configure CLIENT_URL** to your frontend domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
