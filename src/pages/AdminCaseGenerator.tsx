import BasicCaseGeneratorForm from "@/components/BasicCaseGeneratorForm";
import Header from "@/components/Header";
import { useNavigate } from 'react-router-dom';

const AdminCaseGenerator = () => {
  const navigate = useNavigate();

  // Handle form success
  const handleFormSuccess = () => {
    navigate('/admin/cases');
  };

  // Handle form cancel
  const handleFormCancel = () => {
    navigate('/admin/cases');
  };

  return (
    <div className="min-vh-100 bg-body">
      <Header />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <BasicCaseGeneratorForm
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );

};

export default AdminCaseGenerator;