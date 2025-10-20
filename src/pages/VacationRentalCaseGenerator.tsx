import VacationRentalCaseGeneratorForm from "@/components/VacationRentalCaseGeneratorForm";
import { useNavigate } from 'react-router-dom';

const VacationRentalCaseGenerator = () => {
    const navigate = useNavigate();

    // Handle form success - redirects to Stripe automatically via window.location.href
    const handleFormSuccess = () => {
        // Form redirects to Stripe automatically
    };

    // Handle form cancel
    const handleFormCancel = () => {
        navigate('/admin/cases');
    };

    return (
        <div className="container-fluid p-4">
            <VacationRentalCaseGeneratorForm
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
            />
        </div>
    );
};

export default VacationRentalCaseGenerator;