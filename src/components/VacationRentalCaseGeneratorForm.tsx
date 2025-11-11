import { useUserContext } from '@/contexts/UserContext';
import { useCreateCrimeCaseVacationRental } from '@/hooks/useCreateCrimeCaseVacationRental';
import { useState, useMemo, useEffect, useRef } from 'react';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import type { components } from "@/openapi/crimeAiSchema";

type CreateCaseGeneratorFormVacationRentalDto = components['schemas']['CreateCaseGeneratorFormVacationRentalDto'];
type CreateSightseeingAttractionDto = components['schemas']['CreateSightseeingAttractionDto'];
type Violations = components['schemas']['Violations'];

// Extend the basic form data with vacation rental specific fields
interface VacationRentalFormData {
  language: string;
  epoch: "TWENTIES" | "PRESENT" | "FUTURE";
  theme: "MURDER" | "ROBBERY" | "KIDNAPPING";
  additionalThemeDetails: string;
  fullAddress: string;
  venueName: string;
  venueDescription: string;
  nearbySightseeingAttractions: CreateSightseeingAttractionDto[];
  approximateYearOfConstruction: number | "";
  historicalFeaturesAndLegends: string;
  // Vacation rental specific fields
  venueFloors: number | "";
  venueBedrooms: number | "";
  venueBathrooms: number | "";
  maxGuests: number | "";
  roomLayoutDescription: string;
}

interface VacationRentalCaseGeneratorFormProps {
  onSuccess?: () => void;
  onCancel: () => void;
}

const AUTOSAVE_KEY = 'vacationRentalForm_autosave';

