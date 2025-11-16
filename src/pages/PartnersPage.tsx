import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import PartnersHero from "@/components/PartnersHero";
import PartnersGrid from "@/components/PartnersGrid";
import { PartnerVenueData } from "@/components/PartnerVenueCard";
import { Link } from "react-router-dom";
import { Award } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

// Avatar imports
import thomasMuellerAvatar from "@/assets/avatars/thomas-mueller-de.jpg";
import lauraSchmidtAvatar from "@/assets/avatars/laura-schmidt-de.jpg";
import marcusWeberAvatar from "@/assets/avatars/marcus-weber-de.jpg";
import jamesAndersonAvatar from "@/assets/avatars/james-anderson-en.jpg";
import emilyParkerAvatar from "@/assets/avatars/emily-parker-en.jpg";
import oliverBennettAvatar from "@/assets/avatars/oliver-bennett-en.jpg";
import thomasDuboisAvatar from "@/assets/avatars/thomas-dubois-fr.jpg";
import sophieLaurentAvatar from "@/assets/avatars/sophie-laurent-fr.jpg";
import marcRousseauAvatar from "@/assets/avatars/marc-rousseau-fr.jpg";
import marcoBianchiAvatar from "@/assets/avatars/marco-bianchi-it.jpg";
import sofiaRossiAvatar from "@/assets/avatars/sofia-rossi-it.jpg";
import alessandroContiAvatar from "@/assets/avatars/alessandro-conti-it.jpg";

