// src/pages/DashboardPage.jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import UploadModal from '../components/UploadModal';

const ROWS_PER_PAGE = 10;

const DashboardPage = () => {
  const { data: contracts, loading, error } = useFetch('/contracts.json');

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for user inputs
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized logic to filter, search, and sort the data
  const filteredContracts = useMemo(() => {
    if (!contracts) return [];
    
    return contracts
      .filter(c => statusFilter === 'All' || c.status === statusFilter)
      .filter(c => riskFilter === 'All' || c.risk === riskFilter)
      .filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.parties.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [contracts, searchQuery, statusFilter, riskFilter]);
  
  // Logic to calculate which contracts to show on the current page
  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );
  
  const totalPages = Math.ceil(filteredContracts.length / ROWS_PER_PAGE);

  // Function to render the correct content based on the data state
  const renderContent = () => {
    if (loading) {
      return <tr><td colSpan="5" className="text-center py-10">Loading contracts...</td></tr>;
    }
    if (error) {
      return <tr><td colSpan="5" className="text-center py-10 text-red-400">Error fetching data. Please try again later.</td></tr>;
    }
    if (contracts && contracts.length === 0) {
      return <tr><td colSpan="5" className="text-center py-10">No contracts yet. Upload one to get started!</td></tr>;
    }
    if (paginatedContracts.length === 0) {
      return <tr><td colSpan="5" className="text-center py-10">No contracts match your search/filter criteria.</td></tr>;
    }
    return paginatedContracts.map((contract) => (
      <tr key={contract.id} className="hover:bg-gray-700/50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
          <Link to={`/contract/${contract.id}`} className="hover:underline">{contract.name}</Link>
        </td>
        <td className="px-6 py-4 text-sm text-gray-300">{contract.parties}</td>
        <td className="px-6 py-4 text-sm text-gray-300">{contract.expiry}</td>
        <td className="px-6 py-4 text-sm text-gray-300">{contract.status}</td>
        <td className="px-6 py-4 text-sm text-gray-300">{contract.risk}</td>
      </tr>
    ));
  };
  
  return (
    <div>
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <h1 className="text-3xl font-bold text-white mb-6">Contracts Dashboard</h1>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or parties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-md"
        />
        <div className="flex items-center gap-4">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-md">
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Renewal Due">Renewal Due</option>
          </select>
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-md">
            <option value="All">All Risks</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contract Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Parties</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Risk Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {renderContent()}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-6">
        <button 
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 rounded-l-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-800 text-sm">Page {currentPage} of {totalPages || 1}</span>
        <button 
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 bg-gray-700 rounded-r-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;