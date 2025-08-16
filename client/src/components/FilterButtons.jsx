/**
 * FilterButtons Component
 * Renders filter buttons for task list (All, Pending, Completed)
 * @param {string} currentFilter - Currently active filter
 * @param {Function} onFilterChange - Callback when filter changes
 */

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentFilter === filter.key
              ? "bg-blue-500 text-white" // Active
              : "bg-white text-blue-600 hover:bg-blue-100 border border-blue-200" // Inactive
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
