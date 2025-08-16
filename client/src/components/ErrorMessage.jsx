/**
 * ErrorMessage Component
 * Displays error messages to the user
 * @param {string} error - Error message to display
 */
const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  );
};

export default ErrorMessage;
