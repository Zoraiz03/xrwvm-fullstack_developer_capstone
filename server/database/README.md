# Express-MongoDB Dealership API

A RESTful API built with Express.js and MongoDB for managing dealerships and customer reviews.

## Overview

This API provides endpoints for:
- Fetching dealerships and filtering by state
- Managing customer reviews for dealerships
- CRUD operations for reviews
- Data persistence with MongoDB

## Architecture

```
Express Server (Port 3030)
        ↓
Mongoose (MongoDB ODM)
        ↓
MongoDB Container (Port 27017)
```

## Features Implemented

### ✅ Dealership Endpoints
- `GET /fetchDealers` - Get all dealerships
- `GET /fetchDealers/:state` - Get dealerships by state
- `GET /fetchDealer/:id` - Get specific dealership by ID

### ✅ Review Endpoints
- `GET /fetchReviews` - Get all reviews
- `GET /fetchReviews/dealer/:id` - Get reviews for a dealership
- `POST /insert_review` - Add new review
- `PUT /update_review/:id` - Update existing review
- `DELETE /delete_review/:id` - Delete a review

### ✅ Database
- MongoDB with Mongoose ODM
- Pre-loaded sample data from JSON files
- Automatic ID generation for new reviews

## Project Structure

```
database/
├── app.js                    # Main Express application
├── package.json             # Dependencies
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile              # Docker image for Node app
├── API_ENDPOINTS.md        # API documentation
├── dealership.js           # Dealership Mongoose schema
├── review.js               # Review Mongoose schema
├── inventory.js            # Car inventory Mongoose schema
├── data/
│   ├── dealerships.json    # Sample dealership data
│   ├── reviews.json        # Sample review data
│   └── car_records.json    # Sample car inventory data
└── README.md               # This file
```

## Setup & Installation

### Prerequisites
- Docker and Docker Compose installed
- Node.js 14+ (for local development)
- npm packages installed

### Installation Steps

1. **Install Node Dependencies**
   ```bash
   cd database
   npm install
   ```

2. **Build Docker Image**
   ```bash
   docker build . -t nodeapp
   ```

3. **Start MongoDB & API with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Verify Services**
   ```bash
   docker ps
   ```
   You should see two containers running:
   - `db_container` (MongoDB)
   - `nodeapp` (Express API)

### Running Locally (Development)

If you want to run the API locally with a local MongoDB:

```bash
# Install dependencies
npm install

# Start MongoDB (ensure it's running on localhost:27017)
# Then start the server
npm start

# Server will run on http://localhost:3030
```

## Configuration

### Environment Variables
Currently connects to MongoDB at `mongodb://mongo_db:27017/dealershipsDB`

To modify connection settings, edit the connection string in `app.js`:
```javascript
mongoose.connect("mongodb://mongo_db:27017/", { 'dbName': 'dealershipsDB' })
```

### Port
The API runs on **port 3030** by default.

## Sample Data

The API comes pre-loaded with:
- **100+ Dealerships** across various US states
- **200+ Customer Reviews** covering different dealerships
- **Car Inventory** with make, model, year, and mileage

Data is loaded from JSON files in the `data/` directory on server startup.

## Database Models

### Dealership
```javascript
{
  id: Number,           // Unique ID
  city: String,
  state: String,
  address: String,
  zip: String,
  lat: String,          // Latitude
  long: String,         // Longitude
  short_name: String,
  full_name: String
}
```

### Review
```javascript
{
  id: Number,              // Unique ID
  name: String,           // Reviewer's name
  dealership: Number,     // Dealership ID (foreign key)
  review: String,         // Review text
  purchase: Boolean,      // Was a car purchased?
  purchase_date: String,  // MM/DD/YYYY format
  car_make: String,
  car_model: String,
  car_year: Number
}
```

### Car (Inventory)
```javascript
{
  dealer_id: Number,
  make: String,
  model: String,
  bodyType: String,
  year: Number,
  mileage: Number
}
```

## API Examples

### JavaScript Fetch Examples

Get all dealerships:
```javascript
const dealerships = await fetch('http://localhost:3030/fetchDealers')
  .then(res => res.json());
console.log(dealerships);
```

Get reviews for a dealership:
```javascript
const reviews = await fetch('http://localhost:3030/fetchReviews/dealer/15')
  .then(res => res.json());
console.log(reviews);
```

Add a new review:
```javascript
const newReview = await fetch('http://localhost:3030/insert_review', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    dealership: 1,
    review: 'Excellent service and great selection!',
    purchase: true,
    purchase_date: '03/02/2026',
    car_make: 'Toyota',
    car_model: 'Camry',
    car_year: 2020
  })
}).then(res => res.json());
```

## Testing the API

### Using cURL
```bash
# Get all dealerships
curl http://localhost:3030/fetchDealers

# Get dealerships in Texas
curl http://localhost:3030/fetchDealers/Texas

# Get specific dealership
curl http://localhost:3030/fetchDealer/1

# Get all reviews
curl http://localhost:3030/fetchReviews

# Get reviews for dealership 5
curl http://localhost:3030/fetchReviews/dealer/5

# Add a review
curl -X POST http://localhost:3030/insert_review \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Smith",
    "dealership":1,
    "review":"Great experience!",
    "purchase":true,
    "purchase_date":"03/02/2026",
    "car_make":"Honda",
    "car_model":"Civic",
    "car_year":2021
  }'
```

### Using Postman
1. Create a new request with the appropriate HTTP method
2. Enter the endpoint URL (e.g., `http://localhost:3030/fetchDealers`)
3. For POST/PUT requests, set body to JSON and paste the data
4. Send the request

## Troubleshooting

### MongoDB Connection Errors
**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**: 
- Ensure MongoDB container is running: `docker-compose up -d`
- Check status: `docker ps`
- View logs: `docker-compose logs mongo_db`

### File Not Found Errors
**Problem**: `Error: ENOENT: no such file or directory 'data/reviews.json'`

**Solution**:
- Ensure you're running the app from the `database/` directory
- Check that `data/` folder exists with JSON files

### Port Already in Use
**Problem**: `Error: listen EADDRINUSE: address already in use :::3030`

**Solution**:
- Kill process using port 3030
- Or change the port in `app.js`

## Maintenance

### Viewing Logs
```bash
# API logs
docker logs -f nodeapp

# MongoDB logs
docker logs -f db_container
```

### Stopping Services
```bash
docker-compose down
```

### Resetting Database
```bash
docker-compose down
docker volume rm nodeapp_mongo_data
docker-compose up -d
```

## Performance Considerations

- Indexes are on `id` fields for faster lookups
- MongoDB connection pooling is handled by Mongoose
- CORS is enabled for cross-origin requests
- Error handling with proper HTTP status codes

## Future Enhancements

- Authentication & Authorization
- Pagination for large result sets
- Search and filtering capabilities
- Rating/scoring system for reviews
- Image upload for dealership photos
- Inventory management endpoints
- User profiles and preferences
- Review moderation system
- Analytics and reporting

## Security Notes

For production deployment:
- Use environment variables for sensitive data
- Implement authentication (JWT, OAuth)
- Add input validation and sanitization
- Use HTTPS instead of HTTP
- Implement rate limiting
- Add CORS restrictions
- Use MongoDB authentication credentials
- Implement proper error handling (don't expose stack traces)

## License

ISC

## Support

For issues or questions:
1. Check the API_ENDPOINTS.md for detailed endpoint documentation
2. Review the sample data structure
3. Check Docker logs for connection issues
4. Verify all dependencies are installed with `npm install`
