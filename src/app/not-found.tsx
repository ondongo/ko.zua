export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-600">404 - Véhicule introuvable</h1>
        <p className="text-gray-600 mt-2">Désolé, le véhicule que vous cherchez n'existe pas.</p>
        <a href="/vehicles" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Retour aux véhicules
        </a>
      </div>
    );
  }
  