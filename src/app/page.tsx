"use client";

import { useEffect, useState, useRef } from "react";
import { ResumeConfig } from "../../ResumeConfig";
import { FaExternalLinkAlt } from "react-icons/fa";

import ProgressBar from "../components/ProgressBar";
import SocialLinks from "../components/SocialLinks";

export default function Home() {
  const { resumeUrl, name, designation, socialMedia, notifications } =
    ResumeConfig;
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const emailSentRef = useRef(false);

  useEffect(() => {
    setMounted(true);

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
    if (!emailSentRef.current && notifications?.sendMail !== false) {
      emailSentRef.current = true;

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

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0deg,_#7c3aed_180deg,_transparent_360deg)] opacity-5"></div>

      <div className="relative z-10 flex flex-col justify-between min-h-screen p-6 sm:p-8">
        <main className="flex flex-col items-center justify-center flex-grow w-full max-w-md mx-auto">
          <div className="w-full backdrop-blur-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-purple-900/20">
            <div className="flex flex-col items-center text-center mb-10">
              <h1 className="text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-3 tracking-tight">
                {name}
              </h1>

              <div className="w-[60px] h-[2px] bg-gradient-to-r from-purple-600 to-purple-400 mb-4" />

              <p className="text-gray-300 text-xs font-medium tracking-widest uppercase">
                {designation}
              </p>
            </div>

            <div>
              <ProgressBar
                onComplete={handleRedirectComplete}
                disabled={!isRedirecting}
                accelerated={true}
              />
            </div>

            <div className="text-center mt-10">
              <p className="text-gray-500 text-sm mb-3 font-medium">
                Redirect not working?
              </p>
              <a
                href={resumeUrl}
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm underline underline-offset-4 hover:underline-offset-2 transition-all duration-200"
              >
                Open resume directly <FaExternalLinkAlt size={12} />
              </a>
            </div>

            <div>
              <SocialLinks socialMedia={socialMedia} />
            </div>
          </div>
        </main>

        <footer className="w-full text-center py-8 text-gray-600 text-sm font-medium">
          <div className="flex items-center justify-center gap-3">
            <span className="text-gray-400">
              © {new Date().getFullYear()} {name}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
