import { useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useCreateCrimeCaseVacationRental } from '@/hooks/useCreateCrimeCaseVacationRental';
import { useToast } from '@/hooks/use-toast';
import { useKeycloak } from '@/contexts/KeycloakContext';
import type { CreateSightseeingAttractionDto, CreateCaseGeneratorFormVacationRentalDto, Violations } from '../../supabase/functions/_shared/crime-api-types';

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
  historicalCulturalContext: string;
  // Vacation rental specific fields
  venueFloors: number | "";
  venueBedrooms: number | "";
  venueBathrooms: number | "";
  maxGuests: number | "";
  roomLayoutDescription: string;
}

interface VacationRentalCaseGeneratorFormProps {
  onSuccess: (locationUrl: string) => void;
  onCancel: () => void;
}

const VacationRentalCaseGeneratorForm = ({ onSuccess, onCancel }: VacationRentalCaseGeneratorFormProps) => {
  const { toast } = useToast();
  const { user } = useKeycloak();
  const { mutate: createCrimeCase, isPending } = useCreateCrimeCaseVacationRental();
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string }>({});

  const { register, handleSubmit, control, formState: { errors }, setError, clearErrors } = useForm<VacationRentalFormData>({
    defaultValues: {
      language: 'GERMAN',
      epoch: 'PRESENT',
      theme: 'MURDER',
      additionalThemeDetails: '',
      fullAddress: '',
      venueName: '',
      venueDescription: '',
      nearbySightseeingAttractions: [],
      approximateYearOfConstruction: '',
      historicalFeaturesAndLegends: '',
      historicalCulturalContext: '',
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

  // Parse property path from server errors (e.g., "formBase.fullAddress" -> "fullAddress")
  const parsePropertyPath = (propertyPath: string): string => {
    if (propertyPath.startsWith('formBase.')) {
      return propertyPath.substring('formBase.'.length);
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
      formBase: {
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
        historicalCulturalContext: data.historicalCulturalContext || undefined,
      },
      venueFloors: Number(data.venueFloors),
      venueBedrooms: Number(data.venueBedrooms),
      venueBathrooms: Number(data.venueBathrooms),
      maxGuests: Number(data.maxGuests),
      roomLayoutDescription: data.roomLayoutDescription || undefined,
    };

    createCrimeCase(formData, {
      onSuccess: (response) => {
        toast({
          title: "Success!",
          description: "Vacation Rental Crime Case is being created...",
        });
        onSuccess(response.locationUrl);
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
        <div style={{ width: '70%' }}>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0">Vacation Rental Crime Case Generator</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Language */}
                <div className="mb-3">
                  <label htmlFor="language" className="form-label">Language *</label>
                  <select
                    id="language"
                    className={`form-select ${errors.language || serverErrors.language ? 'is-invalid' : ''}`}
                    {...register('language', { required: 'Language is required' })}
                  >
                    <option value="GERMAN">German</option>
                    <option value="ENGLISH">English</option>
                  </select>
                  {(errors.language || serverErrors.language) && (
                    <div className="invalid-feedback d-block">
                      {errors.language?.message || serverErrors.language}
                    </div>
                  )}
                </div>

                {/* Epoch */}
                <div className="mb-3">
                  <label htmlFor="epoch" className="form-label">Epoch *</label>
                  <select
                    id="epoch"
                    className={`form-select ${errors.epoch || serverErrors.epoch ? 'is-invalid' : ''}`}
                    {...register('epoch', { required: 'Epoch is required' })}
                  >
                    <option value="TWENTIES">1920s</option>
                    <option value="PRESENT">Present</option>
                    <option value="FUTURE">Future</option>
                  </select>
                  {(errors.epoch || serverErrors.epoch) && (
                    <div className="invalid-feedback d-block">
                      {errors.epoch?.message || serverErrors.epoch}
                    </div>
                  )}
                </div>

                {/* Theme */}
                <div className="mb-3">
                  <label htmlFor="theme" className="form-label">Theme *</label>
                  <select
                    id="theme"
                    className={`form-select ${errors.theme || serverErrors.theme ? 'is-invalid' : ''}`}
                    {...register('theme', { required: 'Theme is required' })}
                  >
                    <option value="MURDER">Murder</option>
                    <option value="ROBBERY">Robbery</option>
                    <option value="KIDNAPPING">Kidnapping</option>
                  </select>
                  {(errors.theme || serverErrors.theme) && (
                    <div className="invalid-feedback d-block">
                      {errors.theme?.message || serverErrors.theme}
                    </div>
                  )}
                </div>

                {/* Additional Theme Details - Hidden field */}
                <input
                  type="hidden"
                  {...register("additionalThemeDetails")}
                />

                {/* Full Address */}
                <div className="mb-3">
                  <label htmlFor="fullAddress" className="form-label">Full Address *</label>
                  <input
                    type="text"
                    id="fullAddress"
                    className={`form-control ${errors.fullAddress || serverErrors.fullAddress ? 'is-invalid' : ''}`}
                    {...register('fullAddress', { required: 'Full address is required' })}
                  />
                  {(errors.fullAddress || serverErrors.fullAddress) && (
                    <div className="invalid-feedback d-block">
                      {errors.fullAddress?.message || serverErrors.fullAddress}
                    </div>
                  )}
                </div>

                {/* Venue Name */}
                <div className="mb-3">
                  <label htmlFor="venueName" className="form-label">Venue Name *</label>
                  <input
                    type="text"
                    id="venueName"
                    className={`form-control ${errors.venueName || serverErrors.venueName ? 'is-invalid' : ''}`}
                    {...register('venueName', { required: 'Venue name is required' })}
                  />
                  {(errors.venueName || serverErrors.venueName) && (
                    <div className="invalid-feedback d-block">
                      {errors.venueName?.message || serverErrors.venueName}
                    </div>
                  )}
                </div>

                {/* Venue Description */}
                <div className="mb-3">
                  <label htmlFor="venueDescription" className="form-label">Venue Description *</label>
                  <textarea
                    id="venueDescription"
                    className={`form-control ${errors.venueDescription || serverErrors.venueDescription ? 'is-invalid' : ''}`}
                    rows={3}
                    {...register('venueDescription', { required: 'Venue description is required' })}
                  />
                  {(errors.venueDescription || serverErrors.venueDescription) && (
                    <div className="invalid-feedback d-block">
                      {errors.venueDescription?.message || serverErrors.venueDescription}
                    </div>
                  )}
                </div>

                {/* Vacation Rental Specific Fields */}
                <hr />
                <h4>Vacation Rental Details</h4>

                {/* Venue Floors */}
                <div className="mb-3">
                  <label htmlFor="venueFloors" className="form-label">Number of Floors *</label>
                  <input
                    type="number"
                    id="venueFloors"
                    min="1"
                    className={`form-control ${errors.venueFloors || serverErrors.venueFloors ? 'is-invalid' : ''}`}
                    {...register('venueFloors', { 
                      required: 'Number of floors is required',
                      min: { value: 1, message: 'At least 1 floor required' }
                    })}
                  />
                  {(errors.venueFloors || serverErrors.venueFloors) && (
                    <div className="invalid-feedback d-block">
                      {errors.venueFloors?.message || serverErrors.venueFloors}
                    </div>
                  )}
                </div>

                {/* Venue Bedrooms */}
                <div className="mb-3">
                  <label htmlFor="venueBedrooms" className="form-label">Number of Bedrooms *</label>
                  <input
                    type="number"
                    id="venueBedrooms"
                    min="1"
                    className={`form-control ${errors.venueBedrooms || serverErrors.venueBedrooms ? 'is-invalid' : ''}`}
                    {...register('venueBedrooms', { 
                      required: 'Number of bedrooms is required',
                      min: { value: 1, message: 'At least 1 bedroom required' }
                    })}
                  />
                  {(errors.venueBedrooms || serverErrors.venueBedrooms) && (
                    <div className="invalid-feedback d-block">
                      {errors.venueBedrooms?.message || serverErrors.venueBedrooms}
                    </div>
                  )}
                </div>

                {/* Venue Bathrooms */}
                <div className="mb-3">
                  <label htmlFor="venueBathrooms" className="form-label">Number of Bathrooms *</label>
                  <input
                    type="number"
                    id="venueBathrooms"
                    min="1"
                    className={`form-control ${errors.venueBathrooms || serverErrors.venueBathrooms ? 'is-invalid' : ''}`}
                    {...register('venueBathrooms', { 
                      required: 'Number of bathrooms is required',
                      min: { value: 1, message: 'At least 1 bathroom required' }
                    })}
                  />
                  {(errors.venueBathrooms || serverErrors.venueBathrooms) && (
                    <div className="invalid-feedback d-block">
                      {errors.venueBathrooms?.message || serverErrors.venueBathrooms}
                    </div>
                  )}
                </div>

                {/* Max Guests */}
                <div className="mb-3">
                  <label htmlFor="maxGuests" className="form-label">Maximum Number of Guests *</label>
                  <input
                    type="number"
                    id="maxGuests"
                    min="1"
                    className={`form-control ${errors.maxGuests || serverErrors.maxGuests ? 'is-invalid' : ''}`}
                    {...register('maxGuests', { 
                      required: 'Maximum number of guests is required',
                      min: { value: 1, message: 'At least 1 guest required' }
                    })}
                  />
                  {(errors.maxGuests || serverErrors.maxGuests) && (
                    <div className="invalid-feedback d-block">
                      {errors.maxGuests?.message || serverErrors.maxGuests}
                    </div>
                  )}
                </div>

                {/* Room Layout Description */}
                <div className="mb-3">
                  <label htmlFor="roomLayoutDescription" className="form-label">Room Layout Description</label>
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

                <hr />

                {/* Approximate Year of Construction */}
                <div className="mb-3">
                  <label htmlFor="approximateYearOfConstruction" className="form-label">Approximate Year of Construction</label>
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
                <div className="mb-3">
                  <label htmlFor="historicalFeaturesAndLegends" className="form-label">Historical Features and Legends</label>
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

                {/* Historical Cultural Context */}
                <div className="mb-3">
                  <label htmlFor="historicalCulturalContext" className="form-label">Historical Cultural Context</label>
                  <textarea
                    id="historicalCulturalContext"
                    className={`form-control ${errors.historicalCulturalContext || serverErrors.historicalCulturalContext ? 'is-invalid' : ''}`}
                    rows={3}
                    {...register('historicalCulturalContext')}
                  />
                  {(errors.historicalCulturalContext || serverErrors.historicalCulturalContext) && (
                    <div className="invalid-feedback d-block">
                      {errors.historicalCulturalContext?.message || serverErrors.historicalCulturalContext}
                    </div>
                  )}
                </div>

                {/* Nearby Sightseeing Attractions */}
                <div className="mb-3">
                  <label className="form-label">Nearby Sightseeing Attractions</label>
                  {fields.map((field, index) => (
                    <div key={field.id} className="row mb-2">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className={`form-control ${errors.nearbySightseeingAttractions?.[index]?.attractionName || serverErrors[`nearbySightseeingAttractions.${index}.attractionName`] ? 'is-invalid' : ''}`}
                          placeholder="Attraction Name"
                          {...register(`nearbySightseeingAttractions.${index}.attractionName`, {
                            required: 'Attraction name is required'
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
                          placeholder="Distance (km)"
                          {...register(`nearbySightseeingAttractions.${index}.distanceToVenue`, {
                            required: 'Distance is required',
                            min: { value: 0, message: 'Distance must be positive' }
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
                          className="btn btn-outline-danger"
                          onClick={() => removeAttraction(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={addAttraction}
                  >
                    + Add Attraction
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    disabled={isPending}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isPending}
                  >
                    {isPending ? 'Creating...' : 'Create Vacation Rental Crime Case'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationRentalCaseGeneratorForm;