// src/pages/ContractDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ClauseCard from '../components/ClauseCard'; // <-- IMPORT THE NEW COMPONENT

const ContractDetailPage = () => {
  const { id } = useParams();
  const { data: contracts, loading, error } = useFetch('/contracts.json');

  if (loading) return <div className="text-center py-10 text-white">Loading contract details...</div>;
  if (error) return <div className="text-center py-10 text-red-400">Error fetching contract.</div>;

  const contract = contracts?.find(c => c.id === id);

  if (!contract) {
    return (
      <div className="text-center py-10 text-white">
        <p>Contract not found.</p>
        <Link to="/" className="text-blue-400 hover:underline mt-4 block">Return to Dashboard</Link>
      </div>
    );
  }

  const { name, parties, details } = contract;

  return (
    <div>
      <Link to="/" className="text-blue-400 hover:underline mb-6 block">&larr; Back to Dashboard</Link>
      <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
      <p className="text-gray-400 mb-6">Parties: {parties}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Key Clauses</h3>
          <div className="space-y-4">
            {details.clauses.map(clause => (
              // Now this line will work correctly
              <ClauseCard key={clause.title} title={clause.title} summary={clause.summary} confidence={clause.confidence} />
            ))}
          </div>
        </div>

        <div className="md:col-span-1 bg-gray-800 p-4 rounded-lg self-start">
          <h3 className="text-xl font-semibold text-white mb-4">AI Insights</h3>
          <ul className="space-y-3">
            {details.insights.map((insight, index) => (
              <li key={index} className="text-sm text-gray-300">
                <span className={`font-bold ${insight.risk === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>
                  [{insight.risk} Risk]
                </span> {insight.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailPage;