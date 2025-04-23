"use client";

import { useEffect, useState } from "react";
import { ResumeConfig } from "../../ResumeConfig";
import { FaExternalLinkAlt } from "react-icons/fa";

import ProgressBar from "../components/ProgressBar";
import SocialLinks from "../components/SocialLinks";

export default function Home() {
  const { resumeUrl, name, designation, socialMedia, notifications } =
    ResumeConfig;
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = resumeUrl;
    document.head.appendChild(link);

    const timer = setTimeout(() => {
      setIsRedirecting(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [resumeUrl]);

  const handleRedirectComplete = () => {
    if (notifications?.sendMail !== false) {
      const data = JSON.stringify({
        timestamp: new Date().toISOString(),
        sendMail: notifications?.sendMail ?? true,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/notify-view", data);
      } else {
        fetch("/api/notify-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
          keepalive: true,
        });
      }
    }

    window.location.href = resumeUrl;
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-4 sm:p-8 bg-slate-950 text-slate-200">
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-md mx-auto">
        <div className="w-full bg-slate-900 rounded-lg p-6 sm:p-8 shadow-lg border border-slate-800">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-1 w-full">
              <h1 className="text-2xl font-medium text-slate-100">{name}</h1>
              <p className="text-slate-400 text-sm">{designation}</p>
            </div>
          </div>

          <ProgressBar
            onComplete={handleRedirectComplete}
            disabled={!isRedirecting}
            accelerated={true}
          />

          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-slate-400">
                Didn&apos;t redirect?
              </span>
              <a
                href={resumeUrl}
                className="text-sm text-slate-200 hover:text-white underline flex items-center gap-1"
              >
                Click here <FaExternalLinkAlt size={10} />
              </a>
            </div>
          </div>

          <SocialLinks socialMedia={socialMedia} />
        </div>
      </main>

      <footer className="w-full text-center py-4 mt-4 text-slate-500 text-xs">
        © {new Date().getFullYear()} • {name}
      </footer>
    </div>
  );
}
