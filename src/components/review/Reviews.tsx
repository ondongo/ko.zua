import {
  getLastFiveRatingsForVehicle,
  getAverageRatingForVehicle,
  createReview,
} from "@/actions/reviews";
import { Rating } from "@/types/review";

import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { renderStars } from "./Stars";
import { Modal } from "../ui/modals";
import { v4 as uuid } from "uuid";

export default function Reviews({ vehicleId }: { vehicleId: string }) {
  const [reviewData, setReviewData] = useState({
    stars: 0,
    content: "",
    authorName: "",
  });
  const [reviews, setReviews] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Charger les avis et la note moyenne
  useEffect(() => {
    async function fetchReviews() {
      const ratings = await getLastFiveRatingsForVehicle(vehicleId);
      const avgRating = await getAverageRatingForVehicle(vehicleId);
      setReviews(ratings);
      setAverageRating(avgRating);
    }
    fetchReviews();
  }, [vehicleId]);

  // Gérer l'ajout d'un avis

  const openModal = () => setModalOpen(true);

  // Fonction pour fermer la modal
  const closeModal = () => setModalOpen(false);
  async function handleAddReview() {
    if (
      !reviewData.content ||
      reviewData.stars === 0 ||
      !reviewData.authorName
    ) {
      toast.error("Tous les champs doivent être remplis avec une note valide.");
      return;
    }
    await createReview({
      ...reviewData,
      vehicleId,
      immobilierId: null, // A remplacer par l'id du bien immobilier si disponible
      id: uuid(),
      createdAt: new Date(),
    });
    toast.success("Avis ajouté avec succès !");
    closeModal();

    // Rafraîchir les avis
    const updatedRatings = await getLastFiveRatingsForVehicle(vehicleId);
    const updateAvgRating = await getAverageRatingForVehicle(vehicleId);
    setAverageRating(updateAvgRating);
    setReviews(updatedRatings);
    setReviewData({
      stars: 0,
      content: "",
      authorName: "",
    });
  }
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Section Note Moyenne */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
        <h2 className="text-lg font-semibold">Notes</h2>
        <div className="flex items-center mt-4">
          <span className="text-4xl font-bold">
            {" "}
            {averageRating.toFixed(1)}
          </span>
          <div className="ml-2 flex">{renderStars(averageRating)}</div>
        </div>

        <div className="mt-4 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => {
            // Calculer le nombre d'avis pour chaque note
            const starCount = reviews.filter(
              (review) => review.stars === star
            ).length;

            // Calculer le pourcentage d'avis pour cette note
            const percentage =
              reviews.length > 0 ? (starCount / reviews.length) * 100 : 0;

            return (
              <div key={star} className="flex items-center">
                <span className="text-sm">{star} ★</span>
                <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-yellowkouzua rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm">{starCount}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold">
            Donnez votre avis sur ce produit
          </h3>
          <p className="text-gray-500 text-sm">
            Partagez vos idées avec d'autres clients
          </p>
          <button
            className="mt-2 bg-black text-white px-4 py-2 rounded-lg w-full"
            onClick={openModal}
          >
            Écrire un avis
          </button>
        </div>
      </div>

      {/* Section Avis Clients */}
      <div className="w-full md:w-2/3">
        <h2 className="text-lg font-semibold"> Listes des clients</h2>
        <div className="mt-4 border-t pt-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="mb-4 flex flex-col items-start gap-2 justify-start"
            >
              <div className="flex items-center justify-start gap-2">
                <div className="w-10 h-10 bg-yellowkouzua text-white rounded-full flex items-center justify-center font-semibold">
                  {review.authorName[0]}
                </div>
                <div>
                  <p className="font-semibold">{review.authorName}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-1">
                {renderStars(review.stars)}
              </div>
              <p className="text-gray-700 mt-2">{review.content}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        className="max-w-[420px] py-10"
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold">Écrire un avis</h2>
          <div className="mt-4 flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-8 h-8 cursor-pointer ${
                  reviewData.stars > index ? "text-yellow-500" : "text-gray-300"
                } fill-current`}
                onClick={() =>
                  setReviewData({ ...reviewData, stars: index + 1 })
                }
              />
            ))}
          </div>

          <input
            type="text"
            placeholder="Votre nom "
            onChange={(e) =>
              setReviewData({ ...reviewData, authorName: e.target.value })
            }
            className="mt-4 p-2 w-full border rounded-lg"
          />
          <textarea
            value={reviewData.content}
            onChange={(e) =>
              setReviewData({ ...reviewData, content: e.target.value })
            }
            placeholder="Laissez un commentaire"
            className="mt-4 p-2 w-full border rounded-lg"
            rows={4}
          />
          <div className="mt-6">
            <button
              onClick={closeModal}
              className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Annuler
            </button>

            <button
              onClick={handleAddReview}
              className="bg-yellowkouzua hover:bg-yellowkouzua-dark text-white px-4 py-2 rounded-lg"
            >
              Soumettre
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
