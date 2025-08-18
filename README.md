
  
<h1 align="center">
  ResumeRedirect
</h1>

ResumeRedirect is a lightweight and modern solution for sharing your resume via a persistent link  with built-in branding, fallback links, and optional email notifications. Perfect for developers who frequently update their resumes but want a single link that stays consistent. 🚀📄

## Demo




https://github.com/user-attachments/assets/6f566a5e-778b-4161-8390-92b995f057ea



## Table of Contents

- [Overview](#overview)
- [Why ResumeRedirect?](#why-resumeredirect)
- [Demo](#demo)
- [Features](#features)
- [Configuration](#configuration)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [License](#license)


## Overview

You share your resume with someone but resumes evolve. With traditional links, any updates require resharing. ResumeRedirect solves that. 🔁

Deploy once, share the link, and forget the rest. Any changes you make to your resume will automatically reflect at the same URL without your recipients needing a new link. Plus, a clean UI lets the viewer know the resume is loading and includes fallback contact links in case redirection fails. 💡


## Why ResumeRedirect?

Let’s face it sending a direct link to your resume can be limiting:

- You can't update your resume without updating the URL (unless you overwrite the file).
- No branding or personal presence before redirect.
- No way to track or log views (optionally).
- No fallback if the file is unreachable.

**ResumeRedirect** solves all these problems with a beautiful, minimal, and practical solution. Whether you’re a student, freelancer, or experienced engineer, it helps you present yourself better and stay in control of your resume link. 🧠💼


## Demo

- Live: [resume.vishalrmahajan.in](https://resume.vishalrmahajan.in)


## Features

- ✨ Auto-redirect with animated loading indicator
- 🌙 Dark-themed, responsive business card UI
- 📩 Email notifications when your resume is opened (configurable)
- 🔧 Simple single-file configuration (`ResumeConfig.ts`)
- 📈 SEO optimized for better discoverability
- 📎 Fallback UI shows social/contact links + direct resume link if redirection fails
- 🚀 One-click deploy on Vercel


## Configuration

Configure your resume and profile data in `ResumeConfig.ts`:

```ts
export const ResumeConfig = {
  resumeUrl: "https://drive.google.com/your-resume-link",
  name: "Your Name",
  designation: "Your Role",
  socialMedia: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    portfolio: "https://yourportfolio.com",
    twitter: "https://x.com/yourhandle",
    email: "mailto:you@example.com",
  },
  seo: {
    title: "Your Name | Resume",
    description: "Software Developer Resume - Your Name",
  },
  notifications: {
    sendMail: true,
  },
};
```

Environment variables in `.env`:

```env
EMAIL_USER=you@example.com
EMAIL_PASSWORD=your_app_password
NOTIFICATION_EMAIL=notify@example.com
```


## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/VishalRMahajan/ResumeRedirect.git
cd ResumeRedirect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Project

```bash
npm run dev
```

Please consider starring the repository if you find this useful 🌟


## Deployment

Deploy with Vercel:

<p align="center">
  <a href="https://vercel.com/new/project?template=https://github.com/VishalRMahajan/ResumeRedirect">
    <img src="https://vercel.com/button" alt="Deploy to Vercel" />
  </a>
</p>


## Tech Stack

<p align="left">
  <img src="https://skillicons.dev/icons?i=nextjs,tailwindcss,ts,&perline=14" />
</p>

## License

This project is licensed under the [MIT License](./LICENSE).

<p align="center">
Built with ❤️ by <a href="https://vishalrmahajan.in"> Vishal Rajesh Mahajan</a>
</p>
