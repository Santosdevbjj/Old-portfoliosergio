import type { Dictionary } from "../i18n";

export const pt: Dictionary = {
  meta: {
    title: "Sérgio Santos | Especialista em Dados e Sistemas Críticos",
    description:
      "Analista de Dados Sênior com mais de 20 anos de experiência em sistemas críticos bancários, governança e engenharia de dados.",
  },

  navigation: {
    home: "Início",
    about: "Sobre",
    projects: "Projetos",
    contact: "Contato",
    language: "Idioma",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },

  footer: {
    rights: "© 2026 Sérgio Santos. Todos os direitos reservados.",
  },

  darkMode: {
    lightMode: "Modo Claro",
    darkMode: "Modo Escuro",
  },

  sections: {
    aboutTitle: "👨‍💻 Sobre mim",
    aboutIntro: "Analista de Ciência de Dados | Especialista em Sistemas Críticos",
    aboutDetails:
      "Profissional com sólida experiência no setor bancário (Bradesco), atuando na transformação de dados em decisões estratégicas e eficiência operacional.",

    experienceTitle: "💼 Experiência Técnica",
    reskillingTitle: "📚 Transição & Atualização Profissional",
    differentialTitle: "⭐ Diferencial Profissional",
    objectiveTitle: "🎯 Objetivo",

    // ✅ Adicionado para compatibilidade com page.tsx
    stackConsolidated: "Tecnologias Consolidadas",
    stackUpdating: "Em Atualização / Novos Projetos",

    projectsTitle: "🛠 Portfólio de Projetos",
    articlesTitle: "📝 Produção Técnica",
    featuredArticle: "Artigo Premiado",
    contactTitle: "Contato",

    searchPlaceholder: "Buscar projetos...",
    searchLabel: "Filtrar projetos por tecnologia",
    filtersTitle: "Categorias",
    projectsGridTitle: "Lista de Projetos",
    noProjectsFound: "Nenhum projeto encontrado para esta busca.",
    projectsEmpty: "Carregando projetos do GitHub ou nenhum projeto encontrado com a tag 'portfolio'...",
  },

  portfolio: {
    title: "Sérgio Santos",
    description: "Conectando sistemas legados à inteligência de dados moderna.",
    buttonLabel: "Ver Projetos →",
    projects: "Projetos em Destaque",
  },

  cv: {
    url: "/cv-sergio-santos-pt.pdf",
    label: "Baixar Currículo Vitae (PDF)",
  },

  socialImage: "/og-image-pt.png",

  featuredArticle: {
    title: "Low-Code na Saúde: Apps Médicos em Semanas",
    description:
      "Como a agilidade do low-code pode transformar a gestão hospitalar com segurança e governança.",
    award1: "🏆 Vencedor da 35ª Competição de Artigos DIO",
    award2: "🏆 Melhor Artigo Técnico – Setembro de 2025",
    readOn: "Disponível em:",
    links: {
      dio: "https://web.dio.me/articles/low-code-na-saude-como-criar-apps-medicos-em-semanas-d77f6760fa5a",
      linkedin: "https://www.linkedin.com/in/santossergioluiz",
      medium: "https://medium.com/@sergioluiz.santos",
    },
  },

  featuredProject: {
    title: "Predição de Risco de Atraso em Obras",
    problem:
      "Atrasos em aproximadamente 35% das obras, gerando multas recorrentes e desgaste operacional.",
    baseline:
      "Previsões baseadas apenas em média histórica, com erro médio de 18 dias.",
    solution:
      "Modelo de Machine Learning (Random Forest) integrando clima, solo e desempenho de fornecedores.",
    result:
      "Redução do erro médio para 7 dias e economia estimada de R$ 420 mil por ano.",
  },

  experience: {
    item1:
      "Automação de processos críticos, eliminando aproximadamente 2.920 horas anuais de trabalho manual.",
    item2:
      "Gestão de infraestrutura corporativa para mais de 500 usuários, com 99,5% de disponibilidade.",
    item3:
      "Desenvolvimento e sustentação de sistemas jurídicos críticos com rastreabilidade total e conformidade com LGPD.",

    reskilling:
      "Processo estruturado de reskilling iniciado em 2023, com foco em Engenharia de Dados e Machine Learning.",
    differential:
      "Capacidade diferenciada de integrar governança de sistemas críticos com inteligência artificial.",
    objective:
      "Atuar em projetos onde eficiência operacional, qualidade de dados e redução de riscos sejam prioridades estratégicas.",
    
    // ✅ Adicionado para compatibilidade com o componente de Skills no page.tsx
    stackConsolidated: "Windows Server, SQL Server, C#, .NET, Governança de TI, Segurança de Dados.",
    stackUpdating: "Python, Azure Databricks, Apache Spark, Neo4j, Machine Learning, Power BI.",
  },

  projectCategories: {
    dataScience: "Ciência de Dados",
    azureDatabricks: "Azure Databricks",
    neo4j: "Neo4J",
    powerBI: "Power BI",
    database: "Banco de Dados",
    python: "Python",
    dotnet: "C# .NET",
    java: "Java",
    machineLearning: "Machine Learning",
    aws: "AWS Cloud",
    cybersecurity: "Cibersegurança",
    logic: "Lógica de Programação",
    html: "Front-end",
    articlesRepo: "Artigos",
    unknown: "Geral",
  },
};
