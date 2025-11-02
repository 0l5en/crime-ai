import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SignInButton from "@/components/SignInButton";
import useRegisterUser from "@/hooks/useRegisterUser";
import useSignIn from "@/hooks/useSignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const Register = () => {
  const { t } = useTranslation('register');
  const registerUser = useRegisterUser();
  const postLoginSuccessUri = new URL(window.location.href).origin + '/';
  const { signIn } = useSignIn({ postLoginSuccessUri });

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

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const createRegistration = async (data: RegisterFormData) => {
    if (data.userName && data.email && data.password) {
      try {
        await registerUser.mutateAsync({ userName: data.userName, email: data.email, password: data.password, userType: 'STANDARD' });
        signIn();
      } catch (error) {
        console.error(error);
      }
    }
  }

  const onSubmit = (data: RegisterFormData) => {
    createRegistration(data);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 py-5">
        <div className="container-fluid" style={{ maxWidth: '1400px' }}>
          <div className="row g-5 align-items-center">
            {/* Left Side - Features */}
            <div className="col-lg-6 d-none d-lg-block">
              <div className="p-5 rounded-4" style={{ background: 'linear-gradient(135deg, var(--bs-primary) 0%, var(--bs-primary-dark) 100%)' }}>
                <h2 className="display-5 fw-bold text-white mb-4">
                  {t('features.title')}
                </h2>
                <div className="vstack gap-4">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-check-circle-fill text-white fs-3"></i>
                    <div className="text-white">
                      <h5 className="mb-1">{t('features.items.cases')}</h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-clock-fill text-white fs-3"></i>
                    <div className="text-white">
                      <h5 className="mb-1">{t('features.items.time')}</h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-tools text-white fs-3"></i>
                    <div className="text-white">
                      <h5 className="mb-1">{t('features.items.tools')}</h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-trophy-fill text-white fs-3"></i>
                    <div className="text-white">
                      <h5 className="mb-1">{t('features.items.leaderboard')}</h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-arrow-repeat text-white fs-3"></i>
                    <div className="text-white">
                      <h5 className="mb-1">{t('features.items.updates')}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-5">
                  <h1 className="h2 fw-bold mb-2">{t('title')}</h1>
                  <p className="text-muted mb-4">{t('subtitle')}</p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="userName" className="form-label">
                        {t('form.userName')}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                        id="userName"
                        {...register('userName')}
                      />
                      {errors.userName && (
                        <div className="invalid-feedback">{errors.userName.message}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        {t('form.email')}
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        {...register('email')}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email.message}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        {t('form.password')}
                      </label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        {...register('password')}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password.message}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">
                        {t('form.confirmPassword')}
                      </label>
                      <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        {...register('confirmPassword')}
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback">{errors.confirmPassword.message}</div>
                      )}
                    </div>

                    <div className="text-center mb-3">
                      <small className="text-muted">
                        {t('form.termsPrefix')}{' '}
                        <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                          {t('form.termsLink')}
                        </a>
                      </small>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-danger w-100 py-3 mb-3"
                    >
                      {t('form.submit')}
                    </button>

                    <div className="text-center">
                      <span className="text-muted">{t('form.alreadyRegistered')} </span>
                      <SignInButton postLoginSuccessUri={postLoginSuccessUri} />
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

export default Register;
