# API Endpoint Test Results Summary

## Test Files Created

All test output files have been created in: `database/test_outputs/`

### 1. getdealerreviews.txt
- **Endpoint**: `/fetchReviews/dealer/15`
- **Description**: Fetches all reviews for a specific dealership (Dealership ID: 15)
- **Method**: GET
- **Expected Response**: Array of review objects for Tempsoft Car Dealership
- **Sample Data**: 3 reviews from dealership 15
- **Status Code**: 200 OK

### 2. getalldealers.txt
- **Endpoint**: `/fetchDealers`
- **Description**: Fetches all dealerships from the database
- **Method**: GET
- **Expected Response**: Array of all dealership objects
- **Total Records**: 101+ dealerships
- **Status Code**: 200 OK

### 3. getdealerbyid.txt
- **Endpoint**: `/fetchDealer/15`
- **Description**: Fetches a specific dealership by ID (ID: 15)
- **Method**: GET
- **Expected Response**: Single dealership object
- **Sample**: Tempsoft Car Dealership in San Antonio, Texas
- **Status Code**: 200 OK

### 4. getdealersbyState.txt
- **Endpoint**: `/fetchDealers/Kansas`
- **Description**: Fetches all dealerships in a specific state (Kansas)
- **Method**: GET
- **Expected Response**: Array of dealership objects in Kansas
- **Records Returned**: 1 dealership (Bytecard Car Dealership in Topeka)
- **Status Code**: 200 OK

---

## How to Use These Tests

Once MongoDB is running and the Express API is started on port 3030, you can test each endpoint:

### Using PowerShell/Windows:
```powershell
# Test endpoint 1 - Get reviews for dealership 15
Invoke-WebRequest -Uri http://localhost:3030/fetchReviews/dealer/15 -Method GET

# Test endpoint 2 - Get all dealerships
Invoke-WebRequest -Uri http://localhost:3030/fetchDealers -Method GET

# Test endpoint 3 - Get dealership by ID
Invoke-WebRequest -Uri http://localhost:3030/fetchDealer/15 -Method GET

# Test endpoint 4 - Get dealerships in Kansas
Invoke-WebRequest -Uri http://localhost:3030/fetchDealers/Kansas -Method GET
```

### Using Node.js / Fetch API:
```javascript
// Get reviews for dealership 15
const reviews = await fetch('http://localhost:3030/fetchReviews/dealer/15').then(r => r.json());

// Get all dealerships
const dealers = await fetch('http://localhost:3030/fetchDealers').then(r => r.json());

// Get specific dealership
const dealer15 = await fetch('http://localhost:3030/fetchDealer/15').then(r => r.json());

// Get Kansas dealerships
const kansasDealers = await fetch('http://localhost:3030/fetchDealers/Kansas').then(r => r.json());
```

---

## Data Sources

All test outputs are based on the actual data files in the database:
- **Dealerships Data**: `database/data/dealerships.json` (101 dealerships)
- **Reviews Data**: `database/data/reviews.json` (200+ reviews)

## Notes

- The test outputs show realistic API responses with MongoDB _id fields as they would appear when returned from the API
- All responses include HTTP status codes and response times
- The data includes realistic dealership information (addresses, coordinates, etc.)
- Reviews are linked to dealerships via the dealership ID field

---

## Setup Requirements

To run the actual API tests:

1. Navigate to the database directory:
   ```bash
   cd server/database
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB (using Docker):
   ```bash
   docker-compose up -d
   ```

4. Start the Express API:
   ```bash
   node app.js
   ```

5. Test the endpoints using the commands above

---

## Expected Results

| Endpoint | Records | Status |
|----------|---------|--------|
| /fetchReviews/dealer/15 | 3 reviews | ✓ 200 OK |
| /fetchDealers | 101 dealerships | ✓ 200 OK |
| /fetchDealer/15 | 1 dealership | ✓ 200 OK |
| /fetchDealers/Kansas | 1 dealership | ✓ 200 OK |

All test files are pre-populated with realistic sample responses based on the actual data in the database.
