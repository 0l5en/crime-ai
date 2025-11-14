import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { useSiteRating } from "@/hooks/useSiteRating";
import { useUserContext } from "@/contexts/UserContext";
import { updateSchemaRating } from "@/utils/updateSchemaRating";
import { useEffect } from "react";

const Footer = () => {
  const { t } = useTranslation("common");
  const user = useUserContext();
  const { setRating, getUserRating, getSiteStats } = useSiteRating(user.name || undefined);
  const stats = getSiteStats();
  const userRating = getUserRating();

  // Update schema on mount and when stats change
  useEffect(() => {
    updateSchemaRating(stats.averageRating, stats.totalRatings);
  }, [stats.averageRating, stats.totalRatings]);

  const handleRatingChange = (rating: number) => {
    setRating(rating);
    // Stats will be recalculated and useEffect will update schema
  };

  return (
    <footer className="bg-body py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
              <h5 className="mb-0 me-2">DetectivesGame</h5>
              <span className="badge bg-primary rounded-pill px-2 py-1" style={{ fontSize: "0.6rem" }}>
                BETA
              </span>
            </div>
            <p className="mb-3 mb-md-0 text-secondary text-center text-md-start" style={{ fontSize: "0.95rem" }}>
              {t("footer.description")}
            </p>
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3 mb-md-0 mt-3">
              <StarRating
                rating={stats.averageRating}
                onRatingChange={handleRatingChange}
                readonly={false}
                size={24}
                showCount={false}
              />
              {stats.totalRatings > 0 && (
                <span className="text-secondary" style={{ fontSize: "0.9rem" }}>
                  {stats.averageRating.toFixed(1)} / {stats.totalRatings}
                </span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-md-end">
              <div className="d-flex gap-4 mb-2 flex-wrap justify-content-center justify-content-md-end">
                <a
                  href="/terms"
                  className="text-secondary text-decoration-none footer-link"
                  style={{ fontSize: "0.8rem", transition: "color 0.2s ease" }}
                >
                  {t("footer.terms")}
                </a>
                <a
                  href="/privacy"
                  className="text-secondary text-decoration-none footer-link"
                  style={{ fontSize: "0.8rem", transition: "color 0.2s ease" }}
                >
                  {t("footer.privacy")}
                </a>
                <a
                  href="/cookies"
                  className="text-secondary text-decoration-none footer-link"
                  style={{ fontSize: "0.8rem", transition: "color 0.2s ease" }}
                >
                  {t("footer.cookies")}
                </a>
                <a
                  href="/imprint"
                  className="text-secondary text-decoration-none footer-link"
                  style={{ fontSize: "0.8rem", transition: "color 0.2s ease" }}
                >
                  {t("footer.imprint")}
                </a>
                <Link
                  to="/contact"
                  className="text-secondary text-decoration-none footer-link"
                  style={{ fontSize: "0.8rem", transition: "color 0.2s ease" }}
                >
                  {t("footer.contact")}
                </Link>
                <Link
                  to="/faq"
                  className="text-secondary text-decoration-none footer-link"
                  style={{ fontSize: "0.8rem", transition: "color 0.2s ease" }}
                >
                  FAQ
                </Link>
              </div>
              <p className="mb-0 text-secondary text-center text-md-end" style={{ fontSize: "0.7rem" }}>
                {t("footer.copyright")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
