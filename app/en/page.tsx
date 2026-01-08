export default function HomeEN() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Data Science Analyst • Python • SQL • Azure Databricks
        </h1>

        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Welcome! I am a professional with over 15 years of experience in
          mission-critical banking systems, now focused on transforming data
          into strategic intelligence.
        </p>
      </header>

      {/* Featured Projects Section */}
      <section className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Featured Projects
        </h2>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Below are some of the projects that reflect my experience in data,
          analytics engineering, and business-oriented solutions.
        </p>
      </section>
    </section>
  );
}
