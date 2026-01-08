'use client';

import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
  useEffect(() => {
    console.log('Página carregada');
  }, []);

  return (
    <div
      role="main"
      aria-label="Conteúdo principal"
      className="min-h-screen flex flex-col transition-colors duration-500 px-4 sm:px-6 lg:px-8"
    >
      {children}
    </div>
  );
}
