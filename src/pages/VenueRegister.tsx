import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SignInButton from "@/components/SignInButton";
import useRegisterUser from "@/hooks/useRegisterUser";
import useSignIn from "@/hooks/useSignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarChart3, Building2, Gift, QrCode, Users } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const VenueRegister = () => {
  const { t } = useTranslation('venueRegister');
  const registerUser = useRegisterUser();
  const { signIn } = useSignIn({ postLoginSuccessUri: new URL(window.location.href).origin + '/vacation-rental-dashboard' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const registerSchema = z.object({
    userName: z.string().min(2, t('validation.userNameMin')),
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

  const createRegistration = async (data: RegisterFormData) => {
    if (data.userName && data.email && data.password) {
      await registerUser.mutateAsync({ userName: data.userName, email: data.email, password: data.password, userType: 'VACATION_RENTAL' });
      // TODO isSuccess is false - find out why !!!
      if (!registerUser.isError) {
        signIn();
      } else {
        // TODO display error message
        console.error("an error occured while trying to register as vacation rental:", registerUser.error);
      }
    }
  }

  const onSubmit = (data: RegisterFormData) => {
    createRegistration(data);
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
              className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 text-light"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
              }}
            >
              <div className="w-100" style={{ maxWidth: '500px' }}>
                <h2 className="h3 fw-bold mb-4 text-light">
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
            <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5">
              <div className="w-100" style={{ maxWidth: '500px' }}>
                <div className="text-center mb-5">
                  <h1 className="h4 fw-bold mb-3">
                    {t('title')}
                  </h1>
                  <p className="text-muted fs-6">
                    {t('subtitle')}
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="userName" className="form-label fw-semibold mb-2" style={{ color: '#2d3748' }}>
                      {t('form.userName')}
                    </label>
                    <input
                      {...register('userName')}
                      type="text"
                      className={`form-control form-control-lg ${errors.userName ? 'is-invalid' : ''}`}
                      id="userName"
                      autoComplete="given-name"
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        padding: '14px 16px',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--bs-danger)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(203, 25, 28, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    {errors.userName && (
                      <div className="invalid-feedback d-block mt-2 ms-2">
                        {errors.userName.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold mb-2" style={{ color: '#2d3748' }}>
                      {t('form.email')}
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      autoComplete="email"
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        padding: '14px 16px',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--bs-danger)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(203, 25, 28, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block mt-2 ms-2">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold mb-2" style={{ color: '#2d3748' }}>
                      {t('form.password')}
                    </label>
                    <input
                      {...register('password')}
                      type="password"
                      className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      autoComplete="new-password"
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        padding: '14px 16px',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--bs-danger)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(203, 25, 28, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    {errors.password && (
                      <div className="invalid-feedback d-block mt-2 ms-2">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label fw-semibold mb-2" style={{ color: '#2d3748' }}>
                      {t('form.confirmPassword')}
                    </label>
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      autoComplete="new-password"
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        padding: '14px 16px',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--bs-danger)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(203, 25, 28, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback d-block mt-2 ms-2">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>

                  <div 
                    className="text-center mb-4 p-3"
                    style={{
                      backgroundColor: '#f7fafc',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <small className="text-muted">
                      {t('form.termsPrefix')}{' '}
                      <a 
                        href="/terms" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-decoration-none fw-semibold"
                        style={{ color: 'var(--bs-danger)' }}
                      >
                        {t('form.termsLink')}
                      </a>
                    </small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-danger w-100 fw-semibold mb-4"
                    title={t('inactive')}
                    style={{
                      padding: '16px',
                      fontSize: '1.1rem',
                      borderRadius: '12px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px rgba(203, 25, 28, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#a8161a';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 25px rgba(203, 25, 28, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(203, 25, 28, 0.3)';
                    }}
                  >
                    {t('form.submit')}
                  </button>

                  <div 
                    className="text-center p-3"
                    style={{
                      backgroundColor: '#f7fafc',
                      borderRadius: '12px'
                    }}
                  >
                    <span className="text-muted">{t('form.alreadyRegistered')} </span>
                    <SignInButton />
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
