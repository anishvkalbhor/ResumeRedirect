"use client";

import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { LiaLinkedinIn } from "react-icons/lia";
import { CgWebsite } from "react-icons/cg";

type SocialLinksProps = {
  socialMedia: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    email?: string;
    twitter?: string;
  };
};

export default function SocialLinks({ socialMedia }: SocialLinksProps) {
  const hasSocialLinks = Object.values(socialMedia).some((url) => url);

  if (!hasSocialLinks) return null;

  return (
    <div className="flex justify-center gap-4 mt-8 pt-4 border-t border-slate-800">
      {socialMedia.github && (
        <a
          href={socialMedia.github}
          className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="GitHub Profile"
          title="GitHub"
        >
          <FaGithub size={18} className="text-slate-300" />
        </a>
      )}

      {socialMedia.linkedin && (
        <a
          href={socialMedia.linkedin}
          className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="LinkedIn Profile"
          title="LinkedIn"
        >
          <LiaLinkedinIn size={18} className="text-slate-300" />
        </a>
      )}

      {socialMedia.portfolio && (
        <a
          href={socialMedia.portfolio}
          className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Portfolio Website"
          title="Portfolio"
        >
          <CgWebsite size={18} className="text-slate-300" />
        </a>
      )}

      {socialMedia.twitter && (
        <a
          href={socialMedia.twitter}
          className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Twitter Profile"
          title="Twitter"
        >
          <FaTwitter size={18} className="text-slate-300" />
        </a>
      )}

      {socialMedia.email && (
        <a
          href={socialMedia.email}
          className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Email"
          title="Email"
        >
          <FaEnvelope size={18} className="text-slate-300" />
        </a>
      )}
    </div>
  );
}
