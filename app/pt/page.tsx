// app/pt/page.tsx
export default function Page() {
  return (
    <main>
      {/* Header */}
      <header className="bg-blue-600 text-white text-center p-6">
        <h1 className="text-3xl font-bold">Sérgio Santos — Portfólio</h1>
        <p className="mt-2">
          Analista de Ciência de Dados | Python | SQL | Azure Databricks
        </p>
        <nav className="mt-4 flex justify-center gap-6">
          <a href="#sobre" className="hover:underline">Sobre</a>
          <a href="#experiencia" className="hover:underline">Experiência</a>
          <a href="#projetos" className="hover:underline">Projetos</a>
          <a href="#artigos" className="hover:underline">Artigos</a>
          <a href="#contato" className="hover:underline">Contato</a>
        </nav>
      </header>

      {/* Sobre */}
      <section id="sobre" className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">👨‍💻 Sobre mim</h2>
        <p>
          Analista de Ciência de Dados com mais de 15 anos de experiência em sistemas críticos bancários.
          Foco em transformar dados em decisões estratégicas, redução de custos e eficiência operacional.
        </p>
      </section>

      {/* Experiência */}
      <section id="experiencia" className="bg-gray-100 p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">💼 Experiência</h2>
        <ul className="space-y-4">
          <li>
            <strong>Banco XYZ</strong> — Analista de Sistemas Críticos (2008–2023)  
            <p>Responsável por governança de dados, performance e segurança em ambientes de missão crítica.</p>
          </li>
          <li>
            <strong>Transição para Data Science</strong> — Projetos com Python, SQL, Neo4J e Azure Databricks.  
            <p>Aplicação de IA e ciência de dados para otimização de processos e insights estratégicos.</p>
          </li>
        </ul>
      </section>

      {/* Projetos */}
      <section id="projetos" className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">📂 Projetos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border p-4 rounded shadow">
            <h3 className="font-bold">Governança de Dados</h3>
            <p>Implementação de pipelines de dados com Azure Databricks e monitoramento de qualidade.</p>
          </div>
          <div className="border p-4 rounded shadow">
            <h3 className="font-bold">Análise de Redes</h3>
            <p>Uso de Neo4J para mapear relações complexas e detectar padrões ocultos.</p>
          </div>
        </div>
      </section>

      {/* Artigos */}
      <section id="artigos" className="bg-gray-100 p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">✍️ Artigos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="#" className="text-blue-600 hover:underline">Ciência de Dados aplicada à Governança</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Como otimizar processos com Databricks</a></li>
        </ul>
      </section>

      {/* Contato */}
      <section id="contato" className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">📧 Contato</h2>
        <p>Entre em contato para colaborações ou oportunidades:</p>
        <ul className="mt-4 space-y-2">
          <li>Email: <a href="mailto:santossergiorealbjj@outlook.com" className="text-blue-600 hover:underline">sergio.santos@email.com</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/santossergioluiz" className="text-blue-600 hover:underline">linkedin.com/in/seuperfil</a></li>
          <li>GitHub: <a href="https://github.com/Santosdevbjj" className="text-blue-600 hover:underline">github.com/Santosdevbjj</a></li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-4 mt-8">
        <p>© 2026 Sérgio Santos — Todos os direitos reservados</p>
      </footer>
    </main>
  );
}
