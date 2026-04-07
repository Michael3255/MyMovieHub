// Displays 5 clickable stars for rating a movie
// If editable is false the stars are display-only
export default function RatingStars({ rating = 0, onRate, editable = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => editable && onRate && onRate(star)}
          style={{
            fontSize: "20px",
            color: star <= rating ? "#f5c518" : "#2a2a5a",
            cursor: editable ? "pointer" : "default",
            transition: "color 0.2s ease",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
