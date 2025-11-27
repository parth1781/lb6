# VIT Result Management System

A full-stack Examination Result Portal designed for Vishwakarma Institute of Technology, Pune. It features a modern, monochromatic Glassmorphism UI for students to check results and a secure Admin Panel for faculty to manage student data.

---

## ✨ Key Features

* **Student Result Portal:** Check semester results by entering PRN number
* **Admin Panel:** Secure faculty access to add and manage student records
* **Automatic Grade Calculation:** Real-time CGPA and grade computation based on VIT norms
* **Pass/Fail Detection:** Automatic result status determination
* **Glassmorphism UI:** Modern, elegant design with frosted glass effects
* **Monochromatic Theme:** Professional black and white color scheme
* **Responsive Design:** Optimized for desktop and mobile devices

---

## 🏗️ Tech Stack

### Frontend
* **React.js** (v18)
* **CSS3** (Glassmorphism Design)
* **JavaScript (ES6+)**

### Backend
* **Java Spring Boot** (Maven)
* **Spring Data JPA** (ORM)
* **RESTful API Architecture**

### Database
* **MySQL** (Relational Database)

### Tools Used
* **VS Code** (Code Editor)
* **MySQL Workbench** (Database Management)
* **Maven** (Dependency Management)

---

## 📋 Prerequisites

Before running this project, ensure you have these installed on your system:

