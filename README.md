
# Mentor-Student Management API

This is a simple API built using Node.js and Express for managing mentors and students. The API allows you to create mentors, create students, assign students to mentors, change mentor assignments, and query the mentor-student relationships.

## Features

- Create mentors and students.
- Assign students to mentors.
- Assign multiple students to a mentor.
- Change the mentor for a student.
- Retrieve all students assigned to a particular mentor.
- Retrieve the previous mentors of a student.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Vigneshwarrs/day-39
    cd day-39
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

    The API will be available at `http://localhost:3000`.

### API Endpoints

#### 1. Create a Mentor

- **Endpoint:** `POST /api/mentor`
- **Body:**
  ```json
  {
    "name": "Mentor Name"
  }
  ```
Response: Mentor object

#### 2. Create a Student
- **Endpoint:** `POST /api/student`
- **Body:**
 ```json
{
  "name": "Student Name"
}
```
Response: Student object

#### 3. Get All Mentors
- **Endpoint:**  `GET /api/mentor`
Response: Array of mentor objects

#### 4. Get All Students
- **Endpoint:**  `GET /api/student`
Response: Array of student objects

#### 5. Assign a Student to a Mentor
- **Endpoint:**  `POST /api/assignMentor`
- **Body:**
```json
{
  "mentorId": "mentor-id",
  "studentId": "student-id"
}
```
Response: Updated mentor object

#### 6. Assign Multiple Students to a Mentor
- **Endpoint:**  `POST /api/assignMultipleMentors`
- **Body:**
```json
{
  "mentorId": "mentor-id",
  "studentIds": ["student-id1", "student-id2"]
}
```
Response: Updated mentor object

#### 7. Change Mentor for a Student
- **Endpoint:**  `PUT /api/changeMentor/:studentId`
- **Body:**
```json
{
  "mentorId": "new-mentor-id"
}
```
Response: Updated student object

#### 8. Get All Students for a Particular Mentor
- **Endpoint:**  `GET /api/students/:mentorId`
Response: Object containing the mentor and an array of assigned student objects

#### 9. Get Previously Assigned Mentors for a Student
- **Endpoint:**  `GET /api/previousMentors/:studentId`
Response: Array of mentor objects that were previously assigned to the student
