import { useState, useEffect, useCallback } from "react";
import { useKeycloak } from "@/contexts/KeycloakContext";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import { useTranslation } from "react-i18next";
import GameCard from "@/components/GameCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cases = () => {
  const { t } = useTranslation("cases");
  const [page, setPage] = useState(1);
  const [allCases, setAllCases] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    type: "all", // 'all', 'free', 'premium'
    epoch: "all", // 'all', 'ancient', 'medieval', 'modern', 'contemporary'
    language: "all", // 'all', 'german', 'english'
  });

  const { user } = useKeycloak();

  const {
    data: crimeCases,
    isLoading,
    error,
  } = useCrimeCases({
    caseGeneratorFormType: "BASIC",
    status: "PUBLISHED,PREMIUM",
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

          {/* Filters Section (Placeholders - Not Functional Yet) */}
          <div
            className="card mb-5"
            style={{ backgroundColor: "var(--bs-body-bg)", border: "1px solid var(--bs-border-color)" }}
          >
            <div className="card-body">
              <h5 className="card-title mb-4" style={{ color: "var(--bs-body-color)" }}>
                {t("filters.title")}
              </h5>

              <div className="row g-3">
                {/* Free vs Premium Filter */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: "var(--bs-body-color)" }}>
                    {t("filters.caseType.label")}
                  </label>
                  <select
                    className="form-select"
                    value={selectedFilters.type}
                    onChange={(e) => setSelectedFilters((prev) => ({ ...prev, type: e.target.value }))}
                    style={{
                      backgroundColor: "var(--bs-body-bg)",
                      border: "1px solid var(--bs-border-color)",
                      color: "var(--bs-body-color)",
                    }}
                  >
                    <option value="all">{t("filters.caseType.all")}</option>
                    <option value="free">{t("filters.caseType.free")}</option>
                    <option value="premium">{t("filters.caseType.premium")}</option>
                  </select>
                </div>

                {/* Epoch Filter */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: "var(--bs-body-color)" }}>
                    {t("filters.timePeriod.label")}
                  </label>
                  <select
                    className="form-select"
                    value={selectedFilters.epoch}
                    onChange={(e) => setSelectedFilters((prev) => ({ ...prev, epoch: e.target.value }))}
                    style={{
                      backgroundColor: "var(--bs-body-bg)",
                      border: "1px solid var(--bs-border-color)",
                      color: "var(--bs-body-color)",
                    }}
                  >
                    <option value="all">{t("filters.timePeriod.all")}</option>
                    <option value="ancient">{t("filters.timePeriod.ancient")}</option>
                    <option value="medieval">{t("filters.timePeriod.medieval")}</option>
                    <option value="modern">{t("filters.timePeriod.modern")}</option>
                    <option value="contemporary">{t("filters.timePeriod.contemporary")}</option>
                  </select>
                </div>

                {/* Language Filter */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: "var(--bs-body-color)" }}>
                    {t("filters.language.label")}
                  </label>
                  <select
                    className="form-select"
                    value={selectedFilters.language}
                    onChange={(e) => setSelectedFilters((prev) => ({ ...prev, language: e.target.value }))}
                    style={{
                      backgroundColor: "var(--bs-body-bg)",
                      border: "1px solid var(--bs-border-color)",
                      color: "var(--bs-body-color)",
                    }}
                  >
                    <option value="all">{t("filters.language.all")}</option>
                    <option value="german">{t("filters.language.german")}</option>
                    <option value="english">{t("filters.language.english")}</option>
                  </select>
                </div>
              </div>

              {/* Reset Filters Button */}
              <div className="mt-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setSelectedFilters({ type: "all", epoch: "all", language: "all" })}
                  style={{
                    borderColor: "var(--bs-primary)",
                    color: "var(--bs-primary)",
                  }}
                >
                  {t("filters.reset")}
                </button>
              </div>
            </div>
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
