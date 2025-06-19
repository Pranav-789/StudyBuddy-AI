<h1 align="center">📚 StudyBuddy AI</h1>

**StudyBuddy AI** is a personalized AI-powered learning companion for students and educators. Upload your study material — PDFs, lecture slides, or textbooks — and let the app generate:

- ✨ **Smart Summaries**
<!-- - ❓ **AI-Generated Quizzes** -->
<!-- - 📌 **Flashcards for Revision** -->
- 🧠 **Topic Explanations at Multiple Difficulty Levels**
- 🎮 **Gamified Learning Features**

---

## 🚀 Features

- 🧾 Upload and parse PDFs, DOCX, PPTX, and TXT files
- 🧠 Generate summaries using Google Gemini AI
<!-- - ❓ Create quizzes and flashcards (planned) -->
<!-- - 🎮 Gamify your learning with streaks and leaderboards (planned) -->
- 🔐 JWT-based authentication (signup, login, reset password)
- 📦 MongoDB database for storing users & content
- 📜 View and refine your summary history

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, ShadCN/UI, React Markdown
- **Backend**: Next.js API Routes, Node.js, MongoDB, Mongoose
- **AI Integration**: Google Gemini API
- **File Parsing**: pdf-parse, mammoth, adm-zip
- **Email Service**: Nodemailer + Mailtrap
- **Authentication**: JWT + bcryptjs
- **Deployment**: Vercel (planned)

---

## 📁 Project Structure

```
src/
  app/
    api/             # API routes (upload, summarize, getsummary, users, etc.)
    dashboard/       # Main dashboard page
    summary/         # Summary viewing and refinement
    profile/         # User profile
    login/           # Login page
    signup/          # Signup page
    ...
  components/        # Reusable UI components (Navbar, Card, etc.)
  dbConfig/          # MongoDB connection config
  helpers/           # Helper functions (PDF parsing, mailer, etc.)
  lib/               # Utility libraries (Cloudinary, Gemini, file extractors)
  models/            # Mongoose models (User, Summary)
  ...
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/studybuddy-ai.git
cd studybuddy-ai
```

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
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the App

```bash
npm run dev
```

---

## 📌 To-Do Next

- [ ] Flashcard creation feature
- [ ] User dashboard with history and progress
- [ ] Gamification system (XP, badges, streaks)
- [ ] Quiz generation from content
- [ ] Improved error handling and file type support

---

## 💡 Inspiration

Built to make studying **smarter**, not harder. StudyBuddy AI empowers learners to consume large volumes of content faster and more effectively — powered by the latest AI tech.

---

## 🤝 Contributing

Contributions are welcome and encouraged!

1. Fork the project
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-name`)
6. Open a Pull Request

---

## 📬 Feedback

Have suggestions? Want to collaborate? Open an issue or reach out!