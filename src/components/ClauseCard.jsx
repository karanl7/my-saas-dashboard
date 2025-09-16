const ClauseCard = ({ title, summary, confidence }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-bold text-white">{title}</h4>
      <span className="text-sm font-mono text-cyan-400">
        {Math.round(confidence * 100)}% Confidence
      </span>
    </div>
    <p className="text-gray-400 text-sm">{summary}</p>
  </div>
);

export default ClauseCard;