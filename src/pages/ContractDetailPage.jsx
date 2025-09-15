// src/pages/ContractDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

// ... ClauseCard component from Phase 2 ...

const ContractDetailPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { data: contracts, loading, error } = useFetch('/contracts.json');

  if (loading) return <div className="text-center py-10">Loading contract details...</div>;
  if (error) return <div className="text-center py-10 text-red-400">Error fetching contract.</div>;

  // Find the specific contract from the fetched array
  const contract = contracts?.find(c => c.id === id);

  if (!contract) {
    return <div className="text-center py-10">Contract not found.</div>;
  }

  const { name, parties, details } = contract;

  return (
    <div>
      <Link to="/" className="text-blue-400 hover:underline mb-6 block">&larr; Back to Dashboard</Link>
      <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
      <p className="text-gray-400 mb-6">Parties: {parties}</p>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Key Clauses</h3>
          <div className="space-y-4">
            {details.clauses.map(clause => (
              <ClauseCard key={clause.title} {...clause} />
            ))}
          </div>
          {/* ... other sections mapping over details.insights, etc. ... */}
        </div>
        {/* ... Evidence Panel mapping over details.evidence ... */}
      </div>
    </div>
  );
};

export default ContractDetailPage;