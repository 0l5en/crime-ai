
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { useCrimeCase } from '@/hooks/useCrimeCase';

const CaseDashboard = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { data: crimeCase, isLoading, error } = useCrimeCase(caseId || '');

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
            <p>Fetching case details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center text-red-400">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>Failed to load case details: {error.message}</p>
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
          <h1 className="text-4xl font-bold mb-6">{crimeCase?.title}</h1>
          <div className="bg-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Case Description</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {crimeCase?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDashboard;
