// app/en/page.tsx
export default function Page() {
  return (
    <main>
      {/* Header */}
      <header className="bg-blue-600 text-white text-center p-6">
        <h1 className="text-3xl font-bold">Sérgio Santos — Portfolio</h1>
        <p className="mt-2">
          Data Science Analyst | Python | SQL | Azure Databricks
        </p>
        <nav className="mt-4 flex justify-center gap-6">
          <a href="#about" className="hover:underline">About</a>
          <a href="#experience" className="hover:underline">Experience</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#articles" className="hover:underline">Articles</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* About */}
      <section id="about" className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">👨‍💻 About me</h2>
        <p>
          Data Science Analyst with over 15 years of experience in mission-critical banking systems.
          Focused on turning data into strategic decisions, cost reduction, and operational efficiency.
        </p>
      </section>

      {/* Experience */}
      <section id="experience" className="bg-gray-100 p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">💼 Experience</h2>
        <ul className="space-y-4">
          <li>
            <strong>Bank XYZ</strong> — Critical Systems Analyst (2008–2023)  
            <p>Responsible for data governance, performance, and security in mission-critical environments.</p>
          </li>
          <li>
            <strong>Transition to Data Science</strong> — Projects with Python, SQL, Neo4J, and Azure Databricks.  
            <p>Applying AI and data science to optimize processes and generate strategic insights.</p>
          </li>
        </ul>
      </section>

      {/* Projects */}
      <section id="projects" className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">📂 Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border p-4 rounded shadow">
            <h3 className="font-bold">Data Governance</h3>
            <p>Implementation of data pipelines with Azure Databricks and quality monitoring.</p>
          </div>
          <div className="border p-4 rounded shadow">
            <h3 className="font-bold">Network Analysis</h3>
            <p>Using Neo4J to map complex relationships and detect hidden patterns.</p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="bg-gray-100 p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">✍️ Articles</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="#" className="text-blue-600 hover:underline">Data Science applied to Governance</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">How to optimize processes with Databricks</a></li>
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">📧 Contact</h2>
        <p>Get in touch for collaborations or opportunities:</p>
        <ul className="mt-4 space-y-2">
          <li>Email: <a href="mailto:santossergiorealbjj@outlook.com" className="text-blue-600 hover:underline">sergio.santos@email.com</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/santossergioluiz" className="text-blue-600 hover:underline">linkedin.com/in/seuperfil</a></li>
          <li>GitHub: <a href="https://github.com/Santosdevbjj" className="text-blue-600 hover:underline">github.com/Santosdevbjj</a></li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-4 mt-8">
        <p>© 2026 Sérgio Santos — All rights reserved</p>
      </footer>
    </main>
  );
}
