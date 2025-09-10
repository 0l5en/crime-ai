import BasicCaseGeneratorForm from "@/components/BasicCaseGeneratorForm";
import CaseGenerator from "@/components/CaseGenerator";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VacationRentalCaseGenerator = () => {

    const [taskUrl, setTaskUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    // Handle form success
    const handleFormSuccess = (locationUrl: string) => {
        setTaskUrl(locationUrl);
    };

    // Handle form cancel
    const handleFormCancel = () => {
        navigate('/admin/cases');
    };

    return <CaseGenerator taskUrl={taskUrl} setTaskUrl={setTaskUrl} generatorForm={<BasicCaseGeneratorForm
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
    />} />

};

export default VacationRentalCaseGenerator;