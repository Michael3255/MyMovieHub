const RatingStars = ({ rating = 0, onRate, size = 'text-xl', editable = false }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={i}
            onClick={() => editable && onRate?.(starValue)}
            className={`${size} cursor-pointer transition-colors ${
              starValue <= rating 
                ? 'text-yellow-400' 
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default RatingStars;