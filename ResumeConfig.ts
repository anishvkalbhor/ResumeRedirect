export const ResumeConfig = {
  // URL to the resume file (PDF, DOCX, etc.)
  // This URL should be publicly accessible for the redirect to work
  // You can use services like Google Drive, Dropbox, or your own server to host the file
  // Make sure to set the file permissions to public or anyone with the link can view
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL,

  // Personal Information - these will be displayed on the page
  name: "VishalRMahajan",
  designation: "Software Development Engineer",

  // Social Media Links - these will be displayed as icons on the page
  // You can add or remove social media links as needed
  // Blank links Icon will not be displayed on the page
  socialMedia: {
    github: "https://github.com/VishalRMahajan",
    linkedin: "https://linkedin.com/in/VishalRMahajan",
    portfolio: "https://vishalrmahajan.in",
    twitter: "https://x.com/VishalRMahajan",
    email: "mailto:vism06@gmail.com",
  },

  // Search Engine Optimization (SEO) - these will be used for the page metadata
  // You can customize the title and description for better visibility on search engines
  seo: {
    title: "Vishal Mahajan | Developer Resume",
    description: "Resume of Vishal Mahajan (VishalRMahajan).",
  },
  // Email notification settings
  // This will send an email notification when the resume link is opened
  // You can set this to false if you don't want to receive email notifications
  notifications: {
    sendMail: true,
  },
};
