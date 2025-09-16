import { Facebook, Github, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-body py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <h5 className="mb-0 me-2">DetectivesGame</h5>
              <span className="badge bg-primary rounded-pill px-2 py-1" style={{ fontSize: '0.7rem' }}>
                BETA
              </span>
            </div>
            <p className="mb-3 mb-md-0 text-secondary" style={{ fontSize: '0.9rem' }}>
              Test your detective skills with our immersive mystery cases. Solve crimes, uncover secrets, and become the best detective.
            </p>
            <div className="d-flex gap-3 mb-3 mb-md-0">
              <a href="#" className="text-secondary" style={{ fontSize: '1.2rem' }}>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary" style={{ fontSize: '1.2rem' }}>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary" style={{ fontSize: '1.2rem' }}>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary" style={{ fontSize: '1.2rem' }}>
                <Github size={20} />
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-md-end">
              <div className="d-flex gap-4 mb-2 flex-wrap justify-content-center justify-content-md-end">
                <a href="/terms" className="text-secondary text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Terms
                </a>
                <a href="/privacy" className="text-secondary text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Privacy
                </a>
                <a href="#" className="text-secondary text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Cookies
                </a>
                <a href="#" className="text-secondary text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Imprint
                </a>
                <a href="#" className="text-secondary text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Contact
                </a>
              </div>
              <p className="mb-0 text-secondary text-center text-md-end" style={{ fontSize: '0.8rem' }}>
                © 2025 DetectiveGames. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;