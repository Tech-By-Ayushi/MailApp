# 📬 Mail App

A full-stack Mail App built with the **MERN Stack** (MongoDB, Express, React, Node.js) featuring user authentication, styled UI using Tailwind CSS, and secure mail retrieval.

---

## 🖼️ UI Preview

 Login Page
 ![Screenshot 2025-04-06 220327](https://github.com/user-attachments/assets/a7ef6267-007d-4334-b65f-5def6d19a780)

Mail Page
![Screenshot 2025-04-06 220809](https://github.com/user-attachments/assets/0cac5511-4e0f-4975-81a5-94478f4678c8)


---

## 🚀 Features

- 🔐 User Login
- 📩 Mail Listing UI
- 🌐 API communication via Axios
- 🎨 Tailwind CSS design
- ⚙️ Backend with Express + MongoDB

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (accessed via MongoDB Compass)
- **Icons**: Lucide-react

---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Tech-By-Ayushi/MailApp.git
cd MailApp


### 2. Setup Backend

```bash
cd mern-backend
npm install
node index.js
```

> Make sure MongoDB is running locally.

### 3. Setup Frontend

```bash
cd ../mern-frontend
npm install
npm run dev
```

---

## 📁 Folder Structure

```
MailApp/
├── mern-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx         
│   │   │   └── MailList.jsx      
│   │   ├── App.jsx                
│   │   └── main.jsx              
│   └── .gitignore                
│
├── mern-backend/
│   ├── index.js                  
│   ├── models/
│   │   ├── User.js                
│   │   └── Mail.js                
│   └── routes/
│       ├── auth.js               
│       └── mail.js               

```

---

## 🖼️ UI Preview

Login screen → Authenticated mail list with elegant design using Tailwind CSS.

---

## 🤝 Contributions

Pull requests are welcome. For major changes, please open an issue first.

---

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)

---

## 💡 Author

Made with 💙 by [Ayushi](https://github.com/Tech-By-Ayushi)

