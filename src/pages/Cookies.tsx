import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cookies = () => {
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
            <h1 className="display-4 mb-4 text-center">Cookie Policy</h1>
            <p className="text-muted text-center mb-5">
              <strong>Last Updated:</strong> January 2025
            </p>

            <div className="mb-5">
              <h2 className="h3 mb-3">1. Introduction</h2>
              <p>
                DetectivesGame ("we," "our," or "us") uses cookies and similar tracking technologies to enhance your experience on our interactive detective gaming platform. This Cookie Policy explains what cookies are, how we use them, what types of cookies we use, and how you can manage your cookie preferences.
              </p>
              <p>
                By using our Service, you consent to our use of cookies as described in this policy. This Cookie Policy should be read in conjunction with our Privacy Policy and Terms of Service.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">2. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our website or use our applications. They are widely used to make websites and applications work more efficiently and to provide information to website owners.
              </p>
              <p>
                Cookies can be "persistent" cookies or "session" cookies:
              </p>
              <ul>
                <li><strong>Session Cookies:</strong> These are temporary cookies that remain in your browser during your browsing session and are deleted when you close your browser.</li>
                <li><strong>Persistent Cookies:</strong> These remain in your browser for a set period of time or until you delete them manually.</li>
              </ul>
              <p>
                Cookies can also be "first-party" (set by our website) or "third-party" (set by other websites or services we work with).
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">3. Why We Use Cookies</h2>
              <p>We use cookies for several important purposes:</p>
              
              <h4 className="h5 mb-3">3.1 Essential Website Functionality</h4>
              <ul>
                <li>Maintaining your login session and authentication status</li>
                <li>Remembering your game progress and settings</li>
                <li>Ensuring website security and preventing fraud</li>
                <li>Loading the website correctly and efficiently</li>
                <li>Processing transactions and subscription management</li>
              </ul>

              <h4 className="h5 mb-3">3.2 Enhanced User Experience</h4>
              <ul>
                <li>Remembering your language and regional preferences</li>
                <li>Storing your theme choice (light/dark mode)</li>
                <li>Maintaining your case bookmarks and favorites</li>
                <li>Personalizing game recommendations</li>
                <li>Saving your notification preferences</li>
              </ul>

              <h4 className="h5 mb-3">3.3 Performance and Analytics</h4>
              <ul>
                <li>Understanding how users interact with our games</li>
                <li>Analyzing gameplay patterns and completion rates</li>
                <li>Monitoring website performance and load times</li>
                <li>Identifying and fixing technical issues</li>
                <li>Improving our detective cases and user interface</li>
              </ul>

              <h4 className="h5 mb-3">3.4 Marketing and Advertising</h4>
              <ul>
                <li>Delivering relevant content and promotions</li>
                <li>Tracking referral program effectiveness</li>
                <li>Measuring advertising campaign performance</li>
                <li>Providing personalized marketing communications</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">4. Types of Cookies We Use</h2>
              
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Cookie Category</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                      <th>Can be disabled?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Strictly Necessary</strong></td>
                      <td>Essential for website functionality, security, and user authentication</td>
                      <td>Session to 1 year</td>
                      <td>No - Required for service operation</td>
                    </tr>
                    <tr>
                      <td><strong>Functional</strong></td>
                      <td>Remember preferences, settings, and enhance user experience</td>
                      <td>1 month to 2 years</td>
                      <td>Yes - Via browser settings or our preferences</td>
                    </tr>
                    <tr>
                      <td><strong>Performance</strong></td>
                      <td>Analyze usage, monitor performance, and improve our service</td>
                      <td>30 days to 2 years</td>
                      <td>Yes - Via browser settings or our preferences</td>
                    </tr>
                    <tr>
                      <td><strong>Marketing</strong></td>
                      <td>Deliver relevant ads, track campaigns, and personalize content</td>
                      <td>30 days to 2 years</td>
                      <td>Yes - Via browser settings or our preferences</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">5. Specific Cookies We Use</h2>
              
              <h4 className="h5 mb-3">5.1 First-Party Cookies</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Cookie Name</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>dg_session</td>
                      <td>Maintains user login session</td>
                      <td>Session</td>
                    </tr>
                    <tr>
                      <td>dg_auth_token</td>
                      <td>Secure authentication token</td>
                      <td>30 days</td>
                    </tr>
                    <tr>
                      <td>dg_user_prefs</td>
                      <td>Stores user preferences and settings</td>
                      <td>1 year</td>
                    </tr>
                    <tr>
                      <td>dg_theme</td>
                      <td>Remembers light/dark theme choice</td>
                      <td>1 year</td>
                    </tr>
                    <tr>
                      <td>dg_game_progress</td>
                      <td>Saves game state and progress</td>
                      <td>6 months</td>
                    </tr>
                    <tr>
                      <td>dg_analytics</td>
                      <td>Anonymous usage analytics</td>
                      <td>2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="h5 mb-3">5.2 Third-Party Cookies</h4>
              <p>We also use cookies from trusted third-party services:</p>
              <ul>
                <li><strong>Authentication Providers:</strong> Keycloak for secure user authentication</li>
                <li><strong>Analytics Services:</strong> For understanding user behavior and service performance</li>
                <li><strong>Payment Processors:</strong> For secure transaction processing</li>
                <li><strong>Content Delivery Networks:</strong> For fast and reliable content delivery</li>
                <li><strong>Customer Support:</strong> For providing help and support features</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">6. Similar Tracking Technologies</h2>
              <p>In addition to cookies, we may use other similar tracking technologies:</p>
              
              <h4 className="h5 mb-3">6.1 Local Storage</h4>
              <p>We use browser local storage to:</p>
              <ul>
                <li>Cache game data for offline functionality</li>
                <li>Store user preferences locally</li>
                <li>Improve application performance</li>
                <li>Maintain game state between sessions</li>
              </ul>

              <h4 className="h5 mb-3">6.2 Web Beacons</h4>
              <p>Small transparent images that help us:</p>
              <ul>
                <li>Track email open rates and engagement</li>
                <li>Measure advertising effectiveness</li>
                <li>Monitor user interactions with content</li>
              </ul>

              <h4 className="h5 mb-3">6.3 Device Fingerprinting</h4>
              <p>We may collect information about your device to:</p>
              <ul>
                <li>Prevent fraud and enhance security</li>
                <li>Provide device-optimized experiences</li>
                <li>Troubleshoot technical issues</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">7. Managing Your Cookie Preferences</h2>
              
              <h4 className="h5 mb-3">7.1 Browser Settings</h4>
              <p>You can control cookies through your browser settings. Most browsers allow you to:</p>
              <ul>
                <li>View what cookies have been set and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from particular sites</li>
                <li>Block all cookies from being set</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>

              <div className="alert alert-info">
                <h5 className="alert-heading">Popular Browser Cookie Settings:</h5>
                <ul className="mb-0">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </div>

              <h4 className="h5 mb-3">7.2 Our Cookie Preferences Center</h4>
              <p>
                We provide a Cookie Preferences Center where you can easily manage your cookie choices. You can access this through your account settings or the cookie banner when you first visit our site.
              </p>
              <p>
                <strong>Note:</strong> Disabling certain cookies may limit functionality of our Service. Essential cookies cannot be disabled as they are necessary for the basic operation of our platform.
              </p>

              <h4 className="h5 mb-3">7.3 Opt-Out Links</h4>
              <p>For third-party cookies, you may also opt out directly:</p>
              <ul>
                <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                <li>General advertising opt-out: <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a></li>
                <li>European advertising opt-out: <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">Your Online Choices</a></li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">8. Mobile Applications</h2>
              <p>
                Our mobile applications may use technologies similar to cookies, including:
              </p>
              <ul>
                <li><strong>Mobile Identifiers:</strong> Device advertising IDs for analytics and advertising</li>
                <li><strong>App Analytics:</strong> Usage data to improve app performance</li>
                <li><strong>Push Notifications:</strong> Device tokens for sending notifications</li>
                <li><strong>Local Data Storage:</strong> Cached data for offline functionality</li>
              </ul>
              <p>
                You can manage these preferences through your device settings or within our app settings.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">9. Impact of Disabling Cookies</h2>
              <p>
                If you choose to disable cookies, some features of our Service may not function properly:
              </p>
              
              <div className="alert alert-warning">
                <h5 className="alert-heading">Potential Impact:</h5>
                <ul className="mb-0">
                  <li>You may need to log in repeatedly</li>
                  <li>Your game progress might not be saved</li>
                  <li>Personalized recommendations will be limited</li>
                  <li>Some interactive features may not work</li>
                  <li>You may see less relevant content and ads</li>
                  <li>Website performance may be slower</li>
                </ul>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">10. Updates to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices, new technologies, or legal requirements. We will notify you of any material changes by:
              </p>
              <ul>
                <li>Posting the updated policy on our website</li>
                <li>Displaying a prominent notice on our platform</li>
                <li>Sending email notifications for significant changes</li>
                <li>Requesting renewed consent where required by law</li>
              </ul>
              <p>
                We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">11. Legal Basis for Cookie Use</h2>
              <p>Our legal basis for using cookies depends on the type of cookie:</p>
              
              <h4 className="h5 mb-3">11.1 Essential Cookies</h4>
              <p>We use essential cookies based on our legitimate interest in providing you with a functional service and fulfilling our contractual obligations.</p>

              <h4 className="h5 mb-3">11.2 Non-Essential Cookies</h4>
              <p>For non-essential cookies, we rely on your consent. You can withdraw this consent at any time through your browser settings or our cookie preferences center.</p>

              <h4 className="h5 mb-3">11.3 Legitimate Interests</h4>
              <p>Some cookies are used based on our legitimate interests in:</p>
              <ul>
                <li>Improving our service and user experience</li>
                <li>Preventing fraud and ensuring security</li>
                <li>Analyzing service performance</li>
                <li>Conducting research and development</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">12. International Transfers</h2>
              <p>
                Some of our cookie and analytics providers may be located outside your country. When data is transferred internationally, we ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">13. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>DetectivesGame Cookie Support</strong></p>
                <p className="mb-2">Email: cookies@detectivesgame.com</p>
                <p className="mb-2">Privacy Team: privacy@detectivesgame.com</p>
                <p className="mb-2">Website: detectivesgame.com/contact</p>
                <p className="mb-0">
                  <strong>Subject Line:</strong> "Cookie Policy Inquiry"
                </p>
              </div>
              <p className="mt-3">
                We will respond to your cookie-related inquiries within 30 days.
              </p>
            </div>

            <div className="text-center mt-5 pt-4 border-top">
              <p className="text-muted">
                Thank you for taking the time to understand our cookie practices. Enjoy solving mysteries with DetectivesGame!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;