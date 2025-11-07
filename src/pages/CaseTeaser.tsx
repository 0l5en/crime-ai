import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCrimeCase } from '@/hooks/useCrimeCase';
import { useCaseVictims } from '@/hooks/useCaseVictims';
import { useCaseEvidences } from '@/hooks/useCaseEvidences';
import { useCaseWitnesses } from '@/hooks/useCaseWitnesses';
import { useCaseSuspects } from '@/hooks/useCaseSuspects';
import { useUserContext } from '@/contexts/UserContext';
import { FileText, Users, UserCheck } from 'lucide-react';

const CaseTeaser = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const user = useUserContext();

  const { data: crimeCase, isLoading: caseLoading } = useCrimeCase(caseId || '');
  const { data: victims, isLoading: victimsLoading } = useCaseVictims(caseId || '');
  const { data: evidences } = useCaseEvidences(caseId || '');
  const { data: witnesses } = useCaseWitnesses(caseId || '');
  const { data: suspects } = useCaseSuspects(caseId || '');

  const handleStartInvestigation = () => {
    if (user.isAuthenticated) {
      navigate(`/case/${caseId}`);
    } else {
      navigate('/register', { state: { from: `/case/${caseId}` } });
    }
  };

  if (caseLoading || victimsLoading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Lädt...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!crimeCase) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Fall nicht gefunden</div>
      </div>
    );
  }

  const victim = victims?.[0];
  const evidenceCount = evidences?.items?.length || 0;
  const witnessCount = witnesses?.items?.length || 0;
  const suspectCount = suspects?.items?.length || 0;

  const pageUrl = `${window.location.origin}/case-preview/${caseId}`;
  const imageUrl = crimeCase.imageUrl || '';
  
  console.log('CaseTeaser Debug:', { 
    caseId, 
    imageUrl, 
    crimeCaseData: crimeCase 
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": crimeCase.title,
    "description": crimeCase.description,
    "inLanguage": "de",
    "image": imageUrl,
    "url": pageUrl,
    "genre": "Kriminalspiel",
    "gamePlatform": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <Helmet>
        <html lang="de" />
        <title>{crimeCase.title} - DetectivesGame</title>
        <meta name="description" content={crimeCase.summary || crimeCase.description?.substring(0, 160)} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={crimeCase.title} />
        <meta property="og:description" content={crimeCase.summary || crimeCase.description?.substring(0, 160)} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="de_DE" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={crimeCase.title} />
        <meta name="twitter:description" content={crimeCase.summary || crimeCase.description?.substring(0, 160)} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="container-fluid px-0">
        {/* Hero Section */}
        <section className="bg-dark py-5">
          <div className="container py-4">
            <div className="row align-items-start g-4">
              <div className="col-lg-7">
                <h1 className="display-4 fw-bold mb-4 text-white">{crimeCase.title}</h1>
                {crimeCase.summary && (
                  <p className="lead fs-4 text-white-50">{crimeCase.summary}</p>
                )}
              </div>
              <div className="col-lg-5">
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt={crimeCase.title}
                    className="img-fluid rounded shadow-lg w-100"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                    loading="eager"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container py-5">
          <article className="row justify-content-center">
            <div className="col-lg-10">
              
              {/* Statistics Cards */}
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="card h-100 border-secondary">
                    <div className="card-body text-center">
                      <FileText className="mb-3" size={48} style={{ color: 'var(--bs-primary)' }} />
                      <h3 className="display-6 fw-bold mb-2">{evidenceCount}</h3>
                      <p className="text-muted mb-0">Beweise</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-secondary">
                    <div className="card-body text-center">
                      <Users className="mb-3" size={48} style={{ color: 'var(--bs-primary)' }} />
                      <h3 className="display-6 fw-bold mb-2">{witnessCount}</h3>
                      <p className="text-muted mb-0">Zeugen</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-secondary">
                    <div className="card-body text-center">
                      <UserCheck className="mb-3" size={48} style={{ color: 'var(--bs-primary)' }} />
                      <h3 className="display-6 fw-bold mb-2">{suspectCount}</h3>
                      <p className="text-muted mb-0">Verdächtige</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Description */}
              <section className="card border-secondary mb-5">
                <div className="card-body">
                  <h2 className="card-title h3 mb-4">Die Fallakte</h2>
                  <p className="card-text" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                    {crimeCase.description}
                  </p>
                </div>
              </section>

              {/* Victim Information */}
              {victim && (
                <section className="card border-secondary mb-5">
                  <div className="card-body">
                    <h2 className="card-title h3 mb-4">Das Opfer</h2>
                    <div className="row align-items-center">
                      {victim.imageUrl && (
                        <div className="col-md-4 mb-3 mb-md-0">
                          <img 
                            src={victim.imageUrl} 
                            alt={`${victim.firstName} ${victim.lastName}`}
                            className="img-fluid rounded"
                            style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className={victim.imageUrl ? 'col-md-8' : 'col-12'}>
                        <h3 className="h4 mb-3">{victim.firstName} {victim.lastName}</h3>
                        <p className="mb-2">
                          <strong>Alter:</strong> {victim.age} Jahre
                        </p>
                        {victim.profession && (
                          <p className="mb-2">
                            <strong>Beruf:</strong> {victim.profession}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Call to Action */}
              <section className="card border-primary bg-primary bg-opacity-10 text-center">
                <div className="card-body py-5">
                  <h2 className="h3 mb-4">Bereit, den Fall zu lösen?</h2>
                  <p className="lead mb-4">
                    Beginne deine Ermittlungen und finde den Täter!
                  </p>
                  <button 
                    onClick={handleStartInvestigation}
                    className="btn btn-primary btn-lg px-5 py-3"
                  >
                    Starte die Ermittlungen
                  </button>
                  {!user.isAuthenticated && (
                    <p className="text-muted mt-3 mb-0">
                      <small>Kostenlose Registrierung erforderlich</small>
                    </p>
                  )}
                </div>
              </section>

            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default CaseTeaser;
