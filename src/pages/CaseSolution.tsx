
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const CaseSolution = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();

  const handleBackToCase = () => {
    navigate(`/case/${caseId}`);
  };

  if (!caseId) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center text-red-400">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>No case ID provided</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <h1 className="text-4xl font-bold">Submit your solution</h1>
            <Button
              onClick={handleBackToCase}
              variant="outline"
              className="bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 px-6 py-3 text-lg font-semibold"
            >
              Back to case
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseSolution;
