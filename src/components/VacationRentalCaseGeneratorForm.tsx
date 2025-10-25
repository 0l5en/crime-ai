import { useUserContext } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { useCreateCrimeCaseVacationRental } from '@/hooks/useCreateCrimeCaseVacationRental';
import { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import type { CreateCaseGeneratorFormVacationRentalDto, CreateSightseeingAttractionDto, Violations } from '../../supabase/functions/_shared/crime-api-types';

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

const VacationRentalCaseGeneratorForm = ({ onSuccess, onCancel }: VacationRentalCaseGeneratorFormProps) => {
  const { toast } = useToast();
  const user = useUserContext();
  const { mutate: createCrimeCase, isPending } = useCreateCrimeCaseVacationRental();
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string }>({});

  const { register, handleSubmit, control, formState: { errors }, setError, clearErrors } = useForm<VacationRentalFormData>({
    defaultValues: {
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nearbySightseeingAttractions"
  });

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
    const userId = user?.email;
    if (!userId) {
      toast({
        title: "Error",
        description: "User email not available. Please log in again.",
      });
      return;
    }

    // Prepare the data in the format expected by the API (new structure)
    const formData: CreateCaseGeneratorFormVacationRentalDto = {
      userId: userId,
      formBasic: {
        caseGeneratorForm: "BASIC" as const,
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
        // Redirect to Stripe Checkout
        window.location.href = response.locationUrl;
      },
      onError: (error: any) => {
        console.error('Error creating Vacation Rental Crime Case:', error);

        // Handle validation errors
        if (error.context?.violations) {
          mapServerErrorsToForm(error.context);
          toast({
            title: "Validation Error",
            description: "Please check your inputs.",
          });
        } else {
          toast({
            title: "Error!",
            description: error.message || "An unknown error occurred.",
          });
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
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Grundeinstellungen Card */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Grundeinstellungen</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Language */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="language" className="form-label">Sprache *</label>
                    <input
                      type="text"
                      id="language"
                      placeholder="z.B. Deutsch, English, Français"
                      className={`form-control ${errors.language || serverErrors.language ? 'is-invalid' : ''}`}
                      {...register('language', { required: 'Sprache ist erforderlich' })}
                    />
                    {(errors.language || serverErrors.language) && (
                      <div className="invalid-feedback d-block">
                        {errors.language?.message || serverErrors.language}
                      </div>
                    )}
                  </div>

                  {/* Epoch */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="epoch" className="form-label">Epoche *</label>
                    <select
                      id="epoch"
                      className={`form-select ${errors.epoch || serverErrors.epoch ? 'is-invalid' : ''}`}
                      {...register('epoch', { required: 'Epoche ist erforderlich' })}
                    >
                      <option value="TWENTIES">1920er</option>
                      <option value="PRESENT">Gegenwart</option>
                      <option value="FUTURE">Zukunft</option>
                    </select>
                    {(errors.epoch || serverErrors.epoch) && (
                      <div className="invalid-feedback d-block">
                        {errors.epoch?.message || serverErrors.epoch}
                      </div>
                    )}
                  </div>

                  {/* Theme */}
                  <div className="col-md-4 mb-3">
                    <label htmlFor="theme" className="form-label">Thema *</label>
                    <select
                      id="theme"
                      className={`form-select ${errors.theme || serverErrors.theme ? 'is-invalid' : ''}`}
                      {...register('theme', { required: 'Thema ist erforderlich' })}
                    >
                      <option value="MURDER">Mord</option>
                      <option value="ROBBERY">Raub</option>
                      <option value="KIDNAPPING">Entführung</option>
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
                <h5 className="mb-0">Örtlichkeit</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Full Address */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fullAddress" className="form-label">Vollständige Adresse *</label>
                    <input
                      type="text"
                      id="fullAddress"
                      className={`form-control ${errors.fullAddress || serverErrors.fullAddress ? 'is-invalid' : ''}`}
                      {...register('fullAddress', { required: 'Adresse ist erforderlich' })}
                    />
                    {(errors.fullAddress || serverErrors.fullAddress) && (
                      <div className="invalid-feedback d-block">
                        {errors.fullAddress?.message || serverErrors.fullAddress}
                      </div>
                    )}
                  </div>

                  {/* Venue Name */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="venueName" className="form-label">Name der Unterkunft *</label>
                    <input
                      type="text"
                      id="venueName"
                      className={`form-control ${errors.venueName || serverErrors.venueName ? 'is-invalid' : ''}`}
                      {...register('venueName', { required: 'Name ist erforderlich' })}
                    />
                    {(errors.venueName || serverErrors.venueName) && (
                      <div className="invalid-feedback d-block">
                        {errors.venueName?.message || serverErrors.venueName}
                      </div>
                    )}
                  </div>

                  {/* Venue Description */}
                  <div className="col-12 mb-3">
                    <label htmlFor="venueDescription" className="form-label">Beschreibung der Unterkunft *</label>
                    <small className="form-text text-muted d-block mb-2">
                      Beschreiben Sie Architektur, Einrichtungsstil und Besonderheiten
                    </small>
                    <textarea
                      id="venueDescription"
                      className={`form-control ${errors.venueDescription || serverErrors.venueDescription ? 'is-invalid' : ''}`}
                      rows={3}
                      {...register('venueDescription', { required: 'Beschreibung ist erforderlich' })}
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
                <h5 className="mb-0">Ferienwohnungs-Details</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Venue Floors */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="venueFloors" className="form-label">Anzahl Stockwerke *</label>
                    <input
                      type="number"
                      id="venueFloors"
                      min="1"
                      className={`form-control ${errors.venueFloors || serverErrors.venueFloors ? 'is-invalid' : ''}`}
                      {...register('venueFloors', {
                        required: 'Anzahl Stockwerke ist erforderlich',
                        min: { value: 1, message: 'Mindestens 1 Stockwerk erforderlich' }
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
                    <label htmlFor="venueBedrooms" className="form-label">Anzahl Schlafzimmer *</label>
                    <input
                      type="number"
                      id="venueBedrooms"
                      min="1"
                      className={`form-control ${errors.venueBedrooms || serverErrors.venueBedrooms ? 'is-invalid' : ''}`}
                      {...register('venueBedrooms', {
                        required: 'Anzahl Schlafzimmer ist erforderlich',
                        min: { value: 1, message: 'Mindestens 1 Schlafzimmer erforderlich' }
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
                    <label htmlFor="venueBathrooms" className="form-label">Anzahl Badezimmer *</label>
                    <input
                      type="number"
                      id="venueBathrooms"
                      min="1"
                      className={`form-control ${errors.venueBathrooms || serverErrors.venueBathrooms ? 'is-invalid' : ''}`}
                      {...register('venueBathrooms', {
                        required: 'Anzahl Badezimmer ist erforderlich',
                        min: { value: 1, message: 'Mindestens 1 Badezimmer erforderlich' }
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
                    <label htmlFor="maxGuests" className="form-label">Maximale Gästeanzahl *</label>
                    <input
                      type="number"
                      id="maxGuests"
                      min="1"
                      className={`form-control ${errors.maxGuests || serverErrors.maxGuests ? 'is-invalid' : ''}`}
                      {...register('maxGuests', {
                        required: 'Maximale Gästeanzahl ist erforderlich',
                        min: { value: 1, message: 'Mindestens 1 Gast erforderlich' }
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
                    <label htmlFor="roomLayoutDescription" className="form-label">Raumaufteilung (optional)</label>
                    <small className="form-text text-muted d-block mb-2">
                      Beschreiben Sie die Raumaufteilung über alle Stockwerke
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
                <h5 className="mb-0">Sehenswürdigkeiten in der Nähe</h5>
              </div>
              <div className="card-body">
                {fields.map((field, index) => (
                  <div key={field.id} className="row mb-2">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`form-control ${errors.nearbySightseeingAttractions?.[index]?.attractionName || serverErrors[`nearbySightseeingAttractions.${index}.attractionName`] ? 'is-invalid' : ''}`}
                        placeholder="Name der Sehenswürdigkeit"
                        {...register(`nearbySightseeingAttractions.${index}.attractionName`, {
                          required: 'Name ist erforderlich'
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
                        placeholder="Entfernung (km)"
                        {...register(`nearbySightseeingAttractions.${index}.distanceToVenue`, {
                          required: 'Entfernung ist erforderlich',
                          min: { value: 0, message: 'Entfernung muss positiv sein' }
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
                        Entfernen
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={addAttraction}
                >
                  + Sehenswürdigkeit hinzufügen
                </button>
              </div>
            </div>

            {/* Historische Informationen Card */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Historische Informationen (optional)</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Approximate Year of Construction */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="approximateYearOfConstruction" className="form-label">Ungefähres Baujahr</label>
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
                    <label htmlFor="historicalFeaturesAndLegends" className="form-label">Historische Merkmale und Legenden</label>
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

            {/* Sticky Action Buttons */}
            <div className="sticky-bottom bg-white border-top p-3 shadow-sm">
              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                  disabled={isPending}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isPending}
                >
                  {isPending ? 'Wird erstellt...' : 'Ferienwohnungs-Fall erstellen'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VacationRentalCaseGeneratorForm;