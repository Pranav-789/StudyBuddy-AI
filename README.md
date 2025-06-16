Here’s a clean, professional `README.md` for your **StudyBuddy AI** GitHub repository. It introduces the project, outlines features, tech stack, setup instructions, and contribution notes — all optimized for a solo dev or collaborators.

---

### 📄 `README.md`

````markdown
# 📚 StudyBuddy AI

**Your Personalized Learning Assistant**  
Built with 💙 using Next.js, MongoDB, and Google Gemini API

---

## 🚀 What is StudyBuddy AI?

StudyBuddy AI is a full-stack AI SaaS platform that helps students and self-learners:

- 📄 Summarize PDFs, lecture notes, or textbooks
- 🧠 Generate multiple-choice quizzes
- 🃏 Create flashcards for revision
- 🧒 Get explanations like you're 5 or 🧑‍🏫 like a professor

> Designed to make learning *personalized*, *fun*, and *AI-powered*.

---

## ✨ Features

- 🔐 JWT Authentication with MongoDB
- 📤 Upload and parse PDFs
- 🤖 Gemini AI integration for summarization and content generation
- 🧪 Auto-generated MCQs and flashcards
- 💡 Simple explanations (ELI5 + Advanced)
- 🎯 User-friendly UI built with Tailwind and shadcn/ui

---

## 🧰 Tech Stack

| Layer        | Stack                                    |
|--------------|------------------------------------------|
| Frontend     | Next.js (App Router), Tailwind, shadcn/ui |
| Backend      | API Routes (Next.js), Mongoose, JWT      |
| AI Engine    | Google Gemini Pro API                    |
| Database     | MongoDB Atlas                            |
| PDF Parsing  | pdf-parse (Node.js)                      |
| Auth         | JWT + bcrypt                             |
| Deployment   | Vercel (Frontend/API), MongoDB Atlas     |

---

## 🧑‍💻 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/studybuddy-ai.git
cd studybuddy-ai
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Run the App

```bash
npm run dev
```

The app will be running on [http://localhost:3000](http://localhost:3000)

---

## 🔮 Gemini AI Prompts (Used Internally)

* **Summary Prompt:**
  `Summarize the following content in bullet points: <text>`

* **Quiz Prompt:**
  `Create 5 MCQs with 4 options each from: <summary>`

* **Flashcards Prompt:**
  `Create short Q&A flashcards from this content: <summary>`

* **Explain Like I’m 5 / Professor:**
  `Explain this like I'm 5: <topic>`
  `Explain this like a professor: <topic>`

---

## 🛠️ In Progress

* [x] Auth flow (register/login)
* [x] PDF Upload and Summary
* [ ] Quiz Generation
* [ ] Flashcards
* [ ] Explanation Modes
* [ ] Final UI polish + deployment

---

## 🤝 Contributing

This project is solo-built for learning and demonstration, but feel free to fork and play around!

---

## 📜 License

MIT License. Free to use, modify, and learn from. 💙

---

> Made with sweat and semicolons by [Pranav](https://github.com/Pranav-789)

```

---
