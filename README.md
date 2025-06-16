<h1 align="center">📚 StudyBuddy AI</h1>
**StudyBuddy AI** is a personalized AI-powered learning companion designed for students and educators. Upload study material — PDFs, lecture slides, or textbooks — and let the app generate:

- ✨ **Smart Summaries**
- ❓ **AI-Generated Quizzes**
- 📌 **Flashcards for Revision**
- 🧠 **Topic Explanations at Multiple Difficulty Levels**
- 🎮 **Gamified Learning Features**

---

## 🚀 Features

- 🧾 Upload PDFs and extract text
- 🧠 Generate summaries with OpenAI
- ❓ Create quizzes and flashcards
- 🎮 Gamify your learning with streaks and leaderboards
- 🔐 JWT-based authentication (signup, login, reset password)
- 📦 MongoDB database for storing users & content

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, ShadCN/UI
- **Backend**: Node.js, Next.js API Routes, MongoDB
- **AI Integration**: OpenAI API
- **Email Service**: Nodemailer + Mailtrap
- **Authentication**: JWT + bcrypt
- **Deployment**: Vercel (planned)

---

## ⚙️ Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/studybuddy-ai.git
cd studybuddy-ai
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file and add the following:

```env
MONGO_URI=your_mongodb_uri
TOKEN_SECRET=your_jwt_secret
DOMAIN=http://localhost:3000
TRANSPORT_USER=your_mailtrap_user
TRANSPORT_PASSWORD=your_mailtrap_pass
```

### 4. Run the App

```bash
npm run dev
```

---

## 📌 To-Do Next

* [ ] Implement file upload and parsing (PDF parsing)
* [ ] Integrate OpenAI for summarization and quiz generation
* [ ] Flashcard creation feature
* [ ] User dashboard with history and progress
* [ ] Gamification system (XP, badges, streaks)

---

## 💡 Inspiration

Built to make studying **smarter**, not harder. StudyBuddy AI empowers learners to consume large volumes of content faster and more effectively — powered by the latest AI tech.

---

## 🤝 Contributing

Contributions are welcome and encouraged!

Fork the project

Create a new branch (git checkout -b feature-name)

Make your changes

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature-name)

Open a Pull Request

---

## 📬 Feedback

Have suggestions? Want to collaborate? Open an issue or reach out!