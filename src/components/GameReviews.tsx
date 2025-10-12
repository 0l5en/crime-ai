import gamerAvatar1 from "@/assets/gamer-avatar-1.jpg";
import gamerAvatar2 from "@/assets/gamer-avatar-2.jpg";
import gamerAvatar3 from "@/assets/gamer-avatar-3.jpg";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const GameReviews = () => {
  const { t } = useTranslation('home');
  
  const reviews = [
    {
      name: "Marcus W.",
      roleKey: "reviews.review1.role",
      avatar: gamerAvatar1,
      rating: 5,
      textKey: "reviews.review1.text"
    },
    {
      name: "Laura K.",
      roleKey: "reviews.review2.role",
      avatar: gamerAvatar2,
      rating: 5,
      textKey: "reviews.review2.text"
    },
    {
      name: "Thomas S.",
      roleKey: "reviews.review3.role",
      avatar: gamerAvatar3,
      rating: 5,
      textKey: "reviews.review3.text"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-primary" : "text-muted"}
        fill={i < rating ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <section className="py-5 d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">{t('reviews.title')}</h2>
            <p className="lead">
              {t('reviews.subtitle')}
            </p>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {reviews.map((review, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card bg-body border-0 h-100 card-hover">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="rounded-circle me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">{review.name}</h6>
                      <small className="text-muted">{t(review.roleKey)}</small>
                    </div>
                  </div>

                  <p className="mb-3" style={{ fontStyle: 'italic' }}>
                    "{t(review.textKey)}"
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