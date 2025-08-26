interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 32, 
  className = "" 
}) => {
  return (
    <div className={`flex justify-center items-center min-h-[200px] ${className}`}>
      <div 
        className="animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400"
        style={{ width: size, height: size }}
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;
