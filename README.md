<p align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/share-2.svg" alt="Social Poster Logo" width="120" height="120">
</p>

<h1 align="center">Social Poster</h1>

<p align="center">
  <strong>The Ultimate Next.js Social Media Management Platform</strong><br>
  Schedule, loop, and automate your social media presence with ease.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#development-status">Development Status</a>
</p>

---

## 🚀 Overview

**Social Poster** is a modern, high-performance Social Media Management tool built with Next.js and React. It empowers users to manage multiple social accounts, schedule posts seamlessly, set up auto-comments, and dive deep into analytics—all from a single, beautifully designed dashboard.

Whether you're managing a personal brand or a large-scale marketing campaign, Social Poster provides the tools necessary to stay consistent, organized, and engaged with your audience.

## ✨ Features

- 📅 **Smart Post Scheduling**: Plan your content calendar across platforms visually.
- 🔁 **Loop Posting**: Automatically recycle and repost evergreen content.
- 💬 **Auto-Comment & Replies**: Set up advanced auto-commenting rules to keep engagement high.
- 👥 **Group Management**: Seamlessly post to multiple social media groups at once.
- 📊 **Detailed Analytics**: Track your growth, reach, and engagement with real-time charts.
- 📱 **Responsive Dashboard**: Manage your campaigns on the go with a mobile-first, dark-mode ready UI.

## 🏗 Architecture

The project strictly follows **Clean Architecture** principles to ensure maintainability, testability, and scalability:

```text
src/
├── application/     # Use cases, application business rules
├── infrastructure/  # External integrations (APIs, Databases, local/remote services)
├── presentation/    # React components, UI logic, layouts, and views
└── stores/          # State management (Zustand)
```

## 💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [@react-spring/web](https://react-spring.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📈 Development Status

Currently, the project is rapidly advancing through the **Frontend Prototyping Phase**:
- ✅ Clean Architecture foundation established.
- ✅ App Router structure built for all core modules (`/dashboard`, `/schedule`, `/analytics`, etc.).
- ✅ Beautiful, responsive UI components designed and mocked up.
- 🚧 API Integrations & Backend wiring (In Progress).

## 🚀 Getting Started

First, ensure you have Node.js installed, then clone the repository and install dependencies:

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check out the [issues page](https://github.com/your-username/social-poster/issues).

---

<p align="center">
  Built with ❤️ using Next.js
</p>
