export default function DetailsSkeleton() {
  return (
    <div className="container mx-auto py-10 px-4 mt-12 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-10">
        {/* Galerie */}
        <div>
          <div className="w-full h-[230px] bg-gray-300 rounded-lg"></div>
          <div className="flex gap-2 mt-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-[80px] w-[100px] bg-gray-300 rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        {/* Infos véhicule */}
        <div>
          <div className="mb-10">
            <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
            <div className="flex flex-row justify-between mt-2">
              <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="h-8 w-1/2 bg-gray-300 rounded mt-4"></div>
          </div>

          {/* Sélecteur de date */}
          <div>
            <div className="h-6 w-2/3 bg-gray-300 rounded mb-4"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
          </div>

          {/* Boutons */}
          <div className="flex flex-col xl:flex-row gap-x-3 mt-6">
            <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
          </div>

          {/* Spécifications */}
          <div className="h-6 w-1/3 bg-gray-300 rounded mt-6 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="p-4 bg-gray-300 rounded-lg h-[148px]"
              ></div>
            ))}
          </div>

          {/* Équipement */}
          <div className="mt-6">
            <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-4 w-3/4 bg-gray-300 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="w-full bg-white rounded-md p-6 border border-gray-300">
        <div className="flex border-b border-gray-300 mb-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-8 w-1/4 bg-gray-300 rounded"></div>
          ))}
        </div>
        <div className="h-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
