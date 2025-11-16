import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useCrimeCases } from "@/hooks/useCrimeCasesBasic";
import { components } from "@/openapi/crimeAiSchema";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type CrimeCaseDto = components['schemas']['CrimeCaseDto'];

const Cases = () => {
  const { t } = useTranslation(["cases", "meta"]);
  const breadcrumbData = useBreadcrumb();
  const [page, setPage] = useState(1);
  const [allCases, setAllCases] = useState<CrimeCaseDto[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: crimeCases,
    isLoading,
    error,
  } = useCrimeCases({
    maxResults: (page * 6).toString(),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (crimeCases?.items) {
      setAllCases(crimeCases.items);
      setHasMore(crimeCases.items.length === page * 6);
    }
  }, [crimeCases, page]);

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
    <>
      <SEO 
        title={t('meta:cases.title')}
        description={t('meta:cases.description')}
        canonical="/cases"
        keywords={t('meta:cases.keywords')}
      />
      {breadcrumbData && <StructuredData type="breadcrumb" data={breadcrumbData} />}
      <div className="min-vh-100" style={{ backgroundColor: "var(--bs-body-bg)" }}>
        <Header />

        <main className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-4" style={{ color: "var(--bs-body-color)" }}>
                {t("title")}
              </h1>
              <p className="lead" style={{ color: "var(--bs-secondary)" }}>
                {t("subtitle")}
              </p>
            </div>

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

            {error && (
              <div className="text-center py-5">
                <div className="text-danger h4 mb-3">{t("error")}</div>
                <div className="text-muted">{error.message}</div>
              </div>
            )}

            {!error && !isLoading && allCases.length === 0 && (
              <div className="text-center py-5">
                <div className="h5" style={{ color: "var(--bs-secondary)" }}>
                  {t("noCases")}
                </div>
              </div>
            )}

            {!error && allCases.length > 0 && (
              <>
                <div className="row g-4 mb-4">
                  {allCases.map((crimeCase) => (
                    <div key={crimeCase.id} className="col-lg-4 col-md-6">
                      <GameCard crimaCase={crimeCase} />
                    </div>
                  ))}
                </div>

                {isLoading && page > 1 && (
                  <div className="text-center py-4">
                    <div
                      className="spinner-border spinner-border-sm"
                      style={{ color: "var(--bs-primary)" }}
                      role="status"
                    >
                      <span className="visually-hidden">{t("loadingMore")}</span>
                    </div>
                  </div>
                )}

                {!hasMore && (
                  <div className="text-center py-4">
                    <div className="text-muted">{t("allViewed")}</div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Cases;
