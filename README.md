# Blog Application

A full-stack blog platform where users can sign up, log in, create, edit, and like blog posts. Built with **Node.js**, **Express**, **MongoDB**, and **React (Vite)**.
## 🎬 Demo Video

[Watch on YouTube](https://www.youtube.com/watch?v=gx1Sl9BcA6g)

## demo images
<img width="1919" height="979" alt="Screenshot 2025-07-14 173411" src="https://github.com/user-attachments/assets/400d92f6-5ada-4008-bdbe-32307482ed9a" />

<img width="1919" height="977" alt="Screenshot 2025-07-14 173425" src="https://github.com/user-attachments/assets/b4109ead-54e6-496d-ba7e-4326930a5036" />
<img width="1919" height="971" alt="Screenshot 2025-07-14 173447" src="https://github.com/user-attachments/assets/32c5e9d6-b02f-484d-97b6-ca8b03e379b4" />
<img width="1919" height="972" alt="Screenshot 2025-07-14 173453" src="https://github.com/user-attachments/assets/cff48b96-31ea-4c92-a346-5b1db873d6d8" />
<img width="1919" height="978" alt="Screenshot 2025-07-14 173505" src="https://github.com/user-attachments/assets/fada6f1f-90eb-493b-98d3-15658419f19f" />

<img width="1919" height="982" alt="Screenshot 2025-07-14 173656" src="https://github.com/user-attachments/assets/d8f30d2d-6c55-4cd5-8389-90267564ed20" />





## Features

- 🔐 JWT-based Authentication
- Create Blogs
-  Upload images via Cloudinary
-  Comments (optional)
- RLike/Dislike blogs
- Forgot Password (Mailtrap)1

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (for image uploads)
- Nodemailer (Mailtrap for testing emails)
- JSON Web Tokens (JWT)

### Frontend
- React (with Vite)
- Axios
- Tailwind CSS

---
### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/VIGGU-7/chat-application.git
cd chat-application
```

#### 2. Install dependencies

**Backend:**
```sh
cd backend
npm install
```

**Frontend:**
```sh
cd ../frontend
npm install
```



## ⚙️ Environment Variables

### 🔐 Backend `.env`

Create a `backend/.env` file and add:

```env
MONGO_URI=mongodb://localhost:27017/blog-application
JWT_SECRET=your_jwt_secret
clientUrl=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMTP (Mailtrap for testing)
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_pass

```
#### 4. Start the Application

**Backend:**
```sh
npm run dev
```

**Frontend:**
```sh
npm start
```

The frontend runs on [http://localhost:5173](http://localhost:5173)  
The backend runs on [http://localhost:8080](http://localhost:8080)

## Usage

- Register a new account or log in and verify email.
- Update your profile.
- Start creating blogs


## Project Structure

```
blog-application/
├── backend/ # Express backend
├── frontend/ # React frontend
├── README.md # Project README
└── .gitignore # Git ignored files
```

## Customization

- To enable/disable real-time features, adjust socket logic in the context files.
- Update styles in `frontend/src` as needed.
