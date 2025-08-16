/**
 * LoadingSpinner Component.
 * Shows loading indicator during API calls.
 */
const LoadingSpinner = () => (
  <div className="text-center py-4">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    <p className="text-blue-600 mt-2">Loading...</p>
  </div>
);

export default LoadingSpinner;
