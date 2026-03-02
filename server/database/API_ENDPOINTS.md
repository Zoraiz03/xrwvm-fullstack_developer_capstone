# Express-MongoDB Dealership API Endpoints

## Base URL
`http://localhost:3030`

## Endpoints

### Health Check
- **GET** `/`
  - Description: Welcome message
  - Response: `{ "message": "Welcome to the Mongoose API for Dealerships" }`

---

## Dealerships Endpoints

### Get All Dealerships
- **GET** `/fetchDealers`
  - Description: Fetch all dealerships from the database
  - Response: Array of dealership objects
  - Example Response:
    ```json
    [
      {
        "_id": "...",
        "id": 1,
        "city": "El Paso",
        "state": "Texas",
        "address": "3 Nova Court",
        "zip": "88563",
        "lat": 31.6948,
        "long": -106.3,
        "short_name": "Holdlamis",
        "full_name": "Holdlamis Car Dealership"
      }
    ]
    ```

### Get Dealerships by State
- **GET** `/fetchDealers/:state`
  - Description: Fetch all dealerships in a specific state
  - Parameters:
    - `state` (path): State name (e.g., "Texas", "Minnesota")
  - Response: Array of dealership objects matching the state
  - Example: `/fetchDealers/Texas`

### Get Specific Dealership
- **GET** `/fetchDealer/:id`
  - Description: Fetch a specific dealership by ID
  - Parameters:
    - `id` (path): Dealership ID number
  - Response: Single dealership object or 404 error
  - Example: `/fetchDealer/1`

---

## Reviews Endpoints

### Get All Reviews
- **GET** `/fetchReviews`
  - Description: Fetch all reviews from all dealerships
  - Response: Array of review objects
  - Example Response:
    ```json
    [
      {
        "_id": "...",
        "id": 1,
        "name": "John Doe",
        "dealership": 15,
        "review": "Great service!",
        "purchase": true,
        "purchase_date": "07/11/2020",
        "car_make": "Audi",
        "car_model": "A6",
        "car_year": 2010
      }
    ]
    ```

### Get Reviews by Dealership
- **GET** `/fetchReviews/dealer/:id`
  - Description: Fetch all reviews for a specific dealership
  - Parameters:
    - `id` (path): Dealership ID number
  - Response: Array of review objects for that dealership
  - Example: `/fetchReviews/dealer/15`

### Add New Review
- **POST** `/insert_review`
  - Description: Add a new review to the database
  - Headers: `Content-Type: application/json`
  - Body:
    ```json
    {
      "name": "Jane Smith",
      "dealership": 10,
      "review": "Excellent experience!",
      "purchase": true,
      "purchase_date": "03/02/2026",
      "car_make": "Toyota",
      "car_model": "Camry",
      "car_year": 2020
    }
    ```
  - Response: Created review object with auto-generated ID

### Update Review
- **PUT** `/update_review/:id`
  - Description: Update an existing review
  - Parameters:
    - `id` (path): Review ID number
  - Headers: `Content-Type: application/json`
  - Body: Any fields to update
    ```json
    {
      "review": "Updated review text",
      "rating": 5
    }
    ```
  - Response: Updated review object or 404 error

### Delete Review
- **DELETE** `/delete_review/:id`
  - Description: Delete a review from the database
  - Parameters:
    - `id` (path): Review ID number
  - Response: Confirmation message with deleted review data

---

## Error Responses

All endpoints return error responses in the following format:
```json
{
  "error": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Database Models

### Dealership Schema
```javascript
{
  id: Number,           // Unique dealership ID
  city: String,         // City name
  state: String,        // State name
  address: String,      // Street address
  zip: String,         // ZIP code
  lat: String,         // Latitude
  long: String,        // Longitude
  short_name: String,  // Short dealership name
  full_name: String    // Full dealership name
}
```

### Review Schema
```javascript
{
  id: Number,              // Unique review ID
  name: String,           // Reviewer name
  dealership: Number,     // Dealership ID (reference)
  review: String,         // Review text
  purchase: Boolean,      // Whether they purchased a car
  purchase_date: String,  // Purchase date (MM/DD/YYYY)
  car_make: String,       // Car manufacturer
  car_model: String,      // Car model
  car_year: Number        // Car year
}
```

### Car/Inventory Schema
```javascript
{
  dealer_id: Number,   // Associated dealership ID
  make: String,       // Car manufacturer
  model: String,      // Car model
  bodyType: String,   // Body type (sedan, SUV, etc.)
  year: Number,       // Vehicle year
  mileage: Number     // Vehicle mileage
}
```

---

## Usage Examples

### Using cURL

Get all dealerships:
```bash
curl -X GET http://localhost:3030/fetchDealers
```

Get dealerships in Texas:
```bash
curl -X GET http://localhost:3030/fetchDealers/Texas
```

Get reviews for dealership 15:
```bash
curl -X GET http://localhost:3030/fetchReviews/dealer/15
```

Add a new review:
```bash
curl -X POST http://localhost:3030/insert_review \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "dealership": 1,
    "review": "Great service!",
    "purchase": true,
    "purchase_date": "03/02/2026",
    "car_make": "Toyota",
    "car_model": "Camry",
    "car_year": 2020
  }'
```

### Using JavaScript Fetch API

```javascript
// Get all dealerships
const response = await fetch('http://localhost:3030/fetchDealers');
const dealerships = await response.json();

// Add a review
const newReview = await fetch('http://localhost:3030/insert_review', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    dealership: 1,
    review: 'Great service!',
    purchase: true,
    purchase_date: '03/02/2026',
    car_make: 'Toyota',
    car_model: 'Camry',
    car_year: 2020
  })
});
const review = await newReview.json();
```

---

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start MongoDB using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Start the Express server:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:3030`
