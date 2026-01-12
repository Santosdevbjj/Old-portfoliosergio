// components/HeroSection.tsx

import React from "react";
import { Translations } from "@/lib/i18n";

type HeroSectionProps = {
  dict: Translations;
};

const HeroSection: React.FC<HeroSectionProps> = ({ dict }) => {
  return (
    <section
      role="region"
      aria-labelledby="hero-title"
      className="
        flex flex-col items-center justify-center text-center
        min-h-[85vh]
        px-6
        bg-white dark:bg-slate-950
        text-slate-900 dark:text-white
        transition-colors duration-300
      "
    >
      <div className="max-w-4xl w-full">
        {/* TÍTULO PRINCIPAL */}
        <h1
          id="hero-title"
          className="
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            font-extrabold
            mb-6
            bg-gradient-to-r from-blue-600 to-purple-600
            bg-clip-text text-transparent
          "
        >
          {dict.sections.aboutIntro}
        </h1>

        {/* SUBTÍTULO / DESCRIÇÃO */}
        <p
          className="
            text-base sm:text-lg md:text-xl lg:text-2xl
            mb-10
            text-slate-600 dark:text-slate-400
            leading-relaxed
          "
        >
          {dict.sections.aboutDetails}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          {/* BOTÃO PROJETOS */}
          <a
            href="#projects"
            aria-label={dict.portfolio.buttonLabel}
            className="
              inline-flex items-center justify-center
              px-8 py-4
              bg-blue-600 hover:bg-blue-700
              text-white font-bold
              rounded-xl
              shadow-xl
              hover:scale-105
              transition-all
            "
          >
            {dict.portfolio.buttonLabel}
          </a>

          {/* BOTÃO CV */}
          <a
            href={dict.cv.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.cv.label}
            className="
              inline-flex items-center justify-center
              px-8 py-4
              bg-transparent
              border-2 border-blue-600
              text-blue-600 dark:text-blue-400
              font-bold
              rounded-xl
              hover:bg-blue-50 dark:hover:bg-blue-900/20
              transition-all
            "
          >
            {dict.cv.label}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
