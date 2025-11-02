import { RequestBody as CreateCrimeCaseBasicDto, useCreateCrimeCaseBasic } from "@/hooks/useCreateCrimeCaseBasic";
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import type { Violations } from "../../supabase/functions/_shared/crime-api-types";
interface BasicCaseGeneratorFormProps {
  onSuccess: (locationUrl: string) => void;
  onCancel: () => void;
}

const BasicCaseGeneratorForm = ({ onSuccess, onCancel }: BasicCaseGeneratorFormProps) => {
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  // Form management
  const { control, register, handleSubmit, formState: { isSubmitting }, setError, clearErrors } = useForm<CreateCrimeCaseBasicDto>({
    defaultValues: {
      language: '',
      epoch: 'PRESENT',
      theme: 'MURDER',
      additionalThemeDetails: '',
      fullAddress: '',
      venueName: '',
      venueDescription: '',
      nearbySightseeingAttractions: [{ attractionName: '', distanceToVenue: 0 }],
      approximateYearOfConstruction: undefined,
      historicalFeaturesAndLegends: '',
      historicalCulturalContext: ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nearbySightseeingAttractions"
  });

  // Create crime case mutation
  const createCaseMutation = useCreateCrimeCaseBasic();

  // Parse property path for error mapping
  const parsePropertyPath = (propertyPath: string): { field: string; index?: number; subfield?: string } => {
    // Handle array notation: arrayFieldName[index].propName
    const arrayMatch = propertyPath.match(/^(\w+)\[(\d+)\]\.(\w+)$/);
    if (arrayMatch) {
      return {
        field: arrayMatch[1],
        index: parseInt(arrayMatch[2], 10),
        subfield: arrayMatch[3]
      };
    }

    // Handle simple array: arrayFieldName[index]
    const simpleArrayMatch = propertyPath.match(/^(\w+)\[(\d+)\]$/);
    if (simpleArrayMatch) {
      return {
        field: simpleArrayMatch[1],
        index: parseInt(simpleArrayMatch[2], 10)
      };
    }

    // Handle simple field
    return { field: propertyPath };
  };

  // Map server errors to form fields
  const mapServerErrorsToForm = (context: Violations) => {
    const errorMap: Record<string, string> = {};

    context.violations?.forEach((violation) => {
      if (violation.propertyPath && violation.message) {
        const { field, index, subfield } = parsePropertyPath(violation.propertyPath);

        if (index !== undefined && subfield) {
          // Array element with subfield: nearbySightseeingAttractions[0].attractionName
          const fieldKey = `nearbySightseeingAttractions.${index}.${subfield}`;
          errorMap[fieldKey] = violation.message;
          setError(`nearbySightseeingAttractions.${index}.${subfield}` as any, {
            type: 'server',
            message: violation.message
          });
        } else if (index !== undefined) {
          // Array element: nearbySightseeingAttractions[0]  
          const fieldKey = `nearbySightseeingAttractions.${index}`;
          errorMap[fieldKey] = violation.message;
        } else {
          // Simple field
          errorMap[field] = violation.message;
          setError(field as any, {
            type: 'server',
            message: violation.message
          });
        }
      }
    });

    setServerErrors(errorMap);
  };

  // Form submission
  const onSubmit = async (data: CreateCrimeCaseBasicDto) => {
    try {
      // Clear previous errors
      clearErrors();
      setServerErrors({});

      // Prepare form data with hidden caseGeneratorForm field
      const formData: CreateCrimeCaseBasicDto = {
        caseGeneratorForm: "BASIC", // Hidden field, always BASIC
        language: data.language,
        epoch: data.epoch,
        theme: data.theme,
        additionalThemeDetails: data.additionalThemeDetails || undefined,
        fullAddress: data.fullAddress,
        venueName: data.venueName,
        venueDescription: data.venueDescription,
        nearbySightseeingAttractions: data.nearbySightseeingAttractions,
        approximateYearOfConstruction: data.approximateYearOfConstruction,
        historicalFeaturesAndLegends: data.historicalFeaturesAndLegends || undefined,
        historicalCulturalContext: data.historicalCulturalContext || undefined
      };

      const result = await createCaseMutation.mutateAsync(formData);
      toast.success('Die Fallerstellung wurde gestartet. Bitte warten Sie...');
      onSuccess(result.locationUrl);

    } catch (error: any) {
      // Handle validation errors from server
      if (error?.context) {
        mapServerErrorsToForm(error.context);
        toast.error('Bitte korrigieren Sie die markierten Felder.');
      } else {
        toast.error('Ein unbekannter Fehler ist aufgetreten.');
      }
    }
  };

  const addAttraction = () => {
    append({ attractionName: '', distanceToVenue: 0 });
  };

  const removeAttraction = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Neuen Fall erstellen</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Language */}
            <div className="col-md-6 mb-3">
              <label htmlFor="language" className="form-label">
                Sprache <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${serverErrors.language ? 'is-invalid' : ''}`}
                id="language"
                {...register('language')}
                placeholder="z.B. Deutsch, English"
              />
              {serverErrors.language && (
                <div className="invalid-feedback">{serverErrors.language}</div>
              )}
            </div>

            {/* Epoch */}
            <div className="col-md-6 mb-3">
              <label htmlFor="epoch" className="form-label">
                Epoche <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${serverErrors.epoch ? 'is-invalid' : ''}`}
                id="epoch"
                {...register('epoch')}
              >
                <option value="TWENTIES">Die Zwanziger Jahre</option>
                <option value="PRESENT">Gegenwart</option>
                <option value="FUTURE">Zukunft</option>
              </select>
              {serverErrors.epoch && (
                <div className="invalid-feedback">{serverErrors.epoch}</div>
              )}
            </div>

            {/* Theme */}
            <div className="col-md-6 mb-3">
              <label htmlFor="theme" className="form-label">
                Thema <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${serverErrors.theme ? 'is-invalid' : ''}`}
                id="theme"
                {...register('theme')}
              >
                <option value="MURDER">Mord</option>
                <option value="ROBBERY">Raub</option>
                <option value="KIDNAPPING">Entführung</option>
              </select>
              {serverErrors.theme && (
                <div className="invalid-feedback">{serverErrors.theme}</div>
              )}
            </div>

            {/* Additional Theme Details */}
            <div className="col-md-6 mb-3">
              <label htmlFor="additionalThemeDetails" className="form-label">
                Zusätzliche Themendetails
              </label>
              <textarea
                className={`form-control ${serverErrors.additionalThemeDetails ? 'is-invalid' : ''}`}
                id="additionalThemeDetails"
                rows={3}
                {...register('additionalThemeDetails')}
                placeholder="Weitere Details zum Thema..."
              />
              {serverErrors.additionalThemeDetails && (
                <div className="invalid-feedback">{serverErrors.additionalThemeDetails}</div>
              )}
            </div>

            {/* Full Address */}
            <div className="col-12 mb-3">
              <label htmlFor="fullAddress" className="form-label">
                Vollständige Adresse <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${serverErrors.fullAddress ? 'is-invalid' : ''}`}
                id="fullAddress"
                {...register('fullAddress')}
                placeholder="Straße, Hausnummer, PLZ, Ort, Land"
              />
              {serverErrors.fullAddress && (
                <div className="invalid-feedback">{serverErrors.fullAddress}</div>
              )}
            </div>

            {/* Venue Name */}
            <div className="col-md-6 mb-3">
              <label htmlFor="venueName" className="form-label">
                Name der Örtlichkeit <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${serverErrors.venueName ? 'is-invalid' : ''}`}
                id="venueName"
                {...register('venueName')}
                placeholder="z.B. Hotel Continental, Villa Rosenberg"
              />
              {serverErrors.venueName && (
                <div className="invalid-feedback">{serverErrors.venueName}</div>
              )}
            </div>

            {/* Approximate Year of Construction */}
            <div className="col-md-6 mb-3">
              <label htmlFor="approximateYearOfConstruction" className="form-label">
                Ungefähres Baujahr
              </label>
              <input
                type="number"
                className={`form-control ${serverErrors.approximateYearOfConstruction ? 'is-invalid' : ''}`}
                id="approximateYearOfConstruction"
                {...register('approximateYearOfConstruction')}
                placeholder="z.B. 1925"
                min="1800"
                max="2100"
              />
              {serverErrors.approximateYearOfConstruction && (
                <div className="invalid-feedback">{serverErrors.approximateYearOfConstruction}</div>
              )}
            </div>

            {/* Venue Description */}
            <div className="col-12 mb-3">
              <label htmlFor="venueDescription" className="form-label">
                Beschreibung der Örtlichkeit <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${serverErrors.venueDescription ? 'is-invalid' : ''}`}
                id="venueDescription"
                rows={4}
                {...register('venueDescription')}
                placeholder="Detaillierte Beschreibung der Örtlichkeit, Architektur, Besonderheiten..."
              />
              {serverErrors.venueDescription && (
                <div className="invalid-feedback">{serverErrors.venueDescription}</div>
              )}
            </div>

            {/* Nearby Sightseeing Attractions */}
            <div className="col-12 mb-4">
              <label className="form-label">
                Sehenswürdigkeiten in der Nähe <span className="text-danger">*</span>
              </label>

              {fields.map((field, index) => (
                <div key={field.id} className="card mb-2">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">Sehenswürdigkeit {index + 1}</h6>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeAttraction(index)}
                        >
                          Entfernen
                        </button>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-8 mb-2">
                        <label htmlFor={`attractions-${index}-name`} className="form-label">Name</label>
                        <input
                          type="text"
                          className={`form-control ${serverErrors[`nearbySightseeingAttractions.${index}.attractionName`] ? 'is-invalid' : ''}`}
                          id={`attractions-${index}-name`}
                          {...register(`nearbySightseeingAttractions.${index}.attractionName`)}
                          placeholder="Name der Sehenswürdigkeit"
                        />
                        {serverErrors[`nearbySightseeingAttractions.${index}.attractionName`] && (
                          <div className="invalid-feedback">
                            {serverErrors[`nearbySightseeingAttractions.${index}.attractionName`]}
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 mb-2">
                        <label htmlFor={`attractions-${index}-distance`} className="form-label">Entfernung (m)</label>
                        <input
                          type="number"
                          className={`form-control ${serverErrors[`nearbySightseeingAttractions.${index}.distanceToVenue`] ? 'is-invalid' : ''}`}
                          id={`attractions-${index}-distance`}
                          {...register(`nearbySightseeingAttractions.${index}.distanceToVenue`, {
                            valueAsNumber: true,
                            setValueAs: (value) => value === '' ? 0 : Number(value)
                          })}
                          placeholder="Entfernung in Metern"
                          min="0"
                        />
                        {serverErrors[`nearbySightseeingAttractions.${index}.distanceToVenue`] && (
                          <div className="invalid-feedback">
                            {serverErrors[`nearbySightseeingAttractions.${index}.distanceToVenue`]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={addAttraction}
              >
                Weitere Sehenswürdigkeit hinzufügen
              </button>
            </div>

            {/* Historical Features and Legends */}
            <div className="col-md-6 mb-3">
              <label htmlFor="historicalFeaturesAndLegends" className="form-label">
                Historische Merkmale und Legenden
              </label>
              <textarea
                className={`form-control ${serverErrors.historicalFeaturesAndLegends ? 'is-invalid' : ''}`}
                id="historicalFeaturesAndLegends"
                rows={4}
                {...register('historicalFeaturesAndLegends')}
                placeholder="Historische Besonderheiten, Legenden, bekannte Ereignisse..."
              />
              {serverErrors.historicalFeaturesAndLegends && (
                <div className="invalid-feedback">{serverErrors.historicalFeaturesAndLegends}</div>
              )}
            </div>

            {/* Historical Cultural Context */}
            <div className="col-md-6 mb-3">
              <label htmlFor="historicalCulturalContext" className="form-label">
                Historischer und kultureller Kontext
              </label>
              <textarea
                className={`form-control ${serverErrors.historicalCulturalContext ? 'is-invalid' : ''}`}
                id="historicalCulturalContext"
                rows={4}
                {...register('historicalCulturalContext')}
                placeholder="Zeitgeist, kulturelle Einflüsse, gesellschaftlicher Hintergrund..."
              />
              {serverErrors.historicalCulturalContext && (
                <div className="invalid-feedback">{serverErrors.historicalCulturalContext}</div>
              )}
            </div>
          </div>

          <div className="d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
              Zurück zur Fallverwaltung
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || createCaseMutation.isPending}
            >
              {isSubmitting || createCaseMutation.isPending ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Fall erstellen...
                </>
              ) : (
                'Fall erstellen'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicCaseGeneratorForm;