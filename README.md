# Developer Assessment and Coding Platform (DACP)

A full-stack web application designed to help developers practice coding challenges, participate in programming contests, evaluate their technical skills, and track their problem-solving progress.

Built with React, FastAPI, and Supabase PostgreSQL.

- **Backend:** [DACP - Backend](#)

## 🚀 Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- HTML5 & CSS3
- Tailwind CSS
- DaisyUI

### Backend
- Python
- FastAPI
- Pydantic
- SQLAlchemy

### Database
- Supabase
- PostgreSQL

### Tools
- Git & GitHub
- VS Code
- Postman

## ✨ Features

- Responsive and user-friendly interface
- User authentication and authorization
- Coding challenges with different difficulty levels
- Online coding and problem-solving environment
- Multiple programming language support (planned)
- Code submission and evaluation
- Programming contests and competitions
- Technical assessments and skill evaluation
- Developer leaderboard and ranking system
- Performance tracking and progress monitoring
- RESTful API development with FastAPI
- PostgreSQL database integration using Supabase
- Data validation with Pydantic
- Frontend and backend separation

## 🏗️ Architecture

```text
React Frontend
      |
      | HTTP Requests (REST API)
      v
FastAPI Backend
      |
      | SQLAlchemy ORM
      v
Supabase PostgreSQL
      |
      | Assessment & Coding Data
      v
Challenges / Submissions / Results
```

## 📁 Project Structure

```text
Developer-Assessment-and-Coding-Platform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── router/
│   ├── .env
│   ├── .gitignore
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   └── requirements.txt
│
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have installed:

- Node.js and npm
- Python 3.10+
- A Supabase account
- Git

### 1. Clone the Repository

```bash
git clone <your-dacp-repository-url>
cd Developer-Assessment-and-Coding-Platform
```

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**Linux/macOS:**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file and configure your database connection:

```env
DATABASE_URL=your_supabase_postgresql_connection_string
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend server:

`http://127.0.0.1:8000`

Interactive API documentation:

`http://127.0.0.1:8000/docs`

### 3. Set Up the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🗄️ Database Setup

1. Create a project in [Supabase](https://supabase.com/).
2. Set up the required PostgreSQL database tables.
3. Copy the appropriate database connection string from your Supabase project.
4. Add the connection string to the backend `.env` file.
5. Configure the required database relationships and constraints.
6. Keep your database credentials private.

## 🔐 Environment Variables

Never commit secret keys, passwords, or database credentials to GitHub.

Add the following entries to `.gitignore`:

```gitignore
.env
venv/
__pycache__/
node_modules/
dist/
```

## 📖 API Documentation

FastAPI automatically generates interactive API documentation.

- Swagger UI: `/docs`
- ReDoc: `/redoc`

## 🛠️ Development Workflow

1. Design and develop the user interface using React.
2. Implement backend APIs using FastAPI.
3. Configure Supabase PostgreSQL database integration.
4. Develop coding challenges and assessment functionalities.
5. Integrate frontend components with backend APIs.
6. Implement code submission and evaluation workflows.
7. Test API endpoints, database operations, and application functionality.

## 🚧 Project Status

Currently under development.

New features and improvements will be added as development progresses.

## 👨‍💻 Author

**Munim**

- GitHub: [@MMunim90](https://github.com/MMunim90)
- LinkedIn: [MD. SHAHAN AL MUNIM](https://www.linkedin.com/in/m-munim)

## 📄 License

This project is licensed under the MIT License. Add a `LICENSE` file if you intend to distribute it under this license.