import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import Header from "@/components/Header";
import { useUserContext } from '@/contexts/UserContext';
import { useCrimeCases } from "@/hooks/useCrimeCasesBasic";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Cases = () => {
  const { t } = useTranslation("cases");
  const [page, setPage] = useState(1);
  const [allCases, setAllCases] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const user = useUserContext();

  const {
    data: crimeCases,
    isLoading,
    error,
  } = useCrimeCases({
    maxResults: (page * 6).toString(),
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update all cases when new data arrives
  useEffect(() => {
    if (crimeCases?.items) {
      setAllCases(crimeCases.items);
      setHasMore(crimeCases.items.length === page * 6);
    }
  }, [crimeCases, page]);

  const getImageColor = (index: number) => {
    const colors = [
      "bg-gradient-red",
      "bg-gradient-blue",
      "bg-gradient-green",
      "bg-gradient-purple",
      "bg-gradient-orange",
      "bg-gradient-teal",
    ];
    return colors[index % colors.length];
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
      isLoading ||
      !hasMore
    ) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  }, [isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-vh-100" style={{ backgroundColor: "var(--bs-body-bg)" }}>
      <Header />

      <main className="py-5">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-4" style={{ color: "var(--bs-body-color)" }}>
              {t("title")}
            </h1>
            <p className="lead" style={{ color: "var(--bs-secondary)" }}>
              {t("subtitle")}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && page === 1 && (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "var(--bs-primary)" }} role="status">
                <span className="visually-hidden">{t("loading")}</span>
              </div>
              <div className="mt-3" style={{ color: "var(--bs-secondary)" }}>
                {t("loadingCases")}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-5">
              <div className="text-danger h4 mb-3">{t("error")}</div>
              <div className="text-muted">{error.message}</div>
            </div>
          )}

          {/* Empty State */}
          {!error && !isLoading && allCases.length === 0 && (
            <div className="text-center py-5">
              <div className="h5" style={{ color: "var(--bs-secondary)" }}>
                {t("noCases")}
              </div>
            </div>
          )}

          {/* Cases Grid */}
          {!error && allCases.length > 0 && (
            <>
              <div className="row g-4 mb-4">
                {allCases.map((crimeCase, index) => (
                  <div key={crimeCase.id} className="col-lg-4 col-md-6">
                    <GameCard
                      title={crimeCase.title}
                      description={crimeCase.summary}
                      imageUrl={crimeCase.imageUrl}
                      caseId={crimeCase.id}
                      userId={user?.email}
                    />
                  </div>
                ))}
              </div>

              {/* Load More Indicator */}
              {isLoading && page > 1 && (
                <div className="text-center py-4">
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    style={{ color: "var(--bs-primary)" }}
                    role="status"
                  >
                    <span className="visually-hidden">{t("loading")}</span>
                  </div>
                  <span style={{ color: "var(--bs-secondary)" }}>{t("loadingMore")}</span>
                </div>
              )}

              {/* No More Cases */}
              {!hasMore && !isLoading && (
                <div className="text-center py-4">
                  <div style={{ color: "var(--bs-secondary)" }}>{t("allViewed")}</div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cases;
