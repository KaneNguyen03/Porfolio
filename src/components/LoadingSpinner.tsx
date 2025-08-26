import { Loader } from 'lucide-react';

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
      <Loader 
        size={size} 
        className="animate-spin text-blue-600 dark:text-blue-400" 
      />
    </div>
  );
};

export default LoadingSpinner;
