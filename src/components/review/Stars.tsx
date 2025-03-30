export const Star = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 .587l3.668 7.431 8.19 1.189-5.91 5.755 1.397 8.213-7.544-3.97-7.544 3.97 1.397-8.213-5.91-5.755 8.19-1.189z" />
  </svg>
);

export const StarHalf = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 .587l3.668 7.431 8.19 1.189-5.91 5.755 1.397 8.213-7.544-3.97-7.544 3.97 1.397-8.213-5.91-5.755 8.19-1.189z" />
  </svg>
);

export const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="text-yellow-500 w-5 h-5 fill-current" />
      ))}
      {halfStar && <StarHalf className="text-yellow-500 w-5 h-5 fill-current" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-gray-300 w-5 h-5 fill-current" />
      ))}
    </>
  );
};
