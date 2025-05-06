export const ResumeConfig = {
  // URL to the resume file (PDF, DOCX, etc.)
  // This URL should be publicly accessible for the redirect to work
  // You can use services like Google Drive, Dropbox, or your own server to host the file
  // Make sure to set the file permissions to public or anyone with the link can view
  resumeUrl:
    "https://drive.google.com/file/d/1Tp3qt2lX1HfL07tZDFa-4MXj9hrCw0ax/view?usp=drive_link",

  // Personal Information - these will be displayed on the page
  name: "Anish Vijay Kalbhor",
  designation: "Full Stack Developer",

  // Social Media Links - these will be displayed as icons on the page
  // You can add or remove social media links as needed
  // Blank links Icon will not be displayed on the page
  socialMedia: {
    github: "https://github.com/anishvkalbhor",
    linkedin: "https://linkedin.com/in/anishvkalbhor",
    portfolio: "https://portfolio-website-gamma-umber.vercel.app/",
    twitter: "https://x.com/KalbhorAni14950",
    email: "mailto:anishkalbhor2020@gmail.com",
  },

  // Search Engine Optimization (SEO) - these will be used for the page metadata
  // You can customize the title and description for better visibility on search engines
  seo: {
    title: "Anish Kalbhor | Resume",
    description: "Full Stack Developer Resume - Anish Vijay Kalbhor",
  },

  // Email notification settings
  // This will send an email notification when the resume link is opened
  // You can set this to false if you don't want to receive email notifications
  notifications: {
    sendMail: true,
  },
};
