import type { Dictionary } from "../i18n";

export const pt: Dictionary = {
  meta: {
    title: "Sérgio Santos | Data Science & Sistemas de Missão Crítica",
    description:
      "Analista de Ciência de Dados com 15+ anos de experiência no setor bancário (Bradesco). Especialista em transformar dados complexos em inteligência estratégica.",
  },

  navigation: {
    home: "Início",
    about: "Sobre",
    projects: "Portfólio",
    contact: "Contato",
    language: "Idioma",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },

  footer: {
    rights: `© ${new Date().getFullYear()} Sérgio Santos. Engenharia de Dados & Sistemas.`,
  },

  darkMode: {
    lightMode: "Modo Claro",
    darkMode: "Modo Escuro",
  },

  sections: {
    aboutTitle: "👨‍💻 Perfil Profissional",
    aboutIntro: "Analista de Ciência de Dados | Especialista em Sistemas Críticos",
    aboutDetails:
      "Expertise em sistemas de missão crítica bancária, dedicando-se agora à Ciência de Dados, IA e Governança para suporte à decisão estratégica.",

    experienceTitle: "💼 Experiência & Impacto",
    reskillingTitle: "📚 Transição e Especialização",
    differentialTitle: "⭐ Diferencial Competitivo",
    objectiveTitle: "🎯 Objetivo Estratégico",

    stackConsolidated: "Stack Consolidado (Core)",
    stackUpdating: "Stack em Evolução (Dados & IA)",

    projectsTitle: "🛠 Ecossistema de Projetos",
    articlesTitle: "📝 Produção Intelectual",
    featuredArticle: "Artigo Premiado",
    featuredProjectTitle: "🚀 Projeto de Maior Impacto",
    contactTitle: "Vamos Conversar?",

    searchPlaceholder: "Ex: Databricks, Python, Grafos...",
    searchLabel: "Filtrar por tecnologia",
    filtersTitle: "Categorias Técnicas",
    projectsGridTitle: "Repositório de Engenharia",
    noProjectsFound: "Nenhum repositório encontrado para este filtro.",
    projectsEmpty: "Sincronizando dados com a API do GitHub...",
  },

  portfolio: {
    title: "Sérgio Santos",
    description: "Conectando o rigor de sistemas bancários à agilidade da ciência de dados.",
    buttonLabel: "Explorar Projetos",
    projects: "Projetos em Destaque",
  },

  cv: {
    url: "/cv-sergio-santos-pt.pdf",
    label: "Download Curriculum Vitae",
  },

  socialImage: "/og-image-pt.png",

  featuredArticle: {
    title: "Low-Code na Saúde: Como Criar Apps Médicos em Semanas",
    description:
      "Uma análise sobre a aplicação de plataformas de baixo código no setor de saúde, abordando conformidade, benefícios e desenvolvimento acelerado.",
    award1: "🏆 Vencedor da 35ª Competição de Artigos DIO",
    award2: "🏆 Melhor Artigo do Mês - Setembro 2025",
    readOn: "Disponível nas plataformas:",
    links: {
      dio: "https://web.dio.me/articles/low-code-na-saude-como-criar-apps-medicos-em-semanas-d77f6760fa5a",
      linkedin: "https://www.linkedin.com/in/santossergioluiz",
      medium: "https://medium.com/@sergioluiz.santos",
    },
  },

  featuredProject: {
    badge: "PROJETO FLAGSHIP",
    title: "Simulador de Riscos Logísticos",
    highlight: "Ciência de Dados aplicada à Construção Civil e Inteligência de Risco.",
    stack: ["Python", "Azure Databricks", "Streamlit", "Machine Learning"],
    challengeTitle: "O Problema",
    problem:
      "Gargalos logísticos em obras complexas gerando multas recorrentes e atrasos em 35% do cronograma.",
    baselineLabel: "Cenário Legado",
    baseline:
      "Gestão baseada em planilhas estáticas com erro médio de previsão de 18 dias.",
    solutionTitle: "Arquitetura da Solução",
    solution:
      "Pipeline de dados no Databricks com modelo Random Forest, simulador interativo e alertas via bot no Telegram.",
    impactTitle: "Resultado Mensurável",
    result:
      "Redução do erro de previsão para 7 dias e economia operacional estimada em R$ 420 mil/ano.",
    ctaLabel: "Acessar Repositório",
    ctaUrl: "https://github.com/Santosdevbjj/analiseRiscosAtrasoObras",
  },

  experience: {
    item1:
      "Desenvolvimento de sistemas automatizados que eliminaram 2.920 horas/ano de processamento manual.",
    item2:
      "Arquitetura de infraestrutura de rede para 500+ usuários com 99,5% de SLA (disponibilidade).",
    item3:
      "Sustentação de ecossistemas jurídicos com conformidade total à LGPD e auditoria bancária.",

    reskilling:
      "Evolução contínua em Ciência de Dados, Machine Learning e análise de grafos (Neo4j), aplicando rigor técnico a novas tecnologias.",
    differential:
      "Visão sistêmica que une conformidade regulatória bancária com inovação em inteligência artificial.",
    objective:
      "Contribuir em projetos de modernização de infraestrutura, governança de dados ou sistemas regulados de alta complexidade.",
    
    stackConsolidated: "SQL Server, Windows Server, C#, .NET, Governança de TI, Mainframe IBM, Active Directory.",
    stackUpdating: "Python, Azure Databricks, Apache Spark, Neo4j, Machine Learning, Docker, Power BI.",
  },

  projectCategories: {
    dataScience: "Ciência de Dados",
    azureDatabricks: "Azure Databricks",
    neo4j: "Grafos (Neo4J)",
    powerBI: "Power BI & Analytics",
    database: "Bancos de Dados",
    python: "Python",
    dotnet: ".NET & C#",
    java: "Java",
    machineLearning: "Machine Learning",
    aws: "Amazon AWS",
    cybersecurity: "Cibersegurança",
    logic: "Lógica & Algoritmos",
    html: "Web / Frontend",
    articlesRepo: "Artigos Técnicos",
    unknown: "Outros",
  },
};
