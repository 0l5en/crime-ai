import { Star } from "lucide-react";

const GameReviews = () => {
  const reviews = [
    {
      name: "Marcus W.",
      role: "Amateur Detective",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The cases are incredibly well-researched, and the AI makes investigating a real experience. Inspector Kruger always makes me smile!"
    },
    {
      name: "Laura K.",
      role: "Premium Member", 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "I've tried many detective games, but none are as immersive as DetectivesGame. The premium cases are worth every penny!"
    },
    {
      name: "Thomas S.",
      role: "Crime Enthusiast",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The ability to question witnesses and analyze evidence feels like being in a real crime drama. Absolutely addictive!"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-warning" : "text-muted"}
        fill={i < rating ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <section className="py-5 bg-secondary text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">What Our Detectives Say</h2>
            <p className="lead text-light">
              Experiences from investigators who have already solved cases
            </p>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {reviews.map((review, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card bg-dark border-0 h-100 card-hover">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="rounded-circle me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-0 text-light fw-bold">{review.name}</h6>
                      <small className="text-muted">{review.role}</small>
                    </div>
                  </div>
                  
                  <p className="text-light mb-3" style={{ fontStyle: 'italic' }}>
                    "{review.text}"
                  </p>
                  
                  <div className="d-flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameReviews;