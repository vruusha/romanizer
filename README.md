# Roman Numeral Converter

## 🚧 Work in Progress
This project is under active development. Some features and tests may not be fully functional yet.

A full-stack web application that converts Arabic numerals to Roman numerals, built with a React frontend and Node.js/Express backend. The project includes robust logging and error handling.

## 🏗️ Architecture

### Frontend (React + Adobe React Spectrum)
- **Technology**: React 18 with Adobe React Spectrum UI components
- **Features**: Form validation, error handling, loading states, responsive design

### Backend (Node.js + Express)
- **Technology**: Express.js REST API with ES6 modules
- **Features**: Roman numeral conversion algorithm, input validation, error handling
- **Logging**: Winston logging for structured logs

### Infrastructure
- **Containerization**: Docker and Docker Compose

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)

### Running with Docker Compose
```bash
# Clone the repository
git clone <repository-url>
cd adobe-project

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:3001
```

### Local Development
```bash
# Backend
cd backend
npm install
npm start

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## 📚 API Documentation

### Convert Number to Roman Numeral
```http
GET /romannumeral?query={number}
```

**Parameters:**
- `query` (required): Integer between 1 and 3999

**Response:**
```json
{
  "input": "42",
  "output": "XLII"
}
```

**Error Response:**
```json
{
  "error": "Invalid Input: Number must be an integer between 1 and 3999"
}
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Backend server port (default: 3001)
- `CORS_ORIGIN`: Allowed frontend origin (default: http://localhost:5173)

## 🧪 Testing

> **Note:** Some tests are currently failing. Test coverage and reliability are being improved as part of ongoing development.

### Frontend Testing
The frontend uses [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and integration tests.

- **Run all tests:**
  ```bash
  cd frontend
  npm test
  # or
  npm run test
  ```
- **Run tests with UI:**
  ```bash
  npm run test:ui
  ```
- **Run tests with coverage report:**
  ```bash
  npm run test:coverage
  ```

Test setup and utilities are in `frontend/src/test/`. See `setup.ts` for global mocks and configuration.

### Manual Testing
1. Open http://localhost:5173
2. Enter a number between 1-3999
3. Click "Convert To Roman Numeral"
4. Verify the result

### API Testing
```bash
# Test valid conversion
curl "http://localhost:3001/romannumeral?query=42"

# Test invalid input
curl "http://localhost:3001/romannumeral?query=0"
```

## 📊 Logging

### Logging (Winston)
- Structured logging with timestamps
- Console output for development
- Error tracking and debugging

## 🏛️ Project Structure

```
adobe-project/
├── backend/                 # Express.js API server
│   ├── index.tsx            # Main server file
│   ├── romanService.tsx     # Roman numeral conversion logic
│   ├── logger.js            # Winston logger configuration
│   └── Dockerfile           # Backend container configuration
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── App.tsx          # Main React component
│   │   └── main.tsx         # Application entry point
│   └── Dockerfile           # Frontend container configuration
├── docker-compose.yml       # Multi-service orchestration
└── README.md                # Project documentation
```

## 🛠️ Development

### Code Quality
- Comprehensive JSDoc comments for all functions
- Consistent code formatting and structure
- Error handling and validation
- Type checking and input sanitization

### Best Practices
- Separation of concerns (frontend/backend)
- RESTful API design
- Containerization for deployment
- Error boundaries and graceful degradation

## 📝 License

This project is created for interview purposes and demonstrates modern full-stack development practices.

## 👨‍💻 Author

Adobe Project 
