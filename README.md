# Auth Session System

[![MIT License][license-shield]][license-url]

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/Chysev/auth-system-session-sern/blob/main/LICENSE

### About the Project

This project is an authentication system built using the SERN stack (SQL, Express, React, and Node.js). It provides user authentication session based functionalities such as registration, login, and logout.

### FEATURES

- User Registration: Users can sign up for an account by providing a unique username and a secure password.
- User Login: Registered users can log in using their credentials.
- Password Hashing: Passwords are securely hashed before storing them in the database.
- Session Management: User sessions are maintained using cookies for authenticated routes.
- User Logout: Users can securely log out of their accounts.

### Coming Soon (v2)

- User Forgot Password
- User Reset Password
- User Change Email
- Admin Page
- User List

### Tech Stack

- **SQL**: Structured Query Language for database management.
- **Express**: Web application framework for Node.js.
- **React**: JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime environment for server-side development.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Chysev/auth-system-session-sern
   ```
2. Config the dotenv (Backend)
   ```sh
   cp .env.example .env.dev and .env.prod
   ```
3. Install dependencies
   ```sh
   npm i or yarn
   ```
4. Database Migration
   ```sh
   npm run prisma:migrate or yarn prisma:migrate
   ```
5. Start the Frontend and Backend
   ```sh
   npm run start or yarn start
   ```
