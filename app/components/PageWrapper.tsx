"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: ReactNode;
}

/**
 * PageWrapper: Gerencia a transição de entrada de todas as páginas.
 * Implementa Motion para um "feel" de App Nativo.
 */
export default function PageWrapper({ children }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        // Acessibilidade: Desativa animação se o usuário prefere movimentos reduzidos
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier para um movimento mais orgânico
        }}
        className="
          flex-1 flex flex-col
          w-full max-w-7xl mx-auto
          px-4 sm:px-8 lg:px-12
          pt-24 pb-12 sm:pt-32 sm:pb-20
          relative z-10
        "
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
