import { Star, StarHalf } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "uixstore",
    date: "octobre 5, 2022",
    rating: 4,
    comment:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Exceptetur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default function Reviews() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Section Note Moyenne */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
        <h2 className="text-lg font-semibold">Notes</h2>
        <div className="flex items-center mt-4">
          <span className="text-4xl font-bold">4.0</span>
          <div className="ml-2 flex">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="text-yellow-500 w-5 h-5" />
            ))}
            <StarHalf className="text-yellow-500 w-5 h-5" />
          </div>
        </div>
        <p className="text-gray-500">1 Évaluation du produit</p>

        <div className="mt-4 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center">
              <span className="text-sm">{star} ★</span>
              <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full">
                {star === 4 && (
                  <div className="h-2 bg-orange-400 rounded-full w-3/4"></div>
                )}
              </div>
              <span className="text-sm">{star === 4 ? 1 : 0}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold">Donnez votre avis sur ce produit</h3>
          <p className="text-gray-500 text-sm">
            Partagez vos idées avec d'autres clients
          </p>
          <button className="mt-2 bg-black text-white px-4 py-2 rounded-lg w-full">
            Écrire un avis
          </button>
        </div>
      </div>

      {/* Section Avis Clients */}
      <div className="w-full md:w-2/3">
        <h2 className="text-lg font-semibold">Avis des clients (1)</h2>
        <div className="mt-4 border-t pt-4">
          {reviews.map((review) => (
            <div key={review.id} className="mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                  UX
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-gray-500 text-sm">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center mt-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 w-4 h-4" />
                ))}
                <StarHalf className="text-yellow-500 w-4 h-4" />
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
