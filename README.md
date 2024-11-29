# DINEEASE - Restaurant Reservation & Review Platform - Backend

This is the backend API for the **Restaurant Reservation & Review Platform**. It is built using **Node.js**, **Express**, **MongoDB**, and various additional packages for authentication, database management, and routing.

## Technologies Used

- Node.js: JavaScript runtime environment for building server-side applications.
- Express: Web framework for Node.js for creating RESTful APIs.
- MongoDB: NoSQL database for storing user, restaurant, review, and reservation data.
- Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
- dotenv: Loads environment variables from a .env file.
- cors: Middleware for handling Cross-Origin Resource Sharing (CORS).
- body-parser: Middleware to parse incoming request bodies.

## API Routes

### Users

- POST /api/users/register - Register a new user
- POST /api/users/login - Login and get JWT token
- GET /api/users/profile - Get user profile
- PATCH /api/users/profile - Patch user profile

### Restaurants

- GET /api/restaurants - Get all restaurants
- GET /api/restaurants/:id - Get a specific restaurant by ID
- POST /api/restaurants - Add a new restaurant (Admin only)
- PATCH /api/restaurants/:id - Update a restaurant by ID (Admin only)
- DELETE /api/restaurants/:id - Delete a restaurant by ID (Admin only)

### Reservations

- POST /api/reservations - Make a reservation
- GET /api/reservations/user - Get reservation details for a user
- GET /api/reservations/ - Get all reservations (Admin only)
- PATCH /api/reservations/:id - Edit the reservation
- DELETE /api/reservations/:id - Delete a reservation by ID

### Reviews

- POST /api/reviews/:restaurantId - Add a review for a restaurant
- GET /api/reviews/:restaurantId - Get all reviews for a restaurant
- GET /api/reviews/ - Get all reviews for admin dashboard
- PATCH /api/reviews/:reviewId - Update a review (Authenticated user only)
- DELETE /api/reviews/:reviewId - Delete a review (Authenticated user only)

### Search

- GET /api/search/ - Search for restaurants based on name, cuisine, or location

### Admin

- PATCH /api/admin/restaurants/:id - Edit details of restaurants
- DELETE /api/admin/reviews/:id - Delete a review
- DELETE /api/admin/reservations/:id - Delete a reservation

#### To LOGIN as Administrator please use below credentials

- email : dinesh@gmail.com
- password : 1234567

For more information please refer to the POSTMAN documentation inside data folder.
