import { useState, useRef, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const { t } = useTranslation("contact");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = recaptchaRef.current?.getValue();

    if (!token) {
      alert(t("form.recaptchaRequired"));
      return;
    }

    // Später: API-Aufruf mit Formulardaten + reCAPTCHA-Token
    console.log("Form would be submitted with:", {
      ...formData,
      recaptchaToken: token,
    });

    // Reset reCAPTCHA after submission attempt
    recaptchaRef.current?.reset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      {/* Hero Section */}
      <div
        className="position-relative text-white py-5"
        style={{
          background: "#000000",
          minHeight: "200px",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.3)",
            zIndex: 0,
          }}
        />
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold mb-3">{t("hero.title")}</h1>
              <p className="lead">{t("hero.subtitle")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <main className="flex-grow-1 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              <div className="card shadow-lg border-0">
                <div className="card-body p-4 p-md-5">
                  <h2 className="h3 mb-4 text-center">{t("form.title")}</h2>

                  {/* Info Message */}
                  <div className="alert alert-info mb-4" role="alert">
                    <i className="bi bi-info-circle me-2"></i>
                    {t("form.comingSoon")}
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        {t("form.name")} <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("form.namePlaceholder")}
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        {t("form.email")} <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("form.emailPlaceholder")}
                        required
                      />
                    </div>

                    {/* Subject Field */}
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">
                        {t("form.subject")} <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={t("form.subjectPlaceholder")}
                        required
                      />
                    </div>

                    {/* Message Field */}
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">
                        {t("form.message")} <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("form.messagePlaceholder")}
                        rows={6}
                        required
                      />
                    </div>

                    {/* reCAPTCHA */}
                    <div className="mb-4 d-flex justify-content-center">
                      <ReCAPTCHA ref={recaptchaRef} sitekey="6LcjCP0rAAAAANJLBI9BZL8vSj6h51htKZtddtnt" theme="light" />
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid">
                      <button type="submit" className="btn btn-danger btn-lg" disabled={true}>
                        <i className="bi bi-send me-2"></i>
                        {t("form.submit")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