const PartnersPage = () => {
  const { t, i18n } = useTranslation(['partners', 'venues', 'meta']);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const breadcrumbData = useBreadcrumb();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Partner data based on current language
  const getPartnerData = (): PartnerVenueData[] => {
    const lang = i18n.language;

    if (lang === 'de') {
      return [
        {
          id: 'thomas-mueller-de',
          name: 'Ferienwohnung Alpenblick',
          location: 'Garmisch-Partenkirchen',
          country: 'Deutschland',
          registeredSince: 'Januar 2024',
          caseCount: 5,
          description: 'Exklusive Ferienwohnung in den bayerischen Alpen mit atemberaubendem Bergpanorama. Perfekt für Familien und Naturliebhaber, die Ruhe und Abenteuer kombinieren möchten.',
          testimonial: t('venues:testimonials.items.sarah.text'),
          ownerName: 'Thomas Müller',
          ownerAvatar: thomasMuellerAvatar,
          website: 'alpenblick-fewo.de',
          address: 'Alpspitzstraße 12, 82467 Garmisch-Partenkirchen',
          image: '/partner-venues/alpenblick-garmisch.jpg',
          features: [
            'Individueller Detektivfall für die Alpenregion',
            '4-Zimmer-Wohnung mit Bergblick',
            'Familienfreundliche Rätsel',
            'Integration lokaler Sagen und Legenden',
            'QR-Code-basierter Zugang für Gäste'
          ]
        },
        {
          id: 'laura-schmidt-de',
          name: 'Ostsee-Hideaway',
          location: 'Rügen',
          country: 'Deutschland',
          registeredSince: 'Februar 2024',
          caseCount: 4,
          description: 'Modernes Ferienhaus direkt an der Ostsee. Ideal für entspannte Urlaubstage am Strand kombiniert mit spannenden Detektiv-Abenteuern für die ganze Familie.',
          testimonial: t('venues:testimonials.items.marcus.text'),
          ownerName: 'Laura Schmidt',
          ownerAvatar: lauraSchmidtAvatar,
          website: 'ostsee-hideaway.de',
          address: 'Strandweg 8, 18609 Binz, Rügen',
          image: '/partner-venues/ostsee-ruegen.jpg',
          features: [
            'Maritime Detektivgeschichte',
            'Strandnahes Ferienhaus',
            'Saisonale Fallerweiterungen',
            'Integration lokaler Küstenkultur',
            'Perfekt für längere Aufenthalte'
          ]
        },
        {
          id: 'marcus-weber-de',
          name: 'Schwarzwald-Chalet',
          location: 'Titisee-Neustadt',
          country: 'Deutschland',
          registeredSince: 'März 2024',
          caseCount: 3,
          description: 'Traditionelles Chalet mitten im Schwarzwald. Verbindet rustikalen Charme mit modernem Komfort und einem einzigartigen Mystery-Erlebnis für Wanderer und Naturfreunde.',
          testimonial: t('venues:testimonials.items.elena.text'),
          ownerName: 'Marcus Weber',
          ownerAvatar: marcusWeberAvatar,
          image: '/partner-venues/schwarzwald-chalet.jpg',
          website: 'schwarzwald-chalet.de',
          address: 'Waldweg 5, 79822 Titisee-Neustadt',
          features: [
            'Detektivfall integriert mit Wanderrouten',
            'Traditionelles Schwarzwald-Chalet',
            'Authentische lokale Mythen',
            'Outdoor-Indoor-Rätsel-Kombination',
            'Ganzjährig buchbar'
          ]
        }
      ];
    } else if (lang === 'en') {
      return [
        {
          id: 'james-anderson-en',
          name: 'The Cotswold Cottage',
          location: 'Bath',
          country: 'UK',
          registeredSince: 'January 2024',
          caseCount: 5,
          description: 'Charming cottage in the heart of the Cotswolds. Perfect for guests seeking authentic British countryside experiences combined with thrilling detective mysteries.',
          testimonial: t('venues:testimonials.items.sarah.text'),
          ownerName: 'James Anderson',
          ownerAvatar: jamesAndersonAvatar,
          website: 'cotswold-cottage.co.uk',
          address: '12 Honey Lane, Bath BA1 2QR, UK',
          image: '/partner-venues/cotswold-cottage.jpg',
          features: [
            'Bespoke mystery case set in Cotswolds',
            'Traditional English cottage atmosphere',
            'Team-building friendly mysteries',
            'Integration of local history',
            'Corporate group packages available'
          ]
        },
        {
          id: 'emily-parker-en',
          name: 'Highland Retreat',
          location: 'Edinburgh',
          country: 'Scotland',
          registeredSince: 'February 2024',
          caseCount: 4,
          description: 'Exclusive retreat in the Scottish Highlands. Combines luxury accommodation with immersive detective experiences featuring Scottish folklore and legends.',
          testimonial: t('venues:testimonials.items.marcus.text'),
          ownerName: 'Emily Parker',
          ownerAvatar: emilyParkerAvatar,
          website: 'highland-retreat.scot',
          address: '45 Castle View, Edinburgh EH1 3AT, Scotland',
          image: '/partner-venues/highland-retreat.jpg',
          features: [
            'Scottish folklore mystery integration',
            'Luxury highland accommodation',
            'Off-season exclusive content',
            'Local mythology storytelling',
            'Year-round availability'
          ]
        },
        {
          id: 'oliver-bennett-en',
          name: 'Seaside Escape',
          location: 'Cornwall',
          country: 'UK',
          registeredSince: 'March 2024',
          caseCount: 3,
          description: 'Beautiful coastal property in Cornwall. Offers guests a unique combination of seaside relaxation and interactive mystery adventures along the coastal paths.',
          testimonial: t('venues:testimonials.items.elena.text'),
          ownerName: 'Oliver Bennett',
          ownerAvatar: oliverBennettAvatar,
          website: 'seaside-escape-cornwall.co.uk',
          address: '8 Harbour Road, St Ives TR26 1LP, Cornwall',
          image: '/partner-venues/seaside-cornwall.jpg',
          features: [
            'Coastal path mystery trails',
            'Family-friendly detective games',
            'Partnership with local businesses',
            'Community-integrated storylines',
            'Beach and mystery combined'
          ]
        }
      ];
    } else if (lang === 'fr') {
      return [
        {
          id: 'thomas-dubois-fr',
          name: 'Maison Provençale',
          location: 'Aix-en-Provence',
          country: 'France',
          registeredSince: 'Janvier 2024',
          caseCount: 5,
          description: 'Authentique bastide provençale au cœur de la Provence. Allie charme traditionnel et expérience de détective immersive intégrant l\'histoire locale.',
          testimonial: t('venues:testimonials.items.sarah.text'),
          ownerName: 'Thomas Dubois',
          ownerAvatar: thomasDuboisAvatar,
          website: 'maison-provencale.fr',
          address: '15 Chemin des Lavandes, 13100 Aix-en-Provence',
          image: '/partner-venues/maison-provencale.jpg',
          features: [
            'Mystère intégrant l\'histoire provençale',
            'Bastide authentique du 18ème siècle',
            'Légendes locales dans l\'intrigue',
            'Expérience immersive pour Parisiens',
            'ROI rapide et réputation excellente'
          ]
        },
        {
          id: 'sophie-laurent-fr',
          name: 'Chalet Montagnard',
          location: 'Chamonix',
          country: 'France',
          registeredSince: 'Février 2024',
          caseCount: 4,
          description: 'Chalet de luxe à Chamonix au pied du Mont-Blanc. Propose une expérience après-ski unique avec des mystères à résoudre au coin du feu.',
          testimonial: t('venues:testimonials.items.marcus.text'),
          ownerName: 'Sophie Laurent',
          ownerAvatar: sophieLaurentAvatar,
          website: 'chalet-montagnard-chamonix.fr',
          address: '28 Route des Pèlerins, 74400 Chamonix-Mont-Blanc',
          image: '/partner-venues/chalet-chamonix.jpg',
          features: [
            'Mystère au coin du feu après-ski',
            'Chalet de luxe face au Mont-Blanc',
            'Ambiance conviviale garantie',
            'Retours clients récurrents',
            'Idéal pour groupes d\'amis'
          ]
        },
        {
          id: 'marc-rousseau-fr',
          name: 'Gîte Breton',
          location: 'Saint-Malo',
          country: 'France',
          registeredSince: 'Mars 2024',
          caseCount: 3,
          description: 'Gîte historique à Saint-Malo avec vue sur les remparts. Exploite l\'histoire corsaire de la région pour créer une expérience de détective authentique.',
          testimonial: t('venues:testimonials.items.elena.text'),
          ownerName: 'Marc Rousseau',
          ownerAvatar: marcRousseauAvatar,
          website: 'gite-breton-saintmalo.fr',
          address: '12 Rue des Corsaires, 35400 Saint-Malo',
          image: '/partner-venues/gite-breton.jpg',
          features: [
            'Histoire corsaire authentique',
            'Enquête sur les remparts',
            'Top 3 sur TripAdvisor local',
            'Parfait pour familles',
            'Intégration patrimoine historique'
          ]
        }
      ];
    } else if (lang === 'it') {
      return [
        {
          id: 'marco-bianchi-it',
          name: 'Villa Toscana',
          location: 'Firenze',
          country: 'Italia',
          registeredSince: 'Gennaio 2024',
          caseCount: 5,
          description: 'Villa storica nel cuore della Toscana. Offre un\'esperienza unica che unisce il fascino toscano con avventure detective avvincenti basate sulla storia locale.',
          testimonial: t('venues:testimonials.items.sarah.text'),
          ownerName: 'Marco Bianchi',
          ownerAvatar: marcoBianchiAvatar,
          website: 'villa-toscana-firenze.it',
          address: 'Via dei Colli 23, 50125 Firenze',
          image: '/partner-venues/villa-toscana.jpg',
          features: [
            'Giallo personalizzato con storia locale',
            'Villa storica del Rinascimento',
            'Popolare tra ospiti internazionali',
            'Prenotazioni triplicate in un anno',
            'Esperienza culturale autentica'
          ]
        },
        {
          id: 'sofia-rossi-it',
          name: 'Casa Veneziana',
          location: 'Venezia',
          country: 'Italia',
          registeredSince: 'Febbraio 2024',
          caseCount: 4,
          description: 'Casa storica nel centro di Venezia. Combina il fascino veneziano con un\'esperienza detective che esplora calli e campielli della città.',
          testimonial: t('venues:testimonials.items.marcus.text'),
          ownerName: 'Sofia Rossi',
          ownerAvatar: sofiaRossiAvatar,
          website: 'casa-veneziana.it',
          address: 'Calle della Misericordia 3456, 30121 Venezia',
          image: '/partner-venues/casa-veneziana.jpg',
          features: [
            'Esplorazione autentica di Venezia',
            'Casa gestita da generazioni',
            'Collaborazione con gondolieri locali',
            'Mistero integrato nella città',
            'Innovazione nella tradizione'
          ]
        },
        {
          id: 'alessandro-conti-it',
          name: 'Rifugio Alpino',
          location: 'Cortina d\'Ampezzo',
          country: 'Italia',
          registeredSince: 'Marzo 2024',
          caseCount: 3,
          description: 'Rifugio alpino esclusivo nelle Dolomiti. Offre intrattenimento serale con mystery case che ha rivoluzionato l\'esperienza degli ospiti in montagna.',
          testimonial: t('venues:testimonials.items.elena.text'),
          ownerName: 'Alessandro Conti',
          ownerAvatar: alessandroContiAvatar,
          website: 'rifugio-alpino-cortina.it',
          address: 'Via Faloria 15, 32043 Cortina d\'Ampezzo',
          image: '/partner-venues/rifugio-alpino.jpg',
          features: [
            'Intrattenimento serale innovativo',
            'Rifugio esclusivo nelle Dolomiti',
            'Occupazione 90% bassa stagione',
            'Mystery case per montagna',
            'Esperienza unica alpina'
          ]
        }
      ];
    }

    return [];
  };

  const partners = getPartnerData();

  return (
    <>
      <SEO 
        title={t('meta:partners.title')}
        description={t('meta:partners.description')}
        canonical="/partners"
        keywords={t('meta:partners.keywords')}
      />
      {breadcrumbData && <StructuredData type="breadcrumb" data={breadcrumbData} />}
      <div className="min-vh-100" style={{ backgroundColor: isDark ? '#181D35' : '#F7FAFC' }}>
        <Header />
        <PartnersHero />
      
      {/* Partners Grid with alternating background */}
      <section 
        className="py-5"
        style={{ 
          backgroundColor: isDark ? '#181D35' : '#F7FAFC' 
        }}
      >
        <PartnersGrid partners={partners} />
      </section>
      
      {/* Motivation CTA */}
      <section 
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-variant)) 100%)',
        }}
      >
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <div className="d-flex justify-content-center mb-4">
                <Award size={48} className="text-danger" />
              </div>
              <h2 className="display-5 fw-bold text-light mb-3">
                {t('motivation.title')}
              </h2>
              <p className="lead text-light opacity-75 mb-4">
                {t('motivation.subtitle')}
              </p>
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div 
                    className="p-3 rounded"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className="text-light small">{t('motivation.benefits.visibility')}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div 
                    className="p-3 rounded"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className="text-light small">{t('motivation.benefits.badge')}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div 
                    className="p-3 rounded"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className="text-light small">{t('motivation.benefits.marketing')}</div>
                  </div>
                </div>
              </div>
              <Link 
                to="/venue-register"
                className="btn btn-lg px-5"
                style={{
                  backgroundColor: 'var(--bs-danger)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600'
                }}
              >
                {t('motivation.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      </div>
    </>
  );
};

export default PartnersPage;
