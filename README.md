# Blog-It 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47a248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Blog-It** is a premium, open-source multi-platform blogging hub. Write your blogs once in a unified, modern editor and publish them instantly to top developer platforms like **Dev.to** and **Hashnode** with a single click.

---

## ✨ Core Features

- 📝 **Unified Block Editor**: A block-based editor powered by BlockNote, supporting headers, text formatting, list structures, code blocks, and cover image options.
- 📂 **Draft Management Workspace**: A clean, centralized dashboard to create, view, update, and delete your local drafts.
- ⚙️ **Publishing Channel Setup**: Fields to configure and verify credentials for popular developer networks (**Dev.to** and **Hashnode**) from your settings page.
- 📡 **Real-time Connection Indicators**: Visual, live-status badges integrated into the sidebar showing which accounts are configured.
- 🔐 **Secure Authentication**: Secure user registration and sign-in utilizing email/password verification and bcrypt password hashing.
- 🖼️ **CDN-Optimized Cover Uploads**: Media upload utility integrated with ImageKit CDN to upload and store blog cover images.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Sass
- **Database**: MongoDB & Mongoose ORM
- **State Management**: Zustand
- **Editor Core**: BlockNote (ProseMirror-based block editor)
- **Image Hosting**: ImageKit
- **Email Delivery**: Resend

---

## 📂 Project Architecture

```txt
blogit/
├── src/
│   ├── app/                # Next.js App Router (pages, actions, and API routes)
│   ├── components/         # Reusable UI & Layout Components
│   │   ├── app-components/ # Feature-specific components (blog editor, settings, sidebar)
│   │   └── ui/             # Core UI components (buttons, dropdowns, cards)
│   ├── controller/         # Server-side business logic
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Shared utilities, constants, and typescript types
│   ├── models/             # Mongoose schemas (User, Blog, Waitlist)
│   ├── services/           # Frontend API connection services (auth, setting, blog)
│   └── store/              # Zustand client-side stores (user, blog, setting)
├── public/                 # Static assets (images, webp, logos)
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or later)
- [MongoDB](https://www.mongodb.com/) database (local or Atlas cluster)

### 💻 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KushalXCoder/blogit.git
   cd blogit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` or `.env` file in the root directory and fill in your credentials:
   ```env
   # Database & Authentication
   MONGO_URI="your-mongodb-connection-string"
   JWT_SECRET="your-secure-jwt-secret"
   BASE_URL="http://localhost:3000/api"

   # Email Service (Resend)
   RESEND_API_KEY="your-resend-api-key"

   # Image Upload CDN (ImageKit)
   IMAGEKIT_URL="https://ik.imagekit.io/your-id"
   IMAGEKIT_PUBLIC_KEY="your-imagekit-public-key"
   IMAGEKIT_PRIVATE_KEY="your-imagekit-private-key"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## ⚙️ Publishing Integrations

To enable multi-platform publishing, navigate to **Settings > Account Integrations** on your dashboard and configure your keys:

### 1. Dev.to Integration
- Go to your Dev.to Account Settings.
- Scroll down to the **API Keys** section.
- Generate a new key and copy the value.
- Add your profile URL or key in Blog-It's Integration Settings and click **Verify**.

### 2. Hashnode Integration
- Go to your Hashnode Account Settings.
- Under the **Developer** section, generate a new Personal Access Token.
- Enter the API URL or key in Blog-It's settings and verify.

Once verified, the sidebar will show green connection badges, indicating the platform channels are active and ready.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
