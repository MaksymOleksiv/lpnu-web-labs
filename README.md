# Stadium CRUD Application

Full-stack web application for managing stadium data with FastAPI backend, PostgreSQL database, and vanilla JavaScript frontend.

## 🏗️ Architecture

- **Frontend**: Vanilla HTML/CSS/JavaScript with ES6 modules
- **Backend**: FastAPI (Python) with async SQLAlchemy
- **Database**: PostgreSQL 15
- **Containerization**: Docker & Docker Compose

## 🚀 Quick Start

### Prerequisites
- Docker
- Docker Compose

### Run the application

1. Clone the repository:
```bash
git clone <repository-url>
cd lpnu-web-labs
```

2. Start all services:
```bash
docker-compose up --build
```

3. Access the application:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database**: localhost:5432

### Stop the application
```bash
docker-compose down
```

### Stop and remove volumes (clean reset)
```bash
docker-compose down -v
```

## 📁 Project Structure

```
├── frontend/
│   ├── css/          # Stylesheets with BEM methodology
│   ├── js/           # JavaScript modules
│   ├── index.html    # Main HTML file
│   ├── Dockerfile    # Frontend container config
│   └── .dockerignore
├── backend/
│   ├── api.py        # FastAPI routes
│   ├── models.py     # SQLAlchemy models
│   ├── schemas.py    # Pydantic schemas
│   ├── db.py         # Database configuration
│   ├── config.py     # Application settings
│   ├── main.py       # FastAPI app entry point
│   ├── requirements.txt
│   ├── Dockerfile    # Backend container config
│   └── .env          # Environment variables
├── docker-compose.yml # Multi-service orchestration
├── init.sql          # Database initialization
└── .env              # Global environment variables
```

## 🛠️ Development

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Development
```bash
cd frontend
npx serve -s . -l 3000
```

### Database Management
```bash
# Connect to PostgreSQL container
docker exec -it stadium-db psql -U user -d dbname

# View logs
docker-compose logs database
docker-compose logs backend
docker-compose logs frontend
```

## 🌐 API Endpoints

- `GET /stadiums` - Get all stadiums
- `POST /stadiums` - Create new stadium
- `PUT /stadiums/{id}` - Update stadium
- `DELETE /stadiums/{id}` - Delete stadium

## 🔧 Environment Variables

### Backend (.env)
```
DB_USER=user
DB_PASSWORD=password  
DB_HOST=database
DB_NAME=dbname
DB_PORT=5432
```

### Database (docker-compose.yml)
```
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=dbname
```

## 📊 Features

- ✅ Full CRUD operations for stadiums
- ✅ Search and filter functionality
- ✅ Responsive design with BEM CSS
- ✅ Real-time updates
- ✅ PostgreSQL with sample data
- ✅ Docker containerization
- ✅ API documentation (FastAPI/Swagger)
- ✅ Health checks and dependency management

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in docker-compose.yml if needed
2. **Database connection**: Ensure PostgreSQL is healthy before backend starts
3. **CORS issues**: Backend allows all origins for development

### Useful Commands
```bash
# Rebuild specific service
docker-compose build backend

# View service logs
docker-compose logs -f backend

# Reset database
docker-compose down -v && docker-compose up database
```

## 📝 License

This project is for educational purposes.
