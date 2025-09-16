import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
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
            <h1 className="display-4 mb-4 text-center">Privacy Policy</h1>
            <p className="text-muted text-center mb-5">
              <strong>Last Updated:</strong> January 2025
            </p>

            <div className="mb-5">
              <h2 className="h3 mb-3">1. Introduction</h2>
              <p>
                DetectivesGame ("we," "our," or "us") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our interactive detective gaming platform, including our website, mobile applications, and related services (collectively, the "Service").
              </p>
              <p>
                Please read this Privacy Policy carefully. By using our Service, you consent to the data practices described in this policy. If you do not agree with the practices described in this Privacy Policy, please do not use our Service.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">2. Information We Collect</h2>
              
              <h4 className="h5 mb-3">2.1 Information You Provide Directly</h4>
              <p>We collect information you provide directly to us, including:</p>
              <ul>
                <li><strong>Account Information:</strong> Username, email address, password, and profile information</li>
                <li><strong>Payment Information:</strong> Credit card details, billing address, and subscription preferences (processed securely through third-party payment processors)</li>
                <li><strong>Game Content:</strong> Custom cases you create, solutions you submit, and in-game communications</li>
                <li><strong>Communications:</strong> Messages you send through our email system, support requests, and feedback</li>
                <li><strong>Referral Information:</strong> Email addresses of friends you refer through our referral program</li>
              </ul>

              <h4 className="h5 mb-3">2.2 Information Collected Automatically</h4>
              <p>When you use our Service, we automatically collect certain information:</p>
              <ul>
                <li><strong>Gameplay Data:</strong> Game progress, case completion rates, time spent playing, and performance metrics</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and mobile network information</li>
                <li><strong>Usage Analytics:</strong> Pages visited, features used, clicks, and navigation patterns</li>
                <li><strong>Location Data:</strong> General geographic location based on IP address (not precise location)</li>
                <li><strong>Cookies and Tracking:</strong> Information collected through cookies, web beacons, and similar technologies</li>
              </ul>

              <h4 className="h5 mb-3">2.3 Information from Third Parties</h4>
              <p>We may receive information from third parties, including:</p>
              <ul>
                <li>Authentication providers (if you sign in through social media accounts)</li>
                <li>Payment processors for transaction verification</li>
                <li>Analytics and advertising partners</li>
                <li>Venue partners for business account integrations</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including:</p>
              
              <h4 className="h5 mb-3">3.1 Service Provision</h4>
              <ul>
                <li>Providing and maintaining our gaming platform</li>
                <li>Processing transactions and managing subscriptions</li>
                <li>Creating and managing your user account</li>
                <li>Delivering personalized gaming experiences</li>
                <li>Generating custom detective cases and content</li>
              </ul>

              <h4 className="h5 mb-3">3.2 Communication and Support</h4>
              <ul>
                <li>Sending service-related communications and notifications</li>
                <li>Providing customer support and technical assistance</li>
                <li>Processing referral program rewards</li>
                <li>Sending marketing communications (with your consent)</li>
              </ul>

              <h4 className="h5 mb-3">3.3 Analytics and Improvement</h4>
              <ul>
                <li>Analyzing usage patterns to improve our Service</li>
                <li>Conducting research and development</li>
                <li>Monitoring and preventing fraud and abuse</li>
                <li>Ensuring platform security and stability</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">4. Information Sharing and Disclosure</h2>
              <p>We do not sell your personal information to third parties. We may share your information in the following circumstances:</p>
              
              <h4 className="h5 mb-3">4.1 Service Providers</h4>
              <p>We may share information with trusted third-party service providers who assist us in:</p>
              <ul>
                <li>Payment processing and subscription management</li>
                <li>Cloud hosting and data storage</li>
                <li>Analytics and performance monitoring</li>
                <li>Customer support services</li>
                <li>Email and notification delivery</li>
              </ul>

              <h4 className="h5 mb-3">4.2 Business Partners</h4>
              <ul>
                <li>Venue owners and hospitality partners (for vacation rental experiences)</li>
                <li>Authentication providers (with your consent)</li>
                <li>Integration partners for enhanced functionality</li>
              </ul>

              <h4 className="h5 mb-3">4.3 Legal Requirements</h4>
              <p>We may disclose information when required by law or to:</p>
              <ul>
                <li>Comply with legal obligations and court orders</li>
                <li>Protect our rights, property, and safety</li>
                <li>Prevent fraud and enforce our Terms of Service</li>
                <li>Protect the safety of our users and the public</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">5. Data Security</h2>
              <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
              <ul>
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and employee training programs</li>
                <li>Secure payment processing through certified providers</li>
                <li>Regular backup and disaster recovery procedures</li>
              </ul>
              <p>
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">6. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to:</p>
              <ul>
                <li>Provide you with our Service and maintain your account</li>
                <li>Comply with legal obligations and resolve disputes</li>
                <li>Enforce our agreements and protect our legitimate interests</li>
                <li>Improve our Service through analytics and research</li>
              </ul>
              <p>
                When you delete your account, we will delete or anonymize your personal information within a reasonable timeframe, except where we are required to retain it by law.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">7. Your Privacy Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information:</p>
              
              <h4 className="h5 mb-3">7.1 Access and Portability</h4>
              <ul>
                <li>Request access to your personal information</li>
                <li>Receive a copy of your data in a portable format</li>
                <li>View and download your gameplay history and account data</li>
              </ul>

              <h4 className="h5 mb-3">7.2 Correction and Deletion</h4>
              <ul>
                <li>Correct or update inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Permanently delete your account and associated data</li>
              </ul>

              <h4 className="h5 mb-3">7.3 Control and Consent</h4>
              <ul>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent for data processing (where applicable)</li>
                <li>Object to certain types of data processing</li>
                <li>Restrict processing of your information</li>
              </ul>

              <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section below.</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">8. Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar tracking technologies to enhance your experience on our Service:</p>
              
              <h4 className="h5 mb-3">8.1 Types of Cookies We Use</h4>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for basic functionality and security</li>
                <li><strong>Performance Cookies:</strong> Help us analyze usage and improve our Service</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
              </ul>

              <h4 className="h5 mb-3">8.2 Cookie Management</h4>
              <p>You can control cookies through your browser settings. However, disabling certain cookies may limit functionality of our Service. We also provide cookie preference controls in your account settings.</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">9. Children's Privacy</h2>
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
              <p>
                For users between 13 and 18, we recommend parental guidance and consent before using our Service. We may require parental verification for certain features or account types.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including:
              </p>
              <ul>
                <li>Standard contractual clauses approved by regulatory authorities</li>
                <li>Adequacy decisions for countries with equivalent privacy protections</li>
                <li>Certification under privacy frameworks where applicable</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">11. Third-Party Services</h2>
              <p>
                Our Service may contain links to third-party websites, services, or applications. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.
              </p>
              <p>
                We may integrate with third-party services for authentication, payments, and other functionality. These integrations are subject to the privacy policies of the respective third parties.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">12. Updates to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes by:
              </p>
              <ul>
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications for material changes</li>
                <li>Providing in-app notifications when you next access the Service</li>
              </ul>
              <p>
                Your continued use of our Service after such changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">13. Regional Privacy Rights</h2>
              
              <h4 className="h5 mb-3">13.1 European Economic Area (EEA) and UK</h4>
              <p>If you are located in the EEA or UK, you have additional rights under GDPR, including the right to lodge a complaint with your local data protection authority.</p>

              <h4 className="h5 mb-3">13.2 California Residents</h4>
              <p>California residents have specific rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected and the right to opt-out of the sale of personal information.</p>

              <h4 className="h5 mb-3">13.3 Other Jurisdictions</h4>
              <p>We comply with applicable privacy laws in all jurisdictions where we operate. If you have questions about your rights under local law, please contact us.</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">14. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>DetectivesGame Privacy Team</strong></p>
                <p className="mb-2">Email: privacy@detectivesgame.com</p>
                <p className="mb-2">Data Protection Officer: dpo@detectivesgame.com</p>
                <p className="mb-2">Website: detectivesgame.com/contact</p>
                <p className="mb-0">
                  <strong>Mailing Address:</strong><br />
                  DetectivesGame Privacy Department<br />
                  [Your Company Address]<br />
                  [City, State, ZIP Code]
                </p>
              </div>
              <p className="mt-3">
                We will respond to your privacy-related inquiries within 30 days or as required by applicable law.
              </p>
            </div>

            <div className="text-center mt-5 pt-4 border-top">
              <p className="text-muted">
                Your privacy is important to us. Thank you for trusting DetectivesGame with your information.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;