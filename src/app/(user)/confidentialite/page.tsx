import Link from "next/link";

export default function Confidentialite() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <div className="mx-auto w-full max-w-[600px] text-center">
        <h1 className="mb-6 font-bold text-yellowkouzua text-title-md xl:text-title-2xl">
          Politique de Confidentialité
        </h1>

        <p className="text-gray-700 text-base sm:text-lg">
          Chez <strong>Ko.Zua</strong>, nous accordons une grande importance à la
          protection de vos données personnelles. Cette politique vise à vous
          informer sur la manière dont nous collectons, utilisons et protégeons
          vos informations.
        </p>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-yellowkouzua">1. Collecte des données</h2>
          <p className="text-gray-600">
            Nous collectons des informations lorsque vous utilisez nos services,
            notamment lorsque vous effectuez une recherche, réservez ou achetez
            un bien immobilier ou une automobile sur <strong>Ko.Zua</strong>.
          </p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-yellowkouzua">2. Utilisation des données</h2>
          <p className="text-gray-600">
            Vos données sont utilisées pour améliorer votre expérience sur notre
            plateforme, faciliter vos réservations et transactions, et vous
            proposer des services adaptés à vos besoins.
          </p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-yellowkouzua">3. Partage des informations</h2>
          <p className="text-gray-600">
            Nous ne partageons vos données qu'avec des partenaires de confiance
            et uniquement dans le cadre nécessaire à l&apos;exécution de nos
            services.
          </p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-yellowkouzua">4. Sécurité</h2>
          <p className="text-gray-600">
            Nous mettons en œuvre des mesures de sécurité avancées pour protéger
            vos informations contre tout accès non autorisé.
          </p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-yellowkouzua">5. Vos droits</h2>
          <p className="text-gray-600">
            Vous avez le droit d&apos;accéder, de modifier ou de supprimer vos
            informations personnelles à tout moment.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border bg-yellowkouzua px-5 py-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-yellowkouzua-dark"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
      
    </div>
  );
}
