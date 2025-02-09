# Property Listing App

A full-stack web application for listing properties with location details, images, and descriptions. Users can sign up, log in, and upload their property data, which will then be displayed on the homepage. The application uses a map for selecting the property location and allows image uploads using Cloudinary.

## Features
- **Sign Up and Login**: Secure user authentication using JWT tokens.
- **Property Upload**: Users can upload property data, including images, title, city, area, description, and location (selected via map).
- **Property Listings**: After uploading, the property is automatically displayed on the homepage.
- **Image Upload**: Users can upload property images using Cloudinary.
- **Map Integration**: Users can select the property location from an interactive map.
- **Real-Time Data**: Properties will be automatically shown on the homepage after being uploaded.

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment for building the server-side logic.
- **Express.js**: Web application framework for Node.js.
- **Mongoose**: MongoDB object modeling tool for MongoDB and Node.js.
- **Multer**: Middleware for handling `multipart/form-data` for file uploads (property images).
- **JWT Token**: JSON Web Token used for user authentication.
- **Cloudinary**: A cloud service for storing and managing images.
- **Argon2**: Password hashing algorithm used for user security.
- **Nodemailer**: Used to send email notifications.
- **MongoDB Atlas**: Cloud-based MongoDB service.
- **CORS**: Middleware to enable cross-origin requests.
- **Dotenv**: For managing environment variables.
- **Nodemon**: Utility for automatically restarting the server during development.

### Frontend
- **React**: JavaScript library for building the user interface.
- **Map Integration**: Users can select locations via an interactive map.

## Installation

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system. If not, download it from [nodejs.org](https://nodejs.org/).
- **MongoDB Atlas Account**: Set up an account with MongoDB Atlas for cloud-based MongoDB database management.
- **Cloudinary Account**: Create a Cloudinary account for storing property images.

### Steps to Set Up

1. **Clone the repository**:
   ```bash
   https://github.com/vijaynimar/property.git

## Deployed link
  https://radiant-llama-6c892e.netlify.app

