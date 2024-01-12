
# inoteBook(memosphere)

[![Screenshot-58.png](https://i.postimg.cc/9XxQTwF5/Screenshot-58.png)](https://postimg.cc/6TvKx3vY)
Explore the power of MERN stack with our Online Note-Taking Full-Stack Website. Secure user authentication, an intuitive admin panel, and seamless deployment make this project a robust solution for efficient note management. Dive into the codebase to witness the synergy of MongoDB, Express.js, React, and Node.js, creating a user-centric and feature-rich web application


## Demo
https://imemosphere.web.app/

## Features

- Full-Stack MERN Application: Leverage the power of MongoDB, Express.js, React, and Node.js for a comprehensive full-stack experience.

- User Authentication: Secure user authentication ensures a trustworthy environment for managing notes.

- Intuitive Admin Panel: A user-friendly admin panel for efficient user management and oversight.

- Responsive Frontend: Utilizes React.js, Material-UI, and Ant Design for a responsive and visually appealing user interface.

- Deployment and Hosting: Seamless deployment and hosting strategies for consistent and reliable online accessibility.

- Dynamic Animations: Framer Motion library enhances the user experience with dynamic and engaging animations.

- Robust API Endpoints: Well-documented API reference for smooth interaction with backend services.

- Future-Ready: Consideration for future enhancements, including collaborative note-taking and advanced search functionalities.

- Version Control: Managed through Git for effective version control and collaboration.

## Screenshots

[![signup.png](https://i.postimg.cc/pdW5Bb8p/signup.png)](https://postimg.cc/k2H5nHTm)

[![login.png](https://i.postimg.cc/hGdH4jpd/login.png)](https://postimg.cc/HJTSBpGY)

[![add.png](https://i.postimg.cc/Xv2hj50x/add.png)](https://postimg.cc/KKMQQRjg)

[![notes.png](https://i.postimg.cc/MTzzfVcB/notes.png)](https://postimg.cc/8FX2qFmk)

[![about.png](https://i.postimg.cc/9FmXXrzS/about.png)](https://postimg.cc/jC1YZqHQ)


## Tech Stack

**Client:** React, Material_UI, AntDesign

**Server:** Node, Express

**Database:** MongoDB

## API Reference


### 1. Create User

#### `POST /api/createuser`

Creates a new user with the provided name, email, and password.

##### Request Body

- `name` (string): User's name (min length: 3 characters).
- `email` (string): User's email address (must be a valid email).
- `password` (string): User's password (min length: 5 characters).

##### Response

- Success (Status Code: 200):
  ```json
  {
    "success": true,
    "authToken": "JWT_TOKEN"
  }

### 2. User Login

#### `POST /api/login`

Logs in a user with the provided email and password.

##### Request Body

- `email` (string): User's email address.
- `password` (string): User's password.

##### Response

- **Success** (Status Code: 200):
  ```json
  {
    "success": true,
    "authToken": "JWT_TOKEN"
  }
### 3.Fetch All Notes

GET /fetchallnotes

Description: Retrieves all notes belonging to the authenticated user.

Authentication: Required

Response:[
  {
    "_id": "62c54a154a954a154a954a15",
    "title": "Note 1",
    "description": "This is the first note",
    "tag": "important",
    "user": "62c54a154a954a154a954a15"
  },
  {
    // ... more notes
  }
]

### 4. Add Note

POST /addnote

Description: Creates a new note.

Authentication: Required

Body:{
  "title": "Note Title",
  "description": "Note Description",
  "tag": "Optional tag"
}

### 5 .Update Note

PUT /updatenote/:id

Description: Updates an existing note.

Authentication: Required

Body:{
  "title": "Updated Title",
  "description": "Updated Description",
  "tag": "Updated Tag"
}
### 6. Delete Note

DELETE /deletenote/:id

Description: Deletes a note.

Authentication: Required

Response: "Note has been deleted"
## Authentication

All endpoints require authentication using the fetchuser middleware.

## Error Handling

- **400 Bad Request:**
  - Description: Invalid request data.

- **401 Unauthorized:**
  - Description: Authentication failed.

- **404 Not Found:**
  - Description: Resource not found.

- **500 Internal Server Error:**
  - Description: Unexpected server error.

## Run Locally

Clone the project

```bash
  git clone https://github.com/vibhorarya12/inoteBook-Memosphere-
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm start
```


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## 🚀 About 
Welcome to Memosphere, your ultimate destination for seamless and efficient note-making. Memosphere is a meticulously crafted online note-taking application designed to elevate your digital note-taking experience. Whether you're a student, professional, creative thinker, or someone who loves staying organized, Memosphere empowers you to capture, organize, and access your ideas effortlessly. At Memosphere, we understand that ideas can strike at any moment, and preserving them should be a frictionless process. With this in mind, we've developed a powerful platform that seamlessly integrates the MERN stack – MongoDB, Express, React, and Node.js – to provide you with an intuitive, robust, and secure environment for all your note-taking needs.Our mission at Memosphere is to empower individuals with a seamless and enjoyable note-taking experience. We aim to break down the barriers between your thoughts and their digital representation, ensuring that no brilliant idea goes unrecorded..
We invite you to become a part of the Memosphere community – a gathering of diverse minds united by their passion for effective note-taking. Whether you're a student aiming for academic success, a professional striving for productivity, or a creative spirit capturing inspiration, Memosphere is here to support your journey. Start your note-taking adventure with Memosphere today and witness how your ideas transform into organized brilliance. Welcome to the future of note-making!
Team MemoSphere 