const VacationRentalCaseGeneratorForm = ({ onSuccess, onCancel }: VacationRentalCaseGeneratorFormProps) => {
  const { t } = useTranslation('vacationRentalDashboard');
  const user = useUserContext();
  const { mutate: createCrimeCase, isPending } = useCreateCrimeCaseVacationRental();
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string }>({});
  const hasRestoredData = useRef(false);

  // Load saved data from localStorage
  const getSavedFormData = (): Partial<VacationRentalFormData> | null => {
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading autosaved data:', error);
      return null;
    }
  };

  const savedData = getSavedFormData();

  const { register, handleSubmit, control, formState: { errors }, setError, clearErrors, reset } = useForm<VacationRentalFormData>({
    defaultValues: savedData || {
      language: '',
      epoch: 'PRESENT',
      theme: 'MURDER',
      additionalThemeDetails: '',
      fullAddress: '',
      venueName: '',
      venueDescription: '',
      nearbySightseeingAttractions: [],
      approximateYearOfConstruction: '',
      historicalFeaturesAndLegends: '',
      venueFloors: '',
      venueBedrooms: '',
      venueBathrooms: '',
      maxGuests: '',
      roomLayoutDescription: ''
    }
  });

  // Show notification if data was restored
  useEffect(() => {
    if (savedData && !hasRestoredData.current) {
      toast.success(t('autosave.restored'), {
        duration: 4000,
        icon: '💾'
      });
      hasRestoredData.current = true;
    }
  }, [savedData, t]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nearbySightseeingAttractions"
  });

  // Watch all form values for progress calculation
  const watchedValues = useWatch({ control });

  // Calculate form completion progress
  const formProgress = useMemo(() => {
    const requiredFields = [
      'language',
      'fullAddress',
      'venueName',
      'venueDescription',
      'venueFloors',
      'venueBedrooms',
      'venueBathrooms',
      'maxGuests'
    ];

    const completedFields = requiredFields.filter(field => {
      const value = watchedValues[field as keyof typeof watchedValues];
      return value !== '' && value !== null && value !== undefined;
    }).length;

    const percentage = Math.round((completedFields / requiredFields.length) * 100);

    return {
      completed: completedFields,
      total: requiredFields.length,
      percentage
    };
  }, [watchedValues]);

  // Autosave to localStorage with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (watchedValues && Object.keys(watchedValues).length > 0) {
        try {
          localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(watchedValues));
        } catch (error) {
          console.error('Error saving form data:', error);
        }
      }
    }, 1000); // Save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  // Clear autosave data
  const clearAutosaveData = () => {
    try {
      localStorage.removeItem(AUTOSAVE_KEY);
    } catch (error) {
      console.error('Error clearing autosaved data:', error);
    }
  };

  // Parse property path from server errors (e.g., "formBasic.fullAddress" -> "fullAddress")
  const parsePropertyPath = (propertyPath: string): string => {
    if (propertyPath.startsWith('formBasic.')) {
      return propertyPath.substring('formBasic.'.length);
    }
    return propertyPath;
  };

  // Map server errors to form fields
  const mapServerErrorsToForm = (violations: Violations) => {
    const newServerErrors: { [key: string]: string } = {};

    if (violations.violations) {
      violations.violations.forEach(violation => {
        if (violation.propertyPath && violation.message) {
          const fieldPath = parsePropertyPath(violation.propertyPath);
          newServerErrors[fieldPath] = violation.message;
          setError(fieldPath as any, {
            type: 'server',
            message: violation.message
          });
        }
      });
    }

    setServerErrors(newServerErrors);
  };

  const onSubmit: SubmitHandler<VacationRentalFormData> = (data) => {
    // Clear previous server errors
    setServerErrors({});
    clearErrors();

    // Get user email for userId
    const userId = user?.name;
    if (!userId) {
      toast.error(t('error.messages.noUsername'));
      return;
    }

    // Prepare the data in the format expected by the API (new structure)
    const formData: CreateCaseGeneratorFormVacationRentalDto = {
      formBasic: {
        language: data.language,
        epoch: data.epoch,
        theme: data.theme,
        additionalThemeDetails: data.additionalThemeDetails || undefined,
        fullAddress: data.fullAddress,
        venueName: data.venueName,
        venueDescription: data.venueDescription,
        nearbySightseeingAttractions: data.nearbySightseeingAttractions,
        approximateYearOfConstruction: data.approximateYearOfConstruction ? Number(data.approximateYearOfConstruction) : undefined,
        historicalFeaturesAndLegends: data.historicalFeaturesAndLegends || undefined,
      },
      venueFloors: Number(data.venueFloors),
      venueBedrooms: Number(data.venueBedrooms),
      venueBathrooms: Number(data.venueBathrooms),
      maxGuests: Number(data.maxGuests),
      roomLayoutDescription: data.roomLayoutDescription || undefined,
    };

    createCrimeCase(formData, {
      onSuccess: (response) => {
        // Clear autosaved data on successful submission
        clearAutosaveData();
        // Redirect to Stripe Checkout
        window.location.href = response.locationUrl;
      },
      onError: (error: any) => {
        // Handle validation errors
        if (error.context?.violations) {
          mapServerErrorsToForm(error.context);
          toast.error(t('error.messages.formValidationError'));
        } else {
          toast.error(t('error.messages.unknownError'));
        }
      },
    });
  };

  const addAttraction = () => {
    append({ attractionName: '', distanceToVenue: 0 });
  };

  const removeAttraction = (index: number) => {
    remove(index);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-center">
        <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto' }}>
          {/* Progress Bar */}
          <div className="card mb-4 animate-fade-in">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 fw-semibold">{t('form.progress.title')}</h6>
                <span className="badge bg-primary">{t('form.progress.percentage', { percentage: formProgress.percentage })}</span>
              </div>
              <div className="progress" style={{ height: '10px' }}>
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                  role="progressbar"
                  style={{ 
                    width: `${formProgress.percentage}%`,
                    transition: 'width 0.4s ease-in-out'
                  }}
                  aria-valuenow={formProgress.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small className="text-muted mt-2 d-block">
                {t('form.progress.completed', { 
                  completed: formProgress.completed, 
                  total: formProgress.total 
                })}
              </small>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Grundeinstellungen Card */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">{t('form.sections.basicSettings')}</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Language */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="language" className="form-label">{t('form.fields.language.label')} *</label>
                    <input
                      type="text"
                      id="language"
                      placeholder={t('form.fields.language.placeholder')}
                      className={`form-control ${errors.language || serverErrors.language ? 'is-invalid' : ''}`}
                      {...register('language', { required: t('form.fields.language.required') })}
                    />
                    {(errors.language || serverErrors.language) && (
                      <div className="invalid-feedback d-block">
                        {errors.language?.message || serverErrors.language}
                      </div>
                    )}
                  </div>

                  {/* Epoch */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="epoch" className="form-label">{t('form.fields.epoch.label')} *</label>
                    <select
                      id="epoch"
                      className={`form-select ${errors.epoch || serverErrors.epoch ? 'is-invalid' : ''}`}
                      {...register('epoch', { required: t('form.fields.epoch.required') })}
                    >
                      <option value="TWENTIES">{t('form.fields.epoch.options.twenties')}</option>
                      <option value="PRESENT">{t('form.fields.epoch.options.present')}</option>
                      <option value="FUTURE">{t('form.fields.epoch.options.future')}</option>
                    </select>
                    {(errors.epoch || serverErrors.epoch) && (
                      <div className="invalid-feedback d-block">
                        {errors.epoch?.message || serverErrors.epoch}
                      </div>
                    )}
                  </div>

                  {/* Theme */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="theme" className="form-label">{t('form.fields.theme.label')} *</label>
                    <select
                      id="theme"
                      className={`form-select ${errors.theme || serverErrors.theme ? 'is-invalid' : ''}`}
                      {...register('theme', { required: t('form.fields.theme.required') })}
                    >
                      <option value="MURDER">{t('form.fields.theme.options.murder')}</option>
                      <option value="ROBBERY">{t('form.fields.theme.options.robbery')}</option>
                      <option value="KIDNAPPING">{t('form.fields.theme.options.kidnapping')}</option>
                    </select>
                    {(errors.theme || serverErrors.theme) && (
                      <div className="invalid-feedback d-block">
                        {errors.theme?.message || serverErrors.theme}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Theme Details - Hidden field */}
                <input type="hidden" {...register("additionalThemeDetails")} />
              </div>
            </div>

            {/* Örtlichkeit Card */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">{t('form.sections.location')}</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Full Address */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fullAddress" className="form-label">{t('form.fields.fullAddress.label')} *</label>
                    <input
                      type="text"
                      id="fullAddress"
                      className={`form-control ${errors.fullAddress || serverErrors.fullAddress ? 'is-invalid' : ''}`}
                      {...register('fullAddress', { required: t('form.fields.fullAddress.required') })}
                    />
                    {(errors.fullAddress || serverErrors.fullAddress) && (
                      <div className="invalid-feedback d-block">
                        {errors.fullAddress?.message || serverErrors.fullAddress}
                      </div>
                    )}
                  </div>

                  {/* Venue Name */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="venueName" className="form-label">{t('form.fields.venueName.label')} *</label>
                    <input
                      type="text"
                      id="venueName"
                      className={`form-control ${errors.venueName || serverErrors.venueName ? 'is-invalid' : ''}`}
                      {...register('venueName', { required: t('form.fields.venueName.required') })}
                    />
                    {(errors.venueName || serverErrors.venueName) && (
                      <div className="invalid-feedback d-block">
                        {errors.venueName?.message || serverErrors.venueName}
                      </div>
                    )}
                  </div>

                  {/* Venue Description */}
                  <div className="col-12 mb-3">
                    <label htmlFor="venueDescription" className="form-label">{t('form.fields.venueDescription.label')} *</label>
                    <small className="form-text text-muted d-block mb-2">
                      {t('form.fields.venueDescription.helpText')}
                    </small>
                    <textarea
                      id="venueDescription"
                      className={`form-control ${errors.venueDescription || serverErrors.venueDescription ? 'is-invalid' : ''}`}
                      rows={3}
                      {...register('venueDescription', { required: t('form.fields.venueDescription.required') })}
                    />
                    {(errors.venueDescription || serverErrors.venueDescription) && (
                      <div className="invalid-feedback d-block">
                        {errors.venueDescription?.message || serverErrors.venueDescription}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Ferienwohnungs-Details Card */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">{t('form.sections.rentalDetails')}</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Venue Floors */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="venueFloors" className="form-label">{t('form.fields.venueFloors.label')} *</label>
                    <input
                      type="number"
                      id="venueFloors"
                      min="1"
                      className={`form-control ${errors.venueFloors || serverErrors.venueFloors ? 'is-invalid' : ''}`}
                      {...register('venueFloors', {
                        required: t('form.fields.venueFloors.required'),
                        min: { value: 1, message: t('form.fields.venueFloors.min') }
                      })}
                    />
                    {(errors.venueFloors || serverErrors.venueFloors) && (
                      <div className="invalid-feedback d-block">
                        {errors.venueFloors?.message || serverErrors.venueFloors}
                      </div>
                    )}
                  </div>

                  {/* Venue Bedrooms */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="venueBedrooms" className="form-label">{t('form.fields.venueBedrooms.label')} *</label>
                    <input
                      type="number"
                      id="venueBedrooms"
                      min="1"
                      className={`form-control ${errors.venueBedrooms || serverErrors.venueBedrooms ? 'is-invalid' : ''}`}
                      {...register('venueBedrooms', {
                        required: t('form.fields.venueBedrooms.required'),
                        min: { value: 1, message: t('form.fields.venueBedrooms.min') }
                      })}
                    />
                    {(errors.venueBedrooms || serverErrors.venueBedrooms) && (
                      <div className="invalid-feedback d-block">
                        {errors.venueBedrooms?.message || serverErrors.venueBedrooms}
                      </div>
                    )}
                  </div>

                  {/* Venue Bathrooms */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="venueBathrooms" className="form-label">{t('form.fields.venueBathrooms.label')} *</label>
                    <input
                      type="number"
                      id="venueBathrooms"
                      min="1"
                      className={`form-control ${errors.venueBathrooms || serverErrors.venueBathrooms ? 'is-invalid' : ''}`}
                      {...register('venueBathrooms', {
                        required: t('form.fields.venueBathrooms.required'),
                        min: { value: 1, message: t('form.fields.venueBathrooms.min') }
                      })}
                    />
                    {(errors.venueBathrooms || serverErrors.venueBathrooms) && (
                      <div className="invalid-feedback d-block">
                        {errors.venueBathrooms?.message || serverErrors.venueBathrooms}
                      </div>
                    )}
                  </div>

                  {/* Max Guests */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="maxGuests" className="form-label">{t('form.fields.maxGuests.label')} *</label>
                    <input
                      type="number"
                      id="maxGuests"
                      min="1"
                      className={`form-control ${errors.maxGuests || serverErrors.maxGuests ? 'is-invalid' : ''}`}
                      {...register('maxGuests', {
                        required: t('form.fields.maxGuests.required'),
                        min: { value: 1, message: t('form.fields.maxGuests.min') }
                      })}
                    />
                    {(errors.maxGuests || serverErrors.maxGuests) && (
                      <div className="invalid-feedback d-block">
                        {errors.maxGuests?.message || serverErrors.maxGuests}
                      </div>
                    )}
                  </div>

                  {/* Room Layout Description */}
                  <div className="col-12 mb-3">
                    <label htmlFor="roomLayoutDescription" className="form-label">{t('form.fields.roomLayoutDescription.label')}</label>
                    <small className="form-text text-muted d-block mb-2">
                      {t('form.fields.roomLayoutDescription.helpText')}
                    </small>
                    <textarea
                      id="roomLayoutDescription"
                      className={`form-control ${errors.roomLayoutDescription || serverErrors.roomLayoutDescription ? 'is-invalid' : ''}`}
                      rows={3}
                      {...register('roomLayoutDescription')}
                    />
                    {(errors.roomLayoutDescription || serverErrors.roomLayoutDescription) && (
                      <div className="invalid-feedback d-block">
                        {errors.roomLayoutDescription?.message || serverErrors.roomLayoutDescription}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sehenswürdigkeiten Card */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">{t('form.sections.attractions')}</h5>
              </div>
              <div className="card-body">
                {fields.map((field, index) => (
                  <div key={field.id} className="row mb-2">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`form-control ${errors.nearbySightseeingAttractions?.[index]?.attractionName || serverErrors[`nearbySightseeingAttractions.${index}.attractionName`] ? 'is-invalid' : ''}`}
                        placeholder={t('form.fields.attractionName.placeholder')}
                        {...register(`nearbySightseeingAttractions.${index}.attractionName`, {
                          required: t('form.fields.attractionName.required')
                        })}
                      />
                      {(errors.nearbySightseeingAttractions?.[index]?.attractionName || serverErrors[`nearbySightseeingAttractions.${index}.attractionName`]) && (
                        <div className="invalid-feedback d-block">
                          {errors.nearbySightseeingAttractions?.[index]?.attractionName?.message || serverErrors[`nearbySightseeingAttractions.${index}.attractionName`]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        className={`form-control ${errors.nearbySightseeingAttractions?.[index]?.distanceToVenue || serverErrors[`nearbySightseeingAttractions.${index}.distanceToVenue`] ? 'is-invalid' : ''}`}
                        placeholder={t('form.fields.attractionDistance.placeholder')}
                        {...register(`nearbySightseeingAttractions.${index}.distanceToVenue`, {
                          required: t('form.fields.attractionDistance.required'),
                          min: { value: 0, message: t('form.fields.attractionDistance.min') }
                        })}
                      />
                      {(errors.nearbySightseeingAttractions?.[index]?.distanceToVenue || serverErrors[`nearbySightseeingAttractions.${index}.distanceToVenue`]) && (
                        <div className="invalid-feedback d-block">
                          {errors.nearbySightseeingAttractions?.[index]?.distanceToVenue?.message || serverErrors[`nearbySightseeingAttractions.${index}.distanceToVenue`]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-2">
                      <button
                        type="button"
                        className="btn btn-outline-danger w-100"
                        onClick={() => removeAttraction(index)}
                      >
                        {t('form.buttons.removeAttraction')}
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={addAttraction}
                >
                  {t('form.buttons.addAttraction')}
                </button>
              </div>
            </div>

            {/* Historische Informationen Card */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">{t('form.sections.historicalInfo')}</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Approximate Year of Construction */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="approximateYearOfConstruction" className="form-label">{t('form.fields.approximateYearOfConstruction.label')}</label>
                    <input
                      type="number"
                      id="approximateYearOfConstruction"
                      min="1000"
                      max="2024"
                      className={`form-control ${errors.approximateYearOfConstruction || serverErrors.approximateYearOfConstruction ? 'is-invalid' : ''}`}
                      {...register('approximateYearOfConstruction')}
                    />
                    {(errors.approximateYearOfConstruction || serverErrors.approximateYearOfConstruction) && (
                      <div className="invalid-feedback d-block">
                        {errors.approximateYearOfConstruction?.message || serverErrors.approximateYearOfConstruction}
                      </div>
                    )}
                  </div>

                  {/* Historical Features and Legends */}
                  <div className="col-12 mb-3">
                    <label htmlFor="historicalFeaturesAndLegends" className="form-label">{t('form.fields.historicalFeaturesAndLegends.label')}</label>
                    <textarea
                      id="historicalFeaturesAndLegends"
                      className={`form-control ${errors.historicalFeaturesAndLegends || serverErrors.historicalFeaturesAndLegends ? 'is-invalid' : ''}`}
                      rows={3}
                      {...register('historicalFeaturesAndLegends')}
                    />
                    {(errors.historicalFeaturesAndLegends || serverErrors.historicalFeaturesAndLegends) && (
                      <div className="invalid-feedback d-block">
                        {errors.historicalFeaturesAndLegends?.message || serverErrors.historicalFeaturesAndLegends}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={isPending}
              >
                {t('form.buttons.cancel')}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPending}
              >
                {isPending ? t('form.buttons.submitting') : t('form.buttons.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VacationRentalCaseGeneratorForm;