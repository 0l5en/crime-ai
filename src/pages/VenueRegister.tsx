import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, QrCode, BarChart3, Users, Gift } from "lucide-react";

const VenueRegister = () => {
  const { t } = useTranslation('venueRegister');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const registerSchema = z.object({
    firstName: z.string().min(2, t('validation.firstNameMin')),
    email: z.string().email(t('validation.emailInvalid')),
    password: z.string()
      .min(8, t('validation.passwordMin'))
      .regex(/[A-Z]/, t('validation.passwordUppercase'))
      .regex(/[a-z]/, t('validation.passwordLowercase'))
      .regex(/[0-9]/, t('validation.passwordNumber')),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwordMismatch'),
    path: ['confirmPassword']
  });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Venue registration data:', data);
  };

  const features = [
    { icon: Building2, key: 'exclusive' },
    { icon: Users, key: 'unlimited' },
    { icon: QrCode, key: 'qrCode' },
    { icon: BarChart3, key: 'analytics' },
    { icon: Gift, key: 'free' }
  ];

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <Header />
      
      <main className="flex-grow-1">
        <div className="container-fluid py-5">
          <div className="row g-0 min-vh-100">
            {/* Left side - Features */}
            <div 
              className="col-lg-6 d-flex align-items-center justify-content-center p-5 text-light"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
              }}
            >
              <div className="w-100" style={{ maxWidth: '500px' }}>
                <h2 className="display-5 fw-bold mb-4 text-light">
                  {t('features.title')}
                </h2>
                <p className="lead mb-5 opacity-75">
                  {t('features.subtitle')}
                </p>
                
                <div className="d-flex flex-column gap-4">
                  {features.map(({ icon: Icon, key }) => (
                    <div key={key} className="d-flex align-items-start gap-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: '48px',
                          height: '48px',
                          backgroundColor: 'rgba(220, 38, 38, 0.2)',
                          border: '2px solid rgb(220, 38, 38)'
                        }}
                      >
                        <Icon size={24} className="text-danger" />
                      </div>
                      <div>
                        <h5 className="mb-2 text-light fw-semibold">
                          {t(`features.items.${key}.title`)}
                        </h5>
                        <p className="mb-0 opacity-75">
                          {t(`features.items.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
              <div className="w-100" style={{ maxWidth: '450px' }}>
                <div className="text-center mb-4">
                  <h1 className="display-6 fw-bold mb-3">
                    {t('title')}
                  </h1>
                  <p className="text-muted">
                    {t('subtitle')}
                  </p>
                </div>

                {/* Inactive Banner */}
                <div className="alert alert-warning mb-4 d-flex align-items-center">
                  <i className="bi bi-info-circle me-2"></i>
                  <span>{t('inactive')}</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label fw-semibold">
                      {t('form.firstName')}
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      className={`form-control form-control-lg ${errors.firstName ? 'is-invalid' : ''}`}
                      id="firstName"
                      autoComplete="given-name"
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">
                        {errors.firstName.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      {t('form.email')}
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">
                      {t('form.password')}
                    </label>
                    <input
                      {...register('password')}
                      type="password"
                      className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      autoComplete="new-password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label fw-semibold">
                      {t('form.confirmPassword')}
                    </label>
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-danger w-100 py-3 fw-semibold mb-4"
                    disabled={true}
                    title={t('inactive')}
                  >
                    {t('form.submit')}
                  </button>

                  <div className="text-center">
                    <span className="text-muted">{t('form.alreadyRegistered')} </span>
                    <Link to="/" className="text-danger text-decoration-none fw-semibold">
                      {t('form.signIn')}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VenueRegister;
