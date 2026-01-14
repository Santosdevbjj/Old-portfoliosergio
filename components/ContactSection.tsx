"use client";

import { DEFAULT_LOCALE, getDictionary, Locale } from "@/lib/i18n";
import { Send, Mail, User, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState, useMemo } from "react";

interface Props {
  locale?: Locale;
}

export default function ContactSection({ locale = DEFAULT_LOCALE }: Props) {
  const dict = getDictionary(locale);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de integração (Pode ser substituído por fetch para Formspree/Resend)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();

    // Volta ao estado inicial após 5 segundos
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      role="region"
      aria-labelledby="contact-title"
      lang={htmlLangMap[locale]}
      className="container mx-auto max-w-5xl px-6 lg:px-8 py-20 sm:py-32"
    >
      <div className="flex flex-col items-center text-center space-y-6 mb-16">
        <h2
          id="contact-title"
          className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter"
        >
          {dict.sections.contactTitle}
        </h2>
        <div className="h-2 w-24 bg-blue-600 rounded-full" />
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
          {locale === 'pt' ? 'Interessado em colaborar ou discutir um projeto? Vamos conversar.' : 
           locale === 'es' ? '¿Interesado en colaborar o discutir un proyecto? Hablemos.' : 
           'Interested in collaborating or discussing a project? Let\'s talk.'}
        </p>
      </div>

      <div className="relative overflow-hidden bg-white dark:bg-slate-900/40 p-8 md:p-16 rounded-[3rem] border border-slate-100 dark:border-slate-800/50 shadow-2xl shadow-blue-500/5 backdrop-blur-sm">
        {/* Glow Decorativo */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
        
        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="p-4 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
              <CheckCircle2 size={64} />
            </div>
            <h3 className="text-3xl font-black tracking-tighter dark:text-white">
              {locale === 'pt' ? 'Mensagem Enviada!' : locale === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs">
              {locale === 'pt' ? 'Obrigado pelo contato. Responderei o mais breve possível.' : 'Thanks for reaching out. I\'ll get back to you shortly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label htmlFor="name" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                <User size={14} className="text-blue-600" />
                {locale === 'pt' ? 'Nome' : locale === 'es' ? 'Nombre' : 'Name'}
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-bold"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="email" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                <Mail size={14} className="text-blue-600" />
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-bold"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label htmlFor="message" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                <MessageSquare size={14} className="text-blue-600" />
                {locale === 'pt' ? 'Mensagem' : locale === 'es' ? 'Mensaje' : 'Message'}
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all resize-none font-bold"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex flex-col items-center gap-6 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  group relative inline-flex items-center gap-4 px-12 py-5 
                  rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 
                  text-xs font-black uppercase tracking-[0.3em]
                  hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white 
                  transition-all hover:scale-105 active:scale-95
                  disabled:opacity-50 shadow-2xl shadow-blue-500/10
                "
              >
                {isSubmitting ? (locale === 'pt' ? 'Enviando...' : 'Sending...') : (locale === 'pt' ? 'Enviar Mensagem' : 'Send Message')}
                <Send size={18} className={`${isSubmitting ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1"} transition-transform`} />
              </button>
              
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {locale === 'pt' ? 'Ou envie e-mail para:' : 'Or send email to:'} <span className="text-blue-600">seuemail@exemplo.com</span>
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
