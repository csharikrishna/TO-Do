# 📝 TaskManager - Full-Stack To-Do List Application

A modern, feature-rich to-do list application with user authentication, task scheduling, and smart email notifications. Built with React, Node.js, and MongoDB.

## ✨ Features

- **🔐 User Authentication** - Secure registration and login with JWT
- **📋 Task Management** - Create, update, delete, and organize tasks
- **⏰ Smart Notifications** - Email alerts 15 minutes before task deadlines
- **📱 Responsive Design** - Works seamlessly on desktop and mobile
- **🎯 Real-time Updates** - Instant UI updates without page refresh
- **📊 Task Analytics** - Dashboard with task statistics and status tracking
- **🚀 Production Ready** - Fully deployable with environment configuration

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email notifications
- **node-cron** - Task scheduling

### Frontend
- **React.js** - UI framework
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Gmail account** (for email notifications)
- **Git** (for cloning the repository)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/taskmanager-fullstack.git
cd taskmanager-fullstack
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure your `.env` file:**

```env
# Database
MONGO_URL=mongodb://localhost:27017/todoapp

# JWT Secret (use a long, secure string)
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_secure

# Email Configuration
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Server Port
PORT=5000
```

**Gmail Setup for Notifications:**
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: Account Settings → Security → App passwords
3. Use the generated password in `EMAIL_PASS`

### 3. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure your `.env` file:**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Server
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGO_URL` in backend `.env`

## 🏃‍♂️ Running the Application

### Development Mode

**Start Backend Server:**
```bash
cd server
npm run dev
```

**Start Frontend (in another terminal):**
```bash
cd client
npm start
```

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Production Server:**
```bash
cd server
npm start
```

## 📱 Usage

### Getting Started

1. **Register** a new account or **login** with existing credentials
2. **Create tasks** with titles, descriptions, and deadlines
3. **Manage tasks** by marking as complete or deleting
4. **Receive notifications** via email 15 minutes before deadlines

### Task Management

- **Add Task**: Click "Add Task" and fill in details
- **Complete Task**: Click "Complete" button on task card
- **Delete Task**: Click "Delete" button (with confirmation)
- **View Statistics**: Check dashboard for task counts and status

### Notification System

- Automated email notifications sent 15 minutes before task deadlines
- Notifications sent only once per task
- HTML-formatted emails with task details

## 🚀 Deployment

### Backend Deployment (Render)

1. Create account at [Render](https://render.com)
2. Connect your GitHub repository
3. Create new Web Service with:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Set environment variables in Render dashboard

### Frontend Deployment (Vercel)

1. Create account at [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Set build configuration:
   - **Framework**: React
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add environment variable: `REACT_APP_API_URL`

### Database (MongoDB Atlas)

1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Configure network access and database user
3. Get connection string and update production environment variables

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/tasks/add` | Create new task | ✅ |
| GET | `/api/tasks` | Get user tasks | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

### Request/Response Examples

**Register User:**
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Create Task:**
```json
POST /api/tasks/add
{
  "title": "Complete project",
  "description": "Finish the TaskManager application",
  "deadline": "2025-07-10T15:30:00.000Z"
}
```

## 🔧 Configuration

### Environment Variables

**Backend (`/server/.env`):**
- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `EMAIL_USER` - Gmail address for notifications
- `EMAIL_PASS` - Gmail app password
- `PORT` - Server port (default: 5000)

**Frontend (`/client/.env`):**
- `REACT_APP_API_URL` - Backend API URL

### Notification Settings

The notification system checks for upcoming deadlines every minute. You can modify the notification timing in `/server/utils/notificationService.js`:

```javascript
// Change notification timing (currently 15 minutes)
const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60000);
```

## 🧪 Testing

### Manual Testing

1. **Authentication Flow**:
   - Register new account
   - Login with credentials
   - Access protected routes

2. **Task Management**:
   - Create tasks with various deadlines
   - Update task status
   - Delete tasks

3. **Notification System**:
   - Create task with deadline 10 minutes from now
   - Check email for notification
   - Verify notification sent only once

### API Testing

Use tools like Postman or curl to test API endpoints:

```bash
# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test creating task (with auth token)
curl -X POST http://localhost:5000/api/tasks/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Task","deadline":"2025-07-10T15:30:00.000Z"}'
```

## 📁 Project Structure

```
taskmanager-fullstack/
├── server/                 # Backend application
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Authentication middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Notification service
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── App.js         # Main app component
│   │   └── api.js         # API service
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React** team for the amazing framework
- **MongoDB** for the flexible database
- **TailwindCSS** for the utility-first styling
- **Express.js** for the web framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/taskmanager-fullstack/issues) page
2. Create a new issue with detailed description
3. Contact the maintainers

**Made with ❤️ by CS HARI KRISHNA**
