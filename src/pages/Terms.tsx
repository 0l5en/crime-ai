import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
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
            <h1 className="display-4 mb-4 text-center">Terms of Service</h1>
            <p className="text-muted text-center mb-5">
              <strong>Last Updated:</strong> January 2025
            </p>

            <div className="mb-5">
              <h2 className="h3 mb-3">1. Acceptance of Terms</h2>
              <p>
                Welcome to DetectivesGame ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our interactive detective gaming platform, including our website, mobile applications, and all related services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree to these Terms, please do not use our Service. We may update these Terms from time to time, and your continued use of the Service constitutes acceptance of any changes.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">2. Description of Service</h2>
              <p>
                DetectivesGame is an interactive gaming platform that provides immersive mystery and detective experiences. Our Service includes:
              </p>
              <ul>
                <li><strong>Interactive Detective Cases:</strong> Solve crimes, analyze evidence, interrogate suspects, and uncover mysteries</li>
                <li><strong>Case Generation Tools:</strong> Create custom detective scenarios and cases</li>
                <li><strong>Forensic Analysis:</strong> Access virtual autopsy reports, evidence analysis, and crime scene investigations</li>
                <li><strong>Vacation Rental Mystery Experiences:</strong> Specialized cases designed for hospitality venues</li>
                <li><strong>Venue Management:</strong> Tools for businesses to integrate mystery games into their services</li>
                <li><strong>Social Features:</strong> Email systems, notifications, and collaborative gameplay</li>
                <li><strong>Premium Subscriptions:</strong> Enhanced features and exclusive content</li>
                <li><strong>QR Code Integration:</strong> Interactive physical-digital gaming experiences</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">3. User Accounts and Registration</h2>
              <p>
                To access certain features of our Service, you must create an account. When creating an account, you agree to:
              </p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p>
                You must be at least 13 years old to create an account. Users under 18 must have parental consent to use our Service.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">4. Premium Subscriptions and Payments</h2>
              <p>
                Our Service offers premium subscriptions that provide access to exclusive content and enhanced features. By subscribing to our premium services, you agree to:
              </p>
              <ul>
                <li>Pay all applicable fees as described in our pricing plans</li>
                <li>Automatic renewal of your subscription unless cancelled</li>
                <li>Our refund policy as stated in our billing terms</li>
              </ul>
              <p>
                Subscription fees are non-refundable except as required by applicable law or as specifically stated in our refund policy. You may cancel your subscription at any time through your account settings.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">5. Referral Program</h2>
              <p>
                Our referral program allows users to earn rewards for referring new users to our Service. Participation in the referral program is subject to:
              </p>
              <ul>
                <li>Compliance with our referral program guidelines</li>
                <li>Prohibition against spam, fraudulent, or misleading referral activities</li>
                <li>Our right to modify or terminate the program at any time</li>
                <li>Verification of referral eligibility and reward distribution</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">6. User Conduct and Content</h2>
              <p>
                When using our Service, you agree not to:
              </p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Upload malicious code or attempt to compromise our systems</li>
                <li>Create multiple accounts to circumvent restrictions</li>
                <li>Share inappropriate, offensive, or harmful content</li>
                <li>Attempt to cheat, exploit, or manipulate game mechanics</li>
                <li>Reverse engineer or attempt to extract source code from our Service</li>
              </ul>
              <p>
                We reserve the right to investigate violations and take appropriate action, including account suspension or termination.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">7. Intellectual Property Rights</h2>
              <p>
                All content, features, and functionality of our Service, including but not limited to text, graphics, logos, images, game mechanics, and software, are owned by DetectivesGame or our licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to use our Service for personal, non-commercial purposes. This license does not include any resale or commercial use of our Service or its contents.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">8. Privacy and Data Collection</h2>
              <p>
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Service, you consent to our data practices as described in our Privacy Policy.
              </p>
              <p>
                We may collect gameplay data, performance metrics, and user interactions to improve our Service and provide personalized experiences.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">9. Service Availability and Modifications</h2>
              <p>
                We strive to provide reliable Service availability, but we do not guarantee uninterrupted access. We reserve the right to:
              </p>
              <ul>
                <li>Modify, suspend, or discontinue any part of our Service</li>
                <li>Update game content, rules, and mechanics</li>
                <li>Perform maintenance and updates as necessary</li>
                <li>Implement new features or remove existing ones</li>
              </ul>
              <p>
                We will provide reasonable notice of significant changes when possible.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">10. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, DETECTIVESGAME SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p>
                Our total liability to you for all claims arising from or relating to the Service shall not exceed the amount you paid us in the twelve months preceding the claim.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">11. Termination</h2>
              <p>
                We may terminate or suspend your account and access to our Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
              <p>
                You may terminate your account at any time by contacting us or using the account deletion feature in your settings. Upon termination, your right to use the Service will cease immediately.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">12. Dispute Resolution</h2>
              <p>
                Any disputes arising from these Terms or your use of our Service will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive any right to participate in class-action lawsuits or class-wide arbitrations.
              </p>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">13. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">14. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-light p-3 rounded">
                <p className="mb-1"><strong>DetectivesGame Support</strong></p>
                <p className="mb-1">Email: legal@detectivesgame.com</p>
                <p className="mb-0">Website: detectivesgame.com/contact</p>
              </div>
            </div>

            <div className="text-center mt-5 pt-4 border-top">
              <p className="text-muted">
                Thank you for using DetectivesGame. We hope you enjoy solving mysteries and testing your detective skills!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;