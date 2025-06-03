#  🤝 TeamBase

### 🔍 Overview
**TeamBase** is a web application for managing team member information. It includes login and registration, and lets users add, edit, delete, and search employee records.

### ✅ Features

- User authentication (login and registration)
- Add new employee records
- Edit existing employee information
- Delete employees
- Search employees data
- Responsive and clean user interface

### 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

### 📸 Screenshots

#### 🏠 Home
![Home](https://github.com/Izzeddin-Samara/TeamBase/blob/main/Screenshots/Home.png)

#### 🔐 Login
![Login Page](https://github.com/Izzeddin-Samara/TeamBase/blob/main/Screenshots/Login.png)

#### 📝 Signup
![Signup](https://github.com/Izzeddin-Samara/TeamBase/blob/main/Screenshots/Signup.png)

#### 📊 Dashboard
![Dashboard](https://github.com/Izzeddin-Samara/TeamBase/blob/main/Screenshots/Dashboard.png)

#### ➕ Add Employee
![AddEmployee](https://github.com/Izzeddin-Samara/TeamBase/blob/main/Screenshots/AddEmployee.png)

#### ✏️ Edit Employee
![EditEmployee](https://github.com/Izzeddin-Samara/TeamBase/blob/main/Screenshots/EditEmployee.png)

#### 🗑 Delete Employee
![DeleteEmployee](https://github.com/Izzeddin-Samara/TeamBase/blob/main/Screenshots/DeleteEmployee.png)

### ⚙️ Installation & Setup

#### Client Setup

1. Navigate to the Client directory
```bash
cd Client
```

2. Install the packages
```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open you browser and navigate to:
[http://localhost:5173/](http://localhost:5173/)
   

#### Server setup

1. Navigate to the Server directory
```bash
cd Server
```

2. Install the packages
```bash
npm install
```
3. Rename the .env.example file in the Server directory to .env
4. Update .env file with your own MongoDB URL and secret key
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
🗄️ You should use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to create a free cluster and get your connection string.

- 🔐 Make sure your JWT_SECRET is a strong, random string.
- 🛠️ Don’t forget to replace `<db_password>` in your MongoDB URI.

5. Start the server
```bash
node server.js
```












