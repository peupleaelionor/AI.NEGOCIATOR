export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">AI Negotiator</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Expert en négociation salariale et contractuelle pour le marché français.
        Analysez vos offres et obtenez des arguments solides pour négocier.
      </p>
      <div className="flex gap-4">
        <a
          href="/negotiate"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
        >
          Analyser une offre
        </a>
        <a
          href="/refer"
          className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium"
        >
          Parrainer un ami
        </a>
      </div>
    </div>
  );
}