1. **Java JDK 17** (or higher) - [Download](https://www.oracle.com/java/technologies/downloads/)
2. **Node.js & npm** - [Download](https://nodejs.org/)
3. **MySQL Server** - [Download](https://dev.mysql.com/downloads/mysql/)
4. **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

### Verify Installation

```bash
# Check Java version
java -version

# Check Node.js version
node -v

# Check npm version
npm -v

# Check MySQL
mysql --version
```

---

## ⚙️ Step-by-Step Installation

### Step 1: Download the Project

Open your terminal (Command Prompt/Git Bash) and run:

```bash
git clone https://github.com/YOUR_USERNAME/vit-result-system.git
cd vit-result-system
```

*(Or simply download the ZIP file and extract it)*

---

### Step 2: Database Setup (MySQL)

1. Open **MySQL Workbench**
2. Login to your local server
3. Copy and run the following SQL script to create the database:

```sql
CREATE DATABASE vit_results;
USE vit_results;

-- Students Table
CREATE TABLE students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    prn VARCHAR(8) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    program VARCHAR(50),
    semester VARCHAR(10)
);

-- Subjects Table
CREATE TABLE subjects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100),
    mse INT,
    ese INT,
    student_id BIGINT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
```

**Database Schema Overview:**
- **students**: Stores student information (PRN, Name, Department, Program, Semester)
- **subjects**: Stores subject-wise marks (MSE, ESE) linked to students

---

### Step 3: Backend Setup (Java Spring Boot)

1. Open the project folder in VS Code

2. Navigate to: `result/src/main/resources/application.properties`

3. **IMPORTANT:** Update the password to match YOUR MySQL password:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vit_results
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE  # <-- CHANGE THIS
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

4. Open a terminal in the backend folder and run the server:

```bash
cd result
./mvnw spring-boot:run
```

*(Windows users: use `.\mvnw spring-boot:run`)*

5. Wait until you see: **`Started ResultApplication in ...`**

*Backend runs on: http://localhost:8080*

---

### Step 4: Frontend Setup (React)

1. Open a **New Terminal** (keep the Java server running)

2. Navigate to the frontend folder:

```bash
cd frontend
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the React development server:

```bash
npm start
```

*Application opens at: http://localhost:3000*

---

## 📝 How to Use

### 1. Admin Access (Add Student Data)

Since the database starts empty, you need to add data first:

1. Click **"Admin Access"** button on the home page
2. Fill in the student details:
   - PRN (e.g., `12310782`)
   - Name
   - Department
   - Program
   - Semester
3. Add subject-wise marks:
   - Subject Name
   - MSE (Mid Semester Exam) marks
   - ESE (End Semester Exam) marks
4. Click **"Save Student"**
5. Success message will appear

### 2. Student Access (Check Result)

1. Go back to the **Home Page**
2. Enter the PRN you just saved (e.g., `12310782`)
3. Click **"Search"** button
4. View the detailed result card showing:
   - Student information
   - Subject-wise marks and grades
   - Overall CGPA
   - Pass/Fail status

---

## 🧠 Grading Logic

The system automatically calculates results based on **VIT norms**:

### Total Marks Calculation
```
Total Marks = (MSE × 0.30) + (ESE × 0.70)
```

### Grading Scale
| Marks Range | Grade | Grade Points |
|-------------|-------|--------------|
| 90 - 100    | S     | 10           |
| 80 - 89     | A     | 9            |
| 70 - 79     | B     | 8            |
| 60 - 69     | C     | 7            |
| 50 - 59     | D     | 6            |
| < 50        | F     | 0 (Fail)     |

### Pass/Fail Criteria
- **PASS:** All subjects have grades D or above
- **FAIL:** If any subject has grade 'F'

### CGPA Calculation
```
CGPA = (Sum of all Grade Points) / (Number of Subjects)
```

---

## 📡 API Endpoints

The backend exposes the following RESTful endpoints:

### Student Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/students` | Add new student with subjects |
| GET | `/api/students/{prn}` | Get student details by PRN |
| GET | `/api/students` | Get all students |
| PUT | `/api/students/{id}` | Update student details |
| DELETE | `/api/students/{id}` | Delete student record |

### Subject Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subjects/student/{studentId}` | Get all subjects for a student |
| POST | `/api/subjects` | Add new subject |
| PUT | `/api/subjects/{id}` | Update subject marks |
| DELETE | `/api/subjects/{id}` | Delete subject |

---

## 📂 Project Structure

```
vit-result-system/
├── result/                          # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/vit/result/
│   │   │   │       ├── controller/  # REST Controllers
│   │   │   │       ├── model/       # Entity Classes
│   │   │   │       ├── repository/  # JPA Repositories
│   │   │   │       └── service/     # Business Logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml                      # Maven Dependencies
│   └── mvnw                         # Maven Wrapper
│
├── frontend/                        # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/              # Reusable Components
│   │   ├── pages/
│   │   │   ├── HomePage.js          # Student Portal
│   │   │   └── AdminPage.js         # Admin Panel
│   │   ├── services/
│   │   │   └── api.js               # API Calls
│   │   ├── App.js                   # Main Router
│   │   └── App.css                  # Glassmorphism Styles
│   └── package.json
│
└── README.md
```

---

## 🗄️ Database Schema Details

### Students Table
```sql
id          BIGINT (Primary Key, Auto Increment)
prn         VARCHAR(8) UNIQUE NOT NULL
name        VARCHAR(100) NOT NULL
department  VARCHAR(50)
program     VARCHAR(50)
semester    VARCHAR(10)
```

### Subjects Table
```sql
id          BIGINT (Primary Key, Auto Increment)
subject_name VARCHAR(100)
mse         INT (Mid Semester Exam marks)
ese         INT (End Semester Exam marks)
student_id  BIGINT (Foreign Key → students.id)
```

**Relationships:**
- One Student → Many Subjects (One-to-Many)
- CASCADE DELETE: Deleting a student removes all their subjects

---

## 🧪 Testing the Application

### Test Backend API (Using Postman or Browser)

```bash
# Get all students
GET http://localhost:8080/api/students

# Get student by PRN
GET http://localhost:8080/api/students/12310782

# Add new student
POST http://localhost:8080/api/students
Content-Type: application/json

{
  "prn": "12310782",
  "name": "John Doe",
  "department": "Computer Engineering",
  "program": "B.Tech",
  "semester": "5",
  "subjects": [
    {
      "subjectName": "Data Structures",
      "mse": 25,
      "ese": 60
    }
  ]
}
```

### Test Frontend

1. Open http://localhost:3000
2. Go to Admin Panel
3. Add a test student with subjects
4. Go back to Home Page
5. Search for the student using PRN
6. Verify result calculation is correct