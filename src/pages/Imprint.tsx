import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Imprint = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <Header />
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 mb-4 text-center">Legal Notice (Imprint)</h1>
            <p className="text-muted text-center mb-5">
              Information pursuant to Section 5 TMG (German Telemedia Act)
            </p>

            <div className="mb-5">
              <h2 className="h3 mb-3">1. Information about the Service Provider</h2>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>Company Name:</strong> DetectivesGame GmbH</p>
                <p className="mb-2"><strong>Legal Form:</strong> Limited Liability Company (GmbH)</p>
                <p className="mb-2"><strong>Registration Court:</strong> Local Court of [City Name]</p>
                <p className="mb-2"><strong>Commercial Register Number:</strong> HRB [Registration Number]</p>
                <p className="mb-0"><strong>VAT Identification Number:</strong> DE[VAT Number] (pursuant to Section 27a VAT Act)</p>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">2. Business Address</h2>
              <div className="bg-light p-4 rounded">
                <p className="mb-1"><strong>DetectivesGame GmbH</strong></p>
                <p className="mb-1">[Street Name] [House Number]</p>
                <p className="mb-1">[Postal Code] [City Name]</p>
                <p className="mb-0">[Country]</p>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">3. Contact Information</h2>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="bg-light p-4 rounded h-100">
                    <h4 className="h5 mb-3">General Contact</h4>
                    <p className="mb-2"><strong>Phone:</strong> +49 [Area Code] [Phone Number]</p>
                    <p className="mb-2"><strong>Fax:</strong> +49 [Area Code] [Fax Number]</p>
                    <p className="mb-2"><strong>Email:</strong> info@detectivesgame.com</p>
                    <p className="mb-0"><strong>Website:</strong> www.detectivesgame.com</p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="bg-light p-4 rounded h-100">
                    <h4 className="h5 mb-3">Business Hours</h4>
                    <p className="mb-2"><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM CET</p>
                    <p className="mb-2"><strong>Saturday:</strong> 10:00 AM - 2:00 PM CET</p>
                    <p className="mb-0"><strong>Sunday:</strong> Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">4. Authorized Representatives</h2>
              <p>
                The company is legally represented by its managing directors:
              </p>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>Managing Director 1:</strong> [First Name] [Last Name]</p>
                <p className="mb-2"><strong>Managing Director 2:</strong> [First Name] [Last Name]</p>
                <p className="mb-0"><em>Both managing directors are individually authorized to represent the company.</em></p>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">5. Supervisory Authority</h2>
              <p>
                As a provider of interactive gaming services and digital entertainment, we are subject to supervision by:
              </p>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>Authority:</strong> [Relevant State Media Authority]</p>
                <p className="mb-2"><strong>Address:</strong> [Authority Address]</p>
                <p className="mb-2"><strong>Website:</strong> [Authority Website]</p>
                <p className="mb-0"><strong>Contact:</strong> [Authority Contact Information]</p>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">6. Professional Regulations</h2>
              <p>
                Our business activities are subject to the following professional regulations:
              </p>
              <ul>
                <li>German Telemedia Act (Telemediengesetz - TMG)</li>
                <li>German Interstate Broadcasting Agreement (Medienstaatsvertrag - MStV)</li>
                <li>General Data Protection Regulation (GDPR/DSGVO)</li>
                <li>German Federal Data Protection Act (Bundesdatenschutzgesetz - BDSG)</li>
                <li>Consumer Rights Directive (Verbraucherrechte-Richtlinie)</li>
                <li>German Civil Code (Bürgerliches Gesetzbuch - BGB)</li>
              </ul>
              <p>
                These regulations can be viewed at: <a href="https://www.gesetze-im-internet.de" target="_blank" rel="noopener noreferrer">www.gesetze-im-internet.de</a>
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">7. Dispute Resolution</h2>
              
              <h4 className="h5 mb-3">7.1 Consumer Dispute Resolution</h4>
              <p>
                The European Commission provides a platform for online dispute resolution (OS), which can be found at: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>
              </p>
              <p>
                We are willing to participate in dispute resolution proceedings before a consumer arbitration board. The responsible consumer arbitration board is:
              </p>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>General Consumer Arbitration Board of the Center for Arbitration e.V.</strong></p>
                <p className="mb-2">Straßburger Straße 8</p>
                <p className="mb-2">77694 Kehl am Rhein, Germany</p>
                <p className="mb-2">Website: <a href="https://www.verbraucher-schlichter.de" target="_blank" rel="noopener noreferrer">www.verbraucher-schlichter.de</a></p>
              </div>

              <h4 className="h5 mb-3">7.2 Business Dispute Resolution</h4>
              <p>
                For business-related disputes, we prefer alternative dispute resolution methods and are willing to engage with recognized commercial arbitration institutions.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">8. Liability and Disclaimer</h2>
              
              <h4 className="h5 mb-3">8.1 Liability for Content</h4>
              <p>
                As a service provider, we are liable for our own content on these pages in accordance with general law. However, we are not under obligation to monitor transmitted or stored third-party information or to investigate circumstances pointing to illegal activity.
              </p>
              <p>
                Obligations to remove or block the use of information under the general laws remain unaffected. However, liability in this regard is only possible from the point in time at which knowledge of a specific infringement of law is obtained.
              </p>

              <h4 className="h5 mb-3">8.2 Liability for Links</h4>
              <p>
                Our website contains links to external third-party websites. We have no influence on the contents of those websites, therefore we cannot assume any liability for these foreign contents. The respective provider or operator of the pages is always responsible for the contents of any linked page.
              </p>
              <p>
                The linked pages were checked for possible legal violations at the time they were linked to our site. No illegal content was apparent at the time of linking. However, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of a violation of law.
              </p>

              <h4 className="h5 mb-3">8.3 Gaming Content Disclaimer</h4>
              <p>
                Our detective games are works of fiction. Names, characters, places, events, and incidents are either the products of imagination or used in a fictitious manner. Any resemblance to actual persons, living or dead, or actual events is purely coincidental.
              </p>
              <p>
                The games are intended for entertainment purposes only and should not be used as actual investigative or forensic guidance.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">9. Copyright and Intellectual Property</h2>
              <p>
                The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.
              </p>
              <p>
                Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such.
              </p>
              <p>
                Should you nevertheless become aware of a copyright infringement, please inform us accordingly. If we become aware of any infringements, we will remove such content immediately.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">10. Data Protection Officer</h2>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>Data Protection Officer:</strong> [Name]</p>
                <p className="mb-2"><strong>Email:</strong> dpo@detectivesgame.com</p>
                <p className="mb-2"><strong>Phone:</strong> +49 [Area Code] [Phone Number]</p>
                <p className="mb-0"><strong>Address:</strong> Same as company address above</p>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">11. Technical Service Provider</h2>
              <p>
                Our website is hosted by:
              </p>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>Hosting Provider:</strong> [Hosting Company Name]</p>
                <p className="mb-2"><strong>Address:</strong> [Hosting Company Address]</p>
                <p className="mb-2"><strong>Website:</strong> [Hosting Company Website]</p>
                <p className="mb-0"><strong>Data Processing Agreement:</strong> In place pursuant to Art. 28 GDPR</p>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">12. Insurance Information</h2>
              <p>
                We maintain appropriate business insurance coverage including:
              </p>
              <ul>
                <li>Professional Liability Insurance</li>
                <li>Cyber Liability Insurance</li>
                <li>General Business Liability Insurance</li>
              </ul>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>Insurance Provider:</strong> [Insurance Company Name]</p>
                <p className="mb-2"><strong>Policy Coverage:</strong> Up to €[Amount] EUR</p>
                <p className="mb-0"><strong>Geographic Scope:</strong> European Union and United Kingdom</p>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">13. Accessibility</h2>
              <p>
                We are committed to making our website accessible to people with disabilities. We continuously work to improve the accessibility of our platform in accordance with:
              </p>
              <ul>
                <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                <li>European Accessibility Act (EAA)</li>
                <li>German Accessible Information Technology Regulation (BITV 2.0)</li>
              </ul>
              <p>
                If you encounter accessibility barriers, please contact us at: <strong>accessibility@detectivesgame.com</strong>
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">14. Environmental Responsibility</h2>
              <p>
                As a digital service provider, we are committed to environmental sustainability:
              </p>
              <ul>
                <li>Our servers are powered by renewable energy</li>
                <li>We optimize our platform for energy efficiency</li>
                <li>We support carbon offset programs for our operations</li>
                <li>We promote digital-first solutions to reduce paper consumption</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">15. Updates to This Legal Notice</h2>
              <p>
                This legal notice may be updated from time to time to reflect changes in our business, legal requirements, or contact information. The current version is always available on our website.
              </p>
              <p>
                <strong>Last Updated:</strong> January 2025
              </p>
            </div>

            <div className="text-center mt-5 pt-4 border-top">
              <p className="text-muted">
                This legal notice complies with German and European legal requirements for online service providers.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Imprint;