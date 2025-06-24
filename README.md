# Roman Numeral Converter

A full-stack web application that converts Arabic numerals to Roman numerals, built with React frontend and Node.js/Express backend. The project includes comprehensive monitoring, logging, and distributed tracing capabilities.

## 🏗️ Architecture

### Frontend (React + Adobe React Spectrum)
- **Technology**: React 18 with Adobe React Spectrum UI components
- **Features**: Form validation, error handling, loading states, responsive design
- **Monitoring**: Sentry integration for error tracking and performance monitoring

### Backend (Node.js + Express)
- **Technology**: Express.js REST API with ES6 modules
- **Features**: Roman numeral conversion algorithm, input validation, error handling
- **Monitoring**: Prometheus metrics, Winston logging, OpenTelemetry tracing

### Infrastructure
- **Containerization**: Docker and Docker Compose
- **Monitoring Stack**: Prometheus + Grafana + Jaeger
- **Observability**: Distributed tracing, metrics collection, structured logging

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
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3002
# Jaeger: http://localhost:16686
```

### Local Development
```bash
# Backend
cd backend
npm install
npm start

# Frontend (in another terminal)
cd gen-studio-ui
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
- `PORT`: Backend server port (default: 3000)
- `CORS_ORIGIN`: Allowed frontend origin (default: http://localhost:5173)

### Monitoring Configuration
- **Sentry**: Error tracking and performance monitoring

## 🧪 Testing

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

## 📊 Monitoring & Observability

### Metrics (Prometheus)
- HTTP request rates and latencies
- Error rates and response codes
- Custom application metrics

### Tracing (Jaeger)
- Request flow visualization
- Performance bottleneck identification
- Distributed system debugging

### Logging (Winston)
- Structured logging with timestamps
- Console output for development
- Error tracking and debugging

## 🏛️ Project Structure

```
adobe-project/
├── backend/                 # Express.js API server
│   ├── index.js            # Main server file
│   ├── romanService.js     # Roman numeral conversion logic
│   ├── logger.js           # Winston logger configuration
│   ├── tracing.js          # OpenTelemetry setup
│   └── Dockerfile          # Backend container configuration
├── gen-studio-ui/          # React frontend application
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   └── main.jsx        # Application entry point
│   └── Dockerfile          # Frontend container configuration
├── docker-compose.yml      # Multi-service orchestration
├── prometheus.yml          # Metrics collection configuration
└── README.md              # Project documentation
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
- Monitoring and observability
- Error boundaries and graceful degradation

## 📝 License

This project is created for interview purposes and demonstrates modern full-stack development practices.

## 👨‍💻 Author

Interview Candidate - Adobe Project 
