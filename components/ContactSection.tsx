"use client";

import { DEFAULT_LOCALE, getDictionary, Locale } from "@/lib/i18n";

interface Props {
  locale?: Locale;
}

export default function ContactSection({ locale = DEFAULT_LOCALE }: Props) {
  const dict = getDictionary(locale);

  return (
    <section
      id="contact"
      role="region"
      aria-labelledby="contact-title"
      lang={locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR"}
      className="container mx-auto max-w-3xl px-4 lg:px-8 py-10 sm:py-16 space-y-6 sm:space-y-8 bg-surface-light dark:bg-surface-dark transition-colors duration-300"
    >
      {/* Título multilíngue */}
      <h2
        id="contact-title"
        className="font-bold text-[clamp(1.75rem,3vw+1rem,2.5rem)] text-gray-900 dark:text-gray-100 text-center"
      >
        {dict.sections.contactTitle}
      </h2>

      {/* Formulário de contato */}
      <form
        className="space-y-6"
        aria-label={dict.sections.contactTitle}
        onSubmit={(e) => {
          e.preventDefault();
          alert("Form submitted!");
        }}
      >
        {/* Nome */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {locale === "en"
              ? "Name"
              : locale === "es"
              ? "Nombre"
              : "Nome"}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Mensagem */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {locale === "en"
              ? "Message"
              : locale === "es"
              ? "Mensaje"
              : "Mensagem"}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          ></textarea>
        </div>

        {/* Botão enviar */}
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {locale === "en"
              ? "Send Message"
              : locale === "es"
              ? "Enviar Mensaje"
              : "Enviar Mensagem"}
          </button>
        </div>
      </form>
    </section>
  );
}
